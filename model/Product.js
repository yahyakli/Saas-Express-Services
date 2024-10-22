const mongoose = require("mongoose");

const product = new mongoose.Schema({
    id:Number,
    ref:String,
    description: String,
    prix: Number,
    QteStock:Number
});

module.exports = mongoose.model(
    "Products", product
)