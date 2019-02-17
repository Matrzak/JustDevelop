const bot = require("../bot");
const DiscordOption = require("./DiscordOptions");
const c = require("../misc/config");

class Command {
    constructor(cmd, description, role, activity){
        this.cmd = cmd;
        this.description = description;
        this.role = role;
        this.activity = activity;
        this.request = undefined;
        this.arg = undefined;
    }

    apply(arg = undefined, request = undefined){
        this.arg = arg;
        this.request = request;
    }
    init(){
        try{
            if(this.role !== undefined){
                let pass = false;
                for(let i = 0; i <= this.role.length - 1; i++){
                    if(this.request.member.roles.has(this.role[i].toString())){
                        pass = true;
                        break;
                    }
                }
                if(!pass){
                    if(DiscordOption.testing_state && this.request.member.roles.has(c.config.tester_role)){
                        this.request.channel.send("Ignoruje uprawnienia, tryb testowania uruchomiony 🎉🎉")
                    } else {
                        this.request.reply("Nie masz odopowiednich uprawnien!");
                        return;
                    }
                }
            }
            this.activity(this.arg,this.request);
        } catch (error) {
            var aux = error.stack.split("\n");
            aux.splice(0, 2);
            aux = aux.join('\n"');
            if(DiscordOption.isChannelExists(c.config.error_channel)){
                bot.client.channels.get(c.config.error_channel.toString()).send("\n**KOD NAPOTKAŁ ERROR**\n"+error+"\n \n**STACK**\n" +
                    aux + "\n **END OF STACK**");
                return;
            }
            console.log("\n**KOD NAPOTKAŁ ERROR**\n"+error+"\n \n**STACK**\n" +
                aux + "\n **END OF STACK**");
        }
    }
}
module.exports.Command = Command;