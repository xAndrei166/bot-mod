var fs = require('fs');
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

        if (cmd === "test"){
            return message.channel.send("OK");
        }
        else if (cmd === "eval"){ 
            if (message.author.id === info.owner) {
                evalLOL();
            } else if (message.author.id === info.owner2){
                evalLOL();
            } else {
                return;
            }
            function evalLOL(){
            const code = args.join(" ");
            return evalCmd(message, code);}
        }
        else if (cmd === "kick"){
            if (message.author.id === info.owner) {
                kickLOL();
            } else if (message.author.id === info.owner2){
                kickLOL();
            } else {
                return;
            }
            function kickLOL(){
                return kick(message, args);
            }
        
        }
        else if (cmd === "ban" ){
            if (message.author.id === info.owner){
                banLOL();
            } else if(message.author.id === info.owner2){
                banLOL();
            } else {
                return;
            }
            function banLOL(){
                return ban(message, args);}
        }
        else if(cmd === "warn"){
            if (message.author.id === info.owner){
                warnLOL();
            } else if(message.author.id === info.owner2){
                warnLOL();
            } else {
                return;
            }
            function warnLOL(){
                return warn(message, args, db);
        }}
        else if(cmd === "warns") {
            if (message.author.id === info.owner){
                cwarnLOL();
            } else if(message.author.id === info.owner2){
                cwarnLOL();
            } else {
                return;
            }
            function cwarnLOL(){
                const tcheckw = message.mentions.members.first();
                if (!tcheckw){
                    return message.channel.send("who should i check? (mention)");
                }
                let wcheck = db.get(`warnings_${message.guild.id}_${tcheckw.id}`);
                message.channel.send(`${tcheckw} has ${wcheck} warns`);
        }}
        else if(cmd === "purge"){
            if (message.author.id === info.owner){
                purgeLOL();
            } else if(message.author.id === info.owner2){
                purgeLOL();
            } else {
                return;
            }
            async function purgeLOL(){
                let grue22 = args.shift();
                let aelol = Number(grue22) + 1;
                console.log(aelol);
                await message.channel.bulkDelete(aelol);
        }}

        else { 
            return;
        }
        
    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { 
        return message.channel.send(`Use \`${info.prefix}\` to interact with me.`); 
    }
    return;
});
bot.login(info.login);
