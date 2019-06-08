<?php
	header("Access-Control-Allow-Origin: *");
	$FILE_POOL = "../../file_pool/";
	$target = $FILE_POOL . $_FILES['file']['name'];
	if(array_pop(explode(".", $target)) != "php"){
    	// $target = iconv('UTF-8', 'gbk', $target); // 文件名乱码解决方案
    	return move_uploaded_file($_FILES['file']['tmp_name'], $target); 
    }else{
      	return false;
    }
?>