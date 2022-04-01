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
server_password="Dralun4714!"

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
#elif [[ "$1" == "client" ]]
#then
#    install
#else
#    base
#fi
