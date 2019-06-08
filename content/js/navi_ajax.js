/** 180616
 * jq重构
 */

/*
(function(){
	var Request = createRequest();
	var url = "./content/php/navi_get_ajax.php";
	if(Request != null){
		Request.open("GET",url,true);
		Request.send(null);
		Request.onreadystatechange = function(){
			if(Request.readyState == 4){
				var msg = "";
				var xmlDoc = Request.responseXML;
				var msgArr = xmlDoc.getElementsByTagName('item');
				for(var i = 0;i < msgArr.length;i++){
					var id = i;
					var name = msgArr[i].childNodes[0].innerHTML;
					var href = msgArr[i].childNodes[1].innerHTML;
					var imgsrc = msgArr[i].childNodes[2].innerHTML;	
					msg += ('<div class="navi-item" id="' + id + '"><div class="navi-icon btn btn-raised"><a href="' + href + '" target="_blank"><img src="' + imgsrc + '"></a></div><p>' + name + '</p></div>');
					// 对每个xml元素修饰
				}
				document.getElementById('navi-show').innerHTML = msg;
			}
		}
	}
}())
*/

$(document).ready(function(){
	var url = "./content/json/navi_set.json";
	$.get(url,function(json){
		$.each(json.items,function(index){
			var id = index;
			var name = this['name'];
			var href = this['href'];
			var imgsrc = this['imgsrc'];
			$("#navi-show").append('<div class="navi-item" id="' + id + '"><a href="' + href + '" class="navi-icon btn btn-raised" target="_blank"><img src="' + imgsrc + '"></a><p>' + name + '</p></div>');
		});
	});
});