#!/bin/bash

## Backend Load Test
##
## Written by: Sam Avery
## UPDATE: 7/1/16
##
## This script runs a series of shell scripts to test different aspects
## of the backend.
##

# Specify only the REAL time format, or total time for testing
# TIMEFORMAT="%R"

# REAL time means the actual time it has taken the total process to complete
# USER time is the time the CPU spends outside the kernel in the process
# SYS time is the time the CPU spends inside the kernel in the process
#
# USER + SYS provides the total time the CPU spend on the process

# Specify the Number of Users (N) to test
N=50

printf "\nTesting ATTITUDE GET... Run Time [s] ($N Users)"
time {
for (( i=1; i<=$N; i++));
do
  ( ./attitudeGetTest.sh & )
done
}

# printf "\nTesting POSITION GET... Run Time [s] ($N Users)"
# time {
# for (( i=1; i<=$N; i++));
# do
#   ( ./positionGetTest.sh & )
# done
# }

# printf "\nTesting VEHICLE GET... Run Time [s] ($N Users)"
# time {
# for (( i=1; i<=$N; i++));
# do
#   ( ./vehicleGetTest.sh & )
# done
# }

# printf "\nTesting ORBIT GET... Run Time [s] ($N Users)"
# time {
# for (( i=1; i<=$N; i++));
# do
#   ( ./orbitGetTest.sh & )
# done
# }

printf "\nTesting ATTITUDE POST... Run Time [s] ($N Users)"
time {
for (( i=1; i<=$N; i++));
do
  ( ./attitudePostTest.sh & )
done
}

printf "\nTesting RABBITMQ SIMULATION... Run Time [s] ($N Users)"
time {
for (( i=1; i<=$N; i++));
do
  ( ./rabbitMQSimTest.sh & )
done
}

printf "\nTesting RABBITMQ... Run Time [s] ($N Users)"
time {
for (( i=1; i<=$N; i++));
do
  ( ./rabbitMQTest.sh & )
done
}

printf "\nTesting METRICS GET... Run Time [s] ($N Users)"
time {
for (( i=1; i<=$N; i++));
do
  ( ./metricsTest.sh & )
done
}
