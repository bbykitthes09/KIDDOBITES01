<?php
// Sambung ke pangkalan data
$conn = mysqli_connect("localhost", "root", "", "tracker");

// Semak sambungan
if (!$conn) {
    die("Sambungan gagal: " . mysqli_connect_error());
}

// Dapatkan semua data dari jadual tracker
$sql = "SELECT * FROM tracker";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Nutrition Tracker</title>
    <style>
        table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
        }
        th, td {
            padding: 10px;
            border: 1px solid #aaa;
            text-align: center;
        }
    </style>
</head>
<body>

<h2 style="text-align:center;">Senarai Nutrisi</h2>

<table>
    <tr>
        <th>ID</th>
        <th>Makanan</th>
        <th>Kalori</th>
        <th>Protein</th>
        <th>Kategori</th>
        <th>Tarikh</th>
    </tr>
    <?php
    if (mysqli_num_rows($result) > 0) {
        // Papar setiap baris
        while($row = mysqli_fetch_assoc($result)) {
            echo "<tr>
                    <td>".$row["id"]."</td>
                    <td>".$row["makanan"]."</td>
                    <td>".$row["kalori"]."</td>
                    <td>".$row["protein"]."</td>
                    <td>".$row["kategori"]."</td>
                    <td>".$row["tarikh"]."</td>
                </tr>";
        }
    } else {
        echo "<tr><td colspan='6'>Tiada data</td></tr>";
    }

    // Tutup sambungan
    mysqli_close($conn);
    ?>
</table>

</body>
</html>