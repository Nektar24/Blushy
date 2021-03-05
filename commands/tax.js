const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let bal = require("../data/balance.json");
let companies = require("../data/companies.json");
const starting = require("../data/variables.json");

module.exports = {
    name: 'tax',
    description : 'manually tax a person or a company',
    permissions : 1,
    execute(message,args) {
        // if there is no next word , it shows the Usage message
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <company-id OR member> '));
            return;
        }        
        // first checks for company, then for a user.
        let user = bot.users.cache.find(user => user.username.toLocaleLowerCase() == args[1].toLocaleLowerCase());
        if (companies[args[1]]){
            let people = this.tax_company(args[1]);
            message.channel.send(new Discord.MessageEmbed().setDescription("Taxed the company `" + args[1] + "`. People affected : " + people));
        } else if (user){
            if (bal[user.id]){
                message.channel.send(new Discord.MessageEmbed().setDescription(this.tax_member(user.id)));
            } else {
                message.channel.send('That person has no balance');
            }
        } else if (bal[args[1]]) {
            message.channel.send(new Discord.MessageEmbed().setDescription(this.tax_member(args[1])));
        } else {
            message.channel.send('Cannot Find Member OR Company :/');
        }
        // --------------- saving ----------------------
        fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
    },
    tax_member(id){
        // --------------------- taxing --------------------------
        let wealthTotal = bal[id].money; // will add the rest in the next lines
        // adds each's companies investments to the wealthTotal (only for 1 person)
        for (i in bal[id].companies){
            wealthTotal += bal[id].companies[i].invested;
        }
        let taxation = wealthTotal - (wealthTotal ** starting.TAX);
        let percentCash = bal[id].money / wealthTotal;
        let extraPercentCash = {};
        for (i in bal[id].companies){
            extraPercentCash[i] = bal[id].companies[i].invested / wealthTotal;
        }
        //...
        let taxationCash = Math.round(percentCash * taxation);
        let extraTaxationCash = {};
        for (i in bal[id].companies){
            extraTaxationCash[i] = Math.round(extraPercentCash[i] * taxation);
        }
        //...
        bal[id].money = bal[id].money - taxationCash;
        bal['Goverment'].money+=taxationCash; // adds all taxes to the goverment's budget
        for (i in bal[id].companies){
            bal[id].companies[i].invested = bal[id].companies[i].invested - extraTaxationCash[i];
            bal['Goverment'].money+=extraTaxationCash[i];
        }
        //Now everything should be done and taxed properly

        // returning confirmation message , as string to save resources.
        // we don't create the discord.MessageEmbed here because if we call this function 100 times for 100 members it will create 100 unused Embeds.
        let output = `<@${id}> has been taxed **${taxationCash}**${starting.Blushies}!`;
        if (this.isNotEmpty(extraTaxationCash)){
            output += ' __And__:\n\n';
            let total = taxationCash;
            for (i in extraTaxationCash){
                total += extraTaxationCash[i];
                output += `- **${i}**  :  **${extraTaxationCash[i]}**${starting.Blushies}\n`;
            }
            output += `\nTotally taxed : **${total}**${starting.Blushies}`;
        }
        return output;
    },
    tax_company(id){
        let peopleaffected = 0;
        for (person in bal){
            if (bal[person].companies[id]){
                let wealthTotal = bal[person].money;
                for (i in bal[person].companies){
                    wealthTotal += bal[person].companies[i].invested;
                }
                let taxation = wealthTotal - (wealthTotal ** starting.TAX);
                let percentOfWealth = bal[person].companies[id].invested / wealthTotal;
                let taxationCompany = Math.round(percentOfWealth * taxation);

                bal[person].companies[id].invested = bal[person].companies[id].invested - taxationCompany;
                bal['Goverment'].money+=taxationCompany;

                peopleaffected++;
            }
        }
        return peopleaffected;
    },
    // Code stollen from stack overflow to check if an object is Not empty (returns true if it finds at least one thing inside)
    isNotEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return true;
        }
    
        return false;
    }
}