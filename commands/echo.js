console.log("echo module active");

module.exports = (message, msg) => {
    message.channel.send(msg.join(" "));
}