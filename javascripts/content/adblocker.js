console.log("DN adblocker is running...");

//add video js css
var videojs_css= document.createElement("link");
videojs_css.setAttribute("href","https://vjs.zencdn.net/7.2.3/video-js.css");
videojs_css.setAttribute("rel","stylesheet");
document.getElementsByTagName("head")[0].appendChild(videojs_css);


//add video js file
var videojs= document.createElement("script");
videojs.setAttribute("src","https://vjs.zencdn.net/7.2.3/video.js");
videojs.setAttribute("rel","stylesheet");
document.getElementsByTagName("body")[0].appendChild(videojs);


var startVideojs= document.createElement("script");
var startVideoText= document.createTextNode("var videoHlsTag =document.createElement(\"video\");\r\nvideoHlsTag.setAttribute(\"id\",\"video_x\");\r\nvideoHlsTag.setAttribute(\"Controls\",\"\");\r\nvideoHlsTag.setAttribute(\"autoplay\", \"\");\r\nvideoHlsTag.setAttribute(\"name\", \"media\");\r\nvideoHlsTag.setAttribute(\"crossorigin\", \"anonymous\");\r\nvideoHlsTag.setAttribute(\"style\", \"height:650px!important;width:initial!important;position: relative;\");\r\nvideoHlsTag.setAttribute(\"class\", \"video-js\");\r\nvideoHlsTag.setAttribute(\"preload\", \"auto\");\r\nvideoHlsTag.setAttribute(\"data-setup\", \"{}\");\r\n\r\n\/\/when window load send xhr to get the source file\r\n\/\/check HLS etc\r\nwindow.onload=function(){\r\n\tconsole.log(\"onload\");\r\n        document.getElementById(\"video_player\").src=\"\";\r\n        document.getElementById(\"video_player\").preload=\"none\";\r\n\r\n\tvar videoDivTag =document.createElement(\"div\");\r\n\tvideoDivTag.setAttribute(\"style\",\"justify-content: center;\")\r\n\tvideoDivTag.setAttribute(\"class\",\"d-flex w-100\");\r\n\tvideoDivTag.appendChild(videoHlsTag);\r\n\r\n\t\/\/document.getElementsByClassName(\"v-page-content\")[0].getElementsByClassName(\"w-100\")[0].innerHTML=\"\";\r\n\t\/\/document.getElementsByClassName(\"v-page-content\")[0].getElementsByClassName(\"w-100\")[0].appendChild();\r\n\tvar url_string = window.location.href; \/\/\r\n\tvar url = new URL(url_string);\r\n\tvar c = url.searchParams.get(\"id\");\r\n\tvar xhr = new XMLHttpRequest();\r\n\t\/\/this api link might change over time\r\n\txhr.open(\"GET\", \"https:\/\/m4.dnvod.tv\/api\/video\/play?cinema=1&id=\"+c+\"&device=1\", true);\r\n\txhr.onreadystatechange = function() {\r\n\t  if (xhr.readyState == 4) {\r\n\t    var resp = eval(\"(\" + xhr.responseText + \")\");\r\n\t      var videoUrl=resp.data.info[0].FlvPathList[resp.data.info[0].FlvPathList.length-1].Result;\r\n\t      if(resp.data.info[0].FlvPathList[resp.data.info[0].FlvPathList.length-1].IsHls){\r\n\t\t\t\t\tvar srcTag = document.createElement(\'source\');\r\n\t\t\t\t\t\tsrcTag.setAttribute(\"src\", videoUrl);\r\n\t\t\t\t\t\tsrcTag.setAttribute(\"type\", \"application\/x-mpegURL\");\r\n            document.getElementsByClassName(\"v-page-content\")[0].appendChild(videoDivTag);\r\n            document.getElementsByClassName(\"v-page-content\")[0].getElementsByClassName(\"w-100\")[0].setAttribute(\"style\", \"display: none!important;\");\r\n\t\t\t\t\t\tdocument.getElementById(\"video_x\").appendChild(srcTag);\r\n          \tvideojs(document.querySelector(\'.video-js\'),{}, function onPlayerReady() {\r\n          \t\tvideojs.log(\'Your player is ready!\');\r\n          \t\t\/\/ In this context, `this` is the player that was created by Video.js.\r\n          \t\tthis.play();\r\n          \t\t\/\/ How about an event listener?\r\n          \t\tthis.on(\'ended\', function() {\r\n          \t\t\tvideojs.log(\'Awww...over so soon?!\');\r\n          \t\t});\r\n          \t});\r\n\t      }else{\r\n\t        var srcTag = document.createElement(\'source\');\r\n\t        \tsrcTag.setAttribute(\"src\", videoUrl);\r\n\t        \tsrcTag.setAttribute(\"type\", \"video\/mp4\");\r\n            document.getElementsByClassName(\"v-page-content\")[0].appendChild(videoDivTag);\r\n            document.getElementsByClassName(\"v-page-content\")[0].getElementsByClassName(\"w-100\")[0].setAttribute(\"style\", \"display: none!important;\");\r\n\t          document.getElementById(\"video_x\").appendChild(srcTag);\r\n            videojs(document.querySelector(\'.video-js\'));\r\n          \tvideojs(document.querySelector(\'.video-js\'),{}, function onPlayerReady() {\r\n          \t\tvideojs.log(\'Your player is ready!\');\r\n          \t\t\/\/ In this context, `this` is the player that was created by Video.js.\r\n          \t\tthis.play();\r\n          \t\t\/\/ How about an event listener?\r\n          \t\tthis.on(\'ended\', function() {\r\n          \t\t\tvideojs.log(\'Awww...over so soon?!\');\r\n          \t\t});\r\n          \t});\r\n\t      }\r\n\t  }\r\n\t}\r\n\r\n\txhr.send();\r\n}");
startVideojs.appendChild(startVideoText);
document.getElementsByTagName("body")[0].appendChild(startVideojs);
//50
//force refresh when url changed
var currentURl =window.location.href;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.xhr == "new"){
      if(currentURl!=window.location.href){
        location.reload(true);
      }
			sendResponse({done: "ok"});
		}

  });
