from flask import Flask
from flask_cors import CORS
from flask_restful_swagger_3 import Api
from database.db import initialize_db
from resources.routes import initialize_routes
from resources.swagger_ui import initialize_swagger_ui
from resources.errors import errors

app = Flask(__name__)
api = Api(
    app,
    version='1.0',
    swagger_prefix_url="/api",
    swagger_url="swagger.json",
    title="Reservation service API",
    description="Reservation API for camps reservations",
    terms="http://example.com/terms/",
    contact={
        "name": "API Support",
        "url": "http://www.example.com/support",
        "email": "support@example.com"
    },
    license={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    errors=errors
)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://soa-user:soavaje2020@cluster0.cymie.mongodb.net/ReservationsDb?retryWrites=true&w=majority',
    'connect': False,
}

initialize_db(app)

initialize_routes(api)

initialize_swagger_ui(app)

if __name__ == '__main__':
    app.run()
