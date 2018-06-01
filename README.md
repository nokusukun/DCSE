# DCSE
Discord Client Side Encryption for BetterDiscord


# Discord Client Side Encryption
Get (almost) seamless client side encryption for discord. It works for Private Messages or entire servers.
This uses the crypto.js library for AES Encryption/Decryption. 100% unicode compatible.

## Disclaimer
This does not provide 100% security. The plugin can only get as secure if you take care in exchanging passphrases and safeguarding your PC from localStorage theft. This only provides an additional layer of security between the discord servers and you.

## Usage: Setting Up
-------
After installing the plugin, a text box will appear on the channel header.
![Header](http://i.imgur.com/6bUKCR3.png)


Set the passphrase that you and the other members have agreed on.

**The passphrases are all saved in localStoarage and is unique for each user/server.**

**_You must change channels if you changed passphrases to reload the changes._**

![During](http://i.imgur.com/UuELGYS.png)

_The textbox becomes green if there's a passphrase already set._

![After](http://i.imgur.com/Ndv0Lps.png)

## Usage: Actually using it
------
To send an encrypted message, just append your text with `..cse[space]` to encrypt it.

_Issue: The space is needed because of discord's internal processes. Probably has to do with react's model bindings. If anyone has a fix to avoid adding space to update react's internal models then that would be great!_

[Here's a gifv in action](http://i.imgur.com/cZZPNAC.gifv)

The messages are appropriately colored and prefixed to distinguish encrypted messages from regular messages.

![It works in unicode too!](http://i.imgur.com/WVNKFWY.png)

Encrypted messages with the wrong password is shown as a red `[?!]`

![Red pls](http://i.imgur.com/qE3Ti1I.png)

This is what the messages look like from anyone who doesn't have the plugin installed.

![SPAM](http://i.imgur.com/ggBtXQe.png)

## Issues
------
Programmatically change the chatbox value. Discord has moved to a new process where it's internally keeping track of the text in the chatbox. The only way for the encrypted text to stick is for it to be preceeded by a space hence the `..cse[space]`.


## Stuff to do
------
TODO1: Figure out a way to catch the messages and encrypt them upon hitting the enter key.

TODO2: Make a toggle setting if TODO1 is solved.

TODO3: Write a better readme.md
