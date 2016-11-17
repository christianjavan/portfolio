<?php

error_reporting(-1);
ini_set('display_errors', 'On');
echo 'hola';
//require_once 'PHPMailer-master/PHPMailerAutoload.php'
require_once 'PHPMailer-master/class.smtp.php';
require_once 'PHPMailer-master/class.phpmailer.php';


$mail = new PHPMailer();
$mail -> Host = localhost;

$mail -> From = 'email@tumadre.com';
$mail -> AddAddress('christianjavan@hotmail.com');
$mail -> Subject = 'prueba de correo';
$mail ->Body = 'Hola. \n\n ESTO ES UNA PRUEBA DE CORREO.';
if(!$mail -> Send()){
  echo 'No se ha podido enviar el correo.';
  echo 'Mailer error: ' . $mail ->ErrorInfo;
} else{
  echo 'Correo enviado exitosamente.';
}

 ?>
