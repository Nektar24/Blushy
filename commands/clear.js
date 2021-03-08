const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: 'clear',
    description: 'clears the chat.',
    permissions : 2,
	execute(message,args) {
        if (args[1] === null) {
            message.channel.send('Usage : `/clear number-of-messages`');
            return;
        }
        let tempnumber;
        try { tempnumber = parseInt(args[1]); }catch (err) { message.channel.send('Error. Try again.');return; }

        if (!Number.isInteger(tempnumber)) { message.channel.send('Error. Try again.');return; }

        if (tempnumber < 2) { message.channel.send('Error. Try again.');return; }

        message.channel.bulkDelete(args[1]).then(() => {
            message.channel.send("Deleted "+ args[1] +" messages.").then(msg => msg.delete( {timeout: 3000}));
        });
    },
};
