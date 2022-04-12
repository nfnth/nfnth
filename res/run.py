
#!/usr/bin/env python
import os, socket, json, types, six
from datetime import datetime
#from subprocess import call

SMTP_RELAY = "relay.dynu.com" #switch to dralun.me
SMTP_LOGIN = "relay@relay.servius.me"
SMTP_PASSWORD = "Treeop4714!"
SMTP_EMAIL = "serv@servius.me"

NAME = socket.getfqdn()
IP = socket.gethostbyname(NAME)
DATA = os.pardir + "/data/"
PATH = os.path.abspath(os.path.dirname(__file__))
REL = os.getcwd()

# public
async def index(request):
    return web.FileResponse(PATH + '/index.htm')

async def doc(request):
    domain = request.match_info.get('domain', 'urland')
    address = request.match_info.get('address', 'home')
    doc = request.match_info.get('doc', 'profile')
    return web.FileResponse(DATA + domain + '/' + address + '/' + doc)

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
    address = user_client["address"]
    message = user_client["message"]
    signature = user_client["signature"]
    action = user_client["action"]

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

    app.router.add_static('/static', PATH + '/res')

    app.add_routes([web.get('/', index)])
    app.add_routes([web.get('/{name}', index)])
    app.add_routes([web.get('/{domain}/{address}/{doc}', doc)])
    
    app.add_routes([web.post('/data', data)])

    app.add_routes([web.post('/search/{name}', search)])
    
    runner = web.AppRunner(app)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    await runner.setup()

    site = web.TCPSite(runner, 'localhost', 5000+port)
    await site.start()

async def mail(port):
    controller = Controller(MailHandler(), hostname='localhost', port=5000+port)
    controller.start()

try:
    loop = asyncio.get_event_loop()
    executor = ProcessPoolExecutor(max_workers=14)
    loop.run_in_executor(executor, run, site, 1) #from haproxy
    loop.run_in_executor(executor, run, mail, 2)

    loop.run_forever()
except:
    pass
finally:
    for runner in runners:
        loop.run_until_complete(runner.cleanup())

#search transactions, search folders, reconcile
#...make payments and/or flag...
#...publish listing (owner/tenant/squatter)

#https://monerodocs.org/interacting/monerod-reference/#transactions

#https://monerodocs.org/interacting/monero-wallet-rpc-reference/#verify

#https://monerodocs.org/interacting/monero-wallet-cli-reference/#balance