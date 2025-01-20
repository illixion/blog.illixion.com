---
author: Ixion
title: Western Digital drives and kernel panics on M1 Macs
date: "2020-09-03"
summary: I've been experiencing a strange kernel panic related to the SoC watchdog on my M1 Mac for many months, and I believe I might've found a fix.
tags: 
- macos
categories:
- tipsandtricks
---

I've been experiencing a strange kernel panic on my M1 Mac for many months, and I believe I might've found a fix in case others are having the same issue. The kernel panic in question can manifest itself with the following descriptions:

* Unexpected SoC (system) watchdog reset occurred
* SOCD report detected: (AP watchdog expired)

## Background

From my limited understanding, this kernel panic is caused by USB devices and how the M1 SoC handles them. Not much more is known, besides anecdotal evidence that this is caused by hard drives and that connecting them to a powered USB hub helps, suggesting a power delivery issue. In my case, I was using a WD Elements 14 TB hard drive, and using a powered USB hub as well as disconnecting other possibly bad USB devices didn't help. Something else did help though: putting the hard drive into a different enclosure.

## What actually worked

I kept seeing people reporting that after disconnecting their external WD drives the issue would disappear, and that gave me an idea: what if this is some unexpected incompatibility issue between M1 and the USB controller of the drive? So I freed the hard drive from its enclosure using this [iFixit guide](http://ifixit.com/Guide/How+to+Shuck+a+WD+Elements+External+Hard+Drive/137646) and then put it into a generic Gembird USB 3 HDD enclosure (EE3-U3S-3). I can happily report that I haven't had a single kernel panic for 2 months now, whereas before I'd get one almost bi-weekly.

I hope this article helps you!
