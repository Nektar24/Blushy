const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
	name: 'ping',
	description: 'returns a responce to make sure that the bot is online',
	permissions : 0,
	execute(message,args) {
		message.channel.send("I'm online! (**" + Math.round(bot.ws.ping) + "**ms).");
	},
};