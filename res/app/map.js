class Box { mapStyle = ""; product = false; special = false; scale = false; }
var boxer = new Box();
function convertMark(coord) { 
	var raw = coord.replace('LngLat(','').replace(')','').replace(' ','').replace('[','').replace(']','');
	return [raw.substring(0, raw.indexOf(',')), raw.substring(raw.indexOf(',')+1, raw.length)];
}
function convertMarker(coord) { 
	var raw = coord.replace('LngLat(','').replace(')','').replace(' ','').replace('[','').replace(']','');
	return [raw.substring(raw.indexOf(',')+1, raw.length), raw.substring(0, raw.indexOf(','))];
}
function convertCoord(coord) { //66°32′56″N 152°50′41″W  Degrees + ((Minutes / 60) + (Seconds / 3600)) 40°41′34″N 73°59′25″W
	if (!(coord.includes('°'))) return convertMarker(coord);
	var raw = coord; var lat, long; var add, add2; var sub, sub2; var final, final2;
	if (raw.includes("N")) { lat = raw.substring(0, raw.indexOf('N')); add = lat.substring(lat.indexOf('°')+1, lat.indexOf('′')); add2 = lat.substring(lat.indexOf('′')+1, lat.indexOf('″')); lat = lat.substring(0, lat.indexOf('°')); }
	else { lat = raw.substring(0, raw.indexOf('S')); add = lat.substring(lat.indexOf('°')+1, lat.indexOf('′')); add2 = lat.substring(lat.indexOf('′')+1, lat.indexOf('″')); lat = lat.substring(0, lat.indexOf('°')); lat = "-" + lat; }

	if (raw.includes("E")) {  long = raw.substring(raw.indexOf(' ')+1, raw.indexOf('E')); sub = long.substring(long.indexOf('°')+1, long.indexOf('′')); sub2 = long.substring(long.indexOf('′')+1, long.indexOf('″')); long = long.substring(0, long.indexOf('°')); }
	else { long = raw.substring(raw.indexOf(' ')+1, raw.indexOf('W')); sub = long.substring(long.indexOf('°')+1, long.indexOf('′')); sub2 = long.substring(long.indexOf('′')+1, long.indexOf('″')); long = long.substring(0, long.indexOf('°')); long = "-" + long; }
	
	if (isNaN(long) || isNaN(sub) || isNaN(sub2)) { 
		if (isNaN(long)) { final = 0; } else { final = parseInt(long); } } else { final = parseInt(long) + (parseInt(sub)/60) + (parseInt(sub2)/3600); }
	if (isNaN(lat) || isNaN(add) || isNaN(add2)) { 
		if (isNaN(lat)) { final2 = 0; } else { final2 = parseInt(lat); } } else { final2 = parseInt(lat)  + (parseInt(add)/60) + (parseInt(add2)/3600); }
	
		     return [final, final2]; }
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

var newMarkCode = '<div class="scene"><div class="card"><div class="card__face card__face--front"><img src="https://i.loli.net/2019/11/23/cnKl1Ykd5rZCVwm.jpg" /></div><div class="card__face card__face--back"><img src="https://i.loli.net/2019/11/16/cqyJiYlRwnTeHmj.jpg" /></div></div></div>';

var markCode = '<div class="flip-card"  ><div class="flip-card-inner" style="cursor:pointer;"><div class="flip-card-frontx z-depth-2" onclick="flipCard();"><img src="XXXX" alt="Avatar" style="width:48px;height:48px;"></div><div class="flip-card-backx z-depth-2" ><div id="tactb" style="opacity:0.75; display: flex;align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 24px;margin-right: 8px;font-weight: bold;"></span><img style="cursor:pointer;" id="tacta" width="24" height="24" src="res/img/card/heart.png"/></div><div id="cardContent" style="cursor:pointer; color: dimgrey;font-size: 16px;font-weight: bold;font-family: \'Roboto\', sans-serif;" onclick="showDoc(\'tact/YYYY\');">📚 READ... 📚</div><div id="tact2" class="rotate" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';

var formCode = '<!-- heirarchy: #cuboid > form > div*4(cuboid faces) --><div id="cuboid"><form><!-- #1 hover button --><div><p class="cuboid-text">Subscribe</p></div><!-- #2 text input --><div><!-- Label to trigger #submit --><label for="submit" class="submit-icon"><i class="fa fa-chevron-right"></i></label><input type="text" id="email" class="cuboid-text" placeholder="Your Email" autocomplete="off"/><!-- hidden submit button --><input type="submit" id="submit" /></div><!-- #3 loading message --><div><p class="cuboid-text loader">Just a moment</p></div><!-- #4 success message --><div><!-- reset/retry button --><span class="reset-icon"><i class="fa fa-refresh"></i></span><p class="cuboid-text">Thankyou, we will be in touch</p></div></form></div>';
function showMark(coord, color, image, link, name, id, area) { clearLearn();
	var mark = coord;
	var marv = document.createElement('div'); marv.id = 'marker' + id; 
	var marp = new mapboxgl.Marker(marv).setLngLat(mark).addTo(map);
	var imager = ''; var filler = '';
	var symbol = name.replace(link.replace('https://',''),"").replace(" ","");
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
	var markup = '<div><div class="video-hold flip-card" style="display:flex; justify-content:center;" onclick="flipCard();"><div class="flip-card-inner" style="cursor:pointer;"><div class="flip-card-front z-depth-2" ><video style="width:100%; height:100%; object-fit:cover;" class="video-crop" id="vid' + id + '" autoplay muted loop preload playinline  style="cursor:pointer;" ' + imager + '><source src="' + image + '" type="video/mp4"></video></div><div class="flip-card-back z-depth-2" ><div id="o' + id + '" ></div></div></div></div></div><div style="margin-top:16px; font-size:16px;"><a onclick="openInNewTab(\'' + link + '\');">' + name + '</a><br/><br/>' + custom + '</div></div>';
	var markup = newMarkCode;

	marp.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(markup)); pullOwner(id);
	
	
	
	return marp; } //$('.materialboxed').materialbox(); 

function showTemp(i) { if (tempMark != "") { tempMark.remove(); } tempMark = showMark(convertCoord(domains[i].coord), getCollect(domains[i].core.collection.slug).replace('.png',''), domains[i].core.animation_url, domains[i].core.external_link, domains[i].core.name, i, 'domain');  }
function showDomain(i) { domains[i].map = showMark(convertCoord(domains[i].coord), getCollect(domains[i].core.collection.slug).replace('.png',''), domains[i].core.animation_url, domains[i].core.external_link, domains[i].core.name, i, 'domain');  }
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
function addArt() { showEdit(); tempMark.togglePopup(); resetArea(); editMd.location = coordinates.toString();
	$(".switch.shape").find("input[type=checkbox]").on("change",function() { var status = $(this).prop('checked'); setShape(status); });
		   coordinates.lat -= 6; map.flyTo({ center: coordinates, zoom: zoom, bearing: 0, speed: 0.8,  curve: 1,  easing: (t) => t, essential: true });
		  }
var listFlag = false;
function addArtifact() { listFlag = true; mapAdd(); }
function showEdit() { if (tempMark != "") { tempMark.remove(); tempMark = ""; }
	var marv = document.createElement('div'); marv.id = 'markery'; coordinates.lat += 6;
	tempMark = new mapboxgl.Marker(marv).setLngLat(coordinates).addTo(map);
    	$('#markery').addClass('markre'); $('#markerx').addClass('z-depth-3'); var style=$('#markery').attr('style');
    	style += ";background-color:goldenrod;border:solid 2px black;display: flex;align-items: center;justify-content: center;font-size: 18px;"; $('#markery').attr('style',style);
    	//style += ";background-image:url('img/icon/domain/"+folder + "/" +icon+".png'); 
		     
	
	tempMark.setPopup(new AnimatedPopup({ offset: 25, openingAnimation: {duration: 1000, easing: 'easeOutElastic'}, closingAnimation: { duration: 200, easing: 'easeInBack' } }).setHTML(formCode));
	
	
	//add '.ready' to form when user focuses on it
$("#email").focus(function(){
	$("#cuboid form").addClass("ready");
})
//remove '.ready' when user blus away but only if there is no content
$("#email").blur(function(){
	if($(this).val() == "")
		$("#cuboid form").removeClass("ready");
})

//If the user is typing something make the arrow green/.active
$("#email").keyup(function(){
	//this adds .active class only if the input has some text
	$(".submit-icon").toggleClass("active", $(this).val().length > 0);
})

//on form submit remove .ready and add .loading to the form
$("#cuboid form").submit(function(){
	$(this).removeClass("ready").addClass("loading");
	//finish loading in 3s
	setTimeout(complete, 3000);
	//prevent default form submisson
	return false;
})

//reset/refresh functionality
$(".reset-icon").click(function(){
	$("#cuboid form").removeClass("complete");
});
	
	//.setHTML(editContent));
	
	
		    // $('#markery').unbind('click');
		     //$("#markery").click(colorStart); 
		     }

//<div id="editColor" class="chip z-depth-1 waves-effect waves-light grey lighten-1" style="display:flex; color:white; align-items:center; justify-content:center; width:60px;" onclick="colorStart();"><div style="display:flex;"><i id="pal" class="material-icons">palette</i></div></div>
function complete()
{
	$("#cuboid form").removeClass("loading").addClass("complete");
}
var editContent = '<div class="editMark" style="width:100%; height:48px;display:flex;"><a style="display: flex;justify-content: center;width:26%;height: 100%;align-items: center;border-right:solid 1px dimgrey;"class="crisp waves-effect waves-light blue btn" onclick="setShape();"><i class="material-icons" id="shape-icon">circle</i></a><a style="border-left:solid 1px dimgrey;border-right:solid 1px green;left:-1px; display: flex;justify-content: center;width:26%;height: 100%;align-items: center;"class="crisp waves-effect waves-light blue btn" onclick="switchIcon();"><i class="material-icons">emoji_objects</i></a><a style="border-left:solid 1px dimgrey;border-right:solid 1px dimgrey;left:-1px;display: flex;justify-content: center;width:26%;height: 100%;align-items: center;"class="crisp waves-effect waves-light blue btn" onclick="colorStart(this);"><i class="material-icons">palette</i></a><a style="border-left:solid 1px dimgrey;display: flex;justify-content: center;width:25%;height: 100%;align-items: center;left:-1px;"class="crisp waves-effect waves-light blue btn" onclick="outlineStart(this);"><i class="material-icons">gradient</i></a></div><div id="header-logo" style="display: flex;justify-content: space-evenly;align-items: center; display: flex;"><div style="border-radius:12px; padding:12px;" class="z-depth-1"><img width="48" height="48" id="thumb" src="res/img/barrel.png" onclick="$(\'#preview\').trigger(\'click\');" /></div></div></div></div><div class="hiddenfile"><input name="upload" type="file" id="preview" onchange="setPreview();" multiple="multiple"/><div style="visibility:hidden;width:0;position:absolute;top:0;"><input type="color" oninput="setColor();" id="favcolor" name="favcolor" value="#ff0000" style="width:0px; height:0px;opacity:0;" /><input type="color" oninput="setOutline();" id="favcolor2" name="favcolor2" value="#ff0000" style="width:0px; height:0px;opacity:0;" /></div></div><div style="padding:12px; padding-bottom:0px; display:flex; justify-content:center;"><div style="margin-top:12px;margin-bottom:0px;" class="input-field col s4"><input id="edit-name" type="text" class="validate" onchange="setText();"><label for="edit-name">Entry Name</label></div></div><div style="display:flex;justify-content:space-evenly;margin-top:12px;margin-bottom:12px;align-items:center;"><a class="waves-effect waves-light btn-flat" onclick="resetArea();"><i class="material-icons">refresh</i></a><a class="waves-effect waves-green green btn" onclick="showView(\'editor\');"><i class="material-icons right">arrow_forward</i>Editor</a></div></div><div id="edit-stamp" style="margin:12px;"></div>';

var isSquare = true;
function setShape() { if (isSquare) { $("#markery").css("border-radius","50%"); $("#shape-icon").html("square"); isSquare = false; } else { $("#markery").css("border-radius",""); $("#shape-icon").html("circle"); isSquare = true; } }

function switchTime() {
    	var current = new Date(); // timestamp, milliseconds since 1970 (?) vs. milliseconds (UTC)
    	var yyyy = current.getFullYear(), MM = current.getMonth() + 1; if (MM < 10) { MM = "0" + MM.toString(); }
    	var dd = current.getDate(), hh = current.getHours(), mm = current.getMinutes(), ss = current.getSeconds();
    	var datestamp = yyyy + "." + MM + "." + dd; var timestamp = hh + ":" + mm + ":" + ss; // calendar?
	$("#edit-stamp").html(datestamp + "@" + timestamp); }

function switchIcon() { var temp = Array.from($("#edit-name").val()); $("#markery").html(temp[temp.length-1]); }
function resetArea() { $('.mapboxgl-popup-content').css('padding', '0');
	switchTime(); $("#edit-name").val("My Entry 🏳"); 
	switchIcon();
	//var length = $("#edit-name").val().length;
	//var symbol = $("#edit-name").val().substring(length-1,length);
	
	
}

function setText() {
	
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
	if (gpsSwitch) { clearMap(); gpsSwitch = false; $("#map-loc").addClass("grey"); $("#map-loc").removeClass("green"); } 
	else { if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(geoSuccess, geoError); } else { alert("Geolocation is not supported by this browser.");} } }
function geoSuccess(position) {tempCoord[1] = position.coords.latitude;tempCoord[0] = position.coords.longitude; gpsSwitch = true; $("#map-loc").addClass("blue"); $("#map-loc").removeClass("grey"); setZoom = 8; fly(tempCoord); addBeacon(tempCoord); beacon = true; } 
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
