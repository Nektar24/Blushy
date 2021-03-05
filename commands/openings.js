const Discord = require('discord.js');
const bot = new Discord.Client();

const kinstuff = require("../data/variables.json");

module.exports = {
	name: 'openings',
    aliases : ['o'],
	description: 'shows when each company is open for transactions visually',
	permissions : 0,
	execute(message,args) {
		message.channel.send(kinstuff.openings_image);
	},
};