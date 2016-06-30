#!/bin/bash

curl -s POST -H "Content-Type: application/json" -d '{"vehicleId":"IBEX", "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}' http://platform.audacy.space:7902/services/v1/messaging/attitude/audacy.telemetry.attitude >> /dev/null