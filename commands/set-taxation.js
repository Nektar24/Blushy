const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let starting = require("../data/variables.json");

module.exports = {
	name: 'set-taxation',
	description: 'sets the taxation ammount. Current taxation is `' + starting.TAX.toString() + '`.',
	permissions : 1,
	execute(message,args) {
        starting.TAX = parseFloat(args[1]);
        message.channel.send('ok');
        fs.writeFile("./data/variables.json", JSON.stringify(starting), (err) => { if (err) console.log(err) });
	},
};