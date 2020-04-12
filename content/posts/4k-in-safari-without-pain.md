---
author: Manual
title: How to watch 4K YouTube (and WebM) in macOS Safari with no extra pain
date: "2020-04-12"
summary: It's well known that Safari doesn't support VP9 or WebM, but I've found a workaround that doesn't involve switching to Chrome. Read on!
tags: 
- macos
categories:
- tipsandtricks
---

It's well known that Safari doesn't support playing VP9 or WebM videos out of the box, but I've found a workaround that doesn't involve installing Chrome or having to launch VLC every time.

For context, I use Safari almost exclusively due to its simplicity, features and integration with iOS devices. Unfortunately, due to Apple only supporting licensed video codecs like HEVC, Safari has 0 support for VP8/VP9. What this means is that YouTube on Safari will not play above 1080p no matter what, and WebM's won't play at all. However, you don't have to use YouTube's web player. Enter IINA:

| ![IINA Logo](https://raw.githubusercontent.com/iina/iina/develop/iina/Assets.xcassets/AppIcon.appiconset/256-1.png) |
|:--:|
| *IINA is the modern video player for macOS.* |

IINA is a modern media player that was made specifically for macOS. Not only does it look nicer and have more features (Picture-in-Picture, anyone?), it also supports almost all of the audio and video codecs that VLC supports and allows you to play YouTube videos as any other network media source. Furthermore, it also offers a Safari plug-in that adds right-click menu options and a toolbar icon to easily open videos in IINA without having to launch it manually.

So, what does using IINA with YouTube look like? Here's a demonstration:

| ![Right-click and select Open Link in IINA](/post_files/4k-in-safari-without-pain/1.png) |
|:--:|
| *Instead of left-clicking a video, right click and select "Open Link in IINA"* |

| ![Use the IINA toolbar icon](/post_files/4k-in-safari-without-pain/2.png) |
|:--:|
| *Or if you're already in a video, use the toolbar icon to do the same* |

| ![IINA main window](/post_files/4k-in-safari-without-pain/3.png) |
|:--:|
| *And you're up and running with your crispy 4K video!* |

It's just that easy. It just takes one more click to open your videos in max quality. Furthermore, why stop at 4K? IINA can view 8K content as well!

![IINA at 8K quality](/post_files/4k-in-safari-without-pain/4.png)

ANYWAY, here's how you can set up this workflow on your machine:

## Prerequisites

1. Install *IINA* from the official website: [https://iina.io](https://iina.io)
2. Install *Homebrew* if you don't have it already: [https://brew.sh](https://brew.sh)
3. Install *ffmpeg* and *youtube-dl* from homebrew using the following Terminal.app command: `brew install ffmpeg youtube-dl`

Now that you've installed everything, you'll need to do some setup in order to make sure that you can actually open videos from Safari and in high quality:

1. Open Safari preferences, go to Extensions and activate "Open in IINA" (at this point, you should see the toolbar icon appear, as well as extra right-click options)
2. Open IINA and go through initial setup
3. Open IINA preferences, go to the Network tab and check "Enable youtube-dl"

## Configuration

At this point, there are a few different options that you can specify in youtube-dl settings:

**Custom youtube-dl path**: `/usr/local/bin`

*Note:* This could be different on your machine or change at some point in the future, so if you're unsure whether this is correct, execute `which youtube-dl` in Terminal.app and paste everything up to **/youtube-dl** into this field

As for **Raw options**, you can set up some preferences for how you'd like IINA to seelct which video stream to play:

Up to **4K**, prefer 60 FPS (recommended): `format="bestvideo[fps>=50,ext=mp4,height<=?2160]+bestaudio/best[ext=m4a,height<=?2160]"`

Up to **1080p**, prefer 60 FPS: `format="bestvideo[fps>=50,ext=mp4,height<=?1080]+bestaudio/best[ext=m4a,height<=?1080]"`

Highest quality available (usually **8K**): `format="bestvideo+bestaudio/best"`

Once you've entered your raw options, press enter and quit IINA. Next time you launch IINA, it should play your video at whichever highest quality the video is available in.

Hope this was helpful!
