function load() {
	var $pool = $(".pool-files");
	$pool.empty();
	var url = "./content/php/pool_get_ajax.php";
	$.get(url,function(json){
		$.each(JSON.parse(json), function() {
			var filename = this.filename;
			var download_url = this.download_url;
			var filesize = this.filesize;
			var $elem = $('<div class="pool-item"><div class="epsilon">' + filename + '</div><span class="delta"><span class="alpha">' + filesize + 'KB</span>&nbsp<a class="beta" href="' + download_url + '" download="' + filename + '">下载</a>&nbsp<a class="gammar">删除</a></span></div>');
			$elem.find(".gammar").click(function(){
				file_delete(this);
			});
			$pool.append($elem);
		});
	});
}

function file_delete(Obj){
	var download_url = $(Obj).prev().attr('href');
	var url = "./content/php/pool_delete_ajax.php";
	$.ajax({
		url : url,
		data : "filename=" + download_url.split("/").pop(),
		type : 'POST',
		success : function(data){
			load();
		},
		error : function(){
			alert("失败");
		}
	})
}

$(document).ready(function() {
	load();

	$("#file").change(function(){
		var Data = new FormData();
		var file_obj = document.getElementById("file").files[0];
		Data.append('file', file_obj);
		$.ajax({
			url : './content/php/pool_send_ajax.php',
			type : 'POST',
			data : Data,
          	async: false,
			processData : false,
			contentType : false,
			success : function(){
				load();
			},
			error : function(){
				alert("失败");
			}
		});
	});
});