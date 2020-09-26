module.exports = {
    name: 'ping',
    description: 'Responds with ping latency.',
    args: false,
    usage: false,
    guildOnly: false,
    cooldown: 5,
    aliases: ['latency'],
    async execute(message, args) {
        const ping = await message.client.ws.ping;
        message.channel.send({embed: {
        title: "🏓 Pong!",
        color: 0xff0000,
        description: `${ping}ms`
        }});
    },
};