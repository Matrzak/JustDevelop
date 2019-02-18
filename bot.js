const Discord = require('discord.js');
const client = new Discord.Client();

const c = require("./misc/config");
const handler = require("./commands/CommandsHandler");
const broadcast = require("./commands/admin/broadcast");
const DiscordOptions = require("./basic/DiscordOptions");
const MessageHandler = require("./basic/MessageHandler");

client.on('ready', () => {
  console.log(`Poprawnie polaczono z => ${client.user.tag}!`);
  broadcast.triggerBroadcasts();
});

client.on('guildMemberAdd', member => {
    MessageHandler.welcomeUser(member);
});

client.on('message', message => {
   if(message.author.bot) return;
   if(message.toString() === "akceptuje"){
       message.member.addRole(c.rangs.registered);
       MessageHandler.welcomeMember(message.author);
   }
   message.delete();
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if(!DiscordOptions.isChannelExists(c.config.logs_channel)) return;
    MessageHandler.sendChangeLog(oldMessage,newMessage);
});

client.on('messageDelete', deleted => {
    if(!DiscordOptions.isChannelExists(c.config.logs_channel)) return;
    if(deleted.channel.id == c.config.rules_accept_channel) return;
    MessageHandler.sendDeleteLog(deleted);
});

client.on('message', msg => {
   if(msg.author.bot) return;
   let command_name = msg.toString();
   if(!command_name.startsWith("!")){
      return;
   }
   if(msg.channel.id == c.config.rules_accept_channel) return;
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