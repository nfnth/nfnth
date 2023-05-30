#!/bin/sh

ip="192.168.254.50"
domain="$2"

deploy() {
    #pkill -f "python3"
    rsync -r --delete --exclude 'res' /root/hold/ocur root@${ip}:/root
    #python3 /root/ocur/app.py > /dev/null 2>&1 &
}

domain() {
    openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    cp /root/ocur/res/os/openssl.cnf /etc/ssl/openssl.cnf
    echo "DNS.0 = "${domain} >> /etc/ssl/openssl.cnf
    openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=nfnth.com/OU=House/CN=${domain}
    certbot certonly -d ${domain} --email f@nfnth.com --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    cat 0000_cert.pem >> ${domain}.pem
    cat ecc-privkey.pem >> ${domain}.pem
    mv ${domain}.pem /etc/haproxy/cert/${domain}.pem
    rm 0000_cert.pem
    rm 0000_chain.pem
    rm 0001_chain.pem
    #rm alldomains.pem
    rm ecc-csr.pem
    rm ecc-privkey.pem
}

#data() {
#	rsync -r root@${am}:/mnt/data /mnt/data
#	rsync -r root@${eu}:/mnt/data /mnt/data
#    rsync -r root@${as}:/mnt/data /mnt/data
#}

if [[ "$1" == "domain" ]]
then
    /etc/init.d/haproxy stop
    domain
    /etc/init.d/haproxy start
    /usr/sbin/varnishd -F -a :5050 -T localhost:6082 -f /etc/varnish/varnish.vcl -s malloc,256m > /dev/null 2>&1 &
elif [[ "$1" == "route" ]]
then
    /etc/init.d/haproxy stop
    scp root@${am}:/etc/haproxy/cert/domain.pem /etc/haproxy/cert/domain.pem
    /etc/init.d/haproxy start
elif [[ "$1" == "deploy" ]]
then
	deploy
else
    echo "no option selected"
fi
