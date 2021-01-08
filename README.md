# Camping Microservices

We created simple camping app, where we have options for add and manage camps. So we can create camp activities, search camp places and check accommodation options, reservate holidays termin and checkin when we arrive to camp.

## Application architecture pattern

In our project we used Cloud-native design pattern. So we created microservices which we maintained with `Docker` and `CI/CD` pipeline integration.

So we created five main microservices:

- Camps service (.NET Core)
- Reservations service (Flask)
- Activity service (Ktor)
- Spaces service (Express.js)
- CheckIn service (Express.js)

We support our microservices with:

- Auth0 authentication and authorization with OAuth2 protocol
- Global logging system with Express.js and RabbitMQ
- Web app using ReactJS

## Installation and operation

Make sure you have already installed both Docker Engine and Docker Compose.

```
docker-compose up
```
