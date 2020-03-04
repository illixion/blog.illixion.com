+++
author = "Manual"
title = "Hackintosh setup notes for ASUS H110M, Intel i5-8500 and UHD 630"
date = "2019-10-18"
summary = "Hackintosh build guide for a PC with ASUS H110M, Intel i5-8500 and UHD 630."
tags = ["hackintosh"]
categories = ["tutorials"]
+++

I've completed a new PC build, and this time, I didn't have control over the components of the PC! Someone asked me if I could install MacOS Mojave on their little productivity machine, and I've agreed to the challenge.

What we're working with:

* Mobo: ASUS H110M
* CPU: Intel i5-8500
* GPU: Intel UHD 630
* 2 HDMI & DVI monitors, connected to the iGPU
* An old NVIDIA GT 210 that we ended up not using
* Mighty need to run MacOS-specific software
* Some amount of patience

At first, I've decided to try and use the NVIDIA GPU because we've already had it installed, but as I've later found out, High Sierra really doesn't like technology this old. AFAIK it's supposed to support Tesla-series GPUs, but it would promptly kernel panic after loading the NVDAStartup.kext. I've tried sideloading the El Capitan NVDAStartup.kext, and while it did kinda work, there was no graphics acceleration to be seen anywhere. iGPU it is then!

Intel UHD 630 proved to be just as finicky at first, adding an annoying pink tint on the HDMI monitor, not displaying anything on the second one at all and sometimes going as far as to kernel panic when plugging in a second monitor. This was solved by applying this [amazing instruction from the Hackintosh vanilla guide by corpnew](https://hackintosh.gitbook.io/-r-hackintosh-vanilla-desktop-guide/config.plist-per-hardware/coffee-lake#pink-purple-tint) and changing the SMBIOS from an iMac18,1 to a Macmini8,1.

There really weren't all that many issues with this particular setup, which really says something about how far the Hackintosh community has progressed over the years. Most people likely won't even encounter any of these issues when using an officially-supported AMD GPU.

In any case, here's my config.plist file: [Download *asus-h110m-i5-8500-igpu.plist*](/post_files/asus-h110m-i5-8500-hackintosh/asus-h110m-i5-8500-igpu.plist).

Have fun!
