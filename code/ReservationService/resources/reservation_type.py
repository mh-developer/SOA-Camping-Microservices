from flask import Response, request
from flask_restful_swagger_3 import Resource, swagger, Schema
from database.models.reservation_type import ReservationType
from .logger_provider import logger

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, DataAlreadyExistsError, InternalServerError, UpdatingDataError, \
    DeletingDataError, DataNotExistsError
from resources.jwt_decorator import requires_auth


class ReservationTypeModel(Schema):
    type = 'object'
    properties = {
        'title': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'created_at': {
            'type': 'string'
        },
        'updated_at': {
            'type': 'string'
        },
    }


class ReservationTypesApi(Resource):
    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=200, description="List of reservation types")
    @swagger.response(response_code=400, description="Error getting reservation types")
    @swagger.response(response_code=500, description="Error getting reservation types")
    def get(self):
        try:
            logger.info("Start getting reservation types.")
            reservations_types = ReservationType.objects().to_json()
            return Response(reservations_types, mimetype="application/json", status=200)
        except Exception as e:
            logger.error(f"Error getting reservation types. {e}")
            raise InternalServerError

    @swagger.tags(['ReservationTypes'])
    @swagger.expected(schema=ReservationTypeModel, required=True)
    @swagger.reorder_with(schema=ReservationTypeModel, description="Create new reservation type", response_code=201)
    @swagger.response(response_code=400, description="Error creating reservation types")
    @swagger.response(response_code=500, description="Error creating reservation types")
    @requires_auth
    def post(self):
        try:
            logger.info("Start creating reservation types.")
            body = request.get_json()
            reservations_types = ReservationType(**body).save()
            return Response(reservations_types.to_json(), mimetype="application/json", status=201)
        except (FieldDoesNotExist, ValidationError):
            logger.error(f"Error creating reservation types.")
            raise SchemaValidationError
        except NotUniqueError:
            logger.error(f"Error creating reservation types.")
            raise DataAlreadyExistsError
        except Exception as e:
            logger.error(f"Error creating reservation types. {e}")
            raise InternalServerError


class ReservationTypeApi(Resource):
    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=200, description="One reservation type")
    @swagger.response(response_code=404, description="Error getting reservation types")
    @swagger.response(response_code=400, description="Error getting reservation types")
    @swagger.response(response_code=500, description="Error getting reservation types")
    def get(self, reservations_type_id):
        try:
            logger.info(f"Start getting reservation type with ID {reservations_type_id}.")
            reservations_type = ReservationType.objects.get(id=reservations_type_id).to_json()
            return Response(reservations_type, mimetype="application/json", status=200)
        except DoesNotExist:
            logger.error(f"Error getting reservation type with ID {reservations_type_id}.")
            raise DataNotExistsError
        except Exception as e:
            logger.error(f"Error getting reservation type with ID {reservations_type_id}. {e}")
            raise InternalServerError

    @swagger.tags(['ReservationTypes'])
    @swagger.expected(schema=ReservationTypeModel, required=True)
    @swagger.response(response_code=204, description="No content")
    @swagger.response(response_code=404, description="Error updating reservation types")
    @swagger.response(response_code=400, description="Error updating reservation types")
    @swagger.response(response_code=500, description="Error updating reservation types")
    @requires_auth
    def put(self, reservations_type_id):
        try:
            logger.info(f"Start updating reservation types with ID {reservations_type_id}.")
            body = request.get_json()
            ReservationType.objects.get(id=reservations_type_id).update(**body)
            return '', 204
        except InvalidQueryError:
            logger.error(f"Error updating reservation types with ID {reservations_type_id}.")
            raise SchemaValidationError
        except DoesNotExist:
            logger.error(f"Error updating reservation types with ID {reservations_type_id}.")
            raise UpdatingDataError
        except Exception as e:
            logger.error(f"Error updating reservation types with ID {reservations_type_id}. {e}")
            raise InternalServerError

    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=204, description="No content")
    @swagger.response(response_code=404, description="Error deleting reservation types")
    @swagger.response(response_code=400, description="Error deleting reservation types")
    @swagger.response(response_code=500, description="Error deleting reservation types")
    @requires_auth
    def delete(self, reservations_type_id):
        try:
            logger.info(f"Start deleting reservation types with ID {reservations_type_id}.")
            reservations_type = ReservationType.objects.get(id=reservations_type_id).delete()
            return '', 204
        except DoesNotExist:
            logger.error(f"Error deleting reservation types with ID {reservations_type_id}.")
            raise DeletingDataError
        except Exception as e:
            logger.error(f"Error deleting reservation types with ID {reservations_type_id}. {e}")
            raise InternalServerError
