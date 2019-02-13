const bot = require("../bot");

function isChannelExists(channel_id){
    if(bot.client.channels.get(channel_id.toString()) === undefined){
        return false;
    }
    return true;
}

module.exports.isChannelExists = isChannelExists;