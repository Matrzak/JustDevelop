const bot = require("../bot");

let testing_state = false;

function isChannelExists(channel_id){
    if(bot.client.channels.get(channel_id.toString()) === undefined){
        return false;
    }
    return true;
}

module.exports.testing_state = testing_state;
module.exports.isChannelExists = isChannelExists;