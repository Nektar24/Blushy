const Discord = require('discord.js');
const bot = new Discord.Client();

let bal = require("../data/balance.json");
const starting = require("../data/variables.json");
const extras = require("../extras/growth_calculations.js");

module.exports = {
	name: 'bal',
	description: 'shows your blushie balance',
	permissions : 0,
	execute(message,args) {
		let sum = bal[message.author.id].money;
		for (i in bal[message.author.id].companies){
			sum += parseInt(bal[message.author.id].companies[i].invested);
		}
		message.channel.send(
			new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor(message.author.tag , message.author.avatarURL({dynamic : true}))
			.setTitle("Blushies : ")
			.setDescription("Total Wealth : **" + extras.numberWithCommas(sum) + "** " + starting.Blushies + "\nCash : **" + extras.numberWithCommas(bal[message.author.id].money) + "** " + starting.Blushies)
			.setTimestamp()
		);
	},
};