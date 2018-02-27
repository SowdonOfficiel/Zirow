const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur !");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#15f153")
  .addField("User", `${rUser} with ID: ${rUser.id}`)
  .addField("Report by", `${message.author} with ID: ${message.author.id}`)
  .addField("Raison", reason)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt);

  let reportschannel = message.guild.channels.find(`name`, `reports`);
  if(!reportschannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

  message.delete().catch(O_o=>{});

  reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
