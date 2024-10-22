const mongoose = require("mongoose");

const Commande = new mongoose.Schema({
    id:Number,
    date:String,
    client: String,
    montantTTc: Number
});

module.exports = mongoose.model(
    "Commandes", Commande
)