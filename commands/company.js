const Discord = require('discord.js');
const bot = new Discord.Client();
let extras = require("../extras/growth_calculations.js");
let companies = require("../data/companies.json");
const starting = require("../data/variables.json");
const config = require('../config.json');

module.exports = {
	name: 'company',
    aliases : ['c'],
    description: "Shows a specific company",
    permissions : 0,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> [admin] '));
            return;
        }
        let company = args[1].toLocaleUpperCase();
        if (companies[company]){
            let a = extras.calculate_growth(companies[company].growth);
            let b = extras.calculate_monthly(companies[company].growth);
            let c = extras.calculate_growth(companies[company].alternative_growth);

            let output = new Discord.MessageEmbed().setTitle(companies[company].name)
                            .setAuthor(companies[company].id,companies[company].picture)
                            .setColor(companies[company].color)
                            .setDescription(companies[company].description)
                            .addField("Market Sector",companies[company].sector)
                            .addField("Instability Rating",'**'+companies[company].instability + '** / 5.',true)
            ;
            if (config.adminpermissions.includes(message.author.id) && args[2] == 'admin') {
                output.addField("Daily Growth:",(a>=0?'+':'')+a + '%',true);
            }
            output.addField("Monthly Growth:",(b>=0?'+':'')+b + '%',true);

            if (companies[company].price == 0) {
                output.addField("Minimum Investing Ammount",'None')
            } else {
                output.addField("Minimum Investing Ammount",extras.numberWithCommas(companies[company].price) + ' ' + starting.Blushies)
            }

            if (config.adminpermissions.includes(message.author.id) && args[2] == 'admin') {
                output.addField("Alternative ",(c>=0?'+':'')+c + '%',true);
                output.addField("Chance of happening",companies[company].alternative_chance + '%',true);
                output.addField("Goodwill",extras.numberWithCommas(companies[company].goodwill),false);
                output.addField("Company Emoji",companies[company].emoji_indicator_1,true);
                output.addField("Loss Emoji",companies[company].emoji_indicator_2,true);
            }
            let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
            let open = '';
            for (i in companies[company].open_at){
                open += companies[company].open_at[i] + ', ';
            }
            open = open.slice(0, -2);
            let checker = (arr, target) => target.every(v => arr.includes(v));
            if (open == ''){output.addField('Availiability','Closed for the entire week.');}
            else if (checker(companies[company].open_at,days)){output.addField('Availiability','Open for the entire week.');}
            else { output.addField('Availiability',open); }

            message.channel.send(output);
        } else {message.channel.send("can't find that company");}
    },
};