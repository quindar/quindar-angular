# How to Test
Updated: June 30, 2016

This document depicts how to perform backend and frontend testing.

## Summary
Tests may be performed on the backend by generating a specified number of concurrent API calls, or tests may be performed on the frontend by using PhantomJS to simulate multiple users accessing the webpage.

## Backend Testing
Testing of the backend involves running a sequence of API calls in parallel.

* For example, an attitude GET call involves the following command:
```
curl -s GET http://platform.audacy.space:7902/services/v1/attitude/IBEX/5 >> /dev/null
```

Backend testing is handled by running the shell script "backendLoadTest.sh".
* This script runs through each type of API call in sequence and outputs the total amount of time taken for the given number of calls.
* This test will automatically run the following tests:
  - Attitude GET (attitudeGetTest.sh)
  - Attitude POST (attitudePostTest.sh)
  - RabbitMQ Simulation (rabbitMQSimTest.sh)
  - RabbitMQ (rabbitMQTest.sh)
  - Metrics GET (metricsTest.sh)
* Optional tests can also be added:
  - Position GET (positionGetTest.sh)
  - Orbit GET (orbitGetTest.sh)
  - Vehicle GET (vehicleGetTest.sh)

## Frontend Testing
Testing of the frontend uses PhantomJS to automatically test the web page with multiple users.

Frontend Testing is run using TODO.

