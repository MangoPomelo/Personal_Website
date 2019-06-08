<?php
/**
* 不安全的简单Mysql封装
*/
class DataBase{
      	var $host;
      	var $user;
      	var $password;
      	var $name;
      	var $dbc;
     	function __construct($host,$user,$password,$name){
          	$this->host = $host;
          	$this->user = $user;
          	$this->password = $password;
          	$this->name = $name;
          	$this->dbc = mysqli_connect($host,$user,$password,$name);
          	mysqli_query($this->dbc,'set names utf8');
        }
      	function output($query){
          	$data_set = mysqli_query($this->dbc, $query);
          	$output = [];
          	while($row=mysqli_fetch_array($data_set)){
             	$output[] = $row; 
            }
          	return $output;
        }
      	function input($query){
          	mysqli_query($this->dbc, $query);
        }
      	function __destruct(){
         	 mysqli_close($this->dbc);
        }
    }
?>