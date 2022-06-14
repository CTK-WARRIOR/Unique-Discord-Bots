const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    wallet: { type: Number, default: 0 },
    bank: { type: Number, default: 0 }
})

module.exports = { User: mongoose.model("User", User) }