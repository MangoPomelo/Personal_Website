<?php
  include './DataBase.vars.php';
  include "./DataBase.class.php";

  $DB = new DataBase(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

  $id = $_GET['id'];
  if(strlen($id)!=0){
  	$row = $DB->output("SELECT * FROM message_set WHERE id={$id}")[0];
  	$good = intval($row['good']) + 1;
  	$DB->input("UPDATE message_set SET good='{$good}' WHERE id={$id}");
  }
?>