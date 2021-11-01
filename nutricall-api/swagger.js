const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'API!',
        description: 'API of app',
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

const outputFile = './swagger_autogen.json'
const endpointsFiles = ['./controllers/ProductController.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
