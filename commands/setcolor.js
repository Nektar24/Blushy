const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let companies = require("../data/companies.json");

module.exports = {
	name: 'set-color',
    description: "sets a company's color",
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> <new-color> '));
            return;
        }
        if (companies[args[1]]){
            if (this.isHexColor(args[2])) {
                companies[args[1]].color = args[2];
                message.channel.send('ok');
                fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
                //save();
            } else {message.channel.send('what you typed was not a hex.');}
        } else {message.channel.send("can't find that company");}
    },
    isHexColor(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }
};