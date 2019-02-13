const DiscordOptions = require("../../basic/DiscordOptions");

function init(arguments, request){
    if(arguments.length !== 0){
        request.reply("Poprawne uzycie komendy:");
        request.channel.send("!betastate");
        return;
    }

    DiscordOptions.testing_state === true ?
        DiscordOptions.testing_state = false : DiscordOptions.testing_state = true;


    switch(DiscordOptions.testing_state){
        case true:
            message = "uruchomiony! 🔥";
            break;
        case false:
            message = "wyłączony! 😨";
            break;
    }

    request.reply("Tryb testowania został " + message)

}

module.exports.init = init;