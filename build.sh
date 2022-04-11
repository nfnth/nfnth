#!/bin/bash
# script to run as client, server, and/or deploy

scratch="yes" #[yes|no], build from scratch?
drive="/dev/sda" #installation drive
drived="" #secondary drive, i.e. use 'p' for /dev/mmcblk0p1
partuuid=$(blkid -o export "${drive}${drived}"2 | grep PARTUUID)

password="ocur1234" #root password
user_name="ocur"
user_password="ocur1234"

#packages...
client="linux linux-firmware syslinux mkinitcpio edk2-shell efibootmgr gptfdisk nano vim iwd dhcpcd xorg-server xorg-xinit xorg-xrandr xorg-xdpyinfo xorg-xinput xterm feh lxde-common lxdm lxsession openbox alsa-utils picom firefox kate" #chromium
server="gcc haproxy certbot python python-pip" #git glibc
python="aiohttp asyncio aiosmtpd web3 acme certbot"
#av aiortc #opencv-python object-mapper #pip install --upgrade pip
arch="arch-install-scripts dosfstools"

timezone="America/Los_Angeles"
host="ocuros"

server_ip="66.228.39.50"
server_password=""

install="yes" #yes
cert="yes" #yes
domain="ocur.io"

#station <wlan> connect <network> --password
base() {
    parted -s ${drive} mklabel gpt mkpart primary fat32 1 300M mkpart primary ext2 300M 100% set 1 esp on

    mkfs.vfat ${drive}${drived}1
    mkfs.ext4 ${drive}${drived}2

    mount ${drive}${drived}2 /mnt
    mkdir /mnt/boot
    mount ${drive}${drived}1 /mnt/boot

    if [[ "${scratch}" == "yes" ]]
    then
        pacstrap /mnt base base-devel
    elif [[ "${scratch}" == "no" ]]
    then
        rsync -aAXxv --exclude="mnt" --exclude="boot" / /mnt #cp -ax / /mnt
        rm /mnt/etc/fstab
    fi

    cp -vaT /boot /mnt/boot #rsync -aAXxv /boot /mnt/boot

    genfstab -U /mnt >> /mnt/etc/fstab
    
    cp -r /root/nfnth /mnt/root/nfnth
    cp -r config /mnt/root
    cp "$0" /mnt/root/build.sh

    if [[ "${scratch}" == "yes" ]]
    then
        arch-chroot /mnt /root/build.sh install
    elif [[ "${scratch}" == "no" ]]
    then
        arch-chroot /mnt /root/build.sh boot
    fi

    umount /mnt/boot
    umount /mnt
}

install() {
    pacman -Sy --noconfirm pacman-mirrorlist archlinux-keyring #pacman -Syy #pacman -Syu && pacman-key --refresh-keys
    pacman -Sy --noconfirm ${client}

    server
    cp /root/config/haproxy.cfg.client /etc/haproxy/haproxy.cfg
    systemctl enable haproxy
    systemctl start haproxy

    useradd -m -g users -G wheel ${user_name}
    echo -en "${user_password}\n${user_password}" | passwd ${user_name}
    echo -en "${password}\n${password}" | passwd #passwd -d ${user_name} # if root install/from git is needed

    echo "${user_name} ALL=(ALL:ALL) ALL" >> /etc/sudoers
    echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
    
    echo "localhost  dralun.com" >> /etc/hosts
    timedatectl set-timezone ${timezone}
    timedatectl set-ntp true
    hwclock --systohc
    mv /usr/bin/lxpolkit /usr/bin/lxpolkit_old

    echo "kernel.printk = 3 3 3 3" >> /etc/sysctl.d/20-quiet-printk.conf
    systemctl enable systemd-resolved
    systemctl enable systemd-networkd
    systemctl enable dhcpcd
    systemctl enable iwd

    #cat > /etc/systemd/network/20-wireless.network <<EOF
#Address=${ip}
#EOF

    amixer sset Master unmute #amixer set Master 50+

    sed -i "s/#XXXX/nohup firefox > \/dev\/null 2>&1 &/g" /root/config/start.sh
    #sed -i "s/#XXXX/nohup chromium 'http:\/\/localhost:5001' --test-type --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > \/dev\/null 2>&1 & disown &/g" /root/config/start.sh
    #sed -i "s/twm/exec \/root\/config\/start.sh /g" /etc/X11/xinit/xinitrc
    #sleep 5

    cp /root/config/ocuros.service /etc/systemd/system/ocuros.service
    chmod +x /root/config/ocuros.sh
    systemctl enable ocuros

    boot
}

server() {
    pacman --noconfirm -Sy --overwrite ${server}
    curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3
    pip3 install ${python} -U

    cp /root/nfnth/res/sh/config/url.service /etc/systemd/system/url.service
    systemctl enable url
    systemctl start url
}

boot() {
    hostnamectl set-hostname ${host}
    mkdir /etc/systemd/system/getty@tty1.service.d
    cp /root/config/skip-prompt.conf /etc/systemd/system/getty@tty1.service.d/skip-prompt.conf
    
    mv /boot/loader/entries/archiso-x86_64-linux.conf /boot/loader/entries/archiso-x86_64-linux.conf.old
    mv /boot/syslinux/syslinux.cfg /boot/syslinux/syslinux.cfg.old
    mv /etc/mkinitcpio.conf /etc/mkinitcpio.conf.old
    
    cp /root/config/linux.conf /boot/loader/entries/archiso-x86_64-linux.conf
    cp /root/config/syslinux.cfg /boot/syslinux/syslinux.cfg
    cp /root/config/mkinitcpio.conf /etc/mkinitcpio.conf
    
    sed -i "s/root=XXXX/root=${partuuid}/g" /boot/loader/entries/archiso-x86_64-linux.conf
    sed -i "s/root=XXXX/root=${partuuid}/g" /boot/syslinux/syslinux.cfg

    mkinitcpio -P
    syslinux-install_update -i -a -m
}

prep() {
    tar -C /root -czf deployment.tar.gz nfnth
    sshpass -p ${server_password} scp deployment.tar.gz root@${server_ip}:/root #-r for folder
    sshpass -p ${server_password} scp $0 root@${server_ip}:/root
    #sshpass -p ${data_password} scp deployment.tar.gz root@${data_ip}:/root #-r for folder
    #sshpass -p ${data_password} scp $0 root@${data_ip}:/root
    rm deployment.tar.gz
    #ssh-agent bash -c 'ssh-add /somewhere/yourkey; /root/build.sh server' tar -xzvf archive.tar.gz
}

run() {
    rm -r /root/nfnth
    tar -xzf deployment.tar.gz
}

site() {
    wget -O "test.js" "https://polyfill.io/v3/polyfill.min.js?features=es6" "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.js" "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" "https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/2.5.1/mapbox-gl.js" "https://cdn.jsdelivr.net/npm/mapbox-gl-animated-popup@latest/dist/mapbox-gl-animated-popup.min.js" "https://unpkg.com/html5-qrcode" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/pbkdf2.js" "https://cdn.rawgit.com/takahirox/nes-js/v0.0.1/build/nes.min.js" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js" "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5827375595551722" #three.js? ext.js?

    wget -O "test.css" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css" #materialize.min.css mapbox-gl.css ext.css?
}

domain() {
    openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    cp /root/nfnth/res/sh/config/openssl.cnf /etc/ssl/openssl.cnf

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

    #echo $COMMAND
    openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=ocur.io/OU=House/CN=${domain} #${fields[0]}
    certbot certonly -d ${domain} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
    rm 0000_cert.pem

    sudo -E bash -c 'cat ecc-privkey.pem >> alldomains.pem'
    cp alldomains.pem /etc/haproxy/cert/alldomains.pem
    rm alldomains.pem
    rm ecc-csr.pem
    rm ecc-privkey.pem

    #rm /etc/haproxy/coredomains.pem
    #domain
    #sudo certbot certonly --standalone --preferred-challenges http -d example.com
}

if [[ "$1" == "deploy" ]]
then
    prep
    sshpass -p ${server_password} ssh root@${server_ip} 'chmod +x /root/build.sh'
    sshpass -p ${server_password} ssh root@${server_ip} '/root/build.sh run'
    #if [[ "${site}" == "yes" ]]
    #then
    #    sshpass -p ${server_password} ssh root@${server_ip} '/root/build.sh server'
    #fi
elif [[ "$1" == "run" ]]
then
    run
elif [[ "$1" == "server" ]]
then
    server
    mkdir /etc/haproxy/cert
    cp /root/nfnth/res/sh/config/domain /etc/haproxy/domain
    domain
    cp /root/nfnth/res/sh/config/haproxy.cfg /etc/haproxy/haproxy.cfg
    systemctl enable haproxy
    systemctl start haproxy
fi
elif [[ "$1" == "client" ]]
then
    install
else
    base
fi

global
  daemon
  log 127.0.0.1 local0
  log 127.0.0.1 local1 notice
  maxconn 4096
  tune.ssl.default-dh-param 2048

defaults
  log global
  retries 3
  maxconn 2000
  timeout connect 5s
  timeout client 50s
  timeout server 50s
  option forwardfor

frontend site
  bind *:80
  bind *:443 ssl crt /etc/haproxy/cert
  acl hack path_sub php
  http-request deny if hack
  http-request set-header X-Client-IP %[src]
  redirect scheme https if !{ ssl_fc }
  acl app0 hdr(Host) -i ustat.us
  use_backend index if app0
  mode http
  default_backend direct

config() {
cat > /roo.. <<EOF
title   urOS
linux   /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /amd-ucode.img
initrd  /initramfs-linux.img
options root=XXXX quiet vga=current audit=0 loglevel=1 nowatchdog rd.systemd.show_status=0 rd.udev.log_priority=3 vt.global_cursor_default=0
EOF

cat > /root/config/haproxy.cfg <<EOF
    global
    daemon
    log 127.0.0.1 local0
    log 127.0.0.1 local1 notice
    maxconn 4096
    tune.ssl.default-dh-param 2048
  
    defaults
    log global
    retries 3
    maxconn 2000
    timeout connect 5s
    timeout client 50s
    timeout server 50s
    option forwardfor
  
    frontend site
    bind *:80
    bind *:443 ssl crt /etc/haproxy/cert
    #bind *:443 ssl crt /etc/haproxy/alldomains.pem
    acl hack path_sub php
    http-request deny if hack
    http-request set-header X-Client-IP %[src]
    redirect scheme https if !{ ssl_fc }
    mode http
    default_backend index
  
    backend index
    mode http
    balance roundrobin
    server app1 localhost:5001
  
    #frontend mail
    #bind *:25
    #  bind *:587 ssl crt /etc/haproxy/cert/alldomains.pem
    #  mode tcp
    #  default_backend box
  
    #backend box
    #  mode tcp
    #  server app2 localhost:5002
    
defaults
  log global
  retries 3
  maxconn 2000
  timeout connect 5s
  timeout client 50s
  timeout server 50s
  option forwardfor

frontend site
  bind *:80
  acl hack path_sub php
  http-request deny if hack
  http-request set-header X-Client-IP %[src]
  #redirect scheme https if !{ ssl_fc }
  mode http
  default_backend index

backend index
  mode http
  balance roundrobin
  server app1 localhost:5001
 
global
  daemon
  log 127.0.0.1 local0
  log 127.0.0.1 local1 notice
  maxconn 4096
  tune.ssl.default-dh-param 2048

defaults
  log global
  retries 3
  maxconn 2000
  timeout connect 5s
  timeout client 50s
  timeout server 50s
  option forwardfor

frontend site
  bind *:80
  bind *:443 ssl crt /etc/haproxy/cert
  acl hack path_sub php
  http-request deny if hack
  http-request set-header X-Client-IP %[src]
  redirect scheme https if !{ ssl_fc }
  acl app0 hdr(Host) -i ustat.us
  use_backend index if app0
  mode http
  default_backend direct

backend index
  mode http
  balance roundrobin
  server app1 localhost:5001

backend direct
  mode http
  http-request redirect code 301 location https://ustat.us/%[hdr(host)]
  
global
  daemon
  log 127.0.0.1 local0
  log 127.0.0.1 local1 notice
  maxconn 4096
  tune.ssl.default-dh-param 2048

defaults
  log global
  retries 3
  maxconn 2000
  timeout connect 5s
  timeout client 50s
  timeout server 50s
  option forwardfor

frontend site
  bind *:80
  bind *:443 ssl crt /etc/haproxy/cert
  acl hack path_sub php
  http-request deny if hack
  http-request set-header X-Client-IP %[src]
  redirect scheme https if !{ ssl_fc }
  acl app0 hdr(Host) -i ustat.us
  use_backend index if app0
  mode http
  default_backend direct
EOF

cat > 
title   urOS
linux   /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /amd-ucode.img
initrd  /initramfs-linux.img
options root=XXXX quiet vga=current audit=0 loglevel=1 nowatchdog rd.systemd.show_status=0 rd.udev.log_priority=3 vt.global_cursor_default=0

MODULES=()
BINARIES=()
FILES=()
HOOKS=(base udev autodetect block filesystems keyboard)
COMPRESSION="xz"

#
# OpenSSL example configuration file.
# This is mostly being used for generation of certificate requests.
#

# Note that you can include other files from the main configuration
# file using the .include directive.
#.include filename

# This definition stops the following lines choking if HOME isn't
# defined.
HOME			= .

# Extra OBJECT IDENTIFIER info:
#oid_file		= $ENV::HOME/.oid
oid_section		= new_oids

# To use this configuration file with the "-extfile" option of the
# "openssl x509" utility, name here the section containing the
# X.509v3 extensions to use:
# extensions		=
# (Alternatively, use a configuration file that has only
# X.509v3 extensions in its main [= default] section.)

[ new_oids ]

# We can add new OIDs in here for use by 'ca', 'req' and 'ts'.
# Add a simple OID like this:
# testoid1=1.2.3.4
# Or use config file substitution like this:
# testoid2=${testoid1}.5.6

# Policies used by the TSA examples.
tsa_policy1 = 1.2.3.4.1
tsa_policy2 = 1.2.3.4.5.6
tsa_policy3 = 1.2.3.4.5.7

####################################################################
[ ca ]
default_ca	= CA_default		# The default ca section

####################################################################
[ CA_default ]

dir		= /etc/ssl		# Where everything is kept
certs		= $dir/certs		# Where the issued certs are kept
crl_dir		= $dir/crl		# Where the issued crl are kept
database	= $dir/index.txt	# database index file.
#unique_subject	= no			# Set to 'no' to allow creation of
					# several certs with same subject.
new_certs_dir	= $dir/newcerts		# default place for new certs.

certificate	= $dir/cacert.pem 	# The CA certificate
serial		= $dir/serial 		# The current serial number
crlnumber	= $dir/crlnumber	# the current crl number
					# must be commented out to leave a V1 CRL
crl		= $dir/crl.pem 		# The current CRL
private_key	= $dir/private/cakey.pem# The private key

x509_extensions	= usr_cert		# The extensions to add to the cert

# Comment out the following two lines for the "traditional"
# (and highly broken) format.
name_opt 	= ca_default		# Subject Name options
cert_opt 	= ca_default		# Certificate field options

# Extension copying option: use with caution.
# copy_extensions = copy

# Extensions to add to a CRL. Note: Netscape communicator chokes on V2 CRLs
# so this is commented out by default to leave a V1 CRL.
# crlnumber must also be commented out to leave a V1 CRL.
# crl_extensions	= crl_ext

default_days	= 365			# how long to certify for
default_crl_days= 30			# how long before next CRL
default_md	= default		# use public key default MD
preserve	= no			# keep passed DN ordering

# A few difference way of specifying how similar the request should look
# For type CA, the listed attributes must be the same, and the optional
# and supplied fields are just that :-)
policy		= policy_match

# For the CA policy
[ policy_match ]
countryName		= match
stateOrProvinceName	= match
organizationName	= match
organizationalUnitName	= optional
commonName		= supplied
emailAddress		= optional

# For the 'anything' policy
# At this point in time, you must list all acceptable 'object'
# types.
[ policy_anything ]
countryName		= optional
stateOrProvinceName	= optional
localityName		= optional
organizationName	= optional
organizationalUnitName	= optional
commonName		= supplied
emailAddress		= optional

####################################################################
[ req ]
default_bits		= 2048
default_keyfile 	= privkey.pem
distinguished_name	= req_distinguished_name
attributes		= req_attributes
x509_extensions	= v3_ca	# The extensions to add to the self signed cert

# Passwords for private keys if not present they will be prompted for
# input_password = secret
# output_password = secret

# This sets a mask for permitted string types. There are several options.
# default: PrintableString, T61String, BMPString.
# pkix	 : PrintableString, BMPString (PKIX recommendation before 2004)
# utf8only: only UTF8Strings (PKIX recommendation after 2004).
# nombstr : PrintableString, T61String (no BMPStrings or UTF8Strings).
# MASK:XXXX a literal mask value.
# WARNING: ancient versions of Netscape crash on BMPStrings or UTF8Strings.
string_mask = utf8only

req_extensions = v3_req # The extensions to add to a certificate request

[ req_distinguished_name ]
countryName			= Country Name (2 letter code)
countryName_default		= AU
countryName_min			= 2
countryName_max			= 2

stateOrProvinceName		= State or Province Name (full name)
stateOrProvinceName_default	= Some-State

localityName			= Locality Name (eg, city)

0.organizationName		= Organization Name (eg, company)
0.organizationName_default	= Internet Widgits Pty Ltd

# we can do this but it is not needed normally :-)
#1.organizationName		= Second Organization Name (eg, company)
#1.organizationName_default	= World Wide Web Pty Ltd

organizationalUnitName		= Organizational Unit Name (eg, section)
#organizationalUnitName_default	=

commonName			= Common Name (e.g. server FQDN or YOUR name)
commonName_max			= 64

emailAddress			= Email Address
emailAddress_max		= 64

# SET-ex3			= SET extension number 3

[ req_attributes ]
challengePassword		= A challenge password
challengePassword_min		= 4
challengePassword_max		= 20

unstructuredName		= An optional company name

[ usr_cert ]

# These extensions are added when 'ca' signs a request.

# This goes against PKIX guidelines but some CAs do it and some software
# requires this to avoid interpreting an end user certificate as a CA.

basicConstraints=CA:FALSE

# Here are some examples of the usage of nsCertType. If it is omitted
# the certificate can be used for anything *except* object signing.

# This is OK for an SSL server.
# nsCertType			= server

# For an object signing certificate this would be used.
# nsCertType = objsign

# For normal client use this is typical
# nsCertType = client, email

# and for everything including object signing:
# nsCertType = client, email, objsign

# This is typical in keyUsage for a client certificate.
# keyUsage = nonRepudiation, digitalSignature, keyEncipherment

# This will be displayed in Netscape's comment listbox.
nsComment			= "OpenSSL Generated Certificate"

# PKIX recommendations harmless if included in all certificates.
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid,issuer

# This stuff is for subjectAltName and issuerAltname.
# Import the email address.
# subjectAltName=email:copy
# An alternative to produce certificates that aren't
# deprecated according to PKIX.
# subjectAltName=email:move

# Copy subject details
# issuerAltName=issuer:copy

#nsCaRevocationUrl		= http://www.domain.dom/ca-crl.pem
#nsBaseUrl
#nsRevocationUrl
#nsRenewalUrl
#nsCaPolicyUrl
#nsSslServerName

# This is required for TSA certificates.
# extendedKeyUsage = critical,timeStamping

[ v3_req ]

# Extensions to add to a certificate request
subjectAltName = @alt_names
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment

[ v3_ca ]


# Extensions for a typical CA


# PKIX recommendation.

subjectKeyIdentifier=hash

authorityKeyIdentifier=keyid:always,issuer

basicConstraints = critical,CA:true

# Key usage: this is typical for a CA certificate. However since it will
# prevent it being used as an test self-signed certificate it is best
# left out by default.
# keyUsage = cRLSign, keyCertSign

# Some might want this also
# nsCertType = sslCA, emailCA

# Include email address in subject alt name: another PKIX recommendation
# subjectAltName=email:copy
# Copy issuer details
# issuerAltName=issuer:copy

# DER hex encoding of an extension: beware experts only!
# obj=DER:02:03
# Where 'obj' is a standard or added object
# You can even override a supported extension:
# basicConstraints= critical, DER:30:03:01:01:FF

[ crl_ext ]

# CRL extensions.
# Only issuerAltName and authorityKeyIdentifier make any sense in a CRL.

# issuerAltName=issuer:copy
authorityKeyIdentifier=keyid:always

[ proxy_cert_ext ]
# These extensions should be added when creating a proxy certificate

# This goes against PKIX guidelines but some CAs do it and some software
# requires this to avoid interpreting an end user certificate as a CA.

basicConstraints=CA:FALSE

# Here are some examples of the usage of nsCertType. If it is omitted
# the certificate can be used for anything *except* object signing.

# This is OK for an SSL server.
# nsCertType			= server

# For an object signing certificate this would be used.
# nsCertType = objsign

# For normal client use this is typical
# nsCertType = client, email

# and for everything including object signing:
# nsCertType = client, email, objsign

# This is typical in keyUsage for a client certificate.
# keyUsage = nonRepudiation, digitalSignature, keyEncipherment

# This will be displayed in Netscape's comment listbox.
nsComment			= "OpenSSL Generated Certificate"

# PKIX recommendations harmless if included in all certificates.
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid,issuer

# This stuff is for subjectAltName and issuerAltname.
# Import the email address.
# subjectAltName=email:copy
# An alternative to produce certificates that aren't
# deprecated according to PKIX.
# subjectAltName=email:move

# Copy subject details
# issuerAltName=issuer:copy

#nsCaRevocationUrl		= http://www.domain.dom/ca-crl.pem
#nsBaseUrl
#nsRevocationUrl
#nsRenewalUrl
#nsCaPolicyUrl
#nsSslServerName

# This really needs to be in place for it to be a proxy certificate.
proxyCertInfo=critical,language:id-ppl-anyLanguage,pathlen:3,policy:foo

####################################################################
[ tsa ]

default_tsa = tsa_config1	# the default TSA section

[ tsa_config1 ]

# These are used by the TSA reply generation only.
dir		= /etc/ssl		# TSA root directory
serial		= $dir/tsaserial	# The current serial number (mandatory)
crypto_device	= builtin		# OpenSSL engine to use for signing
signer_cert	= $dir/tsacert.pem 	# The TSA signing certificate
					# (optional)
certs		= $dir/cacert.pem	# Certificate chain to include in reply
					# (optional)
signer_key	= $dir/private/tsakey.pem # The TSA private key (optional)
signer_digest  = sha256			# Signing digest to use. (Optional)
default_policy	= tsa_policy1		# Policy if request did not specify it
					# (optional)
other_policies	= tsa_policy2, tsa_policy3	# acceptable policies (optional)
digests     = sha1, sha256, sha384, sha512  # Acceptable message digests (mandatory)
accuracy	= secs:1, millisecs:500, microsecs:100	# (optional)
clock_precision_digits  = 0	# number of digits after dot. (optional)
ordering		= yes	# Is ordering defined for timestamps?
				# (optional, default: no)
tsa_name		= yes	# Must the TSA name be included in the reply?
				# (optional, default: no)
ess_cert_id_chain	= no	# Must the ESS cert id chain be included?
				# (optional, default: no)
ess_cert_id_alg		= sha1	# algorithm to compute certificate
				# identifier (optional, default: sha1)

[ alt_names ]



[Service]
ExecStart=
ExecStart=-/usr/bin/agetty --skip-login --nonewline --noissue --autologin bro --noclear %I $TERM

PROMPT 0
TIMEOUT 0
TOTALTIMEOUT 0
DEFAULT ocuros
LABEL ocuros
    LINUX ../vmlinuz-linux
    APPEND root=XXXX rw quiet vga=791 loglevel=3 rd.systemd.show_status=0 rd.udev.log_priority=3 vt.global_cursor_default=0
    INITRD ../initramfs-linux.img

[Unit]
Description=ocur.io
[Service]
ExecStart=/usr/bin/python3 /root/nfnth/res/site.py
Type=idle
[Install]
WantedBy=multi-user.target

[Unit]
Description=ocurOS
[Service]
ExecStart=startx
Type=idle
[Install]
WantedBy=multi-user.target


}
