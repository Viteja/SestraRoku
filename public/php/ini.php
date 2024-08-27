<?php
require_once 'cors.php';

//db connect
$db_host = "db.dw195.webglobe.com";
$db_user = "sestrickaroku_cz";
$db_password = "Sestraroku2024";
$db_name = "Vote";
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$conn) {
    die("Připojení se nezdařilo. " . mysqli_connect_error());
}