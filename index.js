require('dotenv').config();
const express = require('express')
const app = express()

const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"] });

const cmds = require('./src/commands')

const port = process.env.PORT || 3000

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

cmds.forEach((c) => {
  if(c.name) client.commands.set(c.name, c)
  if(c.aliases && Array.isArray(c.aliases)) c.aliases.forEach(key => client.aliases.set(key, c.name))
})

const prefix = '!'

client.on('messageCreate', msg => {
  if(msg.author.bot) return;
  if(!msg.content.startsWith(prefix)) return;

  const commandBody = msg.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  try{
    client.commands.get(command).run(client, msg, args)
  } catch(e) {
    console.error('error: ' + e)
  }

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

client.once('ready', () => {
  console.log('bot is on')
})


client.login(process.env.TOKEN)
