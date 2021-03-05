const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let companies = require("../data/companies.json");

module.exports = {
	name: 'set-open',
    description: "sets a company's availiable to invest days",
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> <Days. 1:Monday,2:Tuesday....> \n' + '/'+args[0] + ' <company-id> <1 3 5> => will make it open for Monday , Wednesday and Friday'));
            return;
        }
        if (companies[args[1]]){
            let days = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
            let fullmessage = message.content.replace(args[0]+' '+args[1]+' ','');
            fullmessage = fullmessage.substring(1);
            if (!fullmessage) {message.channel.send('Error Error Error Error');return;}
            let args2 = fullmessage.trim().split(/ +/);
            let temp = [];
            for (i in args2){
                try {
                    temp.push(days[args2[i]]);
                } catch (err){message.channel.send('Error Error Error Error');return;}
            }
            companies[args[1]].open_at = temp;
            message.channel.send('ok');
            fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
            //save();
        } else {message.channel.send("can't find that company");}
	},
};