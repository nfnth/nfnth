
class Wallet { address = ""; deed = []; }
var user = new Wallet();

var setup = async function () {
    if (window.ethereum) { //web3 = new Web3(window.ethereum); //await account();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); user.address = accounts[0];
        $("#myAdd").html(walletAddress.toLowerCase().substring(0,16) + "...");
        $.get("api/"+user.address, async function(data) { 
            var fields = data.split('|'); var ether = JSON.parse(fields[0]).result; var urler = fields[1];
            $("#myETH").html(ether); $("#myURL").html(urler);
            $("#maker").removeClass("disabled"); 
            $("#wallet-area").removeClass("blue-grey"); $("#wallet-area").addClass("green"); $("#wallet-icon").css("color","white"); } ); 
    	for (let i=0;i<opens.length;i++) { pullAssets(user, opens[i].core.slug); } listDeeds();
    }
    else { M.toast({html: 'No wallet found.'}); } }; $("#wallet-setup").click(setup);

function desetup() { $("#wallet-area").addClass("blue-grey"); $("#wallet-area").removeClass("green"); $("#wallet-icon").css("color","black");
    $("#myAdd").html('My Wallet Address');  $("#myETH").html('My ETH Balance'); $("#myURL").html('My URL Balance');
    $("#maker").addClass("disabled"); 
    emptyDeeds(); domainSelect(); }

function listDeeds() {
    $('#domain-template').empty(); $('#domain-template').append('<option selected="selected">No domain selected</option>');
    for (let i = 0; i < user.deed.length; i++) { $('#domain-template').append('<option selected="selected">' + user.deed[i] + '</option>'); }
    document.getElementById('domain-template').getElementsByTagName('option')[0].selected = 'selected';
    $("#domain-template").formSelect(); $('select').formSelect(); }

function emptyDeeds() { $('#domain-template').empty();
    $('#domain-template').append('<option selected="selected">No domain selected</option>'); $('#domain-template').append('<option>tactician.us (demo)</option>'); $("#domain-template").formSelect(); }

function domainSelect() { var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
    if (dt == 'No domain selected') { $("#poster").addClass("disabled"); $("#trader").addClass("disabled"); }
    else { $("#poster").removeClass("disabled");  $("#trader").removeClass("disabled"); pullDomain(dv);  } }

function pullDomain(domain) { $.get('https://ur.land/domain/' + domain + '/deed', function(data) { 
	alert(data); }); }
   // $.get("path" , function(data) { docs = data.replaceAll('/root/nfnth/data/domain/'+domain+'/','').split('|doc'); ///root/nfnth/data/domain/dralun.com/doc|manifest|/root/nfnth/data/domain/dralun.com/doc/sample|artifact
    //var lines = data.split(/\r?\n/); //for (let i = 0; i < lines.length; i++) { // var fields = lines[i].split('|');

   // $.get("domain/" + domain + "/manifest", function(data) { domainJSON = JSON.parse(data); status = JSON.parse(data).status; });
      //manifest.push(fields);
	
var signer = async function (domain, content, action, ref) { //add key to message...
    var messager = '{"domain":{"name":"UR.Land"},"message":{"contents":"Hello, key value for UR.Land"},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"}],"Mail":[{"name":"contents","type":"string"}]}}';
    var from = user.address; var params = [from, messager]; var method = 'eth_signTypedData_v4';
    web3.currentProvider.sendAsync( { method, params, from, },
        function (err, result) {console.log('TYPED SIGNED:' + JSON.stringify(result.result));
            sender(messager, result.result, content, ref);});}

var sender = function (message, signature, content, ref) {
    var formdata = new FormData(); formdata.append('message', message);formdata.append('signature', signature);formdata.append('content', content); 
    $.ajax({ url: "data/"+user.address+"/"+ref, type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert(data); } }); }

//signer('aslito.us','https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132040199892883210241','artifact', '62652367444291733483705976494538757758952482544655308357132040199892883210241');	
