#!/bin/bash
# script to build, run from /root/os

drive="/dev/sda" #installation drive
drived="" #secondary drive, i.e. use 'p' for /dev/mmcblk0p1

uuid=$(blkid -o export "${drive}${drived}"2 | sed -ne 's/^UUID=//p')
partuuid=$(blkid -o export "${drive}${drived}"2 | grep PARTUUID)

password="nfnth" #root password
user_name="nfnth"
user_password="nfnth"

#packages...
client="linux linux-firmware syslinux mkinitcpio edk2-shell efibootmgr gptfdisk nano vim iwd dhcpcd wayland weston firefox"
#xorg-server xorg-xinit xorg-xrandr xorg-xdpyinfo xorg-xinput xterm feh lxde-common lxdm lxsession openbox alsa-utils picom firefox kate" #chromium
arch="arch-install-scripts dosfstools"
#mkinitcpio-archiso ppp pptpclient terminus-font archiso cmake mesa mime-types ntp wget dhcp feh openscad inkscape gimp blender musescore openshot vulkan? sshpass noto-fonts noto-fonts-extra noto-fonts-emoji intel-ucode amd-ucode tor vi vim-minimal

server="gcc haproxy certbot python python-pip glibc" #git glibc
python="aiohttp asyncio" #web3 aiosmtpd acme certbot" #av aiortc #opencv-python object-mapper

timezone="America/Los_Angeles"
host="nfnth"

#wifi_adapter=$(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g')
wifi_id=""
wifi_password=""

base() {
    parted -s ${drive} mklabel gpt mkpart primary fat32 1 300M mkpart primary ext2 300M 100% set 1 esp on

    mkfs.vfat ${drive}${drived}1
    mkfs.ext4 ${drive}${drived}2

    mount ${drive}${drived}2 /mnt
    mkdir /mnt/boot
    mount ${drive}${drived}1 /mnt/boot

    pacstrap /mnt base base-devel
    #rsync -aAXxv --exclude="mnt" --exclude="boot" / /mnt #cp -ax / /mnt
    #rm /mnt/etc/fstab

    cp -vaT /boot /mnt/boot #rsync -aAXxv /boot /mnt/boot
    #cp -vaT /run/archiso/bootmnt/arch/boot/$(uname -m)/vmlinuz-linux /mnt/boot/vmlinuz-linux
    #cp /run/archiso/bootmnt/shellx64.efi /mnt/boot/shellx64.efi
    #cp -r /run/archiso/bootmnt/EFI /mnt/boot/EFI
    #cp /run/archiso/bootmnt/arch/boot/amd-ucode.img /mnt/boot/amd-ucode.img
    #cp /run/archiso/bootmnt/arch/boot/intel-ucode.img /mnt/boot/intel-ucode.img
    #cp -r /run/archiso/bootmnt/loader /mnt/boot/loader

    genfstab -U /mnt >> /mnt/etc/fstab
    
    cp -r os /mnt/root/os
    #cp -r config /mnt/root
    cp "$0" /mnt/root/build.sh

    arch-chroot /mnt /root/build.sh install
    #    arch-chroot /mnt /root/build.sh boot

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
    
    echo "localhost  ${host}.com" >> /etc/hosts
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
    mkdir /root/.config
    cp /root/os/weston.ini /root/.config/weston.ini
    #sed -i "s/twm/exec \/root\/res\/ocur.sh /g" /etc/X11/xinit/xinitrc
    #chmod +x /root/res/ocur.sh
    #sleep 5

    cp /root/os/nf.service /etc/systemd/system/nf.service
    systemctl enable nf

    boot
    
    #) go to /usr/share/applications // search for firefox
}

boot() {
    hostnamectl set-hostname ${host}
    mkdir /etc/systemd/system/getty@tty1.service.d
    cp /root/os/skip-prompt.conf /etc/systemd/system/getty@tty1.service.d/skip-prompt.conf
    
    cp /root/os/linux.conf /boot/loader/entries/archiso-x86_64-linux.conf
    cp /root/os/syslinux.cfg /boot/syslinux/syslinux.cfg
    cp /root/os/mkinitcpio.conf /etc/mkinitcpio.conf
    
    sed -i "s/root=XXXX/root=UUID=${uuid}/g" /boot/loader/entries/archiso-x86_64-linux.conf
    sed -i "s/root=XXXX/root=UUID=${uuid}/g" /boot/syslinux/syslinux.cfg

    mkinitcpio -P
    syslinux-install_update -i -a -m
}

server() {
    pacman --noconfirm -Sy --overwrite ${server}
    curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3
    pip install --upgrade pip
    pip3 install ${python} -U

    cp /root/os/res/nth.service /etc/systemd/system/nth.service
    systemctl enable nth
    systemctl start nth
}

domain() {
    openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    cp /root/os/res/openssl.cnf /etc/ssl/openssl.cnf
    
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
            cp /root/os/res/openssl.cnf /etc/ssl/openssl.cnf

            echo "Continue?"
            read input < /dev/tty
        fi
    done < /root/os/res/domain
    
    #echo "DNS.01 = "${domain} >> /etc/ssl/openssl.cnf
    echo $COMMAND
    openssl req -new -sha256 -key ecc-privkey.pem -nodes -outform pem -out ecc-csr.pem -subj /C=US/ST=Washington/L=Seattle/O=nfnth.com/OU=House/CN=${fields[0]}
    certbot certonly ${COMMAND} --email m@nfnth.com --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    #certbot certonly -d ${domain} --email matt@sebolt.us --csr ecc-csr.pem --agree-tos --non-interactive --standalone
    sudo -E bash -c 'cat 0000_cert.pem >> alldomains.pem'

    sudo -E bash -c 'cat ecc-privkey.pem >> alldomains.pem'
    cp alldomains.pem /etc/haproxy/cert/alldomains.pem
    rm 0000_cert.pem
    rm alldomains.pem
    rm ecc-csr.pem
    rm ecc-privkey.pem
}

if [[ "$1" == "install" ]]
then
    install
elif [[ "$1" == "domain" ]]
then
    mkdir /etc/haproxy/cert
    domain
    #cp /root/os/res/haproxy.cfg /etc/haproxy/haproxy.cfg
    systemctl enable haproxy
    systemctl start haproxy
elif [[ "$1" == "server" ]]
then
    server
else
    base
fi
