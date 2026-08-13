<?php
/**
 * Plugin Name: Legatech Static Blog Deploy
 * Description: Stvara javni read-only snapshot objavljenih članaka i pokreće GitHub Actions deploy.
 * Version: 1.2.0
 */

declare(strict_types=1);

if (!defined('ABSPATH')) exit;

/**
 * @return string|null Absolute path of the generated snapshot, or null on failure.
 */
function legatech_write_blog_snapshot(): ?string
{
    $uploads = wp_upload_dir();
    if (!empty($uploads['error'])) {
        error_log('Legatech blog snapshot: ' . (string) $uploads['error']);
        return null;
    }

    $directory = trailingslashit((string) $uploads['basedir']) . 'legatech-blog';
    if (!wp_mkdir_p($directory)) {
        error_log('Legatech blog snapshot: nije moguće izraditi direktorij.');
        return null;
    }

    $posts = get_posts([
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'DESC',
        'no_found_rows' => true,
    ]);

    $items = [];
    foreach ($posts as $post) {
        setup_postdata($post);
        $thumbnailId = get_post_thumbnail_id($post->ID);
        $thumbnail = null;
        if ($thumbnailId) {
            $metadata = wp_get_attachment_metadata($thumbnailId);
            $thumbnail = [
                'sourceUrl' => wp_get_attachment_url($thumbnailId) ?: null,
                'alt' => (string) get_post_meta($thumbnailId, '_wp_attachment_image_alt', true),
                'width' => is_array($metadata) ? (int) ($metadata['width'] ?? 0) : 0,
                'height' => is_array($metadata) ? (int) ($metadata['height'] ?? 0) : 0,
            ];
        }

        $items[] = [
            'id' => $post->ID,
            'slug' => $post->post_name,
            'titleHtml' => apply_filters('the_title', $post->post_title, $post->ID),
            'excerptHtml' => apply_filters('the_excerpt', get_the_excerpt($post)),
            'contentHtml' => apply_filters('the_content', $post->post_content),
            'publishedAt' => get_post_time(DATE_ATOM, true, $post),
            'modifiedAt' => get_post_modified_time(DATE_ATOM, true, $post),
            'categoryLabels' => wp_get_post_categories($post->ID, ['fields' => 'names']),
            'featuredImage' => $thumbnail,
            'authorName' => get_the_author_meta('display_name', (int) $post->post_author) ?: 'Legatech',
        ];
    }
    wp_reset_postdata();

    $payload = wp_json_encode([
        'version' => 1,
        'generatedAt' => gmdate(DATE_ATOM),
        'posts' => $items,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    if (!is_string($payload)) {
        error_log('Legatech blog snapshot: JSON nije moguće generirati.');
        return null;
    }

    $target = trailingslashit($directory) . 'feed.json';
    $temporary = $target . '.tmp-' . wp_generate_password(10, false, false);
    if (file_put_contents($temporary, $payload, LOCK_EX) === false || !rename($temporary, $target)) {
        @unlink($temporary);
        error_log('Legatech blog snapshot: datoteku nije moguće atomarno spremiti.');
        return null;
    }

    @chmod($target, 0644);
    return $target;
}

function legatech_publish_blog_snapshot(string $snapshotPath, string $reason, int $postId): void
{
    if (!defined('LEGATECH_GITHUB_REPOSITORY') || !defined('LEGATECH_GITHUB_TOKEN')) return;

    $repository = trim((string) LEGATECH_GITHUB_REPOSITORY, '/');
    if (!preg_match('#^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$#', $repository)) {
        error_log('Legatech deploy: neispravan LEGATECH_GITHUB_REPOSITORY.');
        return;
    }

    $snapshot = file_get_contents($snapshotPath);
    if ($snapshot === false) {
        error_log('Legatech deploy: snapshot nije moguće pročitati.');
        return;
    }

    $branch = defined('LEGATECH_GITHUB_BRANCH') ? sanitize_key((string) LEGATECH_GITHUB_BRANCH) : 'main';
    $repositoryPath = 'wordpress-content/blog-snapshot.json';
    $apiUrl = 'https://api.github.com/repos/' . $repository . '/contents/' . $repositoryPath;
    $headers = [
        'Accept' => 'application/vnd.github+json',
        'Authorization' => 'Bearer ' . (string) LEGATECH_GITHUB_TOKEN,
        'X-GitHub-Api-Version' => '2022-11-28',
        'User-Agent' => 'Legatech-WordPress-Deploy',
    ];

    $current = wp_remote_get(add_query_arg('ref', $branch, $apiUrl), [
        'timeout' => 15,
        'redirection' => 0,
        'headers' => $headers,
    ]);

    if (is_wp_error($current)) {
        error_log('Legatech deploy: GitHub sadržaj nije moguće pročitati: ' . $current->get_error_message());
        return;
    }

    $currentStatus = wp_remote_retrieve_response_code($current);
    $currentBody = json_decode(wp_remote_retrieve_body($current), true);
    if (!in_array($currentStatus, [200, 404], true)) {
        error_log('Legatech deploy: GitHub sadržaj nije moguće pročitati, HTTP ' . $currentStatus . '.');
        return;
    }

    if ($currentStatus === 200 && isset($currentBody['content'])) {
        $remoteSnapshot = base64_decode(str_replace(["\r", "\n"], '', (string) $currentBody['content']), true);
        if (is_string($remoteSnapshot) && hash_equals(hash('sha256', $remoteSnapshot), hash('sha256', $snapshot))) {
            return;
        }
    }

    $body = [
        'message' => 'content: sync WordPress blog',
        'content' => base64_encode($snapshot),
        'branch' => $branch,
    ];
    if ($currentStatus === 200 && isset($currentBody['sha'])) $body['sha'] = (string) $currentBody['sha'];

    $response = wp_remote_request($apiUrl, [
        'method' => 'PUT',
        'timeout' => 20,
        'redirection' => 0,
        'headers' => $headers,
        'body' => wp_json_encode($body),
    ]);

    $statusCode = is_wp_error($response) ? 0 : wp_remote_retrieve_response_code($response);
    $success = !is_wp_error($response) && in_array($statusCode, [200, 201], true);
    update_option('legatech_static_deploy_last_dispatch', [
        'requested_at' => gmdate(DATE_ATOM),
        'reason' => sanitize_key($reason),
        'post_id' => $postId,
        'status' => $statusCode,
        'ok' => $success,
        'mode' => 'contents',
    ], false);

    if (!$success) {
        $detail = is_wp_error($response) ? $response->get_error_message() : 'HTTP ' . $statusCode;
        error_log('Legatech blog snapshot nije objavljen na GitHubu: ' . $detail);
    }
}

function legatech_queue_blog_refresh(string $reason, int $postId): void
{
    $GLOBALS['legatech_blog_refresh'] = ['reason' => $reason, 'post_id' => $postId];

    if (!has_action('shutdown', 'legatech_refresh_blog_and_deploy')) {
        add_action('shutdown', 'legatech_refresh_blog_and_deploy', 20);
    }
}

function legatech_refresh_blog_and_deploy(): void
{
    $request = $GLOBALS['legatech_blog_refresh'] ?? null;
    if (!is_array($request)) return;
    $snapshotPath = legatech_write_blog_snapshot();
    if ($snapshotPath === null) return;

    legatech_publish_blog_snapshot($snapshotPath, (string) $request['reason'], (int) $request['post_id']);
    unset($GLOBALS['legatech_blog_refresh']);
}

add_action('transition_post_status', static function (string $newStatus, string $oldStatus, WP_Post $post): void {
    if ($post->post_type !== 'post' || wp_is_post_revision($post->ID)) return;
    if ($newStatus === 'publish' || $oldStatus === 'publish') {
        legatech_queue_blog_refresh('status_or_content_changed', $post->ID);
    }
}, 10, 3);

add_action('rest_after_insert_post', static function (WP_Post $post): void {
    if ($post->post_status === 'publish') legatech_queue_blog_refresh('published_post_updated', $post->ID);
}, 10, 1);

add_action('deleted_post', static function (int $postId, WP_Post $post): void {
    if ($post->post_type === 'post' && $post->post_status === 'publish') {
        legatech_queue_blog_refresh('published_post_deleted', $postId);
    }
}, 10, 2);
