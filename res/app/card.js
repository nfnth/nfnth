
var suit = ['heart','diamond','club','spade']; var num = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
class Card { suiter = 0; nummer = 0 }
class Deck { carder = [52]; } var myDeck = new Deck(); 

for (let a = 0; i < myDeck.carder.length; a++) { 
	for (let b = 0; b < suit.length; b++) {
		for (let c = 0; c < num.length; c++) { myDeck.carder[a] = new Card; myDeck.carder[a].suiter = b; myDek.carder[a].nummer = c; } } }

function shuffle(array) { let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];}
  return array;}

shuffle(myDeck);
var leftDeck, rightDeck; leftDeck = myDeck.slice(0,26); rightDeck = myDeck.slice(27);

function playHand() {
	if (num.indexOf(leftDeck.carder[0].nummer) > num.indexOf(leftDeck.carder[0].nummer)) { alert('war'); }
	else if (num.indexOf(leftDeck.carder[0].nummer) > num.indexOf(leftDeck.carder[0].nummer)) { leftDeck.push(rightDeck.shift()); }
	else { rightDeck.push(leftDeck.shift()); } }

var cardSwitch = false;

var cardCode = '<div class="flip-card cardy"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front" onclick="flipCard();" style="z-index:1;border-radius:12px;border:solid 1px YYYY!important;"><img src="res/img/seal3.png" style="position:absolute; width:48px;height:48px;" /><img  src="XXXX" style="position:absolute; width:36px;height:36px;opacity:0.90;margin-top:24px;margin-left:24px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 20px;font-weight: bold;"></span><img style="cursor:pointer;margin-top:2px;" id="tacta" width="16" height="16" /></div><div></div><div id="tact2" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;bottom: 4px;right: 4px;"><img style="cursor:pointer;margin-top:2px;" id="tactc" width="16" height="16" /><span id="tact3" style="font-size: 20px;font-weight: bold;"></span></div></div></div>';

var cardOwn = '<div class="flip-card cardy" onclick="flipQR(YYYY);"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front"  style="z-index:1;border-radius:12px;border:solid 1px gainsboro!important;"><img  src="XXXX" style="width:100%;height:100%;border-radius:8px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex;align-items: center;"><span id="tactx" style="display:flex; font-size: 24px;font-weight: bold;"></span></div><div id="tact2" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';

var cardGame = '<div class="flip-card cardy"><div id="myFlipZZZZ" class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front" onclick="flipCard(\'ZZZZ\');" style="z-index:1;border-radius:12px;border:solid 1px YYYY!important;"><img src="res/img/seal3.png" style="position:absolute; width:48px;height:48px;" /><img  src="XXXX" style="position:absolute; width:36px;height:36px;opacity:0.90;margin-top:24px;margin-left:24px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactbZZZZ" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1ZZZZ" style="font-size: 20px;font-weight: bold;"></span><img style="cursor:pointer;margin-top:2px;" id="tactaZZZZ" width="16" height="16" /></div><div></div><div id="tact2ZZZZ" style="opacity:0.75; display: flex; flex-direction:column; align-items: center;position: absolute;bottom: 4px;right: 4px;"><img style="cursor:pointer;margin-top:2px;" id="tactcZZZZ" width="16" height="16" /><span id="tact3ZZZZ" style="font-size: 20px;font-weight: bold;"></span></div></div></div>';

function flipCard() { var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1)); 
	$("#tacta").attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact1").html(num[myNum]);
		     $("#tactc").attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact3").html(num[myNum]);
		     if (mySuit > 1) { $("#tact1").css("color","black"); $("#tact3").css("color","black");  } else { $("#tact1").css("color","red"); $("#tact3").css("color","red"); } 
		      //$("#tact2").html($("#tactb").html());
		   // setTimeout(function() { 
			    $('.flip-card-inner').css("transform","rotateY(180deg)"); 
		     $("#tact3").css("transform","scale(-1, -1)"); $("#tactc").css("transform","scale(-1, -1)");
		     //-webkit-transform: rotateX(180deg); transform: rotateX(180deg);
		    //},1000);  
		    }

function flipCard(role) { var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1)); 
			 if (role == 'left') { mySuit = leftDeck.carder[0].suiter; myNum = leftDeck.carder[0].nummer; } else 
			 { mySuit = rightDeck.carder[0].suiter; myNum = rightDeck.carder[0].nummer; }
	$("#tacta"+role).attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact1"+role).html(num[myNum]);
		     $("#tactc"+role).attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact3"+role).html(num[myNum]);
		     if (mySuit > 1) { $("#tact1"+role).css("color","black"); $("#tact3"+role).css("color","black");  } else { $("#tact1"+role).css("color","red"); $("#tact3"+role).css("color","red"); } 
		      //$("#tact2").html($("#tactb").html());
		   // setTimeout(function() { 
			    $('#myFlip'+role).css("transform","rotateY(180deg)"); 
		     $("#tact3"+role).css("transform","scale(-1, -1)"); $("#tactc"+role).css("transform","scale(-1, -1)");
		     //-webkit-transform: rotateX(180deg); transform: rotateX(180deg);
		    //},1000);  
		    }

var qrSwitch = false;
function flipQR(i) { 
	if (qrSwitch) { $('.flip-card-inner').css("transform","none"); qrSwitch = false; } else {
	var options = {
		text: domains[i].owner.wallet,
		height: 90,
		width: 90,
		logo: 'res/img/seal3.png',
		logoWidth: 32,
		logoHeight: 32,
	};
	
	// Create QRCode Object
		$("#tactx").html("");
	new QRCode(document.getElementById("tactx"), options);
$('.flip-card-inner').css("transform","rotateY(180deg)"); qrSwitch = true; }
}

function makeCard(color) { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
                   return cardCode.replace('XXXX',leafSrc).replace('YYYY',color); }

function makeCardOwner(i) { var profileSrc = 'wallet/' + domains[i].owner.wallet + '/profile'; 
                   return cardOwn.replace('XXXX',profileSrc).replace('YYYY',i); }

function makeCardGame(color,role) { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
                   return cardGame.replace('XXXX',leafSrc).replace('YYYY',color).replaceAll('ZZZZ',role); }
