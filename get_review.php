<?php
header('Content-Type: application/json');

$movie_id = $_GET['movie_id'] ?? null;
$reviewsFile = '../Data/reviews.json';

if (!$movie_id || !file_exists($reviewsFile)) {
    echo json_encode([]);
    exit;
}

$reviewsContent = file_get_contents($reviewsFile);
$reviews = json_decode($reviewsContent, true);

if ($reviews === null && json_last_error() !== JSON_ERROR_NONE) {
    // Ошибка парсинга JSON
    echo json_encode([]);
    exit;
}

if (isset($reviews[$movie_id])) {
    echo json_encode($reviews[$movie_id]);
} else {
    echo json_encode([]);
}
