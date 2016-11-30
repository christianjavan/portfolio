<?php

  $email = $_POST['email'];
    $response = file_get_contents('http://apilayer.net/api/check?access_key=ceb4a11827fd3c13719404f5f71d7aa8&email='. $email .'&smtp=1&format=1');
    $obj = json_decode($response);
    if($obj->{'format_valid'}){
      echo "1";
    }else{
      echo "0";
    }

 ?>
