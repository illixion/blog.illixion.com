---
author: Manual
title: How to enable Telegram's "Filter New Chats from Non-Contacts"
date: "2020-07-27"
summary: Telegram seems to limit who can see the new "Filter New Chats from Non-Contacts" setting to people who have already received a lot of spam. Thankfully, it's still possible to enable it before that happens.
tags: 
- tutorial
- telegram
categories:
- general
---

Telegram seems to limit who can see the new "Filter New Chats from Non-Contacts" setting to people who have already received a lot of spam. How availability is determined is unknown to me. Thankfully, this option is available through the Telegram Client API, so it's still possible to enable it before that happens.

This is a brief write-up and I won't go into the details of each step. You're expected to know how to use the command line of your preferred OS.

1. Generate Telegram Application API keys as described here: [https://core.telegram.org/api/obtaining_api_id](https://core.telegram.org/api/obtaining_api_id)
2. Install Python 3, Pip and Git
3. Run the following shell commands:

```shell
git clone https://github.com/LonamiWebs/Telethon.git
cd Telethon
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
python3 setup.py gen
python3
```

3. Now that your environment is set up, run the following Python commands in the interpreter:

```python
import os, sys
sys.path.insert(0, os.getcwd())
from telethon import functions, types
from telethon.sync import TelegramClient

# These example values won't work. Replace them with your own credentials.
api_id = 12345
api_hash = '0123456789abcdef0123456789abcdef'

with TelegramClient('session_name', api_id, api_hash) as client:
    result = client(functions.account.SetGlobalPrivacySettingsRequest(
        settings=types.GlobalPrivacySettings(
            archive_and_mute_new_noncontact_peers=True
        )
    ))
    print(result.stringify())
```

If the request was successful, you'll receive the following output:

```python
GlobalPrivacySettings(
	archive_and_mute_new_noncontact_peers=True
)
```

Please comment below if this doesn't work for you so that I can update this article accordingly.
