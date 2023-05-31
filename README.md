# Spotify Now Playing

A React app meant for a Raspberry Pi Zero 2 W with a Hyperpixel 4.0 Square 
display.

## Architecture

The React app can be hosted either directly on the Pi, or somewhere else. 

When not playing a clock is shown, and when enabled a request will be made to 
the local Pi to turn the screen on and off.

Occupancy detection can also be enabled, where a Home Assistant entity state 
will be queried. When the entity is off, the screen will be turned off.

Unfortunately due to cross-origin request issues TLS will most likely need to
be enabled on everything. 

## Setup

### Session autostart

Place contents of [autostart](scripts/autostart) in 
`.config/lxsession/LXDE-pi/autostart`, which will call
[autostart-spotify-playing.sh](scripts/autostart-spotify-playing.sh). This will 
hide the cursor, disable the screensaver and power management, and start 
Chromium in kiosk mode after a delay to so the URL actually loads.

### Screen handling

[screen.php](scripts/screen.php) will need to be hosted on the Pi, and the URL 
added to your .env.production. It calls [screen.sh](scripts/screen.sh), which the 
www-data user needs to call with sudo so the script has access to your user's
.Xauthority file.

Create `/etc/sudoers.d/screen` containing

```
www-data ALL=(ALL) NOPASSWD: /root/screen.sh on, /root/screen.sh off
```

## Helpers

It may be helpful to use `xdotool` to reload Chromium without needing to VNC 
into the Pi. An example is the [reload-chromium.sh](scripts/reload-chromium.sh) 
script.

# Credits

Heavily inspired by [Now Playing at chorus.fm](https://chorus.fm/news/now-playing-my-raspberry-pi-weekend-project/).
