// COmment by xandirei Teh fOFJRKBGWHUvgjUBHVJIHUGVHIY
const Discord = require('discord.js');
const client = new Discord.Client();
const info = require('./info.json');
client.on('ready', msg => {
    console.log("FROGGY LOVESBOT EXISTS");
    console.log(`Logged in as ${client.user.tag}`);

});

client.on('message', msg => {
    if (msg.content === '.ltest lol') {
        msg.reply('bot logged in');
    }
});
client.login(info.login);