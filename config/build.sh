#!/bin/bash
source="on" #on|off
boot="disk" #iso|disk

drive="/dev/sda"
drived="" #p
partuuid=$(blkid -o export "${drive}${drived}"2 | grep PARTUUID)

password="temp1234"
user_name="bit"
user_password="temp1234" #hash?

client="linux linux-firmware syslinux mkinitcpio edk2-shell efibootmgr gptfdisk vim iwd dhcp xorg-server xorg-xinit xorg-xrandr xterm chromium" #wayland wayfire labwc-git hikari dwl
#nano git parted arch-install-scripts b43-fwcutter bind-tools broadcom-wl btrfs-progs xorg-xhost xf86-video-intel
#clonezilla crda darkhttpd ddrescue diffutils dmraid dosfstools ethtool exfat-utils f2fs-tools fsarchiver gnu-netcat gpm 
#gptfdisk grml-zsh-config haveged hdparm irssi jfsutils kitty-terminfo lftp linux-atm linux-firmware lsscsi lvm2 lynx man-db man-pages mc mdadm 
#mkinitcpio-archiso mkinitcpio-nfs-utils mtools nbd ndisc6 nfs-utils nilfs-utils nmap ntfs-3g nvme-cli openconnect openvpn partclone partimage 
#ppp pptpclient reflector reiserfsprogs rp-pppoe rxvt-unicode-terminfo sdparm sg3_utils smartmontools sudo systemd-resolvconf tcpdump 
#terminus-font termite-terminfo testdisk usb_modeswitch usbutils vpnc wireless-regdb wireless_tools wvdial xfsprogs xl2tpd zsh alsa-utils 
#archiso cmake dhcp dialog hostapd hwloc libmicrohttpd mesa mime-types ntp wget onboard openbox lxde-common lxdm lxsession 
#feh openscad scons inkscape gimp blender musescore openshot
#bluez bluez-utils, enable bluetooth service, use bluetoothctl to scan/list/pair/connect

server="haproxy certbot python python-pip git"
python="aiohttp asyncio aiosmtpd" #av aiortc opencv-python

timezone=""
host="bitos"

wifi_adapter=$(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g')
wifi_id=""
wifi_password=""

mail_address="a@b.com"
mail_server="mail.x.com"
mail_password="temp1234"

client_ip="192.168.1.126"
domain="dralun.com" #name|bulk
mode="setup" #setup|deploy
bulk="off" #off|on

base() {
    parted -s ${drive} mklabel gpt mkpart primary fat32 1 300M mkpart primary ext2 300M 100% set 1 esp on

    mkfs.vfat ${drive}${drived}1
    mkfs.ext4 ${drive}${drived}2

    mount ${drive}${drived}2 /mnt
    mkdir /mnt/boot
    mount ${drive}${drived}1 /mnt/boot

    if [[ "${source}" == "on" ]]
    then
        pacstrap /mnt base base-devel
    elif [[ "${source}" == "off" ]]
    then
        cp -ax / /mnt
        rm /mnt/etc/fstab
    fi

    if [[ "${boot}" == "disk" ]]
    then
        cp -vaT /boot /mnt/boot
    elif [[ "${boot}" == "iso" ]]
    then
        cp -vaT /run/archiso/bootmnt/arch/boot/$(uname -m)/vmlinuz-linux /mnt/boot/vmlinuz-linux
        cp /run/archiso/bootmnt/shellx64.efi /mnt/boot/shellx64.efi
        cp -r /run/archiso/bootmnt/EFI /mnt/boot/EFI
        cp /run/archiso/bootmnt/arch/boot/amd-ucode.img /mnt/boot/amd-ucode.img
        cp /run/archiso/bootmnt/arch/boot/intel-ucode.img /mnt/boot/intel-ucode.img
        cp -r /run/archiso/bootmnt/loader /mnt/boot/loader
    fi

    genfstab -U /mnt >> /mnt/etc/fstab
    
    cp "$0" /mnt/root/build.sh
    if [[ "${source}" == "on" ]]
    then
        arch-chroot /mnt /root/build.sh install
    elif [[ "${source}" == "off" ]]
    then
        arch-chroot /mnt /root/build.sh boot
    fi

    umount /mnt/boot
    umount /mnt
}

install() {
    pacman -Sy --noconfirm pacman-mirrorlist
    pacman -Syy
    pacman -Syu
    pacman -Sy --noconfirm ${client}
    
    useradd -m -g users -G wheel ${user_name} # passwd -d $USER_NAME, if root install/from git is needed
    echo -en "${password}\n${password}" | passwd
    echo -en "${user_password}\n${user_password}" | passwd ${user_name}
    echo "${user_name} ALL=(ALL:ALL) ALL" >> /etc/sudoers
    echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
    
    ssh-keygen -t rsa -b 4096 -C me@you.com
    openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    echo "Port 22" >> /etc/ssh/sshd_config
    echo "AllowUsers ${user_name}" >> /etc/ssh/sshd_config
    #add public key to /home/user/.ssh/authorized_keys
    #enable PubKey authentication in /etc/ssh/sshd_config (restart service)
    systemctl enable sshd

    #echo "localhost  dralun.com" >> /etc/hosts
    systemctl enable systemd-resolved
    systemctl enable systemd-networkd
    systemctl enable dhcpcd
    systemctl enable iwd

    #cat > /etc/systemd/network/20-wireless.network <<EOF
#Address=${ip}
#EOF
    iwctl --passphrase ${wifi_password} station ${wifi_adapter} connect ${wifi_id} #optional, wifi

    cat > /usr/bin/bitos <<EOF #/etc/X11/?/xinitrc
#!/bin/bash
startx
xrandr --output DSI1 --rotate right #--auto --pos 0x0 --primary --output DP1 --auto --pos 3840x0
xinput --map-to-output "pointer:Goodix Capacitive TouchScreen" "DSI1"
picom -b
nohup python /root/dralun/site/run.py & disown & #> /dev/null 2>&1 & disown &
sleep 2
nohup chromium "http://localhost:5001" --test-type --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > /dev/null 2>&1 & disown &
#exec nohup firefox -url "https://boxb.in" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11 &
feh --bg-center /root/spash.png --image-bg black
#exec ntpd -qg & #hwclock --systohc
#exec nohup xterm -geometry 120x120+200+200 -e 'chromium "http://localhost:4444" --no-sandbox' > /dev/null 2>&1 & disown &
EOF
    
    cat > /etc/systemd/system/bitos.service <<EOF
[Unit]
Description=bitos
[Service]
ExecStart=/usr/bin/bitos -n
Type=idle
[Install]
WantedBy=graphical.target
EOF
    
    chmod +x /usr/bin/bitos
    systemctl enable bitos.service

    boot
}

boot() {
    hostnamectl set-hostname ${host}
    
    mv /boot/loader/entries/archiso-x86_64-linux.conf /boot/loader/entries/archiso-x86_64-linux.conf.old
    mv /boot/syslinux/syslinux.cfg /boot/syslinux/syslinux.cfg.old

    cat > /boot/loader/entries/archiso-x86_64-linux.conf <<EOF
title   bitOS
linux   /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /amd-ucode.img
initrd  /initramfs-linux.img
options root=XXXX quiet vga=current audit=0 loglevel=1 nowatchdog rd.systemd.show_status=0 rd.udev.log_priority=3 vt.global_cursor_default=0
EOF

    cat > /boot/syslinux/syslinux.cfg <<EOF
PROMPT 0
TIMEOUT 0
TOTALTIMEOUT 0
DEFAULT bitos
LABEL bitos
    LINUX ../vmlinuz-linux
    APPEND root=XXXX rw quiet vga=791 loglevel=3 rd.systemd.show_status=0 rd.udev.log_priority=3 vt.global_cursor_default=0
    INITRD ../initramfs-linux.img
EOF

    sed -i "s/root=XXXX/root=${partuuid}/g" /boot/loader/entries/archiso-x86_64-linux.conf
    sed -i "s/root=XXXX/root=${partuuid}/g" /boot/syslinux/syslinux.cfg

    mv /etc/mkinitcpio.conf /etc/mkinitcpio.conf.old
    
    cat > /etc/mkinitcpio.conf <<EOF
MODULES=()
BINARIES=()
FILES=()
HOOKS=(base udev autodetect block filesystems keyboard)
COMPRESSION="xz"
EOF

    mkinitcpio -P
    syslinux-install_update -i -a -m
}

deploy() {
    if [[ "${mode}" == "setup" ]]
    then
        pacman -Sy --overwrite --noconfirm \* ${server}
        pip3 install ${python} -U #pip3 install ${python}
        
        cat > /etc/haproxy/haproxy.cfg <<EOF
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
  bind *:443 ssl crt /etc/haproxy/cert/multi000.pem
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
  
frontend mail
  bind *:25
  #bind *:587 ssl crt /etc/haproxy/certs/urland.pem
  mode tcp
  default_backend box
  
backend box
  mode tcp
  server app2 localhost:5002

EOF
        openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
        openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem
        if [[ "${bulk}" == "on" ]]
        then
            while IFS=, read -r col1 col2
            do
                echo "I got:$col1|$col2"
                certbot certonly -w /root/cert -d ${domain} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
                sed -i '$ d' foo.txt
                echo $col1 >> /etc/ssl/openssl.cnf
            done < manifest
            sudo -E bash -c 'cat 0000_cert.pem ecc-privkey.pem > /etc/haproxy/cert/multi000.pem'
        fi
        certbot certonly -w /root/cert -d ${domain} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
        sudo -E bash -c 'cat 0000_cert.pem ecc-privkey.pem > /etc/haproxy/cert/multi000.pem'
        #sudo -E bash -c 'cat 0000_cert.pem 0001_cert.pem 0002_cert.pem 0003_cert.pem 0004_cert.pem 0005_cert.pem 0006_cert.pem ecc-privkey.pem > /etc/haproxy/cert/multi000.pem
        #certbot certonly -w /root/cert -d abder.us -d www.abder.us --email pot@ladl.co --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    elif [[ "${mode}" == "deploy" ]]
    then
        killall -9 run.py
        systemctl stop haproxy
    fi

    #tar -czvf name-of-archive.tar.gz /path/to/directory-or-file
    #scp file.txt username@to_host:/remote/directory/
    #ssh-agent bash -c 'ssh-add /somewhere/yourkey; /root/build.sh server' tar -xzvf archive.tar.gz
    
    systemctl start haproxy
    #nohup python /root/nfnth/run.py > /dev/null 2>&1 & disown & #exec?
}

if [[ "$1" == "install" ]]
then
    install
elif [[ "$1" == "deploy" ]]
then
    deploy
else
    base
fi
