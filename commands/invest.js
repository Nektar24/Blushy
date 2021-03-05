const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let companies = require("../data/companies.json");
let bal = require("../data/balance.json");
const starting = require("../data/variables.json");

module.exports = {
	name: 'invest',
	aliases : ['i'],
	description: 'invest money in a company',
	permissions : 0,
	execute(message,args) {
		if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id> <money> '));
            return;
		}
		if (!bal[message.author.id]){
			message.channel.send('Error , you have no balance.');
			return;
		}
		let ammount = args[2];
		try { ammount = parseInt(ammount); }catch (err) { message.channel.send("Please type a number");return; }
		if (!Number.isInteger(ammount)) { message.channel.send("Please type a number");return; }
		if (ammount > bal[message.author.id].money){
			message.channel.send("You cannot afford that.");
			return;
		}
		if (companies[args[1]]){
			message.channel.send(new Discord.MessageEmbed().setDescription(this.invest(message.author.id,args[1],args[2])).setFooter('Type /portfolio to see your investments'));
		} else {
			message.channel.send("That company doesn't exist.");
		}
	},
	invest(person,company,ammount){
		if (ammount <= 0){
			return "Please type a number larger than 0.";
		}
		let day = this.getDay();
		if (!companies[company].open_at.includes(day)){
			return "This company is closed for investments on " + day + "s.";
		}
		if (ammount < companies[company].price){
			return "The minimum investment price for that company is " + companies[company].price.toString() + starting.Blushies;
		}
		bal[person].money = bal[person].money - ammount;
		if (!bal[person].companies[company]){
			bal[person].companies[company] = {
				name : companies[company].name,
				invested : parseInt(ammount)
			}
		} else {
			bal[person].companies[company].invested = parseInt(bal[person].companies[company].invested) + parseInt(ammount);
		}
		
		fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });

		return "You have invested " + ammount.toString() + starting.Blushies + " in the company `" + company + "`.";
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