# !/bin/bash
# 检查一个端口是否活着
port=$1
echo "check listening $port..."
count=5
while true; do
  #s=`netstat -ntl | grep ":${port} " -c`
  s=`echo exit | telnet 127.0.0.1 ${port} | grep 'Connected' -c`
  if [ "X$s" != "X" ] && [ "$s" != "0" ]; then
    break
  fi
  echo 'nothing listen on $port, wait for 10s repeat...'
  count=$((count-1))

  if [ $count -le 0 ] ; then
    echo 'job fail!'
    exit 1
  fi
  echo $count
  sleep 10;
done;
