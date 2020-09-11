const util = require('util');
const discord = require('discord.js');
console.log('kick module active');

module.exports = (message, args) => {
     {
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("bruh you don't have kick permissions");
    }
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("i ain't got perms to kick people");

    }
    let target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send("please mention who should i kick");
    }
    if(target.id == message.author.id){
        return message.channel.send("don't kick yourself");
    }
    if(args[1]){
        return message.channel.send("why should i kick him? (provide reason)");
    }
    let trash_embed_LOL = new discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`kicked out ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`kicked by ${message.author.username}`);
    message.channel.send(trash_embed_LOL);
    target.kick(args[1]);
    }
    
}