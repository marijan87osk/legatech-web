<?php

declare(strict_types=1);

return [
    'smtp_host' => 'smtp.example.com',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl',
    'smtp_username' => 'info@legatech.hr',
    'smtp_password' => 'PROMIJENITE_OVU_VRIJEDNOST',
    'from_email' => 'info@legatech.hr',
    'from_name' => 'Legatech web',
    'recipient_email' => 'info@legatech.hr',
    'allowed_origins' => ['https://legatech.hr', 'https://www.legatech.hr'],
    'rate_limit_salt' => 'DUGA_NASUMICNA_VRIJEDNOST',
];
