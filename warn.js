const discord = require('discord.js');
console.log('warn module active');
var fs = require('fs');
var grue = JSON.parse(fs.readFileSync("wdb.json"));

module.exports = (message, args, db) => {
     {
    /*if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("you can't warn people");
    }*/
    let usr = args.shift();
    let target = message.guild.members.cache.get(usr.slice(3, -1)) || message.guild.members.cache.get(usr.slice(2, -1));
    let reason = args.join(" ");
    console.log(args);
    if(!target) {
      return message.channel.send("please mention who should i warn");
    }
    if(target.id == message.author.id){
        return message.channel.send("please don't warn yourself");
    }
    if(!args[0]){
        return message.channel.send("why should i warn him? (provide reason)");
    }
    //let warns = db.get(`warnings_${message.guild.id}_${target.id}`)
    
    let trash_embed_LOL = new discord.MessageEmbed()
        .setTitle("Action: Warn")   
        .setDescription(`warned ${target} (${target.id}) \ for: ${reason}`)
        .setColor("#ff2050")
        .setFooter(`warned by ${message.author.username}`)
        .setTimestamp();
    //message.channel.send(trash_embed_LOL);
    
     
    if(grue[target] == undefined){
        grue[target] = [];
    } 
        
        grue[target].push({"reason": reason, "time": Date.now() });
        
            
            grue[target].push({"reason": reason, "time": Date.now() });
            fs.writeFileSync('wdb.json', JSON.stringify(grue))
            message.channel.send(`this is ${JSON.stringify(grue)}`);
    message.channel.send(trash_embed_LOL);
}}
    