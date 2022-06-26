const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../utils/schemas")
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get your daily money"),
    run: async (interaction) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: "YELLOW" })

        if (userData.cooldowns.daily > Date.now()) return interaction.reply({
            embeds: [
                embed.setDescription(`⌛ You have already collected your money, wait for **\`${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
            ],
            ephemeral: true
        })

        userData.wallet += 50
        userData.cooldowns.daily = new Date().setHours(24,0,0,0)
        userData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`💰 You have collected your daily \` 50 🪙 \` amount`) ]
        })
        
    }
}