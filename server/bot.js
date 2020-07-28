/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Discord from 'discord.js';

const discordClient = new Discord.Client();
const config = {
    botTokenSecret: process.env['BOT_SECRET'],
    serverId: process.env['SERVER_ID'],
    clientId: process.env['CLIENT_ID'],
    roleWhitelistId: process.env['ROLE_WHITELIST_ID'],
};

let whitelist = [];
let interval;

// Events
discordClient.on('ready', handleReady);
discordClient.on('error', handleError);
discordClient.on('rateLimit', handleRateLimit);
discordClient.on('guildMemberUpdate', handleUserUpdate);

function handleReady() {
    console.log(`[Whitelist] Discord Bot has Authenticated.`);

    if (!config.botTokenSecret || !config.serverId || !config.clientId || !config.roleWhitelistId) {
        console.error(`Configuration is missing. Please setup your .env file.`);
        return;
    }

    refreshWhitelist();
    interval = alt.setInterval(refreshWhitelist, 60000);
}

function handleError(err) {
    console.log(err);
}

function handleRateLimit(err) {
    console.error(`Discord Bot has been Rate Limited. Google 'Rate Limits for Discord'`);
    console.log(err);
}

/**
 * Automatically update the discord white list.
 * @param  {Discord.User} user
 */
async function handleUserUpdate(oldUser, user) {
    if (!user) {
        return;
    }

    const server = discordClient.guilds.cache.get(config.serverId);
    const member = await server.members.fetch(user.id);

    if (!member) {
        return;
    }

    const hasRole = member.roles.cache.has(config.roleWhitelistId);
    const index = whitelist.findIndex(id => id === user.id);

    if (!hasRole) {
        if (index <= -1) {
            return;
        }

        whitelist.splice(index, 1);
        alt.log(`[Whitelist] ${member.displayName} was removed from the whitelist.`);
        return;
    }

    if (index >= 0) {
        return;
    }

    whitelist.push(user.id);
    alt.log(`[Whitelist] ${member.displayName} was added to the whitelist.`);
}

/**
 * this function get all the users that have the role
 * 'whitelist' and put them in the array whitelist
 * @returns {void}
 */
function refreshWhitelist() {
    alt.log(`Refreshing Whitelist`);

    whitelist = [];

    const server = discordClient.guilds.cache.get(`${config.serverId}`);
    if (!server) {
        console.error(`Did you forget to invite the bot to your server?`);
        return;
    }

    const members = server.roles.cache.get(config.roleWhitelistId).members.array();

    if (members.length <= 0) {
        alt.log(`No members are whitelisted at this time.`);
        return;
    }

    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        if (!member) {
            continue;
        }

        if (!member.user) {
            continue;
        }

        whitelist.push(member.user.id);
    }

    alt.log(`Refreshed Whitelist. Whitelisted Members: ${members.length}`);
}

export function isWhitelisted(id) {
    console.log(id);

    if (whitelist.includes(id)) {
        return true;
    }

    return false;
}

export function isWhitelistOn() {
    if (!process.env['ENABLE_WHITELIST'] || process.env['ENABLE_WHITELIST'] === 'false') {
        return false;
    }

    return true;
}

if (isWhitelistOn) {
    discordClient.login(config.botTokenSecret);
}
