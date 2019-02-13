const Discord = require('discord.js');
const client = new Discord.Client();

const c = require("./misc/config");
const handler = require("./commands/CommandsHandler");


client.on('ready', () => {
  console.log(`Poprawnie polaczono z => ${client.user.tag}!`);
});

//USER SECTION
client.on('message', msg => {
   if(msg.author.bot) return;

});

// ADMIN SECTION
client.on('message', msg => {
   if(msg.author.bot) return;
   if(msg.channel.id != c.config.command_channel) return;
   let command_name = msg.toString();
   if(!command_name.startsWith("!")){
      msg.reply("Hej, nie zapomnij aby komendy rozpoczynać od znaku: !");
      return;
   }
   let values = command_name.split(" ");
   let command = handler.getCommand(values[0].toString().substr(1));
   if(command === undefined || command === null){
      msg.reply("Taka komenda nie istnieje! 😪😪😪");
      return;
   }
   values.shift();
   command.apply(values,msg);
   command.init();
});

client.login(c.config.token);
module.exports.client = client;