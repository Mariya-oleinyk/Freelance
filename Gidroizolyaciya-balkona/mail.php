<?
$email = "remfo@yandex.ru";



function sendmail($message,$to,$from,$subject=false){
		if(!isset($subject)){$subject = $_SERVER['HTTP_HOST'];}
		$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";
		$headers .= 'To: <'.$to.'>'."\r\n";
		$headers .= 'From: '.$from.' <'.$from.'>' . "\r\n";
		mail($to, $subject, $message, $headers, 'info@'.$_SERVER['HTTP_HOST']);
}


//=========== Ajax запросы
if(isset($_POST['AjaxMethod'])){
	
	//--- Послать сообщение
	if($_POST['AjaxMethod']=='sendmail'){
		$dateIs  = date("Y.m.d H:i");
		$message="Сообщение с сайта ".$_SERVER['HTTP_HOST']." - ".$dateIs."<hr>";
		$message.="Перезвоните мне на номер: ".$_POST['phone']."<br>";
		$message.="<hr>";
		sendmail($message,$email,$_SERVER['HTTP_HOST']."@info.ru", "Сообщение с сайта ".$dateIs);
	}
	
	
}else{
	
	$phone = "";
	$file = "";
	if(isset($_POST["tel"])) { $phone = $_POST["tel"]; }
	
	if($phone=="") return false;
	
	if($_FILES['file']['name'] != "") {
		$uploaddir = "upload/";
		@mkdir($uploaddir, 777);
		$uploadfile = $uploaddir.basename($_FILES['file']['name']);
		copy($_FILES['file']['tmp_name'], $uploadfile);
		$file = $_FILES['file']['name'];
	}
	
	$dateIs  = date("Y.m.d H:i");
		$message="Заявка на консультацию проектировщика ".$_SERVER['HTTP_HOST']." - ".$dateIs."<hr>";
		$message.="Перезвоните мне на номер: ".$_POST['phone']."<br>";
		if($file!="") $message.="Прикрепленный файл: <a href='http://".$_SERVER['HTTP_HOST']."/".$uploadfile."'>".$file."</a><br>";
		$message.="<hr>";
		sendmail($message,$email,$_SERVER['HTTP_HOST']."@info.ru", "Заявка на консультацию проектировщика ".$dateIs);
}