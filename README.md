# FountainController
A NodeJS system for setting up a web application as the main control panel. It will also be used as the main controller for the hardwired inputs

NodeJS Scripts
------
`setup-network <interface>` - Automatically executes the wifi network steps with the default values

Project Notes
------
The main controller is a Raspberry Pi 3b, the reason for this is that it has built-in wifi connectivity, this allows the controller to include a built-in wireless controller along with a hardwired controller.

Installation
------

### Setting Up The Pi
#### Installing the Required Packages
Run these scripts to install NodeJS, NPM, and the WiringPi Library
```
sudo apt-get update
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install nodejs -y
sudo apt-get install wiringpi -y
```

#### Downloading the Repository
We need to install the required packages first
`$ sudo apt get install wiringpi`
Now we need to install the repo. Navigate to a directory of your choosing and download the repo
`$ git clone https://github.com/GhostlyCoding/FountainController.git`
Extract it to your desired location

#### Set to Automatically Boot on Startup
We need to setup the NodeJS script as a systemd service to do this start by creating a 'fountain.service' file in your `/lib/systemd/system/` directory

`$ sudo nano /lib/systemd/system/fountain.service`

Now enter the following information into the file

```
[Unit]
Description=Controller for fountain
Documentation=https://github.com/GhostlyCoding/FountainController
After=network.target

[Service]
Environment=NODE_PORT=3001
Type=simple
User=server
ExecStart=/usr/bin/node REPLACE_WITH_INDEX.JS_LOCATION
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Now save and exit and reload the daemon

`$ sudo systemctl daemon-reload`

Finally, enable the script so that it starts on boot

`$ sudo systemctl enable fountain`

To check the status of the server you can use `$ sudo systemctl status fountain` at anytime. It will also give you the most recent output of the script

#### Setting Up The Network
So if you want the pi to emit it's own Wi-Fi network then you need to do a few things (This may get complicated just hang on!)
_Assume all of the commands are using root privileges. Also assume that our wireless interface is_ wlan0.

First thing we need to do is install all the required packages and stop the services

```
apt-get update;
apt-get install hostapd -y;
apt-get install dnsmasq -y;

systemctl stop hostapd;
systemctl stop dnsmasq;
```

Now backup the original dnsmasq config file and open a new config file

```
mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
nano /etc/dnsmasq.conf
```

Now lets enter our new config options

```
interface=wlan0
dhcp-range=10.0.0.2,10.0.0.16,255.255.255.0,24h
dhcp-option=3,10.0.0.1
dhcp-authoritative
address=/#/10.0.0.1
```

`interface` Sets our interface to wlan0 (Make sure to set it to your correct wireless card of choice)
`dhcp-range` Sets the usable ip range to addresses between 10.0.0.2 and 10.0.0.16 and sets the lease time to 24 hours
`dchp-option` Defines the router's address
`address` Tells the hotspot to redirect ALL website requests to the router

Now lets configure hostapd

`nano /etc/hostapd/hostapd.conf`

Now lets put some settings in

```
interface=wlan0
hw_mode=a
channel=0
ieee80211d=1
ieee80211n=1
country_code=EN
ignore_broadcast_ssid=0
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ssid=Fountain Control
ht_capab=[HT40+][SHORT-GI-20][DSSS_CCK-40]
```

Save and exit. Now lets tell the system where our config file is

`nano /etc/default/hostapd`
`DAEMON_CONF="/etc/hostapd/hostapd.conf"`

Save and exit. 
Restart your device and you should see the network 

Required Packages
------
- NPM
- NodeJS
- WiringPi
- hostapd
- dnsmasq
