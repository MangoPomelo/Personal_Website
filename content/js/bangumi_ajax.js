/** 180616
 * jq重构
 */

/*
(function(){
  var today = (new Date()).getDay();
  document.getElementById("nav-tabs").getElementsByTagName('a')[today+1].click(); // 转到今天
  var Request = createRequest();
  var url = "./content/php/bangumi_get_ajax.php";
  if(Request != null){
    Request.open("GET",url,true);
    Request.send(null);
    Request.onreadystatechange = function(){
      if(Request.readyState == 4){
        var msg = ["","","","","","","",""];
        var json = eval('('+Request.responseText+')');
        var items = json['result'];
        for(var i = 0;i < items.length;i++){
          var update_weekday = items[i]['weekday']==-1?7:items[i]['weekday'];
          var now = items[i]['bgmcount'];
          var title = items[i]['title'];
          var cover = items[i]['square_cover'];
          var season_id = items[i]['season_id']; 
          msg[update_weekday] += ('<div class="bangumi-item"><a href="https://www.bilibili.com/bangumi/play/ss' + season_id + '" target="_blank"><img src="' + cover + '">' + '<div class="info"><p>' + title + '<p><span>更新至 <span>' + now + '</span> 话</span></div></a></div>');
          // 对每个元素修饰
        }
        console.log("骄傲地使用了Bilibili的json接口,B站最高 ⸜(* ॑꒳ ॑* )⸝");
        var divisions = [document.getElementById('sun'),
                         document.getElementById('mon'),
                         document.getElementById('tue'),
                         document.getElementById('wed'),
                         document.getElementById('thu'),
                         document.getElementById('fri'),
                         document.getElementById('sat'),
                         document.getElementById('upm')]; // upgrade per month
        for(var i = 0;i < divisions.length;i++){
          divisions[i].innerHTML = msg[i];
        }
      }
    }
  }
}())
*/

$(document).ready(function(){
  var today = (new Date()).getDay();
  var $today = $($("#nav-tabs a")[today+1]).trigger('click'); // 转到今天 //jq数组需要再Jquery()才能转化成jq对象

  var url = "./content/php/bangumi_get_ajax.php";
  $.get(url,function(json){
    var $div = [$("#sun"),$("#mon"),$("#tue"),$("#wed"),$("#thu"),$("#fri"),$("#sat"),$("#upm")];
    $.each(json['result'],function(){
      // lastupdate_at 包含最后更新时间，不存在则尚未更新
      var update_weekday = 7;
      if(this['lastupdate_at']){
          update_weekday = (new Date(this['lastupdate_at'])).getDay();	
      }
      var now = this['bgmcount']==-1?('<span>尚未更新</span>'):('<span>更新至 <span>' + this['bgmcount'] + '</span> 话</span>');
      var title = this['title'];
      var cover = this['square_cover'];
      var season_id = this['season_id'];
      $div[update_weekday].append('<div class="bangumi-item"><a href="https://www.bilibili.com/bangumi/play/ss' + season_id + '" target="_blank"><img src="' + cover + '">' + '<div class="info"><p>' + title + '</p>' + now + '</div></a></div>');
    });
  });
});