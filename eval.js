const util = require('util');
var fs = require('fs');
const info = require('./info.json');
console.log("eval module active");
var grue = JSON.parse(fs.readFileSync("wdb.json"));
function clean(text) {
    if (typeof(text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(info.login, 'die') 
    return text;
}

module.exports = (message, code) => {
    try {
        let evaled = eval(code);
        console.log(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}