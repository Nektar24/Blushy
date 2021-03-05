const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
let companies = require("../data/companies.json");
let bal = require("../data/balance.json");

module.exports = {
	name: 'delete-company',
    description: 'Deletes a company',
    permissions : 1,
	execute(message,args) {
        if (companies[args[1]]){
            for (personid in bal){
                if (bal[personid].id == 'Goverment') {continue;}
                if (bal[personid].companies[args[1]]){
                    bal[personid].money += bal[personid].companies[args[1]].invested;
                    bal[personid].companies[args[1]].invested = 0;
                }
            }
            delete companies[args[1]];
            fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
            fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
            //save();
            message.channel.send('ok. Deleted company `' + args[1] + '`. `' + peopleaffected + '` people affected (added their investments back to their cash)');
        }
        else {message.channel.send("I can't find that company");}
	},
};