<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['movie_id']) || !isset($data['name']) || !isset($data['text'])) {
    echo json_encode(['success' => false]);
    exit;
}

$movie_id = $data['movie_id'];
$name = strip_tags($data['name']);
$text = strip_tags($data['text']);

$reviewsFile = '../Data/reviews.json';

if (!file_exists($reviewsFile)) {
    file_put_contents($reviewsFile, '{}');
}

$reviews = json_decode(file_get_contents($reviewsFile), true);

if (!isset($reviews[$movie_id])) {
    $reviews[$movie_id] = [];
}

$reviews[$movie_id][] = [
    'name' => $name,
    'text' => $text,
    'timestamp' => time()
];

file_put_contents($reviewsFile, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true]);
