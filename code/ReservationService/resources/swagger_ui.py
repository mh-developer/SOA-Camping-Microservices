from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL = '/swagger'  # URL for exposing Swagger UI
API_URL = '/api/swagger.json'  # Swagger OpenAPI json specifications

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL
)


def initialize_swagger_ui(app):
    app.register_blueprint(swagger_ui_blueprint)
