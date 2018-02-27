const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.lenght <= 0){
    console.log("Impossible de trouver le dossier commandes");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} est connecte sur ${bot.guilds.size} serveurs !`);
  bot.user.setPresence({game: { name: 'Version : ALPHA-0.3.1', type: 0} });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.lenght));
  if(commandfile) commandfile.run(bot,message,args);

  if (message.content === 'ping' || message.content == 'Ping') {
    message.channel.send('pong');
  }

  if (message.content === 'hey') {
    message.channel.send('coucou');
  }

  //Autobannisement pour certain mot

  if (message.content === 'tg' || message.content == 'Tg' || message.content == 'TG') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **tg** est banni !');
  }

  if (message.content === 'pute' || message.content == 'Pute' || message.content == 'PUTE') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **pute** est banni !');
  }

  if (message.content === 'fdp' || message.content == 'FDP' || message.content == 'fils de pute') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **fdp** est banni !');
  }

  if (message.content === 'salope' || message.content == 'Salope' || message.content == 'SALOPE') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **salope** est banni !');
  }

  if (message.content === 'ntm' || message.content == 'NTM' || message.content == 'nique ta mère') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **ntm** est banni !');
  }

  if (message.content === 'connard' || message.content == 'Connard' || message.content == 'CONNARD') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **connard** est banni !');
  }

  if (message.content === 'vagin' || message.content == 'Vagin' || message.content == 'VAGIN') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **vagin** est banni !');
  }

  if (message.content === 'kikou' || message.content == 'Kikou' || message.content == 'KIKOU') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **kikou** est banni !');
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

    if(randnum == 11){
      message.reply("Deux ballons discutent : \n - Si on allait s'éclater, dit l'un ? \n - T'es pas un peu gonflé, lui répond l'autre !");
    }

    if(randnum == 12){
      message.reply("Qu'est-ce qu'un roux sur une bicyclette ? \n Un 3 roues...");
    }

    if(randnum == 13){
      message.reply("- Docteur j'ai mal à l'oeil qauche quand je bois mon café. \n - Essayez d'enlever la cuillère de la tasse.");
    }

    if(randnum == 14){
      message.reply("Au téléphone: \n - Tu connais Sarah ? \n - Sarah qui ?  \n - Ca raccroche");
    }

    if(randnum == 15){
      message.reply("Quelle est la capitale de l'île de Tamalou ? \n Gébobola ! ");
    }

    if(randnum == 16){
      message.reply("Quelle est la différence entre un ascenseur et une cigarette ?  \n Il n'y en a pas. Tous les deux font des cendres...");
    }

    if(randnum == 17){
      message.reply("Quels sont les fruits que nous trouvons dans toutes les maisons ? \n les coins et les mûres. ");
    }

    if(randnum == 18){
      message.reply("Quel est l'animal qui a le plus de dents ? \n La petite souris !");
    }

    if(randnum == 19){
      message.reply("- Tu te souviens du prénom d'Alzheimer ? \n - Non \n - Tu vois ça commence comme ça !");
    }

    if(randnum == 20){
      message.reply("Qu'est-ce qu'un tube de colle avec une cape ? \n SuperGlue");
      //page 7
    }
  }
});

  function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(20);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
  }

bot.login(process.env.TOKEN);
