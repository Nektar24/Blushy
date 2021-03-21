const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const accessSpreadsheet = require("../spreadsheet.js");

let grow = require("./grow.js");
let tax = require("./tax.js");
let days = require("../data/days.json");
let extras = require("../extras/growth_calculations.js");
let companies = require("../data/companies.json");
let bal = require("../data/balance.json");
const starting = require("../data/variables.json");

let timeout = 1000 * 60 * 5; // 5 minutes
let onhold = false;

module.exports = {
	name: 'newday',
	description: 'admin command which forwards time by 1 day',
	permissions : 1,
	execute(message,args) {
		let description = this.nextday();
		try {
		message.channel.send(
			new Discord.MessageEmbed().setTitle('Next Day').setColor("#0000FF").setDescription(description).setTimestamp()
		);
		} catch (err){message.channel.send(err.toString());}
	},
	nextday(){
		days.days++;
		let output = "**Day : " + days.days + '**\n\nCompany Growth logs :\n';
		let exelnumbers = {
			day : days.days,
			companies : {},
			goodwill : {},
			peopletaxed : 0
		};
		for (company in companies){
			// grow each company
			let peopleandgrowth = grow.grow(companies[company].id);
			// change (format) the number from 1.0XX to XX% (for example 1.054 becomes 54%)
			let changedby = extras.calculate_growth(peopleandgrowth[1]);

			output += "- Company `" + companies[company].id + "` changed by **" + changedby + "**% . Affected " + peopleandgrowth[0] + " people.\n";
			exelnumbers.companies[companies[company].id] = {
				company : companies[company].id,
				changedby : changedby/100 + 1,
				people_affected : peopleandgrowth[0]
			}
		}

		// goodwill , happens once a week
		if (days.days%7 == 0){
			let peoplewhogotgoodwill = this.goodwill();
			output += `\nDistributed **GoodWill** ! ${peoplewhogotgoodwill.ammount} people affected.\n`;
			exelnumbers.goodwill = peoplewhogotgoodwill;
		}

		// taxation , happens once a month
		if (days.days%30 == 0){
			let peopletaxed = 0;
			for (person in bal){
				if (bal[person] == bal['Goverment'] || bal[person].id == bal['Goverment'].id){continue;}
				// if the person's money is less than 100,000 they won't be taxed.
				let wealthTotal = bal[id].money;
				for (i in bal[id].companies){
					wealthTotal += bal[id].companies[i].invested;
				}
				if (wealthTotal < starting.TAX_min){continue;}

				// if we get to this point then the person's balance is more than 100,000
				tax.tax_member(bal[person].id);
				peopletaxed++;
				
			}
			output += `\n**Tax day** ! ${peopletaxed} people affected.`;
			exelnumbers.peopletaxed = peopletaxed;
		}
		if (!onhold){
			// if someone spams /newday , the save will only happen 1 time after 5 minutes.
			// this is done to avoid onedrive locks
			onhold = true;
			bot.setTimeout(function(){
				onhold = false;
				fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
				fs.writeFile("./data/days.json", JSON.stringify(days), (err) => { if (err) console.log(err) });
			},timeout);
		}

		// log changes into excel
		accessSpreadsheet.accessSpreadsheet(exelnumbers);
		
		return output;
	},
	goodwill(){
		let peoplewhogotgoodwill = {ammount :0 , logs:{}};
		for (personid in bal){
			if (bal[personid].companies){
				for (company in bal[personid].companies){
					if (companies[company]){
						if (companies[company].goodwill){
							// logs
							if (!peoplewhogotgoodwill.logs[bal[personid].id]){
								peoplewhogotgoodwill.logs[bal[personid].id] = {companies:{}};
								peoplewhogotgoodwill.ammount++;
							}
							// calculations
							
							// calculating the total ammount of wealth for each person
							let wealthTotal = bal[personid].money;
							for (i in bal[personid].companies){
								wealthTotal += bal[personid].companies[i].invested;
							}

							// calculating what percentage of that money is in each company
							let percentage = Math.round(bal[personid].companies[company].invested / wealthTotal);

							// adding goodwill according to each percentage
							let added = Math.round(percentage * companies[company].goodwill);
							bal[personid].companies[company].invested += added;

							//loging the thing we added
							peoplewhogotgoodwill.logs[bal[personid].id].companies[company] = added;
						}
					}
				}
			}
		}
		return peoplewhogotgoodwill;
	}
};