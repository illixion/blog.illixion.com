---
author: Ixion
title: How to enable Telegram's "Filter New Chats from Non-Contacts"
date: "2020-07-27"
summary: Telegram seems to limit who can see the new "Filter New Chats from Non-Contacts" setting to people who have already received a lot of spam. Thankfully, it's still possible to enable it before that happens.
tags: 
- telegram
- python
categories:
- tutorials
---

**Update (2022/01/02)**

This method no longer works as Telegram has implemented a server-side check for whether you're allowed to use this feature. There aren't any other workarounds as far as I know. I've opened a feature request on the Telegram bug tracker, please consider giving it an upvote and a comment if you'd like to see this become available for everyone: <https://bugs.telegram.org/c/13017>

---

Telegram seems to limit who can see the new ["Filter New Chats from Non-Contacts"](https://telegram.org/blog/profile-videos-people-nearby-and-more#filter-new-chats-from-non-contacts) setting to people who have already received a lot of spam. How availability is determined is unknown to me. Thankfully, this option is available through the Telegram Client API, so it's still possible to enable it before that happens.

This is a brief write-up and I won't go into the details of each step. You're expected to know how to use the command line of your preferred OS.

1. Generate Telegram Application API keys as described here: [https://core.telegram.org/api/obtaining_api_id](https://core.telegram.org/api/obtaining_api_id)
2. Install Python 3, Pip and Git, as well as the **Telethon** package

3. Now that your environment is set up, run the following Python commands in the interpreter:

```python
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

Please comment below if this stops working so that I can update this article accordingly.
