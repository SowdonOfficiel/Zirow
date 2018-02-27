const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(message.member.id !== "361495811554803713"){
    message.reply("Vous n'avez pas la permission de faire parler le bot !");
    return;
  } else {
    //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour faire parler le bot !");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
  }

}

module.exports.help = {
  name: "say"
}
