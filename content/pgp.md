+++
title = "PGP"
description = "My PGP key"
author = "Manual"
+++

[PGP is bad and you should stop using it.](https://latacora.micro.blog/2019/07/16/the-pgp-problem.html) age is a more modern, simple and cryptographically sound way to encrypt messages and files, and I encourage you to use it instead.

To encrypt a message with my key using age, use this command:

```shell
age -r "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK3rN5+i/IqYCoHlKsz1MC1ESdBvSgSxrbu+QhGbedeV Manual@YubiKey5" -a -o encrypted_message.txt message.txt
```

But I understand that not everybody is willing to change their ways, so I've provided my PGP key below. Note that it's an ed25519 key however, so if your GPG client is too old to support those, update it.

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEX4pU4RYJKwYBBAHaRw8BAQdAUo0LGj51iAOO9IqU1uAgNBRRCPGXKM+btnNa
xxlaewO0HFZsYWRhcyBCYXJ5c2FzIDxhbUBjYXR0by5pbz6IkAQTFggAOBYhBF4I
9g+GXA31XDO215Ofol+vlVlkBQJfilThAhsDBQsJCAcCBhUKCQgLAgQWAgMBAh4B
AheAAAoJEJOfol+vlVlkzskBAPCqOkI1K5za9BJXJ+ePVK0znkM3o7g+sxwON/A8
+0dVAP486veU75rPSbM3CV4AQag0tuWEUdCodRso/oPi5C+yAbgzBF+KVOEWCSsG
AQQB2kcPAQEHQK3rN5+i/IqYCoHlKsz1MC1ESdBvSgSxrbu+QhGbedeViHgEGBYI
ACAWIQReCPYPhlwN9VwztteTn6Jfr5VZZAUCX4pU4QIbIAAKCRCTn6Jfr5VZZLF7
AQDCGZOoxlyQF9duOwsH4PUltj0+TqxEi/h+22tmYtsVPwD/Z3rkTUo5Keie92Ye
XXARGUu/JZwlXTzYnbyXHDgQXwS4OARfilThEgorBgEEAZdVAQUBAQdAkML4NeIS
IZ6TZ1O9OBo6dM/B0Nm0AGzvruSbDK2143ADAQgHiHgEGBYIACAWIQReCPYPhlwN
9VwztteTn6Jfr5VZZAUCX4pU4QIbDAAKCRCTn6Jfr5VZZJZkAP0TxZWEKWWgMYqb
ySSChAkkMnOzsgvCQWi9BizrAh7RRAD/dGXVHBDmB6so3QINkuAAigjgWUjjHgtp
SwfHsPGPXwI=
=1vvo
-----END PGP PUBLIC KEY BLOCK-----
```

**To verify the authenticity of this page**, go to its GitHub commit history and check if the last commit has been verified. Direct link to the commit history of this page: <https://github.com/manualmanul/catto.io/commits/master/content/pgp.md>
