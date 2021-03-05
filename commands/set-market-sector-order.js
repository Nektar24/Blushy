const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let starting = require("../data/variables.json");

module.exports = {
	name: 'set-market-sector-order',
	description: 'sets the order that the companies appear in `/news` and `/companies`',
	permissions : 1,
	execute(message,args) {
		if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <new-order>\nCurrent order: ' + starting.Market_Sector_Order.join()));
            return;
		}
		let fullmessage = message.content.replace(args[0]+ ' ','');
		fullmessage = fullmessage.substring(1);
		let checker = (arr, target) => target.every(v => arr.includes(v));
		let typed = fullmessage.split(/ +/);

		if (checker(typed,starting.Market_Sector_Order)){
			starting.Market_Sector_Order = typed;
			message.channel.send('ok');
			fs.writeFile("./data/variables.json", JSON.stringify(starting), (err) => { if (err) console.log(err) });
		} else {
			message.channel.send('You did not provide all the sectors');
		}
	},
};