const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let companies = require("../data/companies.json");
let bal = require("../data/balance.json");
let buffer = require("../data/buffer-on-going-investments.json");
const starting = require("../data/variables.json");

module.exports = {
	name: 'reclaim',
	aliases : ['r'],
	description: 'reclaim money from an investment',
	permissions : 0,
	execute(message,args) {
		if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> <percentage-of-money-to-reclaim> '));
            return;
        }
		if (!bal[message.author.id]){
			message.channel.send('Error , you have no balance.');
			return;
		}
		let percentage = args[2];
		try { percentage = parseInt(percentage); }catch (err) { message.channel.send("Please type a number");return; }
        if (!Number.isInteger(percentage)) { message.channel.send("Please type a number");return; }

		if (companies[args[1].toLocaleUpperCase()]){
			message.channel.send(new Discord.MessageEmbed().setDescription(this.reclaim(message.author.id,args[1].toLocaleUpperCase(),args[2])).setFooter('Type /portfolio to see your investments'));
		} else {
			message.channel.send("That company doesn't exist.");
		}
	},
	reclaim(person,company,percentage){
		percentage = parseInt(percentage);
		if (percentage < 0 || percentage > 100){
			return "Please type a percentage between 0 and 100";
		}
		if (!bal[person].companies || !bal[person].companies[company]){
            return "You don't have investments in that company";
        }
		let day = this.getDay();
		if (!companies[company].open_at.includes(day)){
			if (!buffer[message.author.id]){
				buffer[message.author.id] = {companies : {}}
			}
			buffer[message.author.id].companies[company] = percentage;
			fs.writeFile("./data/buffer-on-going-investments.json", JSON.stringify(buffer), (err) => { if (err) console.log(err) });
			return "This company is closed for investments on " + day + "s. Your request has been sent to that company. It will be executed on The Next Availiable day. If you wish to cancel it , type /reclaim 0";
        }
		let reclaimed = Math.round(bal[person].companies[company].invested * percentage/100);
		
		bal[person].money = bal[person].money + reclaimed;
		bal[person].companies[company].invested = bal[person].companies[company].invested - reclaimed;
		
		fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });

		return "You have reclaimed " + percentage.toString() + "% ( `" + reclaimed + "` " + starting.Blushies + ") from the company `" + company + "`. They have been added to your balance.";
	},
	getDay(){
		var day;
		switch (new Date().getDay()) {
			case 0:
				day = "Sunday";
			break;
			case 1:
				day = "Monday";
			break;
			case 2:
				day = "Tuesday";
			break;
			case 3:
				day = "Wednesday";
			break;
			case 4:
				day = "Thursday";
			break;
			case 5:
				day = "Friday";
			break;
			case 6:
				day = "Saturday";
		}
		return day;
	}
};