---
author: Ixion
title: How to make your RGB RAM turn off when going to sleep
date: "2023-01-24"
summary: Are you annoyed by your RGB RAM LEDs staying on when your PC goes to sleep? I've made a script that aims to solve this issue.
tags: 
- python
- windows
categories:
- tutorials
---

## Preface

I have a kit of G.Skill Trident Z RGB RAM installed in my gaming PC, and I've always been annoyed by the fact that the LEDs stay on even when the PC goes to sleep. There is an explanation for this of course, as sleep mode essentially keeps the memory powered while everything else is off, so the LEDs get power too. But I still wanted to not have bright rainbows shining in my room 24/7, so I’ve made a Python script utilizing [OpenRGB](https://openrgb.org) to solve this issue.

## RGB RAM Sleep Agent.py

This script is made for running on Windows using Python 3 and it utilizes the OpenRGB SDK server to control the RAM, which means that it should be compatible with any RAM sticks that OpenRGB supports. The script could also be extended to control other device types, though for my purposes it only controls RAM LEDs.

Please note that the script as-is will use a Rainbow mode when turning the LEDs back on, but the code can be modified to use any other mode or RGB color. Check the [usage section of the openrgb-python project](https://github.com/jath03/openrgb-python#usage) for some examples.

[Download the script here.](https://gist.github.com/illixion/b4027442bd5d55885881a6f8da9a4fb4) *(right click on **Raw** and choose the option to “Save link as...” or similar)*

## Installation instructions

1. Install Python 3 from the official website: <https://www.python.org/downloads/>

2. Download NSSM from the official website: <https://nssm.cc/download> (you’ll want to grab the [prelease build 2.24-101](https://nssm.cc/ci/nssm-2.24-101-g897c7ad.zip) if you’re on Windows 10 or newer)

3. Copy nssm.exe from the win64 folder in the zip archive to C:\Windows\System32

4. Open a terminal/cmd.exe window and run the following command: `pip install pywin32 openrgb-python`

5. In the same window, run `nssm install RGBRAMSleepAgent`

6. Allow administrator access, and in the new window that shows up, configure the service as follows:

    * Application → Path: path to where you’ve installed Python, it’ll likely be `C:\Python310\python.exe`
    * Application → Arguments: path to where you’ve downloaded the script, right click while holding Shift on the script file and choose “copy as path” or similar
    * Details → Display name: set a memorable name, recommended value `RGB RAM Sleep Agent`
    * Details → Startup type: choose Automatic (Delayed Start)
    * Log on → Log on as: Select `Local System account` and check the “Allow service to interact with desktop” option

7. Click “Install service”, it should start up automatically afterwards

8. Download OpenRGB from the official website (<https://openrgb.org>), extract to your home folder and run OpenRGB.exe

9. Once OpenRGB is running, ensure your RAM shows up and configure the General settings as follows:

    ✅ Minimize On Close
    
    ✅ Start at Login
    
    ✅ Start Minimized
    
    ✅ Start Server
    
    ✅ Set Server Host: `127.0.0.1`

10. Under SDK Server, change Server Host to `127.0.0.1` for extra security and click on **Start Server**

11. A new client should show up called “openrgb-python”, which means that the agent is working properly

<hr>

That's it! Your RAM should now properly turn off its LEDs when the PC goes to sleep, and turn back on when resuming from sleep.