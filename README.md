[![](https://i.imgur.com/qzftIlN.jpg)](https://www.youtube.com/watch?v=eJfpeqqeUEY)

# alt:V - Discord Authentication with Optional Whitelist

[❤️ Become a Sponsor of my Open Source Work](https://github.com/sponsors/Stuyk/)

[⌨️ Learn how to script for alt:V](https://stuyk.github.io/altv-javascript-guide/)

⭐ This repository if you found it useful!

# Summary

If you ever wanted to go with a passwordless login or authentication method. This is allows you to utilize Discord to help with user logins by utilize the oAuth2 Service provided by Discord.

This was meant to be as intuitive as possible but also as secure as we can make it. Which means we utilize an express server to help mitigate fake client-side data.

This resource requires opening port `7790`.

This resource requires a Discord Developer Application. (Free)

If you plan on using the whitelist it requires a Discord Bot. (Free)

This also comes with an optional whitelist where you can give players a `role` in order to get into the server. The whitelist automatically updates when you add or remove a role from the user. It also automatically re-parses the whitelist every `60` seconds.

Looking for a traditional login with Username and Password? Try out [alt:V OS Auth](https://github.com/Stuyk/altv-os-auth/).

# Prerequisites

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

After simply add the name of this resource to your `server.cfg` resource section. It must be named exactly like this.

> `altv-discord-auth`

Then simply clone this repository into your main server resources folder.
```
cd resources
git clone https://github.com/Stuyk/altv-discord-auth
```

After cloning, navigate to `resources/altv-discord-auth` directory and simply run `npm install` to install needed dependencies.

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

# Inviting Your Bot

You simply visit the oAuth2 section of the discord developers application. Tick `bot` in scopes. Then tick `administrator` in bot permissions (optional just make sure your bot can see all users). After you copy the link and paste it in your browser.

![](https://i.imgur.com/f2yKXnf.jpeg)

# Updating Environment Variables

### MAKE SURE TO READ ALL OF THIS. IT'S VERY IMPORTANT.

Open your `.env` file which should be located in the same directory as your `altv-server` file. Running this resource without the `.env` will generate it automatically. If you are not sure what a `.env` file is please use google.

```
ENABLE_WHITELIST=false
CLIENT_ID=<client_id>
CLIENT_SECRET=<client_secret>
BOT_SECRET=
SERVER_ID=
ROLE_WHITELIST_ID=
REDIRECT_IP=127.0.0.1
```

Anything marked with \* is OPTIONAL.

\*=Optional

## ENABLE_WHITELIST

This will automatically default to false. Meaning it will not turn on the whitelist.

Set this to true to enable the whitelist.

```
ENABLE_WHITELIST=true
ENABLE_WHITELIST=false
```

## CLIENT_ID

This can be found under the general information of the discord developers app. Copy the ID that is in plain text.

![](https://i.imgur.com/m60sbzE.jpg)

## CLIENT_SECRET

This can be found under the general information of the discord developers app. Reveal or copy the secret.

![](https://i.imgur.com/gSKTJBt.jpg)

## REDIRECT_IP

### Running Locally?

If you are running your server locally and just for yourself. Use localhost.

`ie. 127.0.0.1`

### Running in Production?

If you are running your server for players to join use the IP for your machine.

Ensure you port forward 7790 in your router, firewall, etc.

## BOT_SECRET \*

This can be found under the bot section of the discord developers app. Copy the secret for your bot.

![](https://i.imgur.com/dk38pVl.jpg)

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

**Server-Side**
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

**Server-Side**
```js
alt.on('discord:AuthDone', playerAuthDone);

function playerAuthDone(player, discordInfo) {
    console.log(discordInfo);
}
```
