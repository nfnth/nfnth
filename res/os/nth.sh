#!/bin/bash

python site.py
MOZ_ENABLE_WAYLAND=1 /usr/bin/firefox --kiosk
