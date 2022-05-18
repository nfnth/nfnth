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
    if request.host == "ur.land": #add emoji...ur.land?
        return web.FileResponse(PATH + 'index.htm')

async def api(request):
    wallet = request.match_info.get('wallet', '')
    eth_site = 'https://api.etherscan.io/api?module=account&action=balance&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    token_site = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' + TOKEN + '&address=' + wallet + '&tag=latest&apikey=' + ETH_API_KEY
    eth_balance = requests.get(eth_site)
    token_balance = requests.get(token_site).json().get("result")
    hostname = socket.gethostname()
    temp_key = socket.gethostbyname(hostname) + "|" + str(datetime.datetime.now())
    print (temp_key)
    #ip_address = socket.gethostbyname(hostname)
    return web.Response(text=eth_balance.text+"|"+token_balance+"|"+str(SECRET.encrypt(str.encode(temp_key))),content_type="text/html")

async def data(request):
    wallet = request.match_info.get('wallet', '')
    domain = request.match_info.get('ref', '')

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
 
    print(wallet)
    print (message)
    key = SECRET.decrypt(message)
    print (key)
    #if not key == ...withen 1 hour? return invalid key...
    
    encoded = eth_account.messages.encode_structured_data(text=message)
    message_wallet = Account.recover_message(encoded, signature=signature)
    print (message_wallet)

    if wallet.upper() == message_wallet.upper(): #wallet authenticated
        print ("authenticated...")
        #domain = request.host
        
        api_url = "https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/" + ref
        headers = {"X-API-KEY": API_KEY}

        print (api_url)
        x = requests.get(api_url, headers=headers).json().get("top_ownerships")[0].get("owner").get("address")
        print (x)
        if x.upper() == wallet.upper(): #owner authenticated
            #request.app['locked'] = False
            if os.exists(DATA + 'domain/' + ref): #backup?
                os.remove(DATA + 'domain/' + ref)
            with open(DATA + 'domain/' + ref, "wt") as fout:
                fout.write(content)
                pass
            return web.Response(text='valid',content_type="text/html")
        else:
            return web.Response(text='invalid owner',content_type="text/html")
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
    #app.router.add_static('/img', PATH + 'img')
    #app.router.add_static('/doc', PATH + 'doc')
    app.router.add_static('/domain', DATA + 'domain')

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
    #loop.run_in_executor(executor, run, mail, 2)
    loop.run_forever()
except:
    pass
finally:
    for runner in runners:
        loop.run_until_complete(runner.cleanup())
