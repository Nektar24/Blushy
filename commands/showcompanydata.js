const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let companies = require("../data/companies.json");

module.exports = {
	name: 'showcompanydata',
	description: "debug command which shows what's on the company data file",
	permissions : 2,
	execute(message,args) {
		if (companies[args[1]]) message.channel.send('```json\n' + require('util').inspect(companies[args[1]]) +  '\n```');
		/*
		fs.readFile('./data/companies.json', (err, data) => {
            if (err) { throw err; }
            const _msgs = JSON.stringify(JSON.parse(data), null, 2);
            message.channel.send('```json\n' + _msgs + '\n```');
            //console.log(_msgs)
		});
		*/
	},
};