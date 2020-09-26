module.exports = {
    name: 'help',
    description: 'Displays a help menu.',
    args: false,
    usage: false,
    guildOnly: false,
    cooldown: 5,
    aliases: [''],
    async execute(message, args) {
        const ping = await message.client.ws.ping;
        message.channel.send({embed: {
        title: "Help is on the way!",
        color: 0xff0000,
        description: `${ping}ms`
        }});
    },
};
