#!/bin/sh
if [ -z "${CONSUL_ADDR}" ]; then
  echo "Running in local mode "
  nginx -g "daemon off;" 
else
  echo "Running in kubernetes mode "
  nginx -g "daemon off;"  
fi