#!/usr/bin/env python
import os, socket, json, types, shutil#, six
from datetime import datetime

DATA = "data/ur.land/" #os.pardir
PATH = os.path.abspath(os.path.dirname(__file__))
REL = os.getcwd()

# public
async def index(request):
    return web.FileResponse(PATH + '/index.htm')

import glob, re#, whois
from random import randrange

word_path = '/mnt/res/dictionary.txt'
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

# private (data)
#import base64
key_file = open('data/ur.land/bit/key.json', mode='r') #include object map...?
key_template = key_file.read()
key_file.close()

def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

async def user(request):
    name = request.match_info.get('name', 'matt')
    action = request.match_info.get('action', 'check')

    if action == "check":
        return web.Response(text=str(os.path.exists(DATA + name)), content_type='text/html')
    elif action == "create":
        data = await request.post()
        user_client = json2obj(data["user"])
        path = DATA + user_client["name"]
        #if not os.path.exists(path):
        #    shutil.copy('res/template', path)
        #    key_copy = json2obj(key_template)
        #    key_copy.name = user_client["name"]
         #   key_copy.mail = user_client["mail"]
         #   key_copy.secret = user_client["secret"]
            #send mail...
         #   with open(path + '/key.json', 'wb') as f:
         #       f.write(obj2json(key_copy))
         #   return web.Response(text=obj2json(await scrub(key_copy)), content_type='text/html')
       # user_file = open(USER_DATA + name + '/key.json', mode='r') #include object map...?
    user_template = key_file.read()
    #user_file.close()

    return json2obj(user_template)

async def data(request):
 #   async def doc(request): #track views/stars
    name = request.match_info.get('name', 'matt')
    doc = request.match_info.get('doc', 'profile')
    item = request.match_info.get('item', '') #file

    if item == '':
        return web.FileResponse(DATA + name + '/doc/' + doc + '/md')
    #else:
    #    return web.FileResponse(USER_DATA + name + '/doc/' + doc + '/item/' + item)
    
   # data = await request.post() #request.json()
   # user_client = json2obj(data["user"])
   # user_server = key(user_client["name"])

#    token = user_client["token"] #add mail support, ip log?
 #   valid = False
 #   if token == user_server.token and not user_server.token == "": #check expires...
  #      valid = True
  #  else:
   #     if user_client["secret"] == user_server.secret: #key? 2fa?
    #        valid = True
     #       user_server.token = "new"

   # if valid is True:
   #     action = user_client["action"]
    #    if action == "reset":
#            user_server.token = ""
 #           with open(USER_DATA + user_client["name"] + '/key.json', 'wb') as f:
  #              f.write(obj2json(user_server))
   #     elif action == "update":
    #        user_client["private"] = user_server.private
     #       with open(USER_DATA + user_client["name"] + '/key.json', 'wb') as f:
      #          f.write(obj2json(user_client))
    #    elif action == "search": #add general search term, receipt...
     #       return await archive(user_client["name"], "general", "")
     #   elif action == "publish":
      #      level = user_client["level"] #md item
       #     sub = user_client["sub"] #new edit delete
        #    doc = user_client["doc"]
         #   path = USER_DATA + name + '/doc/' + doc
          #  if user_client["private"] == "yes":
           #     private = "x"
         #   else:
          #      private = ""
          #  if level == "md": 
           #     if sub == "new":
            #        if not os.path.exists(path):
             #           os.mkdir(path)
       #             with open(path + '/md' + private, 'wb') as f:
        #                f.write(data["doc"])
          #          filename = data['upload'].filename
          #          input_file = data['upload'].file
           #         content = input_file.read() #check file sizes?
         #           with open(os.path.join(path + '/item' + private, filename), 'wb') as f:
         #               f.write(content)
        #        elif sub == "edit":
        #            with open(path + '/md' + private, 'wb') as f:
        #                f.write(data["doc"])
       #         elif action == "delete":
      #              shutil.rmtree(path)
     #       elif level == "item":
   #             item = user_client["item"]
     #           if sub == "new":
  #                 filename = data['upload'].filename
  #                  input_file = data['upload'].file
           #         content = input_file.read() #check file sizes?
          #          with open(os.path.join(path + '/item' + private, filename), 'wb') as f:
         #               f.write(content)
        #        elif sub == "edit":
       #             filename = data['upload'].filename
      #              input_file = data['upload'].file
     #               content = input_file.read() #check file sizes?
    #                with open(os.path.join(path + '/item' + private, filename), 'wb') as f:
   #                     f.write(content)
  #              elif sub == "delete":
 #                   shutil.rmtree(path)
#
     #   return web.Response(text=obj2josn(await(scrub(user_server)), content_type='text/html'))

import stripe
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
async def bank(request):
    #data = json.loads(await request.json())
    intent = stripe.PaymentIntent.create(amount=1499, currency='usd')
    secret = intent['client_secret']
    return web.Response(text='{"clientSecret":"'+secret+'"}')

    #elif action == "pay": #datetime.now().strftime("%d/%m/%Y %H:%M:%S")
     #       transaction = "random" #generate uuid
      #      with open(RECEIPT_DATA + user_client["name"] + transaction, 'wb') as f:
       #         f.write(obj2json(user_client))

# mail
import threading, email, uuid, smtplib, base64, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_RELAY = "smtp.google.com"
SMTP_LOGIN = ""
SMTP_PASSWORD = ""
SMTP_EMAIL = ""

def sendMail(to, subject, template, parameters):
    context = ssl.create_default_context()

    with smtplib.SMTP(SMTP_RELAY, 587) as server:
        server.starttls(context=context)
        server.login(SMTP_LOGIN, SMTP_PASSWORD)
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = SMTP_EMAIL
        message["To"] = to
        message_template = template #HEADER + template + FOOTER
        for parameter in parameters:
            message_template = message_template.replace('####', parameter)
        part1 = MIMEText(message_template, "plain")
        part2 = MIMEText(message_template, "html")
        message.attach(part1)
        message.attach(part2)
        server.send_message(message)

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
    app.add_routes([web.post('/cash', cash)])

    app.add_routes([web.get('/', index)])

    app.add_routes([web.get('/user/{name}/{action}', user)])

    app.add_routes([web.get('/{name}', index)])
    app.add_routes([web.get('/{name}/{doc}', doc)])
    app.add_routes([web.get('/{name}/{doc}/{item}', doc)])
    #app.add_routes([web.get('/{domain}/{user}/{doc}/{item}', doc)])
    
    app.add_routes([web.post('/data', data)])

    app.add_routes([web.post('/search/{name}', search)])
    
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
