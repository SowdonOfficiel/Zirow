const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Information concernant le discord")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Membre :", message.guild.memberCount)
  .addField("Crée le:", message.guild.createdAt)
  .addField("Region:", message.guild.region)
  .addField("Owner", message.guild.owner.user)
  .addField("Vous avez rejoint le discord le", message.member.joinedAt)
  .addField("ID", message.guild.id);


  return message.channel.send(serverembed);

}

module.exports.help = {
  name: "info"
}
