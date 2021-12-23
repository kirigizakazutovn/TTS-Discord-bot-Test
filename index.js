require("dotenv")
const {
    Client,
    MessageAttachment
} = require("discord.js")
const Discord = require("discord.js")
const client = new Client({
    disableEveryone: true
})
const fs = require('fs');
const chalk = require('chalk');
/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(chalk.hex("#3FE290")(`Event loaded:`),eventName);
        client.on(eventName, event.bind(null, client));
    });
});
client.commands = new Discord.Collection();
/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(chalk.hex("#3FE290")(`Command loaded:`),commandName);
    });
});
const keepAlive = require('./server.js')
keepAlive()
client.login(process.env.TOKEN)
