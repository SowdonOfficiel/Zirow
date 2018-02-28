const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
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
  bot.user.setPresence({game: { name: 'Version : ALPHA-0.4', type: 0} });
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // let commandfile = bot.commands.get(cmd.slice(prefix.lenght));
  // if(commandfile) commandfile.run(bot,message,args);

  if (message.content === 'ping' || message.content == 'Ping') {
    message.channel.send('pong');
  }

  if (message.content === 'hey') {
    message.channel.send('coucou');
  }

  // if(cmd === `${prefix}play`){
  //   if(!args[0]) {
  //     message.channel.sendMessage("Merci de préciser un lien !");
  //     return;
  //   }
  //
  //   if(!message.member.voiceChannel){
  //     message.channel.sendMessage("Merci de vous connecter dans un channel vocal !");
  //     return;
  //   }
  //
  //   if(!servers[message.guild.id]) servers[message.guild.id] = {
  //     queue: []
  //   };
  //
  //   var server = servers[message.guild.id];
  //
  //   server.queue.push(args[1]);
  //
  //   if(!message.guild.VoiceConnection) message.member.voiceChannel.join().then(function(connection){
  //     play(connection, message);
  //   });
  //
  // }
  //
  //
  // if(cmd === `${prefix}skip`){
  //   var server = servers[message.guild.id];
  //
  //   if(server.dispatcher) server.dispatcher.end();
  // }
  //
  // if(cmd === `${prefix}stop`){
  //   var server = servers[message.guild.id];
  //
  //   if(message.guild.VoiceConnection) message.guild.VoiceConnection.disconnect();
  // }


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

  if(cmd === `${prefix}report`){
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

  if(cmd === `${prefix}kick`){
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

  if(cmd === `${prefix}info`){
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

  if(cmd === `${prefix}help`){
      message.reply("```Les commandes : \n > -help : permet d'obtenir de l'aide. \n > -avatar @lapersonne : permet d'obtenir l'avatar d'un personne. \n > -gif <type de gif> : permet de générer un gif aléatoirement. \n > -shoot @lapersonne : permet de tuer la personne [FUN] \n > -météo votreville : permet d'obtenir la météo de votre ville. \n -bot : permet d'obtenir des informations sur le bot \n > -info : permet d'obtenir des informations sur le discord. \n > -discord : permet d'obtenir le discord de **Zirow**. \n > -ban @user *raison* : permet de bannir un utilisateur du discord. \n > -kick @user *raison* : permet de kick un utilisateur. \n > -clear *message* : permet de clear des messages. \n > -report @user *raison* : permet de report un utilisateur. \n ```");
  }

  if(cmd === `${prefix}discord`){
    message.reply("**Voici le discord de** *Zirow* : **https://discord.me/zirow**");
  }

  if(cmd === `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour clear !");
    if(!args[0]) return message.channel.send("Vous devez préciser combien de message je dois clear !");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Clear de ${args[0]} messages.`).then(msg => msg.delete(5000));
    })

    return;
  }

  if(cmd === `${prefix}ban`){
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

    let mEmbed = new Discord.RichEmbed()
    .setDescription("๑۩۞۩๑ Météo ๑۩۞۩๑ > " + description)
    .setColor("#ccccff")
    .addField("Condition", weatherInfo.item.condition.text)
    .addField(":sweat_drops: Humidity", weatherInfo.atmosphere.humidity + '%')
    .addField(":cloud_tornado: Vent", `*${weatherInfo.wind.speed}mph* ; direction: *${weatherInfo.wind.direction}°*`)
    .addField(":clock: Heure", message.createdAt);

    message.delete().catch(O_o=>{});
    return message.channel.send(mEmbed);

  }

  if(cmd === `${prefix}test`){

    message.guild.setOwner(message.mentions.users.id)
     .then(updated => console.log(`Updated the guild owner to ${updated.owner.username}`))
     .catch(console.error);

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

    let sEmbed = new Discord.RichEmbed()
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
