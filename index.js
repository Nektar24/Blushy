const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
const starting = require("./data/variables.json");
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

let companies = require("./data/companies.json");
let bal = require("./data/balance.json");

const nektar = config.nektar;

bot.on("warn", (info) => console.log(info));
bot.on("error", console.error);
bot.on('ready',()=>{
    // once a day calls the newday function
    setTimeout(function(){
        bot.setInterval(function(){
            bot.commands.get("newday").nextday();
        },1000*60*60*24); // 24h
    },leftToEight());
    console.log('The Bot is online Nek!');
});

bot.on("message", async (message) => {
    if (message.author.bot){ return; } //message came from human
    if (message.type == 'dm') { return; } //message is in a server

    if (!bal[message.author.id]){
        bal[message.author.id] = {
            id: message.author.id,
            name : message.author.tag,
            companies : {},
            money : starting.Starting_Blushies
        }
        fs.writeFile("/data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
    }

    if(message.content.startsWith('/')){
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args[0].toLowerCase();

        const command = 
            bot.commands.get(commandName) ||
            bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
        ;
        
        if (!command) return;
        
        try {
            switch (command.permissions){
                case 0:
                    command.execute(message, args);
                break;
                case 1:
                    if (config.adminpermissions.includes(message.author.id)) {
                        command.execute(message, args);
                    }
                    // else message.reply("You are not an admin.");
                break;
                case 2:
                    if (message.author.id == nektar){
                        command.execute(message, args);
                    }
                break;
            }
            
        } catch (error) {
        console.error(error);
        message.reply("There was an error executing that command.").catch(console.error);
        }
    }

});

function leftToEight(){
    var d = new Date();
    let remaining = -d + d.setHours(8,0,0,0);
    if (remaining < 0){
        remaining += 24 * 60 * 60 * 1000;
    }
    return remaining;
}

bot.login(config.token);