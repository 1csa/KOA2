#!/bin/bash
title=$1
content=$2

#测试机器人
#curl -H 'Content-Type: application/json;charset=utf-8' -XPOST https://oapi.dingtalk.com/robot/send?access_token=7d0877aee8c8d5e1e3f622874a01a655ef5cb284fc134e1d5c7352b5c0dbdf0d -d "{'msgtype': 'markdown', 'markdown': {'title':'$title', 'text':'$content'}}"

curl -H 'Content-Type: application/json;charset=utf-8' -XPOST https://oapi.dingtalk.com/robot/send?access_token=1625b01bebd353a1f80a31856185753da89281ea139e1fe63611eac8d59bcd55 -d "{'msgtype': 'markdown', 'markdown': {'title':'$title', 'text':'$content'}}"