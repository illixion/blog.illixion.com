---
author: "Ixion"
title: "Can't download Windows due to error 715-123130? Use a different browser."
date: 2022-10-22T17:40:03+03:00
summary: The solution for error code 715-123130 ended up being quite simple, despite the unhelpful error message.
tags: 
- microsoft
categories:
- tipsandtricks
---

Have you just encountered the following error while trying to download a Windows 11 ISO or Windows 11 on ARM Insider Preview VMDK?

> We are unable to complete your request at this time.Some users, entities and locations are banned from using this service. For this reason, leveraging anonymous or location hiding technologies when connecting to this service is not generally allowed. If you believe that you encountered this problem in error, please try again. If the problem persists you may contact Microsoft Support – Contact Us page for assistance. Refer to message code 715-123130 and ...

After (unsuccessfully) trying to solve this with Microsoft online chat over the course of 3 different chat sessions, I've finally figured out that the problem was related to the browser I was using. Specifically, I was using Safari on macOS Monterey, and the error went away after switching to Firefox. Chromium-based browsers may work too, but I haven't checked.

Hope this helps!
