
var suit = ['heart','diamond','club','spade']; var num = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var cardSwitch = false;

var cardCode = '<div class="flip-card cardy"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front" onclick="flipCard();" style="z-index:1;border-radius:12px;"><img  src="XXXX" style="width:48px;height:48px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex;align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 24px;margin-right: 8px;font-weight: bold;"></span><img style="cursor:pointer;" id="tacta" width="24" height="24" /></div><div id="tact2" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';

var cardOwn = '<div class="flip-card cardy" onclick="flipQR(YYYY);"><div class="flip-card-inner z-depth-1" style="cursor:pointer;border-radius:12px;"><div class="flip-card-front"  style="z-index:1;border-radius:12px;"><img  src="XXXX" style="width:100%;height:100%;border-radius:8px;"></div><div class="flip-card-back" style="transform: rotateY(180deg);border-radius:12px;"><div id="tactb" style="opacity:0.75; display: flex;align-items: center;"><span id="tactx" style="font-size: 24px;font-weight: bold;"></span></div><div id="tact2" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';

function flipCard() { var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1)); 
	$("#tacta").attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact1").html(num[myNum]);
		     if (mySuit > 1) { $("#tact1").css("color","black");  } else { $("#tact1").css("color","red");  } 
		      $("#tact2").html($("#tactb").html());
		     $('.flip-card-inner').css("transform","rotateY(180deg)");  }
var qrSwitch = false;
function flipQR(i) { 
	if (qrSwitch) { $('.flip-card-inner').css("transform","none"); qrSwitch = false; } else {
	var options = {
		text: domains[i].owner.wallet,
		height: 110,
		width: 110,
		logo: 'res/img/seal3.png',
		logoWidth: 32,
		logoHeight: 32,
	};
	
	// Create QRCode Object
		$("#tactx").html("");
	new QRCode(document.getElementById("tactx"), options);
$('.flip-card-inner').css("transform","rotateY(180deg)"); qrSwitch = true; }
}

function makeCard() { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
                   return cardCode.replace('XXXX',leafSrc); }

function makeCardOwner(i) { var profileSrc = 'wallet/' + domains[i].owner.wallet + '/profile'; 
                   return cardOwn.replace('XXXX',profileSrc).replace('YYYY',i); }
