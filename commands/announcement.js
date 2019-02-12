
const bot = require("../bot");
const manager = require("./cmdmanager");

function start(data,recived_data){
    data.shift();
    console.log(data);
    let channelid = data[0];
    if(!manager.isChannelExists(channelid,recived_data)){
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