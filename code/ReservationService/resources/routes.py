from .home import Home
from .reservation import ReservationsApi, ReservationApi


def initialize_routes(api):
    api.add_resource(ReservationsApi, '/api/reservations')
    api.add_resource(ReservationApi, '/api/reservation/<reservation_id>')
    api.add_resource(Home, '/')
