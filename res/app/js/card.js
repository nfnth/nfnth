
var suit = ['heart','diamond','club','spade']; var num = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']; class Card { suiter = 0; nummer = 0 } class Deck { carder = []; } var myDeck;

function makeDeck() { myDeck = new Deck(); for (let a = 0; a < suit.length; a++) {  for (let b = 0; b < num.length; b++) { var newCard = new Card(); newCard.suiter = a; newCard.nummer = b; myDeck.carder.push(newCard);  } }
		  shuffle(myDeck.carder);   leftDeck = new Deck(); rightDeck = new Deck(); leftDeck.carder = myDeck.carder.slice(0,26); rightDeck.carder = myDeck.carder.slice(27);  } 

makeDeck(); 
function shuffle(array) { let currentIndex = array.length,  randomIndex; while (currentIndex != 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];}
  return array;}

var leftDeck, rightDeck; 

function playHand() { var eAction = Math.floor(Math.random() * (2 - 1)); eAct = gactions[eAction]; 
	if (leftDeck.carder[0].nummer == rightDeck.carder[0].nummer) { alert('war'); }
	else if (leftDeck.carder[0].nummer > rightDeck.carder[0].nummer) { resolveConflict(true);
		leftDeck.carder.push(leftDeck.carder.shift()); leftDeck.carder.push(rightDeck.carder.shift()); }
	else {resolveConflict(false); rightDeck.carder.push(rightDeck.carder.shift()); rightDeck.carder.push(leftDeck.carder.shift()); } }

var cardSwitch = false;

var cardCode = '<div class="flip-card cardy"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front" onclick="flipCarder();" style="z-index:1;border-radius:12px;border:solid 1px YYYY!important;"><img src="XXXX" style="position:absolute; width:48px;height:48px;" /></div><div class="flip-card-back" onclick="ZZZZ" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 20px;font-weight: bold;"></span><img style="cursor:pointer;margin-top:2px;" id="tacta" width="16" height="16" /></div><div style="display:flex;"><img id="leafer" style="width:36px;height:36px;"></div><div id="tact2" style="opacity:0.95; display: flex; flex-direction:column; align-items: center;position: absolute;bottom: 4px;right: 4px;"><img style="cursor:pointer;margin-top:2px;" id="tactc" width="16" height="16" /><span id="tact3" style="font-size: 20px;font-weight: bold;"></span></div></div></div>';

var cardOwn = '<div class="flip-card cardy" onclick="flipQR(YYYY);"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front"  style="z-index:1;border-radius:12px;border:none!important;"><img  src="https://ocur.io/wallet/XXXX/profile" style="width:100%;height:100%;border-radius:8px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex;align-items: center;"><span id="tactx" style="display:flex; font-size: 24px;font-weight: bold;"></span></div><div id="tact2" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div></div>';

var cardArt = '<div class="flip-card cardy" onclick="flipArt(YYYY);"><div id="arter" class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front"  style="z-index:1;border-radius:12px;border:none!important;"><img  src="https://ocur.io/domain/XXXX/profile" style="width:100%;height:100%;border-radius:8px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex;align-items: center;"><span id="tactx" style="display:flex; font-size: 24px;font-weight: bold;"></span></div><div id="tact2" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div></div>';

var jokerCode = '<div class="flip-card cardy"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front" onclick="flipJoker();" style="z-index:1;border-radius:12px;border:solid 1px YYYY!important;"><img src="XXXX" style="position:absolute; width:48px;height:48px;" /></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 16px;font-weight: bold;"></span></div><div><img onclick="showDoc(\'PLANME\');" src="res/img/dralun/joker.png" style="width:70px;height:80px;cursor:pointer;"></div><div id="tact2" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;bottom: 4px;right: 4px;"><span id="tact3" style="font-size: 16px;font-weight: bold;"></span></div></div></div>';

function flipCarder(action) { 
	var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1)); var myLeaf = Math.floor(Math.random() * (10 - 1) + 1); 
	$("#tacta").attr("src","res/img/icon/card/" + suit[mySuit] + ".png");$("#tact1").html(num[myNum]); $("#leafer").attr("src","res/img/dralun/anim/leaf/"+myLeaf.toString()+".gif");
		     $("#tactc").attr("src","res/img/icon/card/" + suit[mySuit] + ".png");$("#tact3").html(num[myNum]);
		     if (mySuit > 1) { $("#tact1").css("color","black"); $("#tact3").css("color","black");  } else { $("#tact1").css("color","red"); $("#tact3").css("color","red"); } 
			    $('.flip-card-inner').css("transform","rotateY(180deg)"); 
		     $("#tact3").css("transform","scale(-1, -1)"); $("#tactc").css("transform","scale(-1, -1)");  }
		    
function flipJoker() { $("#tact1").html("🃏"); $("#tact3").html("🃏"); $("#tact1").css("color","green"); $("#tact3").css("color","blue");  $('.flip-card-inner').css("transform","rotateY(180deg)");  $("#tact3").css("transform","scale(-1, -1)");  }

var leftFlip = false; var rightFlip = false;
function flipCard(role) { if (leftFlip && rightFlip) { $('#myFlipleft').css("transform","none"); $('#myFlipright').css("transform","none");  playHand(); leftFlip = false; rightFlip = false; return true; }
	var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1)); 
			 if (role == 'left') { mySuit = leftDeck.carder[0].suiter; myNum = leftDeck.carder[0].nummer; } else  { mySuit = rightDeck.carder[0].suiter; myNum = rightDeck.carder[0].nummer; }
	$("#tacta"+role).attr("src","res/img/dralun/card/" + suit[mySuit] + ".png");$("#tact1"+role).html(num[myNum]);
		     $("#tactc"+role).attr("src","res/img/dralun/card/" + suit[mySuit] + ".png");$("#tact3"+role).html(num[myNum]);
		     if (mySuit > 1) { $("#tact1"+role).css("color","black"); $("#tact3"+role).css("color","black");  } else { $("#tact1"+role).css("color","red"); $("#tact3"+role).css("color","red"); } 
			    $('#myFlip'+role).css("transform","rotateY(180deg)");  $("#tact3"+role).css("transform","scale(-1, -1)"); $("#tactc"+role).css("transform","scale(-1, -1)");
	if (role == 'left') { leftFlip = true; } if (role == 'right') { rightFlip = true; }  }

var qrSwitch = false;
function flipQR(i) { //pullHolder(i); //make picture out of icon...
	if (qrSwitch) { $('.flip-card-inner').css("transform","none"); qrSwitch = false; } else { var options = { text: i, height: 90, width: 90, //logo: 'res/img/seal3.png', logoWidth: 32, logoHeight: 32,
	}; $("#tactx").html(""); new QRCode(document.getElementById("tactx"), options); $('.flip-card-inner').css("transform","rotateY(180deg)"); qrSwitch = true; } }

function makeQR(i) { pullHolder(i);  var options = { text: domains[i].owner.wallet, height: 90, width: 90, //logo: 'res/img/seal3.png', logoWidth: 32, logoHeight: 32,
	}; $("#docy").html(""); new QRCode(document.getElementById("docy"), options); }

function flipArt(i) { $("#tactx").html(domains[i].owner.price); $('#arter').css("transform","rotateY(180deg)");  }

function makeCard(color) { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/icon/leaf/leaf" + leaf.toString() + ".png";  return cardCode.replace('XXXX',leafSrc).replace('YYYY','whitesmoke'); }
                   
function makeCard(color,action) { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/icon/leaf/leaf" + leaf.toString() + ".png";  return cardCode.replace('XXXX',leafSrc).replace('YYYY','whitesmoke').replace('ZZZZ',action); }

function makeCardOwner(i) {  return cardOwn.replace('XXXX',i).replace('YYYY',i); }
function makeCardArt(i) { return cardArt.replace('XXXX',domains[i].desc).replace('YYYY',i); }
                   
 function makeJoker(color) { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/icon/leaf/leaf" + leaf.toString() + ".png";  return jokerCode.replace('XXXX',leafSrc).replace('YYYY',color); }


function showCards() { $("#carder").show(); $("#carder").addClass("scale-in"); }
function hideCards() { $("#carder").removeClass("scale-in");$("#carder").hide(); }
	
var slideCode = '<div id="flipXXX" class="block flip-card flip-card-inner" style="display:flex;align-items:center;cursor:pointer;"><div class="flip-card-fronty backer card-wrap" style="height:120px;width:100%;background-color:whitesmoke;color:black;opacity:0.75;transition:all 0.5s!important;"><span class="circleLight"></span><div class="text" style="display:flex; flex-direction:column;align-items:center;"><div style="display:flex;align-items:center;"><img src="res/img/seal3.png" style="width:48px; height:48px;" /><span style="margin-top:12px;margin-left:12px;color:indianred;font-weight:bold;font-size:16px;">UR.Land </span><span style="margin-top:12px;margin-left:24px;font-weight:bold;">dee.d/omain</span></div><p  id="card-nameXXXX" style="display:flex; align-items:center;">I`m cool card</p></div></div></div>';


var mouse = {X   : 0,Y   : 0,CX  : 0,CY  : 0 }, block = {X   : mouse.X,Y   : mouse.Y,CX  : mouse.CX,CY  : mouse.CY}, vmags = [ '', ''],fmags = [ '', ''],bmags = [ '', ''],imags = ['','','','',];
$('.block').on('mousemove', function(e) {mouse.X   = (e.pageX - $(this).offset().left) - $('.block').width() / 2;mouse.Y   = (e.pageY - $(this).offset().top) - $('.block').height() / 2;})
$('.block').on('mouseleave', function(e) {mouse.X   = mouse.CX;mouse.Y   = mouse.CY;})

var shiner = setInterval(function(){
	//if (stationary) { 
	block.CY   += (mouse.Y - block.CY) / 12;block.CX   += (mouse.X - block.CX) / 12;
  $('.block .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)')
  $('.block').css({
    transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'}) }, 20);

function shakeCard(i) { 
	var dCard = Math.floor(Math.random() * (domains.length-1+1)); 
	 imags[i] = domains[dCard].core.image_url; $("#card-name"+i).html(domains[dCard].core.name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div><img style='display:flex;border-radius:8px; cursor:pointer;' onclick='addOpenDeed(" + i + ");' class='z-depth-1' width='30' height='30' src='res/img/icon/key/" + getCollect(domains[dCard].core.collection.slug) + "'/></div>"); 
	 vmags[i] = domains[dCard].core.image_url; 
	fmags[i] = domains[dCard].core.permalink; $("#flip"+i).click(function(){ buildDoc(dCard); });
bmags[i] = getBack(domains[dCard].core.collection.slug);}

function setCards() { shakeCard(0); shakeCard(1); 
$('.slider .item').each(function(i){
  if(i == 0){$(this).addClass('active');$(this).next().addClass('next');$(this).prev().addClass('prev'); }
  $(this).attr('id', 'slide-'+i);
  $(this).prepend($('<div>', {class: 'blur', style: 'background-image: url(' + imags[i] + ');'}),$('<div>', {class: 'bg', style: 'background-image: url(' + imags[i] + ');'}))
  if (vmags[i] != null) $(this).find('.block').css('background-image', 'url(' + vmags[i] + ')'); else $(this).find('.block').css('background-image', 'url(' + imags[i] + ')'); }) }

function setCard(id) { $("#slide-"+id).html(slideCode.replace("XXXX",id).replace("XXX",id)); shakeCard(id);
$('.slider .item').each(function(i){ if (i == id) {
	$(this).attr('id', 'slide-'+i);
  $(this).prepend($('<div>', {class: 'blur', style: 'background-image: url(' + imags[i] + ');'}),$('<div>', {class: 'bg', style: 'background-image: url(' + imags[i] + ');'}))
  if (vmags[i] != null) $(this).find('.block').css('background-image', 'url(' + vmags[i] + ')'); else $(this).find('.block').css('background-image', 'url(' + imags[i] + ')'); } })}
var switcher = false;
function changeCard() { 
	//$("#card-vid").html('<source src="https://openseauserdata.com/files/83d939c2d34d81ec15b55d206284e7f2.mp4" type="video/mp4">');
	stationary = true; $('.flip-card-inner').css("transform",""); $('.flip-card-front').css("transform",""); $('.text').addClass("backer");
	$('.flip-card-inner').removeClass("card-background"); $(".card-wrap").css("margin-top","0px");
	setTimeout(function () {
		
		$('.block').on('mousemove', function(e) {mouse.X   = (e.pageX - $(this).offset().left) - $('.block').width() / 2;mouse.Y   = (e.pageY - $(this).offset().top) - $('.block').height() / 2;})
$('.block').on('mouseleave', function(e) {mouse.X   = mouse.CX;mouse.Y   = mouse.CY;})
	shiner = setInterval(function(){
	if (stationary) { 
	block.CY   += (mouse.Y - block.CY) / 12;block.CX   += (mouse.X - block.CX) / 12;
  $('.block .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)')
  $('.block').css({
    transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'}) } else { 
		$('.flip-card-inner').addClass("card-background"); $("#card-wrap").css("margin-top","64px");
		clearInterval(shiner); } }, 20); }, 1000);
		$('.slider .item').removeClass('active prev next');
	if (switcher) { var cSlide = $('.slider #slide-0'); switcher = false; 
      cSlide.addClass('active');cSlide.next().addClass('next');cSlide.prev().addClass('prev');  setTimeout(function() { setCard(1); }, 1000); } else { var cSlide = $('.slider #slide-1'); switcher = true; 
      cSlide.addClass('active');cSlide.next().addClass('next');cSlide.prev().addClass('prev');  setTimeout(function() { setCard(0); }, 1000); } }
