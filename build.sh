#!/bin/bash
# script to build, run from /root

drive="/dev/loop0" #/dev/sda" #installation drive, /dev/loop0 for image
drived="p" #secondary drive, i.e. use 'p' for /dev/mmcblk0p1 or /dev/loop0p1

uuid=$(blkid -o export "${drive}${drived}"2 | sed -ne 's/^UUID=//p')
partuuid=$(blkid -o export "${drive}${drived}"2 | grep PARTUUID)
fileuuid=""
network="on" #off
image="on" #off

password="mattos" #root password
user_name="matt"
user_password="mattos"

#packages... noto-fonts-emoji?
client="linux linux-firmware syslinux mkinitcpio edk2-shell efibootmgr gptfdisk nano vim geany iwd dhcpcd wayland weston firefox sudo" #ffmpeg
#xorg-server xorg-xinit xorg-xrandr xorg-xdpyinfo xorg-xinput xterm feh lxde-common lxdm lxsession openbox alsa-utils picom kate" #chromium
arch="arch-install-scripts dosfstools"
#mkinitcpio-archiso ppp pptpclient terminus-font archiso mesa mime-types ntp wget dhcp openscad inkscape gimp blender musescore openshot vulkan? sshpass noto-fonts noto-fonts-extra noto-fonts-emoji intel-ucode amd-ucode tor 
#chromium --enable-features=UseOzonePlatform --ozone-platform=wayland --no-sandbox

server="gcc haproxy certbot python python-pip glibc cmake python3 rsync" #git
python="aiohttp asyncio web3" #aiosmtpd acme certbot" #av aiortc #opencv-python object-mapper python-whois

timezone="America/Los_Angeles"
host="urland"
dev="45.79.17.105"
prod="45.56.82.109"
static="162.216.17.113"
sync="on"

#wifi_adapter=$(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g')
wifi_id=""
wifi_password=""

base() {
	if [[ "${image}" == "on" ]]
	then
	    dd if=/dev/zero of=disk.img bs=1M count=4000 && sync
	    losetup --partscan --find --show disk.img
    fi

    parted -s ${drive} mklabel gpt mkpart primary fat32 1 300M mkpart primary ext2 300M 100% set 1 esp on
    
    mkfs.vfat ${drive}${drived}1
    mkfs.ext4 ${drive}${drived}2

    mount ${drive}${drived}2 /mnt
    mkdir /mnt/boot
    mount ${drive}${drived}1 /mnt/boot
    
    cp -vaT /boot /mnt/boot 

    if [[ "${network}" == "on" ]]
    then
        pacman -Sy --noconfirm pacman-mirrorlist archlinux-keyring
        pacstrap /mnt base base-devel
        #mkdir /mnt/root/desk
        cp -r os /mnt/root
        cp "$0" /mnt/root/build.sh
        arch-chroot /mnt /root/build.sh install
    else
        rsync -aAXxv --exclude="mnt" --exclude="boot" / /mnt #cp -ax / /mnt
        rm /mnt/etc/fstab
    fi
    
    genfstab -U /mnt >> /mnt/etc/fstab
    arch-chroot /mnt /root/build.sh boot
    
    umount /mnt/boot
    umount /mnt
    
    if [[ "${image}" == "on" ]]
    then
        losetup -d ${drive}
    fi
}

install() {
	#pacman -Syy
	#pacman -Syu
    #pacman -Sy --noconfirm pacman-mirrorlist archlinux-keyring #pacman -Syy #pacman -Syu && pacman-key --refresh-keys
    #pacman -Syu --noconfirm && pacman-key --refresh-keys
    #pacman -Syy
    #pacman -Syu
    pacman -Sy --noconfirm ${client}

    useradd -m -g users -G wheel ${user_name}
    echo -en "${user_password}\n${user_password}" | passwd ${user_name}
    echo -en "${password}\n${password}" | passwd #passwd -d ${user_name} # if root install/from git is needed

    echo "${user_name} ALL=(ALL:ALL) ALL" >> /etc/sudoers
    echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
    
    echo "localhost  ${host}.com" >> /etc/hosts
    timedatectl set-timezone ${timezone}
    timedatectl set-ntp true
    hwclock --systohc

    echo "kernel.printk = 3 3 3 3" >> /etc/sysctl.d/20-quiet-printk.conf
    systemctl enable systemd-resolved
    systemctl enable systemd-networkd
    systemctl enable dhcpcd
    systemctl enable iwd

    #cat > /etc/systemd/network/20-wireless.network <<EOF
#Address=${ip}
#EOF
    mkdir /root/.config
    cp /root/os/weston.ini /root/.config/weston.ini

    cp /root/os/ur.service /etc/systemd/system/ur.service
    systemctl enable ur
    cp /root/os/ur.sh /etc/profile.d/ur.sh
    #chmod +x /root/.config/autostart/nf.sh
    
    #) go to /usr/share/applications // search for firefox
}

boot() {
    hostnamectl set-hostname ${host}
    mkdir /etc/systemd/system/getty@tty1.service.d
    cp /root/os/skip-prompt.conf /etc/systemd/system/getty@tty1.service.d/skip-prompt.conf
    
    cp /root/os/linux.conf /boot/loader/entries/archiso-x86_64-linux.conf
    cp /root/os/syslinux.cfg /boot/syslinux/syslinux.cfg
    cp /root/os/mkinitcpio.conf /etc/mkinitcpio.conf
    
    #sed -i "s/root=XXXX/root=${partuuid}/g" /boot/loader/entries/archiso-x86_64-linux.conf #UUID=
    #sed -i "s/root=XXXX/root=${partuuid}/g" /boot/syslinux/syslinux.cfg #UUID=
    sed -i "s/root=XXXX/root=UUID=${uuid}/g" /boot/loader/entries/archiso-x86_64-linux.conf #UUID=
    sed -i "s/root=XXXX/root=UUID=${uuid}/g" /boot/syslinux/syslinux.cfg #UUID=

    mkinitcpio -P
    syslinux-install_update -i -a -m
}

server() {
	pacman -Sy --noconfirm pacman-mirrorlist archlinux-keyring
    pacman --noconfirm -Sy --overwrite ${server}
    curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3
    pip install --upgrade pip
    pip3 install ${python} -U

    cp /root/os/land.service /etc/systemd/system/land.service
    systemctl enable land
    systemctl start land
}

domain() {
    openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    cp /root/desk/os/openssl.cnf /etc/ssl/openssl.cnf
    
    COUNTER=0
    COMMAND=""
    while IFS= read -r line;do
        fields=($(printf "%s" "$line"|cut -d'|' --output-delimiter=' ' -f1-))
        let COUNTER++
        echo "DNS."$COUNTER" = "${fields[0]} >> /etc/ssl/openssl.cnf
        COMMAND="${COMMAND} -d ${fields[0]}"

        if (( $COUNTER % 100 == 0 )); then
            echo $COMMAND
            openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=nfnth.com/OU=House/CN=${fields[0]}
            certbot certonly ${COMMAND} --email m@nfnth.com --csr ecc-csr.pem --agree-tos --non-interactive --standalone
            sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'
            COMMAND=""
            rm 0000_cert.pem
            rm 0000_chain.pem
            cp /root/desk/os/openssl.cnf /etc/ssl/openssl.cnf

            echo "Continue?"
            read input < /dev/tty
        fi
    done < /root/desk/os/manifest
    
    #echo "DNS.01 = "${domain} >> /etc/ssl/openssl.cnf
    echo $COMMAND
    openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=ur.land/OU=House/CN=${fields[0]}
    certbot certonly ${COMMAND} --email o@ur.land --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    #certbot certonly -d ${domain} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'

    sudo -E bash -c 'cat ecc-privkey.pem >> alldomains.pem'
    cp alldomains.pem /etc/haproxy/cert/alldomains.pem
    rm 0000_cert.pem
    rm 0000_chain.pem
    rm alldomains.pem
    rm ecc-csr.pem
    rm ecc-privkey.pem
}

deploy() {
	if [[ "${sync}" == "on" ]]
    then
        rsync -r --delete --exclude 'os/manifest' /root/desk root@${target}:/root
    else
        scp -r /root/desk root@${target}:/root
    fi
}

target=${dev}
if [[ "$2" == "static" ]]
then
	target=${static}
elif [[ "$2" == "prod" ]]
then
	target=${prod}
fi

if [[ "$1" == "install" ]]
then
    install
elif [[ "$1" == "boot" ]]
then
    boot
elif [[ "$1" == "domain" ]]
then
	systemctl stop haproxy
    domain
    systemctl restart haproxy
elif [[ "$1" == "server" ]]
then
    server
    mkdir /etc/haproxy/cert
    cp /root/desk/os/haproxy.cfg /etc/haproxy/haproxy.cfg
    systemctl enable haproxy
    systemctl start haproxy
elif [[ "$1" == "deploy" ]]
then
	deploy
else
    base
fi


#exec nohup python /root/dralun/site/run.py > /dev/null 2>&1 & disown &

#prep() {
#    tar -C /root -czf deployment.tar.gz nfnth
#    rm deployment.tar.gz
    #ssh-agent bash -c 'ssh-add /somewhere/yourkey; /root/build.sh server' tar -xzvf archive.tar.gz
#}

#run() {
#    rm -r /root/nfnth
#    tar -xzf deployment.tar.gz
#}

#site() {
#    wget -O "test.js" "https://polyfill.io/v3/polyfill.min.js?features=es6" "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.js" "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" "https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/2.5.1/mapbox-gl.js" "https://cdn.jsdelivr.net/npm/mapbox-gl-animated-popup@latest/dist/mapbox-gl-animated-popup.min.js" "https://unpkg.com/html5-qrcode" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/pbkdf2.js" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js" #three.js? ext.js?
 #   wget -O "test.css" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css" #materialize.min.css mapbox-gl.css ext.css?
#}

    #ip link set $(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g') down

    #ssh-keygen -t rsa -b 4096 -C me@you.com
    #openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    #echo "Port 22" >> /etc/ssh/sshd_config
    #echo "AllowUsers ${user_name}" >> /etc/ssh/sshd_config
    #add public key to /home/user/.ssh/authorized_keys
    #enable PubKey authentication in /etc/ssh/sshd_config (restart service)
    #systemctl enable sshd

    #amixer sset Master unmute #amixer set Master 50+
#sed -i "s/#XXXX/nohup chromium 'http:\/\/localhost:5001' --test-type --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > \/dev\/null 2>&1 & disown &/g" /root/config/start.sh

#about:support (profiles) (config)
#MOZ_ENABLE_WAYLAND=1 /usr/bin/firefox --kiosk
