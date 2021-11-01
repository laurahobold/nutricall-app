const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    imported_t: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: false
    },
    quantity: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    packaging: {
        type: [String],
        required: true
    },
    brands: {
        type: [String],
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
}, {collection: 'products', timestamps: true})

module.exports = mongoose.model('products', productSchema)
