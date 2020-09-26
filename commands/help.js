const { prefix } = require("../config.json");

module.exports = {
    name: 'help',
    description: 'Displays a help menu.',
    args: false,
    usage: `${prefix}help`,
    guildOnly: false,
    cooldown: 5,
    aliases: ['h'],
    async execute(message, args) {
      message.channel.send({embed: {
      title: "Help is on the way!",
      //color: '#F34B7D',
      description: `ms`
      }});
    },
};
