---
author: Ixion
title: The actual solution to iPhone Wi-Fi syncing not working
date: "2023-06-18"
summary: Guide to fixing "Show this iPhone when on Wi-Fi" not working on macOS using Xcode "Devices and Simulators" window. This will also fix AltStore's wireless resigning if it's not working for you.
tags: 
- ios
- macos
categories:
- tipsandtricks
---

As a software developer, I sometimes use AltStore on my iPhone to install and test my own apps, as well as keep them working past the 7-day signing window as I have a free developer account. [AltStore](https://altstore.io) is an alternative app store that allows wireless installation and update of sideloaded apps via a Mac or a Windows PC. However, at some point the wireless syncing option that you can find in Finder when you connect an iOS device simply stopped working, meaning that AltStore couldn't re-sign my apps wirelessly anymore.

I've tried all of the usual troubleshooting steps that you might find online, inluding unchecking and re-checking “Show this iPhone when on Wi-Fi” option in Finder with a reboot inbetween, and none of them helped. The iPhone would instantly disappear in Finder when I disconnected it from the USB and never appear until reconnected. Fortunately, I figured out how this could be resolved with the help of Xcode, Apple’s development tool for iOS, macOS, and other platforms.

## Solution

1. Download and install Xcode from the Mac App Store if you don't have it already. It's a free app, but it might take some time to download and install as it's quite large.
2. Launch Xcode and agree to the terms and conditions if prompted.
3. Unlock your iPhone and connect it to your Mac over USB.
4. In Xcode, go to Window > Devices and Simulators.
5. In the Devices and Simulators window, select your iPhone from the list of connected devices on the left sidebar.
6. On the right panel, under Device Information, check the box next to "Connect via network".
7. Wait for a minute or so until all of the yellow progress messages disappear.
8. Disconnect your iPhone from the USB cable and ensure that you see a small globe icon next to your iPhone's name, indicating that it's connected over the network.
9. Open Finder and click on your iPhone under Locations on the left sidebar. You should be able to see your iPhone's files and settings wirelessly.

![Screenshot](/post_files/actual-fix-for-wifi-sync-on-ios/devicesandsimulators.png)

I hope this blog post was helpful for you. If you have any questions or feedback, please leave a comment below.
