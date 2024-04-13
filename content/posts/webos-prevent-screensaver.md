---
author: "Ixion"
title: "webOS: how to disable the screensaver in your LG app"
date: 2022-10-22T17:35:03+03:00
summary: I've made a web app for my LG OLED TV, and I've encountered an issue where the TV would constantly be showing the fireworks screensaver every 2 minutes or so, even while the app was playing video. Long story short, there is a solution.
tags: 
- webos
categories:
- tipsandtricks
---

I've recently made a web app for my LG OLED TV, and I've encountered an issue where the TV would constantly be showing the fireworks screensaver every 2 minutes or so, even while the app was playing video. After spending hours searching for a solution, I've finally discovered [this comment](https://github.com/webosbrew/apps-repo/issues/60#issuecomment-1133907357) by [@Mariotaku](https://github.com/mariotaku) on a GitHub PR, and it ended up being as simple as using an undocumented API endpoint.

# Web apps

You can register on this Luna URI: `luna://com.webos.service.tvpower/power/registerScreenSaverRequest`

Include the following payload:
```json
{
    "subscribe": true,
    "clientName": "AnyValue"
}
```

When the screensaver is about to start, you will receive the following message:

```json
{
    "returnValue": true,
    "timestamp": "1388518297",
    "state": "Active",
    "instantBoot": "on"
}
```

To prevent the screensaver from starting, reply by sending a message to `luna://com.webos.service.tvpower/power/responseScreenSaverRequest` with the following contents (use the timestamp you've received previously):

```json
{
    "clientName": "AnyValue",
    "ack": false,
    "timestamp": "1388518297"
}
```

## Code sample

```js
var bridge = new WebOSServiceBridge();

bridge.onservicecallback = (msg) => {
    message = JSON.parse(msg);
    if (message.state = "Active") {
        bridge.call("luna://com.webos.service.tvpower/power/responseScreenSaverRequest", JSON.stringify({
            "clientName": "myWebApp",
            "ack": false,
            "timestamp": message.timestamp
        }));
    }
}

bridge.call("luna://com.webos.service.tvpower/power/registerScreenSaverRequest", JSON.stringify({
    "subscribe": true,
    "clientName": "myWebApp"
}))
```

# Native apps

Use `SDL_DisableScreenSaver` and `SDL_EnableScreenSaver`.
