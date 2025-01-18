<?php
// Récupérer les paramètres passés dans l'URL
$path = filter_input(INPUT_GET, 'path', FILTER_SANITIZE_STRING);

if ($path === null || !preg_match('/^[a-zA-Z0-9_\/-]+$/', $path)) {
    http_response_code(400);
    echo json_encode(['error' => 'Paramètres manquants ou invalides. '.$path]);
    exit;
}

// URL de l'API Freebox
$apiUrl = "http://mafreebox.freebox.fr/$path";

// Effectuer la requête GET vers l'API
$response = @file_get_contents($apiUrl);
if ($response === false) {
    $error = error_get_last();
    http_response_code(500);
    echo json_encode(['error' => "Erreur lors de la requête : " . $error['message']]);
    exit;
}

// Décoder la réponse JSON
$data = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la décodification JSON.']);
    exit;
}

// Vérifier que le champ attendu existe
if (!isset($data)) {
    http_response_code(500);
    echo json_encode(['error' => 'Données invalides ou absentes.']);
    exit;
}

// Retourner les données avec clés et valeurs sous forme de JSON
header('Content-Type: application/json');
echo json_encode($data); // Ne réindexe pas, conserve les clés et les valeurs telles qu'elles sont
?>
