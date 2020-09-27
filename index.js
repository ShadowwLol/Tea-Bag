/* The reason why messages for message.reply are lowercase is
because message.reply appends the user's mention followed by a comma,
so we need to lowercase to use proper grammar */

const { readdirSync } = require('fs'); // A require statement exports a module from npm - this one is pre-installed with node

const { token, prefix } = require('./config.json'); // Gets strings from the config file you created

const { Client, Collection } = require('discord.js'); // This is how your bot works - it's the module you installed with `npm install discord.js eslint` earlier

const client = new Client(); // Creates your bot client

const cooldowns = new Collection(); // Creates a collection of member command cooldowns

client.commands = new Collection(); // Creates a collection of all commands

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js')); // Gets the command files you'll make

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
} // Setup each command

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`, { type: "PLAYING"});
    console.log(`Logged in as ${client.user.tag}!`);
}); // Send a message when the client has successfully logged in

client.on('message', message => {
    //message.guild.channels.create("logs");
    if (!message.content.startsWith(prefix) || message.author.bot || message.webhookID) return; /* Cancels if the message:
        - Doesn't start with the prefix
        - Was sent by a bot
        - Was sent by a webhook */

    const args = message.content.slice(prefix.length).trim().split(/ +/); // Gets values after the command name
    const commandName = args.shift().toLowerCase(); // Gets the name of the command
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); /* Search for a command with the specified command name,
    or another acceptable name for it (alias)    */
    
    if (!command) return; // Exits if the command doesn't exist

    if (command.args && !args.length) {
        let reply = 'you didn\'t provide any arguments!'; // Sets the reply to the default

        if (command.usage) {
            reply = `use it like this: \`${prefix}${command.name} ${command.usage}`; // Sets the reply to the command usage
        } // Runs if the command has a specific usage of arguments

        return message.reply(reply); // Sends back the reply and exits
    } // Runs if the command requires arguments and none were given

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('that command is not available in DMs.'); // Sends a reply and exits
    } // Runs if the command was run in a DM and it's not available in DMs

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection()); // Creates a new command cooldown
    } // Runs if the command doesn't currently have a cooldown
    
    const now = Date.now(); // Gets the current time as a number
    const timestamps = cooldowns.get(command.name); // Get the current cooldown
    const cooldownAmount = (command.cooldown || 0) * 1000; /* Gets the command cooldown from the command's files
    If no cooldown is specified, the cooldown is 0 seconds - no time
    and converts it into Date.now format by multiplying it by 1000 */

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // Gets the amount of time the user needs to wait from the beginning

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000; // Gets the amount of time left, and converts it to seconds
            
            return message.channel.send(`Command on cooldown! ${timeLeft.toFixed(1)} second(s)`); // Sends a message and exits
        } // Runs if the cooldown expiration time hasn't passed yet
    } // Runs if the cooldown includes the author
    
    // The following 2 lines will run if the expiraton time has passed

    timestamps.set(message.author.id, now); // Set the timestamp to passed
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // Deletes the cooldown

    try {
        command.execute(message, args); // Execute the command
    } catch (error) {
        console.error('Error executing command:', error); // Logs the error to the terminal
        return message.reply('an error occurred while trying to perform that command. Please contact a bot administrator.'); /* Tells the user an error occurred and to contact a bot administrator,
        then exits */
    } // Tries to execute the command
}); // Runs when someone sends a message

client.login(token); // Logs the client into Discord so it can listen for actions
        