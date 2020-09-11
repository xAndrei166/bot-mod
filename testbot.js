const info = require('info.json');
const Discord = require('discord.js');
const util = require('util');
//const ban = require('./ban.js')
cosnt evalCmd = require('eval.js');
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
    //bot.user.setGame('Awesome Fun Game'); 
    console.log(`on`);
});


bot.on("message", async message => { 

    if(message.author.bot || message.system) return; 
    
    if (message.content.indexOf(info.prefix) === 0) { // Message starts with your prefix
        let msg = message.content.slice(info.prefix.length); // slice of the prefix on the message
        let args = msg.split(" "); // break the message into part by spaces
        let cmd = args[0].toLowerCase(); // set the first word as the command in lowercase just in case
        args.shift(); // delete the first word from the args
      
        if (cmd === 'hi' || cmd === 'hello') { // the first command [I don't like ping > pong]
            message.channel.send(`Hi there ${message.author.toString()}`);
            return; 
        }

        else if (cmd === 'ping') { // ping > pong just in case..
            return message.channel.send('pong');
        }

        // Make sure this command always checks for you. YOU NEVER WANT ANYONE ELSE TO USE THIS COMMAND
        else if (cmd === "eval" && message.author.id === info.owner){ // < checks the message author's id to yours in info.json.
            const code = args.join(" ");
            return evalCmd(message, code);
        }

        else { // if the command doesn't match anything you can say something or just ignore it
            message.channel.send(`I don't know what command that is.`);
            return;
        }
        
    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { // Catch @Mentions

        return message.channel.send(`Use \`${info.prefix}\` to interact with me.`); //help people learn your prefix
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
