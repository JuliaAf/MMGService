<?php


if (isset($_POST['phone']) ){
	$message ='<h2>Новая заявка с сайта <br />MMG Service</h2>
		<p>От <b>'.$_REQUEST['name'].'</b></p>
		<p>Тел.: <b>'.$_REQUEST['phone'].'</b></p>';



	// echo $_SESSION['utm_source'].'/ss';

	if(isset($_POST['email']) )
		$message .= '<p>E-mail: <b>'.$_REQUEST['email'].'</b></p>';

	include "class.phpmailer.php";

	$mail = new PHPMailer();
	$mail->From = $_REQUEST['email'] ? $_REQUEST['email'] : "a290288@gmail.com";
	$mail->FromName = $_REQUEST['name'];
	$mail->AddAddress('a290288@gmail.com');
	$mail->IsHTML(true);
	$mail->Subject = $_REQUEST['name']." оставил(а) заявку";
	$mail->Body = $message;

	// $sms = urlencode("Новая заявка от ". substr($_REQUEST['name'],0,24) ." Тел. ".$_REQUEST['phone']);

	// file_get_contents("http://sms.ru/sms/send?api_id=28d14496-ca0d-0944-3113-0658fda72726&to=???????????&text=".$sms);

	if (!$mail->Send()) print ('Mailer Error: '.$mail->ErrorInfo);

	echo  "Ваша заявка отправлена.";


 }?>
