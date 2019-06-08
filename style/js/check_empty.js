/** 180615
 * 早期javascript版本,已重构
 */

/*
function checkEmpty(msg,textarea){
	if(strip(msg) == ""){
		textarea.classList.add('error');
		textarea.select();
		textarea.focus();
		textarea.onblur = function(){textarea.classList.remove('error');}
		textarea.oninput = function(){textarea.classList.remove('error');}
		return true;
	}else{
		return false;
	}
}
*/

function checkEmpty($obj) { // jq对象
	if($.trim($obj.val()) == ""){
		$obj.addClass("error");
		$obj.trigger("focus");
		$obj.bind("blur input",function(){
			$(this).removeClass("error");
		});
		return true;
	}else{
		return false;
	}
}