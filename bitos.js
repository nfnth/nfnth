		const preloadImage = src => 
           new Promise(r => {
             const image = new Image()
             image.onload = r
             image.onerror = r
             image.src = src })
		
function getLocation() { navigator.geolocation.getCurrentPosition(showPosition); }
function showPosition(position) { alert(position.coords.latitude); alert(position.coords.longitude); }
  
function camera() {
var video = document.getElementById('video');
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {//video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream; video.play(); }); }

var canvas = document.getElementById('canvas'); var context = canvas.getContext('2d'); var video = document.getElementById('video');
context.drawImage(video, 0, 0, 640, 480);}
  
function changeDialog(dialog) { $('#'+dialog).removeClass('hidden'); $('#console').addClass('hidden'); }

async function initial() {
  $('select').formSelect(); $('.tabs').tabs();
  $('#marks').dropdown({ constrainWidth: false } ); $('#domains').dropdown({ constrainWidth: false } ); $('#actions').dropdown({ constrainWidth: false } ); $('#domains2').dropdown({ constrainWidth: false } ); 
  $('.modal').modal(); $('#user-pane').sidenav(); $('#user-setting').sidenav({ edge: 'right' } );
  $('.collapsible').collapsible(); 
  $('.datepicker').datepicker(); $('.timepicker').timepicker();$('.datepicker').onSelect = function(param) { alert('yes'); alert(param);}
mode=0; setEditor('../README.md');

         await preloadImage('https://github.com/nfnth/res/raw/main/site/coat.png') // Preload an image
	await preloadImage('https://github.com/nfnth/res/raw/main/site/chimi_hi.png') 
	await preloadImage('https://github.com/nfnth/res/raw/main/site/chimi_cards.png') 
         //await Promise.all(images.map(x => preloadImage(x.src))) // Preload a bunch of images in parallel 
  setTimeout(function() {  $(".loader").css("visibility", "visible");}, 1000);
 //mermaid.initialize({startOnLoad:true});
  searchClear();

  var castle = Math.floor(Math.random() * (16 - 1 + 1)) + 1; 
  document.getElementById('menu-logo').src = "https://cdn.jsdelivr.net/gh/nfnth/res@latest/site/castle/castle" + castle.toString() + ".png";
 
  var pathArray = window.location.pathname.split('/'); 
  domain = window.location.host;
  //if (domain != "dralun.com") { document.title = "Dralun · " + domain; }
  switch (pathArray.length) {
    case 2:
      address = pathArray[1];// makeEditor();
      mode=0; //setEditor("../" + address + "/profile");
      //$.get("../" + address + "/profile", function (data) {  $("#home").html(renderMd(data));});
      break; } }

document.addEventListener('DOMContentLoaded', function() { var elems = document.querySelectorAll('.modal'); var instances = M.Modal.init(elems); });
window.onresize = function(event) { setEditor(); }
initial(); 
function openInNewTab(url, tab=true) { if (tab) { var win = window.open(url, '_blank'); win.focus(); } else window.open(url, '_self'); }
function searchClear() { $('#search').val(''); }
function searchResults() { $.post("../search/word", $('#search').val(), function(data, status){ $('#results').html(data); }); }
	
var current = new Date(); // timestamp, milliseconds since 1970 (?) vs. milliseconds (UTC)
 var yyyy = current.getFullYear(), MM = current.getMonth(), dd = current.getDate(), hh = current.getHours(), mm = current.getMinutes(), ss = current.getSeconds();
 var datestamp = yyyy + "." + MM + "." + dd;
 var timestamp = hh + ":" + mm + ":" + ss;
 //$.post("../search/ip", "", function (data) { $('#stat-date').html(datestamp); $('#stat-time').html(timestamp); $('#stat-ip').html(data);});

 async function submitUser() { let hash = await genEncryptionKey($("#user-password").val()); }
   
 async function genEncryptionKey (password) { 
     var algo = {name: 'PBKDF2',hash: 'SHA-256',salt: new TextEncoder().encode('a-different-salt-string'),iterations: 1000}, derived = { name: 'AES-GCM', length: 256 }, encoded = new TextEncoder().encode(password), key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
     var temp = await crypto.subtle.deriveKey(algo, key, derived, true, ['encrypt', 'decrypt']);
     var exports = await crypto.subtle.exportKey('jwk', temp);
     return JSON.stringify(exports); } 

var action, domain, address, message, signature, data, docs; //array?
var data = new FormData();

 //var logoImg = $('input[name="logoImg"]').get(0).files[0];
 //formData.append('logo', logoImg);
 //formData.append('id', id);
 //formData.append('name', userName);
 
 //$.ajax({type: "POST", url: url, data: formData, contentType: false,processData: false,cache: false, complete: function(data) {alert("success");}});
 
 function tester(text, i) { 
   text = text.toString();text = text.replace('<textarea class="merma">', '').trim();
   let insert = function (code) { $('#mermaid').append('<div>' + code + '</div>');};
   mermaid.render("merman"+i.toString(), text, insert);}

//window.history.pushState({"html":area,"pageTitle":""},"","http://localhost/state");
window.onpopstate = function(e){
  if(e.state){backConsole(e.state.html);
    //document.getElementById("content").innerHTML = e.state.html;
    //document.title = e.state.pageTitle;
  } else { backConsole('home');} };

var mode = 0; //0(view), 1(edit), 2(preview), 3(stats), 4(list), 5(map)
function setEditor(doc) {
   var width = window.innerWidth; var height = window.innerHeight - 48; //menu, footer
   $("#holder").hide(); $("#viewer").hide(); $("#code").hide(); $("#grid").hide(); $("#map").hide(); $("#stats").hide();
   $("#tools").hide(); $("#toolset").hide();
 
   switch(mode) {
   case 0:
     $("#holder").show(); $("#viewer").show(); $("#viewer").css("width", "100%"); $("#viewer").css("height", "100%");
     $.get(doc, function (data) { $("#viewer").html(renderMd(data));}); break;
   case 1:
     $("#holder").show(); $("#tools").show(); $("#code").show();
     //$.get(doc, function (data) { });
	     break;
   case 2:
     $("#holder").show(); $("#tools").show(); $("#viewer").css("width", width/2); $("#viewer").css("height", height);
     $("#viewer").html(renderMd(data)); break;
   case 3:
    $("#toolset").show();$("#grid").show(); break;
   case 4:
		   //$("#stats").show();
		   var fields = manifest[0].split('|');
					  var div = document.getElementById('registry');

					div.innerHTML += "<a onclick='showDomain(0);' class='collection-item'>" + fields[0] + '</a>';
					  //alert(result[0]); 
					  $("#grid").show();
					//  $("#stats").html(renderMd(data));
		   

		   break;
   case 5:
    $("#map").show(); break;
   default:}}
 
var manifest;
$.get("../manifest", function (data) { manifest = data.split(/\r?\n/); }); 
function showDomain(index) {
	var fields = manifest[index].split('|');
	var div = document.getElementById('toolset');

					div.innerHTML += "<h4>" + fields[0] + "</h4>";
					div.innerHTML += "<img src='https://github.com/nfnth/res/raw/main/thumb/" + fields[4] + "' />";
}
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
   var headEx4 = /#### (.*)/gi; var headEx3 = /### (.*)/gi; var headEx2 = /## (.*)/gi;
   text = text.replace(headEx4, '<h6>$1</h6>'); text = text.replace(headEx3, '<h5>$1</h5>'); text = text.replace(headEx2, '<h4>$1</h4>');
   var linkEx = /\[([^\]]+)\]\(([^\)]+)\)/gi; text = text.replace(linkEx, "<a href='$2'>$1</a>");
   var boldEx = /\*\*([^\*]+)\*\*/gi; text = text.replace(boldEx, "<span style='font-weight:bold;'>$1</span>");
   var italicEx = /\*([^\*]+)\*/gi; text = text.replace(italicEx, "<span style='font-style:italic;'>$1</span>");
  var taskEx = /\[!TASK\]\((.*)\)/gi; text = text.replace(taskEx, "<label><input type='checkbox' class='filled-in' checked='checked' /><span>$1</span></label>");

   var bulletStart = /\n\n(- .*)/gi; var bulletEx = /- (.*)/gi; var bulletEnd = /(- .*)\n\n/gi; 
   text = text.replace(bulletStart, '<ul>$1'); text = text.replace(bulletEnd, '$1</ul>\n\n'); text = text.replace(bulletEx, '<li>$1</li>');
   var listStartEnd = /(1\. ((?!\n\n\n).)*)/gis; var listEx = /1\. (((?!\n\n).)*)/gis; 
   text = text.replace(listStartEnd, '<ol>$1</ol>'); text = text.replace(listEx, '<li>$1</li>');
   var codeEx = /```\n([^`]+)```/gi; text = text.replace(codeEx, "<div class='coder'><code>$1</code></div>"); 
   var tableStart = /(\|(?:(?!\n\n)[\s\S])*)/; //var tableRow = /\|(((?!\|\n)[\s\S])*)/gi; var tableCell = /(.*)(?:\|)(.*)/gi;
   //text = text.replace(tableStart, '<table><tr><td>$1</td></tr></table>').replaceAll("|", "</td><td>").replaceAll("<td>\n</td>","</tr><tr>").replaceAll("<td>-</td>","").replaceAll("<td></td>",""); //text = text.replace(tableRow, '<tr>$1</tr>'); text = text.replace(tableCell, '<td>$1</td><td>$2</td>');
   
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
   
 function setUser() { formdata = new FormData();
   if($("#default_file").prop('files').length > 0) { file = $("#default_file").prop('files')[0]; formdata.append("file1", file); }
   $.ajax({ url: site + "/upload", type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert('uploaded'); } }); }
 
   var flag = ["tribe", "monument", "town", "forest", "international"]; //pair? series 1?

mapboxgl.accessToken = 'pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ';
var monument = [-82.99869603364057, 35.64757499700629, ];
var map = new mapboxgl.Map({container: 'map',style: 'mapbox://styles/mapbox/light-v10',center: monument,zoom: 15});
var popup = new mapboxgl.Popup({ offset: 25 }).setText('Construction on the Washington Monument began in 1848.');
var el = document.createElement('div'); el.id = 'marker';
 
new mapboxgl.Marker(el).setLngLat(monument).setPopup(popup).addTo(map);

//var map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/dark-v10', zoom: 4, center: [-86.99869603364057, 37.64757499700629, ] });
map.on('load', function () { map.loadImage('https://cdn.jsdelivr.net/gh/nfnth/res@latest/site/color/color1.png',
function (error, image) {if (error) throw error; map.addImage('cat', image);
map.addSource('point', {'type': 'geojson','data': {'type': 'FeatureCollection','features': [{'type': 'Feature','geometry': {'type': 'Point','coordinates': [-77.4144, 25.0759]}}]}});
map.addLayer({'id': 'points','type': 'symbol','source': 'point', 'layout': {'icon-image': 'cat', 'icon-size': 0.25}}); });});
