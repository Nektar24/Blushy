const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let extras = require("../extras/growth_calculations.js");
let companies = require("../data/companies.json");
let bal = require("../data/balance.json");
const starting = require("../data/variables.json");

module.exports = {
	name: 'grow',
	description: 'admin command which forwards time by 1 day only on one specific company',
	permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/grow <company-id>'));
            return;
        }
        if (companies[args[1]]){
            let peopleandgrowth = this.grow(args[1]);
            message.channel.send("The profits of the Company `"+args[1]+'` changed by '+ extras.calculate_growth(peopleandgrowth[1]) +'% !!\nPeople affected : ' + peopleandgrowth[0]);
            fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
        } else {message.channel.send("Can't find that company");}
    },
    grow(company){
        // picks a random number between 1 and 100
        let growth = Math.floor(Math.random() * 100 + 1);
        // 
        if (growth <= companies[company].alternative_chance){
            growth = companies[company].alternative_growth;
            companies[company].last_time_had_alternative_growth = true;
        } else {
            growth = companies[company].growth;
            companies[company].last_time_had_alternative_growth = false;
        }
        let people = 0;
        for (person in bal){
            if (bal[person] == bal['Goverment'] || bal[person].id == bal['Goverment'].id){continue;}
            if (bal[person].companies[company]){
                bal[person].companies[company].invested = Math.round(bal[person].companies[company].invested*growth);
                people++;
            }
        }
        return [people,growth];
    }
};