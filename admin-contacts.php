<?php
session_start();

// Simple authentication check (in production, use proper authentication)
if (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true) {
    header('Location: index.html');
    exit;
}

require_once 'config.php';

try {
    $db = getDB();
    $result = $db->query("SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC");

    $contacts = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $contacts[] = $row;
    }

    $db->close();
} catch (Exception $e) {
    $contacts = [];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Contact Submissions</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <h1>Mahad Usuul - Admin</h1>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Back to Site</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Contact Form Submissions</h2>
            <table class="contacts-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($contacts as $contact): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($contact['id']); ?></td>
                        <td><?php echo htmlspecialchars($contact['name']); ?></td>
                        <td><?php echo htmlspecialchars($contact['email']); ?></td>
                        <td><?php echo htmlspecialchars($contact['message']); ?></td>
                        <td><?php echo htmlspecialchars($contact['created_at']); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </section>
    </main>

    <footer>
        <p>&copy; 2023 Mahad Usuul. All rights reserved.</p>
    </footer>
</body>
</html>
