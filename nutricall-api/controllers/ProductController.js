const express = require('express')
const Product = require('../models/Product')
const router = express.Router();

// Read
router.get('/', async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.path = ['/products']
    // #swagger.description = 'Endpoint to get information of all products'
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Read By code
router.get("/:code", async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.path = ['/products/{code}']
    // #swagger.description = 'Endpoint to obtain information for one product only'
    console.log(req.params.code)
    Product.find({"code": req.params.code}).exec((err, product) => {
        if (err) {
            res.status(404).send({error: err})
        } else {
            if (product == null) {
                return res.status(204).json({message: "Cannot find Product"});
            }
            res.send(product)
        }
    })
});

module.exports = router;
