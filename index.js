const { Client, Intents, Collection } = require("discord.js");
const { bot_token, mongo_url } = require("./config.json")
const { readdirSync } = require("fs");

const mongoose = require("mongoose")
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

/* Command and Event handler (2 line lmao) */
client.commands = new Collection(readdirSync("./commands").map(cmd => (cmd = require(`./commands/${cmd}`), [cmd.data.name, cmd])))
for (const event of readdirSync("./events")) client.on(event.split(".")[0], require(`./events/${event}`).bind(null))

/* Connect to discord and mongodb */
client.login(bot_token).then(() => mongoose.connect(mongo_url))