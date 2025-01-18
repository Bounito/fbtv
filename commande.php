<?php
// Récupérer les paramètres passés dans l'URL
$ip = filter_input(INPUT_GET, 'ip', FILTER_VALIDATE_IP);
$code = filter_input(INPUT_GET, 'code', FILTER_SANITIZE_STRING);
$command = filter_input(INPUT_GET, 'command', FILTER_SANITIZE_STRING);

if ($ip === false || !$code || $command === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Paramètres manquants ou invalides.']);
    exit;
}

// Construire l'URL de la requête
$url = "http://$ip/pub/remote_control?code=$code&key=$command";

// Effectuer la requête vers l'appareil
$options = [
    'http' => [
        'method' => 'GET',
        'header' => 'Content-Type: application/json'
    ]
];

$context = stream_context_create($options);
$response = @file_get_contents($url, false, $context);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Impossible de contacter l\'appareil.']);
} else {
    echo $response; // Relayer la réponse
}
?>
