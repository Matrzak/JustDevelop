const bot = require("../../bot");
const DiscordOptions = require("../../basic/DiscordOptions");

async function init(arguments, request){
    if(arguments.length !== 1) {
        request.reply("Podaleś za mało argumentów");
        request.channel.send("Poprawne użycie **!clear channel_id **");
        return;
    }
    let channelid = arguments[0].toString();
    if(!DiscordOptions.isChannelExists(channelid.toString())){
        request.reply("Taki kanal nie istnieje!");
        return;
    }
    request.reply("Śmieciarka już jedzie 🚍🚍🚍");
    let channel = bot.client.channels.get(channelid);
    const fetched = await channel.fetchMessages();
    await channel.bulkDelete(fetched);
    await channel.send("Kanal zostal wyczyszczony! 😎😎😎");
}

module.exports.init = init;