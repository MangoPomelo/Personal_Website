<?php
  include './DataBase.vars.php';
  include "./DataBase.class.php";
  header("Content-Type: text/json");

  $DB = new DataBase(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  $elementsNum = $DB->output('SELECT count(*) FROM message_set')[0][0];
  $page = $_GET['page'];
  $pageEleNum = 5;
  $start = $pageEleNum * $page;
  $totalPage = ceil($elementsNum/$pageEleNum);
  $elementsArr = $DB->output("SELECT * FROM message_set ORDER BY id DESC LIMIT {$start},{$pageEleNum}");
  $json = array('totalPage' => $totalPage);
  $items = array();
  foreach($elementsArr as $row){
    /*
      item:
        id:
        message:
        time:
        good:
    */
    $item = array();
    $item['id'] = trim($row['id']);
    $item['message'] = trim($row['message']);
    $item['time'] = trim($row['time']);
    $item['good'] = trim($row['good']);
    array_push($items,$item);
  };
  $json['items'] = $items;
  echo json_encode($json);
?>