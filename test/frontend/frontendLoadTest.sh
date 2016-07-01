#!/bin/bash

## Frontend Load Test
##
## Written by: Sam Avery
## UPDATE: 7/1/16
##
## This script calls Audacy's devops URLs to test the frontend performance.
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

printf "\nTesting Front End... Run Time [s] ($N Users x 3 tabs)"
time {
for (( i=1; i<=$N; i++));
do
  (curl -s "http://devops.audacy.space:7901/index.html#/dashboard" > /dev/null) &
  (curl -s "http://devops.audacy.space:7901/index.html#/dashboardnoborder" > /dev/null) &
  (curl -s "http://devops.audacy.space:7901/index.html#/about" > /dev/null) &
done
}