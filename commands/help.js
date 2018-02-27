const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.reply("```Les commandes : \n > -help : permet d'obtenir de l'aide. \n > -bot : permet d'obtenir des informations sur le bot \n > -info : permet d'obtenir des informations sur le discord. \n > -discord : permet d'obtenir le discord de **Zirow**. \n > -ban @user *raison* : permet de bannir un utilisateur du discord. \n > -kick @user *raison* : permet de kick un utilisateur. \n > -clear *message* : permet de clear des messages. \n > -report @user *raison* : permet de report un utilisateur. \n ```");

}

module.exports.help = {
  name: "help"
}
