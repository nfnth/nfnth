var complete; var reset = false; var first = true; 
var nfnth = false;
function showNfNth() { if (nfnth) {nfnth = false; $("#set-3").removeClass("quicker"); } else {nfnth = true; $("#set-3").addClass("quicker");} showList('open'); }
var loc = false;
function showLoc() { if (loc) {loc = false; $("#set-2").removeClass("quicker"); } else {loc = true; $("#set-2").addClass("quicker"); mapLoc();} }
var card = true;
function showCard() { if (card) {card = false; $("#set-4").removeClass("quicker"); } else {card = true; $("#set-4").addClass("quicker");} }

function showList(area) {  $("#registry").html(''); $("#registry").hide(); 
    switch (area) {
        case "domain": $("#registry-domain").html(''); openDomain();
		    sortSet = [area,domains,0,18,16]; for (let i=0;i<domains.length;i++) { if (domains[i].hide == false) addList(i); } 
		    $("#registry-domain").css("height",(height-16) + "px");
		    //adjustSort(true); 
		    break;
        case "filter":  sortSet = [area,domains,0,18,16]; domains = holder; for (let i=0;i<domains.length;i++) { 
		if (domains[i].hide == false) addList(i); } adjustSort(true); break;
        case "open": $("#registry-open").html(''); sortSet = [area,opens,0,18,16]; for (let i=0;i<opens.length;i++) { 
		if (opens[i].core.slug != "ocur" && opens[i].core.slug != "nfnth") { addOpen(i); } else { if (opens[i].core.slug == "URLand" && nfnth == true) { addOpen(i); } else if (opens[i].core.slug == "urland" && boxer.special == true) { addOpen(i); } else { opens[i].checked = false; } } } //adjustSort(false);  
		    $("#registry-open").css("height",(height-16) + "px"); 
		    showList('domain');
		    break; }
    //$("#registry").css("height",height + "px");
    $("#registry").show(); $('img').on('dragstart', function(evt) { return false; }); }

function openDomain() { var any = false;
	
	for (let i=0;i<domains.length;i++) { for (let j=0;j<opens.length;j++) { 
	if (domains[i].core.collection.slug == opens[j].core.slug) { if (opens[j].checked == false) { domains[i].hide = true; } else { domains[i].hide = false; any = true; } }
	  } } 
		      if (any) { 
			      $("#selLink").removeClass('disabled'); $("#dropdown-domainer").removeClass('disabled'); $("#switchLink").removeClass('disabled'); } else { $("#selLink").addClass('disabled'); $("#dropdown-domainer").addClass('disabled'); $("#switchLink").addClass('disabled'); $("#registry-domain").html(""); $("#registry-domain").append("<a onclick='$(\"#token-tabs\").tabs(\"select\", \"test1\");' class='collection-item'>No deed found.</a>"); }
			      
		      }
	
var showGrid = true; var gridSelect = false; 
function switchView() { if (showGrid) { showList('open'); $("#view-icon2").html("view_list"); //$("#view-name2").html("&nbsp;&nbsp;List"); 
				       showGrid = false; } else { showList('domain'); //$("#view-name2").html("&nbsp;&nbsp;Img"); 
								 $("#view-icon2").html("grid_view"); showGrid = true;} }

var showGridOpen = false; var selectOpen = true; var selectDomain = true; var showListOpen = true;
function switchOpen() { if (showGridOpen) { showGridOpen = false; showList('open'); $("#open-icon").html("grid_view");  } else { showGridOpen = true; showList('open'); $("#open-icon").html("view_list"); } }
	function switchDomain() { if (showListOpen) { showListOpen = false; showList('domain'); $("#domain-icon").html("📮");  } else { showListOpen = true; showList('domain');  $("#domain-icon").html("🏛️"); } }
function selOpen() { for (let i=0;i<opens.length;i++) { opens[i].checked = selectOpen; } showList('open');
	if (selectOpen) { selectOpen = false;   $("#open-sel-icon").html("deselect"); } else { selectOpen = true;  $("#open-sel-icon").html("select_all");} }

function buildCollect(slug) { clearMark(); for (let i=0;i<domains.length;i++) { if (domains[i].core.collection.slug == slug) { domains[i].checked = true; showMark(i); } else { domains[i].checked = false; } } }


function adjustSize(img) {
    if (img.height >= img.width) { adjustment = (img.height - img.width) / 48; shim = 'padding-right'; img.height = "48"; }
    else {adjustment = (img.width - img.height) / 48; shim = 'padding-top'; img.width = "48";}
    img.style.setProperty(shim,adjustment+'px'); img.style.setProperty('display','block');}
	
function selDomain() { for (let i=0;i<domains.length;i++) { if (domains[i].hide != true) { domains[i].checked = selectDomain; if (selectDomain) {onLand(i);} else { offLand(i);} } } showList('domain'); deedMap();
	if (selectDomain) { selectDomain = false;   $("#domain-sel-icon").html("deselect"); } else { selectDomain = true;  $("#domain-sel-icon").html("select_all");} }
		    
function setOpen(i) { if (opens[i].checked == true) { opens[i].checked = false; } else { opens[i].checked = true; } }
function setList(i) { if (domains[i].checked == true) { domains[i].checked = false; offLand(i); hideDomain(i); } else { domains[i].checked = true; onLand(i); showDomain(i); } }

function addOpen(i){ var extra = ""; if(opens[i].checked == true) { extra = "checked='checked'"; } 
	if (showGridOpen) {
    		$("#registry-open").append("<a class='collection-item open' style='padding-right:8px;'><div style='display:flex;justify-content:space-between;align-items:center;'><div><img style='display:flex; cursor:pointer;' onclick='addOpenDeed(" + i + ");' class='z-depth-1' width='30' height='30' src='res/img/key/" + getCollect(opens[i].core.slug) + "'/></div>&nbsp;&nbsp;<div style='display:flex;align-items:center;'><div style='display:flex;cursor:pointer;'><div onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");' style='cursor:pointer; font-size: 14px;margin-bottom:0px;' class='z-depth-1 chip collected hoverable'>" + opens[i].core.slug + "&nbsp;·&nbsp;<span style='font-weight:bold;font-size:13px;'>" + opens[i].count + "</span></div></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div><label><input type='checkbox' " + extra + " id='check" + i + "' onclick='setOpen(" + i + ");' /><span>&nbsp;</span></label></div></div></div></a>");  } else {
		$("#registry-open").append("<a class='collection-item open' style='padding-right:8px;'><div style='display:flex;justify-content:space-between;'><div onclick='addOpenDeed(" + i + ");' style='display:flex; justify-content:space-between;align-items:center;cursor:pointer;'>" + opens[i].core.name + "</div><div style='display:flex;align-items:center;'><div class='chip z-depth-1 hoverable collected' style='font-size:14px;cursor:pointer;margin-bottom:0px;' onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");'>" + opens[i].core.slug + "&nbsp;·&nbsp;<span style='font-weight:bold;font-size:13px;'>" + opens[i].count + "</span></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div><label><input type='checkbox' " + extra + " id='check" + i + "' onclick='setOpen(" + i + ");' /><span>&nbsp;</span></label></div></div></div></div></a>");  } }

//function checkOpenDeed(i) { document.getElementById("check"+i).click(); }
function addOpenDeed(i) { $("#somedialog2").css("z-index",1004);
    setDialog("<div style='text-align:center;'><p><span style='font-weight:16px'>" + opens[i].core.name + "</span>&nbsp;&nbsp; · &nbsp;&nbsp;<a style='cursor:pointer;' onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");'>" + opens[i].core.slug + "</a></p></div><br/><div style='text-align:center;'><img class='deed-image' style='width:80%;' src='" + opens[i].core.banner_image_url + "' /></div><br/><br/><div style='text-align:center;'><div style='display:flex;align-items:center;justify-content:center;'><img class='z-depth-2' onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");' style='cursor:pointer; margin-right:12px;display:none;' onload='adjustSize(this);' src='res/img/key/" + getCollect(opens[i].core.slug) + "' /><span class='red lighten-3 badge z-depth-1' style='color:black!important;font-weight:bold;'>" + opens[i].count + "</span></div><br/><br/>" + renderMd(opens[i].core.description) + "</div><br/><br/>"); $('.deed-image').fadeOut(0); setTimeout(function() { $('.deed-image').fadeIn(1000); }, 1000);

	
			//$('#deed-pane').sidenav('close');
			}
	
function addList(i){ var extra = ""; if(domains[i].checked == true) { extra = "checked='checked'"; } var filler = "";
	if (domains[i].item) { filler = "beige;' class='"; } else { filler = "ghostwhite;' class='"; }
	if (showListOpen) {
    		$("#registry-domain").append("<a class='collection-item' style='padding-right:8px;'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='buildDoc(" + i + ");'>" + domains[i].core.name + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><div style='display:flex;'><span id='l" + i + "' style='font-size: 18px;padding: 10px;display: flex;align-items: center;background-color:blanchedalmond!important; color:" + filler + " btn waves-effect waves-light disabled' onclick='mapAdd(); $(\"#deed-pane\").sidenav(\"close\");'>📦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex;align-items:center;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></div></a>"); } else {
		$("#registry-domain").append("<a class='collection-item' style='padding-right:8px;'><div style='display:flex;justify-content:space-between;align-items:center;'><div style='display:flex;'><img style='cursor:pointer;object-fit:cover;' onclick='buildDoc(" + i + ");' class='z-depth-1' width='52' height='30' src='" + domains[i].core.image_url + "'/></div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='font-size: 18px;padding: 10px;display: flex;align-items: center;background-color:blanchedalmond!important; color:" + filler + " btn waves-effect waves-light lighten-4 disabled' onclick='mapAdd();  $(\"#deed-pane\").sidenav(\"close\");'>✉️</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></a>"); } }
	
function buildLand(i) { if (domains[i].item == false) { onLand(i); } else { offLand(i); } }
function onLand(i) { domains[i].item = true; $("#l"+i).css('color','beige'); $("#l"+i).addClass('amber'); $("#l"+i).removeClass('grey');
	 $("#lm"+i).css('color','beige'); $("#lm"+i).addClass('amber'); $("#lm"+i).removeClass('grey'); }
function offLand(i) { domains[i].item = false; $("#l"+i).css('color','ghostwhite'); $("#l"+i).addClass('grey'); $("#l"+i).removeClass('amber');
	$("#lm"+i).css('color','ghostwhite'); $("#lm"+i).addClass('grey'); $("#lm"+i).removeClass('amber'); }

function buildDoc(i) { setDialog(addListDeed(i)); }
function addListDetail(i) { 
	var card = "";
	for (var a = 0; a < opens.length; a++) { if (opens[a].core.slug == domains[i].core.collection.slug) card = opens[a].core.banner_image_url; }
	
     	$("#domain-info").html('<div style="display:flex;justify-content:space-evenly;align-items:center;width:100%;padding-top:12px;"><div style="display: flex;flex-direction: column;text-align: left;align-items:center;width:100%;margin-top:12px;"><div style="display:flex; justify-content:center; width:80%;flex-direction:column;"><div style="cursor:pointer;align-items:center;display: flex;justify-content: center;">' + makeCardOwner(i) + '</div><div style="margin-left:24px; display:flex; flex-direction:column;justify-content:space-evenly;"><a id="trigger" class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="showOwner(' + i + ');">🗺️</a><a class="quickx hoverable z-depth-1 crisp waves-effect waves-light btn" onclick="setDialog(renderMd(\'' + domains[i].owner.content + '\'));">📄</a></div></div><div style="margin-top:24px; display:flex;justify-content:center;">' + domains[i].owner.name + '&nbsp;&nbsp · &nbsp;&nbsp<a onclick="openInNewTab(\'' + domains[i].core.external_link + '\');">' + domains[i].owner.icon + '</a></div><br/></div></div>');
$('#modal1').modal('open');
	
	//class Owner { wallet = ""; name = ""; icon = ""; front = ""; back = ""; coord = ""; content = ""; }
} 
	
function addListDeed(i) { var embedDisplay = "";
	//if (domains[i].core.animation_url != null) {  } else { 
		embedDisplay = "<img  style='width:80%;' src='" + domains[i].core.image_url + "' />"; // }
		//embedDisplay = '<video id="vid" style="width:80%;"  controls loop poster="' + domains[i].core.image_url + '"><source src="' + domains[i].core.animation_url + '" type="video/mp4"></video>';
//function change(a){ document.getElementById('vid').poster=a; document.getElementById('vid').src=a.replace('res/raw/','res/media/').replace('.jpg','.mp4'); }
		
	return "<div style='text-align:center;display:flex;justify-content:center;'><p style='display:flex;justify-content:center;align-items:center;'><a style='font-weight:16px;' onclick='openInNewTab(\"" + domains[i].core.external_link + "\");'>" + domains[i].core.name + "</a>&nbsp;&nbsp; · &nbsp;&nbsp;<img style='display:flex; cursor:pointer;' class='z-depth-1' width='30' height='30' src='res/img/key/" + getCollect(domains[i].core.collection.slug) + "'/><a>&nbsp;&nbsp;" + domains[i].core.collection.name + "</a></p></div><br/><div id='emDisp' style='text-align:center;'>" + embedDisplay + "</div></br><p>" + domains[i].desc + "</p><br/><a>Read more...</a><br/><p><img style='max-width:80%;max-height:600px;object-fit:cover;' src='" + domains[i].res + "' /></p>";   }
	
function addUserDeed(i) { var embedDisplay = "";
	embedDisplay = "<img  style='width:80%;' src='" + domainMd.image + "' />"; // }
		
	return "<div style='text-align:center;'><p><span style='font-weight:16px'><a onclick='openInNewTab(\"" + domainMd.link + "\");'>" + domainMd.name + "</a></p></div><br/><div id='emDisp' style='text-align:center;'>" + embedDisplay + "</div></br><p>" + domainMd.content + "</p><br/>";   }
	
function addArtDeed(i) { var embedDisplay = "";
	embedDisplay = "<img  style='width:80%;' src='" + artifacts[i].image + "' />"; // }
		
	return "<div style='text-align:center;'><p><span style='font-weight:16px'><a onclick='openInNewTab(\"" +artifacts[i].link + "\");'>" + artifacts[i].name + "</a></p></div><br/><div id='emDisp' style='text-align:center;'>" + embedDisplay + "</div></br><p>" + artifacts[i].content + "</p><br/>";   }

function getCollect(value) {
    switch(value) {
        case 'librar': return 'tan.png'; case 'patric': return 'orange.png'; case 'clini': return 'pink.png'; case 'sect': return 'green.png'; case 'technic': return 'white.png'; case 'utili': return 'gray.png'; case 'civilia': return 'blue.png'; case 'tact': return 'red.png'; case 'elect': return 'yellow.png'; case 'agrar': return 'brown.png'; case 'logicia': return 'purple.png'; case 'custo': return 'black.png';
        default: return 'blue_swords.png'; }}

function getColor(value) {
    switch(value) {
	case 'tact': return 1; case 'patric': return 2; case 'elect': return 3; case 'sect': return 4; case 'civilia': return 5; case 'logicia': return 6; case 'clini': return 7; case 'librar': return 8; case 'agrar': return 9; case 'technic': return 10; case 'utili': return 11; case 'custo': return 12;
        default: return 'blue_swords.png'; }}

function getFront(value) {
    switch(value) {
	case 'tact': return 'indianred'; case 'patric': return 'orange'; case 'elect': return 'yellow'; case 'sect': return 'green'; case 'civilia': return 'royalblue'; case 'logicia': return 'purple'; case 'clini': return 'pink'; case 'librar': return 'tan'; case 'agrar': return 'brown'; case 'technic': return 'white'; case 'utili': return 'gray'; case 'custo': return 'darkslategrey';
        default: return 'blue_swords.png'; }}

function getBack(value) {
    switch(value) {
	case 'tact': return 'darkred'; case 'patric': return 'darkorange'; case 'elect': return 'lightyellow'; case 'sect': return 'darkgreen'; case 'civilia': return 'darkblue'; case 'logicia': return 'magenta'; case 'clini': return 'darkpink'; case 'librar': return 'brown'; case 'agrar': return 'darkbrown'; case 'technic': return 'ghostwhite'; case 'utili': return 'darkgrey'; case 'custo': return 'black';
        default: return 'blue_swords.png'; }}

function openAZ(a, b) { if (a.core.name === b.core.name) {  return 0; } else { return (a.core.name < b.core.name) ? -1 : 1; } }
function openZA(a, b) { if (a.core.name === b.core.name) {  return 0; } else { return (a.core.name > b.core.name) ? -1 : 1; } }
function openaz(a, b) { if (getColor(a.core.slug) === getColor(b.core.slug)) {  return 0; } else { return (getColor(a.core.slug) < getColor(b.core.slug)) ? -1 : 1; } }
function openza(a, b) { if (getColor(a.core.slug) === getColor(b.core.slug)) {  return 0; } else { return (getColor(a.core.slug) > getColor(b.core.slug)) ? -1 : 1; } }
function open09(a, b) { if (a.count === b.count) {  return 0; } else { return (a.count < b.count) ? -1 : 1; } }
function open90(a, b) { if (a.count === b.count) {  return 0; } else { return (a.count > b.count) ? -1 : 1; } }

function domainAZ(a, b) { if (a.core.name === b.core.name) {  return 0; } else { return (a.core.name < b.core.name) ? -1 : 1; } }
function domainZA(a, b) { if (a.core.name === b.core.name) {  return 0; } else { return (a.core.name > b.core.name) ? -1 : 1; } }
function domainaz(a, b) { if (a.count === b.count) {  return 0; } else { return (a.count < b.count) ? -1 : 1; } }
function domainza(a, b) { if (a.count === b.count) {  return 0; } else { return (a.count > b.count) ? -1 : 1; } }
function domain09(a, b) { if (a.price === b.price) {  return 0; } else { return (a.price < b.price) ? -1 : 1; } }
function domain90(a, b) { if (a.price === b.price) {  return 0; } else { return (a.price > b.price) ? -1 : 1; } }
