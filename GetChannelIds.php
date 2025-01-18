<?php
header('Content-Type: application/json');

// URL de l'API
$url = "https://xmltv.digital3d.com/api/GetChannelIds";

// Initialiser cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

// Exécuter la requête
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false || $httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la requête.', 'details' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Retourner les données JSON au client
echo $response;
?>
