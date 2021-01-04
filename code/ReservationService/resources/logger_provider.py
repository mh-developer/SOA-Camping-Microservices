import logging
from python_logging_rabbitmq import RabbitMQHandler

logger = logging.getLogger('ReservationService')
logger.setLevel(logging.INFO)
logger.addHandler(RabbitMQHandler(
    username="student",
    password="student123",
    exchange="SIPIA-4",
    routing_key_format="SIPIA-4-Logging",
    host="studentdocker.informatika.uni-mb.si",
    port=5672,
))
