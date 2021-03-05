const Discord = require('discord.js');
const bot = new Discord.Client();

const starting = require("../data/variables.json");

module.exports = {
	name: 'shadypepe',
	description: 'shady pepe',
	permissions : 1,
	execute(message,args) {
		message.channel.send(
			new Discord.MessageEmbed()
				.setDescription('Hey pst,\n\n\nyou win 10,000' + starting.Blushies + ' , congrats kid!')
				.setThumbnail('https://i.redd.it/x8n6a4y41qn41.jpg')
		);
	},
};