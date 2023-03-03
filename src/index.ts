import { Client } from 'eris';
import { listener, command } from './utils/index';
import figlet from 'figlet';
import chalk from 'chalk';
import 'dotenv/config';
import './server';

console.clear();
console.log(
    chalk.greenBright(
        figlet.textSync('DiscGPT.', { horizontalLayout: 'full' })
    )
);


const client = new Client(process.env.TOKEN, {
    restMode: true,
    autoreconnect: true,
    firstShardID: 0,
    lastShardID: 0,
    maxShards: 0,
    allowedMentions: {
        everyone: false,
        users: true,
        roles: false,
		repliedUser: true
    },
    intents: ['guilds', 'guildMessages', 'guildMembers', 'guildEmojis', "guildMessageTyping"],
});

// database.connect();

listener.ready(client);
listener.error(client);
listener.shardReady(client);
listener.interactionCreate(client);
listener.messageCreate(client);

command.global(client);

client.connect();