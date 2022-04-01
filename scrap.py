
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
