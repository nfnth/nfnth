
//include, map/list 
//var list = document.getElementById('toolset');
var manifest;  
//dralun|abenaki.us|0x8a83fbbacb82030ea17179c0403b04e7bce7ba10|wikipedia.org/wiki/Abenaki|44.9196889888506, -69.4998783932573|

$.get("../manifest", function (data) { 
	manifest = data.split(/\r?\n/); 
	for (let i = 0; i < manifest.length - 1; i++) { 
		var fields = manifest[i].split('|'); 
		
		$.get("https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132039899726208827393/", function(data) { 
	
console.log(data); });
		//render map dialogs and list?
		//$("#registry").append("<a href='#!' class='collection-item'>" + fields[0] + "</a>"); 
	}
						       
		var monument = [fields[5], fields[4]]; //-98.5558020753026, 39.80981352007335, ];

var poly = "https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch";
$.getScript(poly, function() {  });
var map_js = "https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.js";
var map_css = "https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css";
var map_style = "//style: 'mapbox://styles/mapbox/dark-v10'"
var map_token = "pk.eyJ1IjoibmZudGgiLCJhIjoiY2tweW1rNXlsMGFpYzJwcGt1cHh6dmxzcyJ9.ZJaFrGpPDv5froWZMLXXYQ";

$('<link>').appendTo('head').attr({ type: 'text/css', rel: 'stylesheet', href: map_css });
$.getScript(map_js, function() { mapboxgl.accessToken = map_token; });

function marker() {   
		var popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<div><div><img widht="48" height="48" src="https://github.com/nfnth/res/raw/main/thumb/100058936.jpg"/></div><div><h6>' + fields[1] + '</h6><a href="https://ur.land">Owner Info</a><br/><a href="'+ fields[3] + '">More info...</a><br/><a class="waves-effect waves-light btn modal-trigger" href="#modal1">Purchase</a></div></div>');
		var el = document.createElement('div'); el.id = 'marker'; //class per icon type...
		var map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/light-v10', center: monument,zoom: 6});
		new mapboxgl.Marker(el).setLngLat(monument).setPopup(popup).addTo(map); 

}

//map.on('load', function (event) { map.resize(); });
