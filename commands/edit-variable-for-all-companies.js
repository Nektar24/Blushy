const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let companies = require("../data/companies.json");

module.exports = {
    name: 'edit-variable-for-all-companies',
    description: "dangerous admin command which edits a valuable's value for all the companies.",
    permissions : 1,
    execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <variable-name> <value> \nfor example\n `/' + args[0] + " price 4000` <-- will make all companies's prices 4000 "));
            return;
        }
        // checks if that variable name exists in the first company.
        if (companies[Object.keys(companies)[0]].hasOwnProperty(args[1])){
            for (i in companies){
                this.addkey(companies[i],args[1],args[2])
            }
            message.channel.send('ok');
            fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => { if (err) console.log(err) });
            //save();
        } else {message.channel.send("Can't find that variable name");}
    },
    addkey(obj,key,content){
        obj[key] = content;
    }
};
