const Discord = require('discord.js');
const client = new Discord.Client();

const c = require("./misc/config");
const handler = require("./commands/CommandsHandler");
const broadcast = require("./commands/admin/broadcast");
const DiscordOptions = require("./basic/DiscordOptions");

client.on('ready', () => {
  console.log(`Poprawnie polaczono z => ${client.user.tag}!`);
  broadcast.triggerBroadcasts();
});

client.on('messageDelete', deleted => {
    if(!DiscordOptions.isChannelExists(c.config.logs_channel)) return;
    let date = new Date();
    let utc = date.toJSON().slice(0,10).replace(/-/g,'/');
    let time = [date.getHours(),date.getMinutes(),date.getSeconds()];
    client.channels.get(c.config.logs_channel.toString()).send(
        "Wiadomość użytkownika **"+deleted.author.tag+"** została usunięta\n" +
        " **Treść: ** "+deleted+"\n **Kanał: **" + deleted.channel.name + "\n **Data: **" + utc +"\n" +
        " **Godzina: ** "+ time[0]+":"+time[1]+":"+time[2]);
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
       command = handler.getCommand(values[0].toString().substr(1), handler.acommands);
       if(command === null){
           command = handler.getCommand(values[0].toString().substr(1), handler.commands);
       }
   } else {
       command = handler.getCommand(values[0].toString().substr(1), handler.commands);
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