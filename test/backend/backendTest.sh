#!/bin/bash

## System Load Test
##
## Written by: Sam Avery
## 6/30/16
##
## This script runs a series of shell scripts to test different aspects
## of the backend.
##

# Specify only the REAL time format, or total time for testing
TIMEFORMAT="%R"

# Specify the Number of Users (N) to test
N=50

printf "Testing ATTITUDE GET... Run Time [s] ($N Users) = "
time {
for (( i=1; i<=$N; i++));
do
  ( ./attitudeGetTest.sh & )
done
}

# printf "Testing POSITION GET... Run Time [s] ($N Users) = "
# time {
# for (( i=1; i<=$N; i++));
# do
#   ( ./positionGetTest.sh & )
# done
# }

# printf "Testing VEHICLE GET... Run Time [s] ($N Users) = "
# time {
# for (( i=1; i<=$N; i++));
# do
#   ( ./vehicleGetTest.sh & )
# done
# }

# printf "Testing ORBIT GET... Run Time [s] ($N Users) = "
# time {
# for (( i=1; i<=$N; i++));
# do
#   ( ./orbitGetTest.sh & )
# done
# }

printf "Testing ATTITUDE POST... Run Time [s] ($N Users) = "
time {
for (( i=1; i<=$N; i++));
do
  ( ./attitudePostTest.sh & )
done
}

printf "Testing RABBITMQ SIMULATION... Run Time [s] ($N Users) = "
time {
for (( i=1; i<=$N; i++));
do
  ( ./rabbitMQSimTest.sh & )
done
}

printf "Testing RABBITMQ... Run Time [s] ($N Users) = "
time {
for (( i=1; i<=$N; i++));
do
  ( ./rabbitMQTest.sh & )
done
}

printf "Testing METRICS GET... Run Time [s] ($N Users) = "
time {
for (( i=1; i<=$N; i++));
do
  ( ./metricsTest.sh & )
done
}
