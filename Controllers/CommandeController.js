const  express = require("express")
const router = express.Router();
const Product = require("../model/Product.js")
const fs = require("fs")
const productStorage = "storage.json";

router.use(express.json())

