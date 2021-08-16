
<p align="center">
<img src="https://github.com/nfnth/res/raw/main/site/chimi_hi.png" width="200" height="240" />
</p>

### Try brOS (with Jaspre and Markre)

Features include,

- Browser-only, lightweight distro (Arch-based)
- Web-based admin console, 
    - Command-line access
    - Folder/file browser
    - Text editor
- Remote deployment

Learn to code using our stack, see [brOS](https://github.com/nfnth/nfnth/wiki/Bit-OS). For code specifics, see the [repo](), download the [script](https://gist.github.com/nfnth/ef98bc2ade9286b240eac846ff52bcce), or view the demo at [drhab.com](https://drhab.com).

Use Jaspre to:

- Transfer/store JSON objects between client (JavaScript) and serve (Python)

Use the Markre editor to:

- Create a profile
- Write a treaty (trade)
- Develop strategy
- Campaign (with mail)

The Markre editor uses JavaScript regex rendering to confirm conform to [MattDown](https://github.com/nfnth/nfnth/wiki/Mattdown), or MarkDown 2.0.


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
   dd if=/dev/sda of=image.iso status=progress
   df, ls -a, du -xhS | sort -h | tail -n15 #file/folder info
   lscpu #hardware info
   grep -R "term" #search
   iwctl #wifi
   ip addr #network
   ping google.com -c 2 #network test
   find /home/username/ -name "*.err"
   #sed 's/.*six.*/fault/' file     # check all lines
   ```
   
https://gist.github.com/nfnth/ef98bc2ade9286b240eac846ff52bcce

XMR node with XUR (deed domain with stats)

https://supportxmr.com/

https://www.getmonero.org/resources/developer-guides/wallet-rpc.html

git clone https://github.com/xmrig/xmrig.git
cd xmrig
Configure and compile XMRig:

cmake -Bbuild
make -Cbuild -j$(nproc)
Copy binary and example configuration to your home directory:

cp build/xmrig ~/
cp src/config.json ~/
https://github.com/xmrig/xmrig
https://www.getmonero.org/downloads/#cli
tar -xvjf guitar_songs.tar.bz2
./monerod --prune-blockchain

https://moneroaddress.org/

file:///root/xmr.llcoins.net/site/sign.html

The blockchain is stored in $HOME/.bitmonero
For testnet, it'll be in $HOME/.bitmonero/testnet
You can select a different directory with the --data-dir option if needed, eg:
./monerod --data-dir /var/tmp/monero

https://xmr.llcoins.net/addresstests.html

#https://monerodocs.org/interacting/monerod-reference/#transactions
#https://monerodocs.org/interacting/monero-wallet-rpc-reference/#verify
#https://monerodocs.org/interacting/monero-wallet-cli-reference/#balance

 https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html
 
 XMR node with XUR (deed domain with stats)

https://supportxmr.com/

https://www.getmonero.org/resources/developer-guides/wallet-rpc.html

git clone https://github.com/xmrig/xmrig.git
cd xmrig
Configure and compile XMRig:

cmake -Bbuild
make -Cbuild -j$(nproc)
Copy binary and example configuration to your home directory:

cp build/xmrig ~/
cp src/config.json ~/
https://github.com/xmrig/xmrig
https://www.getmonero.org/downloads/#cli
tar -xvjf guitar_songs.tar.bz2
./monerod --prune-blockchain

https://moneroaddress.org/

file:///root/xmr.llcoins.net/site/sign.html

The blockchain is stored in $HOME/.bitmonero
For testnet, it'll be in $HOME/.bitmonero/testnet
You can select a different directory with the --data-dir option if needed, eg:
./monerod --data-dir /var/tmp/monero

https://xmr.llcoins.net/addresstests.html

#https://monerodocs.org/interacting/monerod-reference/#transactions
#https://monerodocs.org/interacting/monero-wallet-rpc-reference/#verify
#https://monerodocs.org/interacting/monero-wallet-cli-reference/#balance

 https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html
				

