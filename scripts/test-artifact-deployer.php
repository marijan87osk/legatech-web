<?php
declare(strict_types=1);

// Exercise the real PHP launcher without WordPress or a production directory.
define('ABSPATH', __DIR__);
function add_filter(...$arguments): void {}
function add_action(...$arguments): void {}
require ($argv[1] ?? __DIR__ . '/legatech-artifact-deployer.php');

$fixture = sys_get_temp_dir() . '/legatech-launcher-test-' . bin2hex(random_bytes(8));
if (!mkdir($fixture, 0700)) throw new RuntimeException('Cannot create test fixture.');
$script = $fixture . '/assert-deploy-arguments.sh';
file_put_contents($script, <<<'BASH'
#!/usr/bin/env bash
set -euo pipefail
test "$#" -eq 4
test "$1" = "$EXPECTED_ARCHIVE"
test "$2" = "$EXPECTED_TARGET"
test "$3" = "$EXPECTED_RELEASE"
test "$4" = production
printf 'launcher contract passed\n'
BASH
);

// The launcher deliberately supplies a restricted environment. Use literal
// fixture values in the assertion script rather than inherited environment.
$archive = $fixture . '/site.tar.gz';
$target = $fixture . '/public_html';
$release = str_repeat('a', 40);
$body = file_get_contents($script);
$body = str_replace(
    ['$EXPECTED_ARCHIVE', '$EXPECTED_TARGET', '$EXPECTED_RELEASE'],
    [$archive, $target, $release],
    $body
);
file_put_contents($script, $body);

try {
    $result = legatech_deployer_run_script($script, $archive, $target, $release, $fixture . '/deploy');
    if ($result['exit_code'] !== 0 || $result['stdout'] !== 'launcher contract passed') {
        throw new RuntimeException('Unexpected launcher result.');
    }
    echo "PASS: production environment and release arguments reach the shell script.\n";
} catch (Throwable $error) {
    fwrite(STDERR, $error->getMessage() . "\n");
    throw $error;
} finally {
    unlink($script);
    rmdir($fixture);
}
