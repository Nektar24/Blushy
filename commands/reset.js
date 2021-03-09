const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const accessSpreadsheet = require("../spreadsheet.js");

let bal = require("../data/balance.json");
let days = require("../data/days.json");
const starting = require("../data/variables.json");

module.exports = {
    name: 'reset',
    description: "resets a player's balance and stock market share",
    permissions : 1,
    execute(message,args) {
	if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/rest <person-id>'));
            return;
        }
        if (args[1].toLocaleLowerCase() == 'goverment'){
            bal['Goverment'].money = 0;
            message.channel.send("The entire Goverment's budget has collapsed !");
            fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
            return;
        }
        if (args[1].toLocaleLowerCase() == 'days'){
            days.days = 0;
            message.channel.send("The bot now thinks it's been 0 days since we started !");
            fs.writeFile("./data/days.json", JSON.stringify(days), (err) => { if (err) console.log(err) });
            return;
        }
        if (args[1].toLocaleLowerCase() == 'excel'){
            accessSpreadsheet.resetSpreadsheet();
            message.channel.send("Cleared the spreadsheet!");
            return;
        }
        bal[args[1]] = {
            id: message.author.id,
            name : message.author.tag,
            companies : {},
            money : starting.Starting_Blushies
        }
        message.channel.send('ok I reset that person !');
        fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
    },
};
