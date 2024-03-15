---
author: Ixion
title: How to watch 4K YouTube in Safari
date: "2024-03-15"
summary: YouTube no longer allows 4K playback on Safari, but you don't have to switch to Chrome, here's the solution
tags: 
- macos
- safari
categories:
- tutorials
---

> Updated for 2024, now that YouTube once again blocks 4K playback on Safari.

![IINA Logo](/post_files/4k-in-safari-without-pain/iina.png)

YouTube has recently started blocking playback of 4K videos on Safari, even though it was possible before and Safari fully supported decoding WebM for years now, but I've found a workaround that doesn't involve installing Chrome or having to launch VLC every time.

IINA is a modern media player that was made specifically for macOS. Not only does it look nicer and have more features (ex. Picture-in-Picture), but it also supports almost all of the audio and video codecs that VLC supports and allows you to play YouTube videos as any other network media source. Furthermore, it also offers a Safari plug-in that adds right-click menu options and a toolbar icon to easily open videos in IINA without having to launch it manually.

So, what does using IINA with YouTube look like? Here's a demonstration:

| ![Right-click and select Open Link in IINA](/post_files/4k-in-safari-without-pain/1.png) |
|:--:|
| *Instead of left-clicking a video, right click and select "Open Link in IINA"* |

| ![Use the IINA toolbar icon](/post_files/4k-in-safari-without-pain/2.png) |
|:--:|
| *Or if you're already in a video, use the toolbar icon to do the same* |

| ![IINA main window](/post_files/4k-in-safari-without-pain/3.png) |
|:--:|
| *And you're now watching 4K videos!* |

| ![IINA at 8K quality](/post_files/4k-in-safari-without-pain/4.png) |
|:--:|
| *Why stop at 4K? IINA can play 8K content as well!* |

Here's how you can set this up on your machine:

## Prerequisites

1. Install *IINA* from the official website: [https://iina.io](https://iina.io)
2. Install *Homebrew* if you don't have it already: [https://brew.sh](https://brew.sh)
3. Install *yt-dlp* from homebrew using the following Terminal.app command: `brew install yt-dlp`

You'll also need to run the following terminal commands to make IINA use `yt-dlp` instead of `youtube-dl` which has been long outdated:

```sh
mkdir -p ~/.local/bin
ln -s $(brew --prefix)/bin/yt-dlp /Users/$(whoami)/.local/bin
```

Now that you've installed everything, you'll need to do some setup in order to make sure that you can actually open videos from Safari and in high quality.

## Configuration

1. Open Safari preferences, go to Extensions and activate "Open in IINA" (at this point, you should see the toolbar icon appear, as well as extra right-click options)
2. Open IINA and go through initial setup
3. Open IINA preferences, go to the Network tab and check "Enable youtube-dl"

At this point, there are a few different options that you can specify in youtube-dl settings:

**Custom youtube-dl path**: `~/.local/bin`

By default, IINA will play the highest quality available, but you can also set some **Raw options** to enforce an upper boundary on video quality:

Up to **4K**, prefer 60 FPS: `format="bestvideo[fps>=50,ext=mp4,height<=?2160]+bestaudio/best[ext=m4a,height<=?2160]"`

Up to **1080p**, prefer 60 FPS: `format="bestvideo[fps>=50,ext=mp4,height<=?1080]+bestaudio/best[ext=m4a,height<=?1080]"`

Aftwerwards, close the window and quit IINA. Next time you launch IINA, it will be able to play 4K YouTube videos.

Hope this was helpful!
