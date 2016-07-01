# How to Test
Updated: June 30, 2016

This document describes how to perform backend and frontend testing.

## Summary
Tests may be performed on the backend by generating a specified number of concurrent server calls, or tests may be performed on the frontend by calling each tab on the website.

## Backend Testing
Testing of the backend involves running a sequence of API calls in parallel.

Backend testing is handled by running the shell script **backendLoadTest.sh**.
* This script runs through each type of API call in sequence and outputs the total amount of time taken for the given number of calls.
* This test will automatically run a specified number (default 50) of the following tests:
  - Attitude GET (attitudeGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/attitude/IBEX/5 >> /dev/null
  ```
  - Attitude POST (attitudePostTest.sh)
  ```
  curl -s POST -H "Content-Type: application/json" -d '{"vehicleId":"IBEX", "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}' http://platform.audacy.space:7902/services/v1/attitude >> /dev/null
  ```
  - RabbitMQ Simulation (rabbitMQSimTest.sh)
  ```
  curl -s POST -H "Content-Type: application/json" -d '' http://platform.audacy.space:7902/services/v1/simulation/messaging/attitude/audacy.telemetry.attitude/3 >> /dev/null
  ```
  - RabbitMQ (rabbitMQTest.sh)
  ```
  curl -s POST -H "Content-Type: application/json" -d '{"vehicleId":"IBEX", "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}' http://platform.audacy.space:7902/services/v1/messaging/attitude/audacy.telemetry.attitude >> /dev/null
  ```
  - Metrics GET (metricsTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/admin/metrics/trend/attitude/1 >> /dev/null
  ```
* Optional tests can also be added:
  - Position GET (positionGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/position/SIRIUS-1/100 >> /dev/null
  ```
  - Orbit GET (orbitGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/orbit/IBEX/1 >> /dev/null
  ```
  - Vehicle GET (vehicleGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/vehicle/IBEX/7 >> /dev/null
  ```

## Frontend Testing
Testing of the frontend uses a shell script to automatically test the web page with multiple users.

Frontend Testing is run using **frontendLoadTest.sh**.
* This script runs through a default of 50 users across three tabs on the webpage.
* The tested tabs include:
  - Dashboard
  ```
  curl -s "http://devops.audacy.space:7901/index.html#/dashboard" > /dev/null
  ```
  - Dashboard No Border
  ```
  curl -s "http://devops.audacy.space:7901/index.html#/dashboardnoborder" > /dev/null
  ```
  - About
  ```
  curl -s "http://devops.audacy.space:7901/index.html#/about" > /dev/null
  ```

## Time Output
The *time* command is used in each shell script to output information about the time taken to complete the process.

* REAL time means the actual time it has taken the total process to complete
* USER time is the time the CPU spends outside the kernel in the process
* SYS time is the time the CPU spends inside the kernel in the process

* USER + SYS provides the total time the CPU spend on the process
