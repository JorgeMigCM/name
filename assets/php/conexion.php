<?php
$connection = mysqli_connect('localhost', 'root', '');
if (!$connection){
    die("Fallo en la conexion con la base de datos" . mysqli_error($connection));
}
$select_db = mysqli_select_db($connection, 'db_email');
if (!$select_db){
    die("Base de datos no encontrada" . mysqli_error($connection));
}
?>