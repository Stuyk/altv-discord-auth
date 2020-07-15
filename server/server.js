/// <reference types="@altv/types-server" />
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const envFileVariables = [
    'BOT_TOKEN_SECRET',
    'BOT_CLIENT_ID',
    'ROLE_OWNER_ID',
    'ROLE_WHITELIST_ID',
    'ENABLE_WHITELIST',
];

let allValid = true;

if (!fs.existsSync('.env')) {
    console.error(`Missing '.env' in your base server directory. Please edit variables.`);

    for (let i = 0; i < envFileVariables.length; i++) {
        const variable = envFileVariables[i];
        fs.appendFileSync(`.env`, `\n${variable}=`);
    }

    process.exit(1);
}

for (let i = 0; i < envFileVariables.length; i++) {
    if (!process.env[envFileVariables[i]]) {
        console.error(
            `${envFileVariables[i]} is missing from your '.env' file in your main directory. Read the README.md for instructions.`
        );

        allValid = false;
    }
}

if (allValid) {
    import('bot');
}
