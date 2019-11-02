# FountainController
A NodeJS system for setting up a web application as the main control panel. It will also be used as the main controller for the hardwired inputs

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
sudo apt-get install hostapd -y
sudo apt-get install dnsmasq -y
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

Required Packages
------
- NPM
- NodeJS
- WiringPi
- hostapd
- dnsmasq
