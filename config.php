<?php
// Database configuration for MySQL using PDO
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mahad_usuul";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Create tables if they don't exist
$conn->exec("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$conn->exec("CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$conn->exec("CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// Insert sample data if not exists
$result = $conn->query("SELECT COUNT(*) as count FROM events");
$row = $result->fetch(PDO::FETCH_ASSOC);
if ($row['count'] == 0) {
    $conn->exec("INSERT INTO events (title, description, date, location) VALUES
        ('Islamic Studies Lecture', 'A lecture on Islamic studies fundamentals', '2024-12-01', 'Main Hall'),
        ('Arabic Language Workshop', 'Interactive workshop for Arabic learners', '2024-12-15', 'Classroom A')");
}

$result = $conn->query("SELECT COUNT(*) as count FROM users WHERE username='admin'");
$row = $result->fetch(PDO::FETCH_ASSOC);
if ($row['count'] == 0) {
    $hashed_password = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $stmt->execute(['admin', $hashed_password, 'admin@mahadusuul.com']);
}

// Function to get database connection
function getDB() {
    global $conn;
    return $conn;
}
?>
