---
author: Ixion
title: How to run Home Assistant on Apple Silicon using VMware Fusion
date: "2025-01-20"
summary: How to set up the Home Assistant OS on M1 Macs using a virtual machine with working discovery and USB passthrough
tags: 
- vmware
- macos
- homeassistant
categories:
- tutorials
---

In 2023, I published an article detailing how to run Home Assistant OS in a Docker environment. This was the sole semi-official method for running a supported version of Home Assistant on macOS, but it had several drawbacks, including the absence of USB passthrough and limited accessibility to non-developers. Therefore, I'm sharing a method I'm currently employing, which involves using VMware Fusion to run the official ARM disk image that Home Assistant recently made available. For reference, I also suggested incorporating this article as the official instructions on Home Assistant's macOS website, but unfortunately, the proposed change was not accepted (https://github.com/home-assistant/home-assistant.io/pull/36993).

To get started, download VMware Fusion by following this URL: https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Fusion

You'll need to sign up for an account and fill out a form when downloading the software, and the process can be difficult due to Broadcom's non-user friendly decisions. If you're having trouble, there are more in-depth guides online that you could look for. After you've got it installed, follow these instructions:

1. Download the Home Assistant OS image using this URL: https://github.com/home-assistant/operating-system/releases/latest
   - Select the file that has a name like this: *haos_generic-aarch64-14.1.vmdk.zip*, where 14.1 is the HaOS version
2. Start VMware Fusion and select **File > New** from the menu bar.
3. Select **Create a custom virtual machine**, then select **Linux** > **Other Linux 6.x kernel 64-bit Arm**.
   - On Intel Macs, select **Other Linux 6.x kernel 64-bit**.
4. Select **Use an existing virtual disk** and locate the unzipped disk image file.
   - Ensure **Make a separate copy of the virtual disk** is selected in the file picker options.
5. Select **Customize Settings** at the "Finish" step.
6. Define the amount of memory and the number of cores the VM is allowed to use under **Processors & Memory**.
7. Under **General**, you may choose to start the VM when your Mac boots up if preferred.
8. Connect an Ethernet cable and ensure it is connected to your network.
9. Under **Network Adapter**, select **Ethernet** under **Bridged Networking**.
10. Under **Hard Disk**, increase the disk size to the recommended minimum.
11. Under **USB**, select any USB devices that you want to pass through to Home Assistant, such as Home Assistant Connect, or other Zigbee/Z-Wave dongles. You may also want to choose to always connect the device to Home Assistant by choosing **Connect to Linux** in the **Plug In Action** dropdown.

Now you can close the settings window and start the VM. You'll see the connection details on screen, and the onboarding process can be started by visiting it in your browser. Enjoy your smart home!
