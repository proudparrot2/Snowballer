const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('See your statistics!')
  ,
	async execute(interaction, db) {
        var currentSnowballs = await db.get(`${interaction.user.id}.snowballs`)
        var snowballsThrown = await db.get(`${interaction.user.id}.snowballsThrown`)
      var totalSnowballs = await db.get(`${interaction.user.id}.allSnowballs`)
        const embed = new MessageEmbed()
          .setTitle(interaction.user.username + "'s statistics")
          .setColor("5865F2")
          .setDescription(`Current snowballs: ${currentSnowballs}\nTotal snowballs collected: ${totalSnowballs} \nTotal snowballs thrown: ${snowballsThrown || "n/a"} \n\nTotal hits: n/a \nTotal misses: n/a \nHits received: n/a`)
          .setFooter("This command is under construction, so it may not work as intended.")

        interaction.reply({embeds: [embed] })
	},
}