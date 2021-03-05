const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let companies = require("../data/companies.json");

module.exports = {
	name: 'add-variable',
    description: "admin command which adds a variable to all the companies",
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <new-variable> '));
            return;
        }
        // checks if that variable name exists in the first company.
        if (!companies[Object.keys(companies)[0]].hasOwnProperty(args[1])){
            for (i in companies){
                if(!this.addkey(companies[i],args[1])) {return message.channel.send("Error, That variable name already exists in a company");}
            }
            message.channel.send('ok');
            fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
            //save();
        } else {message.channel.send("That variable name already exists.");}
	},
    addkey(obj,key){
        var content = '';
        if (obj[key]) {
            return false;
        } else {
            obj[key] = content;
            return true;
        }
    }
};