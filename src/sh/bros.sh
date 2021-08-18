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
