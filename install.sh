#!/bin/bash
# script to install server

server="gcc haproxy certbot python python-pip" #git glibc
python="aiohttp asyncio aiosmtpd web3 acme certbot"
#av aiortc #opencv-python object-mapper #pip install --upgrade pip
domain="ocur.io"

server() {
    pacman --noconfirm -Sy --overwrite ${server}
    curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3
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
