#!/usr/bin/env bash

QA_PRE_START_CMD=""                                     #用于测试环境在START_CMDS执行之前执行，一般用来去掉服务启动时候的内存要求。

START_CMDS="cd /home/services/ ; sh deploy.sh ${TARGET_ENV}"    #进入docker container以后的服务启动命令
DOCKER_PORT_MAPS="9007:9007"                                                                                                        #宿>主机端口:container内部端口的映射关系
DOCKER_VOLUMN_MAPS="~/_logs/${COMPONENT}-${TARGET_ENV}:/home/services/thinkjs3/logs"			#宿主机目录和container内部的目录映射关系
DOCKER_RUN_OPTIONS="--net=host"							#docker启动时候额外的特殊的启动参数

DOCKER_PRESTOP_CMD=""						    #停止容器之前，执行的一些清理操作
SERVICE_PORT="9007"								#服务的端口
DONT_CHECK_PORT='false'                                             #如果服务不启动端口，那么这个设置为false

#只用于线上部署，服务降级命令（纯字符串，使用单括号），如果部署时downgrade_flag设置成true, 则在部署完成后，enable haproxy之前，在部署的container内部执行这个命令
#如果需要访问自己的某端口，使用, 代替。
DOWNGRADE_CMD=''
DEPLOY_BATCH_INTERVAL=""                                            #只用于线上部署，每批(parallel)机器部署完以后的时间间隔
