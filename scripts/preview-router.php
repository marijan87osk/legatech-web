<?php
declare(strict_types=1);
// Local release QA only. Apache production directives are not emulated here.
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');
header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'none'");
if (!in_array(strtolower($_SERVER['HTTP_HOST'] ?? ''), ['127.0.0.1:8127', 'localhost:8127'], true)) { http_response_code(403); exit('Forbidden'); }
$path = rawurldecode((string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH));
$root = realpath((string) $_SERVER['DOCUMENT_ROOT']);
$notFound = static function () use ($root): never { http_response_code(404); header('Content-Type: text/html; charset=utf-8'); readfile($root . '/404.html'); exit; };
if (str_contains($path, "\\") || preg_match('/[\x00-\x20]/', $path) || preg_match('~(^|/)\.~', $path) || str_contains($path, '//') || str_starts_with($path, '/api/vendor/')) $notFound();
if ($path === '/api/contact.php') {
    $config = getenv('LEGATECH_PREVIEW_CONTACT_CONFIG');
    if (!$config || !is_file($config)) { http_response_code(503); header('Content-Type: application/json'); echo '{"ok":false,"message":"Release preview has no mail transport configured."}'; exit; }
    putenv('LEGATECH_CONTACT_CONFIG=' . $config);
    require $root . '/api/contact.php';
    return;
}
if (!in_array($_SERVER['REQUEST_METHOD'] ?? '', ['GET', 'HEAD'], true)) { http_response_code(405); header('Allow: GET, HEAD'); exit; }
$file = realpath($root . $path);
if ($file !== false && is_dir($file)) {
    if (!str_ends_with($path, '/')) { http_response_code(308); header('Location: ' . $path . '/'); exit; }
    $file = realpath($file . '/index.html');
}
if ($file === false || strncasecmp($file, $root . DIRECTORY_SEPARATOR, strlen($root . DIRECTORY_SEPARATOR)) !== 0 || !is_file($file)) $notFound();
$types = ['html'=>'text/html; charset=utf-8','css'=>'text/css; charset=utf-8','js'=>'text/javascript; charset=utf-8','json'=>'application/json','xml'=>'application/xml','txt'=>'text/plain; charset=utf-8','png'=>'image/png','jpg'=>'image/jpeg','jpeg'=>'image/jpeg','webp'=>'image/webp','svg'=>'image/svg+xml','ico'=>'image/x-icon','woff2'=>'font/woff2','woff'=>'font/woff','ttf'=>'font/ttf','avif'=>'image/avif','gif'=>'image/gif'];
$extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
if (!isset($types[$extension])) $notFound();
header('Content-Type: ' . $types[$extension]);
header('Cache-Control: no-store');
header('Content-Length: ' . filesize($file));
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'HEAD') readfile($file);
