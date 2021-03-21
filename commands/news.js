const Discord = require('discord.js');
const bot = new Discord.Client();
let extras = require("../extras/growth_calculations.js");
let companies = require("../data/companies.json");
const starting = require("../data/variables.json");

module.exports = {
	name: 'news',
    description: 'Shows a very brief description of all the companies.',
    permissions : 0,
	execute(message,args) {
        let outputs = [];
        for (i=0;i<starting.Market_Sector_Order.length;i++){
            outputs.push(`__${starting.Market_Sector_Order[i]}__ :\n`);
        }
        for (i in companies){
            let j = 0;
            switch (companies[i].sector){
                case starting.Market_Sector_Order[0]:
                    j = 0;
                break;
                case starting.Market_Sector_Order[1]:
                    j = 1;
                break;
                case starting.Market_Sector_Order[2]:
                    j = 2;
                break;
                case starting.Market_Sector_Order[3]:
                    j = 3;
                break;
            }
            // slows the emoji in slot 2 in the case of alternative growth
            // doesn't get an emoji at all if the growth was normal (not alternative)
            let a = extras.calculate_growth(companies[i].growth);
            let b = companies[i].last_time_had_alternative_growth;
            let d = companies[i].emoji_indicator_2;
            let e = extras.calculate_growth(companies[i].alternative_growth);
            outputs[j] += '`'+companies[i].id+'` : **'+(b?e:a)+'** %  ' + (b?d:'') +'\n';
        }
        let output = '';
        for (i in outputs){
            output += outputs[i] + '\n';
        }
        message.channel.send(new Discord.MessageEmbed().setTitle('Companies').setDescription(output));
    },
};