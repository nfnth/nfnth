#!/bin/bash

openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem

COUNTER=0
COMMAND=""
#echo $COUNTER
#mv /etc/ssl/openssl.cnf /etc/ssl/openssl.cnf.old
cp openssl.cnf openssl.cnf.tmp
sed -i '$ d' openssl.cnf.tmp

while IFS= read -r line;do
  fields=($(printf "%s" "$line"|cut -d'|' --output-delimiter=' ' -f1-))
  let COUNTER++
  #command "${fields[1]}" -x "${fields[2]}" ... # ${fields[1]} is field 2
  
  echo "DNS."$COUNTER" = "${fields[0]} >> openssl.cnf.tmp #/etc/ssl/openssl.cnf
  foo="${foo} World"
  COMMAND="${COMMAND} -d ${fields[0]}"
  if (( $COUNTER % 100 == 0 )); then
    cp openssl.cnf.tmp /etc/ssl/openssl.cnf
    echo $COMMAND
    openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=Nfnth/OU=House/CN=${fields[0]}
    certbot certonly -w /root/test/nfnth $COMMAND --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
    COMMAND=""
    rm 0000_cert.pem
    #mv openssl.cnf.tmp $COUNTER.cnf
    cp openssl.cnf openssl.cnf.tmp
    sed -i '$ d' openssl.cnf.tmp
  fi
done < manifest

sudo -E bash -c 'cat ecc-privkey.pem >> alldomains.pem'

#sudo -E bash -c 'cat 0000_cert.pem 0001_cert.pem 0002_cert.pem 0003_cert.pem 0004_cert.pem 0005_cert.pem 0006_cert.pem ecc-privkey.pem > /etc/haproxy/cert/multi000.pem
