import uuid
import random
import requests
import json

file_in = "/root/nfnth/in"
file_out = "/root/nfnth/out"
#string_to_add = '|' + str(uuid.uuid4())

#with open(file_name, 'r') as f:
#    file_lines = [''.join([x.strip(), '|' + str(uuid.uuid4()), '\n']) for x in f.readlines()]
#    file_lines = [''.join([x.strip(), '|' + str(random.randrange(11111, 999999, 1)) + ', ' + str(random.randrange(1111, 4111, 1) / 100), '\n']) for x in f.readlines()]

with open(file_in, "rt") as fin:
    with open(file_out, "wt") as fout:
        for line in fin:
            if (line.count("|") == 1):
                fout.write(line.strip() + str(uuid.uuid4()) + "|" + str(random.randrange(11111, 999999, 1)) + ', ' + str(random.randrange(1111, 4111, 1) / 100) + '\n')
            else:
                fout.write(line)

#with open(file_name, 'w') as f:
#    f.writelines(str(uuid.uuid4()) + "|" + str(random.randrange(11111, 999999, 1)) + ', ' + str(random.randrange(1111, 4111, 1) / 100))

#url = "https://api.opensea.io/api/v1/asset/0x495f947276749Ce646f68AC8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132039895328162316289"
# use these headers
#headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36','referrer':url}#, "X-Api-Key": config["OPENSEA_API_KEY"]}
#params = {'owner' : wallet, 'offset': offset, 'limit': limit}
#params = {}
#response = requests.get(url, params=params, headers=headers)
#print(response)
#if response.status_code == 200:
    #print (response.json())


# mail
import threading, email, uuid, smtplib, base64, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_RELAY = "smtp.google.com"
SMTP_LOGIN = ""
SMTP_PASSWORD = ""
SMTP_EMAIL = ""
TEMPLATES = ""

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

import threading, email, uuid, smtplib, base64, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from aiosmtpd.controller import Controller

##(server)
class MailHandler():
    async def handle_RCPT(self, server, session, envelope, address, rcpt_options):
        if not address.endswith('@ur.land'): #use variable...
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

async def mail(port):
    controller = Controller(MailHandler(), hostname='localhost', port=5000+port)
    controller.start()


#import requests
#endpoint = ".../api/ip"
#data = {"ip": "1.1.2.3"}
#headers = {"Authorization": "Bearer MYREALLYLONGTOKENIGOT"}
#print(requests.post(endpoint, data=data, headers=headers).json())


#"gypsum" J(Py)SON
#with open(PATH + '/res/data/wallet.json', mode='r') as wallet_file:
#    wallet_template = wallet_file.read()
def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

#user = await request.post()
#key = user['key']

It can be opened with OpenCV like this:

capture = cv2.VideoCapture('rtsp://192.168.1.64/1')
Most of the IP cameras have a username and password to access the video. In such case, the credentials have to be provided in the streaming URL as follows:

capture = cv2.VideoCapture('rtsp://username:password@192.168.1.64/1')

https://python.plainenglish.io/capture-and-process-video-footage-from-a-webcam-using-opencv-python-9e3c5585da0c

Before we start, a few definitions that I will use throughout this post:

coroutine: A running asynchronous function. So if you define a function as async def f(): ... and call it as f(), you get back a coroutine in the sense that the term is used throughout this post.
awaitable: anything that works with await: coroutines, asyncio.Futures, asyncio.Tasks, objects that have a __await__ method.
I will be using two async functions f and g for my examples. It’s not important what they do, only that they are defined as async def f(): ... and async def g(): ... and that they terminate eventually.
await
The simplest case is to await your coroutines:

result_f = await f()
result_g = await g()

done, pending = await asyncio.wait([task_f, task_g])

for t in done:
    try:
        if t is task_f:
            print(f"The result of f() is { await task_f }.")
    except Exception as e:
        print(f"f() failed with { repr(e) }.")

# ...and same for g()

async def pdf(request):
    action = request.match_info.get('action', 'check')

    if action == "build":
        temp_uuid = str(uuid.uuid4())
        temp_command = ["chromium", "--headless", "--disable-gpu", "--no-sandbox", "--print-to-pdf=" + temp_uuid + ".pdf", "https://" + request.host]
        process = subprocess.Popen(temp_command)

        return web.Response(text=temp_uuid, content_type="text/html")
    else:
        temp_uuid = request.match_info.get('id', 'temp')
        if action == "check":
            if os.path.isfile(temp_uuid + ".pdf"):
                return web.Response(text="yes", content_type="text/html")
            else:
                return web.Response(text="no", content_type="text/html")
        elif action == "download":
            return web.FileResponse(temp_uuid + '.pdf')

                app.add_routes([web.get('/pdf/{action}/{id}', pdf)])
            
import random
if random.randint(0,1) == 0:
