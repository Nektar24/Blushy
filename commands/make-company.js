const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let companies = require("../data/companies.json");

module.exports = {
	name: 'make-company',
    description: 'Creates a new company.',
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/make-company <id> <name> <market-sector> <Description>'));
            return;
        }
        let description = message.content.replace(args[0] + ' ' + args[1] + ' ' + args[2] + ' ' + args[3] + ' ','');
        description = description.substring(1);
        if (companies[args[1]]){
            message.channel.send('that company already exists');
        } else {
            companies[args[1]] = {
                id : args[1],
                name : args[2],
                sector : args[3],
                description : description,
                price:1000,
                growth:1,
                alternative_growth : 1,
                alternative_chance : 0,
                instability : 5,
                open_at: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                color : '',
                picture : ''
            }
            fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
            //save();
            message.channel.send('ok');
        }
	},
};