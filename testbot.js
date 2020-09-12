const info = require('./info.json');
const Discord = require('discord.js');
const util = require('util');
const evalCmd = require('./eval.js');
const kick = require('./kick.js');
const ban = require('./ban.js');

const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => { 
    console.log(`on`);
    console.log(evalCmd);
});


bot.on("message", async message => { 

    if(message.author.bot || message.system) return; 
    
    if (message.content.indexOf(info.prefix) === 0) { 
        let msg = message.content.slice(info.prefix.length); 
        let args = msg.split(" "); 
        let cmd = args[0].toLowerCase(); 
        args.shift(); 
      
        if (cmd === 'hi' || cmd === 'hello') { 
            message.channel.send(`Hi there ${message.author.toString()}` + `!` );
            return; 
        }

        
        else if (cmd === "eval" && message.author.id === info.owner || message.author.id === info.owner2){ 
            const code = args.join(" ");
            return evalCmd(message, code);
        }
        else if (cmd === "kick" && message.author.id === info.owner || message.author.id === info.owner2){
            return kick(message, args);
        }
        else if(cmd === "ban" && message.author.id === info.owner || message.author.id === info.owner2 ){
            return ban(message, args);
        }

        else { 
            return;
        }
        
    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { 
        return message.channel.send(`Use \`${info.prefix}\` to interact with me.`); 
    }
    return;
});

process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
});
process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
});
bot.login(info.login);
