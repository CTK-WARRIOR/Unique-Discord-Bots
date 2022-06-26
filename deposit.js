const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit your wallet money to bank")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("Amount to deposit")
        .setRequired(true)
        .setMinValue(100) //should be more than 100 coins
    ),
    run: async (interaction) => {
        const user = interaction.member.user,
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new MessageEmbed({ color: "YELLOW" })

        if (userData.wallet < amount) return interaction.reply({
            embeds: [ embed.setDescription(`💰 You need \` ${amount - userData.wallet} 🪙 \` more in your wallet to deposit money`) ],
            ephemeral: true
        })

        userData.wallet -= amount
        userData.bank += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`✅ You have deposited \` ${amount} 🪙 \` amount into your bank account`) ]
        })
    }
}

