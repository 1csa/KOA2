#!/bin/bash

set -e

dir_name=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

check_port() {
        [[ "$1" == "none" ]] && { return; }
        echo "Checking instance port ..."
        netstat -tlpn | grep "\b$1\b"
}

check_file() {
        echo "Checking file ..."
        ls $dir_name/../logs/warmup.done || ls $dir_name/../logs/start_script.done || ls $dir_name/../log/warmup.done || ls $dir_name/../log/start_script.done
}
check_file
check_port $1
