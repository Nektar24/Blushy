const Discord = require('discord.js');
const bot = new Discord.Client();

const starting = require("../data/variables.json");

module.exports = {
	name: 'shadypepe',
	description: 'shady pepe',
	permissions : -2,
	execute(message,args) {
		/*
		message.channel.send(
			new Discord.MessageEmbed()
				.setDescription('Hey pst,\n\n\nyou win 10,000' + starting.Blushies + ' , congrats kid!')
				.setThumbnail('https://i.redd.it/x8n6a4y41qn41.jpg')
		);
		*/
	},
	async appear(channels){
		let emb = new Discord.MessageEmbed()
					.setDescription("pst! Hey pst!, Do you want some blushy?")
					.setThumbnail('https://i.redd.it/x8n6a4y41qn41.jpg')
		;

		

		await bot.channels.cache.get(channels.market_test_server).send(emb);
		await bot.channels.cache.get(channels.market_wholesome_cafe).send(emb);
	}
};