#!/usr/bin/env bash

if [[ "$1" == "on" ]]
then
  XAUTHORITY=/home/[username]/.Xauthority /usr/bin/xset -display :0 dpms force on
  XAUTHORITY=/home/[username]/.Xauthority /usr/bin/xset -display :0 s noblank
  XAUTHORITY=/home/[username]/.Xauthority /usr/bin/xset -display :0 s off
elif [[ "$1" == "off" ]]
then
  XAUTHORITY=/home/[username]/.Xauthority /usr/bin/xset -display :0 dpms force off
fi