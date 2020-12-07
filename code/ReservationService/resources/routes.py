from .home import Home
from .reservation import *
from .reservation_type import *


def initialize_routes(api):
    api.add_resource(ReservationsApi, '/api/reservations')
    api.add_resource(ReservationApi, '/api/reservation/<reservation_id>')
    api.add_resource(ReservationByCampApi, '/api/camps/<camp_id>/reservations')
    api.add_resource(ReservationTypesApi, '/api/reservationsTypes')
    api.add_resource(ReservationTypeApi, '/api/reservationsTypes/<reservations_type_id>')
    api.add_resource(Home, '/')
