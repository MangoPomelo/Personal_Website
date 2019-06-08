<?php
	header("Access-Control-Allow-Origin: *");
	$FILE_POOL = "../../file_pool/";
	$json = array();
	$dir_handle = opendir($FILE_POOL);
	while ($filename = readdir($dir_handle)) {
		if($filename != "." && $filename != ".."){
			$filesize = round(filesize($FILE_POOL . $filename)/1024,2);
			$download_url = "./file_pool/" . $filename;
            $changed_time = date("Y-m-d H:i:s", filemtime($FILE_POOL . $filename));
			$item = array('filename' => $filename, 'download_url' => $download_url, 'filesize' => $filesize, 'changed_time' => $changed_time );
			array_push($json, $item);
		}
	}
	closedir($dir_handle);
	echo json_encode($json);
?>