
//"artifact editor", - [RegExp online](https://regexr.com/)
var current = new Date(); // timestamp, milliseconds since 1970 (?) vs. milliseconds (UTC)
var yyyy = current.getFullYear(), MM = current.getMonth(), dd = current.getDate(), hh = current.getHours(), mm = current.getMinutes(), ss = current.getSeconds();
var datestamp = yyyy + "." + MM + "." + dd;
var timestamp = hh + ":" + mm + ":" + ss;
 //$.post("../search/ip", "", function (data) { $('#stat-date').html(datestamp); $('#stat-time').html(timestamp); $('#stat-ip').html(data);});

// add share...
var editBox = '<div id="tools" class="z-depth-1" style="display:flex;align-items: center;justify-content: flex-end;padding: 12; margin-bottom: 4; width:100%;">
	<div class="switch" onclick="previewMode();"><label style="display: flex;align-items: center;">Private?<input type="checkbox" id="preview"><span class="lever"></span></label></div>
	<a onclick="camera();" style="margin: 0;padding: 18;justify-items: center;display: flex;align-items: center;"><i class="material-icons">photo_camera</i></a>
	<a onclick="getLocation();" style="margin: 0;padding: 18;justify-items: center;display: flex;align-items: center;"><i class="material-icons">gps_fixed</i></a>
  	<a onclick="exportDoc();" class="btn waves-effect waves-light green tool" style="margin-left:24;"><i class="material-icons right">publish</i>Attachment</a>
	<div class="switch" onclick="previewMode();"><label style="display: flex;align-items: center;"><i class="material-icons">chrome_reader_mode</i><input type="checkbox" id="preview"><span class="lever"></span></label></div></div>
	
<div id="holder" style=" width:100%; justify-content:center;height: calc(100% - 60px);">
  	<div id="viewer" style="text-align:left;padding:24;height:100%; overflow-y:auto; width: 85%;float: right;padding-right: 64;"></div>
  	<div id="code" class="content loader" contentEditable="false" style="width:50%; height:50%; ">
       		<div contentEditable="true" style="text-align:left; overflow-y: auto; width:100%; height:100%; border: 2px solid aliceblue;box-shadow: 1px 1px beige;padding: 24;"></div></div></div>
		
<div id="toolset" class="z-depth-1 content loader" style="display:flex;align-items: center;justify-content: center;padding: 12; margin-bottom: 4; width:100%;position: fixed;background-color: white; z-index:4; ">
	<p><label><input type="checkbox" class="filled-in" checked="checked" /><span>Unclaimed Territory</span></label></p>"

function renderMd(text) { 
  //$('#mermaid').html(""); var mermaidEx = /<textarea[\s\S]*?>([\s\S]*?)(?=<\/textarea>)/gi;
 
  //var result; var counter = 0;
  //while((result = mermaidEx.exec(text)) !== null) { tester(result[1], counter); counter++;}
  //text = text.replace(mermaidEx, ""); text += $("#mermaid").html(); text.replace(mermaidEx, "");

  var labelEx = /\[!LABEL\]\((.*)\|(.*)\)/gi; text = text.replace(labelEx, "<span class='badge $2'>$1</span>");
  var noteEx = /\[!NOTE\]\((.*)\)/gi; text = text.replace(noteEx, "<div class='note'>$1</div>");

  var contactEx = /\[!CONTACT\]\((.*)\|(.*)\)/gi; text = text.replace(contactEx, "<div class='note $1'>$2</div>");
  var imageEx = /\[!IMAGE\]\((.*),(.*),(.*)\)/gi; text = text.replace(imageEx, "<div style='text-align:center;'><img src='$1' height='$2' width='$3' /></div>");
  var locationEx = /\[!LOCATION\]\((.*)\|(.*)\)/gi; text = text.replace(locationEx, "<iframe width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA'></iframe>");
  var mediaEx = /\[!MEDIA\]\((.*)/gi; text = text.replace(mediaEx, "<iframe id='ytplayer' type='text/html' width='640' height='360' src='https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com' frameborder='0'></iframe>");
  var headEx4 = /#### (.*)/gi; var headEx3 = /### (.*)/gi; var headEx2 = /## (.*)/gi; text = text.replace(headEx4, '<h6>$1</h6>'); text = text.replace(headEx3, '<h5>$1</h5>'); text = text.replace(headEx2, '<h4>$1</h4>');
  var linkEx = /\[([^\]]+)\]\(([^\)]+)\)/gi; text = text.replace(linkEx, "<a href='$2'>$1</a>");
  var boldEx = /\*\*([^\*]+)\*\*/gi; text = text.replace(boldEx, "<span style='font-weight:bold;'>$1</span>");
  var italicEx = /\*([^\*]+)\*/gi; text = text.replace(italicEx, "<span style='font-style:italic;'>$1</span>");
  var taskEx = /\[!TASK\]\((.*)\)/gi; text = text.replace(taskEx, "<label><input type='checkbox' class='filled-in' checked='checked' /><span>$1</span></label>");

  var bulletStart = /\n\n(- .*)/gi; var bulletEx = /- (.*)/gi; var bulletEnd = /(- .*)\n\n/gi; text = text.replace(bulletStart, '<ul>$1'); text = text.replace(bulletEnd, '$1</ul>\n\n'); text = text.replace(bulletEx, '<li>$1</li>');
  var listStartEnd = /(1\. ((?!\n\n\n).)*)/gis; var listEx = /1\. (((?!\n\n).)*)/gis; text = text.replace(listStartEnd, '<ol>$1</ol>'); text = text.replace(listEx, '<li>$1</li>');
  var codeEx = /```\n([^`]+)```/gi; text = text.replace(codeEx, "<div class='coder'><code>$1</code></div>"); 
  var tableStart = /(\|(?:(?!\n\n)[\s\S])*)/;
  var tableRow = /\|(((?!\|\n)[\s\S])*)\|/gi; 
  var tableCell = /\|([^\|\n]+)/gi; text = text.replace(tableStart, '<table><tr><td>$1</td></tr></table>').replaceAll("|", "</td><td>").replaceAll("<td>\n</td>","</tr><tr>").replaceAll("<td>-</td>","").replaceAll("<td></td>",""); text = text.replace(tableRow, '<tr>$1</tr>'); text = text.replace(tableCell, '<td>$1</td><td>$2</td>');
	
const string = "something format_abc";
const regexp = /(?:^|\s)format_(.*?)(?:\s|$)/g;
const matches = string.matchAll(regexp);
    
for (const match of matches) { console.log(match); console.log(match.index) }
   
   var figureEx = ""; // empty block "stragety", mermaid, shipping
   var lineEx = /\n\n/gi; text = text.replace(lineEx, '<br/>');
   //var paragraphEx...
   $('#build').find('*').addClass('browser-default'); $('#start').find('*').addClass('browser-default');
   return text;}
 
  $( "#preview" ).on("click", function(e) {e.stopImmediatePropagation();});
	
 function previewMode() {
   if (!($("#preview").is(':checked'))) { mode = 2; setEditor('');}
   else { mode = 1; setEditor(''); }}
 
   var myInput = document.getElementById('myFileInput');
   
   //myInput.addEventListener('change', sendPic, false);
function getLocation() { navigator.geolocation.getCurrentPosition(showPosition); }
function showPosition(position) { alert(position.coords.latitude); alert(position.coords.longitude); }
  
function camera() {
var video = document.getElementById('video');
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {//video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream; video.play(); }); } }

window.onresize = function(event) { setEditor(); }


 function tester(text, i) { 
   text = text.toString();text = text.replace('<textarea class="merma">', '').trim();
   let insert = function (code) { $('#mermaid').append('<div>' + code + '</div>');};
   mermaid.render("merman"+i.toString(), text, insert);}

	<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.2.0/fabric.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
		
var canvas = document.getElementById('canvas'); var context = canvas.getContext('2d'); var video = document.getElementById('video');
context.drawImage(video, 0, 0, 640, 480);}


<!--
<span class="badge blue">18 views</span><span class="badge green">public</span>
<span class="badge yellow">2 edits</span><span class="badge red">private</span>
    random?
    <div id="test4" class="col s12"><input type="file" multiple>
      <a class="waves-effect waves-light btn-large" onclick="$('#file-input').trigger('click');"><i class="material-icons right">folder</i>Document</a><input id="file-input" type="file" webkitdirectory mozdirectory style="display:none;"/></div></div></div></div></div>

 var canvas = new fabric.Canvas('c');
 canvas.isDrawingMode = !canvas.isDrawingMode;
 canvas.on('path:created', function() {updateComplexity();});
 
   var canvas = document.getElementById('canvas'), context = canvas.getContext('2d'), video = document.getElementById('video');
     
   function takeShot() { context.drawImage(video, 0, 0, 640, 480); };
   
   var regex = new RegExp("[a-z0-9]{5,}");
   //if(!(regex.test(input.value))){ userSet(false);}
 
  <input id="imagepick" type="file" value="" accept="image/*;capture=camera" />
  <canvas id="canvas"></canvas>
  <canvas style="border: 2px solid; " height="485" width="632" id="c"></canvas>
  <div id="mermaid"></div>
  
    <form action="/upload" method="post" accept-charset="utf-8" enctype="multipart/form-data">
    <input id="mp3" name="mp3" type="file" value="" accept="image/*;capture=camera" /><button onclick="sendPic()">Send</button>
    <input type="submit" value="submit" /></form>
<video id="video2" playsinline autoplay muted></video>
<video id="audio2"></video>

<!--//use UTC option...
//media? teleprompt? with audio? -->
