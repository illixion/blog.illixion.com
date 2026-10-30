---
author: Ixion
title: "iOS sideloading error -80046, and how I solved it in Apparition"
date: "2026-10-24"
summary: Since 22 October, free-account sideloading tools fail with -80046 right after the password. Apple stopped issuing the developer token to sign-ins that claim to come from an Android phone. Claiming a Mac on that one token request works. On 29 October a separate 403 turned out to be a firewall rule on the Content-Type header, fixed by sending text/xml.
copyright_notice: Parts of this article were written by AI
tags:
- ios
- visionos
- sideloading
categories:
- general
---

> **TL;DR:** Since about 22 October, sideloaders that sign in with a free Apple ID fail with
> -80046 ("This action cannot be completed at this time") right after the password or the
> two-factor code. Apple no longer gives out the token for its developer services when the
> request says it comes from an Android phone, which is what these tools have claimed since
> the [-80045 fix](/2026/10/building-apparition/#fixing-a-tool-that-signs-in).
>
> - **If you use a sideloader:** the quickest way out is [Apparition](https://apparition.illixion.com),
>   my free, open-source sideloader for Vision Pro, iPhone, iPad and Apple TV. It has had the fix
>   since 0.3.0, and the [latest release](https://github.com/illixion/Apparition/releases/latest),
>   0.3.5 as of 28 October, is the one to get. Or update the tool you have: here's
>   [where each tool stands](#where-the-tools-stand).
> - **If you write one:** keep claiming Android for the sign-in, and claim a Mac on the Xcode
>   token request and the developer requests after it. [Details below](#fixing-a-tool-that-signs-in);
>   no Mac anisette server needed.

> **Update, 30 October (evening):** Apple's refusal of Android anisette turned out not to be about
> the anisette at all. A firewall rule rejected the `Content-Type` sideloaders send, and
> changing that one header fixes it. [The full story](#update-30-october-it-was-the-content-type);
> Apparition 0.4.3 has the fix.

## The quick fix: Apparition

<p align="center"><img src="/post_files/building-apparition/apparition-icon.png" width="128" alt="Apparition's icon, a ghost holding an app tile"></p>

[Apparition](https://apparition.illixion.com) signs in with a free Apple ID and doesn't run into
-80046, and it doesn't rely on anyone's anisette server. It's a sideloader that runs on the
device itself, so after the first install you can refresh your apps and launch them with JIT
without a computer in the loop:

- **Runs on Apple Vision Pro, iPhone, iPad and Apple TV**, with desktop apps for macOS, Windows
  and Linux for the first install.
- **Installs from AltStore and SideStore sources**, from a GitHub project's releases, or from an
  IPA or `.deb` you already have.
- **Refreshes apps on its own** before the 7 days of a free account run out.
- **Launches emulators with JIT**, which works on visionOS 27 and current iPhone chips again.
  The older debugger trick no longer does.

To get it, download **[the latest release](https://github.com/illixion/Apparition/releases/latest)**
(0.3.5 as of 28 October) or the desktop app from [apparition.illixion.com](https://apparition.illixion.com), and follow
the [setup steps](/2026/10/building-apparition/#apparition-if-you-want-to-try-it). If you
installed an earlier build, update it: 0.3.0 is the first with the -80046 fix, and the
releases since fix a good deal else (0.3.1 makes the Enable JIT prompt on Vision Pro appear in
front of you, 0.3.2 installs `.deb` apps such as Kodi, and 0.3.5 adds a Stop button and lets
iPhone and iPad use LocalDevVPN without a computer). The rest of this article explains what
went wrong, and what the other tools did about it.

## What the error looks like

> Auth error -80046: This action cannot be completed at this time.

It shows up right after Apple has accepted your password. In my case there was no two-factor
step, which is common for these sign-ins, so it came straight after the password. Others got a
code on their phone, typed it in, and then got -80046. Either way it's the step where the tool asks for
the token Apple's developer services need (`com.apple.gs.xcode.auth`), the one that lets it
make certificates and profiles.

It started for everyone on 22 October:
[SideStore](https://github.com/SideStore/SideStore/issues/1686),
[AltStore](https://github.com/altstoreio/AltStore/issues/1840),
[xtool](https://github.com/xtool-org/xtool/issues/378) and
[iPASide](https://github.com/pwnapplehat/iPASide/issues/9) all got it at this step. iPASide's
trace shows it clearly: `init` and `complete` succeed, `apptokens` returns `ec=-80046`.

## Why tools claim to be an Android phone

Every Apple ID sign-in carries anisette data, headers that identify the machine to Apple. On a
Mac, macOS makes them. Sideloaders that sign in from Windows, Linux or a server can't run
Apple's Mac code, so for years they've used the copy of Apple's anisette code that ships in
Apple Music for Android. That's what an "anisette server" usually runs.

The sign-in also says which device it comes from, in a header called `X-Mme-Client-Info`.
Tools used to claim a Mac there. Since 12 October, Apple refuses sign-ins whose claimed
platform doesn't match the anisette (-80045), so the fix was to claim Android whenever the
anisette comes from Android code. I wrote up how that was found in
[the Apparition story](/2026/10/building-apparition/). Ten days later, -80046 is the next step
refusing that same Android claim.

## Where the tools stand

As of 28 October:

- **Apparition** uses the fix below, without a third-party server. The fix is in
  [0.3.0](https://github.com/illixion/Apparition/releases/tag/v0.3.0) and later; get the
  [latest release](https://github.com/illixion/Apparition/releases/latest), currently 0.3.5.
- **xtool**, **iloader**, **atvloadly** and **iPASide** work again, from xtool 1.23.0, iloader
  2.4.0, atvloadly 0.7.4 and iPASide 1.2.9. They switched to a Mac's anisette, mostly from
  jkcoxson's server `mac-ani.jkcoxson.com`, instead of Android's (atvloadly through bitxeno's
  PlumeImpactor fork). Since then:
  - xtool 1.24.0 fixes another source of HTTP 503 errors at sign-in.
  - iloader 2.4.1, released on 28 October, overrides the client info to fix 403 errors on SMS two-factor
    codes, and adds its own anisette server, `ani.iloader.app`.
  - atvloadly 0.8.0 and later always use a remote anisette server, and warn that sign-in can
    fail while that server is unstable. The latest is 0.8.1.
  - iPASide tries three servers in turn, so one being down doesn't stop sign-in. The latest is
    1.2.13.
- **SideStore** has no release with a fix; its latest is still the September 0.7.0-alpha, and
  two pull requests aimed at sign-in errors are open and unmerged. Users report getting in by
  picking jkcoxson's server in its anisette settings, often only after several tries.
- **AltStore** has no fix yet, and its latest release is still September's 2.3. Pull requests
  that send the anisette server's user agent, or sign in with Windows anisette data, are open.

If your tool isn't fixed yet, switch to one that is, or update when it is, rather than retrying
your real account over and over, which risks a temporary lock.

The Mac server works, but it means most of these tools' sign-ins depend on one person's
server, and I couldn't find its source. A few now try other servers as well, but that's still
other people's servers handling your sign-in.

## Finding what Apple actually checks

My first thought was the same mistake as with -80045: Apple must have banned the Android
anisette code. The other maintainers who fixed this reached the same conclusion first: xtool's
fix says Apple "now blocks Android-identifying clients", and iPASide's says it refuses sign-in
for anisette generated by Android's libraries. If that were the whole story, the only way out would be a Mac's own anisette, and that's
no general fix. On macOS 27, programs that aren't Apple's get nothing from the anisette daemon, and
`CoreADI.framework` now contains only the daemon, so there's no library left to load. My old
Intel MacBook Pro on macOS 15 can still serve it, but that's no help to someone with an iPhone
and a Windows PC.

But the sign-in itself worked: Apple accepted the Android anisette and the password, and only
refused the token afterwards. With a valid session, I could ask for the token in as many ways
as I liked without signing in again each time. So I wrote a
[small probe](https://github.com/illixion/Apparition/blob/main/core/examples/apptoken_probe.rs).
It signs in once with Android anisette, claiming Android, then sends the token request in
several variants and prints Apple's answer to each:

| Token request (Android anisette, sign-in claimed Android) | Result |
|---|---|
| As before, claiming Android | -80046 |
| Without the `X-Xcode-Version` and `X-Apple-App-Info` headers | -80046 |
| Claiming Android, but naming Xcode as the program | -80046 |
| `svct` set to Xcode instead of iCloud | -80046 |
| Claiming a Mac (`<Mac15,7> <macOS;27.0;…> <com.apple.AuthKit/1 (com.apple.akd/1.0)>`) | **token** |
| An iCloud token instead, claiming Android | token |

That's the whole story: one header on one request. The anisette is still Android's, and the
session is still the one that signed in as Android. If the token request says it comes from a
Mac, Apple issues the token.

My guess at the reasoning, and it's only a guess: the anisette check runs at sign-in, and that's
where -80045 comes from. The new check is a policy check on the token itself. An Xcode token for
a device that says it's an Android phone makes no sense, because Android can't run Xcode, so
Apple stopped issuing one, without checking the claim against the anisette. The iCloud token
still being fine for Android fits that.

With the change in place, the full sign-in went through with Android anisette on macOS 27: a
normal two-factor prompt, then the developer services listing my certificates. It also worked
from an Apple TV, signing in through a Mac's Apparition companion and installing an app. No
third-party server was involved.

## Fixing a tool that signs in

1. Keep claiming Android in `X-Mme-Client-Info` for the sign-in itself when the anisette comes
   from the Android code, and handle the code Apple pushes to the user's devices, as in
   [the -80045 fix](/2026/10/building-apparition/#fixing-a-tool-that-signs-in).
2. Once the password is accepted, send the `apptokens` request for `com.apple.gs.xcode.auth`
   with a Mac's client info and User-Agent, for example
   `<Mac15,7> <macOS;27.0;26A5378j> <com.apple.AuthKit/1 (com.apple.akd/1.0)>` and
   `akd/1.0 CFNetwork/808.1.4`.
3. Keep claiming a Mac for the developer services requests made with that token. That's what I
   tested; I didn't try those claiming Android. Apple seems to tie the token to the client info
   it was issued for: PlumeImpactor's maintainers found that switching identities breaks
   refreshes with "session has expired".
4. Fetch GrandSlam's URL bag with the sign-in's own claim. isideload 0.5.0 always fetches it
   claiming a Mac, and with an Android sign-in GrandSlam then answers the first password request
   with HTTP 503. Apart from that, GrandSlam sometimes answers 503 to a request it accepted
   moments earlier, so expect the odd one.

Apparition's version is in
[`claimed_platform.rs`](https://github.com/illixion/Apparition/blob/main/core/src/claimed_platform.rs)
(`Claim::after_sign_in`), plus a small hook in its vendored isideload (`GrandSlam::claiming`).

This is tested on one account so far. If it fails for yours, the probe shows what Apple answers
to each variant in a single sign-in, so you don't have to guess.

## Update, 29 October: HTTP 403 at sign-in

> *Partly superseded: the DNS explanation below was real that day, but the server was only the
> first to carry a rule that reached all of them the next day. See the
> [30 October update](#update-30-october-it-was-the-content-type).*

A different failure turned up on a Linux machine, before the password was even checked:

> Received error response from grandslam: HTTP status client error (403 Forbidden) for url
> (https://gsd.apple.com/grandslam/GsService2)

It isn't the 403 that iloader 2.4.1 fixed for SMS codes. This one came on the very first
sign-in request, and it had nothing to do with the account: a made-up Apple ID got it too.
So I took the setup apart one piece at a time, with that made-up account:

- **Anisette:** an external server gave the same 403.
- **The client:** a plain `curl` with the same headers and body got 403 from that machine, and
  a normal answer from my Mac and from another Linux PC.
- **The network:** all three share one public IP address, and the clock, time zone and locale
  matched.

What differed was DNS. That machine asked Cloudflare's 1.1.1.1, and the others asked the router.
`gsd.apple.com` sits behind a CDN that hands out a different Apple server depending on who asks.
1.1.1.1 always pointed to one server, which answers every sign-in request with a plain HTML
`403 Forbidden` page before Apple reads it. Forcing `curl` onto that server's address made my
Mac fail the same way, and forcing the broken machine onto the router's server fixed it.
Pointing its DNS at the router fixed sign-in.

Changing DNS isn't something people should have to do, so Apparition now handles it. It still
uses the system's DNS first. When an Apple server answers with that HTML 403, Apparition avoids
that server for an hour and retries on another, so it doesn't keep knocking on one that refuses.
If the system's DNS knows no other server, Apparition looks one up over DNS-over-HTTPS, from
Google's and Cloudflare's. The lookups take more than one source, because the CDN rotates its
answers and Google sometimes returned the refusing server too. Only that address lookup goes
elsewhere; the Apple ID request still goes straight to Apple. If three servers refuse, the error
says Apple turned the network away and suggests another network or the router's DNS. The change
is on `main` ([`edge.rs`](https://github.com/illixion/Apparition/blob/main/core/vendor/isideload/src/auth/edge.rs))
and will be in the next release.

If you write a sideloader and see this 403, check the request's `Content-Type` first (see the
30 October update), then which server `gsd.apple.com` resolves to.

## Update, 30 October: sign-in needs a Mac's anisette (wrong)

This section said Apple had started refusing Android anisette outright and that a Mac's anisette,
from a third-party server or a macOS VM, was the only way in. That was my conclusion from the
403s and 503s below, and it was wrong. I've left the evidence here and put the real cause after it.

By 29 October `gsd.apple.com` answered 403 to every request carrying Android anisette, from my
home network and from a server in Frankfurt, while `gsa.apple.com` answered 503 to every request
claiming Android and about half the time to a Mac claim with Android anisette. A Mac's own
anisette sailed through, which looked like the proof.

## Update, 30 October: it was the Content-Type

What I couldn't explain was that a cellular connection, a clean IP address I had never signed in
from, got the same 403. So I stopped changing the anisette and started taking the request apart,
header by header, against `startMachineProvisioning` on `gsd.apple.com` (a made-up account again;
the first request of a sign-in carries no password). The 403 is a plain HTML page from Apple's
edge, sent before Apple's own code reads the request, and it is keyed on one header:
**`Content-Type`**.

| Content-Type | `gsd.apple.com` (provisioning) | `gsa.apple.com` (sign-in) |
|---|---|---|
| `text/x-xml-plist` (what sideloaders send) | 403 | works |
| `application/x-xml-plist` | works | 403 |
| `text/xml` | works | works |

The two servers block opposite values, and provisioning is the first thing a sign-in does, which
is why everything died there. The anisette, the serial, the client info, the User-Agent and the
network never mattered. The same server address, 17.171.11.101, returns 403 to `text/x-xml-plist`
and a normal answer to `text/xml`. That also settles the 29 October DNS story: the rule reached
some servers first, so choosing another one dodged it for a day, and then it reached all of them.

The body is XML either way and Apple parses it the same, so the fix is one line: send
`Content-Type: text/xml`. With it, the throwaway account gets Apple's own "account information was
entered incorrectly" answer instead of a 403, which means provisioning, the URL bag and the
sign-in's first request all reach Apple and the Android anisette is accepted. Apparition 0.4.3
sends it, signs in with its built-in anisette again, and no longer needs a Mac's anisette or a
server. The third-party server and macOS VM routes from 0.4.2 still work if you prefer them.

I'd also added a hardware-identity field to the request on the theory that Apple wanted a serial,
and the earlier retry-on-another-server logic stays as a general fallback. Neither was the cause.

If you write a sideloader and it started getting 403 or 503 on 29 October, change your
`Content-Type` to `text/xml` on every GrandSlam request before touching your anisette. Apple may
move the rule again; the symptom to look for is a 403 with an HTML body and no Apple error code.
