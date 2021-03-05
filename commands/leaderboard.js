const Discord = require('discord.js');
const bot = new Discord.Client();

let bal = require("../data/balance.json");
let variables = require("../data/variables.json");
const extras = require("../extras/growth_calculations.js");

module.exports = {
	name: 'leaderboard',
	aliases: ['l','top'],
	description: 'shows the richest 10 people in the bot',
	permissions : 1,
	execute(message,args) {
		let toppeople = [];
		for (person in bal){
			if (bal[person].id == 'Goverment'){continue;}
			let wealthTotal = bal[person].money;
			for (i in bal[person].companies){
				wealthTotal += bal[person].companies[i].invested;
			}
			toppeople.push({name:bal[person].name,money:wealthTotal});
		}
		
		toppeople.sort((a,b) => (a.money < b.money) ? 1 : ((b.money < a.money) ? -1 : 0))

		let output = '';
		toppeople.forEach(function(person){
			output+= `${person.name}  --  **${extras.numberWithCommas(person.money)}** ${variables.Blushies}\n`;
		})

		message.channel.send(
			new Discord.MessageEmbed()
			//.setColor('#0099ff')
			.addFields(
				{name: 'Leaderboard', value: output}
			)
			.setFooter('to view your balance type /bal')
		);
	},
};