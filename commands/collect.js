const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collect')
		.setDescription('Roll up a shiny new snowball!')
  ,
    
	async execute(interaction, db, client) {
        if (client.cooldowns.has(interaction.user.id)) {
            interaction.reply({ content: "You have to wait 3 minutes in between collecting snowballs!", ephemeral: true})
    } else {

           // the user can type the command ... your command code goes here :)
        
    await db.add(`${interaction.user.id}.snowballs`, 1)
    var snowballs = await db.get(`${interaction.user.id}.snowballs`);
    await db.add(`${interaction.user.id}.allSnowballs`, 1)
    const embed = new MessageEmbed()
      .setTitle(`Here we go!`)
      .setColor("5865F2")
      .setDescription("You plunge your hands into the snow and pack it into a snowball. Use the /throw command to launch it at your friends!\n\nYou now have `" + snowballs + "` snowballs.")
      .setImage("https://github.com/L0SER8228/snowsgiving-bot/blob/main/src/assets/images/throw.png?raw=true")
    
    interaction.reply({embeds: [embed] })

        // Adds the user to the set so that they can't talk for a minute
        client.cooldowns.add(interaction.user.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          client.cooldowns.delete(interaction.user.id);
        }, 180000);
    }
	},
};