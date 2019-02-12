const bot = require("../bot");
const manager = require("./cmdmanager");

async function start(channelid, data){
    if(!manager.isChannelExists(channelid,data)){
        return;
    }
    data.reply("Śmieciarka już jedzie 🚍🚍🚍");
    let channel = bot.client.channels.get(channelid);
    const fetched = await channel.fetchMessages();
    await channel.bulkDelete(fetched);
    await channel.send("Kanal zostal wyczyszczony! 😎😎😎");
}

module.exports.start = start;