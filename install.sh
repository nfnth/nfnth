#!/bin/bash
# script to install server

server="gcc haproxy certbot python python-pip glibc" #git glibc
python="aiohttp asyncio" #web3 aiosmtpd acme certbot" #av aiortc #opencv-python object-mapper
domain="ocur.io"

server() {
    pacman --noconfirm -Sy --overwrite ${server}
    curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3
    pip install --upgrade pip
    pip3 install ${python} -U

    cp res/ocur.service /etc/systemd/system/ocur.service
    systemctl enable ocur
    systemctl start ocur
    
    cp res/haproxy.cfg /etc/haproxy/haproxy.cfg
    systemctl enable haproxy
    systemctl start haproxy
}

domain() {
    openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    cp openssl.cnf /etc/ssl/openssl.cnf
    
    #COUNTER=0
    #COMMAND=""
    #while IFS= read -r line;do
    #    fields=($(printf "%s" "$line"|cut -d'|' --output-delimiter=' ' -f1-))
    #    let COUNTER++
    #    echo "DNS."$COUNTER" = "${fields[0]} >> /etc/ssl/openssl.cnf
    #    COMMAND="${COMMAND} -d ${fields[0]}"

    #    if (( $COUNTER % 100 == 0 )); then
    #        echo $COMMAND
    #        openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=UR.Land/OU=House/CN=${fields[0]}
    #        certbot certonly ${COMMAND} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    #        sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
    #        COMMAND=""
    #        rm 0000_cert.pem
    #        rm 0000_chain.pem
    #        cp /root/nfnth/res/sh/config/openssl.cnf /etc/ssl/openssl.cnf

    #        echo "Continue?"
    #        read input < /dev/tty
    #    fi
    #done < /etc/haproxy/domain
    
    echo "DNS.01 = "${domain} >> /etc/ssl/openssl.cnf
    openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=ocur.io/OU=House/CN=${domain} #${fields[0]}
    certbot certonly -d ${domain} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
    sudo -E bash -c 'cat ecc-privkey.pem >> alldomains.pem'
    cp alldomains.pem /etc/haproxy/cert/alldomains.pem
    rm 0000_cert.pem
    rm alldomains.pem
    rm ecc-csr.pem
    rm ecc-privkey.pem
}

if [[ "$1" == "domain" ]]
then
    mkdir /etc/haproxy/cert
    domain
else
    server
fi
