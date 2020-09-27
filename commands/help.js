const { prefix } = require("../config.json");
const Discord = require("discord.js");


module.exports = {
    name: 'help',
    description: 'Displays a help menu.',
    args: false,
    usage: `${prefix}help`,
    guildOnly: false,
    cooldown: 5,
    aliases: ['h'],
    async execute(message, args) {
      let arguments = String(args[0]);
      arguments = arguments.toLowerCase();
      if (!args[0]){
        const embed = new Discord.MessageEmbed()
        .setTitle("Help is on the way!")
        .addField("Admin", "Administrator only commands!", true)
        .addField("Others", "Commands available to anyone!", true)
        .setColor(0xEEE908)
        .setFooter("Use `help <category> to read more!`");
        message.author.send(embed).then(embedMessage => {embedMessage.react("👍");});
      }else{
        switch(arguments) {
          case 'admin':
            admin();
            break;
          case 'others':
            others();
            break;
          default:
            message.author.reply("Invalid argument");
            break;
        }        
      }
      function admin() {
        const adminemb = new Discord.MessageEmbed()
        .setTitle("Administrator commands:")
        .addField("purge", "Removes messages!", false)
        .setColor(0xFF0000)
        .setFooter("Use `help <category> to read more!`");
        message.author.send(adminemb).then(embedMessage => {embedMessage.react("👍");});
      };
      function others() {
        const otheremb = new Discord.MessageEmbed()
        .setTitle("Other commands:")
        .addField("help", "Displays the help menu!", false)
        .addField("ping", "Displays latency!", false)
        .setColor(0x4EA9F2)
        .setFooter("Use `help <category> to read more!`");
        message.author.send(otheremb).then(embedMessage => {embedMessage.react("👍");});
      };
    },
};
