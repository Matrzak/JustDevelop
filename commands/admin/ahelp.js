
const handler = require("../CommandsHandler");

function init(arguments, request){
    let author = request.author;
    author.send("Witaj, oto lista komend administracyjnych JustDevelop:")
    let commands = "";
    handler.acommands.map((x) => {
        commands += "!" + x.cmd+ " **=>** " + x.description + "\n";
    });
    author.send(commands);
}

module.exports.init = init;