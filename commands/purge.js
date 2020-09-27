module.exports = {
    name: 'purge',
    description: 'Removes messages.',
    args: false,
    usage: false,
    guildOnly: true,
    cooldown: 5,
    aliases: ['delete', 'remove'],
    async execute(message, args) {
      if(!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission('MANAGE_MESSAGES')){
        message.reply("You don't have permissions to use this command!");
    }else {
      if(!args[0]) return message.reply ('Error, please define second argument')

      let messagestodelete = Number(args[0]) + 1;

      if (typeof args[0] != "number" && args[0] != parseInt(args[0])){
        message.reply(`Error: Not a valid number`);
      }

      messagestodelete = Math.round(messagestodelete);
      if (messagestodelete <= 100) {
        message.channel.bulkDelete(messagestodelete);
    }else {
      for (msgdeleted = 0; msgdeleted <= messagestodelete; msgdeleted=msgdeleted+100) {
        message.channel.bulkDelete(100);
      }
    }
  }
}
};
