
var User = { //constructor(token) { this.token = token; }
  wallet: '', domain: [] }
var wallet; var message;
if (typeof window.ethereum !== 'undefined') {console.log('MetaMask is installed!'); }
async function signer() { const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); const account = accounts[0]; alert(account); }

function makeMessage() { message = "current date/time"; }
function checkSignature (event) {
  event.preventDefault();

  const msgParams = JSON.stringify({
    domain: { chainId: 1, // Defining the chain aka Rinkeby testnet or Ethereum Main Net
    name: 'UR.Land', verifyingContract: '0x8a83fbbacb82030ea17179c0403b04e7bce7ba10', version: '1', },
    message: { contents: 'Hello, Bob!', serverKey: '' } }); //dynamic message

  var from = web3.eth.accounts[0];
  var params = [from, msgParams];
  var method = 'eth_signTypedData_v4';

  web3.currentProvider.sendAsync( { method, params, from, },
    function (err, result) {
      if (err) return console.dir(err);
      if (result.error) { alert(result.error.message); }
      if (result.error) return console.error('ERROR', result);
      console.log('TYPED SIGNED:' + JSON.stringify(result.result));
      const recovered = sigUtil.recoverTypedSignature_v4({ data: JSON.parse(msgParams), sig: result.result, });
      if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) { alert('Successfully recovered signer as ' + from); 
                                                                                     //send dynamic message and signature to server to process...
                                                                                    } 
   else {alert('Failed to verify signer when comparing ' + result + ' to ' + from); } });});

function uploadArtifact() {
  var data = new FormData();
  //var logoImg = $('input[name="logoImg"]').get(0).files[0];
 //formData.append('file', logoImg);
 //formData.append('id', id);
 //formData.append('name', userName);
  if($("#default_file").prop('files').length > 0) { file = $("#default_file").prop('files')[0]; formdata.append("file1", file); }
  $.ajax({ url: site + "/upload", type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert('uploaded'); } }); 
}

async function shareArtifact() { let hash = await genEncryptionKey($("#user-password").val()); }
async function genEncryptionKey (password) { 
  var algo = {name: 'PBKDF2',hash: 'SHA-256',salt: new TextEncoder().encode('a-different-salt-string'),iterations: 1000}, derived = { name: 'AES-GCM', length: 256 }, encoded = new TextEncoder().encode(password), key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
  var temp = await crypto.subtle.deriveKey(algo, key, derived, true, ['encrypt', 'decrypt']);
  var exports = await crypto.subtle.exportKey('jwk', temp);
  return JSON.stringify(exports); } 

var joker = ["red","black","white"];
var cardDescription = ["spades","hearts","diamonds","clubs"];
var altDescription = ["swords","cups","pentacles","wands"];
var jackDescription = ["Valet","Bube","Unter","Page","Fante"];
var queenDescription = ["Dame","Konigin","Regina"];
var knightDescription = ["Chevalier","Ober","Ritter","Cavall","Cavliere"];
var kingDescription = ["Roi","Konig","Re"];

function createNft() {
  
}

//	const transactionParameters = {
  //nonce: '0x00', // ignored by MetaMask
  //gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  //gas: '0x2710', // customizable by user during MetaMask confirmation.
  //to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  //from: ethereum.selectedAddress, // must match user's active address.
  //value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  //data:
  //  '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
 // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//};

//const txHash = await ethereum.request({
//  method: 'eth_sendTransaction',
//  params: [transactionParameters],
//});
