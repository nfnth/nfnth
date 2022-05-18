#exec ntpd -qg & #hwclock --systohc
#exec nohup xterm -geometry 800x600+0+0 -e 'chromium "http://localhost:4444" --no-sandbox' > /dev/null 2>&1 & disown &
#exec nohup python /root/dralun/site/run.py > /dev/null 2>&1 & disown &

#exec nohup chromium "http://localhost:5001" --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > /dev/null 2>&1 & disown & #use chrome://flags
#exec nohup firefox -url "https://boxb.in" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11 &
#exec startlxde

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
    wget -O "test.js" "https://polyfill.io/v3/polyfill.min.js?features=es6" "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.js" "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" "https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/2.5.1/mapbox-gl.js" "https://cdn.jsdelivr.net/npm/mapbox-gl-animated-popup@latest/dist/mapbox-gl-animated-popup.min.js" "https://unpkg.com/html5-qrcode" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/pbkdf2.js" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js" #three.js? ext.js?
    wget -O "test.css" "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css" #materialize.min.css mapbox-gl.css ext.css?
}

#if [[ "$1" == "deploy" ]]
#then
#    prep
#    sshpass -p ${server_password} ssh root@${server_ip} 'chmod +x /root/build.sh'
#    sshpass -p ${server_password} ssh root@${server_ip} '/root/build.sh run'
    #if [[ "${site}" == "yes" ]]
    #then
    #    sshpass -p ${server_password} ssh root@${server_ip} '/root/build.sh server'
    #fi

    #ip link set $(echo $(ls -d /sys/class/net/w*) | sed 's/\/sys\/class\/net\///g') down
    #systemctl set-default graphical.target
    #ln -sT /usr/share/zoneinfo/${timezone} /etc/localtime # -sf ?

    #ssh-keygen -t rsa -b 4096 -C me@you.com
    #openssl ecparam -genkey -name secp384r1 | openssl ec -out ecc-privkey.pem
    #echo "Port 22" >> /etc/ssh/sshd_config
    #echo "AllowUsers ${user_name}" >> /etc/ssh/sshd_config
    #add public key to /home/user/.ssh/authorized_keys
    #enable PubKey authentication in /etc/ssh/sshd_config (restart service)
    #systemctl enable sshd
    
    #!/bin/bash
# script to run on startup

#exec ntpd -qg & #hwclock --systohc
#xinput --map-to-output "pointer:Goodix Capacitive TouchScreen" "DSI1"
#picom -b
#exec nohup firefox -url "https://boxb.in" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11 &
#xrandr --output DSI1 --rotate right #--auto --pos 0x0 --primary --output DP1 --auto --pos 3840x0
#lsof -i -P -n

    #amixer sset Master unmute #amixer set Master 50+
#        env MOZ_USE_XINPUT2=1 firefox  #...about settings?
nohup firefox > /dev/null 2>&1 &
#sed -i "s/#XXXX/nohup chromium 'http:\/\/localhost:5001' --test-type --start-fullscreen --disable-web-security --user-data-dir=~ --no-sandbox > \/dev\/null 2>&1 & disown &/g" /root/config/start.sh

about:support (profiles) (config)
