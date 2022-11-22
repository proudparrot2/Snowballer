const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const hitImage = "https://raw.githubusercontent.com/L0SER8228/snowsgiving-bot/main/src/assets/images/hit.png";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('throw')
		.setDescription('Launch a snowball at another user')
    .addUserOption(option => option.setName('target').setDescription('Choose someone to nail with your snowball').setRequired(true))
  ,
	async execute(interaction, db, client) {
    const user = interaction.options.getUser('target');
   if (!user.bot) {
      var currentSnowballs = await db.get(`${interaction.user.id}.snowballs`)

      if (currentSnowballs <= 0) {
        return interaction.reply({ content: "You don't have any snowballs to throw! Use the /collect command to get more.", ephemeral: true })
      } else {
         await db.set(`${interaction.user.id}.snowballs`, currentSnowballs - 1)
        await db.set(`${user.id}.snowballs`, 0)
        const snowballs = await db.get(`${interaction.user.id}.snowballs`)
        await db.add(`${interaction.user.id}.snowballsThrown`, 1)

        const embed = new MessageEmbed()
          .setTitle(`Ready... aim...`)
          .setColor("5865F2")
          .setDescription("You launch a snowball at **" + user.username + "** and hit them!\n\nYou now have `" + snowballs + "` snowballs!")
          .setImage(hitImage)

        return interaction.reply({ embeds: [embed] })
      }
    } else {
      return interaction.reply({ content: "You can't throw a snowball at a robot!", ephemeral: true })
    }

        // Adds 
	},
};