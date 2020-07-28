/// <reference types="@altv/types-server" />
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const envFileVariables = [
    'BOT_SECRET',
    'CLIENT_ID',
    'CLIENT_SECRET',
    'REDIRECT_IP',
    'SERVER_ID',
    'ROLE_WHITELIST_ID',
    'ENABLE_WHITELIST',
];

let allValid = true;

if (!fs.existsSync('.env')) {
    console.error(`Missing '.env' in your base server directory. Please edit variables.`);
    console.error(`File was created the file for you.`);

    for (let i = 0; i < envFileVariables.length; i++) {
        const variable = envFileVariables[i];

        if (variable !== 'ENABLE_WHITELIST') {
            fs.appendFileSync(`.env`, `\n${variable}=`);
            continue;
        }

        fs.appendFileSync(`.env`, `\n${variable}=true`);
    }

    process.exit(1);
}

if (process.env['ENABLE_WHITELIST'] && process.env['ENABLE_WHITELIST'] !== 'false') {
    for (let i = 0; i < envFileVariables.length; i++) {
        if (!process.env[envFileVariables[i]]) {
            console.error(
                `${envFileVariables[i]} is missing from your '.env' file in your main directory. Read the README.md for instructions.`
            );

            allValid = false;
        }
    }

    if (!allValid) {
        console.error(`Please fix the above errors. Then restart your server.`);
        process.exit(1);
    }

    console.log(`[Whitelist] Whitelist is ENABLED.`);
    import('./bot');
    import('./verify');
    import('./express');
} else {
    if (!process.env['CLIENT_ID']) {
        console.error(`CLIENT_ID does not have a value in the '.env' file. Add the value then restart your server.`);
        process.exit(1);
    }

    if (!process.env['CLIENT_SECRET']) {
        console.error(
            `CLIENT_SECRET does not have a value in the '.env' file. Add the value then restart your server.`
        );
        process.exit(1);
    }

    if (!process.env['REDIRECT_IP']) {
        console.error(`REDIRECT_IP does not have a value in the '.env' file. Add the value then restart your server.`);
        process.exit(1);
    }

    console.log(`[Whitelist] Whitelist is NOT ENABLED. Starting in Discord Auth Only mode.`);
    import('./verify');
    import('./express');
}
