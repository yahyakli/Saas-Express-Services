const  express = require("express")
const router = express.Router();
const Product = require("../model/Product.js")
const fs = require("fs")
const productStorage = "storage.json";


router.use(express.json())

router.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(productStorage));
    res.json(data);
});


router.post("/", async (req, res) => {
    try{
        const { ref, description, prix, QteStock } = req.body
        let oldData = JSON.parse(fs.readFileSync(productStorage))
        let currId = oldData.length + 1;
        let lastIndex = oldData.length - 1;
        if(oldData.length > 0){
            while(oldData[lastIndex].id >= currId){
                currId += 1;
            }
        }
        const newProduct = new Product({
            id: currId,
            ref, 
            description,
            prix,
            QteStock
        })
        // const product = await Product.create(newProduct);
        res.json(newProduct);
        oldData.push(newProduct);
        fs.writeFileSync(productStorage, JSON.stringify(oldData, null, 4), 'utf-8');
    }catch(err){
        console.log(err)
    }
});



router.put("/:id", (req, res) => {
    const id = req.params.id;

    let data = JSON.parse(fs.readFileSync(productStorage));

    data.forEach((ele, i) => {
        if(ele.id == id){
            ele.ref = req.body.ref,
            ele.description = req.body.description,
            ele.prix = req.body.prix,
            ele.QteStock = req.body.QteStock
        }
    })

    res.send(data)

    fs.writeFileSync(productStorage, JSON.stringify(data, null, 4));
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    let data = JSON.parse(fs.readFileSync(productStorage));

    data.forEach((ele, i) => {
        if(ele.id == id){
            data.splice(i, 1)
        }
    })

    fs.writeFileSync(productStorage, JSON.stringify(data, null, 4));

    res.send(data);
});


module.exports = router