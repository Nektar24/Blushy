const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let bal = require("../data/balance.json");
const starting = require("../data/variables.json");
const extras = require("../extras/growth_calculations.js");

module.exports = {
	name: 'remove',
	description: 'admin command which removes blushies from a person',
	permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == '' || args[2] === null){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <ping-the-person> <blushies> '));
            return;
        }
        let tempnumber;
        try { tempnumber = parseInt(args[2]); }catch (err) { return; }
        if (!Number.isInteger(tempnumber)) { return; }
        let pingedperson = message.guild.member( message.mentions.users.first() || message.guild.members.get(args[1]) );
        if (!message.mentions.users.size) { message.channel.send("Please ping someone mister admin"); return;}
        if (tempnumber <= 0) {message.channel.send("Please type a positive number");return;}
        if (bal[pingedperson.id]){
            if (tempnumber > bal[pingedperson.id].money) {message.channel.send("That person doesn't have that many " + starting.Blushies + " They have : `" + bal[pingedperson.id].money + '` ' + starting.Blushies); return;}
            bal[pingedperson.id].money = bal[pingedperson.id].money - tempnumber;
        }
        message.channel.send( 'Removed ' + args[2] + starting.Blushies + ' from <@' + pingedperson.id + '> . They now have ' + bal[pingedperson.id].money + ' ' + starting.Blushies);
        fs.writeFile("/data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
	},
};