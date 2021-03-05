const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
	name: 'admin-commands',
	description: 'Lists all bot admin commands',
	permissions : 0,
	execute(message,args) {
        let output = new Discord.MessageEmbed().setTitle('Admin Commands').setFooter('By Nektar24').setColor('#FF0000');
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if (command.permissions == 1 ) output.addField('/'+command.name,command.description,true);
        }
        message.channel.send(output);
	},
};