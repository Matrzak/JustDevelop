
// commands imports
const annoucement = require("./announcement");
const clear = require("./clear");
//others
const c = require("../misc/config");
const bot = require("../bot");

function isChannelExists(channel_id, recived_data){
    if(bot.client.channels.get(channel_id.toString()) === undefined){
        recived_data.reply("Podałeś zły kanał");
        return false;
    }
    return true;
}

function manage(command_data,recived_data){
    if(!recived_data.member.roles.has(c.config.admin_role)){
        recived_data.reply("Kochaniutki, nie masz odopowiednich uprawnien!");
        return;
    }
    // Controller
    switch(command_data[0].substring(1)){
        case "annouce":
            annoucement.start(command_data,recived_data);
            break;
        case "clear":
            clear.start(command_data[1].toString(),recived_data);
            break;
    }
}

module.exports.manage = manage;
module.exports.isChannelExists = isChannelExists;