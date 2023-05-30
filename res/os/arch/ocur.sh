#!/sbin/openrc-run

#mkdir /run/weston
command=export XDG_RUNTIME_DIR=/tmp/ && /usr/bin/weston
