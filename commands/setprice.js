const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let companies = require("../data/companies.json");

module.exports = {
	name: 'set-price',
    description: "sets a company's price",
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> <new-price> '));
            return;
        }
        if (companies[args[1]]){
            companies[args[1]].price = parseInt(args[2]);
            message.channel.send('ok');
            fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
            //save();
        } else {message.channel.send("can't find that company");}
	},
};