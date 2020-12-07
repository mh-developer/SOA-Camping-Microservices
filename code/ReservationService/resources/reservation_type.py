from flask import Response, request, jsonify
from flask_restful_swagger_3 import Resource, swagger
from database.models.reservation_type import ReservationType

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, DataAlreadyExistsError, InternalServerError, UpdatingDataError, \
    DeletingDataError, DataNotExistsError


class ReservationTypesApi(Resource):
    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=200, description="List of reservation types")
    def get(self):
        reservations_types = ReservationType.objects().to_json()
        return Response(reservations_types, mimetype="application/json", status=200)

    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=201, description="Create new reservation type")
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
    def get(self, reservations_type_id):
        try:
            reservations_type = ReservationType.objects.get(id=reservations_type_id).to_json()
            return Response(reservations_type, mimetype="application/json", status=200)
        except DoesNotExist:
            raise DataNotExistsError
        except Exception:
            raise InternalServerError

    @swagger.tags(['ReservationTypes'])
    @swagger.response(response_code=204, description="No content")
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
    def delete(self, reservations_type_id):
        try:
            reservations_type = ReservationType.objects.get(id=reservations_type_id).delete()
            return '', 204
        except DoesNotExist:
            raise DeletingDataError
        except Exception:
            raise InternalServerError
