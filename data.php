<?php
// Sambung ke database
$host = "localhost";
$user = "root";
$password = "";
$database = "nutritrack"; // Nama database yang kita buat tadi

$conn = new mysqli($host, $user, $password, $database);

// Semak sambungan
if ($conn->connect_error) {
    die("Sambungan gagal: " . $conn->connect_error);
}

// Ambil semua data dari table makanan
$sql = "SELECT * FROM makanan";
$result = $conn->query($sql);

// Hantar data dalam format JSON
$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>