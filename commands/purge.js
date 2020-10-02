
const util = require('util');
const info = require('./../info.json');
console.log("warns module active");

module.exports = async (message, args) => {
    let arg = args.shift();
    let num = Number(arg) + 1;
    if (num >= 101)
        return message.channel.send("can't purge more than 100 msgs yo");
    if (typeof num !== "number")
        return message.channel.send("");
    if (num <= 0)
        return message.channel.send("how many messages should i purge? (max 100)");
    await message.channel.bulkDelete(num);

}
