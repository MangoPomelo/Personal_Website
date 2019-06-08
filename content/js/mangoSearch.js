/** 180615
 * jq重构
 */

/*
(function(){
	var url;
	var value;
  	var target = bili;
  	var searchbtn = document.getElementById('search-button');
	var searchtext = document.getElementById('search-text');
	searchtext.onkeypress = function(Event){
		if (Event.keyCode === 13){
			searchbtn.click();
			return;
		}
	}
	bili.onclick = function(){
		url = "https://search.bilibili.com/all?keyword=";
      	target.classList.remove("active");
		bili.classList.add("active");
      	target = bili;
      	searchtext.select();
	}
	dili.onclick = function(){
		url = "http://www.dilidili.wang/search/index.html?q=";
      	target.classList.remove("active");
		dili.classList.add("active");
      	target = dili;
      	searchtext.select();
	}
	dmzj.onclick = function(){
		url = "https://manhua.dmzj.com/tags/search.shtml?s=";
		target.classList.remove("active");
		dmzj.classList.add("active");
      	target = dmzj;
      	searchtext.select();
	}
	pixiv.onclick = function(){
		url = "http://www.pixiv.net/search.php?word=users入り%20";
      	target.classList.remove("active");
      	pixiv.classList.add("active");
      	target = pixiv;
      	searchtext.select();
	}
	searchbtn.onclick = function(){
		value = document.getElementById("search-text").value;
		if(url == null){
			searchtext.value = "";
			searchtext.placeholder = "先在左上角选择一个网站啦 d(`･∀･)b";
		}else if(value.length==0){
			searchtext.placeholder = "究竟想找些什么呢 (*´･д･)?";
			searchtext.select();
		}else{
          	re = /^[\d]+$/;
          	if(re.test(value) && url == "http://www.pixiv.net/search.php?word=users入り%20"){
				open("https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + value);
              	location.href = "https://www.pixiv.net/member.php?id=" + value;
              	// p站有作者id和图片id之分
              	// 两个open会被当成广告
            }else{
				open(url + value);
            }
		}
	}
}())
*/

(function(){
	var url = "https://search.bilibili.com/all?keyword=";
	var value = "";
	var $target = $("#bili");
	$target.addClass("active");
	// 初始化
	$("#search-text").keypress(function(Event){
		if(Event.keyCode == 13){
			$("#search-button").trigger("click");
		}
	});

	$("#bili").click(function(){
		url = "https://search.bilibili.com/all?keyword=";
		$target.removeClass("active");
		$(this).addClass("active");
		$target = $(this);
		$('#search-text').trigger("focus");
	});
	$("#age").click(function(){
		url = "http://donghua.agefans.com/search?page=1&query=";
		$target.removeClass("active");
		$(this).addClass("active");
		$target = $(this);
		$('#search-text').trigger("focus");
	});
	$("#dmzj").click(function(){
		url = "https://manhua.dmzj.com/tags/search.shtml?s=";
		$target.removeClass("active");
		$(this).addClass("active");
		$target = $(this);
		$('#search-text').trigger("focus");
	});
	$("#pixiv").click(function(){
		url = "http://www.pixiv.net/search.php?word=users入り%20";
		$target.removeClass("active");
		$(this).addClass("active");
		$target = $(this);
		$('#search-text').trigger("focus");
	});
	$("#search-button").click(function(){
		value = $("#search-text").val();
		if(value.length == 0){
			$("#search-text").trigger("focus");
		}else{
          	re = /^[\d]+$/;
          	if(re.test(value) && $target.attr('id') == "pixiv"){
				open("https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + value);
              	location.href = "https://www.pixiv.net/member.php?id=" + value;
              	// p站有作者id和图片id之分
              	// 两个open会被当成广告
            }else{
				open(url + value);
            }
		}
	});


	// 180616 图片搜索
	$("#iqdb").change(function(){
        $("#img-search-msg").html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
    	$("#iqdbsubmit").trigger("click");
    	$(this).val('');
    });
    $("#saucenao").change(function(){
        $("#img-search-msg").html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
        $("#saucenaosubmit").trigger("click");
        $(this).val('');
    });
    $("#tineye").change(function(){
        $("#img-search-msg").html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
        $("#tineyesubmit").trigger("click");
        $(this).val('');
    });

}());