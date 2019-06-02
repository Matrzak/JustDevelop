const DiscordOptions = require("../../basic/DiscordOptions");

function init(arguments, request){
    if(arguments.length !== 0){
        request.reply("Poprawne uzycie komendy:");
        request.channel.send("!betastate");
        return;
    }

    DiscordOptions.testing_state === true ?
        DiscordOptions.testing_state = false : DiscordOptions.testing_state = true;

    request.reply("Tryb testowania został " + DiscordOptions.testing_state === true ? "uruchomiony! 🔥" : "wyłączony! 😨");

}

module.exports.init = init;