const express = require("express");
const config = require("./config");
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_autogen.json');
const cron = require('./scripts/cron');

const PORT = process.env.PORT || 3001;

// Config
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(`/${config.api_doc_name}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection
require('./database/connection')();

// Endpoints
app.use("/products", require("./controllers/ProductController"));
app.get('/', async (req, res) => {
    res.status(200).json("Fullstack Challenge 2021");
})

// CRON function
cron(config.scrappingHour, 'America/Sao_Paulo');

app.listen(PORT, () => console.log("Connected and listening at " + PORT));

