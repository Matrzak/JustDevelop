const Discord = require('discord.js');
const client = new Discord.Client();

const c = require("./misc/config");
const handler = require("./commands/CommandsHandler");
const DiscordOptions = require("./basic/DiscordOptions");


client.on('ready', () => {
  console.log(`Poprawnie polaczono z => ${client.user.tag}!`);
  console.log(`Rozpoczynam wysylanie ogloszen!`);
  DiscordOptions.TriggerBroadcasts();
});

client.on('message', msg => {
   if(msg.author.bot) return;
   let command_name = msg.toString();
   if(!command_name.startsWith("!")){
      return;
   }
   let values = command_name.split(" ");
   let command = null;
   if(msg.channel.id == c.config.command_channel){
       command = handler.getAdminCommand(values[0].toString().substr(1));
       if(command === null){
           command = handler.getCommand(values[0].toString().substr(1));
       }
   } else {
       command = handler.getCommand(values[0].toString().substr(1));
   }
   if(command === undefined || command === null){
      msg.author.send("Taka komenda nie istnieje! 😪😪😪 \nSprawdź dostepne komendy używając !help");
      return;
   }
   values.shift();
   command.apply(values,msg);
   command.init();
});

client.login(c.config.token);
module.exports.client = client;