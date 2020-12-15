<?php
include('conexion.php');
if((isset($_POST['name']) && !empty($_POST['name']))
&& (isset($_POST['email']) && !empty($_POST['email']))
&& (isset($_POST['subject']) && !empty($_POST['subject']))){

	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	
	$to = "TU-EMAIL@gmail.com";
	$headers = "From : " . $email;
	if( mail($to, $subject, $message, $headers)){
	$query = "INSERT INTO `contact` (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";
		$result = mysqli_query($connection, $query);
		if(!$resultado) {
      die("Query Failed.");
    }
    $_SESSION['message'] = 'Email enviado exitosamente, pronto nos pondremos en contacto con usted.';
    $_SESSION['message_type'] = '';
    header('Location: ../menu.php');
	}
}
?>