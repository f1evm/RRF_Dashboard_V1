#!/bin/sh


case "$1" in
    start)
        nohup node server.js > /tmp/dashboardRRF.log 2>&1 & echo $! > /tmp/dashboardRRF.pid
        ;;
    stop) 
        kill `cat /tmp/dashboardRRF.pid`
        ;;
    esac

