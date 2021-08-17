
import subprocess

command = 'sudo add-apt-repository ppa:ondrej/php'
process = subprocess.Popen(command.split(), stdout=subprocess.PIPE)
output, error = process.communicate()
		     
async def search(request): # user badge with word/definition, domain search
    return web.FileResponse(PATH + '/ur.js') #make "artifact" specific

```
curl -u 'username:token' 'https://api.dev.name.com/v4/domains/example.org/url/forwarding' -X POST -H 'Content-Type: application/json' --data '{"host":"www.example.org","forwardsTo":"https:\/\/www.example.net","type":"redirect"}'

curl -u 'username:token' 'https://api.dev.name.com/v4/domains/example.org/url/forwarding/www.example.org' -X PUT -H 'Content-Type: application/json' --data '{"forwardsTo":"https:\/\/www.example.net","type":"redirect"}'

curl -u 'username:token' 'https://api.dev.name.com/v4/domains/example.org/url/forwarding/www' -X DELETE

curl -u 'username:token' 'https://api.dev.name.com/v4/domains/example.org/email/forwarding' -X POST -H 'Content-Type: application/json' --data '{"emailBox":"admin","emailTo":"webmaster@example.net"}'

curl -u 'username:token' 'https://api.dev.name.com/v4/domains/example.org/email/forwarding/admin' -X PUT -H 'Content-Type: application/json' --data '{"emailTo":"webmaster@example.net"}'

curl -u 'username:token' 'https://api.dev.name.com/v4/domains/example.org/email/forwarding/admin' -X DELETE
```

#py torch?

key_file = open('key.json', mode='r') #include object map...?
key_template = key_file.read()
key_file.close()

def json2obj(data): return json.loads(data, object_hook=lambda d: types.SimpleNamespace(**d))
def obj2json(data): return json.dumps(data.__dict__, indent=4, sort_keys=True, default=lambda o: o.__dict__)

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

https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz

http://images.cocodataset.org/zips/train2017.zip

http://images.cocodataset.org/zips/val2017.zip

http://images.cocodataset.org/zips/test2017.zip

http://images.cocodataset.org/zips/unlabeled2017.zip

http://images.cocodataset.org/annotations/annotations_trainval2017.zip

http://images.cocodataset.org/annotations/stuff_annotations_trainval2017.zip

http://images.cocodataset.org/annotations/panoptic_annotations_trainval2017.zip

http://images.cocodataset.org/annotations/image_info_test2017.zip

http://images.cocodataset.org/annotations/image_info_unlabeled2017.zip

https://storage.googleapis.com/openimages/web/download.html#download_manually

https://www.onvif.org/onvif/ver20/ptz/wsdl/ptz.wsdl

import numpy
from keras.models import Sequential
from keras.layers import Dense, Dropout, FLatten, BatchNormalzation, Activation
from keras.layers.convulational import Conv2D, MaxPooling2D
from keras.constraints import maxnorm
from keras.utils import np_utils

seed = 21
from keras.datasets import cifar10
(x_train, y_train), (x_test, y_test) = cifar10.load_data()
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train = x_train / 255.0
x_test = x_test / 255.0

y_train = np_utils.to_categorically(y_train)
y_test = np_utils.to_categorically(y_test)
class_num = y_test.shape[1]

model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=x_train.shape[1:], padding='same'))
model.add(Activation('relu'))
model.add(Conv2D(32, (3, 3), input_shape=(3, 32, 32), activation='relu', padding='same'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(Conv2D(64, (3, 3), padding='same'))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.2))
model.add(BatchNormalization())

#https://stackoverflow.com/questions/49978705/access-ip-camera-in-python-opencv
#depth/object detection		

#async def user(request):
#    name = request.match_info.get('name', 'matt')
#    action = request.match_info.get('action', 'check')

#    if action == "check":
#        return web.Response(text=str(os.path.exists(DATA + name)), content_type='text/html')
#    elif action == "create":
#        data = await request.post()
#        user_client = json2obj(data["user"])
#        path = DATA + user_client["name"]
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
#    user_template = key_file.read()
    #user_file.close()

 #   return json2obj(user_template)

#async def data(request):
 #   async def doc(request): 
 #   name = request.match_info.get('name', 'matt')
 #   doc = request.match_info.get('doc', 'profile')
 #   item = request.match_info.get('item', '') #file

  #  if item == '':
  #      return web.FileResponse(DATA + name + '/doc/' + doc + '/md')
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
	
#	import stripe
#stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

#async def bank(request):
    #data = json.loads(await request.json())
 #   intent = stripe.PaymentIntent.create(amount=1499, currency='usd')
 #   secret = intent['client_secret']
#    return web.Response(text='{"clientSecret":"'+secret+'"}')

    #elif action == "pay": #datetime.now().strftime("%d/%m/%Y %H:%M:%S")
     #       transaction = "random" #generate uuid
      #      with open(RECEIPT_DATA + user_client["name"] + transaction, 'wb') as f:
       #         f.write(obj2json(user_client))

#import glob, re#, whois
#from random import randrange

#word_path = '/mnt/res/dictionary.txt'
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

#async def stream(request):
    #check feed's page source contains {"text":" watching"}...
    #if not, check rss, https://www.youtube.com/feeds/videos.xml?channel_id=<channel_id>&orderby=published
    #...for latest feed
#    return web.FileResponse(PATH + '/ur.js') #make "artifact" specific
