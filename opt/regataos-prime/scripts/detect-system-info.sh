#!/bin/bash

sleep 3;

# Collect hardware information
if test ! -e "$HOME/.config/regataos-prime/system-info"; then
    mkdir -p "$HOME/.config/regataos-prime/system-info/"
fi

#Capture Operational System
echo $(grep -r PRETTY_NAME /etc/os-release | cut -d= -f 2 | sed 's/"//g') > "$HOME/.config/regataos-prime/system-info/os-name.txt"

#Capture total amount of RAM
echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/') > "$HOME/.config/regataos-prime/system-info/ram-total.txt"

#Capture the CPU model
echo $(lscpu | grep -i model | tail -n 1 | cut -d':' -f 2 | sed 's/^ \+//') > "$HOME/.config/regataos-prime/system-info/cpu-model.txt"

#Capture NVIDIA driver version
echo $(nvidia-smi -i 0 --query-gpu=driver_version --format=csv,noheader) > "$HOME/.config/regataos-prime/system-info/nvdriver-version.txt"

#Capture the discrete GPU video memory (VRAM) size
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -vram-size) > "$HOME/.config/regataos-prime/system-info/vram-size.txt"

#Capture iGPU
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-igpu) > "$HOME/.config/regataos-prime/system-info/igpu-model.txt"

#Capture dgpu
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-dgpu) > "$HOME/.config/regataos-prime/system-info/dgpu-model.txt"

#Capture MESA version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -mesa-version) > "$HOME/.config/regataos-prime/system-info/mesa-version.txt"

exit;
