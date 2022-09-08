
var notes = [];
class Md { datetime = ""; location = ""; name = ""; color = ""; image = ""; content = "";  checked = false; file}
var domainMd = new Md(); var editMd = new Md();

var renderMd, renderMr, renderMt; // https://regexr.com
renderMd = function (text) {
    var mermaidEx = /\[!MERMAID\]\|([^|]*)/gi; matches = mermaidEx.exec(text); // text.match(mermaidEx);
    //var match = myRegexp.exec(myString); //console.log(match[1]); // abc
    if (matches != null) { temp_match = renderMr(matches[1]); text = text.replace(mermaidEx, temp_match); }
    //var mathEx = /\[!MATH\]\|(.*)\|/gi; text = text.replace(mathEx, renderMt('$1'));
    var imageEx = /\[!IMAGE\]\((.*),(.*),(.*)\)/gi; text = text.replace(imageEx, "<div style='text-align:center;'><img src='$1' height='$2' width='$3' /></div>");
    var headEx4 = /#### (.*)/gi; var headEx3 = /### (.*)/gi; var headEx2 = /## (.*)/gi; text = text.replace(headEx4, '<div><h6>$1</h6></div>'); text = text.replace(headEx3, '<div style="text-align:center;"><h5>$1</h5></div>'); text = text.replace(headEx2, '<div><h4>$1</h4></div>');
    var linkEx = /\[([^\]]+)\]\(([^\)]+)\)/gi; text = text.replace(linkEx, "<span style='cursor:pointer;color:blue;' onclick='openInNewTab(\"$2\");'>$1</span>");
    var boldEx = /\*\*([^\*]+)\*\*/gi; text = text.replace(boldEx, "<span style='font-weight:bold;'>$1</span>");
    var italicEx = /\*([^\*]+)\*/gi; text = text.replace(italicEx, "<span style='font-style:italic;'>$1</span>");
    var bulletStart = /\n\n(- .*)/gi; var bulletEx = /- (.*)/gi; var bulletEnd = /(- .*)\n\n/gi; text = text.replace(bulletStart, '<div><ul class="browser-default">$1'); text = text.replace(bulletEnd, '$1</ul></div>\n\n'); text = text.replace(bulletEx, '<li class="browser-default">$1</li>');
    var listStartEnd = /(1\. ((?!\n\n\n).)*)/gis; var listEx = /1\. (((?!\n\n).)*)/gis; text = text.replace(listStartEnd, '<div><ol>$1</ol></div>'); text = text.replace(listEx, '<li>$1</li>');
    var codeEx = /```\n([^`]+)```/gi; text = text.replace(codeEx, "<div class='coder'><code>$1</code></div>");
    var tableStart = /(\|(?:(?!\n\n)[\s\S])*)/;
    var tableRow = /\|(((?!\|\n)[\s\S])*)\|/gi;
    var tableCell = /\|([^\|\n]+)/gi; text = text.replace(tableStart, '<div><table><tr><td>$1</td></tr></table></div>').replaceAll("|", "</td><td>").replaceAll("<td>\n</td>","</tr><tr>").replaceAll("<td>-</td>","").replaceAll("<td></td>",""); text = text.replace(tableRow, '<tr>$1</tr>'); text = text.replace(tableCell, '<td>$1</td><td>$2</td>');
    var lineEx = /\n\n/gi; text = text.replace(lineEx, '<br/><br/>');
    var paragraphEx;
    
    
    
    //const string = "something format_abc"; //const regexp = /(?:^|\s)format_(.*?)(?:\s|$)/g; //const matches = string.matchAll(regexp); //for (const match of matches) { console.log(match); console.log(match.index) }
    
    var taskStart = /\n\n(X .*)/gi; var taskEx = /X (.*)/gi; var taskEnd = /(X .*)\n\n/gi; text = text.replace(taskStart, '<br/><div><p><label><input type="checkbox" class="filled-in" /><span>$1</span></label></p>'); text = text.replace(taskEnd, '<p><label><input type="checkbox" class="filled-in" /><span>$1</span></label></p></div><br/>'); text = text.replace(taskEx, '<p><label><input type="checkbox" class="filled-in" /><span>$1</span></label></p>');
    
    $('#dialog-inner2').find('li').addClass('browser-default'); $('#start').find('*').addClass('browser-default');

    return text;}

renderMr = function (text) { const code = text.trim().replace('|',''); // alert(code);
    let insert = function (code) { return code; }; return mermaid.render("preparedScheme", code, insert); }

renderMt = function (text) { MathJax.texReset();
    var output = document.getElementById('mather'); var options = MathJax.getMetricsFor(output); //options.display = display.checked;
    MathJax.tex2svgPromise(text.trim(), options).then(function (node) {
    $("#mather").html(node);
    MathJax.startup.document.clear(); MathJax.startup.document.updateDocument(); return $("#mather").html(); }); }

var meta = `//name=Max Hamish|image=default.png|icon=river1.png|location=56,-32|link=https://nfnth.com|description=`

var meta = `
//name=Max Hamish|image=default.png|icon=river1.png|location=56,-32|link=https://nfnth.com|description=
`
var profileBasic = `
## Welcome to my profile

- Start coding...
`
var profileListing = `
...advanced...
`
var profileListingPreview = `
## Your Name

- contact
- interests


|Item|Price|
|-|-|
|Car|1000|
|New Shirt|500|

`

var artifactRecipe = `
[!MATH]|
\begin{align}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{align}
|
`
var artifactSequence = `
[!MERMAID]|
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
|`
var artifactGraph = `
[!MERMAID]|
graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A
        od>Odd shape]-- Two line<br/>edge comment --> ro
        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
        di==>ro2(Rounded square shape)
    end

    %% Notice that no text in shape are added here instead that is appended further down
    e --> od3>Really long text with linebreak<br>in an Odd shape]

    %% Comments after double percent signs
    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

     classDef green fill:#9f6,stroke:#333,stroke-width:2px;
     classDef orange fill:#f96,stroke:#333,stro ke-width:4px;
     class sq,e green
     class di orange
|`;

var templateTask = `X buy milk
X get cereal
X make plan`;
  function setTemplate(content) {
      switch(content) {
          case "task": $("#pad").html($("#pad").html()+templateTask); break;
          case "Profile": $("#pad").html(profileBasic); break;
          case "Listing": $("#pad").html(profileListing); break;
          case "Recipe": $("#pad").html(artifactRecipe); break;
          case "Instruction": $("#pad").html(artifactRecipe); break;
          case "Sequence": $("#pad").html(artifactSequence); break;
          case "Graph": $("#pad").html(artifactGraph); break; }
     //changeFocus(); 
  
  }

function previewTemplate(content) {
    switch(content) {
          case "Profile": setDialog(renderMd(profileListingPreview)); break;
          case "Listing": setDialog(renderMd(profileListingPreview)); break;
          case "Recipe": setDialog(renderMd(profileListingPreview)); break;
          case "Instruction": setDialog(renderMd(profileListingPreview)); break;
          case "Sequence": setDialog(renderMd(profileListingPreview)); break;
          case "Graph": setDialog(renderMd(profileListingPreview)); break; }
}

var templates = ['Profile','Listing','Recipe','Instruction','Sequence','Graph'];
function fillTemplate() {
   for (let a = 0; a < templates.length; a++) {
       $("#registry-template").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='setTemplate(\"" + templates[a] + "\");'>" + templates[a] + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='color:ghostwhite' class='green btn waves-effect waves-light lighten-2' onclick='previewTemplate(\"" + templates[a] + "\");'><i class='material-icons'>description</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'></div></div></div></a>"); }
       
}

function fillNotes() {
    for (let a = 0; a < notes.length; a++) {
        $("#registry-note").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='flyMark(1);'>" + notes[a] + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='color:lightgreen' class='green btn waves-effect waves-light lighten-4' onclick='buildLand(1);'><i class='material-icons'>edit</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'><label style='display:flex;'><input type='checkbox' onclick='setList(1);' /><span></span></label></div></div></div></a>"); 
    }
}
function clearPad() {
    $("#pad").html("");
}

function showPreview() {
    setDialog(renderMd($("#pad").html()));
}
