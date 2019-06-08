<?php
	header("Access-Control-Allow-Origin: *");
	$FILE_POOL = '../../file_pool/';
	$filename = basename($_POST['filename']);
	// 安全问题,存在非法调用,故利用一层转换
	// $target = iconv('UTF-8', 'gbk', $filepath); // 文件名乱码解决方案
	return unlink($FILE_POOL . $filename);
?>