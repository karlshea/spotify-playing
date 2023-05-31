#!/bin/sh

sleep 20

/usr/bin/chromium-browser --app https://spotify-playing/ \
  --kiosk \
  --noerrdialogs \
  --disable-session-crashed-bubble \
  --disable-infobars \
  --check-for-update-interval=525600 \
  --simulate-critical-update