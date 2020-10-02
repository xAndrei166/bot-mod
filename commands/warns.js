const util = require('util');
const info = require('./../info.json');
console.log("warns module active");
var fs = require('fs');
var warnDB = JSON.parse(fs.readFileSync("wdb.json"));

module.exports = (message) => {
    const tcheckw = message.mentions.members.first();
    if (!tcheckw) {
        return message.channel.send("who should i check? (mention)");
    }
    warnDB = JSON.parse(fs.readFileSync("wdb.json"));
    if (warnDB[tcheckw] == undefined) return message.channel.send(`${tcheckw} has no warns.`);
    message.channel.send(`${tcheckw} has ${warnDB[tcheckw].length} warns.`);
}