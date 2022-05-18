
#!/usr/bin/env python
import os, socket, json, types, six
from datetime import datetime

SMTP_RELAY = "relay.dynu.com" #switch to dralun.me
SMTP_LOGIN = "relay@relay.servius.me"
SMTP_PASSWORD = ""
SMTP_EMAIL = "serv@servius.me"

NAME = socket.getfqdn()
IP = socket.gethostbyname(NAME)
DATA = os.pardir + "/data/"
PATH = os.path.abspath(os.path.dirname(__file__))
REL = os.getcwd()

# data
import base64

def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

#json_file = open('data.json', mode='r') #include object map...?
#data_template = json_file.read()
#json_file.close()
#data_store = json2obj(data_template) 

async def data(request): #add mail support
    data = await request.post() #request.json()
    user_client = json2obj(data["user"])
    domain = user_client["domain"]

    cmd = "git --version" #validate...
    returned_value = os.system(cmd)
    if returned_value == "success": #validate message
        if action == "publish":
            path = os.path.dirname(REL) + '/data/' + domain + '/' + address
            if not os.path.exists(path):
                os.mkdir(path)
            
            with open(path + '/doc', 'wb') as f:
                f.write(data["doc"])

            filename = data['upload'].filename
            input_file = data['upload'].file
            content = input_file.read() #check file sizes?
            with open(os.path.join(path, filename), 'wb') as f:
                f.write(content)
            
            user_clien["result"] = "published"
        elif action == "pay":
            #validate funds available...
            destination = user_client["destination"]
            cmd = "git --version" #submit funds to destination
            user_clien["result"] = os.system(cmd)
    else:
        user_clien["result"] = "invalid"

    return web.Response(text=obj2josn(user_client), content_type='text/html')

# search
import glob, re, whois
from random import randrange

word_path = PATH + '/res/dictionary.txt'
with open (word_path, 'r') as f:
    content = f.read()

words = re.findall("(\n[A-Z]+[0-9 -]*\n)",content)
defs = re.findall("\n[A-Z]+[0-9 -]*\n([\s\S]*?)(?=(\n[A-Z]+[0-9 -]*\n))",content)
NUM_WORDS = 116623 #len(defs) print (len(words)) print (len(defs))
english = dict()

i = 0
while i < len(defs)-1:
    if not words[i].replace('\n', '') in english:
        english[words[i].replace('\n', '')] = defs[i][0] #remove dash?
    else:
        english[words[i].replace('\n', '')] = english[words[i].replace('\n', '')] + defs[i][0] 
    i += 1

async def search(request):
    name = request.match_info.get('name', 'word')
    lookup = await request.text()

    if name == "word":
        if not lookup == "":
            value = english[lookup.upper()]
            if not value is None:
                return web.Response(text=str(value), content_type='text/html')
        else:
            random_num = randrange(NUM_WORDS-1)
            random_word = list(english.keys())[random_num]
            random_def = list(english.values())[random_num].replace('\n', '')
            return web.Response(text=random_word + " : " + random_def, content_type='text/html')
    elif name == "color": #image?
        color = lambda: random.randint(0,255)
        return web.Response(text=random_word + " : " + random_def, content_type='text/html')
    elif name == "domain": #landlord/tenant with balances...
        return web.Response(text=await stat("public", lookup), content_type='text/html')
    elif name == "hex": #conversion both ways
        return web.Response(text=await stat("public", lookup), content_type='text/html')
    elif name == "whois":#w = whois.whois('pythonforbeginners.com’)
        return web.Response(text=await stat("public", lookup), content_type='text/html')
    elif name == "ip":
        #datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        return web.Response(text=request.remote, content_type='text/html')

# mail 
##(client)
import smtplib, base64, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def sendMail(to, subject, template, parameters):
    context = ssl.create_default_context()

    with smtplib.SMTP(SMTP_RELAY, 587) as server:
        server.starttls(context=context)
        server.login(SMTP_LOGIN, SMTP_PASSWORD)
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = SMTP_EMAIL
        message["To"] = to
        message_template = HEADER + template + FOOTER
        for parameter in parameters:
            message_template = message_template.replace('####', parameter)
        part1 = MIMEText(message_template, "plain")
        part2 = MIMEText(message_template, "html")
        message.attach(part1)
        message.attach(part2)
        server.send_message(message)

##(server)
import threading, email, uuid
from aiosmtpd.controller import Controller

class MailHandler():
    async def handle_RCPT(self, server, session, envelope, address, rcpt_options):
        if not address.endswith('@servius.me'): #use variable...
            return '550 not relaying to that domain'
        envelope.rcpt_tos.append(address)
        return '250 OK'

    async def handle_DATA(self, server, session, envelope): #check len(data) just in case...
        # filter project@user.servius.me
        #print('Message from %s' % envelope.mail_from)
        #print('Message for %s' % envelope.rcpt_tos)
        #print('Message data:\n')
        #message = email.message_from_string(envelope.content.decode('utf8', errors='replace'))
        mail_id = str(uuid.uuid4())

        if os.path.exists(REL + '/data/mail/' + str(envelope.rcpt_tos)):
            with open(REL + '/data/mail/' + str(envelope.rcpt_tos) + '/' + mail_id, 'w') as f:
                f.write(envelope.content.decode('utf8', errors='replace'))

        return '250 Message accepted for delivery'

def handleAttachment():
    counter = 1
    for part in msg.walk():
        if part.get_content_maintype() == 'multipart': # multipart/* are just containers
            continue
        filename = part.get_filename() # Applications should really sanitize the given filename so that an email message can't be used to overwrite important files
        if not filename:
            ext = mimetypes.guess_extension(part.get_content_type())
            if not ext:
                ext = '.bin'
            filename = 'part-%03d%s' % (counter, ext)
        counter += 1
        fp = open(os.path.join(opts.directory, filename), 'wb')
        fp.write(part.get_payload(decode=True))
        fp.close()

async def mail(port):
    controller = Controller(MailHandler(), hostname='localhost', port=5000+port)
    controller.start()

import uuid
import random
import requests
import json

file_in = "/root/nfnth/in"
file_out = "/root/nfnth/out"
#string_to_add = '|' + str(uuid.uuid4())

#with open(file_name, 'r') as f:
#    file_lines = [''.join([x.strip(), '|' + str(uuid.uuid4()), '\n']) for x in f.readlines()]
#    file_lines = [''.join([x.strip(), '|' + str(random.randrange(11111, 999999, 1)) + ', ' + str(random.randrange(1111, 4111, 1) / 100), '\n']) for x in f.readlines()]

with open(file_in, "rt") as fin:
    with open(file_out, "wt") as fout:
        for line in fin:
            if (line.count("|") == 1):
                fout.write(line.strip() + str(uuid.uuid4()) + "|" + str(random.randrange(11111, 999999, 1)) + ', ' + str(random.randrange(1111, 4111, 1) / 100) + '\n')
            else:
                fout.write(line)

#with open(file_name, 'w') as f:
#    f.writelines(str(uuid.uuid4()) + "|" + str(random.randrange(11111, 999999, 1)) + ', ' + str(random.randrange(1111, 4111, 1) / 100))

#"gypsum" J(Py)SON
#with open(PATH + '/res/data/wallet.json', mode='r') as wallet_file:
#    wallet_template = wallet_file.read()
def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

#user = await request.post()
#key = user['key']

It can be opened with OpenCV like this:

capture = cv2.VideoCapture('rtsp://192.168.1.64/1')
Most of the IP cameras have a username and password to access the video. In such case, the credentials have to be provided in the streaming URL as follows:

capture = cv2.VideoCapture('rtsp://username:password@192.168.1.64/1')

https://python.plainenglish.io/capture-and-process-video-footage-from-a-webcam-using-opencv-python-9e3c5585da0c

Before we start, a few definitions that I will use throughout this post:

coroutine: A running asynchronous function. So if you define a function as async def f(): ... and call it as f(), you get back a coroutine in the sense that the term is used throughout this post.
awaitable: anything that works with await: coroutines, asyncio.Futures, asyncio.Tasks, objects that have a __await__ method.
I will be using two async functions f and g for my examples. It’s not important what they do, only that they are defined as async def f(): ... and async def g(): ... and that they terminate eventually.
await
The simplest case is to await your coroutines:

result_f = await f()
result_g = await g()

done, pending = await asyncio.wait([task_f, task_g])

for t in done:
    try:
        if t is task_f:
            print(f"The result of f() is { await task_f }.")
    except Exception as e:
        print(f"f() failed with { repr(e) }.")

# ...and same for g()
            
import random
if random.randint(0,1) == 0:

#exec ntpd -qg & #hwclock --systohc
#exec nohup xterm -geometry 800x600+0+0 -e 'chromium "http://localhost:4444" --no-sandbox' > /dev/null 2>&1 & disown &
#exec nohup python /root/dralun/site/run.py > /dev/null 2>&1 & disown &

#exec nohup chromium "http://localhost:5001" --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > /dev/null 2>&1 & disown & #use chrome://flags
#exec nohup firefox -url "https://boxb.in" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11 &
#exec startlxde

prep() {
    tar -C /root -czf deployment.tar.gz nfnth
    sshpass -p ${server_password} scp deployment.tar.gz root@${server_ip}:/root #-r for folder
    sshpass -p ${server_password} scp $0 root@${server_ip}:/root
    #sshpass -p ${data_password} scp deployment.tar.gz root@${data_ip}:/root #-r for folder
    #sshpass -p ${data_password} scp $0 root@${data_ip}:/root
    rm deployment.tar.gz
    #ssh-agent bash -c 'ssh-add /somewhere/yourkey; /root/build.sh server' tar -xzvf archive.tar.gz
}

run() {
    rm -r /root/nfnth
    tar -xzf deployment.tar.gz
}

site() {
    wget -O "test.js" "https://polyfill.io/v3/polyfill.min.js?features=es6" "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.js" "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" "https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/2.5.1/mapbox-gl.js" "https://cdn.jsdelivr.net/npm/mapbox-gl-animated-popup@latest/dist/mapbox-gl-animated-popup.min.js" "https://unpkg.com/html5-qrcode" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/pbkdf2.js" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js" #three.js? ext.js?
    wget -O "test.css" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css" #materialize.min.css mapbox-gl.css ext.css?
}

#if [[ "$1" == "deploy" ]]
#then
#    prep
#    sshpass -p ${server_password} ssh root@${server_ip} 'chmod +x /root/build.sh'
#    sshpass -p ${server_password} ssh root@${server_ip} '/root/build.sh run'
    #if [[ "${site}" == "yes" ]]
    #then
    #    sshpass -p ${server_password} ssh root@${server_ip} '/root/build.sh server'
    #fi

    #ip link set $(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g') down
    #systemctl set-default graphical.target
    #ln -sT /usr/share/zoneinfo/${timezone} /etc/localtime # -sf ?

    #ssh-keygen -t rsa -b 4096 -C me@you.com
    #openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    #echo "Port 22" >> /etc/ssh/sshd_config
    #echo "AllowUsers ${user_name}" >> /etc/ssh/sshd_config
    #add public key to /home/user/.ssh/authorized_keys
    #enable PubKey authentication in /etc/ssh/sshd_config (restart service)
    #systemctl enable sshd
    
    #!/bin/bash
# script to run on startup

#exec ntpd -qg & #hwclock --systohc
#xinput --map-to-output "pointer:Goodix Capacitive TouchScreen" "DSI1"
#picom -b
#exec nohup firefox -url "https://boxb.in" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11 &
#xrandr --output DSI1 --rotate right #--auto --pos 0x0 --primary --output DP1 --auto --pos 3840x0
#lsof -i -P -n

    #amixer sset Master unmute #amixer set Master 50+
#        env MOZ_USE_XINPUT2=1 firefox  #...about settings?
nohup firefox > /dev/null 2>&1 &
#sed -i "s/#XXXX/nohup chromium 'http:\/\/localhost:5001' --test-type --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > \/dev\/null 2>&1 & disown &/g" /root/config/start.sh


https://codepen.io/shubniggurath/pen/OEeMOd (water)
https://codepen.io/shubniggurath/pen/BVKgJK (storm)
https://codepen.io/vcomics/pen/aGmoae (city)
https://codepen.io/shubniggurath/pen/WgJZJo (snow)

https://codepen.io/SteveJRobertson/pen/emGWaR

https://codepen.io/knoland/pen/XKxrJb

https://codesandbox.io/embed/v6sle?codemirror=1


https://codepen.io/sjcobb/pen/gmjVqb
https://www.blenderbottle.com/

https://engine.presearch.org/search?q=donate+to+ukraine

https://www.logodesign.net/qrcode-generator (QR with logo!)

https://www.change.org/

5% rule (FINRA)

about:support (profiles) (config)

Ace Hardware with northerntool
AirBnb

builtinseattle

GE, KR? Canon, GD
Presearch with crypto?
Zion/United Methodist (Woodinville)
 
 https://jsfiddle.net/aa0et7tr/5/

[corp](https://ccfs.sos.wa.gov/#/Dashboard) - [license](https://secure.dor.wa.gov/) - [copyright](https://eco.copyright.gov) - [trademark](https://www.uspto.gov/)
(Akamai, INTL), build [private](BH) with [ETH](https://geth.ethereum.org/downloads/) and (GOOG)
[book](https://www.makeplayingcards.com)
[ship](https://www.usps.com/business/web-tools-apis/documentation-updates.htm) (STRIPE, VISA)
[coin](https://coinbase.com) (CHASE, COIN) with [crypto](https://gate.io)

(GM)||taxes|

https://docs.mapbox.com/api/navigation/directions/

<div style="display:flex;  align-items: center; justify-content: center; margin:12px; margin-top:24px;">
		<a id="dropdown-template" class="waves-effect waves-light amber lighten-2 btn dropdown-trigger" href='#' data-target='dropdown-temp' style="margin-right:8px;" ><i id="view-icon" class="material-icons left">dynamic_feed</i><span id="view-name">Template</span></a>
		<a onclick="clearEditor();" class="waves-effect waves-grey btn-flat"><i class="material-icons left">refresh</i>Clear</a></div>
  
        <div id="pad" class="z-depth-2" contentEditable="true" style="text-align:left; overflow-y: auto; width:90%; border:1px solid darkgrey; box-shadow: 1px 1px beige; border-radius: 8px;height: 100%;padding: 12px;margin:auto;font-size:20px;">...enter content here...</div><br/>
        <div style="display:flex;justify-content:space-between;">
            <div style="display:flex;  justify-content: left; margin-left:20%;  align-items:center;">
                <div class="chip z-depth-1 waves-effect waves-blue blue-grey lighten-2" style="display:flex; color:white; width:60px; justify-content:center; margin-right:12px;" onclick="$('#fileinput').trigger('click');"><div style="display:flex;"><i class="material-icons" style="margin:auto;margin-left:12px;">attach_file</i></div></div>
                <div class="hiddenfile"><input name="upload" type="file" id="preview" onchange="checkFile();" multiple="multiple"/></div>
                <div class="chip">file1.png<i class="close material-icons">close</i></div></div></div>

        <div style="display:flex; justify-content:space-between; margin:24px;position:sticky;bottom:24px;padding-right:48px;width:100%;">
            <a onclick="showPreview();" class="waves-effect waves-grey btn-flat"><i class="material-icons left">web_asset</i>Preview</a>
            <div>
                <a onclick="pullArtifact($('#opener').val()); showView('map');" class="waves-effect waves-green green btn"><i class="material-icons right">east</i>Continue</a></div>
            <div id="show-progress" class="progress" style="display:none;"><div class="indeterminate"></div></div></div>

<ul id='dropdown-temp' class='dropdown-content'>
    	<li id="map-sat"><a href="#!" onclick="setTemplate('Empty');"><i class="material-icons">label</i>Empty</a></li>
	<li class="divider" tabindex="-1"></li>
    	<li id="map-dir"><a href="#!" onclick="setTemplate('Profile');"><i class="material-icons">badge</i>Profile</a></li>
	<li id="map-dir"><a href="#!" onclick="setTemplate('Instruction');"><i class="material-icons">checklist</i>Checklist</a></li>
	<li class="divider" tabindex="-1"></li>
	<li id="map-route"><a href="#!" onclick="setTemplate('Recipe');"><i class="material-icons">restaurant</i>Recipe</a></li>
	<li id="map-route"><a href="#!" onclick="setTemplate('Sequence');"><i class="material-icons">dry_cleaning</i>Sequence</a></li>
	<li id="map-route"><a href="#!" onclick="setTemplate('Graph');"><i class="material-icons">fort</i>Graph</a></li></ul>


<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/materialize/0.95.1/css/materialize.min.css">

<div class="container">
  <div class="row">
    <nav>
      <div class="nav-wrapper">
        <div class="col s12">
          <a href="#" class="brand-logo">Text to speech example</a>
        </div>
      </div>
    </nav>
  </div>
  <form class="col s8 offset-s2">
    <div class="row">
      <label>Choose voice</label>
      <select id="voices"></select>
    </div>
    <div class="row">
      <div class="col s6">
        <label>Rate</label>
        <p class="range-field">
          <input type="range" id="rate" min="1" max="100" value="10" />
        </p>
      </div>
      <div class="col s6">
        <label>Pitch</label>
        <p class="range-field">
          <input type="range" id="pitch" min="0" max="2" value="1" />
        </p>
      </div>
      <div class="col s12">
        <p>N.B. Rate and Pitch only work with native voice.</p>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <textarea id="message" class="materialize-textarea"></textarea>
        <label>Write message</label>
      </div>
    </div>
    <a href="#" id="speak" class="waves-effect waves-light btn">Speak</a>
  </form>  
</div>

<div id="modal1" class="modal">
  <h4>Speech Synthesis not supported</h4>
  <p>Your browser does not support speech synthesis.</p>
  <p>We recommend you use Google Chrome.</p>
  <div class="action-bar">
    <a href="#" class="waves-effect waves-green btn-flat modal-action modal-close">Close</a>
  </div>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/materialize/0.95.1/js/materialize.min.js"></script>

<script>
$('#dropdown-template').dropdown({ constrainWidth: false });
	
  function setTemplate(temp) {
    switch(temp) {
        case "Empty":$("#pad").html(""); break;
        case "Profile":$("#pad").html(profileBasic); break;
        case "Recipe":$("#pad").html(profileAdvanced); break;
        case "Instruction":$("#pad").html(artifactRecipe); break;
        case "Sequence":$("#pad").html(artifactSequence); break;
        case "Graph":$("#pad").html(artifactGraph); break;} changeFocus(); }
	
	$(function(){
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function() {
      var $voicelist = $('#voices');

      if($voicelist.find('option').length == 0) {
        speechSynthesis.getVoices().forEach(function(voice, index) {
          var $option = $('<option>')
          .val(index)
          .html(voice.name + (voice.default ? ' (default)' :''));

          $voicelist.append($option);
        });

        $voicelist.material_select();
      }
    }

    $('#speak').click(function(){
      var text = $('#message').val();
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[$('#voices').val()];
      msg.rate = $('#rate').val() / 10;
      msg.pitch = $('#pitch').val();
      msg.text = text;

      msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
      };

      speechSynthesis.speak(msg);
    })
  } else {
    $('#modal1').openModal();
  }
});
	</script>
