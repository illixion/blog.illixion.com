---
author: Manual
title: How to recover BitWarden data with only a PIN
date: "2020-08-01"
summary: You forgot your master password. It happens to the best of us. Don't worry about your passwords however, for there is a way to recover them if you still remember your PIN
tags: 
- bitwarden
categories:
- tutorials
---

It happens to the best of us. You're using a password manager like everybody is supposed to, but you've kept using PIN and biometric authentication for longer than you can remember. People tend to forget things that they don't use often, and so one day realize that you need to reinstall the BitWarden app and you forgot the one password that you had to remember. Drat!

BitWarden forums will tell you that without a master password, your data is gone forever, and they will be only partially correct. BitWarden has no proper fail state for forgetting the master password, so if you can't remember it, you can no longer use any of the "secure" functions which includes stuff like exporting data. What they don't tell you though is that your PIN code encrypts your vault master key, which is stored on your machine, and so it's possible to do most things without knowing it.

## Brief overview of the BitWarden PIN encryption scheme

I am by no means an expert and I've only barely scratched the surface with my analysis, so take what follows with a grain of salt.

* Your vault and the private key are stored on your device
* Master password and the PIN code are able to decrypt the private key
* The private key is what actually encrypts your local vault

This private key is not very useful outside of the local storage paradigm as the BitWarden web interface also uses your master password in a hashed form for authentication. This is done so that you can't get anybody's vault without at least knowing the master password hash.

## Preface: how to open the developer tools

Note that this only works on the Desktop app and the Browser extensions, as they're the only versions of the app where you can invoke the developer tools. AFAIK mobile apps have no debugging options, so there's not much that you can do with those besides copying everything by hand.

Here's what you need to do:

* Desktop: press **F12** on the appication screen once you're logged in
* Browser: this highly depends on which browser you're using:
  * Chrome: go to the extensions screen, find the Bitwarden extension and press "Background page". You may need to enable the developer mode in the upper right if this doesn't show up.

| ![Chrome screenshot](/post_files/bitwarden-get-your-passwords-back/chrome.png) |
|:--:|
| *Chrome* |

  * Safari: open the BitWarden screen and right click, you should see a menu option to *Inspect Element*

| ![Safari screenshot](/post_files/bitwarden-get-your-passwords-back/safari.png) |
|:--:|
| *Chrome* |

  * Firefox: [follow these instructions](https://stackoverflow.com/questions/30752698/how-can-open-firefox-developer-tools-in-my-extensions-sidebar)

## Exporting the vault data without the master password

BitWarden's interface won't let you export data without the master password, but since the function that the interface calls doesn't care which decryption key you have, it's possible to bypass this restriction.

From the developer tools, open the console and execute one of the following commands:

```js
// JSON export (better for reimporting)
bitwardenMain.exportService.getExport('json').then(data => console.log(data))

// CSV export
bitwardenMain.exportService.getExport('csv').then(data => console.log(data))
```

Save the output to a new file and you've got your backup.

## But can I export the master password?

From my brief look into the source code, it would appear that the master password is not stored anywhere, only the vault decryption key is. You'll have to delete your account and sign up again as described here: <https://bitwarden.com/help/article/forgot-master-password/>. You can also contact BitWarden support to transfer over your premium subscription as that's not done automatically.

## What can be done to avoid this in the future?

Use password hints. Sure, they're less secure than having no password hint, but a useful password hint really can save you from all of this in the future. Another option would be writing down the master password and storing it somewhere safe, or breaking it up into pieces and storing it in multiple different places.
