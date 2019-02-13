
const bot = require("../../bot");
const DiscordOptions = require("../../basic/DiscordOptions");


function init(arguments, request){
    if(arguments.length < 2){
        request.reply("Podaleś za mało argumentów");
        request.channel.send("Poprawne użycie **!annouce channel_id wiadomosc**");
        return;
    }
    let channelid = arguments[0];
    if(!DiscordOptions.isChannelExists(channelid.toString())){
        request.reply("Taki kanal nie istnieje!");
        return;
    }
    arguments.shift();
    let message = arguments.join(" ");
    bot.client.channels.get(channelid.toString()).send(message);
    request.reply("🎈 Poszło w świat 🎈");
}

module.exports.init = init;