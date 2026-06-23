<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle CORS
header("Access-Control-Allow-Origin: *"); // Allow all origins or specify your React server
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "food_for_all";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ensure JSON response
header('Content-Type: application/json');

// Main logic for POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // User Registration
    if (isset($_POST['register_user'])) {
        $username = $_POST['username'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "User registration failed: " . $stmt->error]);
        }

        $stmt->close();
        exit;
    }

    // Volunteer Registration
    if (isset($_POST['register_volunteer'])) {
        $full_name = $_POST['full_name'] ?? '';
        $email = $_POST['email'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $address = $_POST['address'] ?? '';
        $availability = $_POST['availability'] ?? '';
        $experience = $_POST['experience'] ?? '';
        $interests = $_POST['interests'] ?? '';
        $transportation = $_POST['transportation'] ?? '';

        $stmt = $conn->prepare("INSERT INTO volunteers (full_name, email, phone, address, availability, experience, interests, transportation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $full_name, $email, $phone, $address, $availability, $experience, $interests, $transportation);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Volunteer registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Volunteer registration failed: " . $stmt->error]);
        }

        $stmt->close();
        exit;
    }

    // Donation Submission
    if (isset($_POST['donate_food'])) {
        $donor_name = $_POST['donor_name'] ?? '';
        $food_type = $_POST['food_type'] ?? '';
        $donation_type = $_POST['donation_type'] ?? '';
        $expiry_date = $_POST['expiry_date'] ?? '';
        $food_image = "";

        // Handle file upload
        if (isset($_FILES['food_image']) && $_FILES['food_image']['error'] === 0) {
            $target_dir = "uploads/";
            $target_file = $target_dir . basename($_FILES['food_image']['name']);
            if (move_uploaded_file($_FILES['food_image']['tmp_name'], $target_file)) {
                $food_image = $target_file;
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to upload file"]);
                exit;
            }
        }

        // Insert donation data into the database
        $stmt = $conn->prepare("INSERT INTO donations (donor_name, food_type, donation_type, expiry_date, food_image) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $donor_name, $food_type, $donation_type, $expiry_date, $food_image);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Donation submitted successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Donation submission failed: " . $stmt->error]);
        }

        $stmt->close();
        exit;
    }

    // Invalid request
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

// Invalid HTTP method
echo json_encode(["status" => "error", "message" => "Invalid HTTP method"]);
$conn->close();
?>
