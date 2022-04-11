#!/bin/bash
# script to build client

scratch="no" #[yes|no], build from scratch?
drive="/dev/sda" #installation drive
drived="" #secondary drive, i.e. use 'p' for /dev/mmcblk0p1
partuuid=$(blkid -o export "${drive}${drived}"2 | grep PARTUUID)

password="ocur1234" #root password
user_name="ocur"
user_password="ocur1234"

#packages...
client="linux linux-firmware syslinux mkinitcpio edk2-shell efibootmgr gptfdisk nano vim iwd dhcpcd xorg-server xorg-xinit xorg-xrandr xorg-xdpyinfo xorg-xinput xterm feh lxde-common lxdm lxsession openbox alsa-utils picom firefox kate" #chromium
arch="arch-install-scripts dosfstools"

timezone="America/Los_Angeles"
host="ocuros"

server_ip="66.228.39.50"
server_password=""

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
    
    #cp -r /root/nfnth /mnt/root/nfnth
    #cp -r config /mnt/root
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
elif [[ "$1" == "client" ]]
then
    install
else
    base
fi


#ip link set $(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g') down
#systemctl set-default graphical.target

#ln -sT /usr/share/zoneinfo/${timezone} /etc/localtime # -sf ?

#xenv="env DISPLAY=:0 XAUTHORITY=/home/my_name/.Xauthority"
    # button map before
    #$xenv /usr/bin/xinput

    # fbida ipw2100-fw ipw2200-fw dnsmasq mozilla-common
    # gptfdisk
    #  noto-fonts noto-fonts-extra noto-fonts-emoji
    #minimize above packages...?
    # not used anymore... firefox intel-ucode base base-devel amd-ucode memtest86+ tor vi vim-minimal

    #systemctl enable org.cups.cupsd.service #https://localhost:631, user: root, password: root password, use lp or lpr?
    #cnijfilter-ip110 ... from aur.archlinux.org
    #cups cups-filters ghostscript

#lsof -i -P -n

#        env MOZ_USE_XINPUT2=1 firefox
#...about settings?

#nano git parted arch-install-scripts b43-fwcutter bind-tools broadcom-wl btrfs-progs xorg-xhost xf86-video-intel clonezilla crda darkhttpd ddrescue diffutils dmraid dosfstools ethtool exfat-utils f2fs-tools fsarchiver gnu-netcat gpm
#gptfdisk grml-zsh-config haveged hdparm irssi jfsutils kitty-terminfo lftp linux-atm lsscsi lvm2 lynx man-db man-pages mc mdadm mkinitcpio-archiso mkinitcpio-nfs-utils mtools nbd ndisc6 nfs-utils nilfs-utils nmap ntfs-3g nvme-cli openconnect openvpn partclone partimage ppp pptpclient reflector reiserfsprogs rp-pppoe rxvt-unicode-terminfo sdparm sg3_utils smartmontools sudo systemd-resolvconf tcpdump
#terminus-font termite-terminfo testdisk usb_modeswitch usbutils vpnc wireless-regdb wireless_tools wvdial xfsprogs xl2tpd zsh alsa-utils
#archiso cmake dialog hostapd hwloc libmicrohttpd mesa mime-types ntp wget dhcp
#feh openscad scons inkscape gimp blender musescore openshot
#bluez bluez-utils, enable bluetooth service, use bluetoothctl to scan/list/pair/connect
#vulkan? sshpass

#ssh-keygen -t rsa -b 4096 -C me@you.com
    #openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    #echo "Port 22" >> /etc/ssh/sshd_config
    #echo "AllowUsers ${user_name}" >> /etc/ssh/sshd_config
    #add public key to /home/user/.ssh/authorized_keys
    #enable PubKey authentication in /etc/ssh/sshd_config (restart service)
    #systemctl enable sshd

#exec ntpd -qg & #hwclock --systohc

#xset -dpms; xset s off & #https://wiki.archlinux.org/index.php/DPMS

#xinput --map-to-output "pointer:Goodix Capacitive TouchScreen" "DSI1"
#picom -b
#exec nohup firefox -url "https://boxb.in" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11 &
#xrandr --output DSI1 --rotate right #--auto --pos 0x0 --primary --output DP1 --auto --pos 3840x0

    #    rsync -aAXxv /boot /mnt/boot
#        cp -vaT /boot /mnt/boot

#        cp -vaT /run/archiso/bootmnt/arch/boot/$(uname -m)/vmlinuz-linux /mnt/boot/vmlinuz-linux
#        cp /run/archiso/bootmnt/shellx64.efi /mnt/boot/shellx64.efi
#        cp -r /run/archiso/bootmnt/EFI /mnt/boot/EFI
#        cp /run/archiso/bootmnt/arch/boot/amd-ucode.img /mnt/boot/amd-ucode.img
#        cp /run/archiso/bootmnt/arch/boot/intel-ucode.img /mnt/boot/intel-ucode.img
#        cp -r /run/archiso/bootmnt/loader /mnt/boot/loader

