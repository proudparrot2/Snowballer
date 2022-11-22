const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get info on how to use the bot')
  ,
	async execute(interaction, db) {
    db.add(`${interaction.user.id}.snowballs`, 50)
    const embed = new MessageEmbed()
      .setTitle(`Snowballer`)
      .setColor("5865F2")
      .setDescription("Snowballer is a clone of the original Snowsgiving snowball bot that allows you to throw virtual snowballs at your friends!\n\n/collect - Scoop up snow and prepare to throw it, with a 3 minute cooldown.\n/throw - Throw a snowball that you've collected at a user!")
    
    interaction.reply({embeds: [embed] })
	},
};