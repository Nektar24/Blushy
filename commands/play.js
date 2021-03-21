const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let bal = require("../data/balance.json");
const starting = require("../data/variables.json");
const config = require("../config.json");

module.exports = {
	name: 'play',
	description: 'registers you in the database so that you can start investing.',
	permissions : -1,
	execute(message,args) {
        if (!bal[message.author.id]){
            bal[message.author.id] = {
                id: message.author.id,
                name : message.author.tag,
                companies : {},
                money : starting.Starting_Blushies
            }
            fs.writeFile("./data/balance.json", JSON.stringify(bal), (err) => { if (err) console.log(err) });
            message.react("⚽");
            this.send_messages(message);
        } else {
            message.reply("You are already registered.");
        }
	},
    async send_messages(message){
        let emb = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag , message.author.avatarURL({dynamic : true}))
                    .setDescription(`${message.author.tag} your adventure begins!`)
                    .setFooter("Have fun !")
        ;


        
        await bot.channels.cache.get(config.channels.market_wholesome_cafe).send(emb);
    }
};