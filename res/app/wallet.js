class Wallet { address = ""; deed = []; } class Deed { name = ""; id = ""; }
var user = new Wallet(); //var disconnect = false;
var gasPrice = ""; var itemPrice; var localAmount = 0;
var setup = async function () {
    if (window.ethereum) { //web3 = new Web3(window.ethereum); //await account();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); user.address = accounts[0];
        $("#myAdd").html(user.address.toLowerCase().substring(0,10) + "...");
        $.get("api/"+user.address, async function(data) {  $("#logger").removeClass("disabled");
            	var fields = data.split('|'); var ether = JSON.parse(fields[0]).result; var urler = fields[1]; var gas = fields[2];
							 var local = JSON.parse(fields[3]);
							 for (let i = 0; i <local.length; i++) { 
								 if (local[i].to == "0x8a83fbbacb82030ea17179c0403b04e7bce7ba10")
								 { localAmount += local[i].value; } } //timestamp?
							  $('#myDomain').hide().html(badge('ur',localAmount)).fadeIn('slow');
							 alert(ether);
			var ether = parseInt(ether) / 100000; alert(ether);
		$('#myETH').hide().html(badge('eth',ether.toString().substring(0, 4))).fadeIn('slow'); itemPrice = parseInt(ether) / 2;
		//$('#myGas').hide().html(badge('gas',gas)).fadeIn('slow'); 
							 gasPrice = gas; $("#trader").removeClass("disabled");
		if (urler > 0) { $("#trader").removeClass("disabled");  } $("#signer").html("<span>Disconnect</span>🚪"); $("#signer").removeClass("lighten-2"); $("#signer").addClass("darken-1");
							 document.getElementById("signer").onclick = desetup;
		$('#myURL').hide().html(badge('ur',urler)).fadeIn('slow'); 
            	//$("#wallet-area").removeClass("grey"); $("#wallet-area").addClass("green"); $("#wallet-icon").css("color","darkgreen");
		user.deed = []; for (let i=0;i<opens.length;i++) { pullAssets(user, opens[i].core.slug); } 
	} ).fail(function() {
    M.toast({html: 'No balances found.'});
		user.deed = []; for (let i=0;i<opens.length;i++) { pullAssets(user, opens[i].core.slug); } 
}); }
    	
    else { M.toast({html: 'No wallet found.'}); }  //$("#wallet-setup").click(setup);
};
function desetup() { user = ""; user = new Wallet();  $("#trader").addClass("disabled"); $("#logger").addClass("disabled");
	//$("#wallet-area").addClass("grey"); $("#wallet-area").removeClass("green"); $("#wallet-icon").css("color","darkslategrey");
	$("#myAdd").hide().html('My ETH Balance').fadeIn('slow');document.getElementById("signer").onclick = setup;
	$('#myETH').hide().html('My Wallet Address').fadeIn('slow'); 
	//$('#myGas').hide().html('').fadeIn('slow'); 
	$('#myURL').hide().html('My OCUR Balance').fadeIn('slow'); $("#signer").html("<span>Connect</span>🪙"); $("#signer").removeClass("darken-1"); $("#signer").addClass("lighten-2"); $('#myDomain').hide().html("My Notebook").fadeIn('slow');
		    
    	emptyDeeds(); domainSelect(); }

function listDeeds() {
    	$('#domain-template').empty(); $('#domain-template').append('<option selected="selected">Select domain...</option>');
	$('#domain-template').append('<option>' + user.address.toLowerCase().substring(0,16) + "..." + '</option>');
    	for (let i = 0; i < user.deed.length; i++) { 
	    	for (let j = 0; j < domains.length; j++) { 
			if (domains[j].core.token_id == user.deed[i].id) {  user.deed[i].name = domains[j].core.name; 
	$('#domain-template').append('<option selected="selected" value="' + j + '">' + user.deed[i].name + '</option>'); j = domains.length; }} }

	    	
	
    	document.getElementById('domain-template').getElementsByTagName('option')[0].selected = 'selected'; $("#domain-template").formSelect(); 
	//$('select').formSelect(); 
}

function emptyDeeds() { $('#domain-template').empty();
    	$('#domain-template').append('<option selected="selected">Select domain...</option>'); 
	$('#domain-template').append('<option>My Local Wallet</option>'); $("#domain-template").formSelect(); }

function domainSelect() { 
	var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
    	if (dt == 'Select domain...') { $("#builder").addClass("disabled"); 
					 $("#trader").addClass("disabled"); //$("#map-add").addClass("disabled");
		 }
    	else { builder(dv); }   }

function badge(area,amount) {
	switch(area) {
		case 'artifact': return '<span class="badge blue badge-stamp z-depth-1"><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> note&nbsp;&nbsp;<i class="material-icons" style="color:midnightblue;">article</i></span>';
		case 'ur': amount = amount.toString().substring(0,5) + "..."; return '<span class="badge amber badge-stamp z-depth-1"><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> OCUR</span>';
		case 'eth': return '<span class="badge green badge-stamp z-depth-1" ><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> ETH</span>';
		case 'gas': return '<span class="badge red badge-stamp z-depth-1" ><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> GWEI&nbsp;&nbsp;<i class="material-icons" style="color:darkred;">local_gas_station</i></span>';
		case 'deed': return '<span class="badge blue badge-stamp z-depth-1"><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> ETH&nbsp;&nbsp;<i class="material-icons" style="color:midnightblue;">sailing</i></span>';
		case 'wallet': return '<span class="badge brown badge-stamp z-depth-1"><span style="font-weight:bold;margin-right:4px;">' + amount + '</span>&nbsp;&nbsp;<i class="material-icons" style="color:beige;">account_balance_wallet</i></span>'; 
		case 'coord': return '<span class="badge yellow badge-stamp z-depth-1"><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> &nbsp;&nbsp;<i class="material-icons" style="color:darkyellow;">map</i></span>';} }


var showArtifactOpen = true; var myDomain = 0;
function builder(i) { $("#registry-artifact").html(""); var extra = ""; myDomain = i;
		    
		    $("#builder").removeClass("disabled");  //$("#trader").removeClass("disabled"); $("#map-add").removeClass("disabled");
		    
	if (artifacts.length == 0) { $("#registry-artifact").append("<a onclick='$(\"#domain-tabs\").tabs(\"select\", \"test4\");' class='collection-item'>No cards found.</a>");
				   
	      
	       }
		    
	      
	      $('#myArt').hide().html(badge('artifact',artifacts.length.toString())).fadeIn('slow');
		    
	for (let i = 0; i < artifacts.length; i++) { if(artifacts[i].checked == true) { extra = "checked='checked'"; } 
		if (showArtifactOpen) { $("#registry-artifact").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='showView(\"list\"); showList(\"domain\"); flyArt(" + i + ");'>" + artifacts[i].name + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><div style='display:flex;'><span style='color:aliceblue;' class='btn waves-effect waves-light blue lighten-4' onclick='artDoc(" + i + "); $(\"#user-pane\").sidenav(\"close\");'><i class='material-icons'>article</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex;align-items:center;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></div></a>"); } 
		else { $("#registry-artifact").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div><img style='cursor:pointer;' onclick='showView(\"list\"); showList(\"domain\"); flyArt(" + i + ");' class='z-depth-1' width='52' height='30' src='" + artifacts[i].image + "'/></div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='color:beige;' class='btn waves-effect waves-light blue lighten-4' onclick='artDoc(" + i + ");'><i class='material-icons'>article</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></a>"); }	}  }

function postDomain(profile) {
	var stamp = editMd.name + "|" + editMd.location + "|" + editMd.color + "|" + editMd.image + editMd.content;  //datetime?
	
	if (profile != true) {
	var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
	if (dt != 'No domain selected') { signer(stamp, dv); }
	else { alert('No domain selected'); } }
	else { signer(stamp, 'profile'); }}

var signer = async function (content, ref) { //add key to message...
    	var messager = '{"domain":{"name":"UR.Land"},"message":{"contents":"Hello, key value for UR.Land"},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"}],"Mail":[{"name":"contents","type":"string"}]}}';
    	var from = user.address; var params = [from, messager]; var method = 'eth_signTypedData_v4';
    	web3.currentProvider.sendAsync( { method, params, from, },
        	function (err, result) {console.log('TYPED SIGNED:' + JSON.stringify(result.result)); sender(messager, result.result, content, ref);});}

var sender = function (message, signature, content, ref) {
    	var formdata = new FormData(); formdata.append('message', message);formdata.append('signature', signature);formdata.append('content', content); 
    	$.ajax({ url: "data/"+user.address+"/"+ref, type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert(data); } }); }
    	
async function send() {
	
}

//signer('aslito.us','https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132040199892883210241','artifact', '62652367444291733483705976494538757758952482544655308357132040199892883210241');	

async function purchase() { 
	var totalGas = gasPrice * 10000000000;
	var transactionParameters = {
  		nonce: '0x00', // ignored by MetaMask
  		gasPrice: totalGas.toString(16), //'0x6B1A22F800', //'0x09184e72a000', //gasPrice.toString(16), // customizable by user during MetaMask confirmation.
		gas: '0x2710', // customizable by user during MetaMask confirmation.
		to: '0x8a83fbbacb82030ea17179c0403b04e7bce7ba10', // Required except during contract publications.
		from: user.address, // must match user's active address.
		value: itemPrice.toString(16), //'0x00', // Only required to send ether to the recipient from the initiating external account.
		data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
		chainId: '0x3', };
	var txHash = await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters], }); }

function strtodec(amount,dec){
stringf = "";
for(var i=0;i<dec;i++){
stringf = stringf+"0";
}
return amount+stringf;
}

async function trade() { var amount = $("#ocur-amount").val(); var newAmount = strtodec(amount,18);
	var transactionParameters = {
    		from: user.address,
    		to: "0xCcaB679860B1017589239BCeEEabe5CD45965aFc",
    		data: getDataFieldValue('0x8a83fbbacb82030ea17179c0403b04e7bce7ba10', newAmount), };

	var txHash = await ethereum.request({
    		method: 'eth_sendTransaction',
    		params: [transactionParameters], }); }

function getDataFieldValue(tokenRecipientAddress, tokenAmount) { const web3 = new Web3();
    	const TRANSFER_FUNCTION_ABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"};
    	return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [tokenRecipientAddress, tokenAmount ]); }

function getReceipt(item, quantity, price, current_rate, recepient_address_wallet_hash, UR_transfer_hash, datetime_tracking_hash) {
//return html formatted response... +image	
} 
