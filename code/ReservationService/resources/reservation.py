from flask import Response, request
from flask_restful_swagger_3 import Resource, swagger, Schema
from database.models.reservation import Reservation
from .logger_provider import logger
import requests
import os
import json

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, DataAlreadyExistsError, InternalServerError, UpdatingDataError, \
    DeletingDataError, DataNotExistsError
from resources.jwt_decorator import requires_auth, get_token_auth_header


class ReservationModel(Schema):
    type = 'object'
    properties = {
        'title': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'from_date': {
            'type': 'string'
        },
        'to_date': {
            'type': 'string'
        },
        'type_of_camping': {
            'type': 'string'
        },
        'status': {
            'type': 'string'
        },
        'camp': {
            'type': 'object'
        },
        'created_at': {
            'type': 'string'
        },
        'updated_at': {
            'type': 'string'
        },
    }


class ReservationsApi(Resource):
    @swagger.tags(['Reservations'])
    @swagger.response(response_code=200, description="List of reservations")
    @swagger.response(response_code=400, description="Error getting reservations")
    @swagger.response(response_code=500, description="Error getting reservations")
    @requires_auth
    def get(self):
        try:
            logger.info("Start getting reservations.")
            reservations = Reservation.objects().to_json()
            return Response(reservations, mimetype="application/json", status=200)
        except Exception as e:
            logger.error(f"Error getting reservations. {e}")
            raise InternalServerError

    @swagger.tags(['Reservations'])
    @swagger.expected(schema=ReservationModel, required=True)
    @swagger.reorder_with(schema=ReservationModel, description="Create new reservation", response_code=201)
    @swagger.response(response_code=400, description="Error creating reservation")
    @swagger.response(response_code=500, description="Error creating reservation")
    @requires_auth
    def post(self):
        try:
            logger.info("Start creating reservation.")
            body = request.get_json()
            reservation = Reservation(**body).save()
            userinfo = requests.post(url=f"https://{os.environ['AUTH0_DOMAIN']}/userinfo",
                                     headers={"Authorization": f"Bearer {get_token_auth_header()}"},
                                     verify=False)
            mail_body = {
                "SendingTo": userinfo.json().get("email"),
                "Data": {
                    "Title": reservation.title,
                    "Description": reservation.description,
                    "DateFrom": reservation.from_date,
                    "DateTo": reservation.to_date,
                    "TypeOfCamping": reservation.type_of_camping,
                    "Camp": reservation.camp
                }
            }
            send_mail = requests.post(url=f"{os.environ['MAIL_API_URL']}/reservation-mail",
                                      data=json.dumps(mail_body),
                                      verify=False)
            logger.info("Send reservation email response.", send_mail.json())
            return Response(reservation.to_json(), mimetype="application/json", status=201)
        except (FieldDoesNotExist, ValidationError):
            logger.error(f"Error creating reservation.")
            raise SchemaValidationError
        except NotUniqueError:
            logger.error(f"Error creating reservation.")
            raise DataAlreadyExistsError
        except Exception as e:
            logger.error(f"Error creating reservation. {e}")
            raise InternalServerError


class ReservationApi(Resource):
    @swagger.tags(['Reservations'])
    @swagger.response(response_code=200, description="One reservation")
    @swagger.response(response_code=404, description="Error getting reservation")
    @swagger.response(response_code=400, description="Error getting reservation")
    @swagger.response(response_code=500, description="Error getting reservation")
    @requires_auth
    def get(self, reservation_id):
        try:
            logger.info(f"Start getting reservation with ID {reservation_id}.")
            reservation = Reservation.objects.get(id=reservation_id).to_json()
            return Response(reservation, mimetype="application/json", status=200)
        except DoesNotExist:
            logger.error(f"Error getting reservation with ID {reservation_id}.")
            raise DataNotExistsError
        except Exception as e:
            logger.error(f"Error getting reservation with ID {reservation_id}. {e}")
            raise InternalServerError

    @swagger.tags(['Reservations'])
    @swagger.expected(schema=ReservationModel, required=True)
    @swagger.response(response_code=204, description="No content")
    @swagger.response(response_code=404, description="Error updating reservation")
    @swagger.response(response_code=400, description="Error updating reservation")
    @swagger.response(response_code=500, description="Error updating reservation")
    @requires_auth
    def put(self, reservation_id):
        try:
            logger.info(f"Start updating reservation with ID {reservation_id}.")
            body = request.get_json()
            Reservation.objects.get(id=reservation_id).update(**body)
            return '', 204
        except InvalidQueryError:
            logger.error(f"Error updating reservation with ID {reservation_id}.")
            raise SchemaValidationError
        except DoesNotExist:
            logger.error(f"Error updating reservation with ID {reservation_id}.")
            raise UpdatingDataError
        except Exception as e:
            logger.error(f"Error updating reservation with ID {reservation_id}. {e}")
            raise InternalServerError

    @swagger.tags(['Reservations'])
    @swagger.response(response_code=204, description="No content")
    @swagger.response(response_code=404, description="Error deleting reservation")
    @swagger.response(response_code=400, description="Error deleting reservation")
    @swagger.response(response_code=500, description="Error deleting reservation")
    @requires_auth
    def delete(self, reservation_id):
        try:
            logger.info(f"Start deleting reservation with ID {reservation_id}.")
            reservation = Reservation.objects.get(id=reservation_id).delete()
            return '', 204
        except DoesNotExist:
            logger.error(f"Error deleting reservation with ID {reservation_id}.")
            raise DeletingDataError
        except Exception as e:
            logger.error(f"Error deleting reservation with ID {reservation_id}. {e}")
            raise InternalServerError


class ReservationByCampApi(Resource):
    @swagger.tags(['Reservations'])
    @swagger.response(response_code=200, description="List of camp reservations")
    @swagger.response(response_code=404, description="Error getting reservation")
    @swagger.response(response_code=400, description="Error getting reservation")
    @swagger.response(response_code=500, description="Error getting reservation")
    @requires_auth
    def get(self, camp_id):
        try:
            logger.info(f"Start getting reservations for camp with ID {camp_id}.")
            camp = requests.get(url=f"{os.environ['CAMP_API_URL']}/api/Camps/{camp_id}", verify=False)
            if camp.status_code != 200:
                raise DoesNotExist

            reservations = Reservation.objects(__raw__={"camp": {"$elemMatch": {"Id": str(camp_id)}}}).to_json()
            return Response(reservations, mimetype="application/json", status=200)
        except DoesNotExist:
            logger.error(f"Error getting reservations for camp with ID {camp_id}.")
            raise DataNotExistsError
        except Exception as e:
            logger.error(f"Error getting reservations for camp with ID {camp_id}. {e}")
            raise InternalServerError
