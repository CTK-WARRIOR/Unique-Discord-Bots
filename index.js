const { Client, Intents, MessageAttachment } = require('discord.js');
const Welcomer = require('./structures/welcomer');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.on("ready", () => {
    console.log("Welcome bot is ready and connected to discord!");
})

client.on("guildMemberAdd", async member => {
    const image = new Welcomer()
    .setBackground("https://i.pinimg.com/originals/07/28/dc/0728dc400eca09632215055ff003d8bf.gif")
    .setGIF(true)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))
    .setName(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setBlur(2)

    const channel = await member.guild.channels.fetch()
    .then(channels => channels.find(x => x.name === "welcome"))

    return channel?.send({
        files: [ new MessageAttachment(await image.generate(), "welcome.gif") ]
    })
})

client.login("YOUR TOKEN")

