import logging
from python_logging_rabbitmq import RabbitMQHandler

logger = logging.getLogger('ReservationService')
logger.setLevel(logging.INFO)
formatter = logging.Formatter('''%(asctime)s %(levelname)s %(funcName)s %(module)s Correlation: %(process)d [%(name)s%(pathname)s.%(funcName)s] - %(message)s''')
logger.addHandler(RabbitMQHandler(
    username="student",
    password="student123",
    exchange="SIPIA-4",
    routing_key_format="SIPIA-4-Logging",
    host="172.17.0.94",
    port=5672,
    formatter=formatter,
))
