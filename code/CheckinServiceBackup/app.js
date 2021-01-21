const express = require("express"),
	app = express(),
	cors = require("cors");

const swaggerUi = require("swagger-ui-express"),
	swaggerDocument = require("./swagger.json");

const spacesRoutes = require("./routes/checkin.js");
const indexRoutes = require("./routes/index.js");
const checkJwt = require("./middleware/auth");
const port = 5000;



app.use(cors());
app.use(express.json());

app.use("/man-o-swag", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/checkin", checkJwt, spacesRoutes);
app.use("/", indexRoutes);

app.listen(port, () => {
	console.log(`App started on port: ${port}`);
});
