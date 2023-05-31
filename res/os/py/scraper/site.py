#!/usr/bin/env python

import os, socket, json, types, shutil#, six
import os.path
from os.path import exists
import requests, random, datetime
from aiohttp import web  
from time import sleep
from web3.auto import w3
from web3 import HTTPProvider, Web3

from cryptography.fernet import Fernet
from hexbytes import HexBytes

import eth_account.messages
from eth_account.messages import encode_defunct
from eth_account.messages import defunct_hash_message
from eth_account import Account, messages

DATA="/mnt/data/"
PATH="/root/desk/nfnth/"
ETH_API_KEY=""
OPEN_API_KEY=""
TOKEN="0xCcaB679860B1017589239BCeEEabe5CD45965aFc"
EASY_SHIP="sand_osI5e9xfe2XzXL2U/7pm/vpBerMmmeqqfbx8zIYwRAE="

KEY = Fernet.generate_key()
SECRET = Fernet(KEY)

# client
async def index(request): #request.remote_addr #if not request.host == "dralun.com":
    route = request.match_info.get('route', '')
    return web.FileResponse(PATH + 'index.htm')
  
async def api(request):
    wallet = request.match_info.get('wallet', '')
    eth_site = 'https://api.etherscan.io/api?module=account&action=balance&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    token_site = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' + TOKEN + '&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    gas_site = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + ETH_API_KEY
    tran_site = 'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xCcaB679860B1017589239BCeEEabe5CD45965aFc&address=' + str(wallet) + '&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=' + ETH_API_KEY
    
    eth_balance = requests.get(eth_site)
    token_balance = requests.get(token_site).json().get("result")
    gas_balance = requests.get(gas_site).json().get("result")["ProposeGasPrice"]
    token_trans = json.dumps(requests.get(tran_site).json().get("result"))
    
    hostname = socket.gethostname() #ip_address = socket.gethostbyname(hostname)
    temp_key = socket.gethostbyname(hostname) + "|" + str(datetime.datetime.now()) + "|" + token_balance
    print (temp_key)
    return web.Response(text=eth_balance.text+"|"+token_balance+"|"+gas_balance+"|"+token_trans+"|"+str(SECRET.encrypt(str.encode(temp_key))),content_type="text/html")

async def data(request):
    wallet = request.match_info.get('wallet', '')
    ref = request.match_info.get('ref', '')

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
        if field.name == 'profile':
            profile = await field.read()
            pass
 
    #stamp = SECRET.decrypt(key)
    #print (stamp) #if not key == ...withen 1 hour? return invalid key... get UR
    
    encoded = eth_account.messages.encode_structured_data(text=message)
    message_wallet = Account.recover_message(encoded, signature=signature)

    if wallet.upper() == message_wallet.upper(): #wallet authenticated
        print ("authenticated...") #domain = request.host
        path = DATA + 'wallet/' + wallet
        
        if ref == "mail":
            path = DATA + 'mail/' + wallet
            action = request.match_info.get('action', '') #let get set det
            item = request.match_info.get('item', '')
			
            if action == "let":
                return web.FileResponse(PATH + 'mail/' + wallet + '/doc')
            elif action == "get":
                return web.FileResponse(path + '/' + item)
            elif action == "set":
                path = DATA + 'mail/' + ref + '/' + wallet
                item = "XXXX"
                with open(path + '/' + item, "wt") as fout:
                    fout.write(content)
                    pass
                return web.Response(text='mail set',content_type="text/html")
            elif action == "det":
                os.remove(path + '/' + item)
                return web.Response(text='mail det',content_type="text/html")
            else:
                return web.Response(text='invalid action',content_type="text/html")
        
        if not ref == "profile":
            api_url = "https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/" + ref
            headers = {"X-API-KEY": OPEN_API_KEY}
            x = requests.get(api_url, headers=headers).json().get("top_ownerships")[0].get("owner").get("address")
            y = x.json().get("external_url").replace("https://ur.land/","")

            if not x.upper() == wallet.upper(): #owner authenticated
                return web.Response(text='invalid owner',content_type="text/html")
                
            path = DATA + 'domain/' + y
            
        #request.app['locked'] = False
        #if os.path.exists(path): #backup?
        #    shutil.rmtree(path)
        #os.mkdir(path)
        if not os.path.exists(path):
            os.mkdir(path)
        if exists(path + '/doc'):
            os.remove(path + '/doc')
        with open(path + '/doc', "wt") as fout:
            fout.write(content)
            pass
        with open(path + '/profile', "wb") as fout:
            fout.write(profile)
            pass
        return web.Response(text='valid data',content_type="text/html")
    else:
        return web.Response(text='invalid wallet',content_type="text/html")
  
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
#from distutils.dir_util import copy_tree
#import uuid
#import glob, re, whois
#from random import randrange

#import base64
#from shutil import copyfile

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

#word_path = PATH + '/res/manifest'
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

