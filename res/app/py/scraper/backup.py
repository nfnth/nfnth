#!/usr/bin/env python
import os, socket, json, types, uuid #shutil
import os.path
from os.path import exists
from os import walk
#from distutils.dir_util import copy_tree

import requests, random, datetime
from aiohttp import web  
#from time import sleep
from web3.auto import w3
from web3 import HTTPProvider, Web3

from cryptography.fernet import Fernet
from hexbytes import HexBytes

import eth_account.messages
from eth_account.messages import encode_defunct
from eth_account.messages import defunct_hash_message
from eth_account import Account, messages

import subprocess    
import threading
import shutil
#from thread import start_new_thread

#from urllib2 import Request, urlopen
from urllib.request import urlopen
from distutils.dir_util import copy_tree
import urllib

PATH="/root/ocur/"
PUBLIC="/mnt/data/public/" # domain
PRIVATE="/mnt/data/private/" # wallet
STORE="/mnt/store/"

ETH_API_KEY="PFWQFWU33EZPEAYGHQH7YBCSQ45NCUYU7G"
OPEN_API_KEY=""
TOKEN="0xCcaB679860B1017589239BCeEEabe5CD45965aFc"
EASY_SHIP="sand_osI5e9xfe2XzXL2U/7pm/vpBerMmmeqqfbx8zIYwRAE="
  
KEY = Fernet.generate_key()
SECRET = Fernet(KEY)

# client
async def index(request): #route = request.match_info.get('route', '') # run clean up/maintenance?
    return web.FileResponse(PATH + 'index.htm')

async def stat(request): # add OCUR price? #ocur_site = 'https://api.etherscan.io/api?module=token&action=tokenholderlist&contractaddress=0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d&page=1&offset=10&apikey='  + ETH_API_KEY
    eth_site = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=' + ETH_API_KEY
    eth_balance = requests.get(eth_site).json().get("result").get("ethusd")

    gas_site = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + ETH_API_KEY
    gas_balance = requests.get(gas_site).json().get("result")["ProposeGasPrice"]

    wallets = str(len(next(os.walk(PRIVATE))[1]))
    domains = str(len(next(os.walk(PUBLIC))[1]))

    return web.Response(text=eth_balance + "|" + gas_balance+"|"+wallets+"|"+domains, content_type="text/html")
#async def tree(request):
#    area = request.match_info.get('area', 'wallet') #domain
#    ref = request.match_info.get('ref', '')
#    path = PUBLIC + '/' + area + '/' + ref
#    f = []
#    for (dirpath, dirnames, filenames) in walk(path):
#        f.extend(filenames)
#        break
     
#    return web.Response(text=f,content_type="text/html")
async def search(request):
    term = request.match_info.get('term', '') # perform search ...
    return web.Response(text="valid search", content_type="text/html")

#async def receipt(wallet, tx):
#    tran_site = 'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=' + TOKEN + '&address=' + str(wallet) + '&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=' + ETH_API_KEY
#    token_trans = json.dumps(requests.get(tran_site).json().get("result"))
#    token_balance = 0
   
#    if not tx is None:
#        for trans in token_trans:
#            if trans.to == "0x8a83fbbacb82030ea17179c0403b04e7bce7ba10" and trans.hash == tx: # success
#                return trans.value
#            else:
#                return 0
#    else: 
#        return token_trans

async def balance(request):
    async for field in (await request.multipart()):
        if field.name == 'wallet':
            wallet = (await field.read()).decode()
            pass

    eth_site = 'https://api.etherscan.io/api?module=account&action=balance&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    token_site = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' + TOKEN + '&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    #tran_site = 'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=' + TOKEN + '&address=' + str(wallet) + '&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=' + ETH_API_KEY
   
    eth_balance = requests.get(eth_site)
    token_balance = requests.get(token_site).json().get("result")
    #token_trans = json.dumps(requests.get(tran_site).json().get("result"))
    
    token_trans = await receipt(wallet, None)

    return web.Response(text=eth_balance.text+"|"+token_balance+"|"+token_trans, content_type="text/html")

# security
async def lock(wallet):
    if not wallet is None:
        return str(SECRET.encrypt(str.encode(socket.gethostbyname(socket.gethostname()) + "|" + str(datetime.datetime.now()) + "|" + wallet)))
    else:
        return str(SECRET.encrypt(str.encode(socket.gethostbyname(socket.gethostname()) + "|" + str(datetime.datetime.now()))))
async def unlock(wallet, key):
    data = str(SECRET.decrypt(key))
    data.split("|")
    if data[0] == socket.gethostbyname(socket.gethostname()): # valid ...also check datetime...
        if not wallet is None:
            if data[2] == wallet:
                return True
            else:
                return False
        return True
    else:
        return False
async def key(request):
    return web.Response(text=lock(None),content_type="text/html")

async def sign(wallet, message, signature):
    encoded = eth_account.messages.encode_structured_data(text=message)
    message_wallet = Account.recover_message(encoded, signature=signature)

    if wallet.upper() == message_wallet.upper(): # wallet authenticated
        return True
    else:
        return False
async def deed(ref, wallet):
    api_url = "https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/" + ref
    headers = {"X-API-KEY": OPEN_API_KEY}
    x = requests.get(api_url, headers=headers).json()
    y = x.get("top_ownerships")[0].get("owner").get("address")
    z = requests.get(api_url, headers=headers).json().get("external_link").replace("https://ur.land/","")
            
    if y.upper() == wallet.upper(): #owner authenticated
	    return True
    else:
        return False

# data
#async def view(request):
#    async for field in (await request.multipart()):
#        if field.name == 'wallet':
#            wallet = (await field.read()).decode()
#            pass
#        if field.name == 'ref':
#            ref = (await field.read()).decode()
#            pass
#        if field.name == 'key':
#            key = (await field.read()).decode()
#            pass
#        if field.name == 'item': # doc pic
#            item = (await field.read()).decode()
#            pass

#    if unlock(key, wallet): # valid 
#        if ref is None: # tree
#            path = PRIVATE + wallet
#            f = []
#            for (dirpath, dirnames, filenames) in walk(path):
#                f.extend(filenames)
#                break
     
#            return web.Response(text=f,content_type="text/html")
#        else:
#            path = PRIVATE + wallet + '/' + ref + '/' + item
#            return web.FileResponse(path)
#    else:
#        return web.Response(text="invalid key",content_type="text/html")
async def data(request):
    #ref = None
    #tmp = uuid.uuid4().hex

    async for field in (await request.multipart()):
        if field.name == 'wallet':
            wallet = (await field.read()).decode()
            pass
        if field.name == 'message':
            message = (await field.read()).decode()
            pass
        if field.name == 'signature':
            signature = (await field.read()).decode()
            pass
        if field.name == 'domain':
            domain = (await field.read()).decode()
            pass
        if field.name == 'content': 
            content = (await field.read()).decode()
            pass
        if field.name == 'owner':
            owner = (await field.read()).decode()
            pass
        if field.name == 'key': 
            key = (await field.read()).decode()
            pass
#        if field.name == 'pic':
#            filename = field.filename
#            filename = tmp
#            size = 0
#            with open(os.path.join(DATA + '/tmp', filename), 'wb') as fd:
#                while True:
#                    chunk = await field.read_chunk()
#                    if not chunk:
#                        break
#                    size += len(chunk)
#                    fd.write(chunk)
    bypass = unlock(wallet, key)

    if bypass or sign(wallet, message, signature): # valid wallet
        if not bypass:
            return web.Response(text=lock(wallet),content_type="text/html")
            
        path = PRIVATE + wallet + '/data' # wallet
        if domain is None:
            if content is None:
                if not os.path.isfile(path):
                    shutil.copytree(STORE + 'data', path)
                return web.FileResponse(path)
        elif deed(domain, owner): # valid domain
            if wallet == owner: # domain
                path = PUBLIC + domain + '/data'
            else: # message
                path = PRIVATE + owner + '/data' # message
                with open(path, 'a') as fin:
                    fin.write(content + '\n')
                path = PRIVATE + wallet + '/data' # receipt
                with open(path, 'a') as fin:
                    fin.write(content + '\n')
                return web.Response(text="data sent",content_type="text/html")
    
        if os.path.isfile(path): # edit
            os.remove(path)
        
        with open(path, "wt") as fout:
            fout.write(content)
            pass
            
        return web.FileResponse(path + '/data')
    else:
        return web.Response(text="invalid wallet", content_type="text/html")

# utility
async def paid(wallet, tx, amount): # loop through orders in STORE and check tx status ...
        if receipt(wallet, tx) == amount: # get package info from folder ... call ship ...
            ship()
        else:
            return web.Response(text="tx fail", content_type="text/html")
async def ship():
	#ref, name, address, city, state, postal
    # track = image(ref, details[0], details[1], details[2], details[3], details[4]) # postage
    values = {"platform_name": "Amazon", "platform_order_number": "#1234", "selected_courier_id": "b8d528a7-a2d4-4510-a7ac-11cbbb6542cd", "destination_country_alpha2": "US", "destination_city": "New York", "destination_postal_code": postal, "destination_state": state, "destination_name": name, "destination_address_line_1": address, "destination_address_line_2": null, "destination_phone_number": "+1 234-567-890", "destination_email_address": "api-support@easyship.com",  "items": [ { "description": "Silk dress", "sku": "test", "actual_weight": 1.2, "height": 10, "width": 15, "length": 20, "category": "fashion", "declared_currency": "SGD", "declared_customs_value": 100 } ] }

    headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer  ' + EASY_SHIP }
    request = Request('https://api.easyship.com/shipment/v1/shipments', data=values, headers=headers)
    response_body = urlopen(request).read()
    print(response_body)

    values = { "shipments": [ { "easyship_shipment_id": "ESUS3171766", "courier_id": "b4552ed2-ae95-4647-9746-5790bf252c7f" }, { "easyship_shipment_id": "ESUS2513756" } ] }
    request = Request('https://api.easyship.com/label/v1/labels', data=values, headers=headers)
    response_body = urlopen(request).read()
    print(response_body)
    
        #y = x.get("top_ownerships")[0].get("owner").get("address")
    #z = requests.get(api_url, headers=headers).json().get("external_link").replace("https://ur.land/","")
    resultFilePath, responseHeaders = urllib.urlretrieve(response_body.json().get("label"), STORE + ref + "/label.pdf")
    return True # return track?

#start_new_thread(world, path)
#request.app['locked'] = False
  
# server
import asyncio, aiohttp
from aiohttp import web
from concurrent.futures import ProcessPoolExecutor

def run(part, *args):
    loop = asyncio.new_event_loop()

    try:
        full = part(*args)
        asyncio.set_event_loop(loop)
        loop.create_task(full)
        loop.run_forever()
    finally:
        loop.close()

async def site(port):
    app = web.Application(client_max_size=10000000)
    #app['locked'] = False

    app.router.add_static('/res', PATH + 'res')
    app.router.add_static('/public', PUBLIC)

    app.add_routes([web.get('/', index)])
    app.add_routes([web.get('/stat', stat)])
    #app.add_routes([web.get('/tree/{area}/{ref}', tree)])
    app.add_routes([web.get('/key', key)])
    app.add_routes([web.get('/search/{term}', search)])
    app.add_routes([web.get('/{route}', index)])

    app.add_routes([web.post('/balance', balance)])
    app.add_routes([web.post('/data/', data)])
    #app.add_routes([web.post('/view', view)])
    
    runner = web.AppRunner(app)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    await runner.setup()

    site = web.TCPSite(runner, 'localhost', 5000+port)
    await site.start()

try:
    loop = asyncio.get_event_loop()
    executor = ProcessPoolExecutor(max_workers=14)
    loop.run_in_executor(executor, run, site, 1) #from haproxy
    loop.run_forever()
except:
    pass
finally:
    for runner in runners:
        loop.run_until_complete(runner.cleanup())
        
#!/usr/bin/env python
import os, socket, json, types, six, tarfile
from datetime import datetime
from subprocess import call

NAME = socket.getfqdn()
IP = socket.gethostbyname(NAME)
PATH = os.path.abspath(os.path.dirname(__file__))
REL = os.getcwd()

# data (jaspre)
def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

json_file = open(PATH + '/template.json', mode='r')
data_template = json_file.read()
json_file.close()
data_store = json2obj(data_template)

async def admin(request): #add git sync
    params = await request.json()
    key = params["key"]
    ip = params["ip"]

    if data_store.key is None: #stamp key
        data_store.key = key

    if key == data_store.key and ip == IP: #target machine found
        return await state(request)
    else: #remote machine needed
        user = await check(request)
        if user == data_store.admin:
            pool = next((x for x in data_store.pool if x.ip == ip), None)
            if pool.ip is None: #new pool
                return await aiohttp.web.HTTPFound('http://' + ip + '/admin')
                data_store.pool.append("{" + key + "," + ip + "}")
            elif ip == pool.ip and key == pool.key: #old pool
                return await aiohttp.web.HTTPFound('http://' + ip + '/admin')

async def state(request): #add datetime stamp for continuous...
    params = await request.json()
    action = params["action"]
    target = params["target"]

    if action == "restore":
        data = await request.post()
        filename = data['admin'].filename
        input_file = data['admin'].file
        content = input_file.read()

    if target == "system":
        if action == "backup":
            data_session = obj2json(data_store)
            with open(REL + '/data/session', 'w') as f:
                f.write(data_session)
        elif action == "restore":
            with open(os.path.join('../data', "system.json"), 'wb') as f:
                f.write(content)
            json_file = open('..data/system.json', mode='r')
            data_template = json_file.read()
            json_file.close()
            data_store = json2obj(data_template) #include object map...
    elif target == "user":
        if action == "backup":
            with tarfile.open(REL + '/data/backup', "w:gz") as tar:
                tar.add(REL + '/data', arcname=os.path.basename(REL + '/data'))
            return web.FileResponse(REL + '/data/backup')
        elif action == "restore":
            with open(os.path.join('../data', "restore.tar"), 'wb') as f:
                f.write(content)
            tar = tarfile.open('../data/restore.tar')
            tar.extractall()
            tar.close()

# search
import glob, re
from random import randrange

image_path = '/root/repo/seboltus/res/img/'
word_path = '/root/repo/seboltus/res/dictionary.txt'
with open (word_path, 'r') as f:
    content = f.read()

words = re.findall("(\n[A-Z]+[0-9 -]*\n)",content)
defs = re.findall("\n[A-Z]+[0-9 -]*\n([\s\S]*?)(?=(\n[A-Z]+[0-9 -]*\n))",content)
NUM_WORDS = 116623 #len(defs) print (len(words)) print (len(defs))
public = dict()

i = 0
while i < len(defs)-1:
    if not words[i].replace('\n', '') in public:
        public[words[i].replace('\n', '')] = defs[i][0] #remove dash?
    else:
        public[words[i].replace('\n', '')] = public[words[i].replace('\n', '')] + defs[i][0] 
    i += 1

async def search(request): #add public project doc search? add key redemption...
    name = request.match_info.get('name', 'index')
    lookup = await request.text()

    if name == "word":
        if not lookup == "":
            value = public[lookup.upper()]
            if not value is None:
                return web.Response(text=str(value), content_type='text/html')
        else:
            random_num = randrange(NUM_WORDS-1)
            #random_word = words[randrange(NUM_WORDS-1)].replace('\n', '')
            random_word = list(public.keys())[random_num]
            print (random_word)
            random_def = list(public.values())[random_num].replace('\n', '')
            return web.Response(text=random_word + " : " + random_def, content_type='text/html')
    elif name == "color": #image
        color = lambda: random.randint(0,255)
        return web.Response(text=random_word + " : " + random_def, content_type='text/html')

# user
from google.oauth2 import id_token
from google.auth.transport import requests

async def check(request): #log IP, add admin flag...
    token = request.cookies.get('token')
    if not token == "":
        session = next((x for x in data_store.session if x.token == token), None)
        #check session.stamp...
        return session.user

async def user(request): # add support for pool
    print ("{" + datetime.now().strftime("%d/%m/%Y %H:%M:%S") + "," + request.remote + "}" + NAME)
    data_store.access.append("{" + datetime.now().strftime("%d/%m/%Y %H:%M:%S") + "," + request.remote + "}")
    user_client = json2obj(await request.text()) #client "user" object

    if user_client.action == "check":
        if not os.path.exists(REL + '/data/user/' + user.name):
            return web.Response(text="yes", content_type='text/html')
        else:
            return web.Response(text="no", content_type='text/html')
    elif user_client.action == "reset":
        response = web.Response(text="user reset", content_type='text/html')
        response.cookies['token'] = ''
        return response

    user = await check(request) #server "user"
    if not user == "": #active user
        token = await request.text() #google auth, pay? store order/receipt, USPS label generator
        idinfo = id_token.verify_oauth2_token(token.replace("idtoken=",""), requests.Request(), "821495192971-f9mdec3tuig2qhoe35847p1kmjdiu0hv.apps.googleusercontent.com")
        print (idinfo['sub'])
        user_data = next((x for x in data_store.user if x.name == user), None)
        #return web.Response(text=str("success"), content_type='text/html') #set session?

        if user_client.action == "get":
            user_data.password = "" #blank out additional?
            return web.Response(text=obj2json(user_data), content_type='text/html')
        elif user_client.action == "set":
            setattr(user_client, user_client.key, user_client.value)
            if user_client.key == "email":
                user_client.status = "unconfirmed"
        elif user_client.action == "delete":
            print ("delete")
    else:
        if user_client.action == "new":
            if not os.path.exists(REL + '/data/user/' + user_client.name):
                os.makedirs(REL + '/data/user/' + user_client.name)
                data_store.user.append(obj2json(user_client))
                #sendMail(email, "boxb.in Confirmation", CONFIRM, user) # expires...? # handle get on email link to confirm?
                response = web.Response(text="new user", content_type='text/html') #session access
                response.cookies['token'] = secrets.token_hex(16)
                data_store.session.append("{" + user_client.name + "," + response.cookies['token'] + "}")
                return response
            else:
                return web.Response(text="name conflict", content_type='text/html')
        elif user_client.action == "old":
            if os.path.exists(REL + '/data/user/' + user_client.name):
                user_data = next((x for x in data_store.user if x.name == user_client.name), None)
                if user_client.password == user_data.password:
                    response = web.Response(text="old user", content_type='text/html')
                    response.cookies['token'] = secrets.token_hex(16)
                    data_store.session.append("{" + user_client.name + "," + response.cookies['token'] + "}")
                    return response
                else:
                    return web.Response(text="wrong password", content_type='text/html')
            else:
                return web.Response(text="user does not exist")
        else:
            return web.Response(text="no", content_type='text/html')

# file
import base64

async def download(request):
    user = await check(request) #server "user"
    params = await request.json()
    filename = params["filename"]

    if not user == "":
        user_data = next((x for x in data_store.user if x.name == user), None)
        key = params["key"]
        key_data = next((x for x in user_data.share if x.share_token == key), None)
        if key_data.access == "view" or key_data.access == "edit":
            return web.FileResponse(REL + '/data/user/' + user + '/' + filename)
    else:
        user = params["user"] #way to remove restriction?
        trade = params["trade"]
        share = params["share"] #validate keys, trade vs. share?
        return web.FileResponse(REL + '/data/user/' + user + '/' + filename)

async def upload(request):
    user = await check(request) #server "user"
    data = await request.post()

    if not user == "":
        filename = data['upload'].filename
        input_file = data['upload'].file
        content = input_file.read()
        #generate ID
        with open(os.path.join(REL + '/data', "test.jpg"), 'wb') as f:
            f.write(content)
        #record file in user's input
        return web.Response(text="uploaded")

## media
#https://pytorch.org/ "live" fish vs. shrimp feed, "bots" framework for tasks/items with tagged fish swarm theory using live feeds with depth, object detection, text/image recognition
import cv2
from av import VideoFrame
from aiortc import MediaStreamTrack, RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaBlackhole, MediaPlayer, MediaRecorder

#ROOT = os.path.dirname(__file__)
pcs = set()

class VideoTransformTrack(MediaStreamTrack):
    kind = "video"

    def __init__(self, track):
        super().__init__()  # don't forget this!
        self.track = track
        #self.transform = transform

    async def recv(self):
        frame = await self.track.recv()

#        if self.transform == "cartoon":
        img = frame.to_ndarray(format="bgr24")
        img_color = cv2.pyrDown(cv2.pyrDown(img))
        for _ in range(6):
            img_color = cv2.bilateralFilter(img_color, 9, 9, 7)
            
        img_color = cv2.pyrUp(cv2.pyrUp(img_color))
        img_edges = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        img_edges = cv2.adaptiveThreshold(cv2.medianBlur(img_edges, 7),255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,9,2,)
        img_edges = cv2.cvtColor(img_edges, cv2.COLOR_GRAY2RGB)
        img = cv2.bitwise_and(img_color, img_edges)
        new_frame = VideoFrame.from_ndarray(img, format="bgr24")
        new_frame.pts = frame.pts
        new_frame.time_base = frame.time_base
        return new_frame
#        elif self.transform == "edges":
#            img = frame.to_ndarray(format="bgr24")
#            img = cv2.cvtColor(cv2.Canny(img, 100, 200), cv2.COLOR_GRAY2BGR)
#            new_frame = VideoFrame.from_ndarray(img, format="bgr24")
#            new_frame.pts = frame.pts
#            new_frame.time_base = frame.time_base
#            return new_frame
#        else:
#            return frame

async def media(request):
    print ("offer")
    params = await request.json()
    offer = RTCSessionDescription(sdp=params["sdp"], type=params["type"])

    pc = RTCPeerConnection()
    pc_id = "PeerConnection(%s)" % uuid.uuid4()
    pcs.add(pc)

    #player = MediaPlayer(os.path.join(REL, "demo-instruct.wav"))
    #if args.write_audio:
    #    recorder = MediaRecorder(args.write_audio)
    #else:
    recorder = MediaBlackhole()
    print ("created")
    @pc.on("datachannel")
    def on_datachannel(channel):
        @channel.on("message")
        def on_message(message):
            if isinstance(message, str) and message.startswith("ping"):
                print("message")
                channel.send("pong" + message[4:])

    @pc.on("iceconnectionstatechange")
    async def on_iceconnectionstatechange():
        if pc.iceConnectionState == "failed":
            print("failed")
            await pc.close()
            pcs.discard(pc)

    @pc.on("track")
    def on_track(track):
        if track.kind == "audio":
            print ("audio")
            #pc.addTrack(player.audio)
            recorder.addTrack(track)
        elif track.kind == "video":
            print ("video")
            local_video = VideoTransformTrack(track)
            pc.addTrack(local_video)

        @track.on("ended")
        async def on_ended():
            await recorder.stop()

    await pc.setRemoteDescription(offer)
    await recorder.start()
    print ("process")
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    print("done")
    return web.Response(content_type="application/json", text=json.dumps({"sdp": pc.localDescription.sdp, "type": pc.localDescription.type}),)

async def on_shutdown(app):
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear() 

## mail (client)
import smtplib, base64, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

HEADER = "<div style='width:100%;background-color:green;'><img src='https://cdn.jsdelivr.net/gh/treeop/treeop.github.io/resource/logo.png' style='width:64px;height:64px;'/></div>"
FOOTER = "<div style='width:100%;background-color:darkgreen;'>Thank you</div>"
CONFIRM = "<div>Please confirm the account with <a href='https://boxb.in/user?token=XXXX'>this link</a>.</div>"
RESET = "<div>Please reset your email by clicking <a href='https://boxb.in/user?token=XXXX'>here</a>.</div>"
SHARE = "<div>A project doc has been shared with you. See the doc <a href='https://boltb.in/doc?token=XXXX'>here</a>.</div>"
RECEIPT = "<div>Thank you for your purchase. See details <a href='https://boltb.in/user?token=XXXX'>here</a>.</div>"

def sendMail(to, subject, template, parameters): # add from...
    context = ssl.create_default_context()

    with smtplib.SMTP("relay.dynu.com", 587) as server:
        server.starttls(context=context)
        server.login("relay@relay.servius.me", "")
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = "support@servius.me"
        message["To"] = to
        message_template = HEADER + template + FOOTER
        for parameter in parameters:
            message_template = message_template.replace('####', parameter)
        part1 = MIMEText(message_template, "plain")
        part2 = MIMEText(message_template, "html")
        message.attach(part1)
        message.attach(part2)
        server.send_message(message)

# mail (server)
import threading, email, uuid
from aiosmtpd.controller import Controller

class MailHandler():
    async def handle_RCPT(self, server, session, envelope, address, rcpt_options):
        if address.endswith('@servius.me'):
            print("box breached")
        elif not address.endswith('@servius.me'):
            return '550 not relaying to that domain'
        envelope.rcpt_tos.append(address)
        # search jasper for name and add to emails...
        # filter user@boxb.in and project@user.boxb.in...
        return '250 OK'

    async def handle_DATA(self, server, session, envelope): # parse to address for? project, check len(data) just in case...
        #print('Message from %s' % envelope.mail_from)
        #print('Message for %s' % envelope.rcpt_tos)
        #print('Message data:\n')
        #message = email.message_from_string(envelope.content.decode('utf8', errors='replace'))
        mail_id = str(uuid.uuid4())

        if not os.path.exists(REL + '/data/mail/' + str(envelope.rcpt_tos)):
            os.makedirs(REL + '/data/mail/' + str(envelope.rcpt_tos))
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




