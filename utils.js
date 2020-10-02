
const util = require('util');
const info = require('./info.json');
console.log("utils module active");

exports.hasPerm = function (message, p) {
    switch (p.toLowerCase()) {
        case "botadmin":
            return (message.author.id === info.owner) || (message.author.id === info.owner2);
        case "admin":
            return message.member.hasPermission("ADMINISTRATOR");
        case "mchannel":
            return message.member.hasPermission("MANAGE_CHANNELS");
        case "kick":
            return message.member.hasPermission("KICK_MEMBER");
        case "ban":
            return message.member.hasPermission("BAN_MEMBER");
        case "mserver":
            return message.member.hasPermission("MANAGE_SERVER");
        case "mroles":
            return message.member.hasPermission("MANAGE_ROLES");
    }
}