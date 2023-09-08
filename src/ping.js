const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  aliases: ['ping','ms'],
  run: async (client, message, args) => {
    console.log('message: ', message)
    console.log('args: ', args)
    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`Olá ${message.author}, seu ping está em : \`carregando...\`.`);

    let embed2 =  new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`Olá ${message.author}, seu ping está em : ${client.ws.ping}ms.`);

    message.reply({ embeds: [embed]})
      .then(msg => {
        msg.edit({ embeds: [embed2] })
      })
  }
}
