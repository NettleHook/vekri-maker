<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $servername = "";
    $username = "";
    $password = "";
    $dbname = "";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $selection = "Desert";
    $sql = "SELECT * FROM VekriSampler WHERE name = '$selection'";
    $data = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($data);



    mysqli_close($conn);
}
