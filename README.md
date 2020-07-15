# alt:V - Discord Authentication with Toggleable Whitelist

Created by Stuyk (Trevor Wessel)

❤️ Please support my open source work by donating. I'm here to provide general context for complicated procedures for you new developers. ❤️

https://github.com/sponsors/Stuyk/

⭐ This repository if you found it useful!

# Summary

If you ever wanted to go with a passwordless login or authentication method. This is allows you to utilize Discord to help with user logins by utilize the oAuth2 Service provided by Discord.

This also comes with an optional whitelist where you can give players a `role` in order to get into the server.

This was meant to be as intuitive as possible but also as secure as we can make it.

This does require opening an additional port for express server purposes.

# Prerequisites

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

In your base gamemode directory where your `.exe` or `alt-server` files are. Simply run these commands.

```
npm install dotenv
npm install discord.js
npm install axios
npm install express
npm install cors
npm install sjcl
```

After simply add the name of this resource to your `server.cfg` resource section.
Then simply clone this repository into your main server resources folder.

# Port Forward

Open Port 7790 for your express server.

# Generating Your Bot

Create a Discord Bot at [https://discord.com/developers/](https://discord.com/developers/)

[Click here to see a .gif of the process.](https://gfycat.com/AncientPositiveBobcat)

# Add oAuth2 Redirect

You will need to add a specific file path to the oAuth2 bot. This setting can be found in the oAuth2 category of the discord developers application.

### Append the Following for Redirects

`http://127.0.0.1:7790/authenticate`

`http://<your_server_ip>:7790/authenticate`

**Make sure to save!**

# Updating Environment Variables

Open your `.env` file which should be located in the same directory as your `altv-server` file. Running this resource without the `.env` will generate it automatically. If you are not sure what a `.env` file is please use google.

```
ENABLE_WHITELIST=
CLIENT_ID=
CLIENT_SECRET=
BOT_SECRET=
SERVER_ID=
ROLE_WHITELIST_ID=
```

Anything marked with \* is OPTIONAL.

\*=Optional

## ENABLE_WHITELIST

This will automatically default to false. Meaning it will not turn on the whitelist.

Set this to true to enable the whitelist.

## CLIENT_ID

This can be found under the general information of the discord developers app. Copy the ID that is in plain text.

## CLIENT_SECRET

This can be found under the general information of the discord developers app. Reveal or cop the secret.

## REDIRECT_IP

If you are running your server locally and just for yourself. Use localhost.

If you are running your server for players to join use the IP for your machine.

Ensure you port forward 7790.

## BOT_SECRET \*

This can be found under the bot section of the discord developers app. Copy the secret for your bot.

## SERVER_ID \*

This can be found by enabling developer mode for Discord.

Discord App -> Settings -> Appearance -> Scroll Down to Advanced

Toggle `ON` Developer Mode

Right-click your server on the left-side and `Copy ID`

![](https://i.imgur.com/999mRsI.jpeg)

## ROLE_WHITELIST_ID \*

This can be found by enabling developer mode for Discord.

Discord App -> Settings -> Appearance -> Scroll Down to Advanced

Toggle `ON` Developer Mode

Go to your Server Roles for your Server.

Create a role called whatever you want. I used `whitelist`

Right-Click the role and select `Copy ID`

![](https://i.imgur.com/Dry1GlD.jpeg)

# Showing the Authentication Window

When a player first joins your server you will want to emit this event. We do not do it for you.

```js
alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    alt.emit('discord:BeginAuth', player);
}
```

# After Authentication

The users general Discord Information will be sent to you through an alt event.
You will also recieve the player which it belongs to.
The window will automatically close for that user.

```js
alt.on('discord:AuthDone', playerAuthDone);

function playerAuthDone(player, discordInfo) {
    console.log(discordInfo);
}
```
