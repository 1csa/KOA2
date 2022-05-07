#!/bin/bash
CONTAINER_NAME_PREFIX=$1
old_containers=$(docker ps | grep $CONTAINER_NAME_PREFIX | awk '{print $1}')

for item in $old_containers
do
  docker rm -f $item
  echo "stop $item"
done

