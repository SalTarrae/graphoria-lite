const swaggerJsdoc = require("swagger-jsdoc");
const path = require("node:path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Graphoria Lite API",
            version: "1.0.0",
            description: "API for a lightweight interactive graph editor"
        },
    },
    apis: [path.join(__dirname, "server.js")]
};

module.exports = swaggerJsdoc(options);