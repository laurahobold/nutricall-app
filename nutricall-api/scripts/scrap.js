const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/Product')

const url = "https://world.openfoodfacts.org";

const statusENUM = {
    DRAFT: "draft",
    IMPORTED: "imported",
}

/**
 * Create a product in the database
 * @param newProduct is the product that will be created in the database.
 * @returns void
 */
async function createProduct(newProduct) {
    const product = new Product(newProduct);
    await product.save((err, product) => {
        if (err) {
            console.log(err)
        }
    })
}

/**
 * Get all product links
 * @returns {Promise<*[]>}
 */
async function getLinks() {
    try {
        const links = []
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        $("a").each((i, elem) => {
            let a = "" + $(elem).attr("href");
            if (a.toString().startsWith('/product/')) {
                links.push(url + a)
            }
        });
        return links;
    } catch (e) {
        console.log('Failed to get product links: ', e)
    }
}

/**
 * Takes all products and puts them in an array
 * @param links is the product links
 * @param limit is the limit of products
 * @returns {Promise<*[]>}
 */
async function getProducts(links, limit = 100) {
    const products = []
    try {
        for (let i = 0; i < limit; i++) {
            const {data} = await axios.get(links[i]);
            const $ = cheerio.load(data);
            const code = getInformation($, "#barcode");
            const barcode = code + "(EAN / EAN-13)";
            const status = statusENUM.IMPORTED;
            const imported_t = new Date();
            const url = links[i];
            const product_name = getInformation($, "#field_generic_name_value");
            const quantity = getInformation($, "#field_quantity_value");
            const categories = getInformationArray($, "#field_categories_value");
            const packaging = getInformationArray($, "#field_packaging_value");
            const brands = getInformationArray($, "#field_brands_value");
            const image_url = "https://static.openfoodfacts.org" + $('#og_image').attr('src');

            products.push({
                code,
                barcode,
                status,
                imported_t,
                url,
                product_name,
                quantity,
                categories,
                packaging,
                brands,
                image_url
            });
        }
        return products
    } catch (e) {
        console.log('Failed to get product information: ', e)
    }
}

/**
 * Load the page information according to the parameter passed
 * @param $ is the html loaded by cheerio
 * @param attribute is the attribute of html
 * @returns {[String]}
 */
const getInformation = ($, attribute) => {
    return $(attribute).text()
}

/**
 * Load page information into an array according to the parameter passed
 * @param $ is the html loaded by cheerio
 * @param attribute is the attribute of html
 * @returns {[String]}
 */
const getInformationArray = ($, attribute) => {
    return ("" + $(attribute).text()).split(',').map((item) => {
        return item.trim();
    });
}

/**
 * Function that starts the script
 * @returns {Promise<void>}
 */
const run = async () => {
    try {
        const links = await getLinks();
        const products = await getProducts(links, 100);
        products.forEach((p) => {
            createProduct(p);
        })
    } catch (e) {
        console.log('Failed to create products: ', e)
    }
}

module.exports = run;