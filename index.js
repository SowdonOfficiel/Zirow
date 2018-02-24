const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} est connecte`);
  bot.user.setPresence({game: { name: 'Version : ALPHA-0.1', type: 0} });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (message.content === 'ping') {
    message.channel.send('pong');
  }

  if (message.content === 'hey') {
    message.channel.send('coucou');
  }

  if(cmd == `${prefix}say`){
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

    return;





  }

  if(cmd == `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour clear !");
    if(!args[0]) return message.channel.send("Vous devez préciser combien de message je dois clear !");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Clear de ${args[0]} messages.`).then(msg => msg.delete(5000));
  })

  return;
  }

  if(message.content === "Raconte moi une blague" || message.content === "dis moi une blague MinithMc" || message.content === "raconte moi une blague"){
    random();

    if(randnum == 1){
      message.reply("Un fils demande à son père : \n - Papa,c'est quoi la beauté? \n - Tu vois ta mère ? \n - Oui \n - Et ben c'est pas ça!");
    }

    if(randnum == 2){
      message.reply("Un jour Dieu dit à Casto de ramer. \n Et depuis, castorama...");
    }

    if(randnum == 3){
      message.reply("Quelle est la différence entre une échelle et un pistolet ? \n L'échelle sert à monter, le pistolet sert à descendre.");
    }

    if(randnum == 4){
      message.reply("Pourquoi un chasseur emmène-t-il son fusil aux toilettes ? \n Pour tirer la chasse.");
    }

    if(randnum == 5){
      message.reply("Vous connaissez l'histoire de l'armoire ? \n Elle est pas commode...");
    }

    if(randnum == 6){
      message.reply("Dans la phrase **le voleur a volé une télévision**, où est le sujet ? \n En prison !");
    }

    if(randnum == 7){
      message.reply("- Les gens devraient dormir leur fenêtre ouverte... \n - Pourquoi, vous êtes medecin ? \n - Non, cambrioleur !");
    }

    if(randnum == 8){
      message.reply("Que fait une vache quand elle a les yeux fermés ? \n - Elle fabrique du lait concentré!");
    }

    if(randnum == 9){
      message.reply("L'autre jour, j’ai raconté une blague sur Carrefour, mais elle a pas supermarché…");
    }

    if(randnum == 10){
      message.reply("L'autre jour, j’ai raconté une blague sur Carrefour, mais elle a pas supermarché…");
    }
  }
});

  function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(10);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
  }

bot.login(botconfig.token);
