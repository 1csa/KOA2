#!/usr/bin/env bash

SERVICE_DIR="thinkjs3.yidian-inc.com"                                    #
START_CMDS="/home/services/thinkjs3.yidian-inc.com/deploy/start.sh"    #进入docker container以后的服务启动脚本
DOCKER_VOLUMN_MAPS="/home/services/thinkjs3.yidian-inc.com/logs"                       #宿主机目录和container内部的目录映射关系

DOCKER_PRESTOP_CMD=""                                                   #停止容器之前，执行的一些清理操作
SERVICE_PORT="9007"                                                              #服务的端口
DONT_CHECK_PORT='false'                                             #如果服务不启动端口，那么这个设置为false
IMAGE_NAME="harbor.int.yidian-inc.com/webui-thinkjs3/webui-thinkjs3-pipeline-${COMMIT_ID}-image"   #如果值为空，则按照job命名进行image匹配
NET="1000Mb"                                                      #默认1000M 网卡
CPU_NUM=1                                                           #cpu个数默认为2
MEM_NUM="3Gi"                                                      #mem限制，默认为2G
K8S_CRONDELETE="true"
K8S_CRONDELETE_DAY=3

GLUSTERFS_PATH=""                                                   #需要暴露的非日志目录路径，默认为空
JACOCO_PORT=16031                                           #functest使用的jacoco端口，非测试环境可忽略
