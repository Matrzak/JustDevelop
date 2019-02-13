const DiscordOptions = require("../../basic/DiscordOptions");

function init(arguments, request){
    if(arguments.length !== 0){
        request.reply("Poprawne uzycie komendy:");
        request.channel.send("!broadcast");
        return;
    }

    DiscordOptions.broadcast_state === true ?
        DiscordOptions.broadcast_state = false : DiscordOptions.broadcast_state = true;


    switch(DiscordOptions.broadcast_state){
        case true:
            message = "uruchomione!";
            break;
        case false:
            message = "wstrzymane!";
            break;
    }

    request.reply("Informacje losowe zostały " + message)

}

module.exports.init = init;