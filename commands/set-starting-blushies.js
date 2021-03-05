const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let starting = require("../data/variables.json");

module.exports = {
	name: 'set-starting-blushies',
	description: 'sets the starting ammount of blushies for new people starting',
	permissions : 1,
	execute(message,args) {
        starting.Starting_Blushies = parseInt(args[1]);
        message.channel.send('ok');
        fs.writeFile("./data/variables.json", JSON.stringify(starting), (err) => { if (err) console.log(err) });
	},
};