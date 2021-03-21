const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let companies = require("../data/companies.json");

module.exports = {
	name: 'set-emoji',
    description: "sets a company's emoji reaction",
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> <1-2> <emoji> \nEach number is emoji spot. 1 is company general emoji , 2 is reaction to alternative growth'));
            return;
        }
        if (companies[args[1]]){
            try {
                if (parseInt(args[2])){
                    if (parseInt(args[2]) == 1) {
                        companies[args[1]].emoji_indicator_1 = args[3];
                    } else {
                        companies[args[1]].emoji_indicator_2 = args[3];
                    }
                    message.channel.send('ok');
                    fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
                    //save();
                } else {message.channel.send("please type 1 or 2 . Each number is emoji spot. 1 is company general emoji , 2 is reaction to alternative growth");}
            } catch {message.channel.send("please type 1 or 2 . Each number is emoji spot. 1 is company general emoji , 2 is reaction to alternative growth");}
        } else {message.channel.send("can't find that company");}
	},
};