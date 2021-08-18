#!/usr/bin/env python
import os, socket, json, types, shutil#, six
from datetime import datetime

DATA = "/mnt/data" #os.pardir
PATH = "/root/nfnth" #os.path.abspath(os.path.dirname(__file__))
REL = os.getcwd()

# client
async def index(request):
    return web.FileResponse(PATH + '/src/index.htm')

async def domain(request):#pulls folder, tracks views?
    domain = request.match_info.get('domain', 'arikara.us')

async def artifact(request): #pulls data
    action = request.match_info.get('action', 'view') #view, edit, delete
    domain = request.match_info.get('domain', 'arikara.us')
    artifact = request.match_info.get('artifact', 'profile') #profile, file

    #if private, get key...

    if action == 'view':
        return web.FileResponse(DATA + '/' + domain + '/' + artifact)
    elif action == 'edit':
        user = await request.post()
        user_data = json2obj(user["data"])
    #elif action == 'delete':
     #   return web.FileResponse(DATA + group + name + '/profile')
    
    return web.Response(text=str("my_callback({['some string 1', '" + name + "', 'whatever data']});"), content_type='text/json')

async def post(request): #validates signature, action to post artifact
    user = await request.post()
    user_data = json2obj(user["data"])
    #set secure cookie with salt 1, send salt 2 datetime...
    #take signature, compare with generated

    domain = request.match_info.get('domain', 'arikara.us')
    action = request.match_info.get('action', 'dir') #search private
	
    if action == "private":
	#check signature
	startpath = DATA + '/domain/' + domain + '/private'
    else:
	startpath = DATA + '/domain/' + domain + '/public'

    if action == "search":
        terms = "term="

    for root, dirs, files in os.walk(startpath):
        for f in files:
            path = os.path.join(root, f)
            if not '.' in path:
                search = open(path, "r")
                searchlines = search.readlines()
                search.close()
                for i, line in enumerate(searchlines):
                    if term in line:
                        terms = terms + path + " at " + str(i) + "|"
            else:
                folder = folder + path
                if not term == "root":
                    search = open(path, "r")
                    searchlines = search.readlines()
                    search.close()
                    for i, line in enumerate(searchlines):
                        if term in line:
                            terms = terms + path + " at " + str(i) + "|"
                else:
                    terms = terms + folder + " at |"
    return terms

    elif action == 'edit':
        user = await request.post()
        user_data = json2obj(user["data"])
    #elif action == 'delete':
     #   return web.FileResponse(DATA + group + name + '/profile')
    
    return web.Response(text=str("my_callback({['some string 1', '" + name + "', 'whatever data']});"), content_type='text/json')

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

    app.router.add_static('/src', '/root/nfnth/src')
    #app.add_routes([web.post('/cash', bank)])
    #app.add_routes([web.get('/jsonp', jsonp)])
    app.add_routes([web.get('/', index)])
    
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
#finally:
#    for runner in runners:
#        loop.run_until_complete(runner.cleanup())
