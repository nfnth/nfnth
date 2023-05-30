#!/usr/bin/env python
import os, types
import os.path
from os.path import exists

import requests, random, datetime
from aiohttp import web  

#from distutils.dir_util import copy_tree #shutil

PATH="/root/ocur/"
PUBLIC="/mnt/data/public/"
PRIVATE="/mnt/data/private/" # user
STORE="/mnt/data/store/"

# app 
async def index(request):
    if request.host == "ocur.app":
        return web.FileResponse(PATH + 'htm/ocur.htm')
    elif request.host == "1950.app":
        return web.FileResponse(PATH + 'htm/1950.htm')
    elif request.host == "eyra.app":
        return web.FileResponse(PATH + 'htm/eyra.htm')

# client
import uuid
from hexbytes import HexBytes

import socket
from cryptography.fernet import Fernet
KEY = Fernet.generate_key()
SECRET = Fernet(KEY)

async def check(request):
    async for field in (await request.multipart()):
        if field.name == 'user':
            user = (await field.read()).decode()
            pass

    if not os.path.isdir(PRIVATE + user):
        return web.Response(text="valid", content_type="text/html")
    else:
        return web.Response(text="invalid", content_type="text/html")

async def user(request):
    async for field in (await request.multipart()):
        if field.name == 'user':
            user = (await field.read()).decode()
            pass
        if field.name == 'password':
            password = (await field.read()).decode()
            pass
        if field.name == 'salt':
            salt = (await field.read()).decode()
            pass

    if not os.path.isdir(PRIVATE + user):
        os.makedirs(PRIVATE + user)
        with open(PRIVATE + user + "/key", "wt") as fout:
            fout.write(password)
            pass
        with open(PRIVATE + user + "/salt", "wt") as fout:
            fout.write(salt)
            pass
        return web.Response(text="valid", content_type="text/html") 
    else:
        return web.Response(text="invalid", content_type="text/html")  

async def salt(request):
    async for field in (await request.multipart()):
        if field.name == 'user':
            user = (await field.read()).decode()
            pass
    if os.path.isdir(PRIVATE + user):
        return web.FileResponse(PRIVATE + user + "/salt")
async def lock(request):
    async for field in (await request.multipart()):
        if field.name == 'user':
            user = (await field.read()).decode()
            pass
        if field.name == 'password':
            password = (await field.read()).decode()
            pass
    with open(PRIVATE + user + "/key","r") as fin:
        key = fin.readlines()
    print (key[0])
    print (password)
    if key[0] == password:
        return web.Response(text=str(SECRET.encrypt(str.encode(socket.gethostbyname(socket.gethostname()) + "|" + str(datetime.datetime.now()) + "|" + user))), content_type="text/html")
    else:
        return web.Response(text="invalid", content_type="text/html")   
async def unlock(token, salt):
    data = str(SECRET.decrypt(token))
    data.split("|")
    if data[0] == socket.gethostbyname(socket.gethostname()) and data[3] == salt: # check datetime...
        return data[2]
    else:
        return ""

async def backup(request):
    async for field in (await request.multipart()):
        if field.name == 'user':
            user = (await field.read()).decode()
            pass
        if field.name == 'password':
            password = (await field.read()).decode()
            pass
        if field.name == 'confirm':
            confirm = (await field.read()).decode()
            pass
        if field.name == 'backup':
            backup = (await field.read()).decode()
            pass

    if not os.path.isdir(PRIVATE + user) and password == confirm:
        os.makedirs(PRIVATE + user)
        with open(PRIVATE + user + "/key", "wt") as fout:
            fout.write(password)
            pass
        with open(PRIVATE + user + "/backup", "wt") as fout:
            fout.write(backup)
            pass
            
        tmp = uuid.uuid4().hex
        with open(PRIVATE + user + "/temp", "wt") as fout:
            fout.write(tmp)
            pass
        mail(user, "Confirm Email", CONFIRM, [user, tmp])

        return lock(request)
    else:
        return web.Response(text="invalid", content_type="text/html")  

async def valid(request):
    user = request.match_info.get('user', '')
    key = request.match_info.get('key', '')
    
    with open(PRIVATE + user + "/temp","r") as fin:
        tmp = fin.readlines()
    if tmp == key:
        os.rename(PRIVATE + user + "/temp", PRIVATE + user + "/valid")
        return web.FileResponse(PATH + 'htm/app.htm')
    else:
        return web.FileResponse(PATH + 'htm/app.htm')

async def reset(request):
    async for field in (await request.multipart()):
        if field.name == 'key':
            key = (await field.read()).decode()
            pass
    with open(PRIVATE + user + "/temp","r") as fin:
        tmp = fin.readlines()
    if os.path.isdir(PRIVATE + user + "/valid"):
        os.rename(PRIVATE + user + "/temp", PRIVATE + user + "/valid")
        return web.Response(text="valid", content_type="text/html")
    else:
        return web.Response(text="invalid", content_type="text/html")



# data
async def domain(request):
    domain = request.match_info.get('domain', '')
    if os.path.isfile(PUBLIC + domain + "/deed"):
        return web.FileResponse(PUBLIC + domain + "/deed")
    elif os.path.exists(PUBLIC + domain):
        return web.Response(text="valid", content_type="text/html") 
    else:
        return web.Response(text="invalid", content_type="text/html")

async def data(request):
    user = request.match_info.get('user', '')
    async for field in (await request.multipart()):
        if field.name == 'token':
            token = (await field.read()).decode()
            pass
        if field.name == 'salt':
            salt = (await field.read()).decode()
            pass
        if field.name == 'action': # item domain map
            action = (await field.read()).decode()
            pass
        if field.name == 'content':
            content = (await field.read()).decode()
            pass

    if unlock(token, salt) == user: # valid
        if action == "item": # create "amount" to validate
            path = PRIVATE + user
            tmp = uuid.uuid4().hex
            os.makedirs(path + "/" + tmp)
            with open(path, "wt") as fout:
                fout.write(content)
                pass
        elif action == "domain": # create "amount" to validate
            path = PUBLIC + content
            tmp = uuid.uuid4().hex
            with open(path + "/deed", "wt") as fout:
                fout.write(tmp)
                pass
        elif action == "map":
            shutil.copytree(path, PUBILC + tmp)

        return web.Response(text="valid", content_type="text/html")
    else:
        return web.Response(text="invalid", content_type="text/html")

# file
async def upload(request): # delete?
    user = request.match_info.get('user', '')
    ref = request.match_info.get('ref', '')
    async for field in (await request.multipart()):
        if field.name == 'pic':
            filename = field.filename
            size = 0
            with open(PRIVATE + user + '/' + ref + '/' + filename, 'wb') as fd:
                while True:
                    chunk = await field.read_chunk()
                    if not chunk:
                        break
                    size += len(chunk)
                    fd.write(chunk)
            


# ship


#from urllib2 import Request, urlopen
from urllib.request import urlopen
import urllib, json
EASY_SHIP="sand_osI5e9xfe2XzXL2U/7pm/vpBerMmmeqqfbx8zIYwRAE="

async def ship(request):
    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        raise e
    except stripe.error.SignatureVerificationError as e:
        raise e

    if event['type'] == 'charge.succeeded':
        charge = event['data']['object']
    else:
      print('Unhandled event type {}'.format(event['type']))
      
   # "email": null,
  #"payment_intent": null,
  #"receipt_email": null,
  #"shipping": null,

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

# utility
async def search(request):
    term = request.match_info.get('term', '') # perform search ...
    return web.Response(text="valid search", content_type="text/html")
    
import glob, re
from random import randrange

#image_path = '/root/ocur/res/img/'
word_path = '/root/ocur/res/dictionary.txt'
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

async def checker(request):
    #lookup = await request.text()
    #value = public[lookup.upper()]
    #if not value is None:
    #    return web.Response(text=str(value), content_type='text/html')

    random_num = randrange(NUM_WORDS-1)
    #random_word = words[randrange(NUM_WORDS-1)].replace('\n', '')
    random_word = list(public.keys())[random_num]
    random_def = list(public.values())[random_num].replace('\n', '')
    return web.Response(text=random_word + " : " + random_def, content_type='text/html')

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
    app.router.add_static('/js', PATH + 'js')
    app.router.add_static('/store', STORE)
    app.router.add_static('/public', PUBLIC)

    app.add_routes([web.get('/', index)])
    #app.add_routes([web.get('/domain/{domain}', domain)])
    app.add_routes([web.get('/search/{term}', search)])
    #app.add_routes([web.get('/pay', pay)])
    #app.add_routes([web.get('/stripe', ship)])
    app.add_routes([web.get('/{route}', index)])
    
    app.add_routes([web.post('/check', check)])
    app.add_routes([web.post('/user', user)])
    app.add_routes([web.post('/salt', salt)])
    app.add_routes([web.post('/lock', lock)])
    #app.add_routes([web.post('/valid/{user}', valid)])
    #app.add_routes([web.post('/reset/{user}', reset)])
    #app.add_routes([web.post('/receipt/{user}', receipt)])
    
    app.add_routes([web.post('/data/{user}', data)])
    app.add_routes([web.post('/upload/{user}/{ref}', upload)])
    
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
