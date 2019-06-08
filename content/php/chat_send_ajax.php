<?php
  include './DataBase.vars.php';
  include "./DataBase.class.php";
  date_default_timezone_set('Asia/Shanghai'); // 注意时区
  $DB = new DataBase(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

  $msg = $_POST['msg'];
  $time = date("Y-m-d H:i:s");
  if(strlen($msg)!=0){
  	$DB->input("INSERT INTO message_set (message,time) VALUES ('{$msg}','{$time}')");
  }
?>