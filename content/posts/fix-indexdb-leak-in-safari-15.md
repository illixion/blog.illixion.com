---
author: Manual
title: How to fix the indexedDB leak in Safari 15
date: "2022-01-16"
summary: I wrote a quick fix for the Safari 15 data leak as there's no patch for it yet, here's how to apply it.
tags: 
- macos
- ios
- safari
categories:
- general
---

## Preface

**Update**: iOS 15.2.1 does NOT fix this issue, and as such, this workaround is still the only way to protect yourself against personal data leaking to every website you vitit.

There's been a shocking disclosure made by fingerprintJS that revealed a critical bug in Safari 15's `indexedDB` implementation: it breaks the Same-Origin policy by revealing databases belonging to other websites. This allows any website to uniquely identify you, as well as reveal identifying information like your Google account IDs. You can read more on fingerprintJS's blog: <https://fingerprintjs.com/blog/indexeddb-api-browser-vulnerability-safari-15/>

## Solution

As a workaround, I wrote a userscript that will overwrite the `indexedDB.databases()` function to `undefined`, effectively preventing access to the database list. I'm not familiar with `indexedDB`, so I'm not sure if this is a bulletproof fix or whether it'll break websites, but it should at least prevent most exploitation attempts. This is also incredibly useful on iOS, where you cannot use any browser engine besides Safari, even in third-party browser apps.

**To start**, install the Userscripts app made by Justin Wasack: <https://apps.apple.com/us/app/userscripts/id1463298887?l=en>

Afterwards, launch the app and choose a path to a folder where you'll be storing your userscripts (I recommend creating a folder in iCloud). Once that's done, download the userscript and put it into the folder you've created. You'll also need to enable the Userscripts extension in Safari settings.

**Link to download the userscript**: <a href="/post_files/fix-indexdb-leak-in-safari-15/fix_indexdb_leak_safari15.user.js" download>Download</a>

You can check if the userscript worked by using this website: <https://safarileaks.com>

---

I hope that this article helped you, and please let me know your thoughts in the comment section below. I hope that Apple will provide a fix for this bug soon as it's quite severe.
