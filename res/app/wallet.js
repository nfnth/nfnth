
class Wallet { address = ""; deed = []; } class Deed { name = ""; id = ""; }
var user = new Wallet(); //var disconnect = false;

var setup = async function () {
    if (window.ethereum) { //web3 = new Web3(window.ethereum); //await account();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); user.address = accounts[0];
        $("#myAdd").html(user.address.toLowerCase().substring(0,16) + "...");
        $.get("api/"+user.address, async function(data) { 
            	var fields = data.split('|'); var ether = JSON.parse(fields[0]).result; var urler = fields[1];
            	$("#myETH").html(ether); $("#myURL").html(urler);
            	$("#connector").css("color", "darkgreen"); $("#connector").html('<i class="material-icons left">logout</i>Disconnect'); 
		//disconnect = true; 
            	$("#wallet-area").removeClass("grey"); $("#wallet-area").addClass("green"); $("#wallet-icon").css("color","darkgreen"); } ); 
    	for (let i=0;i<opens.length;i++) { pullAssets(user, opens[i].core.slug); } }
    else { M.toast({html: 'No wallet found.'}); } }; $("#wallet-setup").click(setup);

function desetup() { user = ""; user = new Wallet(); 
	$("#wallet-area").addClass("grey"); $("#wallet-area").removeClass("green"); $("#wallet-icon").css("color","darkgrey");
    	$("#myAdd").html('My Wallet Address');  $("#myETH").html('My ETH Balance'); $("#myURL").html('My URL Balance');
    	$("#connector").css("color", ""); $("#connector").html('<i class="material-icons left">login</i>Connect'); 
		    //disconnect = false; 
    	emptyDeeds(); domainSelect(); }

function listDeeds() {
    	$('#domain-template').empty(); $('#domain-template').append('<option selected="selected">No domain selected</option>');
    	for (let i = 0; i < user.deed.length; i++) { 
	    	for (let j = 0; j < domains.length; j++) { 
			if (domains[j].core.token_id == user.deed[i].id) {  user.deed[i].name = domains[j].core.name; j = domains.length; } }
	    	$('#domain-template').append('<option selected="selected" value="' + user.deed[i].id + '">' + user.deed[i].name + '</option>'); }
	
    	document.getElementById('domain-template').getElementsByTagName('option')[0].selected = 'selected'; $("#domain-template").formSelect(); 
	//$('select').formSelect(); 
}

function emptyDeeds() { $('#domain-template').empty();
    	$('#domain-template').append('<option selected="selected">No domain selected</option>'); 
	$('#domain-template').append('<option>tactician.us (demo)</option>'); $("#domain-template").formSelect(); }

function domainSelect() { 
	var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
    	if (dt == 'No domain selected') { $("#poster").addClass("disabled"); $("#trader").addClass("disabled");$("#builder").addClass("disabled"); 
		$('#myDomain').hide().html("My Domain Balance").removeClass("badge").removeClass("amber").fadeIn('slow');
		$("#myArt").hide().html("My Domain Artifact").removeClass("badge").removeClass("blue").fadeIn('slow'); }
    	else { $("#poster").removeClass("disabled");  $("#trader").removeClass("disabled"); $("#builder").removeClass("disabled");
	      $('#myDomain').hide().html("24,901 UR").addClass("badge").addClass("amber").fadeIn('slow');
	      $('#myArt').hide().html("9 artifact").addClass("badge").addClass("blue").fadeIn('slow');
	        
	     
	     } pullDomain(dv);  }

function pullDomain(domain) { domainMd = ""; domainMd = new Md(); 
	$("#selink").removeClass("disabled"); $("#dropdown-deeder").removeClass("disabled"); $("#swilink").removeClass("disabled");
	$("#adder").removeClass("disabled"); $("#editer").removeClass("disabled"); $("#deleter").removeClass("disabled");
			     
	if (domain == "tactician.us") { 
		$.get('res/doc/tactic/tact', function(data) { 
			var lines = data.split(/\r?\n/); var fields = lines[0].split('|'); 
			domainMd.name = fields[0]; domainMd.location = fields[1]; domainMd.color = fields[2]; 
			domainMd.image = fields[3]; domainMd.content = fields[4];
			for (let i = 1; i < lines.length - 1; i++) { 
				temp = new Md(); fields = lines[i].split('|'); 
				temp.name = fields[0]; temp.location = fields[1]; temp.color = fields[2]; temp.image = fields[3]; temp.content = fields[4];
				artifacts.push(temp); }  
			buildDomain(); }); 
	} else if (domain == "void") {
		artifacts = [];
		$("#selink").addClass("disabled"); $("#dropdown-deeder").addClass("disabled"); $("#swilink").addClass("disabled");
		$("#adder").addClass("disabled"); $("#editer").addClass("disabled"); $("#deleter").addClass("disabled");
	} else {
		$.get('domain/' + domain + '/deed', function(data) { 
			var lines = data.split(/\r?\n/); var fields = lines[0].split('|'); 
			domainMd.name = fields[0]; domainMd.color = fields[1]; domainMd.datetime = fields[2]; domainMd.location = fields[3];
			for (let i = 1; i < lines.length; i++) { domainMd.content += lines[i]; }  
		if (domainMd.name != "") { $("#registry-artifact").html(); $("#registry-artifact").append("<a class='collection-item'>" + domainMd.name + "</a>"); }}); }  }

var showArtifactOpen = true;
function buildDomain() { $("#registry-artifact").html(""); var extra = ""; 
	if (artifacts.length == 0) { $("#registry-artifact").append("<a class='collection-item'>No deed selected.</a>"); }
	for (let i = 0; i < artifacts.length; i++) { if(artifacts[i].checked == true) { extra = "checked='checked'"; } 
		if (showArtifactOpen) { $("#registry-artifact").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='showView(\"list\"); showList(\"domain\"); flyArt(" + i + ");'>" + artifacts[i].name + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><div style='display:flex;'><span style='color:aliceblue;' class='btn waves-effect waves-light blue lighten-4' onclick='artDoc(" + i + "); $(\"#user-pane\").sidenav(\"close\");'><i class='material-icons'>article</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex;align-items:center;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></div></a>"); } 
		else { $("#registry-artifact").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div><img style='cursor:pointer;' onclick='showView(\"list\"); showList(\"domain\"); flyArt(" + i + ");' class='z-depth-1' width='52' height='30' src='" + artifacts[i].image + "'/></div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='color:beige;' class='btn waves-effect waves-light blue lighten-4' onclick='artDoc(" + i + ");'><i class='material-icons'>article</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></a>"); }	}  }

function postDomain() {
	var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
	if (dt != 'No domain selected') {
		var stamp = editMd.name + "|" + editMd.color + "|" + editMd.datetime + "|" + editMd.location + "\n";
		signer(stamp + editMd.content, dv); }
	else { alert('No domain selected'); } }

var signer = async function (content, ref) { //add key to message...
    	var messager = '{"domain":{"name":"UR.Land"},"message":{"contents":"Hello, key value for UR.Land"},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"}],"Mail":[{"name":"contents","type":"string"}]}}';
    	var from = user.address; var params = [from, messager]; var method = 'eth_signTypedData_v4';
    	web3.currentProvider.sendAsync( { method, params, from, },
        	function (err, result) {console.log('TYPED SIGNED:' + JSON.stringify(result.result)); sender(messager, result.result, content, ref);});}

var sender = function (message, signature, content, ref) {
    	var formdata = new FormData(); formdata.append('message', message);formdata.append('signature', signature);formdata.append('content', content); 
    	$.ajax({ url: "data/"+user.address+"/"+ref, type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert(data); } }); }

//signer('aslito.us','https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132040199892883210241','artifact', '62652367444291733483705976494538757758952482544655308357132040199892883210241');	
