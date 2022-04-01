#!/usr/bin/env python

import os, socket, json, types, shutil#, six
import requests, random
#from os import walk
#from datetime import datetime
from web3.auto import w3
from web3 import HTTPProvider, Web3
from distutils.dir_util import copy_tree
import subprocess
import uuid
import shlex
from hexbytes import HexBytes
#from web3 import Web3
#from hexbytes import HexBytes
from eth_account.messages import encode_defunct
from eth_account.messages import defunct_hash_message
from eth_account import Account, messages
import eth_account.messages
#from shutil import copyfile
#from distutils.dir_util import copy_tree

DATA="/mnt/deed/" #os.pardir
PATH="/root/nfnth" #os.path.abspath(os.path.dirname(__file__))
GUIDE="/mnt/guide"
REL=os.getcwd()

# client
async def index(request): #request.remote_addr #if not request.host == "dralun.com" and not request.host == "ur.land":
    return web.FileResponse(PATH + '/res/index.htm')

async def path(request):
    item = request.match_info.get('item', 'domain') #wallet
#    domain = request.match_info.get('domain', 'tactician.us')
    location = DATA + item

#    if not os.path.exists(location):
#        os.mkdir(location)
        #src = PATH + '/data/domain/ur.land'
        #shutil.copytree(src, location)
        #copy_tree(src, location)

    tree = []
    for (root, dirs, files) in os.walk(location):
        for d in dirs:
            tree.append(os.path.join(root, d)) #extend?
        #for f in files:
            #tree.append(os.path.join(root, f))

    return web.Response(text='|'.join(tree),content_type="text/html")

async def key(request): #secret hash?
    hostname = socket.gethostname()
## getting the IP address using socket.gethostbyname() method
    ip_address = socket.gethostbyname(hostname)
    return web.Response(text=hostname + ", " + ip_address, content_type="text/html")

async def api(request):
    account = request.match_info.get('account', '')
    url = 'https://api.etherscan.io/api?module=account&action=balance&address=' + account + '&tag=latest&apikey=PFWQFWU33EZPEAYGHQH7YBCSQ45NCUYU7G'
    token = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x36950b34fE79C4AE047c646D2800e91a198b70fB&address=' + account + '&tag=latest&apikey=PFWQFWU33EZPEAYGHQH7YBCSQ45NCUYU7G'
    r = requests.get(url)
    token_balance = requests.get(token).json().get("result")
    #r2 = request.get(token)

    return web.Response(text=r.text+"|"+token_balance,content_type="text/html")

async def data(request):
    wallet = request.match_info.get('wallet', '')
    item = request.match_info.get('item', 'wallet') #domain
    action = request.match_info.get('action', 'add') #edit delete

    content = "No profile listed."
    async for field in (await request.multipart()):
        print (field.name)
        if field.name == 'message':
            message = (await field.read()).decode()
            pass
        if field.name == 'domain':
            domain = (await field.read()).decode()
            pass
        if field.name == 'signature':
            signature = (await field.read()).decode()
            pass
        if field.name == 'ref':
            ref = (await field.read()).decode()
            pass
        if field.name == 'content':
            content = (await field.read()).decode()
            pass
        if field.name == 'file':
            filename = field.filename
            size = 0
            with open(os.path.join('', filename), 'wb') as fd:
                while True:
                    chunk = await field.read_chunk()
                    if not chunk:
                        break
                    size += len(chunk)
                    fd.write(chunk)
            print (size) #add size constraint...
 
    print(wallet)
    print (message)

    encoded = eth_account.messages.encode_structured_data(text=message)
    message_wallet = Account.recover_message(encoded, signature=signature)
    print (message_wallet)


    if wallet.upper() == message_wallet.upper(): #user authenticated
        print ("authenticated...")
        owner = False

        if item == "wallet":
            location = DATA + '/wallet/' + wallet.upper()
            owner = True
        elif item == "domain":
            #domain = request.host
            location = PATH + '/domain/' + domain

            api_url = "https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/" + ref
            print (api_url)
            x = requests.get(api_url).json().get("top_ownerships")[0].get("owner").get("address")
            print (x)
            if x.upper() == wallet.upper():
                owner = True
            #alltransactions = x.json().get("assets")
            #for t in alltransactions:
            #    name = t.get("name")
            #    print (name)
            #    if name == domain:
            #        contract = t.get("asset_contract").get("address")
            #        asset = t.get("token_id")
            #        asset_url = "https://api.opensea.io/api/v1/asset/" + contract + "/" + asset
            #        y = requests.get(asset_url).json().get("top_ownerships")[0].get("owner").get("address")
            #        print (y)
            #        if y == wallet.lower():
            #            owner = True

        if owner == True:
            if not os.path.exists(location):
                os.mkdir(location)

            if action == "add":
                ref = str(uuid.uuid4())
                os.mkdir(location + '/' + ref)
                with open(location + '/' + ref + '/doc', 'w+') as fp:
                    fp.write(content)
                    pass
                #write files...
                return web.Response(text='doc sent',content_type="text/html")
            elif action == "edit" or action == "delete":
                shutil.rmtree(location + ref)
                if action == "update":
                    os.mkdir(location + ref)
                    with open(location + ref + '/doc', 'w+') as fp:
                        fp.write(content)
                        pass
                #write files...
                return web.Response(text='content update',content_type="text/html")
            else:
                return web.Response(text='invalid action',content_type="text/html")
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

    app.router.add_static('/res', PATH + '/res')
    app.router.add_static('/doc', PATH + '/data')

    if os.path.isdir('/mnt/img/img'):
        app.router.add_static('/img', '/mnt/img/img')
    if os.path.isdir('/mnt/deed'):
        app.router.add_static('/deed', '/mnt/deed')

    app.add_routes([web.get('/', index)])
    app.add_routes([web.get('/key', key)]) #auth/anti-bot
    app.add_routes([web.get('/api/{account}', api)])

    app.add_routes([web.get('/path/{item}', path)])
    app.add_routes([web.post('/data/{wallet}/{item}/{action}', data)])
    app.add_routes([web.get('/{deed}', index)])
    app.add_routes([web.get('/{deed}/{domain}', index)])
    
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
