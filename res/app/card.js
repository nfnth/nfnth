
var column = 2; var width = 45; var counter = 0; var fullHTML = "";
function cardMap() { 
  if (window.innerWidth < 800) { column = 1; width = 80; } else { column = 2; width = 45; }
  fullHTML = ""; addSpace(); for (let i=0;i<domains.length;i++) { if (domains[i].checked) { if (counter == column) { addSpacer(); counter = 0; } else { addCard(i);  counter += 1; } } } addEnd(); $("#card-deck").html(fullHTML); }

function addSpace() { fullHTML += "<div class='top' style='display:flex;justify-content:space-evenly;'>"; }
function addSpacer() { fullHTML += "</div><div class='mid' style='display:flex;justify-content:space-evenly;'>"; }
function addEnd() {   fullHTML += "</div>"; }

function showCardIntro() {  return '<div class="card hoverable sticky-action" style="border-radius:8px;"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/office.jpg"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span><p><a href="#">This is a link</a></p></div><div class="card-action" style="    border-radius: 0px 0px 8px 8px;">...</div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>Intro card...</p></div></div>'; }

function showCard(i) {  return '<div class="card hoverable sticky-action" style="border-radius:8px;width:' + width.toString() + '%;"><div class="card-image waves-effect waves-block waves-light"><div class="center-cropped activator" style="width: 100%;border-radius: 8px 8px 0px 0px; background-image: url(\'' + domains[i].core.image_url + '\');"><img src="' + domains[i].core.image_url + '" style="width:24px;height:24px;" /></div></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + domains[i].core.name + '<i class="material-icons right">more_vert</i></span></div><div class="card-action" style="background-color: aliceblue;border-radius: 0px 0px 8px 8px;"><a class="waves-effect waves-light btn blue lighten-2" ><i class="material-icons">inventory_2</i></a><a class="waves-effect waves-light btn blue lighten-2" ><i class="material-icons">account_balance_wallet</i></a><a class="waves-effect waves-light btn blue lighten-4" ><i class="material-icons">send</i></a></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + domains[i].name + '<i class="material-icons right">close</i></span><p><a>' + domains[i].ref + '</a></p><p><a class="waves-effect waves-light btn green lighten-2" ><i class="material-icons">article</i></a><a class="waves-effect waves-light btn green lighten-2" ><i class="material-icons">map</i></a><a class="waves-effect waves-light btn green lighten-4" ><i class="material-icons">sailing</i></a></p></div></div>'; }

function showCardTask() { 
  return '<div class="card hoverable sticky-action" style="border-radius:8px;"><div class="card-content"><span class="card-title activator grey-text text-darken-4"><div class="row"><form class="col s12"><div class="row"><div class="input-field col s12"><textarea id="textarea1" class="materialize-textarea"></textarea><label for="textarea1">Textarea</label></div></div></form></div><i class="material-icons right">more_vert</i></span><p><a href="#">This is a link</a></p></div><div class="card-action" style="    border-radius: 0px 0px 8px 8px;">...</div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>Here is some more information about this product that is only revealed once clicked on.</p></div></div>'; }

function showCardEvent() {  return '<div class="card hoverable sticky-action" style="border-radius:8px;"><div class="card-content"><span class="card-title activator grey-text text-darken-4"><a id="adder" class="btn waves-effect waves-light green z-depth-1 lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="changeYear(false);" ><i class="material-icons">remove</i></a>&nbsp;&nbsp;&nbsp;<span id="yearly">2022</span>&nbsp;&nbsp;&nbsp;<a id="adder" class="btn waves-effect waves-light green z-depth-1 lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="changeYear(true);" ><i class="material-icons">add</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="adder" class="btn-flat waves-effect waves-light z-depth-1" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();" >JUL/7</a><br/><br/><div class="ccollapsible ccollapsed"><a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">JAN/1</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">FEB/2</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">MAR/3</a><br/><a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();"></a>&nbsp;&nbsp;APR/4</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">MAY/5</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">JUN/6</a><br/><a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">JUL/7</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">AUG/8</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">SEP/9</a><br/><a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">OCT/10</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">NOV/11</a>&nbsp;&nbsp;<a class="btn waves-effect waves-light z-depth-1 green lighten-2" style="border-radius: 8px;color:ghostwhite!important;" onclick="showMonth();">DEC/12</a></div><i class="material-icons right">more_vert</i></span><p><a href="#">DONE?</a></p></div><div class="card-action" style="    border-radius: 0px 0px 8px 8px;">...</div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>DATE? SPAN?</p></div></div>'; }


function addCard(i) {
  fullHTML += showCard(i);
  
}
function addCardIntro() { cardMap();
  //$("#card-deck").html($("#card-deck").html() + showCardIntro());
}
function addCardTask() {
    $("#card-deck").html($("#card-deck").html() + showCardTask());
}

function addCardEvent() { 
  $("#card-deck").html($("#card-deck").html() + showCardEvent());
}

function showMonth() {
  document.querySelector('.ccollapsible').classList.toggle('ccollapsed');
}

function storeData(area) {
 if (typeof(Storage) !== "undefined") {
  switch(area) {
    case 'card':
localStorage.setItem(area, $("#card-deck").html()); break;
  }
} else {
  // Sorry! No Web Storage support..
} 
}

function getData(area) {
   if (typeof(Storage) !== "undefined") {
      switch(area) {
        case 'card':
          $("#card-deck").html(localStorage.getItem(area)); break; }

} else {
  alert('no storage');
} 
}

function changeYear(direction) { var current = parseInt($("#yearly").html());
    if (direction) { current += 1; } else { current -= 1; }
                 $("#yearly").html(current.toString());
}
/*

- 0 +
 
Su M Tu W Th F Sa
| | |1|2|3|4|5|
|6|7|8|9|10|11|12|

  AM PM
1 2 3 4
5 6 7 8
9 10 11 12

00 15
30 45

DONE? ...
  
YEAR MONTH WEEK DAY HOUR MINUTE SEC -- ...*/
