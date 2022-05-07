#!/usr/bin/env bash

PACKAGE_FILE_NAME="*.jar"                                     #commit job生成的包。
HOME_DIR_INSIDE_CONTAINER="/home/services"                                     #container中的根目录，SERVICE_DIR所在的目录
SERVICE_DIR=thinkjs3                                     #container中服务所在的目录
LOG_DIRS="
${HOME_DIR_INSIDE_CONTAINER}/${SERVICE_DIR}/logs
"															#运行时日志所在目录，会在deploy时map到宿主机的目录下去
START_SCRIPT="./start_env/deploy.sh"						#部署完后，启动服务的脚本，相对于start_env的路径。start_env最终会是 HOME_DIR_INSIDE_CONTAINER
PACKAGE_FILE_PATH="start_env/${SERVICE_DIR}/bin/"             #把package file拷贝到这个目录, 相对于start_env的路径。
BASE_IMAGE="docker2.yidian.com:5000/centos/compile-jdk8:20150720"						#服务运行的基础镜像

#下面的选项一般不用
SYNC_DATA_OPERATIONS="
"															#这里的命令是在启动docker前做的
DATA_DIRS="
"															#会产生数据的一些目录，会在deploy时map到宿主机的目录下
DOCKERFILE=""							#使用指定的Dockerfile, 不然用上面的配置项自动生成，一般不用
SET_KEYS="
"										#每行格式id_ras.a->id_rsa.b, 可以多行，将keys目录下的id_rsa.a放到image内的/root/.ssh/id_rsa.b
