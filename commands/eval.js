const util = require('util');
const info = require('./../info.json');
console.log("eval module active");
function clean(text) {
    if (typeof (text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(info.login, '')
    return text;
}

module.exports = (message, code) => {
    if (message.author.id !== info.owner || message.author.id !== info.owner2) return;
    try {
        let evaled = eval(code);
        console.log(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
        message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
        message.channel.send(errord(err));
    }
}

function errord(err) {
    return `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``;
}
