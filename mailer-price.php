<?php
if($_POST){
    $name = $_POST['name'];
    $time = $_POST['time'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $message = '<html>
                    <head>
                        <title>Рассчитать стоимость для:'.$name.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$name.'</p>
                        <p>Телефон: '.$phone.'</p>
                        <p>Удобное время: '.$time.'</p>
                        <p>Город: '.$city.'</p>
                    </body>
                </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";

    mail("sale@homelekom.ru", "Расчет стоимости для:" .$email, $message, $headers);
}
?>
