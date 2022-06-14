const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your or another user's balance")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person whose balance you want to check")
    ),
    run: async (interaction) => {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const balanceEmbed = new MessageEmbed()
        .setTitle(`${user.username}'s balance`)
        .setDescription("Note: wallet and bank details of requested user")
        .setColor("YELLOW")
        .setThumbnail(user.displayAvatarURL())
        .addField("• Wallet", `**\` ${userData.wallet} 🪙 \`**`, true)
        .addField("• Bank", `**\` ${userData.bank} 🪙 \`**`, true)
        
        return interaction.reply({
            embeds: [ balanceEmbed ]
        })
    }
}