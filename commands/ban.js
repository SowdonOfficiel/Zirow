const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Impossible de trouver l'utilisateur !");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour ban !");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas ban cette utilisateur !");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("๑۩۞۩๑ LOG - BAN (Discord) ๑۩۞۩๑")
  .setColor("#bc0000")
  .addField("Ban user", `${bUser} with ID ${bUser.id}`)
  .addField("Ban by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Raison", bReason)
  .addField("Time", message.createdAt);

  //message.guild.member(bUser).send("Vous avez était ban du discord de **MinithMc** ! Pour :", bReason);

  let logchannel = message.guild.channels.find(`name`, `logs`);
  if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

  message.delete().catch(O_o=>{});

  message.guild.member(bUser).ban(bReason);
  logchannel.send(banEmbed);

}

module.exports.help = {
  name: "ban"
}
