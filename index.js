const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config()
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("./config.json")

const { QuickDB } = require("quick.db")
const db = new QuickDB();



const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// If your bot isn't starting, uncomment the line below to start in debug mode.
// client.on('debug', console.log);


client.commands = new Collection();
client.cooldowns = new Set();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {

  const guilds = client.guilds.cache.map(guild => guild.id);
  console.log("[SYSTEM] Updating slash commands");
  guilds.forEach((guildId) => {
    updateSlashCommands(guildId);
  });
  client.user.setPresence({ activities: [{ name: 'in the snow!' }], status: 'online' });

  console.log("[SYSTYEM] Updated slash commands ");
	console.log(`[SYSTEM] Logged in as ${client.user.tag}!`);

});

function updateSlashCommands (guildId) {
  const commands = [];
  for (const file of commandFiles) {
	  const command = require(`./commands/${file}`);
	  commands.push(command.data.toJSON());
  }
  const rest = new REST({ version: "9" }).setToken(config.token);
  (async () => {
	  try {
	  	await rest.put(
	  		Routes.applicationGuildCommands(client.user.id, guildId),
	  		{ body: commands },
	  	);
	  } catch (error) {
	  	console.error(error);
	  }
  })();
}

client.on("guildCreate", (guild) => {
  updateSlashCommands(guild.id);
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, db, client);
	} catch (error) {
		console.error(`[ERROR] ${error}`);
		await interaction.reply({ content: 'There was an error while executing this command! Try again in a little bit, or contact the developer if it persists.', ephemeral: true });
	}
});

if (config.token == "CHANGEME") {
  return console.log("You need to set your token in config.json!")
} else { 
  client.login(config.token);
}