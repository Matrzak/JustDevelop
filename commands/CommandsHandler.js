
const cmd = require("../basic/Command");
const c = require("../misc/config");

/*
    COMMANDS
 */
const annoucement = require("./admin/announcement");
const clear = require("./admin/clear");

const commands = [
   new cmd.Command("annouce", "Wysyla wiadomosc na kanal", [c.config.admin_role, c.config.mod_role], annoucement.init),
   new cmd.Command("clear", "Czysci kanal z wiadomosci", [c.config.admin_role], clear.init),
];

function getCommand(command){
    let return_value = null;
    commands.map((x) => {
        let c = x.cmd.toString();
        if(c === command.toString()){
            return_value = x;
        }
    });
    return return_value;
}

module.exports.getCommand = getCommand;
module.exports.commands = commands;