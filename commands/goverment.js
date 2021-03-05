const Discord = require('discord.js');
const bot = new Discord.Client();

let bal = require("../data/balance.json");
const starting = require("../data/variables.json");

module.exports = {
	name: 'goverment',
	description: 'pointless number, collected from tax',
	permissions : 0,
	execute(message,args) {
		message.channel.send(
			new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor('Goverment Budget' , "https://www.nicepng.com/png/detail/67-671618_government-building-icon-clip-art-government-clipart.png")
			.addFields(
				{ name: 'Blushies:', value: starting.Blushies + ' ' + bal['Goverment'].money }
			)
			.setTimestamp()
		);
	},
};