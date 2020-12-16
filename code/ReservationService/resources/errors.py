class InternalServerError(Exception):
    pass


class SchemaValidationError(Exception):
    pass


class DataAlreadyExistsError(Exception):
    pass


class UpdatingDataError(Exception):
    pass


class DeletingDataError(Exception):
    pass


class DataNotExistsError(Exception):
    pass


class EmailAlreadyExistsError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "DataAlreadyExistsError": {
        "message": "Data with given name already exists",
        "status": 400
    },
    "UpdatingDataError": {
        "message": "Updating data added by other is forbidden",
        "status": 403
    },
    "DeletingDataError": {
        "message": "Deleting data added by other is forbidden",
        "status": 403
    },
    "DataNotExistsError": {
        "message": "Data with given reservation_id doesn't exists",
        "status": 400
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid user credentials",
        "status": 401
    }
}
