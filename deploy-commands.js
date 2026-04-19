const { REST, Routes } = require('discord.js')
const { botClientId, botToken } = require('./config.json')
const fs = require('node:fs')

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(botToken)
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`)

		/* For guild commands use the snippet below and add guildId to config.json
    const data = await rest.put(
			Routes.applicationGuildCommands(botClientId, guildId),
			{ body: commands },
		)
    */
		const data = await rest.put(
			Routes.applicationCommands(botClientId),
			{ body: commands },
		)
		console.log(`Successfully reloaded ${data.length} application (/) commands.`)
	} catch (error) {
		console.error(error)
	}
})();