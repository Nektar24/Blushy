const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let kinstuff = require("../data/variables.json");

module.exports = {
	name: 'set-openings',
    description: "set's the default openings image",
    permissions : 1,
	execute(message,args) {
        if (args[1] == null || args[1] == ' ' || args[1] == ''){
            message.channel.send(new Discord.MessageEmbed().setDescription('/'+args[0] + ' <image-link> '));
            return;
        }
        kinstuff.openings_image = args[1];
        message.channel.send('ok');
        fs.writeFile("./data/variables.json", JSON.stringify(kinstuff), (err) => { if (err) console.log(err) });
        //save();
	},
};