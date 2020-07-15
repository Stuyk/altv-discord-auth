/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import sjcl from 'sjcl';

const ip = encodeURI(`http://${process.env['REDIRECT_IP']}:7790/authenticate`);
const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env['CLIENT_ID']}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;

alt.on('discord:BeginAuth', handleBeginAuth);

function handleBeginAuth(player) {
    let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip) + Math.random(0, 900000000));
    const playerToken = sjcl.codec.hex.fromBits(hashBytes);

    player.token = playerToken;
    alt.emitClient(player, 'discord:Auth', `${url}&state=${playerToken}`);
}
