
const handler = require("../CommandsHandler");

function init(arguments, request){
    if(request.channel !== null && request.channel !== undefined){
        request.delete();
    }
    let author = request.author;
    author.send("Witaj uzytkowniku, oto lista komend JustDevelop:");
    let commands = "";
    handler.commands.map((x) => {
        commands += "!" + x.cmd+ " **=>** " + x.description + "\n";
    });
    author.send(commands);
}

module.exports.init = init;