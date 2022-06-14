module.exports = (interaction, client=interaction.client) => {
    if(interaction.isCommand()) client.commands.get(interaction.commandName)?.run(interaction)
}