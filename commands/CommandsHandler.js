
const cmd = require("../basic/Command");
const c = require("../misc/config");

/*
    COMMANDS
 */
const annoucement = require("./admin/announcement");
const clear = require("./admin/clear");
const ahelp = require("./admin/ahelp");
const broadcast = require("./admin/broadcast");
const betastate = require("./admin/betastate");

const help = require("./client/help");

const acommands = [
    new cmd.Command("annouce", "Wysyla wiadomosc na kanal", [c.config.admin_role, c.config.mod_role], annoucement.init),
    new cmd.Command("clear", "Czysci kanal z wiadomosci", [c.config.admin_role], clear.init),
    new cmd.Command("ahelp", "Informuje o dostepnych komendach administracyjnych",
        [c.config.admin_role,c.config.mod_role], ahelp.init),
    new cmd.Command("broadcast","Włącza/Wyłącza wysyłanie automatycznych informacji losowych",
        [c.config.admin_role], broadcast.init),
    new cmd.Command("betastate", "Włącza/Wyłącza tryb testowania bota", [c.config.admin_role], betastate.init)
];

const commands = [
    new cmd.Command("help", "Informuje o dostepnych komendach", undefined, help.init),
];

function getAdminCommand(command){
    let return_value = null;
    acommands.map((x) => {
        let c = x.cmd.toString();
        if(c === command.toString()){
            return_value = x;
        }
    });
    return return_value;
}

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
module.exports.getAdminCommand = getAdminCommand;
module.exports.commands = commands;
module.exports.acommands = acommands;