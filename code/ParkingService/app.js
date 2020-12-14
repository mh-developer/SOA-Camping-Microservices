const express = require("express"),
    app = express(),
    cors = require("cors");

const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json");

const spacesRoutes = require("./routes/spaces.js");
const indexRoutes = require("./routes/index.js");

const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/man-o-swag", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/spaces", spacesRoutes);
app.use("/", indexRoutes);

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});
