const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
const fs = require("fs");
const { createServer } = require('http')
const got = require('got');
const API_KEY = 'dc6zaTOxFJmzC';
const countries = require('country-data').countries.all;
const OFFSET = '!'.charCodeAt(0);
const YTDL = require("ytdl-core");
const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';

const makeURL = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
const Fortnite = require('fortnite');
const stats = new Fortnite(process.env.TRN);
const ms = require("ms");

//let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

const spacer = {
    name: '\u200b',
    value: '\u200b',
};

var servers = {};


// fs.readdir("./commands/", (err, files) => {
//
//   if(err) console.log(err);
//
//   let jsfile = files.filter(f => f.split(".").pop() === "js")
//   if(jsfile.lenght <= 0){
//     console.log("Impossible de trouver le dossier commandes");
//     return;
//   }
//
//   jsfile.forEach((f, i) =>{
//     let props = require(`./commands/${f}`);
//     console.log(`${f} loaded!`);
//     bot.commands.set(props.help.name, props);
//   });
// });


createServer((_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end("Hello, world!")
}).listen(process.env.PORT)

bot.on("ready", async () => {
  console.log(`${bot.user.username} est connecte sur ${bot.guilds.size} serveurs !`);
  bot.user.setPresence({game: { name: 'Version : ALPHA-0.6', type: 0} });
});

bot.on("guildCreate", guild => {
  console.log(`Zirow vient d'être ajouté sur ${guild.name} (id: ${guild.id}). La guild possède ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
  console.log(`Zirow à été remove de ${guild.name} (id: ${guild.id})`);
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let sender = message.author;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if (message.content === 'ping' || message.content == 'Ping') {
      message.channel.send('pong');
  }

  if (message.content === 'hey') {
    message.channel.send('coucou');
  }

  if (message.content.includes("https://")) {
   console.log("deleted " + message.content + " from " + message.author)
   message.delete(1);
   message.author.send("⛔ **[WARN]** *La pub est strictement interdit !*");
 }
 if (message.content.includes("http://")) {
   console.log("deleted " + message.content + " from " + message.author)
   message.delete(1);
   message.author.send("⛔ **[WARN]** *La pub est strictement interdit !*");
 }
 if (message.content.includes("www.")) {
   console.log("deleted " + message.content + " from " + message.author)
   message.delete(1);
   message.author.send("⛔ **[WARN]** *La pub est strictement interdit !*");
 }


  if(cmd === `${prefix}say`){
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

  if(cmd === `${prefix}annonce`){
    let annonce = args.join(" ");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour envoyer des annonces !");
    let annonceEmbed = new Discord.MessageEmbed()
    .setDescription("**Annonce >** " + message.createdAt + "\n\n\n\n *>* " + annonce + " \n\n\n\n\n\n *Annonce by* " + message.author.username)
    .setColor("#FFFFFF");


    message.delete().catch(O_o=>{});
    return message.channel.send(annonceEmbed) && message.channel.send("@everyone");
  }

  if(cmd === `${prefix}sondage`){
    let sondage = args.join(" ");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission de faire des sondages !");
    let sondageEmbed = new Discord.MessageEmbed()
    .setDescription("**Sondage** \n\n🔷 " + sondage + " \n\n ***sondage fait le :*** " + message.createdAt)
    .setColor("#FFFFFF");

    message.delete().catch(O_o=>{});

    return message.channel.send(sondageEmbed).then(function (message) {
        message.react("👍")
        message.react("👎")
        }).catch(function() {
      });

  }


  if(cmd === `${prefix}report`){
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.MessageEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("User", `${rUser} with ID: ${rUser.id}`)
    .addField("Report by", `${message.author} with ID: ${message.author.id}`)
    .addField("Raison", reason)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt);

    let reportschannel = message.guild.channels.find(`name`, `reports`);
    if(!reportschannel) return message.guild.channel.send("Pour faire fonctionner la commande de ban, merci de créer un channel **#reports**");

    message.delete().catch(O_o=>{});

    reportschannel.send(reportEmbed);

  }

  // if(cmd === `${prefix}unban`){
  //
  //   let reason = args.slice(1).join(' ');
  //   let user = args[0];
  //   let logchannel = message.guild.channels.find(`name`, `logs`);
  //   if(!logchannel) return message.guild.channel.send("Erreur, merci de créer un channel #logs !");
  //   if (reason.lenght < 1) return message.reply('Merci de préciser un raison pour le unban.');
  //   if(!user) return message.reply('Merci de préciser un id valide ( -id @lapersonne ) !').catch(console.error);
  //
  //   // let unbanEmbed = new Discord.MessageEmbed()
  //   // .setDescription("๑۩۞۩๑ LOG - Unban (Discord) ๑۩۞۩๑")
  //   // .setColor("#e56b00")
  //   // .addField("Unban user", `${user} with ID ${user.id}`)
  //   // .addField("Unban by", `<@${message.author.id}> with ID ${message.author.id}`)
  //   // .addField("Raison", reason)
  //   // .addField("Time", message.createdAt);
  //
  //   message.delete().catch(O_o=>{});
  //
  //   // message.guild.unban(user);
  //   //logchannel.send(unbanEmbed);
  //
  //
  // }

  if(cmd === `${prefix}kick`){
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour kick !");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas kick cette utilisateur !");

    let kickEmbed = new Discord.MessageEmbed()
    .setDescription("๑۩۞۩๑ LOG - Kick (Discord) ๑۩۞۩๑")
    .setColor("#e56b00")
    .addField("Kick user", `${kUser} with ID ${kUser.id}`)
    .addField("Kick by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Raison", kReason)
    .addField("Time", message.createdAt);

    let logchannel = message.guild.channels.find(`name`, `logs`);
    if(!logchannel) return message.guild.channel.send("Pour faire fonctionner la commande de ban, merci de créer un channel **#logs**");

    message.delete().catch(O_o=>{});

    message.guild.member(kUser).kick(kReason);
    logchannel.send(kickEmbed);

  }

  if(cmd === `${prefix}info`){
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.MessageEmbed()
    .setDescription("Information concernant le discord")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("🔷 Membre :", message.guild.memberCount)
    .addField("🔨 Crée le:", message.guild.createdAt)
    .addField(":flag_white: Region:", message.guild.region)
    .addField("🔖 Owner", message.guild.owner.user)
    .addField("Vous avez rejoint le discord le", message.member.joinedAt)
    .addField("ID", message.guild.id);


    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}help`){

      let helpEmbed1 = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle(`Aide concernant Zirow (Partit 1) :`)
      .setDescription(`**-help** \n *Permet d'obtenir cette aide.* \n\n \n\n **-mute @lapersonne <temps>** \n *Permet de mute quelqu'un temporairement.* \n\n **-kick @lapersonne <raison>** \n *Permet de kick quelqu'un du discord.* \n\n **-ban @lapersonne <raison>** \n *Permet de bannir quelqu'un du discord* \n\n **-clear <nb. message>** \n *Permet de clear des messages.* \n\n **-report @lapersonne <raison>** \n *Permet de report quelqu'un.* \n\n **-annonce <text>** \n *Permet de réaliser une annonce.* \n\n **-sondage <sondage>** \n *Permet de réaliser un sondage.* \n\n \n\n **-gif <type>** \n *Permet de générer un gif. \n\n **-shoot @lapersonne** \n *Permet de kill la personne. \n\n **-avatar @lapersonne** \n *Permet d'obtenir l'avatar de la personne* \n\n **-météo <la ville>** \n *Permet d'obtenir la météo de la ville / village.* \n\n **-fortnite @lapersonne** \n *Permet d'obtenir les statistiques fortnite de la personne.*`);

      message.author.send(helpEmbed1);

      let helpEmbed2 = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle(`Aide concernant Zirow (Partit 2) :`)
      .setDescription('**-spotify @lapersonne** \n *Permet de se renseigner sur la musique.* \n\n **-shorturl <url>** \n *Permet de réduire la taille de votre lien.* \n\n \n\n **-info** \n *Permet de se renseigner sur cette guild.* \n\n **-discord** \n *Permet d\'obtenir le lien du discord de Zirow* \n\n **-site** \n *Permet d\'obtenir le lien du site de Zirow*');

      message.author.send(helpEmbed2);

      message.reply("Merci de regarder vos messages privées !");
  }

  if(cmd === `${prefix}discord`){
    message.author.send("**Voici le discord de** *Zirow* : **https://discord.me/zirow**");
  }

  if(cmd === `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour clear !");
    if(!args[0]) return message.channel.send("Vous devez préciser combien de message je dois clear !");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Clear de ${args[0]} messages.`).then(msg => msg.delete(5000));
    })

    return;
  }

  if(cmd === `${prefix}fortnite`){
    let platform;
    let username;

    if (!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Merci de préciser la platforme: `-fortnite [ pc | xbl | psn ] <pseudo>`**');

    if (!args[1]) return message.channel.send('**Merci de préciser le nom de la personne: `-fortnite [ pc | xbl | psn ] <pseudo>`**');

    platform = args.shift();
    username = args.join(' ');

    stats.getInfo(username, platform).then( data => {

    const fembed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle(`Statistique de ${data.username}`)
      .setDescription(`**Podium**\n\n**Top 3s:** *${data.lifetimeStats[0].value}*\n**Top 5s:** *${data.lifetimeStats[1].value}*\n**Top 6s:** *${data.lifetimeStats[3].value}*\n**Top 12s:** *${data.lifetimeStats[4].value}*\n**Top 25s:** *${data.lifetimeStats[5].value}*`, true)
      .setThumbnail('https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png')
      .addField('Score total', data.lifetimeStats[6].value, true)
      .addField('Match jouer', data.lifetimeStats[7].value, true)
      .addField('Wins', data.lifetimeStats[8].value, true)
      .addField('Win pourcentage', data.lifetimeStats[9].value, true)
      .addField('Kills', data.lifetimeStats[10].value, true)
      .addField('K/D Ratio', data.lifetimeStats[11].value, true)
      .addField('Kills par minute', data.lifetimeStats[12].value, true)
      .addField('Temps de jeu', data.lifetimeStats[13].value, true)
      .addField('Temps de survie', data.lifetimeStats[14].value, true)

    message.channel.send(fembed)


  })
  .catch(error => {

    message.channel.send('Pseudo incorrect');

  })


  }

  if(cmd === `${prefix}andary`){

    const res = await got(`https://minecraft-api.com/api/ping/playeronline.php?ip=54.38.11.252&port=25565`);
    const res1 = await got(`https://minecraft-api.com/api/ping/maxplayer.php?ip=54.38.11.252&port=25565`);
    const res2 = await got(`https://minecraft-api.com/api/ping/ping.php?ip=54.38.11.252&port=25565`);
    const res3 = await got(`https://minecraft-api.com/api/ping/version.php?ip=54.38.11.252&port=25565`);

    const andaryEmbed = new Discord.MessageEmbed()
    .setColor(0xffffff)
    .setDescription(`:pick: *Andary est un serveur Faction / Mini-Jeux présentant des créations originales et uniques.* \n\n\n\n 🔷 Discord : https://discord.gg/T7m3n7x \n 🔷 Site web : https://andarygames.fr \n 🔷 Chaîne YouTube : https://goo.gl/Rn89dV \n 🔷 Twitter : https://twitter.com/Andary97773388?lang=en \n 🔷 TeamSpeak : ts.andarygames.fr \n\n\n\n Joueurs connectées : **${res.body}** / **${res1.body}** \n\n Temps de réponse d'andary : **${res2.body} ms** \n\n Version d'andary : **${res3.body}** \n\n Adresse d'andary : **play.andarygames.fr** \n\n\n\n *Andary est en partenariat avec Zirow.*`);
    message.channel.send(andaryEmbed);

  }

  if(cmd === `${prefix}mcuuid`){
    if (args.length < 1) {
        throw 'Merci de préciser un pseudo !';
    }

    const res = await got(`http://minecraft-api.com/api/uuid/uuid.php?pseudo=${args[0]}`);

    message.delete().catch(O_o=>{});
    return message.channel.send("L'uuid de **" + args[0] + "** est " + res.body);
  }


  if(cmd === `${prefix}shorturl`){
    if (args.length < 1) {
        throw 'Merci de préciser une url valide !';
    }

    const url = args.join(' ');

    message.delete();

    const res = await got(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);

    message.channel.send("Voilà votre nouvelle url : " + res.body);
  }

  if(cmd === `${prefix}spotify`){

    let user = message.mentions.users.first() || message.author;
    if (user.presence.activity !== null && user.presence.activity.type === 'LISTENING' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) {

      let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`;
      let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`;
      let trackName = user.presence.activity.details;
      let trackAuthor = user.presence.activity.state;
      let trackAlbum = user.presence.activity.assets.largeText;

      const ssembed = new Discord.MessageEmbed()
        .setAuthor('Spotify play Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
        .setColor(0x1ED760)
        .setThumbnail(trackIMG)
        .addField('Musique :', trackName, true)
        .addField('Album :', trackAlbum, true)
        .addField('Auteur :', trackAuthor, false)
        .addField('Écoute la piste :', `[\`${trackURL}\`](trackURL)`, false);

      message.channel.send(ssembed);


      } else {

        message.channel.send('**Cette utilisateur n\'écoute pas de la musique actuellement !**');

      }

  }

  if(cmd === `${prefix}ban`){
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour ban !");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas ban cette utilisateur !");

    let banEmbed = new Discord.MessageEmbed()
    .setDescription("๑۩۞۩๑ LOG - BAN (Discord) ๑۩۞۩๑")
    .setColor("#bc0000")
    .addField("Ban user", `${bUser} with ID ${bUser.id}`)
    .addField("Ban by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Raison", bReason)
    .addField("Time", message.createdAt);

    //message.guild.member(bUser).send("Vous avez était ban du discord de **MinithMc** ! Pour :", bReason);

    let logchannel = message.guild.channels.find(`name`, `logs`);
    if(!logchannel) return message.guild.channel.send("Pour faire fonctionner la commande de ban, merci de créer un channel **#logs**");

    message.delete().catch(O_o=>{});

    message.guild.member(bUser).ban(bReason);
    logchannel.send(banEmbed);
  }

  if(cmd === `${prefix}météo`){

    if (args.length < 1) {
        throw 'Merci de préciser une ville.';
    }

    const city = args.join(' ');
    const res = await got(makeURL(city), { json: true });

    if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
        throw 'Impossible de charger les informations !';
    }

    const weatherInfo = res.body.query.results.channel;
    const forecast = weatherInfo.item.forecast[0];

    const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
    const countryEmoji = countryInfo ? countryInfo.emoji : ':grey_question:';

    const description = `La température dans ${weatherInfo.location.city} est de ${weatherInfo.item.condition.temp}°F/${celsius(weatherInfo.item.condition.temp)}°C`;

    let mEmbed = new Discord.MessageEmbed()
    .setDescription("๑۩۞۩๑ Météo ๑۩۞۩๑ > " + description)
    .setColor("#ccccff")
    .addField("Condition", weatherInfo.item.condition.text)
    .addField(":sweat_drops: Humidity", weatherInfo.atmosphere.humidity + '%')
    .addField(":cloud_tornado: Vent", `*${weatherInfo.wind.speed}mph* ; direction: *${weatherInfo.wind.direction}°*`)
    .addField(":clock: Heure", message.createdAt);

    message.delete().catch(O_o=>{});
    return message.channel.send(mEmbed);

  }

  if(cmd === `${prefix}mute`){
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Impossible de trouver l'utilisateur");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous ne pouvez pas mute cette utilisateur");
    let muterole = message.guild.roles.find(`name`, "mute");
    let mutetime = args[1];
    if(!mutetime) return message.reply("**Vous devez préciser un temps (-mute @Zirow 1m Flood)**");

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> à bien été mute pendant ${ms(ms(mutetime))}`);

    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> à été unmute !`);
    }, ms(mutetime));

  }


  if(cmd === `${prefix}gif`){
    if (args.length < 1) {
        throw 'Merci de préciser un gif à rechercher !';
    }

    if(args[1] == `porn` || args[1] == `boobs` || args[1] == `sexy` || args[1] == `sex` || args[1] == `sexe` || args[1] == `bite` || args[1] == `-18` || args[1] == `nsfw`){
      message.channel.sendMessage(":no_entry: **Zirow** n'autorise pas les contenus nsfw !");
      return;
    } else {
      const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(' '))}`, { json: true });

      if (!res || !res.body || !res.body.data) {
          throw 'Impossible de trouver un gif correspondant à votre demande !';
      }

      // let gEmbed = new Discord.RichEmbed()
      // .setDescription("๑۩۞۩๑ GIF ๑۩۞۩๑ > ")
      // .setColor("#ffff99")
      // .setImage(res.body.data.image_url)
      // .addBlankField(true)
      // .addField("Voici le gif que vous avez demandé :", " ", true)
      // .addField("Générer le :", message.createdAt);

      message.delete().catch(O_o=>{});
      return message.channel.send(res.body.data.image_url);
    }

  }

  if(cmd === `${prefix}flip`){
    if (args.length < 1) {
        throw 'Merci de préciser un text à flip !';
    }

    message.edit(
        args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
    );

  }

  if(cmd === `${prefix}shoot`){
    if (message.mentions.users.size < 1) {
        throw '@mentionne la personne que tu souhaite shoot';
    }

    let output = message.mentions.users.map(m => `**${m}**`).join('\n');

    let sEmbed = new Discord.MessageEmbed()
    .setDescription("๑۩۞۩๑ Combat ๑۩۞۩๑")
    .setColor("#ff9966")
    .addField(":gun: Tireur", message.author)
    .addField(":skull: Mort", output);

    message.delete().catch(O_o=>{});
    return message.channel.send(sEmbed);

  }

  if(cmd === `${prefix}avatar`){
    const user = message.mentions.users.first();
    if (!user) {
        throw 'Merci de mentionner la personne.';
    }

    if (!user.avatarURL) {
        throw 'Cette utilisateur ne possede pas de logo';
    }

    message.channel.send(user.avatarURL);
  }

});

  function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(20);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
  }

  function play(connection, message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function(){
      if(server.queue[0]) play(connection, message);
      else connection.disconnect();
    });
  }

bot.login(process.env.TOKEN);
