---
author: Ixion
title: Xiaomi Aqara Hub in Home Assistant, without HomeKit
date: "2020-06-23"
summary: Guide to rooting lumi.gateway.aqhm01 and making it work with Home Assistant without resorting to HomeKit.
tags: 
- hardware
- reverse-engineering
categories:
- tutorials
---

# So you've decided that the HomeKit life isn't for you

It doesn't have enough functionality, sucks at being available from the internet, or you just want to to invite a friend who uses Android - [Home Assistant](https://www.home-assistant.io) to the rescue!

But after researching how to integrate it with your sweet new home automation software, you realize that it's completely different from all of the other Xiaomi Zigbee hubs (and their rebrandings), and doesn't actually allow you to control it over anything other than the mobile app and HomeKit. Fortunately, there are other options! Read on.

## Researching the problem

So what's actually stopping you from enabling test mode and adding this hub like any other Xiaomi hub? From what I could find, this hub uses a different architecture, and so Xiaomi has decided to not reimplement the test mode or the `psm-set` command that you'd need. This means that there are no other communication methods besides The Cloud™ and HomeKit.

### So what's wrong with HomeKit?

Not much actually. Home Assistant has supported controlling HomeKit devices for a while now, and in a recent update it actually gained enhanced support for this specific hub. No longer does it take 30 seconds for accessories to update, making this a great way to integrate an Aqara HomeKit hub with Home Assistant. However, I've found that this method doesn't support some accessories that I use, for example the Wireless Mini Switch. This was a deal-breaker for me, so I've abandoned this setup.

If all of your accessories work with this plugin though, you can stop reading this article, head over to [this page](https://www.home-assistant.io/integrations/homekit_controller/) and you'll spend way less time.

## HomeKit Controller isn't for me

Aqara Hub (aka *lumi.gateway.aqhm01* or *lumi.gateway.aqhm02*) is a small embedded Linux machine with all of the same UART ports and UBoot that most other IoT things have these days, which means that you can get yourself a root shell and start poking around inside.

Furthermore, people have already made a custom client for this hub that can be used to communicate with Home Assistant natively, making it a viable alternative to HomeKit.

To start, you'll need to ensure that you at least have the following items:

* Soldering iron
* Solder
* Some wires
* USB to TTL adapter that has a 3.3v mode
* Screwdriver with a U2.6 bit
* A desk with some free space

Fortunately, there's already a great guide written by Kaspars that breaks down the initial disassembly and rooting, which you can find [here](https://kaspa.rs/xiaomi-aqara-hub-cn-on-european-server/). Here's also a video version that he made:

<iframe width="1440" height="762" src="https://www.youtube-nocookie.com/embed/1-4iIm6nlck?start=12&end=155"
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Once you've reached the root shell, enable SSH on boot by modifying `/etc/rc.local` and adding a new line containing `/etc/init.d/dropbear start` right before `/home/root/fac/fac_test`. Afterwards, you can safely unplug the hub, remove the soldered wires and put it back together. It will now be accessible over SSH with the root password that you've set up earlier.

Now that you've got a shell, you'll need to install an alternative client that can enable decrypted communication with Home Assistant. For that, we'll install [roth-m's alternative miio_gateway](https://github.com/roth-m/miioclient-mqtt) alongside the original one. Just to reiterate, we can't run both the original miio_gateway and this version, so all of the cloud functionality of this hub will stop working while it's running. However, there is a watchdog present, so if you run `killall miio_client` the original cloud client will be restarted shortly afterwards.

Begin by downloading miio_gateway to your computer, which can be found at [this link](https://github.com/roth-m/miioclient-mqtt/raw/master/miio_client/miio_client). `wget`'ing it directly on the hub from GitHub won't work as TLS doesn't seem to work on this device. Oh well, SCP still works. `scp` the binary to the hub by issuing a command like `scp miio_client root@192.168.1.2:/home/root/miio_client`.

Once it's on the hub, you can SSH into it and run `chmod +x miio_client; killall miio_client; ./miio_client & ; disown` to start it. To make it run on every boot, add `sleep 20; killall miio_client; ./miio_client &` in `/etc/rc.local` right after the dropbear line that we've added earlier. Do not replace the original binary as it's required to establish a Wi-Fi connection.

## Integrating it into Home Assistant

You'll also need to install a custom addon into Home Assistant, which you can get from [this link](https://github.com/cadavre/miio_gateway). To do that, clone the repository into a separate folder in `/config/custom_components`, for example by issuing the following commands through the *Terminal and SSH* plugin for Home Assistant:

```sh
cd custom_components
git clone git@github.com:cadavre/miio_gateway.git ./miio_gateway
```

Afterwards, edit the configuration to include the following lines:

```yaml
miio_gateway:
  host: 192.168.1.2 # IP of your gateway
  port: 54321 # port running miio_client, defaults to 54321
```

and restart the server.

## Almost there: setting up sensors

As you might've noticed, some new accessories have been added. Ignore that they're empty at the moment, they usually populate withing 5-10 minutes due to how Zigbee works. But wait a second, where did all my sensors go?

miio_gateway doesn't discover sensors on its own, so we must add them manually.

To do that, trigger every sensor by hand or wait until they send a refresh on their own, and then check logs in Developer Tools. You should see a message that looks something like this:

```text
Received event from unregistered sensor: lumi.sensor_motion.v2 lumi.abcd - event.motion
                                         ^ model               ^ sid       ^ event that was sent
```

You'll need to update your configuration (again) to make it look something closer to this:

```yaml
miio_gateway:
  host: 192.168.1.2 # IP of your gateway
  port: 54321 # port running miio_client, defaults to 54321
  sensors: # sensors that will be available in HA (optional)
    - sid: lumi.abcd # sid from the above log message
      class: motion # class of the device (some options include door, button, garage_door, window, motion, moving, opening, smoke, vibration, temperature, humidity)
      friendly_name: Whatever Sensor # display name (optional)
    ...
```

Once you've added all of the sensors, restart Home Assistant and you're done!

## Troubleshooting

In some cases, you may not be able to discover some accessories this way, in which case you can SSH into the hub and run the following command:

```sh
killall miio_client; ./miio_client &
```

This will restart the miio_client and enable logging to console, so you'll be able to see all activity that the hub sees, including `sid`s. Here's an example of a message that you may find for a door sensor:

```json
{"id":67,"method":"_otc.log","model":"lumi.sensor_magnet.aq2","params":{"subdev_zigbee":{"CCA":1,"chip_temperature":27,"cur_state":3,"lqi":115,"parent":0,"power_tx":10,"pre_state":4,"reset_cnt":30,"send_all_cnt":8,"send_fail_cnt":2,"voltage":3045}},"sid":"lumi.158d0001234567"}
```

To ensure that miio_client doesn't exit when you close the console, run `disown`.
