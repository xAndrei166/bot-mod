const info = require('./info.json');
const Discord = require('discord.js');
const evalCmd = require('./eval.js');
const kick = require('./kick.js');
const ban = require('./ban.js');
const warn = require('./warn.js');
var db = require('quick.db');

const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => { 
    console.log(`main module active`);
    //console.log(evalCmd);
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

        else if (cmd === "test"){
            return message.channel.send("OK");
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
        else if(cmd === "warn" && message.author.id === info.owner || message.author.id === info.owner2 ){
            return warn(message, args, db);
        }
        else if(cmd === "warns" && message.author.id === info.owner || message.author.id === info.owner2) {
            const tcheckw = message.mentions.members.first() || message.author;
            let wcheck = db.get(`warnings_${message.guild.id}_${tcheckw.id}`);
            message.channel.send(`${tcheckw} has ${wcheck} warns`);
        }

        else { 
            return;
        }
        
    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { 
        return message.channel.send(`Use \`${info.prefix}\` to interact with me.`); 
    }
    return;
});
bot.login(info.login);
