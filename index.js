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
    setTimeout(function(){
        // calls the newday function at 8 am once
        newday();
        // calls the newday function everyday
        bot.setInterval(function(){
            newday();
        },1000*60*60*24); // 24h
        // once every 7.25 days calls shadypepe
        bot.setInterval(function(){
            bot.commands.get("shadypepe").appear(config.channels);
        },1000*60*60*174); // 174h
    },leftToEight());
    console.log('The Bot is online Nek!');
});

bot.on("message", async (message) => {
    if (message.author.bot){ return; } //message came from human
    if (message.type == 'dm') { return; } //message is in a server

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
                case -2:
                    if (bal[message.author.id]){
                        command.execute(message, args);
                    } else {
                        message.reply("Do `/play` to unlock the rest of the bot.").catch(console.error);
                    }
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
                case -1:
                    command.execute(message, args);
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

async function newday(){
    try {
        // does the calculations to everyone
        bot.commands.get("newday").nextday();
        // posts a message in the market channel
        let embed = new Discord.MessageEmbed().setTitle("New Day!").setDescription(bot.commands.get("news").display());
        await await (bot.channels.cache.get(config.channels.market_test_server)).send(embed);
        await await (bot.channels.cache.get(config.channels.market_wholesome_cafe)).send(embed);
    } catch(err){console.log("Couldn't send new day message");}
}

bot.login(config.token);