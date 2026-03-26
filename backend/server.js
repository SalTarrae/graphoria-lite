const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const nodesRouter = require("./routes/nodes");
app.use("/nodes", nodesRouter);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});