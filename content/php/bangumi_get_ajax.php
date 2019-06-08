<?php
  header("Content-Type: text/json");
  $curl=curl_init();
  $url = "http://bangumi.bilibili.com/api/timeline_v2_global";
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $buf = curl_exec($curl);
  curl_close($curl);
  echo $buf;
?>