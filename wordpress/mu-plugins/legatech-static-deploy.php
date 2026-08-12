<?php
/**
 * Plugin Name: Legatech Static Deploy Trigger
 * Description: Pokreće GitHub Actions izgradnju nakon promjene objavljenog članka.
 * Version: 1.0.0
 */

declare(strict_types=1);

if (!defined('ABSPATH')) exit;

function legatech_trigger_static_deploy(string $reason, int $postId): void
{
    if (!defined('LEGATECH_GITHUB_REPOSITORY') || !defined('LEGATECH_GITHUB_TOKEN')) return;
    if (get_transient('legatech_static_deploy_pending')) return;
    set_transient('legatech_static_deploy_pending', '1', 20);

    $repository = trim((string) LEGATECH_GITHUB_REPOSITORY, '/');
    if (!preg_match('#^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$#', $repository)) {
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

    if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 204) {
        delete_transient('legatech_static_deploy_pending');
        $detail = is_wp_error($response) ? $response->get_error_message() : 'HTTP ' . wp_remote_retrieve_response_code($response);
        error_log('Legatech deploy nije pokrenut: ' . $detail);
    }
}

add_action('transition_post_status', static function (string $newStatus, string $oldStatus, WP_Post $post): void {
    if ($post->post_type !== 'post' || wp_is_post_revision($post->ID)) return;
    if ($newStatus === 'publish' || $oldStatus === 'publish') legatech_trigger_static_deploy('status_or_content_changed', $post->ID);
}, 10, 3);

add_action('before_delete_post', static function (int $postId, WP_Post $post): void {
    if ($post->post_type === 'post' && $post->post_status === 'publish') legatech_trigger_static_deploy('published_post_deleted', $postId);
}, 10, 2);
