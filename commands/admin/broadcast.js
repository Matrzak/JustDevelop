
const bot = require("../../bot");
const DiscordOptions = require("../../basic/DiscordOptions");
const c = require("../../misc/config");

let broadcasts_array = c.messages;
let bc_index = 0;


let broadcast_state = false;


function init(arguments, request){
    if(arguments.length !== 0){
        request.reply("Poprawne uzycie komendy:");
        request.channel.send("!broadcast");
        return;
    }

    broadcast_state = !broadcast_state;


    switch(broadcast_state){
        case true:
            message = "uruchomione!";
            break;
        case false:
            message = "wstrzymane!";
            break;
    }

    request.reply("Informacje losowe zostały " + message)
}
function triggerBroadcasts(){
    console.log(`Rozpoczynam wysylanie ogloszen!`);
    broadcasts_array.sort(() => { return 0.5 - Math.random() });
    setInterval(() => {
        sendBroadcast();
    }, 900000);
}

function sendBroadcast(){
    if(!broadcast_state) return;
    if(DiscordOptions.isChannelExists(c.config.main_channel.toString())){
        if(bc_index === broadcasts_array.length){
            broadcasts_array.sort(() => { return 0.5 - Math.random() });
            bc_index = 0;
        }
        bot.client.channels.get(c.config.main_channel.toString()).send("\n**WIADOMOSC GENEROWANA AUTOMATYCZNIE**\n"+broadcasts_array[bc_index]);
        bc_index++;
    }
}



module.exports.init = init;
module.exports.triggerBroadcasts = triggerBroadcasts;