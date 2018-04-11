<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $message = '<html>
                    <head>
                        <title>Заявка от:'.$name.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$name.'</p>
                        <p>Телефон: '.$phone.'</p>
                        <p>Город: '.$city.'</p>
                    </body>
                </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";

    mail("xagrssr@gmail.com", "Заявка от:" .$email, $message, $headers);
}
?>
