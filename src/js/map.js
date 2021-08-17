
<!--
"person=man/tribe/monster/animal" "place=land/town/exterior/interior" "thing=car/plane/ship/alien/abstract/plant" ... "
element=red(fire),orange(rock),yellow(city),green(forest),blue(water),purple(air/mountain),black(future),white(past)"
custom= tribes, french-indian war, international, state
 panel -->

function marker(name, link, place, image) {   
  var popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<div><div><img widht="48" height="48" src="https://github.com/nfnth/res/raw/main/thumb/'+image+'.jpg"/></div><div><h6>' + name + '</h6><a href="https://ur.land">Owner Info</a><br/><a href="https://'+ link + '">More info...</a><br/><a class="waves-effect waves-light btn modal-trigger" href="#modal1">Purchase</a></div></div>');
  var el = document.createElement('div'); el.id = 'marker'; //class per icon type...
		
  new mapboxgl.Marker(el).setLngLat(place).setPopup(popup).addTo(map); }
						       
var poly = "https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch";
$.getScript(poly, function() {  });

var map_js = "https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.js";
var map_css = "https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css";
var map_style = "//style: 'mapbox://styles/mapbox/dark-v10'"
var map_token = "pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ";
var map; var middle = [-98.5558020753026, 39.80981352007335, ];

$('<link>').appendTo('head').attr({ type: 'text/css', rel: 'stylesheet', href: map_css });
$.getScript(map_js, function() { mapboxgl.accessToken = map_token; map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/light-v10', center: middle,zoom: 6});		       
  $.get("src/manifest", function (data) { 
    var manifest = data.split(/\r?\n/); 
      for (let i = 0; i < manifest.length - 1; i++) { 
	var fields = manifest[i].split('|'); 
	$.get("https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/"+fields[10], function(data) { console.log(data); });
	$("#registry").append("<a href='#!' class='collection-item'>" + fields[0] + "</a>"); 
	var monument = [fields[4], fields[3]]; 
	marker(fields[1], fields[2], monument, fields[9]); }});  });

//map.on('load', function (event) { map.resize(); });

<title>Add an animated icon to the map</title>
<script>
    const map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v9' });
    const size = 200;

    const pulsingDot = { width: size, height: size, data: new Uint8Array(size * size * 4),
        onAdd: function () { const canvas = document.createElement('canvas'); canvas.width = this.width; canvas.height = this.height; this.context = canvas.getContext('2d'); },

        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc( this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2 );
            context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
            context.fill();

            context.beginPath();
            context.arc( this.width / 2, this.height / 2, radius, 0, Math.PI * 2 );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            this.data = context.getImageData( 0, 0, this.width, this.height).data;
            map.triggerRepaint();

            return true;
        }
    };

    map.on('load', () => {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
        map.addSource('dot-point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [ { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [0, 0] // icon position [lng, lat] } } ] } });
        map.addLayer({ 'id': 'layer-with-pulsing-dot', 'type': 'symbol', 'source': 'dot-point', 'layout': { 'icon-image': 'pulsing-dot' }  });  });
</script>

<title>Animate a marker</title>

    const marker = new mapboxgl.Marker({ color: '#F84C4C' });

    function animateMarker(timestamp) {
        const radius = 20;
        marker.setLngLat([  Math.cos(timestamp / 1000) * radius, Math.sin(timestamp / 1000) * radius ]);
        marker.addTo(map);
        requestAnimationFrame(animateMarker); }

    requestAnimationFrame(animateMarker);

<title>Attach a popup to a marker instance</title>

<style>
    #marker { background-image: url('https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg'); background-size: cover; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; }</style>

<div id="map"></div>

<script>

    var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/light-v10', center: monument, zoom: 15 });
    var popup = new AnimatedPopup({ offset: 25,openingAnimation: {duration: 1000, easing: 'easeOutElastic'},closingAnimation: { duration: 300, easing: 'easeInBack' } }).setText('Construction on the Washington Monument began in 1848.');

    var el = document.createElement('div'); el.id = 'marker'; new mapboxgl.Marker(el).setLngLat(monument).setPopup(popup).addTo(map);
