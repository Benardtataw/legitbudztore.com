<?php
$to = "info.letgitbuds@usa.com";
$subject = "HTML email";
$name = $_POST['your-name'];
$email = $_POST['your-email'];
$subject = $_POST['your-subject'];
$mess = $_POST['your-message'];
$message = "
<html>
<head>
<title>Contact request from letgitbudztore.com website</title>
</head>
<body>
<p>".$mess."</p>
<table>
<tr>
<th>Firstname</th>
<th>Email</th>
</tr>
<tr>
<td>".$name."</td>
<td>".$email."</td>
</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";


mail($to,$subject,$message,$headers);
?>