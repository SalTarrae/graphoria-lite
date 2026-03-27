const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Graphoria Lite API",
            version: "1.0.0",
            description: "API for a lightweight interactive graph editor"
        },
    },
    apis: ["./server.js"]
};

module.exports = swaggerJsdoc(options);