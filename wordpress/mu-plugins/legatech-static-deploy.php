<?php
/**
 * Plugin Name: Legatech Static Blog Deploy
 * Description: Stvara javni read-only snapshot objavljenih članaka i pokreće GitHub Actions deploy.
 * Version: 1.1.0
 */

declare(strict_types=1);

if (!defined('ABSPATH')) exit;

/**
 * @return string|null Public URL of the generated snapshot, or null on failure.
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
    return trailingslashit((string) $uploads['baseurl']) . 'legatech-blog/feed.json';
}

function legatech_trigger_static_deploy(string $reason, int $postId): void
{
    if (!defined('LEGATECH_GITHUB_REPOSITORY') || !defined('LEGATECH_GITHUB_TOKEN')) return;
    if (get_transient('legatech_static_deploy_pending')) return;
    set_transient('legatech_static_deploy_pending', '1', 20);

    $repository = trim((string) LEGATECH_GITHUB_REPOSITORY, '/');
    if (!preg_match('#^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$#', $repository)) {
        delete_transient('legatech_static_deploy_pending');
        error_log('Legatech deploy: neispravan LEGATECH_GITHUB_REPOSITORY.');
        return;
    }

    $response = wp_remote_post('https://api.github.com/repos/' . $repository . '/dispatches', [
        'timeout' => 15,
        'redirection' => 0,
        'headers' => [
            'Accept' => 'application/vnd.github+json',
            'Authorization' => 'Bearer ' . (string) LEGATECH_GITHUB_TOKEN,
            'X-GitHub-Api-Version' => '2022-11-28',
            'User-Agent' => 'Legatech-WordPress-Deploy',
        ],
        'body' => wp_json_encode([
            'event_type' => 'wordpress_content_changed',
            'client_payload' => ['reason' => $reason, 'post_id' => $postId],
        ]),
    ]);

    $statusCode = is_wp_error($response) ? 0 : wp_remote_retrieve_response_code($response);
    update_option('legatech_static_deploy_last_dispatch', [
        'requested_at' => gmdate(DATE_ATOM),
        'reason' => sanitize_key($reason),
        'post_id' => $postId,
        'status' => $statusCode,
        'ok' => !is_wp_error($response) && $statusCode === 204,
    ], false);

    if (is_wp_error($response) || $statusCode !== 204) {
        delete_transient('legatech_static_deploy_pending');
        $detail = is_wp_error($response) ? $response->get_error_message() : 'HTTP ' . $statusCode;
        error_log('Legatech deploy nije pokrenut: ' . $detail);
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
    if (!is_array($request) || legatech_write_blog_snapshot() === null) return;

    legatech_trigger_static_deploy((string) $request['reason'], (int) $request['post_id']);
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
