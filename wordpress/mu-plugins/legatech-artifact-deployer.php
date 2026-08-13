<?php
/**
 * Plugin Name: Legatech Artifact Deployer
 * Description: Preuzima provjereni GitHub Actions artifact i lokalno aktivira statični Legatech web.
 * Version: 1.0.0
 */

declare(strict_types=1);

if (!defined('ABSPATH')) exit;

const LEGATECH_DEPLOY_CRON_HOOK = 'legatech_poll_production_artifact';
const LEGATECH_DEPLOY_STATE_OPTION = 'legatech_artifact_deployer_state';
const LEGATECH_DEPLOY_LOCK_OPTION = 'legatech_artifact_deployer_lock';

function legatech_deployer_headers(): array
{
    return [
        'Accept' => 'application/vnd.github+json',
        'Authorization' => 'Bearer ' . (string) LEGATECH_GITHUB_TOKEN,
        'X-GitHub-Api-Version' => '2022-11-28',
        'User-Agent' => 'Legatech-SiteGround-Artifact-Deployer',
    ];
}

function legatech_deployer_api_json(string $url): array
{
    $response = wp_remote_get($url, [
        'timeout' => 20,
        'redirection' => 0,
        'headers' => legatech_deployer_headers(),
    ]);
    if (is_wp_error($response)) throw new RuntimeException('GitHub API nije dostupan: ' . $response->get_error_message());

    $status = wp_remote_retrieve_response_code($response);
    if ($status !== 200) throw new RuntimeException('GitHub API vratio je HTTP ' . $status . '.');

    $data = json_decode(wp_remote_retrieve_body($response), true);
    if (!is_array($data)) throw new RuntimeException('GitHub API nije vratio valjan JSON.');
    return $data;
}

function legatech_deployer_remove_tree(string $path, string $allowedRoot): void
{
    $normalizedPath = rtrim(str_replace('\\', '/', $path), '/');
    $normalizedRoot = rtrim(str_replace('\\', '/', $allowedRoot), '/');
    if ($normalizedPath === '' || $normalizedPath === $normalizedRoot || !str_starts_with($normalizedPath, $normalizedRoot . '/')) return;
    if (!file_exists($path)) return;

    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($iterator as $item) {
        if ($item->isDir() && !$item->isLink()) @rmdir($item->getPathname());
        else @unlink($item->getPathname());
    }
    @rmdir($path);
}

function legatech_deployer_extract_artifact(string $zipPath, string $destination): void
{
    if (!class_exists('ZipArchive')) throw new RuntimeException('PHP ZipArchive nije dostupan.');
    $zip = new ZipArchive();
    if ($zip->open($zipPath) !== true) throw new RuntimeException('GitHub artifact nije valjana ZIP arhiva.');

    $allowedFiles = [
        'release.json',
        'legatech-site.tar.gz',
        'legatech-site.tar.gz.sha256',
        'deploy-siteground.sh',
        'deploy-siteground.sh.sha256',
    ];
    $seen = [];
    $totalBytes = 0;

    try {
        if ($zip->numFiles < 5 || $zip->numFiles > 10) throw new RuntimeException('Artifact ima neočekivan broj zapisa.');
        for ($index = 0; $index < $zip->numFiles; $index++) {
            $name = (string) $zip->getNameIndex($index);
            $normalized = str_replace('\\', '/', $name);
            if ($normalized === '' || str_contains($normalized, "\0") || str_starts_with($normalized, '/') || preg_match('#(^|/)\.\.(/|$)#', $normalized)) {
                throw new RuntimeException('Artifact sadrži nesigurnu putanju.');
            }

            $isDirectory = str_ends_with($normalized, '/');
            if (!$isDirectory) {
                if (str_contains($normalized, '/') || !in_array($normalized, $allowedFiles, true) || isset($seen[$normalized])) {
                    throw new RuntimeException('Artifact sadrži neočekivanu ili dupliciranu datoteku.');
                }
                $seen[$normalized] = true;
            }

            $details = $zip->statIndex($index);
            $totalBytes += is_array($details) ? (int) ($details['size'] ?? 0) : 0;
            if ($totalBytes > 300 * 1024 * 1024) throw new RuntimeException('Raspakirani artifact je prevelik.');

            $attributes = 0;
            if ($zip->getExternalAttributesIndex($index, $operatingSystem, $attributes)) {
                $type = ($attributes >> 16) & 0xF000;
                if ($type === 0xA000) throw new RuntimeException('Simboličke poveznice nisu dopuštene u artifactu.');
            }
        }

        foreach ($allowedFiles as $required) {
            if (!isset($seen[$required])) throw new RuntimeException('Artifact nema sve obvezne datoteke.');
        }
        if (!$zip->extractTo($destination)) throw new RuntimeException('Artifact nije moguće raspakirati.');
    } finally {
        $zip->close();
    }
}

function legatech_deployer_verify_release(string $directory, string $repository, string $sha, string $artifactName): array
{
    $manifestPath = $directory . '/release.json';
    $manifest = json_decode((string) file_get_contents($manifestPath), true);
    if (!is_array($manifest) || ($manifest['schemaVersion'] ?? null) !== 1) throw new RuntimeException('Release manifest nije valjan.');
    if (($manifest['repository'] ?? '') !== $repository || ($manifest['branch'] ?? '') !== 'main') throw new RuntimeException('Release nije namijenjen ovom repozitoriju ili grani.');
    if (($manifest['sha'] ?? '') !== $sha || ($manifest['artifactName'] ?? '') !== $artifactName) throw new RuntimeException('Release SHA ili naziv artifacta nije valjan.');

    foreach (['archive' => 'legatech-site.tar.gz', 'deployScript' => 'deploy-siteground.sh'] as $key => $fileName) {
        $details = $manifest[$key] ?? null;
        $filePath = $directory . '/' . $fileName;
        if (!is_array($details) || ($details['file'] ?? '') !== $fileName || !is_file($filePath)) throw new RuntimeException('Release datoteka nije valjana.');
        $actualHash = hash_file('sha256', $filePath);
        $expectedHash = strtolower((string) ($details['sha256'] ?? ''));
        if (!preg_match('/^[a-f0-9]{64}$/', $expectedHash) || !hash_equals($expectedHash, $actualHash)) throw new RuntimeException('Hash release datoteke nije valjan.');
        if ((int) ($details['bytes'] ?? -1) !== filesize($filePath)) throw new RuntimeException('Veličina release datoteke nije valjana.');

        $checksum = trim((string) file_get_contents($filePath . '.sha256'));
        if ($checksum !== $expectedHash . '  ' . $fileName) throw new RuntimeException('Checksum datoteka nije valjana.');
    }

    return $manifest;
}

function legatech_deployer_run_script(string $script, string $archive, string $target, string $sha, string $deployRoot): array
{
    if (!function_exists('proc_open') || !is_executable('/bin/bash')) throw new RuntimeException('Lokalno izvršavanje deploy skripte nije dostupno.');
    @chmod($script, 0700);
    @set_time_limit(300);

    $descriptors = [
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w'],
    ];
    $environment = [
        'HOME' => dirname(dirname($deployRoot)),
        'PATH' => '/usr/local/bin:/usr/bin:/bin',
        'LEGATECH_DEPLOY_ROOT' => $deployRoot,
    ];
    $process = proc_open(['/bin/bash', $script, $archive, $target, $sha], $descriptors, $pipes, null, $environment, ['bypass_shell' => true]);
    if (!is_resource($process)) throw new RuntimeException('Deploy proces nije moguće pokrenuti.');

    foreach ($pipes as $pipe) stream_set_blocking($pipe, false);
    $stdout = '';
    $stderr = '';
    $started = microtime(true);
    do {
        $stdout .= (string) stream_get_contents($pipes[1]);
        $stderr .= (string) stream_get_contents($pipes[2]);
        $status = proc_get_status($process);
        if (!$status['running']) break;
        if (microtime(true) - $started > 240) {
            proc_terminate($process, 15);
            throw new RuntimeException('Deploy proces prekoračio je vremensko ograničenje.');
        }
        usleep(100000);
    } while (true);

    foreach ($pipes as $pipe) fclose($pipe);
    $exitCode = proc_close($process);
    if ($exitCode === -1 && isset($status['exitcode']) && $status['exitcode'] >= 0) $exitCode = (int) $status['exitcode'];
    if ($exitCode !== 0) throw new RuntimeException('Lokalni deploy nije uspio: ' . trim(substr($stderr, 0, 1500)));
    return ['stdout' => trim(substr($stdout, 0, 1500)), 'exit_code' => $exitCode];
}

function legatech_poll_and_deploy_artifact(): array
{
    if (!defined('LEGATECH_GITHUB_REPOSITORY') || !defined('LEGATECH_GITHUB_TOKEN')) {
        return ['ok' => false, 'status' => 'not_configured'];
    }

    $repository = trim((string) LEGATECH_GITHUB_REPOSITORY, '/');
    if (!preg_match('#^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$#', $repository)) return ['ok' => false, 'status' => 'invalid_repository'];

    $lockTime = (int) get_option(LEGATECH_DEPLOY_LOCK_OPTION, 0);
    if ($lockTime > 0 && $lockTime > time() - 1200) return ['ok' => true, 'status' => 'locked'];
    if ($lockTime > 0) delete_option(LEGATECH_DEPLOY_LOCK_OPTION);
    if (!add_option(LEGATECH_DEPLOY_LOCK_OPTION, time(), '', false)) return ['ok' => true, 'status' => 'locked'];

    $productionPath = '/home/customer/www/legatech.hr/public_html';
    $deployRoot = '/home/customer/www/staging2.legatech.hr/private/legatech-deploy';
    $incomingRoot = $deployRoot . '/incoming';
    $workingDirectory = '';

    try {
        if (realpath($productionPath) !== $productionPath || !is_writable($productionPath)) throw new RuntimeException('Produkcijski direktorij nije dostupan za pisanje.');
        if (!is_readable('/home/customer/www/legatech.hr/private/legatech-contact.php')) throw new RuntimeException('Privatna kontakt konfiguracija nedostaje.');
        if (!wp_mkdir_p($incomingRoot)) throw new RuntimeException('Privatni deploy direktorij nije moguće izraditi.');
        @chmod(dirname($deployRoot), 0700);
        @chmod($deployRoot, 0700);
        @chmod($incomingRoot, 0700);

        $workflow = rawurlencode('deploy.yml');
        $runsUrl = add_query_arg(['branch' => 'main', 'status' => 'success', 'per_page' => 10], 'https://api.github.com/repos/' . $repository . '/actions/workflows/' . $workflow . '/runs');
        $runsPayload = legatech_deployer_api_json($runsUrl);
        $runs = $runsPayload['workflow_runs'] ?? null;
        if (!is_array($runs) || $runs === []) throw new RuntimeException('Nema uspješnog GitHub Actions builda.');

        $run = $runs[0];
        $sha = strtolower((string) ($run['head_sha'] ?? ''));
        $runId = (int) ($run['id'] ?? 0);
        if (!preg_match('/^[a-f0-9]{40}$/', $sha) || $runId <= 0 || ($run['head_branch'] ?? '') !== 'main' || ($run['conclusion'] ?? '') !== 'success') {
            throw new RuntimeException('Najnoviji GitHub Actions run nije valjan za produkciju.');
        }

        $state = get_option(LEGATECH_DEPLOY_STATE_OPTION, []);
        if (is_array($state) && ($state['sha'] ?? '') === $sha && ($state['status'] ?? '') === 'deployed') {
            $state['checked_at'] = gmdate(DATE_ATOM);
            update_option(LEGATECH_DEPLOY_STATE_OPTION, $state, false);
            return ['ok' => true, 'status' => 'up_to_date', 'sha' => $sha];
        }

        $artifactName = 'legatech-production-' . $sha;
        $artifactsPayload = legatech_deployer_api_json('https://api.github.com/repos/' . $repository . '/actions/runs/' . $runId . '/artifacts?per_page=100');
        $artifact = null;
        foreach (($artifactsPayload['artifacts'] ?? []) as $candidate) {
            if (($candidate['name'] ?? '') === $artifactName && empty($candidate['expired'])) {
                $artifact = $candidate;
                break;
            }
        }
        if (!is_array($artifact) || empty($artifact['archive_download_url'])) throw new RuntimeException('Produkcijski artifact nije pronađen ili je istekao.');

        $workingDirectory = $incomingRoot . '/poll-' . $runId . '-' . wp_generate_password(8, false, false);
        if (!wp_mkdir_p($workingDirectory)) throw new RuntimeException('Privremeni deploy direktorij nije moguće izraditi.');
        @chmod($workingDirectory, 0700);
        $zipPath = $workingDirectory . '/artifact.zip';
        $download = wp_remote_get((string) $artifact['archive_download_url'], [
            'timeout' => 90,
            'redirection' => 5,
            'headers' => legatech_deployer_headers(),
            'stream' => true,
            'filename' => $zipPath,
            'limit_response_size' => 200 * 1024 * 1024,
        ]);
        if (is_wp_error($download)) throw new RuntimeException('Artifact nije moguće preuzeti: ' . $download->get_error_message());
        if (wp_remote_retrieve_response_code($download) !== 200 || !is_file($zipPath) || filesize($zipPath) === 0) throw new RuntimeException('Preuzeti artifact nije valjan.');

        $releaseDirectory = $workingDirectory . '/release';
        if (!wp_mkdir_p($releaseDirectory)) throw new RuntimeException('Release direktorij nije moguće izraditi.');
        legatech_deployer_extract_artifact($zipPath, $releaseDirectory);
        legatech_deployer_verify_release($releaseDirectory, $repository, $sha, $artifactName);
        $result = legatech_deployer_run_script(
            $releaseDirectory . '/deploy-siteground.sh',
            $releaseDirectory . '/legatech-site.tar.gz',
            $productionPath,
            $sha,
            $deployRoot
        );

        $newState = [
            'status' => 'deployed',
            'sha' => $sha,
            'run_id' => $runId,
            'artifact_id' => (int) ($artifact['id'] ?? 0),
            'deployed_at' => gmdate(DATE_ATOM),
            'checked_at' => gmdate(DATE_ATOM),
            'message' => $result['stdout'],
        ];
        update_option(LEGATECH_DEPLOY_STATE_OPTION, $newState, false);
        return ['ok' => true, 'status' => 'deployed', 'sha' => $sha, 'run_id' => $runId];
    } catch (Throwable $error) {
        $failure = [
            'status' => 'failed',
            'checked_at' => gmdate(DATE_ATOM),
            'error' => substr($error->getMessage(), 0, 1500),
        ];
        update_option(LEGATECH_DEPLOY_STATE_OPTION, $failure, false);
        error_log('Legatech artifact deploy: ' . $failure['error']);
        return ['ok' => false, 'status' => 'failed', 'error' => $failure['error']];
    } finally {
        if ($workingDirectory !== '') legatech_deployer_remove_tree($workingDirectory, $incomingRoot);
        delete_option(LEGATECH_DEPLOY_LOCK_OPTION);
    }
}

add_filter('cron_schedules', static function (array $schedules): array {
    $schedules['legatech_five_minutes'] = ['interval' => 300, 'display' => 'Svakih pet minuta'];
    return $schedules;
});

add_action(LEGATECH_DEPLOY_CRON_HOOK, 'legatech_poll_and_deploy_artifact');
add_action('init', static function (): void {
    if (!wp_next_scheduled(LEGATECH_DEPLOY_CRON_HOOK)) {
        wp_schedule_event(time() + 60, 'legatech_five_minutes', LEGATECH_DEPLOY_CRON_HOOK);
    }
});
