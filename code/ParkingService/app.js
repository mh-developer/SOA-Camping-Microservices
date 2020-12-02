const app = require('express')();


const spacesRoutes = require('./routes/spaces.js');
const indexRoutes = require('./routes/index.js');



app.use("/", indexRoutes);
app.use("/spaces", spacesRoutes);


const port = 5000;

app.listen(port, "localhost", ()=>{
	console.log(`App started on port: ${port}`);
})