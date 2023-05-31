
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
