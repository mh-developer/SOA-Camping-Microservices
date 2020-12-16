from flask import Response, request
from flask_restful_swagger_3 import Resource, swagger, Schema
from database.models.reservation_type import ReservationType

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
        reservations_types = ReservationType.objects().to_json()
        return Response(reservations_types, mimetype="application/json", status=200)

    @swagger.tags(['ReservationTypes'])
    @swagger.expected(schema=ReservationTypeModel, required=True)
    @swagger.reorder_with(schema=ReservationTypeModel, description="Create new reservation type", response_code=201)
    @swagger.response(response_code=400, description="Error creating reservation types")
    @swagger.response(response_code=500, description="Error creating reservation types")
    @requires_auth
    def post(self):
        try:
            body = request.get_json()
            reservations_types = ReservationType(**body).save()
            return Response(reservations_types.to_json(), mimetype="application/json", status=201)
        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except NotUniqueError:
            raise DataAlreadyExistsError
        except Exception as e:
            raise InternalServerError


class ReservationTypeApi(Resource):
    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=200, description="One reservation type")
    @swagger.response(response_code=404, description="Error getting reservation types")
    @swagger.response(response_code=400, description="Error getting reservation types")
    @swagger.response(response_code=500, description="Error getting reservation types")
    def get(self, reservations_type_id):
        try:
            reservations_type = ReservationType.objects.get(id=reservations_type_id).to_json()
            return Response(reservations_type, mimetype="application/json", status=200)
        except DoesNotExist:
            raise DataNotExistsError
        except Exception:
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
            body = request.get_json()
            ReservationType.objects.get(id=reservations_type_id).update(**body)
            return '', 204
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingDataError
        except Exception:
            raise InternalServerError

    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=204, description="No content")
    @swagger.response(response_code=404, description="Error deleting reservation types")
    @swagger.response(response_code=400, description="Error deleting reservation types")
    @swagger.response(response_code=500, description="Error deleting reservation types")
    @requires_auth
    def delete(self, reservations_type_id):
        try:
            reservations_type = ReservationType.objects.get(id=reservations_type_id).delete()
            return '', 204
        except DoesNotExist:
            raise DeletingDataError
        except Exception:
            raise InternalServerError
