const express = require("express")
const mongoose = require("mongoose");

const {MONGO_URI} = require('./config')


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json');

const swaggerOptions = {
    swaggerDefinition:{
        info: {
            title: "CheckIn Service for AbusementPark",
            conctact:{
                name: "Aljaz Stajnko"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["./routes/checkin"]

}



//Routes
const postRoutes = require("./routes/checkin")

const app = express();

//bodyParser midleware
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true}).then(() => console.log("MongoDB connected!")).catch(err => console.log(err))

// User routes
app.use("/checkin", postRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server runs at ${PORT}`))