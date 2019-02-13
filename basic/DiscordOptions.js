const bot = require("../bot");
const c = require("../misc/config");

var broadcasts_array = [];
var broadcast_state = true;
var testing_state = false;

function isChannelExists(channel_id){
    if(bot.client.channels.get(channel_id.toString()) === undefined){
        return false;
    }
    return true;
}

function TriggerBroadcasts(){
    let index = 0;
    broadcasts_array = c.messages;
    broadcasts_array.sort(() => { return 0.5 - Math.random() });
    setInterval(() => {
        if(!broadcast_state) return;
        if(isChannelExists(c.config.main_channel.toString())){
            if(index === broadcasts_array.length){
                broadcasts_array.sort(() => { return 0.5 - Math.random() });
                index = 0;
            }
            bot.client.channels.get(c.config.main_channel.toString()).send("\n**WIADOMOSC GENEROWANA AUTOMATYCZNIE**\n"+broadcasts_array[index]);
            index++;
       }
    }, 300000);
}

module.exports.isChannelExists = isChannelExists;
module.exports.TriggerBroadcasts = TriggerBroadcasts;
module.exports.broadcast_state = broadcast_state;
module.exports.testing_state = testing_state;