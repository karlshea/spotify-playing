#!/usr/bin/env bash

XSET="env XAUTHORITY=/home/[username]/.Xauthority /usr/bin/xset -display :0"

if [[ "$1" == "on" ]]
then
  $XSET s noblank
  $XSET s off
  $XSET -dpms
elif [[ "$1" == "off" ]]
then
  $XSET dpms force off
fi