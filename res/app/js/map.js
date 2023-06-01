


mapboxgl.accessToken = "pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ";

var zoom = 5; var base = [-101.69697959674477, 35.77108807140884];
var beforeMap, afterMap, container, charter = ""; var slida = window.innerWidth - 100; 
var leftMap = 'satellite'; var rightMap = 'light'; var setFlag = true;

function setMap() { if (charter != "") { base = beforeMap.getCenter(); }
	switch (leftMap) {
		case 'street': beforeStyle = 'mapbox://styles/mapbox/streets-v12'; break;
		case 'outdoor': beforeStyle = 'mapbox://styles/mapbox/outdoors-v12'; break;
		case 'satellite': beforeStyle = 'mapbox://styles/mapbox/satellite-streets-v11'; break;
		case 'light': beforeStyle = 'mapbox://styles/mapbox/light-v11'; break;
		case 'dark': beforeStyle = 'mapbox://styles/mapbox/dark-v10'; break; }
		//case 'terrain': beforeStyle = 'cjaudgl840gn32rnrepcb9b9g'; break; }
	switch (rightMap) {
		case 'light': afterStyle = 'mapbox://styles/mapbox/light-v10'; break;
		case 'dark': afterStyle = 'mapbox://styles/mapbox/dark-v10'; break; }

	beforeMap = new mapboxgl.Map({ container: 'before', style: beforeStyle, center: base, zoom: zoom }); afterMap = new mapboxgl.Map({ container: 'after', style: afterStyle, center: base, zoom: zoom });
	syncMaps(beforeMap, afterMap); container = '#comparison-container';   
	afterMap.on('load', function (event) { 
		afterMap.on('click', function(e) { coordinates = e.lngLat; if (artFlag) { markEdit(); artFlag = false; } }); }); }
		
function setTile() { 
	const layers = map.getStyle().layers;
    for (const layer of layers) {if (layer.type === 'symbol' && layer.layout['text-field']) {map.removeLayer(layer.id);}}

	switch (tile) { 
		case 'build': map.addLayer({'id': '3d-buildings','source': 'composite','source-layer': 'building','filter': ['==', 'extrude', 'true'],'type': 'fill-extrusion','minzoom': 15,'paint': {'fill-extrusion-color': '#aaa','fill-extrusion-height': ['interpolate',['linear'],['zoom'],15,0,15.05,['get', 'height']],'fill-extrusion-base': ['interpolate',['linear'],['zoom'],15,0,15.05,['get', 'min_height']],'fill-extrusion-opacity': 0.6}}); break;
		case 'ocean': map.addSource('10m-bathymetry-81bsvj', {type: 'vector',url: 'mapbox://mapbox.9tm8dx88'}); map.addLayer({'id': '10m-bathymetry-81bsvj','type': 'fill','source': '10m-bathymetry-81bsvj','source-layer': '10m-bathymetry-81bsvj','layout': {},'paint': {'fill-outline-color': 'hsla(337, 82%, 62%, 0)','fill-color': ['interpolate',['cubic-bezier', 0, 0.5, 1, 0.5],['get', 'DEPTH'],200,'#78bced',9000,'#15659f']}},'land-structure-polygon'); break;
		case 'terrain': map.addSource('dem', {'type': 'raster-dem','url': 'mapbox://mapbox.mapbox-terrain-dem-v1','tileSize': 512,'maxzoom': 14}); map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 }); map.addLayer({'id': 'hillshading','source': 'dem','type': 'hillshade'},'waterway-river-canal-shadow'); break; } }


 
/*
map.on('style.load', () => {


});
*/

setMap();  charter = new mapboxgl.Compare(beforeMap, afterMap, container, { });



//mapbox.mapbox-bathymetry-v2 (use with streets v8?)
//terrain?
//mapbox.transit-v2

/*
const geojson = {'type': 'FeatureCollection','features': [{'type': 'Feature','geometry': {'type': 'LineString','properties': {},'coordinates': [[-77.0366048812866, 38.89873175227713],[-77.03364372253417, 38.89876515143842],[-77.03364372253417, 38.89549195896866],[-77.02982425689697, 38.89549195896866],[-77.02400922775269, 38.89387200688839],[-77.01519012451172, 38.891416957534204],[-77.01521158218382, 38.892068305429156],[-77.00813055038452, 38.892051604275686],[-77.00832366943358, 38.89143365883688],[-77.00818419456482, 38.89082405874451],[-77.00815200805664, 38.88989712255097]]}}]};
 
map.on('load', () => {map.addSource('LineString', {'type': 'geojson','data': geojson});
map.addLayer({'id': 'LineString','type': 'line','source': 'LineString','layout': {'line-join': 'round','line-cap': 'round'},'paint': {'line-color': '#BF93E4','line-width': 5}});
 
document.getElementById('zoomto').addEventListener('click', () => {

const coordinates = geojson.features[0].geometry.coordinates;
const bounds = new mapboxgl.LngLatBounds(coordinates[0],coordinates[0]);

for (const coord of coordinates) {bounds.extend(coord);}
map.fitBounds(bounds, {padding: 20});});});

const marker = new mapboxgl.Marker({draggable: true}).setLngLat(center).addTo(map);

function onDragEnd() {const lngLat = marker.getLngLat();coordinates.style.display = 'block';coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;}
marker.on('dragend', onDragEnd);

const canvas = map.getCanvasContainer(); //const geojson = {'type': 'FeatureCollection','features': [{'type': 'Feature','geometry': {'type': 'Point','coordinates': center}}]};
function onMove(e) {const coords = e.lngLat;canvas.style.cursor = 'grabbing';geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];map.getSource('point').setData(geojson);}
function onUp(e) {const coords = e.lngLat;coordinates.style.display = 'block';coordinates.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`;canvas.style.cursor = '';

map.off('mousemove', onMove);map.off('touchmove', onMove);}

function rotateCamera(timestamp) {map.rotateTo((timestamp / 100) % 360, { duration: 0 }); requestAnimationFrame(rotateCamera);}

const marker2 = new mapboxgl.Marker({color: '#F84C4C' });

function animateMarker(timestamp) {const radius = 20;marker2.setLngLat([Math.cos(timestamp / 1000) * radius,Math.sin(timestamp / 1000) * radius]);marker2.addTo(map);
requestAnimationFrame(animateMarker);}
 
requestAnimationFrame(animateMarker);
const radius = 20;
 
function pointOnCircle(angle) {return {'type': 'Point','coordinates': [Math.cos(angle) * radius, Math.sin(angle) * radius]};}
 

// add route line
var router = []; var coorder = [2.3,49];router.push(coorder);
for (let a =0; a < 10; a++) {var coorder2 = []; coorder2[0] =router[a][0]; coorder2[1]=router[a][1]; coorder2[0]+=0.19;coorder2[1]+=0.19;router.push(coorder2)} // etc.x
var linestring = turf.lineString(router);

//map.addSource('trace', {type: 'geojson',data: {'type': 'Feature','properties': {},'geometry': {'type': 'LineString','coordinates': JSON.parse(JSON.stringify(router))}}});
//map.addLayer({type: 'line',source: 'trace',id: 'line',paint: {'line-color': 'black','line-width': 5},layout: {'line-cap': 'round','line-join': 'round'}});
*/
var mapControl = false;
var locControl = new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true },trackUserLocation: true,showUserHeading: true}); 
var navControl = new mapboxgl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }); 
var scaleControl = new mapboxgl.ScaleControl();
function toggleTool() { map = afterMap; if (mapControl) { mapControl = false; map.removeControl(navControl); map.removeControl(locControl); map.removeControl(scaleControl); } else { mapControl = true; map.addControl(navControl); map.addControl(locControl); map.addControl(scaleControl, 'top-right');  }  }

function moveToMapPosition (master, clones) { var center = master.getCenter(); var zoom = master.getZoom(); var bearing = master.getBearing(); var pitch = master.getPitch();
  clones.forEach(function (clone) { clone.jumpTo({ center: center, zoom: zoom, bearing: bearing, pitch: pitch }); }); }
function syncMaps () { var maps; var argLen = arguments.length; if (argLen === 1) { maps = arguments[0]; } else { maps = []; for (var i = 0; i < argLen; i++) { maps.push(arguments[i]); } }
  var fns = []; maps.forEach(function (map, index) { fns[index] = sync.bind(null, map, maps.filter(function (o, i) { return i !== index; })); });
function on () { maps.forEach(function (map, index) { map.on('move', fns[index]); }); }
function off () { maps.forEach(function (map, index) { map.off('move', fns[index]); }); }
function sync (master, clones) { off(); moveToMapPosition(master, clones); on(); }
on(); return function(){  off(); fns = []; maps = []; }; }


function showMap() { clearMarkers();
	for (let a=0;a<currentContent.length;a++) { addMark(currentContent[a][0],currentContent[a][1],currentContent[a][2],currentContent[a][3],currentContent[a][4],currentContent[a][5],currentContent[a][6]); } currentMarkers[currentToggle].togglePopup(); }

var tempCoord = [0,0];


function searcher() {  
	var geocoder = new MapboxGeocoder({ accessToken: 'pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ', mapboxgl: beforeMap });
	
//	const geocoder = new MapboxGeocoder({accessToken: mapboxgl.accessToken,types: 'poi',
// see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
//render: function (item) { const maki = item.properties.maki || 'marker';return `<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'><span class='geocoder-dropdown-text'>${item.text}</span></div>`;},mapboxgl: mapboxgl});
 
document.getElementById('geocoder').appendChild(geocoder.onAdd(beforeMap));
	const elements = document.querySelectorAll('mapbox-address-autofill');
   for (const autofill of elements) { autofill.accessToken = 'pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ'; autofill.addEventListener('retrieve', (event) => {
     const featureCollection = event.detail; $('#textarea1').val(featureCollection.features[0].properties.full_address); M.textareaAutoResize($('#textarea1')); setTimeout(function() { $("#auto-ad").val(""); }, 500); $("#textarea1").focus();
	$.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ featureCollection.features[0].properties.full_address + '.json?access_token=pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ', function(data) { 
		$("#long").val(data.features[0].center[0]);  $("#lat").val(data.features[0].center[1]); } );}); } $("#auto-ad").focus(); }
		


var coordinates; var artFlag = false; var tempMark = ""; var tempMap = [];

//mapbox directions...
function address(a) {
	//const form = document.getElementById('addressa'); //const input = form.querySelector('input[type=text]')
   //const valueMap = mapboxsearch.getFormAutofillValues(form, input); //console.log(valueMap);
const searchText = mapboxsearch.getAutofillSearchText(a); //console.log(searchText); // '123 Main St, San Francisco, CA'
}

var popup = []; var pather = false; var beacon = false; var map;
//coord, card, border, background, name, doc, step, button, icon

var flying; var startUp; 
function fly(dest) { const nowhere = [-75.10664162497726, 45.741025518671464]; map.fire('click', { latLng: nowhere, point: map.project(nowhere), originalEvent: {} }); flying = true;
    	map.on('moveend', function(e){ if(flying){ flying = false; startUp(); } }); map.flyTo({ center: dest, zoom: zoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true }); }


function clearDraw() { if (typeof nomadPath !== 'undefined') cancelAnimationFrame(nomadPath); if (pather) { removeLine(); } if (beacon) { removeBeacon(); } pather = false; beacon = false; }


class Pin { id = ""; mark = ""; }
var pins = [];
function showMark(i) { map = beforeMap;
	var marv = document.createElement('div'); marv.id = 'marker' + i;  var marp = new mapboxgl.Marker(marv).setLngLat(converter(domains[i].coord)).addTo(map);
	var symbol = domains[i].img; var name = domains[i].core.name.replace(symbol,"").replace(" ",""); var mare = $('#marker'+i);
	
	mare.addClass('markre'); mare.addClass('z-depth-3'); //color?
	var front = getFront(domains[i].core.collection.slug); var back = getBack(domains[i].core.collection.slug);
	var style=mare.attr('style'); style += ";align-items: center;justify-content: center;display: flex;background-color: " + back + ";border: 2px solid " + front + ";font-size: 16px;"; mare.attr('style',style);  mare.html(domains[i].img);
	var markup = '<div><div style="display:flex; justify-content:center; flex-direction:column; align-items:center;" ><div style="width:64px;height:64px;display:flex;margin-top:6px;border-radius:8px;cursor:pointer;" class="z-depth-1" onclick="buildDoc(\'' + i+ '\');"><img style="border-radius:8px;width:64px;height:64px;" src="' + domains[i].core.image_url + '" /></div><div style="margin-top:16px; margin-bottom:12px; font-size:16px;"><span style="font-weight:bold;">' + name + '</span></div><div class="editMark" style="width:100%; display:flex;justify-content:center;margin-left:8px;margin-right:8px;"><a class="red lighten-5 z-depth-1 waves-effect waves-light btn" style="border-radius:8px 0px 0px 8px;"  onclick="addListDetail(' + i + ');">📄</a><a class="amber lighten-5 z-depth-1 waves-effect waves-light btn" style="border-radius:0px 8px 8px 0px;" onclick="startTrade();">💼</a>';

	marp.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); //pullOwner(id);
	
	//startUp = function() { marp.togglePopup(); }
	//fly(converter(obj.coord));
	
	var tmp_pin = new Pin(); tmp_pin.id = i; tmp_pin.mark = marp; pins.push(tmp_pin); } 

function convertMarker(coord) { //if (coord.indexOf('LngLat') == -1) { return coord; }
	var raw = coord.replace('LngLat(','').replace(')','').replace(' ','').replace('[','').replace(']','');
	return [raw.substring(0, raw.indexOf(',')), raw.substring(raw.indexOf(',')+1, raw.length)];}
function converter(coord) { //66°32′56″N 152°50′41″W  Degrees + ((Minutes / 60) + (Seconds / 3600)) 40°41′34″N 73°59′25″W
	if (!(coord.includes('°'))) return convertMarker(coord);
	var raw = coord; var lat, long; var add, add2; var sub, sub2; var final, final2;
	if (raw.includes("N")) { lat = raw.substring(0, raw.indexOf('N')); add = lat.substring(lat.indexOf('°')+1, lat.indexOf('′')); add2 = lat.substring(lat.indexOf('′')+1, lat.indexOf('″')); lat = lat.substring(0, lat.indexOf('°')); }
	else { lat = raw.substring(0, raw.indexOf('S')); add = lat.substring(lat.indexOf('°')+1, lat.indexOf('′')); add2 = lat.substring(lat.indexOf('′')+1, lat.indexOf('″')); lat = lat.substring(0, lat.indexOf('°')); lat = "-" + lat; }

	if (raw.includes("E")) {  long = raw.substring(raw.indexOf(' ')+1, raw.indexOf('E')); sub = long.substring(long.indexOf('°')+1, long.indexOf('′')); sub2 = long.substring(long.indexOf('′')+1, long.indexOf('″')); long = long.substring(0, long.indexOf('°')); }
	else { long = raw.substring(raw.indexOf(' ')+1, raw.indexOf('W')); sub = long.substring(long.indexOf('°')+1, long.indexOf('′')); sub2 = long.substring(long.indexOf('′')+1, long.indexOf('″')); long = long.substring(0, long.indexOf('°')); long = "-" + long; }
	
	if (isNaN(long) || isNaN(sub) || isNaN(sub2)) { if (isNaN(long)) { final = 0; } else { final = parseInt(long); } } else { final = parseInt(long) + (parseInt(sub)/60) + (parseInt(sub2)/3600); }
	if (isNaN(lat) || isNaN(add) || isNaN(add2)) { if (isNaN(lat)) { final2 = 0; } else { final2 = parseInt(lat); } } else { final2 = parseInt(lat)  + (parseInt(add)/60) + (parseInt(add2)/3600); }  return [final, final2]; }
	
function flyDomain(i) { clearMap(); charter.setSlider(width-100); slida = width - 100; afterMap = 'light'; setMap();
	showDomain(i); startUp = function() { for (let a = 0; a < pins.length; a++) { if (pins[a].id == i) pins[a].mark.togglePopup(); } //domains[i].map.togglePopup(); 
	}; fly(converter(domains[i].coord)); }

function showDomain(i) { showMark(i); }
function hideDomain(i) { for (let a = 0; a < pins.length; a++) { if (pins[a].id == i) { pins[a].mark.remove(); pins.splice(a,1); return 1; } } return 0; } //if (domains[i].map != "") { domains[i].map.remove(); }  }

function deedMap() { var introRemove = false; for (let i=0;i<domains.length;i++) { if (domains[i].checked) { showDomain(i); introRemove = true; } else { hideDomain(i); } }  
		   if (introRemove) { clearMap(); clearLearn(); } }
//function domainMap() { showMark(convertMark(domainMd.location), domainMd.color, 'res/img/dralun/shield.png', 'temp.com', domainMd.name, 'x', 'deed'); }
//function artMap() {  for (let i=0;i<artifacts.length;i++) { if (artifacts[i].checked) { showArt(i); } }  }



function addArt() { showEdit(); tempMark.togglePopup(); 
	//var survive = Math.floor(Math.random() * (50 - 1 + 1)) + 1;  $("#thumb").attr("src","res/img/icon/default/"+survive+".png"); $("#titler").html("My Item 🥚"); $("#pricer").html("0.1"); board.profile = "res/img/icon/default/"+survive+".png";
	//afterMap = 'dark'; setMap(); charter
		  // editMd.location = coordinates.toString(); // startPoint = mapSpot; endPoint = coordinates.toString(); showPath('green'); pather = true;	   
	//$(".switch.shape").find("input[type=checkbox]").on("change",function() { var status = $(this).prop('checked'); setShape(status); });
		   coordinates.lat -= 6;  map.flyTo({ center: coordinates, zoom: zoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true }); }

//charter = new mapboxgl.Compare(beforeMap, afterMap, container, { }); 






map.on('load', () => { 



	map.addSource('path', {'type': 'geojson','data': {'type': 'Feature','properties': {},'geometry': {'type': 'LineString','coordinates': 
		JSON.parse(JSON.stringify(router))
		
		//[[2.3399, 48.8555],[3.3399, 48.8555],[4.3399, 48.8555]]  
	}}});
map.addLayer({'id': 'route','type': 'line','source': 'path','layout': {'line-join': 'round','line-cap': 'round'},'paint': {'line-color': '#888','line-width': 8}});

map.addSource('point', {'type': 'geojson','data': geojson});
map.addLayer({'id': 'point','type': 'circle','source': 'point','paint': {'circle-radius': 10,'circle-color': '#F84C4C' }});

map.on('mouseenter', 'point', () => {map.setPaintProperty('point', 'circle-color', '#3bb2d0');canvas.style.cursor = 'move';});
map.on('mouseleave', 'point', () => {map.setPaintProperty('point', 'circle-color', '#3887be');canvas.style.cursor = '';});
map.on('mousedown', 'point', (e) => {e.preventDefault(); 
canvas.style.cursor = 'grab';
map.on('mousemove', onMove);map.once('mouseup', onUp);});
map.on('touchstart', 'point', (e) => {
if (e.points.length !== 1) return; e.preventDefault();
map.on('touchmove', onMove);map.once('touchend', onUp);});


//rotateCamera(0);



const animationDuration = 80000;const cameraAltitude = 4000;
const routeDistance = turf.lineDistance(turf.lineString(JSON.parse(JSON.stringify(router))));const cameraRouteDistance = turf.lineDistance(turf.lineString(JSON.parse(JSON.stringify(router))));
 
let start;
function frame(time) {if (!start) start = time;
const phase = (time - start) / animationDuration;if (phase > 1) {setTimeout(() => {start = 0.0;}, 1500);}
const alongRoute = turf.along(turf.lineString(JSON.parse(JSON.stringify(router))),routeDistance * phase).geometry.coordinates;
const alongCamera = turf.along(turf.lineString(JSON.parse(JSON.stringify(router))),cameraRouteDistance * phase).geometry.coordinates;
const camera = map.getFreeCameraOptions();
camera.position = mapboxgl.MercatorCoordinate.fromLngLat({lng: alongCamera[0],lat: alongCamera[1]},cameraAltitude);camera.lookAtPoint({lng: alongRoute[0],lat: alongRoute[1]});
 
map.setFreeCameraOptions(camera);
window.requestAnimationFrame(frame); }
//window.requestAnimationFrame(frame);

map.addSource('point2', {'type': 'geojson','data': pointOnCircle(0)});
map.addLayer({'id': 'point2','source': 'point2','type': 'circle','paint': {'circle-radius': 10,'circle-color': '#007cbf'}});
 
function animateMarker(timestamp) {
map.getSource('point2').setData(pointOnCircle(timestamp / 1000));
requestAnimationFrame(animateMarker);}
animateMarker(0);

// Set custom fog
map.setFog({'range': [-0.5, 2],'color': '#def','high-color': '#def','space-color': '#def'});
// Add terrain source, with slight exaggeration

const pinRoute = router; //pinRouteGeojson.features[0].geometry.coordinates;
//await map.once('idle');
const animationDuration2 = 20000;const path = turf.lineString(pinRoute);const pathDistance = turf.lineDistance(path);
let start2;
function frame(time) {
if (!start2) start2 = time;const animationPhase = (time - start2) / animationDuration2;
if (animationPhase > 1) {return;}

const alongPath = turf.along(path, pathDistance * animationPhase).geometry.coordinates;
const lngLat = {lng: alongPath[0],lat: alongPath[1]};
const elevation = Math.floor(map.queryTerrainElevation(lngLat, { exaggerated: false }));
//popup.setHTML('Altitude: ' + elevation + 'm<br/>');marker.setLngLat(lngLat);
 
map.setPaintProperty('line', 'line-gradient', ['step',['line-progress'],'red',animationPhase,'rgba(255, 0, 0, 0)']);
const rotation = 150 - animationPhase * 40.0;
map.setBearing(rotation % 360);
window.requestAnimationFrame(frame);}window.requestAnimationFrame(frame); });

//map.setLayoutProperty('country-label', 'text-field', ['get', `name_${language}` ]); //ru fr de es


var picker; var trigger;
function mapAdd() { M.toast({html: 'Select location...'}); rightMap = 'dark';  setMap(); charter.setSlider(48); slida = 48; artFlag = true; } 
function markEdit() {  // coordinates = [$("#long").val(), $("#lat").val()]; // coordinates.lat += 6;
	showEdit(); }
function showEdit() { if (tempMark != "") { tempMark.remove(); tempMark = ""; } map = afterMap; 
	var marv = document.createElement('div'); marv.id = 'markery';// coordinates.lat += 6;
	tempMark = new mapboxgl.Marker(marv).setLngLat(coordinates).addTo(map); //board.coord = coordinates;
    	$('#markery').addClass('markre'); $('#markerx').addClass('z-depth-3'); var style=$('#markery').attr('style'); $("#markery").html("🍳");
		     //var front = getFront(domains[myDomain].core.collection.slug); var back = getBack(domains[myDomain].core.collection.slug);  //random?
		     front = "indianred"; back = "darkred";
    	style += ";background-color:" + front + ";border:solid 2px " + back + ";display: flex;align-items: center;justify-content: center;font-size: 18px;border-radius:50%;"; $('#markery').attr('style',style);
    	//style += "background-size:contain; background-image:url('res/img/map/DECAL_" + String(decal).padStart(3, '0') +".png');";  
	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(editContent));  
	map.flyTo({ center: coordinates, zoom: zoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true }); tempMark.togglePopup(); 
	//startUp = function() { }; fly(converter(coordinates));
	 }

	
//var textInput = '<input id="edit-name" type="text" class="validate" oninput="setText(this);">';
var textInput = '<div class="input-field col s6"><input id="edit-name" type="text" class="validate" onfocus="picName();" ><label id="namer" for="edit-name">Enter title ...</label></div>'
var numInput = '<input id="edit-num" type="number" class="validate" oninput="setText(this);" step=".01">';
var spanInput = '<span>OpenSea Item Title</span>';
// color picker = status selected message with copy color option ...
//var pickIcon = false; var pickName = false; var pickPrice = false; 
var pickLock = true;
//function picReset() { pickIcon = false; pickName = false; pickPrice = false; }
function picLock() { if (pickLock) { pickLock = false; $("#i5").html("🔓"); } else { pickLock = true; $("#i5").html("🔒"); } }
function picText() { pullOwner($("#edit-name").val()); }
function picName() { $("#namer").html("Title"); }
//function picText() { $("#inputer").prop('disabled', false); $("#inputer").html(textInput); $("#edit-name").val($("#titler").html()); M.toast({html: 'Edit name...'});picReset(); pickName = true; $("#edit-name").focus();$("#edit-name").click(); toggleInput(2); }
//function picPrice() { $("#inputer").prop('disabled', false); $("#inputer").html(numInput); $("#edit-num").val($("#pricer").html()); M.toast({html: 'Edit price...'});picReset(); pickPrice = true; $("#edit-name").focus();$("#edit-name").click(); toggleInput(3); }

//var mailContent = '';
//<div style="padding:12px; padding-top:0px; padding-bottom:0px; display:flex; justify-content:center;"><div id="inputer" style="margin-top:0px;margin-bottom:0px;" class="input-field col s4"><input id="edit-name" type="text" class="validate" oninput="setText(this);" onblur="disableText();"></div></div>
//onclick="$(\'#preview\').trigger(\'click\');"
var editContent = '<div class="editMark" style="width:100%; height:48px;display:flex;justify-content:center;margin-top:12px;"><a id="i2" class="waves-effect waves-light btn green lighten-5" style="border-radius:8px 0px 0px 8px;" onclick="$(\'#modal-emoji\').modal(\'open\');">🪨</a><a id="i3" class=" z-depth-1 waves-effect waves-light btn green lighten-5" onclick="colorStart(this);" >🎨</a><a id="i4" class=" z-depth-1 waves-effect waves-light btn green lighten-5" onclick="outlineStart(this);" style="border-radius:0px 8px 8px 0px;margin-right:12px;">🔳</a><a class=" z-depth-1 waves-effect waves-light btn-flat" onclick="$(\'#modal-editor\').modal(\'open\');" style="border-radius:0px 8px 8px 0px;">📄</a></div><div>' + textInput + '</div><div style="display:flex;justify-content:space-around; align-items:center;width:210px; height:140px;"><div class="z-depth-1" style="border-radius: 8px;width: 100%; height:100%; display: flex; justify-content: center;"><img id="thumber" src="res/img/seal3.png" style="padding:12px;"/></div></div><input type="color" oninput="setColor();" id="favcolor" name="favcolor" value="#ff0000" style="width:0px; height:0px;opacity:0;" /><input type="color" oninput="setOutline();" id="favcolor2" name="favcolor2" value="#ff0000" style="width:0px; height:0px;opacity:0;" /></div>';


function copyNote(obj) { obj.front = document.getElementById('favcolor').value; obj.back = document.getElementById('favcolor2').value; obj.name = $("#titler").html(); obj.icon = $("#markery").html(); obj.content = $("#pad").html(); }

function showNotes() { getNotes(); for (var a = 0; a < notes.length; a++) {
	var marv = document.createElement('div'); marv.id = 'marker' + a;  var marp = new mapboxgl.Marker(marv).setLngLat(converter(notes[a].coord)).addTo(map); var mare = $('#marker'+a);
	
	mare.addClass('markre'); mare.addClass('z-depth-3'); //color?
	var style=mare.attr('style'); style += ";align-items: center;justify-content: center;display: flex;background-color: " + notes[a].front + ";border: 2px solid " + notes[a].back + ";font-size: 16px;"; mare.attr('style',style);  mare.html(notes[a].icon);
	var markup = '<div><div style="display:flex; justify-content:center; flex-direction:column; align-items:center;" ><div style="width:64px;height:64px;display:flex;margin-top:6px;border-radius:8px;cursor:pointer;" class="z-depth-1" ><img id="img-' + a + '" style="border-radius:8px" src="data:image/png;base64,' + notes[a].image + '"/></div><div style="margin-top:16px; margin-bottom:12px; font-size:16px;"><span style="font-weight:bold;">' + notes[a].name + '</span></div><div class="editMark" style="width:100%; display:flex;justify-content:center;margin-left:8px;margin-right:8px;"><a class="red lighten-4 z-depth-1 waves-effect waves-light btn" style="border-radius:8px 0px 0px 8px;" >📄</a><a class="amber lighten-4 z-depth-1 waves-effect waves-light btn" style="border-radius:0px 8px 8px 0px;" onclick="startTrade();">📦</a>';

	marp.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); //pullOwner(id);
} } 

//var validation = [false,false,false,false,false,false,false];
function toggleInput(i) { $("#i" + i).removeClass("lighten-5"); $("#i"+i).addClass("lighten-3"); }
//	for (let a = 0; a < validation.length; a++) { if (validation[a] == false) return false; } return true; }
//function setSubmit() { $('#post-build').removeClass('disabled'); }

var editMode = false; //$('#preview').trigger('click'); 
function setPreview() { 
	var preview = document.getElementById("preview"); var thumb = document.getElementById("thumb"); const [file] = preview.files
  if (file) { if (file.size > 10000000) { M.toast({html: 'Image size cannot exceed 10MB.'}); } else { thumb.src = URL.createObjectURL(file);   }}}
function setPreviewer() { var preview = document.getElementById("preview"); var thumber = document.getElementById("thumber"); const [file] = preview.files; thumber.src = URL.createObjectURL(file); }

function resetArea() { $('.mapboxgl-popup-content').css('padding', '0');  switchTime(); $("#edit-name").val(domains[myDomain].core.name);  $("#thumb").attr("src", domains[myDomain].core.image_url); }

function colorStart(event) { //event.stopPropagation(); 
	document.getElementById("favcolor").focus(); document.getElementById("favcolor").click(); toggleInput(6); }
function setColor() { $("#markery").css("background-color", document.getElementById('favcolor').value); board.front = document.getElementById('favcolor').value;  }
function outlineStart(event) { //event.stopPropagation(); 
	document.getElementById("favcolor2").focus(); document.getElementById("favcolor2").click(); toggleInput(7); }
function setOutline() { $("#markery").css("border", "solid 2px " + document.getElementById('favcolor2').value); board.back = document.getElementById('favcolor').value;  }

function clearEdit() { if (popEdit) popEdit.remove(); if (picker) picker.close(); $('.modal').modal();  }
function clearMark() { if (tempMark != "") { tempMark.remove(); tempMark = ""; } for (let a=0;a<domains.length;a++){ if (domains[a].map != "") { domains[a].map.remove(); domains[a].map = ""; } } }
function clearMap() { clearDraw(); }


var learnArt = [-103.69697959674477, 37.77108807140884];  var learnOwn = [-99.19697959674477, 40.17108807140884]; var learnPath = [-99.79697959674477, 35.47108807140884];
var tutorial = [[[-101.69697959674477, 35.77108807140884],'indianred','indianred','background-image:url("res/img/seal3.png")','Sign Deed','a',true,'red',''],[learnArt,'goldenrod','darkgoldenrod','background-color:goldenrod','Build Domain','b',true,'amber','🪙'],[learnOwn,'darkseagreen','darkgreen','background-color:darkseagreen','Trade Note','c',true,'green','🪨'],[learnPath,'cadeblue','darkblue','background-color:cadetblue','Use OCUR','d',false,'blue','⛰️']];
function showTutorial() { map = beforeMap; startTutorial(0); }
function startTutorial(item) {  
	if (item == 1) { startPoint = base; endPoint = learnArt; showPath('indianred'); pather = true;  } 
	else if (item == 2) { clearDraw(); startPoint = learnArt; endPoint = learnOwn; showPath('goldenrod'); pather = true; } 
	else if (item == 3) { addBeacon(learnPath); beacon = true; }
	
	var mari = 'marker'+item.toString(); var marv = document.createElement('div'); 
	marv.id = mari; popup.push(new mapboxgl.Marker(marv).setLngLat(tutorial[item][0]).addTo(map)); $('#'+mari).addClass('markre'); $('#'+mari).addClass('z-depth-3'); $('#'+mari).addClass('triangle-up');  $('#'+mari).html(tutorial[item][8]);
	var style = $('#'+mari).attr('style'); style += ";" + tutorial[item][3] + ";background-size:cover;font-size: 18px; width:32px; height:32px; align-items: center; display: flex;justify-content: center;border:solid 2px " + tutorial[item][2] + ";border-radius:50%;"; $('#'+mari).attr('style',style); 
	if (tutorial[item][6]) { ending = '<a id="but' + item.toString() + '" class="waves-effect waves-light btn ' + tutorial[item][7] + ' lighten-2" onclick="popup['+item +'].togglePopup(); startTutorial(' + (item+1).toString() + '); $(\'#but' + item.toString() + '\').addClass(\'disabled\');"><i class="material-icons right">arrow_forward</i>Next</a>'; } 
	else { ending = '<a id="butPath" class="waves-effect waves-light btn blue lighten-2" onclick="clearTutorial(); startTutorial(0);"><i class="material-icons right">restart_alt</i>Reset</a>'; }
	var markup = '<div style="display:flex;flex-direction:column;align-items:center">' + makeCard(tutorial[item][1], 'showDoc(\'tact/' + tutorial[item][5] + '\');') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'tact/' + tutorial[item][5] + '\');" style="cursor:pointer;">' + tutorial[item][4] + '</span><br/><br/>' + ending + '</div></div>';

	popup[item].setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); startUp = function() { popup[item].togglePopup(); }; fly(base);  }
function clearTutorial() { for(var a = 0; a < popup.length; a++) { popup[a].remove(); } popup = []; clearDraw();  }


var house = [-122.1661845434948, 47.76905286802228];
function showHouse() { clearMap(); document.getElementById('booker').click(); $('#deed-pane').sidenav('close');  $('#deed-pane').sidenav({ edge: 'left' }); map = beforeMap;
	var marv = document.createElement('div'); marv.id = 'markerh'; popHouse = new mapboxgl.Marker(marv).setLngLat(house).addTo(map); $('#markerh').addClass('markre'); $('#markerd').addClass('z-depth-3'); 
	var style = $('#markerh').attr('style'); style += ";background-image:url('res/img/seal3.png');background-size:cover; border:solid 2px indianred;border-radius:50%;"; $('#markerh').attr('style',style);
	var markup = '<div style="    display: flex;flex-direction: column;align-items: center;">' + makeJoker('indianred') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'PLANME\');" style="cursor:pointer;">About NfNth</span><br/><br/><a id="butPath" class="waves-effect waves-light btn red lighten-2" onclick="startTrade();">Contact&nbsp;&nbsp;🏪</a></div></div>';

	popHouse.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); startUp = function() { popHouse.togglePopup(); }; fly(house); }

var outpost = [-90.1661845434948, 30.76905286802228];
function showPost() { map = beforeMap; clearMap(); document.getElementById('booker').click(); $('#deed-pane').sidenav('close'); $('#deed-pane').sidenav({ edge: 'left' });
	var marv = document.createElement('div'); marv.id = 'markerh'; popOut= new mapboxgl.Marker(marv).setLngLat(outpost).addTo(map); $('#markerh').addClass('markre'); $('#markerd').addClass('z-depth-3'); 
	var style = $('#markerh').attr('style'); style += ";background-image:url('res/img/seal3.png');background-size:cover; border:solid 2px indianred;border-radius:50%;"; $('#markerh').attr('style',style);
	var markup = '<div style="    display: flex;flex-direction: column;align-items: center;">' + makeJoker('indianred') + '</div><div style="margin-top:16px; font-size:16px;"><span onclick="showDoc(\'PLANME\');" style="cursor:pointer;">About NfNth</span><br/><br/><a id="butPath" class="waves-effect waves-light btn red lighten-2" onclick="startTrade();">Contact&nbsp;&nbsp;📦</a></div></div>';
	popHouse.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); startUp = function() { popHouse.togglePopup(); }; fly(house); }

const geojsonDraw = { "type": "FeatureCollection","features": [{"type": "Feature", "geometry": { "type": "LineString", "coordinates": [] } }] };
var startPoint; var endPoint; var framesPerSecond = 20; var initialOpacity = 1; var opacity = initialOpacity; var initialRadius = 4; var radius = initialRadius; var maxRadius = 15; var speedFactor = 100; var animation; var lineCoordinates=[]; var animationCounter=0;

function addLine(color) {
    	var diffX = endPoint[0] - startPoint[0];  var diffY = endPoint[1] - startPoint[1]; var sfX = diffX / speedFactor; var sfY = diffY / speedFactor; var i=0; var j=0;
    	while (Math.abs(i) < Math.abs(diffX) || Math.abs(j) < Math.abs(diffY)) { lineCoordinates.push([startPoint[0] + i, startPoint[1] + j]); if (Math.abs(i) < Math.abs(diffX)) {i += sfX; } if (Math.abs(j) < Math.abs(diffY)) { j += sfY; } }
    	map.addSource('point1', {"type": "geojson", "data": { "type": "Point", "coordinates": [ startPoint[0], startPoint[1] ]  } });
    	map.addLayer({ "id": "circle1", "source": "point1", "type": "circle", "paint": {"circle-radius": initialRadius, "circle-radius-transition": { duration: 0 }, "circle-opacity-transition": {   duration: 0}, "circle-color": 'black' } });
    	map.addLayer({"id": "point1", "source": "point1","type": "circle","paint": {   "circle-radius": initialRadius, "circle-color": 'black' } });
    	map.addSource('point2', {"type": "geojson", "data": { "type": "Point", "coordinates": [ endPoint[0], endPoint[1] ]  } });
    	map.addLayer({"id": "circle2", "source": "point2", "type": "circle", "paint": {  "circle-radius": initialRadius,"circle-radius-transition": {  duration: 0}, "circle-opacity-transition": {   duration: 0 }, "circle-color": 'black' } });
    	map.addLayer({ "id": "point2", "source": "point2","type": "circle", "paint": { "circle-radius": initialRadius, "circle-color": 'black' }  });
    	map.addLayer({'id': 'line-draw','type': 'line', 'source': { 'type': 'geojson', 'data': geojsonDraw },'layout': { 'line-cap': 'round', 'line-join': 'round' }, 'paint': {'line-color': color,'line-width': 2, 'line-dasharray': [2, 1]} });  }
function drawLine(i) {
	if (animationCounter < lineCoordinates.length) { geojsonDraw.features[0].geometry.coordinates.push(lineCoordinates[animationCounter]); map.getSource('line-draw').setData(geojsonDraw); nomadPath = requestAnimationFrame(drawLine); animationCounter++;}
    else { var coord = geojsonDraw.features[0].geometry.coordinates; if (coord.length > 0) { geojsonDraw.features[0].geometry.coordinates = coord; map.getSource('line-draw').setData(geojsonDraw); nomadPath = requestAnimationFrame(drawLine); }} }
function removeLine() { map.removeLayer('line-draw'); map.removeLayer('point2'); map.removeLayer('circle2');map.removeLayer('point1'); map.removeLayer('circle1'); map.removeSource('point2'); map.removeSource('point1');  map.removeSource('line-draw');
    	geojsonDraw.features[0].geometry.coordinates = []; }
function showPath(color) { addLine(color); nomadPath = requestAnimationFrame(drawLine); }

const size = 200;
const pulsingDot = { width: size, height: size, data: new Uint8Array(size * size * 4),
    	onAdd: function () { const canvas = document.createElement('canvas'); canvas.width = this.width; canvas.height = this.height; this.context = canvas.getContext('2d'); },
    	render: function () { const duration = 1000; const t = (performance.now() % duration) / duration; const radius = (size / 2) * 0.3; 
		const outerRadius = (size / 2) * 0.7 * t + radius; const context = this.context;
        	context.clearRect(0, 0, this.width, this.height); context.beginPath(); context.arc( this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2 ); context.fillStyle = `rgba(3, 111, 252, ${1 - t})`; context.fill();
        	context.beginPath(); context.arc( this.width / 2, this.height / 2, radius, 0, Math.PI * 2 ); context.fillStyle = 'rgba(68, 140, 235, 1)'; context.strokeStyle = 'white'; context.lineWidth = 2 + 4 * (1 - t); context.fill(); context.stroke();
        	this.data = context.getImageData( 0, 0, this.width, this.height).data; map.triggerRepaint(); return true; } };
function addBeacon(place) { map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 }); map.addSource('dot-point', { 'type': 'geojson', 'data': { 'type': 'FeatureCollection', 'features': [ { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': place } } ] } });
    	map.addLayer({'id': 'layer-with-pulsing-dot', 'type': 'symbol', 'source': 'dot-point', 'layout': { 'icon-image': 'pulsing-dot' }  }); }
function removeBeacon() { map.removeLayer('layer-with-pulsing-dot');map.removeSource('dot-point');map.removeImage('pulsing-dot'); }

