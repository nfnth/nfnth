class Box { mapStyle = ""; product = false; special = false; scale = false; }
var boxer = new Box();

//var base = [-101.69697959674477, 39.77108807140884];
var learnArt = [-103.69697959674477, 37.77108807140884]; var popArt; var popOwn; var popPath; var popBase;
var learnOwn = [-99.19697959674477, 40.17108807140884];
var learnPath = [-99.79697959674477, 35.47108807140884];
var pather = false; var beacon = false;

function showIntro() { deedMap(); }
function showIntroMap() { 
	var marv = document.createElement('div'); marv.id = 'markera'; tempMark = new mapboxgl.Marker(marv).setLngLat(base).addTo(map);
	popBase = tempMark;
	
	$('#markera').addClass('markre'); $('#markera').addClass('z-depth-3'); $('#markera').addClass('triangle-up'); 
	var style = $('#markera').attr('style'); style += ";background-image:url('res/img/seal3.png');background-size:cover;border:solid 2px darkgrey;border-radius:50%;"; $('#markera').attr('style',style);
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
    	var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
	var markup = '<div>' + cardCode.replace('XXXX',leafSrc).replace('YYYY','a') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'tact/a\');" style="cursor:pointer;">Use Deed</span><br/><br/><a id="butIntro" class="waves-effect waves-light btn green lighten-2" onclick="tempMark.togglePopup(); showIntroArt();"><i class="material-icons right">arrow_forward</i>Next</a></div></div>';

	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); tempMark.togglePopup(); 
	//$('#cardContent').unbind('click');
		    // $("#cardContent").click(showDoc('tact/a')); 
	}

var cardCode = '<div class="flip-card cardy"  ><div class="flip-card-inner" style="cursor:pointer;"><div class="flip-card-front z-depth-2" onclick="flipCard();"><img  src="XXXX" alt="Avatar" style="width:48px;height:48px;"></div><div class="flip-card-back z-depth-2" ><div id="tactb" style="opacity:0.75; display: flex;align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 24px;margin-right: 8px;font-weight: bold;"></span><img style="cursor:pointer;" id="tacta" width="24" height="24" src="res/img/card/heart.png"/></div><div id="cardContent" style="cursor:pointer; color: dimgrey;font-size: 16px;font-weight: bold;font-family: \'Roboto\', sans-serif;" onclick="showDoc(\'tact/YYYY\');">📚 READ...</div><div id="tact2" class="rotate" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';
var suit = ['heart','diamond','club','spade']; var num = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var cardSwitch = false;
function flipCard() { var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1));
	$("#tacta").attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact1").html(num[myNum]); if (mySuit > 1) { $("#tact1").css("color","black");  } else { $("#tact1").css("color","red");  } $('.flip-card-inner').css("transform","rotateY(180deg)"); $("#tact2").html($("#tactb").html());
	}

function showIntroArt() { startPoint = base; endPoint = learnArt; showPath('green'); pather = true; $("#butIntro").addClass("disabled");
	var marv = document.createElement('div'); marv.id = 'markerb'; tempMark = new mapboxgl.Marker(marv).setLngLat(learnArt).addTo(map);
	popArt = tempMark;
	
	$('#markerb').addClass('markre'); $('#markerb').addClass('z-depth-3'); $('#markerb').html("🏳");
	var style = $('#markerb').attr('style'); style += ";background-color:green;border:solid 2px darkgreen;justify-content:center;align-items:center;display:flex;font-size:20px;"; $('#markerb').attr('style',style);
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
	var markup = '<div>' + cardCode.replace('XXXX',leafSrc).replace('YYYY','b') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'tact/b\');" style="cursor:pointer;">Build Domain</span><br/><br/><a id="butArt" class="waves-effect waves-light btn blue lighten-2" onclick="tempMark.togglePopup(); showIntroOwn();"><i class="material-icons right">arrow_forward</i>Next</a></div></div>';

	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); tempMark.togglePopup();
	$('#cardContent').unbind('click');
		     $("#cardContent").click(showDoc('tactb')); 
	 }

function showIntroOwn() { addBeacon(learnOwn); beacon = true; $("#butArt").addClass("disabled");
	var marv = document.createElement('div'); marv.id = 'markerc'; tempMark = new mapboxgl.Marker(marv).setLngLat(learnOwn).addTo(map);
	popOwn = tempMark; 
	
	$('#markerc').addClass('markre'); $('#markerc').addClass('z-depth-3'); $('#markerc').html("🏴");
	var style = $('#markerc').attr('style'); style += ";background-color:blue;border:solid 2px mediumblue;border-radius:50%;justify-content:center;align-items:center;display:flex;font-size:20px;"; $('#markerc').attr('style',style);
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
	var markup = '<div>' + cardCode.replace('XXXX',leafSrc).replace('YYYY','c') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'tact/c\');" style="cursor:pointer;">Post Note</span><br/><br/><a id="butOwn" class="waves-effect waves-light btn amber lighten-2" onclick="tempMark.togglePopup(); showIntroPath();"><i class="material-icons right">arrow_forward</i>Next</a></div></div>';

	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); tempMark.togglePopup(); }

function showIntroPath() { clearMap(); startPoint = base; endPoint = learnPath; showPath('goldenrod'); pather = true;  $("#butOwn").addClass("disabled");
	var marv = document.createElement('div'); marv.id = 'markerd'; tempMark = new mapboxgl.Marker(marv).setLngLat(learnPath).addTo(map);
	popPath = tempMark;
	
	$('#markerd').addClass('markre'); $('#markerd').addClass('z-depth-3'); 
	var style = $('#markerd').attr('style'); style += ";background-image:url('res/img/coin.jpg');background-size:cover; border:solid 2px darkgoldenrod;border-radius:50%;"; $('#markerd').attr('style',style);
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
	var markup = '<div>' + cardCode.replace('XXXX',leafSrc).replace('YYYY','d') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'tact/d\');" style="cursor:pointer;">Trade OCUR</span><br/><br/><a id="butPath" class="waves-effect waves-light btn red lighten-2" onclick="clearMap(); clearLearn(); showIntroMap();"><i class="material-icons right">restart_alt</i>Reset</a></div></div>';

	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); tempMark.togglePopup(); }

function clearLearn() { if (popBase) popBase.remove();
	 if (popArt) popArt.remove(); if (popOwn) popOwn.remove(); if (popPath) popPath.remove();
	
}

var markCode = '<div class="flip-card"  ><div class="flip-card-inner" style="cursor:pointer;"><div class="flip-card-frontx z-depth-2" onclick="flipCard();"><img src="XXXX" alt="Avatar" style="width:48px;height:48px;"></div><div class="flip-card-backx z-depth-2" ><div id="tactb" style="opacity:0.75; display: flex;align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 24px;margin-right: 8px;font-weight: bold;"></span><img style="cursor:pointer;" id="tacta" width="24" height="24" src="res/img/card/heart.png"/></div><div id="cardContent" style="cursor:pointer; color: dimgrey;font-size: 16px;font-weight: bold;font-family: \'Roboto\', sans-serif;" onclick="showDoc(\'tact/YYYY\');">📚 READ... 📚</div><div id="tact2" class="rotate" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';

function showMark(coord, color, image, link, name, id, area) { clearLearn();
	var mark = coord;
	var marv = document.createElement('div'); marv.id = 'marker' + id; 
	var marp = new mapboxgl.Marker(marv).setLngLat(mark).addTo(map);
	var imager = ''; var filler = '';
	var temp = Array.from(name); 
	var symbol = temp[temp.length-1];
	var name = name.replace(symbol,"").replace(" ","");
	
	switch(area) {
		case 'deed':
			imager = 'onclick="buildDeed(' + id + ');"';
			custom = '<a class="waves-effect waves-blue btn amber lighten-2" onclick="showWallet(' + id + ');" ><i class="material-icons">alternate_email</i></a>&nbsp;&nbsp;<a class="modal-trigger waves-effect waves-light btn blue lighten-2" href="#modal1" onclick="addListDetail(' + id + ');"><i class="material-icons">receipt</i></a>'; break;
		case 'domain': 
			if (domains[id].item) { filler = 'beige;" class="amber'; } else { filler = 'ghostwhite;" class="grey'; }
			imager = 'onclick="addListDetail(' + id + ');"';
			custom = '<a id="lm' + id + '" style="color:' + filler + ' waves-effect waves-blue btn lighten-4" onclick="buildLand(' + id + ');" ><i class="material-icons">space_dashboard</i></a>&nbsp;&nbsp;<a style="color:honeydew;" class="modal-trigger waves-effect waves-light btn green lighten-3" href="#modal1" onclick="addListDetail(' + id + ');"><i class="material-icons">format_list_bulleted</i></a>'; break;
		case 'artifact': 
			imager = 'onclick="showDoc("ur");';
			custom = '<a class="waves-effect waves-blue btn amber lighten-2" onclick="showOwnLearn();" ><i class="material-icons">account_balance_wallet</i></a>'; break; }
	
	$('#marker'+id).addClass('markre'); $('#marker'+id).addClass('z-depth-3'); $('#marker'+id).html(symbol); //color?
	var style=$('#marker'+id).attr('style'); style += ";align-items: center;justify-content: center;display: flex;background-color: whitesmoke;border: 2px solid darkslategray;font-size: 16px;"; $('#marker'+id).attr('style',style); 
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	var markup = '<div><div style="display:flex; justify-content:center; flex-direction:column; align-items:center;" ><div style="width:64px;height:64px;display:flex;margin-top:6px;border-radius:8px;cursor:pointer;" class="z-depth-1" onclick="buildDoc(\'' + id + '\');"><img style="border-radius:8px;width:64px;height:64px;" src="' + domains[id].core.image_url + '" /></div><div style="margin-top:16px; font-size:16px;"><a onclick="openInNewTab(\'' + link + '\');">' + name + '</a></div><div class="editMark" style="width:100%; height:48px;display:flex;justify-content:center;margin-bottom:16px;"><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="addListDetail(' + id + ');">🏠</a><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="mapAdd();">📦</a><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" >🏛️</a></div></div></div>';
	//var markup = markCode;

	marp.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); //pullOwner(id);
	
	
	marp.togglePopup();
	return marp; } //$('.materialboxed').materialbox(); 

function showTemp(i) { if (tempMark != "") { tempMark.remove(); } tempMark = showMark(convertCoord(domains[i].coord), getCollect(domains[i].core.collection.slug).replace('.png',''), domains[i].core.animation_url, domains[i].core.external_link, domains[i].core.name, i, 'domain');  }
function showDomain(i) { domains[i].map = showMark(learnPath, getCollect(domains[i].core.collection.slug).replace('.png',''), domains[i].core.image_url, domains[i].core.external_link, domains[i].core.name, i, 'domain');  }
function hideDomain(i) { if (domains[i].map != "") { domains[i].map.remove(); domains[i].map = ""; }  }
function showArt(i) { artifacts[i].map = showMark(convertMark(artifacts[i].location), artifacts[i].color, artifacts[i].image, "", artifacts[i].name, 'artifact'); }

function deedMap() { var introRemove = false; for (let i=0;i<domains.length;i++) { if (domains[i].checked) { showDomain(i); introRemove = true; } else { hideDomain(i); } }  
		   if (introRemove) { clearMap(); clearLearn(); } }
function domainMap() { showMark(convertMark(domainMd.location), domainMd.color, 'res/img/shield.png', 'temp.com', domainMd.name, 'x', 'deed'); }
function artMap() {  for (let i=0;i<artifacts.length;i++) { if (artifacts[i].checked) { showArt(i); } }  }

var flying; var startUp; 
function fly(dest) { const nowhere = [-75.10664162497726, 45.741025518671464];
	map.fire('click', { latLng: nowhere, point: map.project(nowhere), originalEvent: {} }); flying = true;
    	map.on('moveend', function(e){ if(flying){ flying = false; startUp(); } });
    	map.flyTo({ center: dest, zoom: zoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true }); }

function flyMark(i) {  showTemp(i); 
	startUp = function() {  tempMark.togglePopup(); document.getElementById("vid"+i).play(); };  fly(convertCoord(domains[i].coord)); } 
function flyArt(i) { showArt(i); 
	startUp = function() {  tempMark.togglePopup(); }; $('#user-pane').sidenav('close'); fly(convertCoord(artifacts[i].location)); } 

function mapAdd() { clearMark(); showView('mapper'); M.toast({html: 'Select location...'}); artFlag = true; } 
function mapAdd(i) { clearMark(); showView('mapper'); M.toast({html: 'Select location...'}); artFlag = true; } 
function addArt() { showEdit(); tempMark.togglePopup(); resetArea(); editMd.location = coordinates.toString();
	$(".switch.shape").find("input[type=checkbox]").on("change",function() { var status = $(this).prop('checked'); setShape(status); });
		   coordinates.lat -= 6; 
		   map.flyTo({ center: coordinates, zoom: zoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true });
		  }
var listFlag = false;
function addArtifact(i) { listFlag = true; mapAdd(); }
function clearEdit() { if (tempMark != "") { tempMark.remove(); tempMark = ""; } }
function showEdit() { if (tempMark != "") { tempMark.remove(); tempMark = ""; }
	var marv = document.createElement('div'); marv.id = 'markery';// coordinates.lat += 6;
	tempMark = new mapboxgl.Marker(marv).setLngLat(coordinates).addTo(map);
    	$('#markery').addClass('markre'); $('#markerx').addClass('z-depth-3'); var style=$('#markery').attr('style');
		     var front = getFront(domains[myDomain].core.collection.slug); var back = getBack(domains[myDomain].core.collection.slug);
    	style += ";background-color:" + front + ";border:solid 2px " + back + ";display: flex;align-items: center;justify-content: center;font-size: 18px;"; $('#markery').attr('style',style);
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
		     
	
	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(editContent));
		
	//.setHTML(editContent));
	
		    // $('#markery').unbind('click');
		     //$("#markery").click(colorStart); 
		     }

function complete()
{
	$("#cuboid form").removeClass("loading").addClass("complete");
}
var editContent = '<div id="header-logo" style="display: flex;justify-content: space-evenly;align-items: center; display: flex;margin-top:8px;margin-bottom:8px;"><div style="border-radius:12px; cursor:pointer;display:flex; height:64px; width:64px;margin-top:8px;" class="z-depth-1"><img width="64" height="64" id="thumb" src="res/img/barrel.png" onclick="$(\'#preview\').trigger(\'click\');" style="border-radius:8px;" /></div></div></div></div><div class="hiddenfile"><input name="upload" type="file" id="preview" onchange="setPreview();" multiple="multiple"/><div style="visibility:hidden;width:0;position:absolute;top:0;"><input type="color" oninput="setColor();" id="favcolor" name="favcolor" value="#ff0000" style="width:0px; height:0px;opacity:0;" /><input type="color" oninput="setOutline();" id="favcolor2" name="favcolor2" value="#ff0000" style="width:0px; height:0px;opacity:0;" /></div></div><div style="padding:12px; padding-top:0px; padding-bottom:0px; display:flex; justify-content:center;"><div style="margin-top:0px;margin-bottom:0px;" class="input-field col s4"><input id="edit-name" type="text" class="validate" onchange="setText();"></div></div><div class="editMark" style="width:100%; height:48px;display:flex;justify-content:center;margin-bottom:16px;"><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="setShape();">🟢</a><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="switchIcon();">🧸</a><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="colorStart(this);">🎨</a><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="outlineStart(this);">🔳</a></div><div style="display:flex;justify-content:space-evenly;margin-top:12px;margin-bottom:12px;align-items:center;"><a class="waves-effect waves-light btn-flat" onclick="clearEdit();" style="padding:0px;">🗑️</a><a class="waves-effect waves-green green btn" onclick="showView(\'editor\');">Editor&nbsp;&nbsp;✏️</a></div></div>';

var isSquare = true;
function setShape() { if (isSquare) { $("#markery").css("border-radius","50%"); $("#shape-icon").html("square"); isSquare = false; } else { $("#markery").css("border-radius",""); $("#shape-icon").html("circle"); isSquare = true; } }

function setPreview() {
var preview = document.getElementById("preview");
var thumb = document.getElementById("thumb");
const [file] = preview.files
  if (file) {
    if (file.size > 10000000) { alert ('too big'); } else {
        thumb.src = URL.createObjectURL(file); $("#press").html("done");
        $("#editThumb").addClass("green");$("#editThumb").removeClass("blue-grey"); }}}

function switchIcon() { var temp = Array.from($("#edit-name").val()); $("#markery").html(temp[temp.length-1]); }
function resetArea() { $('.mapboxgl-popup-content').css('padding', '0'); 
	switchTime(); $("#edit-name").val(domains[myDomain].core.name); 
		      $("#thumb").attr("src", domains[myDomain].core.image_url);
	switchIcon();
	//var length = $("#edit-name").val().length;
	//var symbol = $("#edit-name").val().substring(length-1,length);
	
	
}

function setMap(area) { var center = map.getCenter(); mapSelect = area;
	switch (area) {
		case 'empty': mapStyle = ''; break;'satellite-streets-v11', 'light-v10', 'dark-v10'
		case 'street': mapStyle = ''; break;
		case 'building': mapStyle = ''; break;
		case 'satellite': mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'; break;
		case 'terrain': mapStyle = 'cjaudgl840gn32rnrepcb9b9g'; break; }
	map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/' + mapStyle, center: center, zoom: zoom, buffer_size: 0.2});
		
		     //map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
		     map.on('load', function(event) {
			     switch (area) {
		case 'empty': mapStyle = ''; break;'satellite-streets-v11', 'light-v10', 'dark-v10'
		case 'street': mapStyle = ''; break;
		case 'building': mapStyle = ''; break;
			case 'ocean': map.addSource('10m-bathymetry-81bsvj', {type: 'vector',url: 'mapbox://mapbox.9tm8dx88'});
 
map.addLayer({'id': '10m-bathymetry-81bsvj','type': 'fill','source': '10m-bathymetry-81bsvj','source-layer': '10m-bathymetry-81bsvj','layout': {},'paint': {'fill-outline-color': 'hsla(337, 82%, 62%, 0)','fill-color': ['interpolate',['cubic-bezier', 0, 0.5, 1, 0.5],['get', 'DEPTH'],200,'#78bced',9000,'#15659f']}},'land-structure-polygon'); break;
		case 'satellite': mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'; break;
		case 'terrain': map.addSource('dem', {'type': 'raster-dem','url': 'mapbox://mapbox.mapbox-terrain-dem-v1','tileSize': 512,'maxzoom': 14});	map.addLayer({'id': 'hillshading','source': 'dem','type': 'hillshade'},'waterway-river-canal-shadow');	
 break; }     
		     });
		     }

function mapSat() { var satCenter = map.getCenter();
	mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11';
	map = new mapboxgl.Map({container: 'map', style: mapStyle, center: satCenter, zoom: zoom, buffer_size: 0.2}); 
		  clearMarkers();
		  for (let a=0;a<currentContent.length;a++) { addMark(currentContent[a][0],currentContent[a][1],currentContent[a][2],currentContent[a][3],currentContent[a][4],currentContent[a][5],currentContent[a][6]); } currentMarkers[currentToggle].togglePopup(); }

var tempCoord = [0,0];
function mapLoc() { 
	if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(geoSuccess, geoError); } else { alert("Geolocation is not supported by this browser.");} } 
function geoSuccess(position) {tempCoord[1] = position.coords.latitude;tempCoord[0] = position.coords.longitude; setZoom = 8; fly(tempCoord); addBeacon(tempCoord); beacon = true; } 
function geoError() { alert('No location'); }



//https://api.mapbox.com/directions/v5/mapbox/driving/-73.99472793733248%2C40.73149739904491%3B-73.99268258837725%2C40.733942291758495%3B-73.98966737911867%2C40.73255977417804?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=YOUR_MAPBOX_ACCESS_TOKEN

function clearMark() { if (tempMark != "") { tempMark.remove(); tempMark = ""; }
	for (let a=0;a<domains.length;a++){ if (domains[a].map != "") { domains[a].map.remove(); domains[a].map = ""; } } }
function clearMap() { if (typeof nomadPath !== 'undefined') cancelAnimationFrame(nomadPath); if (pather) { removeLine(); } if (beacon) { removeBeacon(); } pather = false; beacon = false; }

const geojsonDraw = { "type": "FeatureCollection","features": [{"type": "Feature", "geometry": { "type": "LineString", "coordinates": [] } }] };
var startPoint; var endPoint; var framesPerSecond = 20; var initialOpacity = 1; var opacity = initialOpacity; var initialRadius = 4; var radius = initialRadius; var maxRadius = 15; var speedFactor = 100; var animation; var lineCoordinates=[]; var animationCounter=0;

function addLine(color) {
    	var diffX = endPoint[0] - startPoint[0];  var diffY = endPoint[1] - startPoint[1]; var sfX = diffX / speedFactor; var sfY = diffY / speedFactor; var i=0; var j=0;
    	while (Math.abs(i) < Math.abs(diffX) || Math.abs(j) < Math.abs(diffY)) { lineCoordinates.push([startPoint[0] + i, startPoint[1] + j]);
        	if (Math.abs(i) < Math.abs(diffX)) {i += sfX; } if (Math.abs(j) < Math.abs(diffY)) { j += sfY; } }

    	map.addSource('point1', {"type": "geojson", "data": { "type": "Point", "coordinates": [ startPoint[0], startPoint[1] ]  } });
    	map.addLayer({ "id": "circle1", "source": "point1", "type": "circle", "paint": {"circle-radius": initialRadius, "circle-radius-transition": { duration: 0 }, "circle-opacity-transition": {   duration: 0}, "circle-color": 'black' } });
    	map.addLayer({"id": "point1", "source": "point1","type": "circle","paint": {   "circle-radius": initialRadius, "circle-color": 'black' } });
    	map.addSource('point2', {"type": "geojson", "data": { "type": "Point", "coordinates": [ endPoint[0], endPoint[1] ]  } });
    	map.addLayer({"id": "circle2", "source": "point2", "type": "circle", "paint": {  "circle-radius": initialRadius,"circle-radius-transition": {  duration: 0}, "circle-opacity-transition": {   duration: 0 }, "circle-color": 'black' } });
    	map.addLayer({ "id": "point2", "source": "point2","type": "circle", "paint": { "circle-radius": initialRadius, "circle-color": 'black' }  });
    	map.addLayer({'id': 'line-draw','type': 'line', 'source': { 'type': 'geojson', 'data': geojsonDraw },'layout': { 'line-cap': 'round', 'line-join': 'round' }, 'paint': {'line-color': color,'line-width': 2, 'line-dasharray': [2, 1]} });  }

function drawLine(i) {
	if (animationCounter < lineCoordinates.length) {
        	geojsonDraw.features[0].geometry.coordinates.push(lineCoordinates[animationCounter]);
        	map.getSource('line-draw').setData(geojsonDraw);
        	nomadPath = requestAnimationFrame(drawLine);
        	animationCounter++;}
    	else { var coord = geojsonDraw.features[0].geometry.coordinates;
        	if (coord.length > 0) {
            		geojsonDraw.features[0].geometry.coordinates = coord;
            		map.getSource('line-draw').setData(geojsonDraw);
            		nomadPath = requestAnimationFrame(drawLine); }} }

function removeLine() {
    	map.removeLayer('line-draw'); map.removeLayer('point2'); map.removeLayer('circle2');map.removeLayer('point1'); map.removeLayer('circle1'); map.removeSource('point2'); map.removeSource('point1');  map.removeSource('line-draw');
    	geojsonDraw.features[0].geometry.coordinates = []; }

const size = 200;
const pulsingDot = { width: size, height: size, data: new Uint8Array(size * size * 4),
    	onAdd: function () { const canvas = document.createElement('canvas'); canvas.width = this.width; canvas.height = this.height; this.context = canvas.getContext('2d'); },
    	render: function () { const duration = 1000; const t = (performance.now() % duration) / duration; const radius = (size / 2) * 0.3; 
		const outerRadius = (size / 2) * 0.7 * t + radius; const context = this.context;
        	context.clearRect(0, 0, this.width, this.height); context.beginPath(); context.arc( this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2 ); context.fillStyle = `rgba(3, 111, 252, ${1 - t})`; context.fill();
        	context.beginPath(); context.arc( this.width / 2, this.height / 2, radius, 0, Math.PI * 2 ); context.fillStyle = 'rgba(68, 140, 235, 1)'; context.strokeStyle = 'white'; context.lineWidth = 2 + 4 * (1 - t); context.fill(); context.stroke();
        	this.data = context.getImageData( 0, 0, this.width, this.height).data; map.triggerRepaint(); return true; } };

function addBeacon(place) {
    	map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    	map.addSource('dot-point', { 'type': 'geojson', 'data': { 'type': 'FeatureCollection', 'features': [ { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': place } } ] } });
    	map.addLayer({'id': 'layer-with-pulsing-dot', 'type': 'symbol', 'source': 'dot-point', 'layout': { 'icon-image': 'pulsing-dot' }  }); }
function removeBeacon() { 
	map.removeLayer('layer-with-pulsing-dot');map.removeSource('dot-point');map.removeImage('pulsing-dot'); }

//var beacon = false; var pather = false; var introMark; var nomadPath; var artifactPath; var setDomain; var currentContent = [];
function showPath(color) { addLine(color); nomadPath = requestAnimationFrame(drawLine); }
//function showLandlord() { startPoint = fr; endPoint = fr2; showPath('green'); currentMarkers[0].togglePopup(); currentMarkers[1].togglePopup(); pather = true; currentToggle = 1; }
//function showArt() { addBeacon(fr3); currentMarkers[1].togglePopup(); currentMarkers[2].togglePopup(); beacon = true; currentToggle = 2; }
//function showBase() { currentMarkers[2].togglePopup(); currentMarkers[0].togglePopup(); currentToggle = 0; }

//var currentMarkers=[]; var currentMark = 0; 
//var addMark; 
//var popups = []; var walletSwitch = true; var markCount = 0; //if (place == "") place = window.location.host;
//function popMark(i) { domains[i].map.togglePopup();  }
//var inputMark = "";

//var selectedMark = -1; var mapMark = -1;

function colorStart(event) { //event.stopPropagation(); 
	document.getElementById("favcolor").focus(); document.getElementById("favcolor").click(); }
function setColor() { $("#markery").css("background-color", document.getElementById('favcolor').value); editMd.color = document.getElementById('favcolor').value;  
}
function outlineStart(event) { //event.stopPropagation(); 
	document.getElementById("favcolor2").focus(); document.getElementById("favcolor2").click(); }
function setOutline() { $("#markery").css("border", "solid 2px " + document.getElementById('favcolor2').value); //editMd.color = document.getElementById('favcolor').value;  
}
