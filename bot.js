var fs = require('fs');
const info = require('./info.json');
const Discord = require('discord.js');
const echo = require('./commands/echo.js');
const evalCmd = require('./commands/eval.js');
const kick = require('./commands/kick.js');
const ban = require('./commands/ban.js');
const warn = require('./commands/warn.js');
const warns = require('./commands/warns.js');
const purge = require('./commands/purge.js');
const utils = require('./utils.js')
var warnDB = JSON.parse(fs.readFileSync("wdb.json"));
//var db = require('quick.db');

const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
    console.log(`main module active`);
    //console.log(evalCmd);
});


bot.on("message", async message => {

    if (message.author.bot || message.system) return;

    if (message.content.indexOf(info.prefix) === 0) {
        let msg = message.content.slice(info.prefix.length);
        let args = msg.split(" ");
        let cmd = args[0].toLowerCase();
        args.shift();

        switch (cmd) {
            case "eval": {
                if (!utils.hasPerm(message, "botadmin")) return;

                const code = args.join(" ");
                return evalCmd(message, code)
            }
	    case "test": {
		message.channel.send("OK");
	    }
            case "kick": {
                if (!utils.hasPerm(message, "kick")) return;
                return kick(message, args);

            }
            case "ban": {
                if (!utils.hasPerm(message, "ban")) return;
                return ban(message, args)
            }
            case "warn": {
                if (!utils.hasPerm(message, "mroles")) return;
                return warn(message, args, fs);
            }
            case "warns": {
                return warns(message);

            }
            case "purge": {
                if (!utils.hasPerm(message, "mchannel")) return;
                return purge(message, args)
            }
			
			case "echo": {
				if (!utils.hasPerm(message, "mchannel")) return;
				return echo(message, args)
			}

            default: {
                return;
            }
        }


    } else if (message.content.indexOf("<@" + bot.user.id) === 0) {
        return message.channel.send(`Use \`${info.prefix}\` to interact with me.`);
    }
    return;
});
bot.login(info.login);
