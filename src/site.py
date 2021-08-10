#!/usr/bin/env python
import os, socket, json, types, shutil#, six
from datetime import datetime

DATA = "/root/data" #os.pardir
PATH = "/root/nfnth" #os.path.abspath(os.path.dirname(__file__))
REL = os.getcwd()

# public
async def index(request):
    return web.FileResponse(PATH + '/index.htm')

async def domain(request): #track views?
    action = request.match_info.get('action', 'view')
    group = request.match_info.get('group', 'domain') #domain, user
    name = request.match_info.get('name', 'arikara.us')
    doc = request.match_info.get('doc', 'profile') #profile, file

    if not doc == 'profile':
        return web.FileResponse(DATA + group + name + '/doc/' + doc)
    else:
        return web.FileResponse(DATA + group + name + '/profile')
    
    return web.Response(text=str("my_callback({['some string 1', '" + name + "', 'whatever data']});"
), content_type='text/json')

#post?
# private (data)
#import base64
key_file = open('key.json', mode='r') #include object map...?
key_template = key_file.read()
key_file.close()

def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

async def stream(request):
    #check feed's page source contains {"text":" watching"}...
    #if not, check rss, https://www.youtube.com/feeds/videos.xml?channel_id=<channel_id>&orderby=published
    #...for latest feed
    return web.FileResponse(PATH + '/ur.js') #make "artifact" specific

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

    app.router.add_static('/static', '/mnt/res')
    app.add_routes([web.post('/cash', bank)])
    app.add_routes([web.get('/jsonp', jsonp)])
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
