const Discord = require('discord.js');
const client = new Discord.Client();

const manager = require("./commands/cmdmanager");
const c = require("./misc/config");


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
   if(msg.author.bot) return;
   if(msg.channel.id != c.config.command_channel) return;
   var command = msg.toString();
   if(!command.startsWith("!")){
      msg.reply("Hej, nie zapomnij aby komendy rozpoczynać od znaku: !");
      return;
   }
   let values = command.split(" ");
   manager.manage(values,msg);

});

/*
client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.channel.id == 544650844252012564){
        if(msg == "akceptuje"){
            msg.reply("Zaakceptowałeś regulamin");
        }
        msg.delete();

    }
});
*/

client.login(c.config.token);
module.exports.client = client;