server="haproxy certbot python python-pip git"
python="aiohttp asyncio aiosmtpd" #av aiortc opencv-python object-mapper webkit pywebview pyotp tensorflow pytorch aiohttp_session numpy-stl 

deploy() {
        cd /root/nfnth
        git pull origin master

        pacman -Sy --overwrite --noconfirm \* ${server}
        pip3 install ${python} -U #pip3 install ${python}
        
        cp /root/nfnth/src/sh/haproxy.cfg /etc/haproxy/haproxy.cfg
        cp /root/nfnth/src/sh/brs.service /etc/systemd/system/brs.service
    
        if [[ "$1" == "domain" ]]
        then
            domain
        fi

        systemctl restart haproxy
        systemctl restart brs.service
}

domain() {
        openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
        cp /root/nfnth/src/sh/openssl.cnf /etc/ssl/openssl.cnf

        COUNTER=0
        COMMAND=""
        while IFS= read -r line;do
            fields=($(printf "%s" "$line"|cut -d'|' --output-delimiter=' ' -f1-))
            let COUNTER++
            echo "DNS."$COUNTER" = "${fields[0]} >> /etc/ssl/openssl.cnf
            COMMAND="${COMMAND} -d ${fields[0]}"
                
            if (( $COUNTER % 100 == 0 )); then
                echo $COMMAND
                openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=Nfnth/OU=House/CN=${fields[0]}
                certbot certonly ${COMMAND} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
                sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
                COMMAND=""
                rm 0000_cert.pem
                cp /root/nfnth/src/sh/openssl.cnf /etc/ssl/openssl.cnf

                echo "Continue?"
                read input </dev/tty
            fi
        done < /root/nfnth/src/manifest

        echo $COMMAND
        openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=Nfnth/OU=House/CN=${fields[0]}
        certbot certonly ${COMMAND} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
        sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
        rm 0000_cert.pem

        sudo -E bash -c 'cat ecc-privkey.pem >> alldomains.pem'
        cp alldomains.pem /etc/haproxy/cert/alldomains.pem
        #sudo certbot certonly --standalone --preferred-challenges http -d example.com
}

if [[ "$1" == "domain" ]]
then
    deploy
else
    deploy
fi

#tar -xzvf archive.tar.gz
#scp localmachine/path_to_the_file username@server_ip:/path_to_remote_directory #-r for folder
#tar -czvf name-of-archive.tar.gz /path/to/directory-or-file
#scp file.txt username@to_host:/remote/directory/
#ssh-agent bash -c 'ssh-add /somewhere/yourkey; /root/build.sh server' tar -xzvf archive.tar.gz
