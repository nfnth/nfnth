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


#async def tree(request):
#    area = request.match_info.get('area', 'wallet') #domain
#    ref = request.match_info.get('ref', '')
#    path = PUBLIC + '/' + area + '/' + ref
#    f = []
#    for (dirpath, dirnames, filenames) in walk(path):
#        f.extend(filenames)
#        break
     
#    return web.Response(text=f,content_type="text/html")

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
            
#route = request.match_info.get('route', '')
#start_new_thread(world, path)
#request.app['locked'] = False
#print ("{" + datetime.now().strftime("%d/%m/%Y %H:%M:%S") + "," + request.remote + "}" + NAME)
