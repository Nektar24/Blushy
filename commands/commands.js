const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
	name: 'commands',
	description: 'Shows this menu', // Lists all member commands
	permissions : 0,
	execute(message,args) {
        let output = new Discord.MessageEmbed().setTitle('Blushy Bot commands').setFooter('By Nektar24').setColor('#00FF00');
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if (command.permissions == 0 ) output.addField('/'+command.name,command.description,true);
        }
        message.channel.send(output);
	},
};