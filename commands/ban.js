const util = require('util');
const discord = require('discord.js');
console.log('ban module active');

module.exports = (message, args) => {

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.channel.send("i ain't got perms to ban people");

    }
    let usr = args.shift();
    let target = message.guild.members.cache.get(usr.slice(3, -1)) || message.guild.members.cache.get(usr.slice(2, -1));
    let reason = args.join(" ");
    if (!target) {
        return message.channel.send("please mention who should i ban");
    }
    if (target.id == message.author.id) {
        return message.channel.send("don't ban yourself");
    }
    if (!args[0]) {
        return message.channel.send("why should i ban him? (provide reason)");
    }
    let trash_embed_LOL = new discord.MessageEmbed()
        .setTitle("Action: Ban")
        .setDescription(`banned ${target} (${target.id}) \ for: ${reason}`)
        .setColor("#ff2050")
        .setFooter(`banned by ${message.author.username}`);
    message.channel.send(trash_embed_LOL);
    target.ban({ reason: reason });



}