#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

echo "Creating fountain.service File";

cd /lib/systemd/system/
touch fountain.service
echo "[Unit]
Description=Controller for fountain
Documentation=https://github.com/GhostlyCoding/FountainController
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/node ${PWD}/../index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target" > fountain.service

echo "Reloading daemon"
systemctl daemon-reload
echo "Enabling fountain.service"
systemctl enable fountain
echo "Setting Up Network"
echo "Installing Packages"
apt-get update -y;
apt-get install hostapd -y;
apt-get install dnsmasq -y;
echo "Stopping Services"
systemctl stop hostapd
systemctl stop dnsmasq
echo "Backing-Up Original Config"
mv /etc/dnsmasq.conf /etc/dnsmasq.conf.original
echo "Inserting Default Settings"
echo "interface=wlan0
dhcp-range=10.0.0.2,10.0.0.16,255.255.255.0,24h
dhcp-option=3,10.0.0.1
dhcp-authoritative
address=/#/10.0.0.1" > /etc/dnsmasq.conf
echo "Creating hostapd Config File"
echo "interface=wlan0
hw_mode=a
channel=0
ieee80211d=1
ieee80211n=1
country_code=EN
ignore_broadcast_ssid=0
wmm_enabled=0
macaddr_acl=0
auth_algs=1
wpa=2
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
ssid=Fountain Control
wpa_passphrase=milball2020
ht_capab=[HT40+][SHORT-GI-20][DSSS_CCK-40]" > /etc/hostapd/hostapd.conf
echo 'DAEMON_CONF="/etc/hostapd/hostapd.conf"' > /etc/default/hostapd

echo "Config Completed Restarting Your Device to Finalize Your Settings"

shutdown -r
