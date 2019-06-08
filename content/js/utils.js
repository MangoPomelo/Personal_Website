function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }	
  return request;
}

function isInCookie(key){
  cookies = document.cookie.split(";");
  for(var i = 0;i < cookies.length;i++){
    if($.trim(cookies[i].split("=")[0]) == key){
      return true;
    }
  }
  return false;
}

function clearAllCookie() {  
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
    if(keys) {  
        for(var i = keys.length; i--;)  
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();  
    }
    document.cookie = 'true;expires=' + new Date(0).toUTCString();
} 
