<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$titul = $_POST['titul'];
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$adress = $_POST['adress'];
$kategorie = $_POST['kategorie'];
$funkce = $_POST['funkce'];
$workspace = $_POST['workspace'];
$education = $_POST['education'];
$years = $_POST['years'];
$prednasky = $_POST['prednasky'];
$educationactivity = $_POST['educationactivity'];
$publication = $_POST['publication'];
$email2 = $_POST['email2'];
$tel2 = $_POST['tel2'];
$titul2 = $_POST['titul2'];
$name2 = $_POST['name2'];
$text = $_POST['text'];


// Retrieve form data

$mail = new PHPMailer(true);

try{


  $mail->SMTPDebug = SMTP::DEBUG_SERVER;   
    $mail -> charSet = "UTF-8";                   //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'mail.webglobe.cz';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'nominace@sestrickaroku.cz';                     //SMTP username
    $mail->Password   = 'ZqJgrsEBj4';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    $mail->setFrom('nominace@sestrickaroku.cz', 'Nominace Sestra Roku');
    $mail->addAddress('sestraroku@pardubickykraj.cz');     //Add a recipient
   
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Nominace Sestra roku 2024';
    $mail->Body    = "<b>Navrhovatel:</b> <br> Titul: " . $titul . "<br>" . "Jméno: " . $name . "<br>" .  "Email: " . $email . "<br>" . "Telefoní číslo: " . $tel .  "<br>" . "Adresa: " . $adress . "<br>" . "<br>" . "<b>Nominace sestřičky: </b>  <br>". "Titul: " . $titul2 . "<br>" . "Jméno: " . $name2 . "<br>"  . "Email: " . $email2 . "<br>" . "Telefoní číslo: " . $tel2 . "<br>" . "Kategorie: " . $kategorie . "<br>" . "Funkce: " . $funkce . "<br>" . "Pracoviště: " . $workspace . "<br>" . "Vzdělání: " . $education . "<br>" . "Počet let ve zdravotnictví: " . $years . "<br>" . "Přednášky: " . $prednasky . "<br>" . "Vzdělávací aktivity: " . $educationactivity . "<br>" . "Publikační aktivity: " . $publication . "<br>" . "<br>" . "Důvod: " . $text; 
    $mail->send();
    
}    

catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>


