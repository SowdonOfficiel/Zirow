const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur !");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour kick !");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas kick cette utilisateur !");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("๑۩۞۩๑ LOG - Kick (Discord) ๑۩۞۩๑")
  .setColor("#e56b00")
  .addField("Kick user", `${kUser} with ID ${kUser.id}`)
  .addField("Kick by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Raison", kReason)
  .addField("Time", message.createdAt);

  //message.guild.member(kUser).sendMessage("Vous avez était kick du discord de **MinithMc** ! Pour :", kReason);

  let logchannel = message.guild.channels.find(`name`, `logs`);
  if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

  message.delete().catch(O_o=>{});

  message.guild.member(kUser).kick(kReason);
  logchannel.send(kickEmbed);

}

module.exports.help = {
  name: "kick"
}
