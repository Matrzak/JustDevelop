const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.channel.id == 544650844252012564){
      msg.reply("spoko");
    }
});

client.login('NTQ0NjY1MTA5ODEzNzg4Njc1.D0RsJQ.ZZF8oeL2APA9vj2tS2xOhEfutRE');