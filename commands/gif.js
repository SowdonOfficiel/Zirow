const Discord = require("discord.js");
const API_KEY = 'dc6zaTOxFJmzC';
const got = require('got');

module.exports.run = async (bot, message, args) => {

  if (args.length < 1) {
      throw 'Vous devez fournir quelque chose à rechercher!';
  }

  const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(' '))}`, { json: true });

  if (!res || !res.body || !res.body.data) {
      throw 'Impossible de trouver un fichier GIF correspondant à votre requête!';
  }

  message.delete();
  let gifembed = new Discord.RichEmbed()
  .setDescription("Générateur de GIF !")
  .setColor("#15f153")
  .addField("Image :", res.body.data.image_url);

  return message.channel.send(gifembed);

}

module.exports.help = {
  name: "gif"
}
