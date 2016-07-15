# Technology Choices for Quindar
Updated: Jul 15, 2016 by Ray Lai

This article explains the technology choice for Quindar:

# User Interface - AngularJS
We chose AngularJS as User Interface framework because
* Separation of business logic from User Interface (UI) elements (aka Model View Controller pattern)
* Write once for each device from desktop Web browsers to different mobile device (aka responsive design)
* Whenever backend changes, the UI will be refreshed automatically (aka 2-way data binding)
* Priority is for 2-way binding and ease of hiring talents, not for performance optimization (e.g. ReactJS)

# Programming language - JavaScript
We chose MEAN stack (MongoDB-Express-AngularJS-NodeJS) because
* Integrated stack by using 1 common JavaScript language
* Easy to hire talents with this stack
* Plenty of plugins available (e.g. passport plugin for security)
* JavaScript is non-blocking and async (e.g. we can do 1 process per 1 docker container for massive horizontal scaling). If combined with DevOps continuous integration process and Amazon Lambda (self-healing), this will be suitable for resilient and highly available systems.

# Database - MongoDB 
We chose MongoDB because
* read optimized, and highly available using replica set and eventual consistency
* easy to hire talents and relatively short learning curve
* schema-less, no need to rebuild database views or structure for system change (compared to Cassandra, Cassandra requires db re-organization if queries change).

# Messaging - RabbitMQ and Apache Kafka
We chose RabbitMQ and Apache Kafka as the messaging infrastructure because
* both are cross-platform and support multiple programming language. Message queue technologies support workflow (e.g. if we need to translate into different protocols such as CCSDS and AX.25)
* RabbitMQ is for Phase 2 (current phase). Kafka will be for Phase 3 where we have large scale data streaming and data analytics.
* RabbitMQ is highly resilient due to the underlying Erlang technology
* Kafka is the optimal choice for messaging for real time data streaming and analytics because you can do in memory processing and real time data pushing.

# Architecture 
* API-centric (REST API and JSON) allows a standard programming interface. we can upgrade backend implementation without rewriting the front-end.  API is essential for cross-system integration without creating dependencies.
* continuous integration - use of Jenkins for auto-deployment; use of Docker for virtualization and resource optimization
* Single stack using MEAN
- real time data streaming, e.g. socket-io, webRTC (push technology with lower overhead and zero footprint)
- continuous delivery principle - all modules and services should have unit testing and end-to-end testing 
- micro-service architecture, e.g. event-based messaging principle (use of data streaming for pushing, self-healing for service failure); horizontal scaling using REST API and docker, etc.

Benefits - horizontal and vertical scaling in seconds; self-healing to achieve high availability; time to market using continuous delivery 
