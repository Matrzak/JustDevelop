
const bot = require("../bot");

function start(data, messago){
    data.shift();
    let channelid = data[0];
    if(bot.client.channels.get(channelid.toString()) === undefined){
        messago.reply("Podałeś zły kanał");
        return;
    }
    data.shift();
    let message = data.join(" ");
    send(channelid,message)
}

function send(channel, message){
    bot.client.channels.get(channel.toString()).send(message);
}

module.exports.start = start;