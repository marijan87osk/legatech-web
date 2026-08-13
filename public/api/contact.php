<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_line(mixed $value): string
{
    return trim((string) preg_replace('/\s+/u', ' ', (string) $value));
}

function clean_multiline(mixed $value): string
{
    $value = str_replace(["\r\n", "\r"], "\n", (string) $value);
    $value = preg_replace('/[\t ]+/u', ' ', $value) ?? '';
    return trim(preg_replace('/\n{3,}/u', "\n\n", $value) ?? '');
}

function string_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Dopušteno je samo slanje obrasca.']);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
    respond(413, ['ok' => false, 'message' => 'Upit je prevelik.']);
}

$configPath = getenv('LEGATECH_CONTACT_CONFIG') ?: dirname((string) ($_SERVER['DOCUMENT_ROOT'] ?? __DIR__)) . '/private/legatech-contact.php';
if (!is_file($configPath)) {
    error_log('Legatech kontakt: konfiguracijska datoteka nije pronađena.');
    respond(503, ['ok' => false, 'message' => 'Slanje trenutačno nije dostupno. Javite se na info@legatech.hr.']);
}

$config = require $configPath;
$allowedOrigins = array_map(static fn ($origin) => rtrim((string) $origin, '/'), (array) ($config['allowed_origins'] ?? []));
$origin = rtrim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
if ($origin === '' || !in_array($origin, $allowedOrigins, true)) {
    respond(403, ['ok' => false, 'message' => 'Zahtjev nije dopušten.']);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (!str_starts_with($contentType, 'application/json')) {
    respond(415, ['ok' => false, 'message' => 'Nepodržan format zahtjeva.']);
}

try {
    $payload = json_decode((string) file_get_contents('php://input'), true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['ok' => false, 'message' => 'Podaci obrasca nisu ispravni.']);
}

if (!is_array($payload)) {
    respond(400, ['ok' => false, 'message' => 'Podaci obrasca nisu ispravni.']);
}

if (clean_line($payload['website'] ?? '') !== '') {
    respond(200, ['ok' => true, 'message' => 'Upit je zaprimljen.']);
}

$startedAt = filter_var($payload['formStartedAt'] ?? null, FILTER_VALIDATE_INT);
$elapsed = $startedAt ? ((int) floor(microtime(true) * 1000) - (int) $startedAt) : 0;
if ($elapsed < 1500 || $elapsed > 86400000) {
    respond(400, ['ok' => false, 'message' => 'Osvježite stranicu i ponovno ispunite obrazac.']);
}

$clientIp = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateSalt = (string) ($config['rate_limit_salt'] ?? '');
if (string_length($rateSalt) < 24) {
    error_log('Legatech kontakt: rate_limit_salt nije sigurno postavljen.');
    respond(503, ['ok' => false, 'message' => 'Slanje trenutačno nije dostupno. Javite se na info@legatech.hr.']);
}
$rateKey = hash_hmac('sha256', $clientIp, $rateSalt);
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'legatech-contact-' . $rateKey . '.json';
$now = time();

// Remove abandoned rate-limit records without touching unrelated temporary files.
$staleRateFiles = glob(rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'legatech-contact-*.json') ?: [];
foreach ($staleRateFiles as $staleRateFile) {
    $basename = basename($staleRateFile);
    $modifiedAt = is_file($staleRateFile) ? filemtime($staleRateFile) : false;
    if (preg_match('/^legatech-contact-[a-f0-9]{64}\.json$/', $basename) === 1 && $modifiedAt !== false && $modifiedAt < $now - 86400) {
        @unlink($staleRateFile);
    }
}

$handle = fopen($rateFile, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    if (is_resource($handle)) fclose($handle);
    respond(503, ['ok' => false, 'message' => 'Slanje trenutačno nije dostupno. Pokušajte malo kasnije.']);
}
$stored = stream_get_contents($handle);
$attempts = array_values(array_filter(json_decode($stored ?: '[]', true) ?: [], static fn ($timestamp) => is_int($timestamp) && $timestamp > $now - 600));
if (count($attempts) >= 5) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(429, ['ok' => false, 'message' => 'Poslano je previše upita. Pokušajte ponovno za nekoliko minuta.']);
}
$attempts[] = $now;
ftruncate($handle, 0);
rewind($handle);
fwrite($handle, json_encode($attempts));
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);

$values = [
    'name' => clean_line($payload['name'] ?? ''),
    'email' => clean_line($payload['email'] ?? ''),
    'company' => clean_line($payload['company'] ?? ''),
    'service' => clean_line($payload['service'] ?? ''),
    'budget' => clean_line($payload['budget'] ?? ''),
    'description' => clean_multiline($payload['description'] ?? ''),
];

$services = ['Izrada web stranica', 'SEO optimizacija', 'Izrada web trgovina', 'Održavanje web stranica', 'Nisam siguran'];
$budgets = ['Do 1.000 €', '1.000 € - 2.500 €', '2.500 € - 5.000 €', 'Više od 5.000 €', 'Nisam siguran'];
$errors = [];
if (string_length($values['name']) < 2 || string_length($values['name']) > 100) $errors['name'] = 'Unesite ime i prezime.';
if (string_length($values['email']) > 190 || !filter_var($values['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Unesite ispravnu e-mail adresu.';
if (string_length($values['company']) > 150) $errors['company'] = 'Naziv poslovanja je predug.';
if (!in_array($values['service'], $services, true)) $errors['service'] = 'Odaberite jednu od ponuđenih usluga.';
if (!in_array($values['budget'], $budgets, true)) $errors['budget'] = 'Odaberite jedan od ponuđenih raspona.';
if (string_length($values['description']) < 20 || string_length($values['description']) > 4000) $errors['description'] = 'Opis treba sadržavati između 20 i 4.000 znakova.';
if ($errors !== []) respond(422, ['ok' => false, 'message' => 'Provjerite označena polja.', 'errors' => $errors]);

$autoload = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('Legatech kontakt: PHPMailer nije instaliran.');
    respond(503, ['ok' => false, 'message' => 'Slanje trenutačno nije dostupno. Javite se na info@legatech.hr.']);
}
require $autoload;

$escape = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$requestId = bin2hex(random_bytes(8));

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) $config['smtp_host'];
    $mail->Port = (int) $config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_username'];
    $mail->Password = (string) $config['smtp_password'];
    $mail->SMTPSecure = (string) $config['smtp_encryption'];
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 15;
    $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
    $mail->addAddress((string) $config['recipient_email']);
    $mail->addReplyTo($values['email'], $values['name']);
    $mail->Subject = 'Novi upit: ' . $values['service'] . ' - ' . $values['name'];
    $mail->isHTML(true);
    $mail->Body = '<h1>Novi upit s legatech.hr</h1>'
        . '<p><strong>Ime:</strong> ' . $escape($values['name']) . '</p>'
        . '<p><strong>E-mail:</strong> ' . $escape($values['email']) . '</p>'
        . '<p><strong>Tvrtka ili obrt:</strong> ' . $escape($values['company'] ?: 'Nije navedeno') . '</p>'
        . '<p><strong>Usluga:</strong> ' . $escape($values['service']) . '</p>'
        . '<p><strong>Budžet:</strong> ' . $escape($values['budget']) . '</p>'
        . '<p><strong>Opis:</strong><br>' . nl2br($escape($values['description'])) . '</p>'
        . '<p><small>Identifikator upita: ' . $requestId . '</small></p>';
    $mail->AltBody = "Novi upit s legatech.hr\n\nIme: {$values['name']}\nE-mail: {$values['email']}\nTvrtka ili obrt: " . ($values['company'] ?: 'Nije navedeno') . "\nUsluga: {$values['service']}\nBudžet: {$values['budget']}\n\nOpis:\n{$values['description']}\n\nIdentifikator: {$requestId}";
    $mail->send();
} catch (Exception $error) {
    error_log('Legatech kontakt [' . $requestId . ']: SMTP slanje nije uspjelo: ' . $error->getMessage());
    respond(502, ['ok' => false, 'message' => 'Poruku trenutačno nije moguće poslati. Pokušajte ponovno ili nam pišite na info@legatech.hr.']);
}

respond(200, ['ok' => true, 'message' => 'Upit je poslan.']);
