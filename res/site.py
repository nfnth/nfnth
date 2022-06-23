#!/usr/bin/env python

import os, socket, json, types, shutil#, six
import os.path
import requests, random, datetime
from aiohttp import web  
from time import sleep
from web3.auto import w3
from web3 import HTTPProvider, Web3
#from distutils.dir_util import copy_tree
#import uuid
#import glob, re, whois
#from random import randrange

#import base64

from cryptography.fernet import Fernet

from hexbytes import HexBytes

import eth_account.messages
from eth_account.messages import encode_defunct
from eth_account.messages import defunct_hash_message
from eth_account import Account, messages

#from shutil import copyfile

DATA="/mnt/data/"
PATH="/root/nfnth/"
ETH_API_KEY=""
OPEN_API_KEY=""
TOKEN="0xCcaB679860B1017589239BCeEEabe5CD45965aFc"

KEY = Fernet.generate_key()
SECRET = Fernet(KEY)

# client
async def index(request): #request.remote_addr #if not request.host == "dralun.com":
    route = request.match_info.get('route', '')
    
    if route == "README.md":
        return web.FileResponse(PATH + 'README.md')
    elif route == "PLANME.md":
        return web.FileResponse(PATH + 'PLANME.md')
    elif request.host == "ur.land" or request.host == "dralun.com" or request.host == "mattdown.com":
        return web.FileResponse(PATH + 'index.htm')

async def api(request):
    wallet = request.match_info.get('wallet', '')
    eth_site = 'https://api.etherscan.io/api?module=account&action=balance&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    token_site = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' + TOKEN + '&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    gas_site = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + ETH_API_KEY
    
    eth_balance = requests.get(eth_site)
    token_balance = requests.get(token_site).json().get("result")
    gas_balance = requests.get(gas_site).json().get("result")["ProposeGasPrice"]
    
    hostname = socket.gethostname() #ip_address = socket.gethostbyname(hostname)
    temp_key = socket.gethostbyname(hostname) + "|" + str(datetime.datetime.now()) + "|" + token_balance
    print (temp_key)
    return web.Response(text=eth_balance.text+"|"+token_balance+"|"+gas_balance+"|"+str(SECRET.encrypt(str.encode(temp_key))),content_type="text/html")

async def data(request):
    wallet = request.match_info.get('wallet', '')
    domain = request.match_info.get('domain', '')
    ref = request.match_info.get('ref', '')
    action = request.match_info.get('action', '')

    content = "No profile listed."
    async for field in (await request.multipart()):
        print (field.name)
        if field.name == 'message':
            message = (await field.read()).decode()
            pass
        if field.name == 'signature':
            signature = (await field.read()).decode()
            pass
        if field.name == 'content':
            content = (await field.read()).decode()
            pass
        if field.name == 'key':
            key = (await field.read()).decode()
            pass
 
    stamp = SECRET.decrypt(key)
    print (stamp) #if not key == ...withen 1 hour? return invalid key... get UR
    
    encoded = eth_account.messages.encode_structured_data(text=message)
    message_wallet = Account.recover_message(encoded, signature=signature)

    if wallet.upper() == message_wallet.upper(): #wallet authenticated
        print ("authenticated...") #domain = request.host
        if domain == "profile":
            if ur > 100:
                path = DATA + 'wallet/' + wallet.lower()
                if os.path.exists(path):
                    shutil.rmtree(path)
                os.mkdir(path)
                with open(path + '/profile', "wt") as fout:
                    fout.write(content)
                    pass
                return web.Response(text='valid profile',content_type="text/html")
            else:
                return web.Response(text='invalid UR (profile)',content_type="text/html")
        elif domain == "message": #test if another wallet address....
            if ur > 1000:
                path = DATA + 'message/' + wallet + '/' + domain #wallet to wallet or wallet to domain
                mess = DATA + 'message/' + domain + '/' + wallet
                
                if action == "new":
                    if not os.path.exists(path):
                        os.mkdir(path)
                    if not os.path.exists(mess):
                        os.mkdir(mess)
                    ref = str(datetime.datetime.now())
                    with open(path + '/' + ref, "wt") as fout:
                        fout.write(content)
                        pass
                    with open(mess + '/' + ref, "wt") as fout:
                        fout.write(content)
                        pass
                elif action == "delete":
                    if os.path.exists(path + '/' + ref):
                        shutil.rmtree(path + '/' + ref)
                elif action == "view":
                    if os.path.exists(path + '/' + ref):
                        return web.FileResponse(path + '/' + ref)
 
                return web.Response(text='message handled',content_type="text/html")
            else:
                return web.Response(text='invalid UR (message)',content_type="text/html")
        else:
            api_url = "https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/" + domain
            headers = {"X-API-KEY": OPEN_API_KEY}
            x = requests.get(api_url, headers=headers).json().get("top_ownerships")[0].get("owner").get("address")

            if x.upper() == wallet.upper(): #owner authenticated
                if content == "receipt":
                    path = DATA + 'receipt/' + domain + '/' + wallet
                    if not os.path.exists(path):
                        os.mkdir(path)   
                    with open(path + '/stamp', "wt") as fout: #add tx number? update ledger... optional address (deliver to previous owner?)
                        fout.write(message)
                        pass
                else:
                    path = DATA + 'domain/' + domain
                    #request.app['locked'] = False
                    if os.path.exists(path): #backup?
                        shutil.rmtree(path)
                    os.mkdir(path)
                    with open(path + '/doc', "wt") as fout:
                        fout.write(content)
                        pass
                    return web.Response(text='valid domain',content_type="text/html")
            else:
                return web.Response(text='invalid owner',content_type="text/html")
    else:
        return web.Response(text='invalid wallet',content_type="text/html")

#ledger template with "base amount" UR...
async def ledger(domain, ur):
    approve = False
    file_in = DATA + 'receipt/' + domain + '/ledger'
    file_out = file_in + '_out'
    
    if not os.path.exists(file_in):
        os.mkdir(file_in)   
    
    with open(file_in, "rt") as fin:
        with open(file_out, "wt") as fout:
            for line in fin:
                if line.find(ref) == True: #total UR - ur > 0
                    fout.write(line.strip() + str(uuid.uuid4()) + "|" + str(random.randrange(1111, 4111, 1) / 100) + '\n')
                    approve = True
                else:
                    fout.write(line)
    
    if approve == True:
        pass #switch files...
    
    return approve
  
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
    app.router.add_static('/domain', DATA + 'domain')
    app.router.add_static('/wallet', DATA + 'wallet')

    app.add_routes([web.get('/', index)])
    app.add_routes([web.get('/api/{wallet}', api)])
    app.add_routes([web.get('/{route}', index)])

    app.add_routes([web.post('/data/{wallet}/{ref}', data)])
    
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

#"gypsum" J(Py)SON
#with open(PATH + '/res/data/wallet.json', mode='r') as wallet_file:
#    wallet_template = wallet_file.read()
#def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
#def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

#json_file = open('data.json', mode='r') #include object map...?
#data_template = json_file.read()
#json_file.close()
#data_store = json2obj(data_template) 

#async def data(request): #add mail support
#    data = await request.post() #request.json()
#    user_client = json2obj(data["user"])
#    domain = user_client["domain"]

#    user_client["result"] = "published"
#    else:
#        user_clien["result"] = "invalid"
#    return web.Response(text=obj2josn(user_client), content_type='text/html')
#user = await request.post()
#key = user['key']

#word_path = PATH + '/res/dictionary.txt'
#with open (word_path, 'r') as f:
#    content = f.read()

#words = re.findall("(\n[A-Z]+[0-9 -]*\n)",content)
#defs = re.findall("\n[A-Z]+[0-9 -]*\n([\s\S]*?)(?=(\n[A-Z]+[0-9 -]*\n))",content)
#NUM_WORDS = 116623 #len(defs) print (len(words)) print (len(defs))
#english = dict()

#i = 0
#while i < len(defs)-1:
#    if not words[i].replace('\n', '') in english:
#        english[words[i].replace('\n', '')] = defs[i][0] #remove dash?
#    else:
#        english[words[i].replace('\n', '')] = english[words[i].replace('\n', '')] + defs[i][0] 
#    i += 1

#async def search(request):
#    name = request.match_info.get('name', 'word')
#    lookup = await request.text()

#    if name == "word":
#        if not lookup == "":
#            value = english[lookup.upper()]
#            if not value is None:
#                return web.Response(text=str(value), content_type='text/html')
#        else:
#            random_num = randrange(NUM_WORDS-1)
#            random_word = list(english.keys())[random_num]
#            random_def = list(english.values())[random_num].replace('\n', '')
#            return web.Response(text=random_word + " : " + random_def, content_type='text/html')

#        #datetime.now().strftime("%d/%m/%Y %H:%M:%S")
#        return web.Response(text=request.remote, content_type='text/html')

#capture = cv2.VideoCapture('rtsp://192.168.1.64/1')
#capture = cv2.VideoCapture('rtsp://username:password@192.168.1.64/1')

#https://python.plainenglish.io/capture-and-process-video-footage-from-a-webcam-using-opencv-python-9e3c5585da0c
