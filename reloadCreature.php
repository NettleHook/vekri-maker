
<?php
require "VekriClass.php";
session_start();
//get the creature
//first check that POST was used
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "";
    $username = "";
    $password = "";
    $dbname = "";

    $texture = $_POST['texture'];
    $len = $_POST['length'];
    $bellyID = $_POST['belly'];
    $faceID = $_POST['face'];
    $earID = $_POST['ear'];
    $tailID = $_POST['tail'];
    $hornID = $_POST['horn'];
    $gemID = $_POST['gem'];
    $eyes = $_POST['eye1'];
    $pupilID = $_POST['pupil'];
    $mouthID = $_POST['mouth'];
    $changed = $_POST['changed'];
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    if (!isset($_SESSION['vekri'])) {
        $_SESSION['vekri'] = new Vekri();
    }
    if ($changed == 'all' || $changed == 'fur') {
        $sql = "SELECT * FROM BodySamples WHERE texture = '$texture' AND length = $len AND id = 1 AND type = 'body'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->body = $row['info'];
    }
    if ($changed == 'all' || $changed == 'ear' || $changed == 'fur') {
        $sql = "SELECT * FROM BodySamples WHERE texture = '$texture' AND length = $len AND id = $earID AND type = 'ear'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->ear = $row['info'];
    }
    if ($changed == 'all' || $changed == 'tail' || $changed == 'fur') {
        $sql = "SELECT * FROM BodySamples WHERE texture = '$texture' AND length = $len AND id = $tailID AND type = 'tail'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->tail = $row['info'];
    }
    if ($changed == 'all' || $changed == 'face') {
        $sql = "SELECT * FROM BodyFeat WHERE id = $faceID AND type = 'face'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->face = $row['info'];
    }
    if ($changed == 'all' || $changed == 'belly') {
        $sql = "SELECT * FROM BodyFeat WHERE id = $bellyID AND type = 'belly'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->belly = $row['info'];
    }
    if ($changed == 'all' || $changed == 'gem') {
        $sql = "SELECT * FROM FaceFeat WHERE id = $gemID AND type = 'gem'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->gem = $row['info'];
    }
    if ($changed == 'all' || $changed == 'eyes' || $changed == 'eyes1' || $changed == 'eyes2' || $changed == 'pupil') {
        $sql = "SELECT * FROM FaceFeat WHERE id = $eyes AND type = 'eye'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->eye = $row['info'];
        if ($eyes % 7 == 0) {
            $_SESSION['vekri']->pupil = "";
        } else {
            $sql = "SELECT * FROM FaceFeat WHERE id = $pupilID AND type = 'pupil'";
            $data = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($data);
            $_SESSION['vekri']->pupil = $row['info'];
        }
    }
    if ($changed == 'all' || $changed == 'mouth') {
        $sql = "SELECT * FROM FaceFeat WHERE id = $mouthID AND type = 'mouth'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->mouth = $row['info'];
    }
    if ($changed == 'all' || $changed == 'horn') {
        $sql = "SELECT * FROM BodyFeat WHERE id = $hornID AND type = 'horn'";
        $data = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($data);
        $_SESSION['vekri']->horn = $row['info'];
    }
    echo $_SESSION['vekri']->stringify();
    mysqli_close($conn);
}
?>
