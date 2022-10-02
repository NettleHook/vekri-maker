<?php
require "VekriClass.php";
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $desc = $_POST['desc'];
    $filename = $name . '.txt';
    if (isset($_SESSION['vekri'])) {
	$_SESSION['vekri']->makeFile($name, $desc, $filename);
    }
    //do the download
    //delete the file
    //unlink($filename);
}
?>
