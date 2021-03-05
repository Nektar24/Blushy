const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

module.exports = {
	name: 'showbaldata',
	description: "debug command which shows what's on the balance data file",
	permissions : 2,
	execute(message,args) {
		fs.readFile('./data/balance.json', (err, data) => {
            if (err) { throw err; }
            const _msgs = JSON.stringify(JSON.parse(data), null, 2);
            message.channel.send('```json\n' + _msgs + '\n```');
            //console.log(_msgs)
          });
	},
};