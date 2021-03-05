const Discord = require('discord.js');
const bot = new Discord.Client();

const company_command = require("./company.js");
const companies = require("../data/companies.json");

module.exports = {
	name: 'company-all',
	description: "admin command , it's like posting `/company` 12 times",
	permissions : 1,
    execute(message,args) {
        let fakeargs = ['/company']
		for (company in companies){
            fakeargs[1] = company;
            company_command.execute(message,fakeargs);
        }
	},
};