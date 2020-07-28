/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';

let view;
let discordURL;

alt.log('[Test]');

alt.onServer('discord:Auth', handleDiscordAuth);
alt.onServer('discord:AuthExit', handleAuthExit);
alt.on('discord:Auth', handleDiscordAuth);
alt.on('discord:AuthExit', handleAuthExit);

function handleDiscordAuth(url) {
    if (view && view.destroy) {
        view.destroy();
    }

    discordURL = url;
    view = new alt.WebView('http://resource/client/html/index.html');
    view.on('discord:BearerToken', handleBearerToken);
    view.on('discord:Ready', handleReady);
    view.focus();

    showCursor(true);
}

function handleAuthExit() {
    if (view && view.destroy) {
        view.destroy();
    }

    showCursor(false);
}

function handleBearerToken(token) {
    alt.emitServer('discord:BearerToken', token);
}

function handleReady() {
    if (!view) {
        return;
    }

    view.emit('discord:Ready', discordURL);
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {
        return;
    }
}
