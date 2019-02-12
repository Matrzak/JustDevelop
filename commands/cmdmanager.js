
const annoucement = require("./announcement");
const c = require("../misc/config");
const bot = require("../bot");

module.exports.command_reply = (message) => {
    bot.client.channels.get(c.config.command_channel).send(message);
};

function manage(command_data,messageo){
    if(!messageo.member.roles.has(c.config.admin_role)){
        messageo.reply("Kochaniutki, nie masz odopowiednich uprawnien!");
        return;
    }

    switch(command_data[0].substring(1)){
        case "annouce":
            annoucement.start(command_data,messageo);
            break;
    }
}

module.exports.manage = manage;