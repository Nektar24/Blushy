const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let bal = require("../data/balance.json");
let companies = require("../data/companies.json");
const starting = require("../data/variables.json");
const extras = require("../extras/growth_calculations.js");

module.exports = {
	name: 'portfolio',
    aliases : ['p'],
	description: 'see your current investments',
	permissions : 0,
	execute(message,args) {
        let temp = ' ';
        for (i in bal[message.author.id].companies){
            if (bal[message.author.id].companies[i].invested == 0) {continue;}
            temp += companies[i].emoji_indicator_1 + ' ' + bal[message.author.id].companies[i].name + '  :  **' + extras.numberWithCommas(bal[message.author.id].companies[i].invested) + '** ' + starting.Blushies + '\n';
        }
        if (temp == ' '){
            temp = "You don't have any investments";
        }
        message.channel.send(new Discord.MessageEmbed().setTitle("Portfolio").setDescription(temp));
    }
}