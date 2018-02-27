const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour clear !");
  if(!args[0]) return message.channel.send("Vous devez préciser combien de message je dois clear !");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Clear de ${args[0]} messages.`).then(msg => msg.delete(5000));
  })

  return;

}

module.exports.help = {
  name: "help"
}
