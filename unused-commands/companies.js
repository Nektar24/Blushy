const Discord = require('discord.js');
const bot = new Discord.Client();
let extras = require("../extras/growth_calculations.js");
let companies = require("../data/companies.json");
const starting = require("../data/variables.json");

module.exports = {
	name: 'companies',
    description: 'Shows a brief description of all the companies.',
    permissions : 0,
	execute(message,args) {
        let output = new Discord.MessageEmbed().setTitle('Companies');
        for (i in companies){
            output.addField(companies[i].name + ' (' + companies[i].id + ')',`Market Sector : ${companies[i].sector}\nMin Ivest : ${extras.numberWithCommas(companies[i].price)} ${starting.Blushies}\nGrowth Today : +${extras.calculate_growth(companies[i].growth)} %\nInstability Rating : **${companies[i].instability}** /5.`)
        }
        message.channel.send(output);
    },
};