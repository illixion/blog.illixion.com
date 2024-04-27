---
author: Ixion
title: Setting up a secure Mastodon server in 2024
date: "2024-04-27"
summary: What I've learned about hardening a public Mastodon server after a year of it being public
tags: 
- mastodon
categories:
- general
---

Back in July of 2023, I've launched [synth.zip](https://synth.zip), a Mastodon-compatible server utilizing [Pleroma](https://pleroma.social) as the backend software. Using my professional experience, I've configured it in a way that allows it to be resistant to DDoS attacks and botting attempts. And now, you too can learn how you can self-host and harden your Mastodon instance, without exposing it to potential attacks.

## Preface

If you'd rather avoid the maintenance and setup required for hosting a Mastodon server, I'd recommend checking out [Cloudflare Wildebeest](https://github.com/cloudflare/wildebeest), which allows you to deploy it to Cloudflare Workers, a serverless platform for running public services. There are also other hosts, which can be found here: https://docs.joinmastodon.org/user/run-your-own/

If you do want to manage your own server, here are some considerations that you should make:

1. Hosting location - you can use AWS EC2, Linode, Digital Ocean or any VPC hosting provider. You can also host the server on your own computer at home, which thankfully is pretty easy with Cloudflare Tunnels, which allows you to make it accessible without requiring a publicly-accessible IP or port-forwarding.

2. Backend software - the main one that we all know is [Mastodon](https://joinmastodon.org), however it is designed for very large instances and as such requires a lot of resources, so you may want to consider alternatives such as Pleroma. My server uses Pleroma, and it's a lighter alternative with very close feature parity. From my personal experience, there are still some issues like not being able to fetch comments on posts made on other servers, but for my use case it works well.

3. Domain name - you will likely want to buy a domain name to be used for your Mastodon instance. You can use any registrar you prefer, I personally use [Porkbun](http://porkbun.com) and I'm quite happy with them. Cloudflare Tunnels can also generate a temporary domain name if you just want to try it out, but it shouldn't be relied upon as your @ handle will also include it.

4. Administration - you will need to moderate your instance, as well as accept the possibility of illegal content being uploaded, which you'll need to look out for and remove when it is discovered or reported. You'll also want to have a sensible set of rules, to prevent the instance from becoming toxic and/or defederated. Finally, you'll need to set up an incoming email address and an email provider for outgoing mail, so you can send mail to your users and to communicate with other Mastodon admins. I personally use SendGrid for outgoing mail and iCloud Mail for Custom Domains to receive mail, but there are other options including Cloudflare's free mail forwarding service.

## Setting up Mastodon

Depending on which software you chose, you can follow the instructions in their docs to get started. At the end, you should have a Mastodon server that you can access locally via the server's LAN IP address. You don't have to expose it to the internet yet, as we'll be using Cloudflare Tunnels to make it accessible without revealing your IP address.

**Why is using Cloudflare Tunnels important?** Conventionally, you'd open a port on your router or firewall and allow anyone on the internet to access your server directly. However, this opens you to a possibility of a DDoS attack, since anyone can easily send spam traffic to your IP address. Cloudflare Tunnels sidesteps that issue by forwarding traffic to your server via the Cloudflare network, masking the server's IP and providing DDoS protection.

To learn more and set up CF Tunnels, see this page: <https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/>

You can use a remotely managed tunnel to configure everything through Cloudflare Dashboard, only requiring you to install `cloudflared` on the server and link it to your Cloudflare account. It's also worth mentioning that both Mastodon and Pleroma don't expect you to use tunnels, and as such require HTTPS for communication. You can generate a self-signed HTTPS certificate using these commands:

```sh
sudo -i
mkdir /etc/nginx/ssl
cd /etc/nginx/ssl
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 99999 -in server.csr -signkey server.key -out server.crt
```

Afterwards, set the endpoint in your tunnel configuration to something like `https://localhost:443` and enable "No TLS Verify" to accept the self-signed certificate. You can use a real certificate from LetsEncrypt, but using it will be complicated and it is unnecessary for local traffic, since Cloudflare generates a valid certificate for your publicly accessible address automatically.

## Securing outgoing connections

Mastodon allows anyone to use the search bar to make outgoing requests to any server on the internet, meaning that an outgoing connection can still expose your server's real IP address. To address this, you can use Cloudflare WARP, which is essentially a VPN that forwards all traffic via the Cloudflare network. This also has other benefits, such as enabling IPv6 if it's not available and potentially improving performance due to better peering.

Setting up Cloudflare WARP is easy, and you can use this guide to do so: <https://developers.cloudflare.com/warp-client/get-started/linux/>

Generally, you'll just need to run these commands to fully set it up:

```sh
sudo apt update
sudo apt install cloudflare-warp

# If not found, add the repo using instructions here: https://pkg.cloudflareclient.com/

warp-cli registration new
warp-cli set-mode warp+doh
warp-cli connect

# To verify, run this and look for warp=on:
curl https://www.cloudflare.com/cdn-cgi/trace/
```

## Securing sign-ups

If you're planning to use open sign-ups, I'd heavily suggest adding some form of CAPTCHA to ensure that your instance is resistant to bots using it for spam. [Mastodon offers hCaptcha](https://docs.joinmastodon.org/admin/optional/captcha/), and Pleroma has a less secure but still useful basic CAPTCHA. Alternatively, you can use Approval mode to personally review registrations and a rate limit for sign-ups, which is more secure since massive registration waves by bots will be mitigated. I also recommend setting up email verification for sign-ups, which can help mitigate more basic bot registration attempts. Botting is a real concern in the Mastodon world, and mitigating it is important for keeping your instance federated and accessible in the Fediverse.

## Conclusion

As you can see, securing a Mastodon server requires some additional steps, but it isn't a complicated process and helps significantly improve your odds against automated attacks. This isn't an exhaustive guide however, and security is a journey, not a destination. Please let me know what you think, and I hope that this article was helpful!