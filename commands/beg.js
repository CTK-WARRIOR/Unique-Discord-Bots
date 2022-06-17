const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../utils/schemas")
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("Beg stranger for money"),
    run: async (interaction) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: "YELLOW" })

        if (userData.cooldowns.beg > Date.now())
            return interaction.reply({
                embeds: [
                    embed.setDescription(`⌛ Stop begging so much, wait for **\`${prettyMilliseconds(userData.cooldowns.beg - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
                ],
                ephemeral: true
            })

        const amount = Math.floor((Math.round(10 / (Math.random() * 10 + 1)) * 10) / 2)

        if (amount <= 5) {
            userData.cooldowns.beg = Date.now() + (1000 * 60)
            userData.save()

            return interaction.reply({
                embeds: [embed.setDescription("🥺 You got nothing this time, maybe try hard next time?")],
            })
        }

        userData.wallet += amount
        userData.cooldowns.beg = Date.now() + (1000 * 60)
        userData.save()

        return interaction.reply({
            embeds: [
                embed.setDescription(`Oh my! You begged and earned \` ${amount} 🪙 \``)
            ]
        })
    }
}