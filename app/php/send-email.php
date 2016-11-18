<?php

error_reporting(-1);
ini_set('display_errors', 'On');

  require ('PHPMailer-master/class.phpmailer.php');
  require ('PHPMailer-master/class.smtp.php');

  if(isset($_POST["nombre"]) && $_POST["email"] && $_POST["mensaje"]){
    $nombre = $_POST["nombre"];
    $email = $_POST["email"] ."";
    $mensaje = $_POST["mensaje"];
    if(isset($_POST["telefono"])){
      $telefono = $_POST["telefono"];
    }
  }


  require ('PHPMailer-master/PHPMailerAutoload.php');

  $mail = new PHPMailer;

  $mail->SMTPDebug = 2;                               // Enable verbose debug output

  $mail->isSMTP();
  $mail->CharSet = 'utf-8';
  $mail->SMTPAuth = false; // Enables SMTP authentication.
  $mail->Host = "localhost";  // SMTP server host.

  $mail->SetFrom($email, $nombre);
  $mail->addAddress('christianjavan@hotmail.com', 'Christian Javan');     // Add a recipient
  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'Contacto desde ChristianJavan.com';
  $mail->Body    = $mensaje;
  //$mail->AltBody = 'Gracias por su mensaje';

  if(!$mail->send()) {
      echo 'Mailer Error: ' . $mail->ErrorInfo;
  } else {
      echo 'exito';
  }

 ?>
