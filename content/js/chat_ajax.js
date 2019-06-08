var page = 0;
var totalPage = 0;

$("#chat-box-btn").click(function(){
	var url = "./content/php/chat_send_ajax.php";
	var $textarea = $("#chat-box-textarea");
	if(!checkEmpty($textarea)){
		$(this).html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
		$(this).attr('disabled',true);
		$.ajax({
			url: url,
			data: "msg=" + $textarea.val(),
			async: false,
			type: 'POST',
			success: function(){
				getMessage(page);
				$textarea.val("");
			}
		});
	}
});

/**
 * 180616 重构

document.getElementById('chat-box-btn').onclick = function sendMessage(){
	sendMessageRequest = createRequest();
	var url = "./content/php/chat_send_ajax.php";
	var textarea = document.getElementById('chat-box-textarea');
	var msg = textarea.value;
	if(!checkEmpty(msg,textarea)){
		if(sendMessageRequest != null){
			this.innerHTML = '<i class="fa fa-spinner fa-pulse fa-2x"></i>'; // 上传中动画效果
			this.disabled = true; // 点击禁止
			sendMessageRequest.open("GET", url + "?msg=" + msg, false); // 不能异步,要等待信息发送完成才可以接触按钮限制
			sendMessageRequest.send(null);
			getMessage(page); // 更新留言板
			textarea.value = ""; // 避免多次提交相同内容
		}else{
			alert("请检查网络");
		}
	}
}
*/

getMessage(page); // 加载网站后立即执行
setInterval(function(){getMessage(page)},30000);

function getMessage(page){
	$.get("./content/php/chat_get_ajax.php?page=" + page,function(json){
		changeContent(json);
	});
}

/* 180616
function getMessage(page){
	console.log("PAGE = " + page);
	getMessageRequest = createRequest(); // 回调函数this全局
	var url = "./content/php/chat_get_ajax.php";
	if(getMessageRequest != null){
		getMessageRequest.open("GET",url + "?page=" + page,true);
		getMessageRequest.send(null);
		getMessageRequest.onreadystatechange = changeContent;
	}
}
*/

function changeContent(json){
	$("#chat-box-show").html(''); // 清空留言板
	totalPage = json.totalPage;
	$('#totalPage').html(totalPage);
	$.each(json.items,function(){
		var id = this.id;
		var content = this.message;
		var dataTime = this.time;
		var good = this.good;
		var style = isInCookie(id)?"active":"";
		// 新建元素
		var elem = $('<div class="chat-box-item"><p>' + content + '</p><div class="chat-box-item-info"><span>#' + id + '</span><span>' + dataTime + '</span><span><button id="' + id + '" class="fa fa-thumbs-o-up ' + style + '"></button><span>' + good + '</span></span></div></div>');
		elem.find('button').click(function(){
			sendGood(this); // 绑定事件
		});
		$('#chat-box-show').append(elem);
	});
	
	// 分页器
	$("#page_span").html(""); // 清空
	var elem = $("#page_span");
	if(page > 0){
		// 添加上一页
		var prev = $('<button class="btn" id="page_prev">上一页</button>').click(function(){
			getMessage(--page);
		});
		elem.append(prev);
	}
	// 添加中间页
	var len = 2;
	for(var i = Math.max(page-len,0);i<=Math.min(parseInt(page)+len,totalPage-1);i++){
		var cube = $('<button class="btn ' + (page==i?"active":"") + '" id="' + i + '">' + (i+1) + '</button>').click(function(){
			page = this.id;
			getMessage(page);
		});
		elem.append(cube);
	}
	if(page < totalPage-1){
		// 添加下一页
		var next = $('<button class="btn" id="page_next">下一页</button>').click(function(){
			getMessage(++page);
		});
		elem.append(next);
	} // 分页器结束

	// 解锁发表按钮
	$("#chat-box-btn").attr('disabled',false);
	$("#chat-box-btn").html("发表留言");
}

/* 180616
function changeContent(){
	if(getMessageRequest.readyState == 4){
		var msg = "";
		var xmlDoc = getMessageRequest.responseXML;
		maxPage = xmlDoc.getElementsByTagName('totalPage')[0].innerHTML;
		var msgArr = xmlDoc.getElementsByTagName('item');
		for(var i = 0;i < msgArr.length;i++){
			var id = msgArr[i].childNodes[0].innerHTML;
			var content = msgArr[i].childNodes[1].innerHTML;
			var dataTime = msgArr[i].childNodes[2].innerHTML;
			var good = msgArr[i].childNodes[3].innerHTML;
			var style = isInCookie(id)?"active":"";
			msg += ( '<div class="chat-box-item"><p>' + content + '</p><div class="chat-box-item-info"><span>#' + id + '</span><span>' + dataTime + '</span><span><button id="' + id + '" class="fa fa-thumbs-o-up ' + style + '" onclick="sendGood(this)"></button><span>' + good + '</span></span></div></div>');
			// 对每个xml元素修饰
		}
		document.getElementById('totalPage').innerHTML = maxPage;
		var page_span = document.getElementById('page_span');
		pageSpanContent = "";
		if(page > 0){
			pageSpanContent += '<button class="btn" id="page_prev" onclick=javascript:getMessage(--page)>上一页</button>';
		}
		var len = 2;
		for(var i = Math.max(page-len,0);i < Math.min(page+len+1,maxPage);i++){
			pageSpanContent += '<button class="btn ' + (page==i?"active":"") + '" onclick=javascript:getMessage(page=' + i + ')>' + (i+1) + '</button>';
		}
		if(page < maxPage-1){
			pageSpanContent += '<button class="btn" id="page_next" onclick=javascript:getMessage(++page)>下一页</button>';
		}
		page_span.innerHTML = pageSpanContent;
		document.getElementById('chat-box-show').innerHTML = msg;
		
		var btn = document.getElementById('chat-box-btn');
		btn.disabled = false;
		btn.innerHTML = "发表留言";	
	}
}
*/