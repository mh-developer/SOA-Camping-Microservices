const express = require('express'),
	app = express(),
	cors = require('cors');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');

const spacesRoutes = require('./routes/spaces.js');
const indexRoutes = require('./routes/index.js');

const port = 5000;
var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://soa-oauth.eu.auth0.com/.well-known/jwks.json'
	}),
	audience: 'http://studentdocker.informatika.uni-mb.si:32964/',
	issuer: 'https://soa-oauth.eu.auth0.com/',
	algorithms: ['RS256']
});



app.use(cors());
app.use(jwtCheck);
app.use(express.json());
app.use('/man-o-swag', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/authorized', function (req, res) {
	res.send('Secured Resource');
});

app.use("/spaces", spacesRoutes);
app.use("/", indexRoutes);

app.listen(port, () => {
	console.log(`App started on port: ${port}`);
})