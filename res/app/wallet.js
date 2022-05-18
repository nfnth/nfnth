// wallet
var walletAddress = '';
var setup = async function () {
    if (window.ethereum) { //web3 = new Web3(window.ethereum); //await account();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); walletAddress = accounts[0];
        $("#myAdd").html(walletAddress.toLowerCase().substring(0,16) + "...");
        $.get("api/"+walletAddress, async function(data) { 
            var fields = data.split('|'); var ether = JSON.parse(fields[0]).result; var urler = fields[1];
            $("#myETH").html(ether); $("#myURL").html(urler);
            $("#maker").removeClass("disabled"); 
            $("#wallet-area").removeClass("blue-grey"); $("#wallet-area").addClass("green"); $("#wallet-icon").css("color","white");
            pullAssets(walletAddress); } ); }
    else { M.toast({html: 'No wallet found.'}); } }; $("#wallet-setup").click(setup);

function desetup() { $("#wallet-area").addClass("blue-grey"); $("#wallet-area").removeClass("green"); $("#wallet-icon").css("color","black");
    $("#myAdd").html('My Wallet Address'); 
    $("#myETH").html('My ETH Balance'); $("#myURL").html('My URL Balance');
    $("#maker").addClass("disabled"); 
    emptyDeeds(); domainSelect(); }

var signer = async function (domain, content, action, ref) {
    var messager = '{"domain":{"name":"UR.Land"},"message":{"contents":"Hello, key value for UR.Land"},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"}],"Mail":[{"name":"contents","type":"string"}]}}';
    var from = walletAddress; var params = [from, messager]; var method = 'eth_signTypedData_v4';
    web3.currentProvider.sendAsync( { method, params, from, },
        function (err, result) {console.log('TYPED SIGNED:' + JSON.stringify(result.result));
            artifact(messager, result.result, content, ref, domain, action);});}

var artifact = function (message, signature, content, ref, domain, action) {
    var formdata = new FormData();
    formdata.append('message', message);formdata.append('signature', signature);formdata.append('content', content); formdata.append('ref', ref); 
    $.ajax({ url: "data/"+walletAddress+"/"+domain+"/"+action, type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert(data); } }); }

function sendArtifact() {
	signer('aslito.us','https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132040199892883210241','artifact', '62652367444291733483705976494538757758952482544655308357132040199892883210241');	
}
