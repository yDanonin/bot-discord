require('dotenv').config();
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"] });

client.once('ready', () => {
  console.log('bot is on')
})

const prefix = '!'

client.on('messageCreate', msg => {
  if(msg.author.bot) return;
  if(!msg.content.startsWith(prefix)) return;

  const commandBody = msg.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  console.log(commandBody)
  console.log(args)
  console.log(command)

  if(command === 'ping'){
    const timeTaken = Date.now() - msg.createdTimestamp;
    msg.reply('pong! Latency ' + timeTaken)
  }

})


client.login(process.env.TOKEN)
