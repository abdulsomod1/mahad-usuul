<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Simple authentication check (in production, use proper authentication)
if (!isset($_GET['admin']) || $_GET['admin'] !== 'true') {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

require_once 'config.php';

try {
    $db = getDB();
    $result = $db->query("SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC");

    $contacts = $result->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($contacts);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
