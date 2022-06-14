module.exports = async (client) => {
    console.log("Client is connected to discord as", client.user.tag)

    /* CLI integration for building slash command */
    const commandArgs = process.argv.find(arg => arg.startsWith("local=") || arg === "global")

    if (commandArgs) {
        const commands = [...client.commands].map(x => x[1].data)

        if (commandArgs.startsWith("local=")) {
            await client.guilds.fetch(commandArgs.split("=")[1]).then(async guild => await guild.commands.set(commands))
            return console.log("[!] Commands have been set locally")
        } else {
            await client.application.commands.set(commands)
            return console.log("[!] Commands have been set globally")
        }
    }
}