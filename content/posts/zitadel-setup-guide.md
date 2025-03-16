---
author: Ixion
title: Setting up a self-hosted ZITADEL OAuth service on Ubuntu 22.04 with Tailscale
date: '2025-03-16'
summary: A walk-through guide for setting up ZITADEL, a self-hosted IAM solution written in Go, and integrating it with Tailscale.
copyright_notice: Parts of this article were written by AI
tags:
  - oauth
categories:
  - tutorials
---

## Introduction

In modern applications, authentication and identity management are crucial components. ZITADEL is an open-source Identity and Access Management (IAM) solution that provides OAuth2, OpenID Connect, and other authentication mechanisms. Self-hosting ZITADEL allows organizations to maintain control over their authentication infrastructure, ensuring security, compliance, and flexibility.

This guide will walk you through setting up a self-hosted ZITADEL instance on Ubuntu 22.04. By following these steps, you will configure a secure authentication service with PostgreSQL as the backend, TLS encryption, and then optionally integrate it with Tailscale.

## Prerequisites

Before proceeding, ensure you have:

- A fresh Ubuntu 22.04 server ([22.04 is used as ZITADEL is tested against it](https://zitadel.com/docs/self-hosting/deploy/linux))
- Root or sudo privileges
- A domain name (e.g., `auth.example.com`)
- Cloudflare account (if using Cloudflare Tunnels)
- Tailscale account (if integrating with Tailscale)

## Step 1: Download and Install ZITADEL

1. Download the latest ZITADEL binary from the official repository:

   ```bash
   # For x86 CPUs
   wget https://github.com/zitadel/zitadel/releases/latest/download/zitadel-linux-amd64.tar.gz

   # For ARM CPUs
   wget https://github.com/zitadel/zitadel/releases/latest/download/zitadel-linux-arm64.tar.gz
   ```

2. Rename and move the binary to `/usr/local/bin`:

   ```bash
   # For x86 CPUs
   tar xvf zitadel-linux-amd64.tar.gz
   mv zitadel-linux-amd64/zitadel /usr/local/bin/zitadel
   chmod +x /usr/local/bin/zitadel

   # For ARM CPUs
   tar xvf zitadel-linux-arm64.tar.gz
   mv zitadel-linux-arm64/zitadel /usr/local/bin/zitadel
   chmod +x /usr/local/bin/zitadel
   ```

## Step 2: Install and Configure PostgreSQL

1. Since PostgreSQL allows worldwide access by default, it is recommended to install a firewall and restrict access to the server. Install and configure UFW:

   ```bash
   sudo apt update && sudo apt install -y ufw
   sudo ufw allow ssh  # Allow SSH
   sudo ufw enable
   ```

2. Install PostgreSQL:
   ```bash
   sudo apt update && sudo apt install -y postgresql
   ```

3. Change the default PostgreSQL password:
   ```bash
   sudo -u postgres psql
   ALTER USER postgres PASSWORD 'newpassword';
   \q
   ```

## Step 3: Create a Dedicated Linux User for ZITADEL

```bash
sudo adduser zitadel    # Enter any details and any password
sudo passwd -d zitadel  # Disables password, prevents its usage for SSH authentication
```

## Step 4: Generate ZITADEL Encryption Key

```bash
tr -dc A-Za-z0-9 </dev/urandom | head -c 32 > /home/zitadel/zitadel-masterkey
chown zitadel:zitadel /home/zitadel/zitadel-masterkey
chmod 600 /home/zitadel/zitadel-masterkey
```

## Step 5: Generate Self-Signed TLS Certificate

```bash
openssl genpkey -algorithm RSA -out tls.key
openssl req -new -key tls.key -out tls.csr
openssl x509 -req -days 3650 -in tls.csr -signkey tls.key -out tls.crt
mv tls.key /home/zitadel/selfsigned.key
mv tls.crt /home/zitadel/selfsigned.crt
chown zitadel:zitadel /home/zitadel/selfsigned.*
```

## Step 6: Configure ZITADEL

Create the configuration file at `/home/zitadel/config.yml`:

```yaml
Log:
  Level: info
  Formatter:
    Format: text

Port: 443
ExternalPort: 8443 # This port should be same as what's used in Cloudflare Tunnels
ExternalDomain: auth.example.com
ExternalSecure: true

TLS:
  Enabled: true
  KeyPath: /home/zitadel/selfsigned.key
  CertPath: /home/zitadel/selfsigned.crt

# Update credentials here
Database:
  postgres:
    Host: localhost
    Port: 5432
    Database: zitadel
    User:
      Username: zitadel
      Password: zitadel
    SSL:
      Mode: 'disable'
    Admin:
      Username: postgres
      Password: newpassword
      SSL:
        Mode: 'disable'

Machine:
  Identification:
    PrivateIp:
      Enabled: false
    Hostname:
      Enabled: true
```

Set permissions:

```bash
chown zitadel:zitadel /home/zitadel/config.yml
chmod 600 /home/zitadel/config.yml
```

## Step 7: Create a systemd Service for ZITADEL

Create a systemd service file at `/etc/systemd/system/zitadel.service`:

```ini
[Unit]
Description=ZITADEL Service
After=network.target

[Service]
User=zitadel
ExecStart=/usr/local/bin/zitadel start-from-init --tlsMode enabled --config /home/zitadel/config.yml --masterkeyFile /home/zitadel/zitadel-masterkey
Restart=always
Environment=ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME="root" ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD="RootPassword1!"

[Install]
WantedBy=multi-user.target
```

Reload systemd and enable the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now zitadel
```

Verify that ZITADEL is running:

```bash
sudo systemctl status zitadel
```

## Step 8: Set Up Cloudflare Tunnel

At this point, ZITADEL is running on your server, but it is not accessible from the internet. To expose it securely, you can use Cloudflare Tunnels.

1. Install `cloudflared` and authenticate with Cloudflare.
2. In Cloudflare Zero Trust tunnels page, configure the tunnel to use `https://localhost:8443`, disable TLS certificate checking and enable HTTP/2 origin. You'll also need to go to the Cloudflare dashboard for your domain and enable gRPC in the Network tab.
3. **Optional**: if your server doesn't have IPv4, update the `cloudflared` systemd unit file located at `/etc/systemd/system/cloudflared.service` to use IPv6 instead:
   ```ini
   ExecStart=/usr/bin/cloudflared --edge-ip-version 6 --no-autoupdate tunnel run --token ...
   ```

If you don't want to use Cloudflare Tunnels, you can set up a reverse proxy using Nginx or Caddy and point it to `https://localhost:8443`.

## Step 9: Integrate ZITADEL with Tailscale

To get started, log into ZITADEL using the default credentials and change the password when prompted. The default credentials are:

- **Username:** `root@zitadel.localhost`
- **Password:** `RootPassword1!`

After logging in, you should see the ZITADEL dashboard. Now, you can integrate ZITADEL with Tailscale for user authentication.

1. In the ZITADEL admin panel, create a new project:

   - **Name:** Tailscale
   - **Application Type:** Web
   - **Redirect URI:** `https://login.tailscale.com/a/oauth_response`
   - **Post Logout Redirect URI:** `https://login.tailscale.com/a/oauth_response`
   - **Allowed Scopes:** `openid, email, profile, groups`
   - **Grant Types:** `authorization_code, refresh_token`
   - **Response Types:** `code`
   - **Auth Token Type:** `Bearer`
   - ✅ Enable **Refresh Token**

2. Obtain the client ID and secret.
3. Set up Tailscale at [Tailscale OIDC Setup](https://login.tailscale.com/start/oidc).

## Step 10: Set Up WebFinger for Domain Ownership

Tailscale requires a file to be hosted on your main website to prove ownership of the domain. It should be hosted using a URL like `https://example.com/.well-known/webfinger` and it should contain the following contents:

```json
{
  "subject": "acct:admin@example.com",
  "links": [
    {
      "rel": "http://openid.net/specs/connect/1.0/issuer",
      "href": "https://auth.example.com"
    }
  ]
}
```

Host this file using Cloudflare Pages or another web service. This could also be served directly by the ZITADEL server with some additional nginx configuration.

## Conclusion

You have now successfully set up a self-hosted ZITADEL OAuth service on Ubuntu 22.04. You can use it to authenticate users for various applications, including Tailscale.
