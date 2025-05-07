<?php
require_once 'db.php';

function loginUser($email, $password) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT id, first_name, last_name, password FROM Users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            return [
                'success' => true,
                'user_id' => $user['id'],
                'user_name' => $user['first_name'] . ' ' . $user['last_name']
            ];
        }
    }
    
    return ['success' => false, 'message' => 'Invalid email or password'];
}

function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}
?>