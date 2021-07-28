
<p align="center">
<img src="https://github.com/nfnth/res/raw/main/site/chimi_hi.png" width="200" height="240" />
</p>

## brOS, simplistic speed, *v1.04*

BrOS is a light, browser-based yet dev-focused, stack based on being easy to use, based on [Arch Linux](https://archlinux.org/).

To get started, download the [Arch Linux ISO](http://mirror.rackspace.com/archlinux/iso/2021.06.01/archlinux-2021.06.01-x86_64.iso).

- To run, download the [brOS ISO](), image, then reboot:

   ```
   wget http://mirror.rackspace.com/archlinux/iso/2021.06.01/archlinux-2021.06.01-x86_64.iso
   dd if=archlinux-2021.06.01-x86_64.iso of=/dev/sda status=progress #fdisk -l #show drives
   #launch BIOS (use Esc, Del, or F1..F12 on restart), then boot to USB/ISO drive...
   ```

- To build, download the script set, adjust parameters, then run:

   ```
   pacman -S git --noconfirm #scp...? wget...?
   git clone https://github.com/nfnth/nfnth
   nano nfnth/build.sh 
   chmod +x nfnth/build.sh
   nfnth/build.sh
   ```
   
After booting into brOS, to use the site application, run `nfnth/build.sh deploy`.

That's it. Enjoy!

<p align="center"><img src="https://github.com/nfnth/res/raw/main/site/chimi_cards.png" width="200" height="200" /></p>

### Additional info

- Script parameters:

   |Parameter|Default|Description|
   |-|-|-|
   |**source**|on|online or offline installation|
   |**boot**|disk|disk or iso installation|
   |**drive**|`/dev/sda`|Installation drive|
   |**drived**|(empty)|Drive part, eg. `/dev/mmcblk0p1` has diskpart of `p`|
   |**host**|bitos|Hostname|
   |**password**|`temp1234`|root password|
   |**user_name**|`bit`|Default user|
   |**user_password**|`temp1234`|user password|
   |**mode**||client or server deployment|
   |**domain**|bit.com|Default site|
   |**ip**|`192.168.1.111`|IP used to assign(client) or deploy(server)|
   |**wifi_id**|||
   |**wifi_password**|||

- Ensure the following ports are open:

   |Port|Function|
   |-|-|
   |80|http *(site)*|
   |443|https *(seure socket layer)*|
   |587|tls *(mail)*|

- How to build hardware and install from scratch... *video coming soon*

   [![fish](https://img.youtube.com/vi/-xMR_x3lYAA/0.jpg)](https://www.youtube.com/watch?v=-xMR_x3lYAA)

- Helpful commands

   ```
   vim <file> #press (i) to insert and make changes, (Esc) to escape, then either :wq (write quit) or :q (quit)
   df, ls -a, du -xhS | sort -h | tail -n15 #file/folder info
   lscpu #hardware info
   grep -R "term" #search
   iwctl #wifi
   ip addr #network
   ping google.com -c 2 #network test
   find /home/username/ -name "*.err"
   #sed 's/.*six.*/fault/' file     # check all lines
   ```

## New features

 🧦🧦.ws https://www.name.com/account/domain/details/xn--wv9ha.ws
 🧤🧤.ws https://www.name.com/account/domain/details/xn--uv9ha.ws
 👣👣.ws https://www.name.com/account/domain/details/xn--lq8ha.ws
 🙂🙂.ws https://www.name.com/account/domain/details/xn--938ha.ws
 👖👖.ws https://www.name.com/account/domain/details/xn--7p8ha.ws
 👓👓.ws https://www.name.com/account/domain/details/xn--4p8ha.ws
 🌳🌳.ws https://www.name.com/account/domain/details/xn--wh8ha.ws
 📚📚.ws https://www.name.com/account/domain/details/xn--zt8ha.ws
 ⚙⚙.ws https://www.name.com/account/domain/details/xn--x7ha.ws
 ♠♠.ws https://www.name.com/account/domain/details/xn--b6ha.ws
 🖱🖱.ws https://www.name.com/account/domain/details/xn--4z8ha.ws
 🐁🐁.ws https://www.name.com/account/domain/details/xn--sn8ha.ws
 🏴🏳.ws https://www.name.com/account/domain/details/xn--en8hb.ws
 🏴🏴.ws https://www.name.com/account/domain/details/xn--fn8ha.ws
 🏳🏳.ws https://www.name.com/account/domain/details/xn--en8ha.ws
 🏳🏴.ws https://www.name.com/account/domain/details/xn--en8hc.ws

abbv.us
mq1.us

MarkDown reference

`## Header example`

## Header example

### Section

Create **bold** and *italic* text.

Create [links]().

Create an image, [!castle](https://cdn.jsdelivr.net/gh/nfnth/nfnth@latest/res/castle/castle2.png) height/width?

Create lists,

- bullet 1
- bullet 2
   
1. step 1
1. step 2

> PLANME objectives
>! README objectives

```code block``` //<pre><code>?
   
|table|header|
|-|-|
|column|data|

[!LABEL](text|color) sticker...

[!NOTE](text)

[!DATETIME](utc|text|duration|frequency) // ...S-M-T-W-T-F-S(bubble buttons)(repeat), use reminder/alarms with timer/stopwatch, countdown

[!LOCATION](term, key) (latitude, longitude, key) destination?

[!file]()

[!KEY](type|value) SSH, monero (wallet) QR?

[!CONTACT] // message? comment? [!mail](to|from|subject)[message][attachment1|attachment2]

[!MEDIA]()

 // figure, empty block "stragety", mermaid, shipping, notifications? input?

[!CALC](ledger/payment?)

