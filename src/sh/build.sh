#!/bin/bash

source="on" #on|off
boot="disk" #iso|disk

drive="/dev/sda"
drived="" #p
partuuid=$(blkid -o export "${drive}${drived}"2 | grep PARTUUID)

password="temp1234"
user_name="mario"
user_password="temp1234"

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
#vulkan?

timezone=""
host="bros"

wifi_adapter=$(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g')
wifi_id=""
wifi_password=""

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

    boot
}

boot() {
    hostnamectl set-hostname ${host}
    
    mv /boot/loader/entries/archiso-x86_64-linux.conf /boot/loader/entries/archiso-x86_64-linux.conf.old
    mv /boot/syslinux/syslinux.cfg /boot/syslinux/syslinux.cfg.old
    mv /etc/mkinitcpio.conf /etc/mkinitcpio.conf.old
    
    cp linux.conf /boot/loader/entries/archiso-x86_64-linux.conf
    cp syslinux.cfg /boot/syslinux/syslinux.cfg
    cp mkinitcpio.conf /etc/mkinitcpio.conf
    
    sed -i "s/root=XXXX/root=${partuuid}/g" /boot/loader/entries/archiso-x86_64-linux.conf
    sed -i "s/root=XXXX/root=${partuuid}/g" /boot/syslinux/syslinux.cfg

    mkinitcpio -P
    syslinux-install_update -i -a -m
}

if [[ "$1" == "install" ]]
then
    install
else
    base
fi

#live feed/file attachment/user profile back to index...
#add image maker ISO download...
 #ip link set $(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g') down
#systemctl set-default graphical.target

#ln -sT /usr/share/zoneinfo/${timezone} /etc/localtime # -sf ?
    #timedatectl set-timezone ${timezone}
    #timedatectl set-ntp true 
    #    cat > /etc/systemd/system/getty@tty1.service.d/skip-prompt.conf <<EOF
#[Service]
#ExecStart=
#ExecStart=-/usr/bin/agetty --skip-login --nonewline --noissue --autologin username --noclear %I $TERM
#ExecStart=-/usr/bin/agetty --skip-login --login-options "-f usernamehere" %I 38400 linux
#EOF
    #boot menu still shows?
    #amixer sset Headphone unmute

    #cat /boot/loader/loader.conf ...set timeout to 0...
#Run systemctl edit getty@tty1 and replace the contents with:

#xenv="env DISPLAY=:0 XAUTHORITY=/home/my_name/.Xauthority"
    # button map before
    #$xenv /usr/bin/xinput

    #pacman-key --init
    #pacman-key --populate archlinux # pacman -S archlinux-keyring for bad keys...

    # fbida ipw2100-fw ipw2200-fw dnsmasq mozilla-common
    # gptfdisk
    #  noto-fonts noto-fonts-extra noto-fonts-emoji
    #minimize above packages...?
    # not used anymore... firefox intel-ucode base base-devel amd-ucode memtest86+ tor vi vim-minimal 

    #systemctl enable org.cups.cupsd.service #https://localhost:631, user: root, password: root password, use lp or lpr?
    #cnijfilter-ip110 ... from aur.archlinux.org
    #cups cups-filters ghostscript

#lsof -i -P -n        
 #       xset -dpms; xset s off &https://wiki.archlinux.org/index.php/DPMS
        
#        env MOZ_USE_XINPUT2=1 firefox
#...about settings? 

    chmod +x /usr/bin/bros
    systemctl enable bros.service
    #nohup python /root/nfnth/run.py > /dev/null 2>&1 & disown & #exec?
