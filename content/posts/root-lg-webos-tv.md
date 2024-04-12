---
author: Ixion
title: How to root your LG webOS TV in 2024
date: "2024-04-11"
summary: I wrote a proof-of-concept for CVE-2023-6319, which allows rooting many modern webOS TVs and installing the Homebrew channel on them
copyright_notice: Parts of this article were written by AI
tags: 
- python
- webos
categories:
- tutorials
---

Rooting your LG webOS TV can unlock a host of new features and capabilities, allowing you to customize your viewing experience to a greater extent. This guide is designed for technically inclined owners of LG webOS TVs who wish to root their devices using a Python script. Before proceeding, please ensure that you understand the risks involved with rooting, which may include voiding your warranty.

## Prerequisites

- A computer with Python 3 installed (<https://www.python.org/downloads/>).
- The LG TV should be connected to the same local network as your computer.
- Make sure your TV's webOS version is supported by the script. The most recent supported versions are:
  - **webOS 4.9.7 - 5.30.40** (tested on **LG43UM7000PLA**)
  - **webOS 5.5.0 - 04.50.51** (tested on **OLED55CXPUA**)
  - **webOS 6.3.3-442 (kisscurl-kinglake) - 03.36.50** (tested on **OLED48C1PUB**)
  - **webOS 7.3.1-43 (mullet-mebin) - 03.33.85** (tested on **OLED55A23LA**)

To verify your full webOS version, press the Mute button on your remote 5 times while on any HDMI input.

## Step 1: Download the Script

Visit the GitHub repository at <https://github.com/illixion/root-my-webos-tv> and download the files `rootmytv.py` and `requirements.txt`.

## Step 2: Install Required Packages

Open a terminal or command prompt on your computer and navigate to the directory where you downloaded the files (on Windows, run `cd %USERPROFILE%\Downloads`). Install the required Python packages with the following command:

```bash
pip install -r requirements.txt
```

## Step 3: Run the Rooting Script

Run the `rootmytv.py` script by typing:

```bash
python rootmytv.py
```

The script will prompt you to enter your TV's LAN IP address. You can find this in your TV's network settings.

## Step 4: Follow the On-Screen Instructions

After entering the IP address, the script will attempt to root your TV. Follow any on-screen instructions that are shown.

## Step 5: Verify the Root

If successful, the script will return a success message along with the telnet IP and port. You can now enjoy the benefits of a rooted TV, such as installing custom software or exploring the underlying webOS system.

## Step 6: Install the Homebrew Channel

To further enhance your rooted TV, consider installing the Homebrew Channel. Visit <https://github.com/webosbrew/webos-homebrew-channel?tab=readme-ov-file#installation> for instructions on how to install it. This will allow you to install apps such as an ad-free version of YouTube or ambient lighting software that will work system-wide.

**Disclaimer:** Rooting your TV can be risky and may void your warranty or even brick the TV if you modify any system files. This guide is provided for educational purposes only, and the author is not responsible for any damage that may occur.

Happy rooting, and enjoy exploring the new possibilities of your LG webOS TV! If you encounter any issues or errors, feel free to leave a comment.
