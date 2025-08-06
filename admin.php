<?php
session_start();
include("db.php");

if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

// Padam pengguna jika ada ID diberikan
if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];
    $conn->query("DELETE FROM users WHERE id = $delete_id");
    header("Location: admin.php");
    exit();
}

$result = $conn->query("SELECT * FROM users");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel - Kids Nutrition Tracker</title>
    <style>
        body {
            background-color: #e0ffe0;
            font-family: Arial, sans-serif;
            color: #333;
            padding: 20px;
        }

        h1 {
            color: #008000;
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
        }

        th, td {
            border: 1px solid #9fff9f;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #66ff66;
            color: #003300;
        }

        tr:nth-child(even) {
            background-color: #f0fff0;
        }

        .delete-btn {
            color: red;
            text-decoration: none;
            font-weight: bold;
        }

        .logout-btn {
            display: inline-block;
            background-color: #00cc00;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
        }

        .logout-btn:hover {
            background-color: #009900;
        }
    </style>
</head>
<body>
    <h1>Admin Panel</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Umur</th>
            <th>Berat (kg)</th>
            <th>Ketinggian (cm)</th>
            <th>Padam</th>
        </tr>
        <?php while($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['nama']) ?></td>
            <td><?= $row['umur'] ?></td>
            <td><?= $row['berat'] ?></td>
            <td><?= $row['tinggi'] ?></td>
            <td><a class="delete-btn" href="admin.php?delete_id=<?= $row['id'] ?>" onclick="return confirm('Padam pengguna ini?')">Padam</a></td>
        </tr>
        <?php endwhile; ?>
    </table>

    <div style="text-align: center;">
        <a class="logout-btn" href="logout.php">Log Keluar</a>
    </div>
</body>
</html>