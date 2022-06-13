//https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/ //https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-directions/
//"//style: 'mapbox://styles/mapbox/dark-v10'"
//https://imagecompressor.com/ //- Stryker font, dad's artitect... //- teleprompt with audio?
// map
var map; var map_token = "pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ";
var base = [-101.69697959674477, 39.77108807140884];

var currentMarkers=[]; var currentMark = 0; 
var addMark; var coordinates; var artFlag = false;
mapboxgl.accessToken = map_token; zoom = 5;
map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/satellite-streets-v11', center: base, zoom: zoom, buffer_size: 0.2}); //'mapbox://styles/mapbox/light-v10'
map.on('load', function (event) { //$("head").append('<style type="text/css">.markre{visibility:visible!important;}</style>');
	showIntro();
    map.on('click', function(e) { coordinates = e.lngLat; if(artFlag) { addArt(); artFlag = false; } $('.fixed-action-btn').floatingActionButton('close'); }); });

var satSwitch = false; var satCenter; var currentToggle = 0; var gpsSwitch = false; var randSwitch = false;
function mapSat() { satCenter = map.getCenter();
	if (satSwitch) { mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'; satSwitch = false; $("#map-sat").addClass("amber");  } else { mapStyle = 'mapbox://styles/mapbox/light-v10'; satSwitch = true; $("#map-sat").removeClass("amber");}
	map = new mapboxgl.Map({container: 'map', style: mapStyle, center: satCenter, zoom: zoom, buffer_size: 0.2}); 
		  clearMarkers();
		  for (let a=0;a<currentContent.length;a++) { addMark(currentContent[a][0],currentContent[a][1],currentContent[a][2],currentContent[a][3],currentContent[a][4],currentContent[a][5],currentContent[a][6]); } currentMarkers[currentToggle].togglePopup(); }

var tempCoord = [0,0];
function mapLoc() { if (gpsSwitch) { clearMap(); gpsSwitch = false; $("#map-gps").addClass("grey"); $("#map-gps").removeClass("blue"); } 
	else { if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(geoSuccess, geoError); } else { alert("Geolocation is not supported by this browser.");} } }
function geoSuccess(position) {tempCoord[1] = position.coords.latitude;tempCoord[0] = position.coords.longitude; gpsSwitch = true; $("#map-gps").addClass("blue"); $("#map-gps").removeClass("grey"); setZoom = 8; fly(tempCoord); addBeacon(tempCoord); beacon = true; } 
function geoError() { alert('No location'); }

var selectedMark = -1; var mapMark = -1;
function mapRand() { var rand = []; for (let i=0;i<domains.length;i++) { if (domains[i].checked == true) { rand.push(i); } }
	mapMark = Math.floor(Math.random() * rand.length); flyMark(rand[mapMark]); }
function mapRoute() { clearMarkers(); mapMark += 1; if (selectedMark == domains.length) { mapMark = 0; } showMark(mapMark);  }
var dirSwitch = true;
//var dirControl = new MapboxDirections({ accessToken: mapboxgl.accessToken });
function mapDir() { 
	if (dirSwitch) { dirSwitch = false; $("#map-dir").addClass("amber"); 
		        //map.addControl(dirControl, 'bottom-left');
		       } else { dirSwitch = true; $("#map-dir").removeClass("amber"); 
			       //map.removeControl(dirControl); 
			      } }
function mapAdd() { clearMarkers(); addArtifact(); } //pullOwner(' + i + '); pullPrice(' + i + '); 


var popups = []; var walletSwitch = true; var markCount = 0; //if (place == "") place = window.location.host;
function convertCoord(coord) { //66°32′56″N 152°50′41″W  Degrees + ((Minutes / 60) + (Seconds / 3600))
	var raw = coord; var lat, long; var add, add2; var sub, sub2;
		     if (raw.includes("N")) { lat = raw.substring(0, raw.indexOf('N')); 
					     add = lat.substring(lat.indexOf('°')+1, lat.indexOf('′')); add2 = lat.substring(lat.indexOf('′')+1, lat.indexOf('″'));
					     lat = lat.substring(0, lat.indexOf('°')); }
			else { lat = raw.substring(0, raw.indexOf('S')); 
			      add = lat.substring(lat.indexOf('°')+1, lat.indexOf('′')); add2 = lat.substring(lat.indexOf('′')+1, lat.indexOf('″'));
			      lat = lat.substring(0, lat.indexOf('°')); lat = "-" + lat; }

			if (raw.includes("W")) {  long = raw.substring(raw.indexOf(' ')+1, raw.indexOf('W')); 
						sub = long.substring(long.indexOf('°')+1, long.indexOf('′')); sub2 = long.substring(long.indexOf('′')+1, long.indexOf('″'));
						long = long.substring(0, long.indexOf('°')); }
		     else { long = raw.substring(raw.indexOf(' ')+1, raw.indexOf('E')); 
			   sub = long.substring(long.indexOf('°')+1, long.indexOf('′')); sub2 = long.substring(long.indexOf('′')+1, long.indexOf('″'));
			   long = long.substring(0, long.indexOf('°')); long = "-" + long; }
		     return [parseInt(long) + (parseInt(sub)/60) + (parseInt(sub2)/3600), parseInt(lat)  + (parseInt(add)/60) + (parseInt(add2)/3600)];
}
function showMark(i) { 
	var mark = convertCoord(domains[i].coord);
	var marv = document.createElement('div'); marv.id = 'marker' + i; 
	var marker = new mapboxgl.Marker(marv).setLngLat(mark).addTo(map);

    	$('#marker'+i).addClass('markre'); $('#marker'+i).addClass('z-depth-3'); var style=$('#marker'+i).attr('style');
    	temper = ";background-color:"+ getCollect(domains[i].core.collection.slug).replace('.png','') + ";border:solid 2px black;"; style += temper; 
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	$('#marker'+i).attr('style',style); 
	
	domains[i].map = marker;
	//currentMarkers.push(marker);
	
	var markup = '<div><div style="display:flex; justify-content:center;"><img class="materialboxed" width="120" height="120" src="'+domains[i].core.image_url+'"/></div><div style="margin-top:16px; font-size:16px;"><a onclick="openInNewTab(\'' + domains[i].core.external_link + '\');">' + domains[i].core.name + '</a><br/><br/><a class="waves-effect waves-blue btn blue lighten-2" onclick="buildDoc(' + i + ');" ><i class="material-icons">description</i></a>&nbsp;&nbsp;<a class="modal-trigger waves-effect waves-light btn amber" href="#modal1" onclick="addListDetail(' + i + ');"><i class="material-icons">inventory_2</i></a></div></div>';

	domains[i].map.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); $('.materialboxed').materialbox(); }

function popMark(i) { domains[i].map.togglePopup();  }
var tempMark = "";
function flyMark(i) { if (tempMark != "") { tempMark.remove(); } 
		     var mark = convertCoord(domains[i].coord);
		     //lat = lat.substring(0, lat.indexOf('°')); long = long.substring(0, long.indexOf('°'));
		     
		    // 25.815°N 80.224°W
		     
	//var mark = [domains[i].coord.substring(domains[i].coord.indexOf(', ')+1,domains[i].coord.indexOf(']')-1), domains[i].coord.substring(domains[i].coord.indexOf('[')+1,domains[i].coord.indexOf(',')-1)];
	var marv = document.createElement('div'); marv.id = 'marker' + i; 
	var marker = new mapboxgl.Marker(marv).setLngLat(mark).addTo(map);

    	$('#marker'+i).addClass('markre'); $('#marker'+i).addClass('z-depth-3'); var style=$('#marker'+i).attr('style');
    	temper = ";background-color:"+ getCollect(domains[i].core.collection.slug).replace('.png','') + ";border:solid 2px black;"; style += temper; 
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	$('#marker'+i).attr('style',style); 
	
	tempMark = marker;
	
	var markup = '<div><div style="display:flex; justify-content:center;"><img class="materialboxed" width="120" height="120" src="'+domains[i].core.image_url+'"/></div><div style="margin-top:16px; font-size:16px;"><a onclick="openInNewTab(\'' + domains[i].core.external_link + '\');">' + domains[i].core.name + '</a><br/><br/><a class="waves-effect waves-blue btn blue lighten-2" onclick="buildDoc(' + i + ');" ><i class="material-icons">description</i></a>&nbsp;&nbsp;<a class="modal-trigger waves-effect waves-light btn amber" href="#modal1" onclick="addListDetail(' + i + ');"><i class="material-icons">inventory_2</i></a></div></div>';

	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); 

	setZoom = 9; startUp = function() {  tempMark.togglePopup(); }; fly(mark); } 

var inputMark = "";
function editMark() { if (inputMark != "") { inputMark.remove(); inputMark = ""; }
	var marv = document.createElement('div'); marv.id = 'markerx'; 
	inputMark = new mapboxgl.Marker(marv).setLngLat(coordinates).addTo(map);

    	$('#markerx').addClass('markre'); $('#markerx').addClass('z-depth-3'); var style=$('#markerx').attr('style');
    	temper = ";background-color:red;border:solid 2px black;"; style += temper; 
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	$('#markerx').attr('style',style); 

	inputMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(editContent));
}

function clearMark() { clearMap(); if (tempMark != "") { tempMark.remove(); tempMark = ""; } if (inputMark != "") { inputMark.remove(); inputMark = ""; }
	for (let a=0;a<domains.length;a++){ if (domains[a].map != "") { domains[a].map.remove(); domains[a].map = ""; } } }

function removeMarkers() { if (currentMarkers!==null) { for (var i = currentMarkers.length - 1; i >= 0; i--) { currentMarkers[i].remove(); } currentMarkers = []; } }
	
function addArtifact() { M.toast({html: 'Select location...'}); artFlag = true; } //datetimeStart(); }

function addArt() { clearMark(); editMark(); //$('.datepicker').datepicker(); //setDefaultDate: true
		   inputMark.togglePopup(); }
var beacon = false; var pather = false; var introMark; var nomadPath; var artifactPath; var setDomain; var currentContent = [];
function showPath(color) { addLine(color); nomadPath = requestAnimationFrame(drawLine); }
//function showLandlord() { startPoint = fr; endPoint = fr2; showPath('green'); currentMarkers[0].togglePopup(); currentMarkers[1].togglePopup(); pather = true; currentToggle = 1; }
//function showArt() { addBeacon(fr3); currentMarkers[1].togglePopup(); currentMarkers[2].togglePopup(); beacon = true; currentToggle = 2; }
//function showBase() { currentMarkers[2].togglePopup(); currentMarkers[0].togglePopup(); currentToggle = 0; }

function clearMap() { cancelAnimationFrame(nomadPath); if (pather) { removeLine(); } if (beacon) { removeBeacon(); } pather = false; beacon = false; }
    const geojsonDraw = { "type": "FeatureCollection","features": [{"type": "Feature", "geometry": { "type": "LineString", "coordinates": [] } }] };
var startPoint; var endPoint;
var framesPerSecond = 20; var initialOpacity = 1; var opacity = initialOpacity; var initialRadius = 4; var radius = initialRadius; var maxRadius = 15; var speedFactor = 100; var animation; var lineCoordinates=[]; var animationCounter=0;
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

function removeLine() {
    map.removeLayer('line-draw'); map.removeLayer('point2'); map.removeLayer('circle2');map.removeLayer('point1'); map.removeLayer('circle1'); map.removeSource('point2'); map.removeSource('point1');  map.removeSource('line-draw');
    geojsonDraw.features[0].geometry.coordinates = []; }

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

const size = 200;
const pulsingDot = { width: size, height: size, data: new Uint8Array(size * size * 4),
    onAdd: function () { const canvas = document.createElement('canvas'); canvas.width = this.width; canvas.height = this.height; this.context = canvas.getContext('2d'); },
    render: function () { const duration = 1000; const t = (performance.now() % duration) / duration; const radius = (size / 2) * 0.3; const outerRadius = (size / 2) * 0.7 * t + radius; const context = this.context;
        context.clearRect(0, 0, this.width, this.height); context.beginPath(); context.arc( this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2 ); context.fillStyle = `rgba(3, 111, 252, ${1 - t})`; context.fill();
        context.beginPath(); context.arc( this.width / 2, this.height / 2, radius, 0, Math.PI * 2 ); context.fillStyle = 'rgba(68, 140, 235, 1)'; context.strokeStyle = 'white'; context.lineWidth = 2 + 4 * (1 - t); context.fill(); context.stroke();
        this.data = context.getImageData( 0, 0, this.width, this.height).data; map.triggerRepaint(); return true; } };

function addBeacon(place) {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    map.addSource('dot-point', { 'type': 'geojson', 'data': { 'type': 'FeatureCollection', 'features': [ { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': place } } ] } });
    map.addLayer({'id': 'layer-with-pulsing-dot', 'type': 'symbol', 'source': 'dot-point', 'layout': { 'icon-image': 'pulsing-dot' }  }); }
function removeBeacon() {map.removeLayer('layer-with-pulsing-dot');map.removeSource('dot-point');map.removeImage('pulsing-dot'); }

var flying; var startUp; var setZoom = 5;
function fly(dest) {
    const nowhere = [-75.10664162497726, 45.741025518671464];
    map.fire('click', { latLng: nowhere, point: map.project(nowhere), originalEvent: {} }); flying = true;
    map.on('moveend', function(e){ if(flying){ flying = false; startUp(); } });
    map.flyTo({ center: dest, zoom: setZoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true }); }

function showIntro() {
var mark = base;
	var marv = document.createElement('div'); marv.id = 'markera'; 
	var marker = new mapboxgl.Marker(marv).setLngLat(mark).addTo(map);

    	$('#markera').addClass('markre'); $('#markera').addClass('z-depth-3'); var style=$('#markera').attr('style');
    	temper = ";background-color:red;border:solid 2px black;"; style += temper; 
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
	$('#markera').attr('style',style); 
	
	tempMark = marker;
	
	var markup = '<div><div style="display:flex; justify-content:center;"><img width="48" height="48" src="res/img/seal3.png"/></div><div style="margin-top:16px; font-size:16px;"><a>tactician.us</a><br/><br/><a class="waves-effect waves-blue btn blue lighten-2" ><i class="material-icons">description</i></a>&nbsp;&nbsp;<a class="modal-trigger waves-effect waves-light btn amber" href="#modal1" ><i class="material-icons">inventory_2</i></a></div></div>';

	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); 	 tempMark.togglePopup();
	
}
