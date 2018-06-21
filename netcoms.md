# TonderScripts

## The following commands list all available wifi networks
```shell
cd /sys/class/net/ 
cd wlan0 [wireless interface folder] 
sudo iwlist wlan0 scan | grep ESSID
```

---

## The following command gives us system info, like kernel version and OS name, time and date

```shell
uname -a
```
---

## Show ip and network info

```shell
ifconfig

ip addr show
```
---

## Show free disk space and all disks

```shell
df -ah (diskfree: all disks, human readable)
```
---

## Check if a service is running

```shell
service [program or service] status

systemctl status [program or service]
```
---

## Check size of dir

```shell
du -sh [directory]
```
---

## Check open ports 

```shell
netstat -tulpn
```
---

## make bootable usb with dd
```shell
sudo unmount /dev/*drive*

sudo dd if=path/to/iso of=/dev/*drive* bs=8m
```
