function sendGood(Obj){
	// Obj 来自 this
	var Request = createRequest();
	var url = "./content/php/good_send_ajax.php";
	var id = Obj.id; 
	if (!isInCookie(id) && id != null) {
		// 如果cookie里面没有
		Obj.classList.add("active"); // 本地更新active
		Obj.nextSibling.innerHTML ++;	// 本地更新点赞数,交互性更佳
		Request.open("GET",url + "?id=" + id,true);
		Request.send(null);
		/**
		* 设置cookie,用于避免重复点赞
		*/
		document.cookie = id + "=true";
	}
}
// 180616 懒得重构了