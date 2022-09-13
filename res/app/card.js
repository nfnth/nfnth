
var suit = ['heart','diamond','club','spade']; var num = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var cardSwitch = false;

var cardCode = '<div class="flip-card cardy"><div class="flip-card-inner" style="cursor:pointer;"><div class="flip-card-front flip-card-frontx z-depth-2" onclick="flipCard();" style="z-index:1;"><img  src="XXXX" alt="Avatar" style="width:48px;height:48px;"></div><div class="flip-card-back flip-card-backx z-depth-2" ><div id="tactb" style="opacity:0.75; display: flex;align-items: center;position: absolute;top: 4px;left: 4px;"><span id="tact1" style="font-size: 24px;margin-right: 8px;font-weight: bold;"></span><img style="cursor:pointer;" id="tacta" width="24" height="24" src="res/img/card/heart.png"/></div><div id="tact2" class="rotate" style="opacity:0.75; display: flex;align-items: center;position: absolute;bottom: 4px;right: 4px;"></div></div></div>';


function flipCard() { var mySuit = Math.floor(Math.random() * (4 - 1 + 1)); var myNum = Math.floor(Math.random() * (13 - 1 + 1)); alert('flip');
	$("#tacta").attr("src","res/img/card/" + suit[mySuit] + ".png");$("#tact1").html(num[myNum]); 
		     if (mySuit > 1) { $("#tact1").css("color","black");  } else { $("#tact1").css("color","red");  } 
		     $('.flip-card-inner').css("transform","rotateY(180deg)"); $("#tact2").html($("#tactb").html()); }


function flipQR(i) { $("#tact1").html(domains[i].owner.wallet); }

function makeCard() { var leaf = Math.floor(Math.random() * (16 - 1 + 1)) + 1; var leafSrc = "res/img/leaf/leaf" + leaf.toString() + ".png"; 
                   return cardCode.replace('XXXX',leafSrc); }

function makeCardOwner(i) { var profileSrc = 'res/wallet/' + domains[i].owner.wallet + '/profile'; 
                   return cardCode.replace('XXXX',profileSrc); }
