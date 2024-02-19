#!/bin/bash

sleep 3

# Collect hardware information
user=$(users | awk '{print $1}')

if test ! -e "/home/$user/.config/regataos-prime/system-info"; then
    mkdir -p "/home/$user/.config/regataos-prime/system-info/"
fi

# Capture Operational System
echo $(grep -r PRETTY_NAME /etc/os-release | cut -d= -f 2 | sed 's/"//g') >"/home/$user/.config/regataos-prime/system-info/os-name.txt"

# Capture total amount of RAM
echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/') >"/home/$user/.config/regataos-prime/system-info/ram-total.txt"

# Capture the CPU model
echo $(lscpu | grep -i "model name" | tail -n 1 | cut -d':' -f 2 | sed 's/^ \+//' | sed 's/(R)//' | sed 's/(TM)//' | sed 's/CPU //' | sed 's/ Graphics//') >"/home/$user/.config/regataos-prime/system-info/cpu-model.txt"

# Capture NVIDIA driver version
detect_driver=$(cat "/tmp/regataos-prime/config/system-info/graphics-driver.txt")
if [[ $detect_driver == *"nvidia"* ]]; then
    echo $(nvidia-smi -i 0 --query-gpu=driver_version --format=csv,noheader) >"/home/$user/.config/regataos-prime/system-info/nvdriver-version.txt"
fi

# Capture iGPU
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-igpu | head -1 | tail -1) >"/home/$user/.config/regataos-prime/system-info/igpu-model.txt"

# Capture dgpu
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-dgpu | head -1 | tail -1) >"/home/$user/.config/regataos-prime/system-info/dgpu-model.txt"

# Capture MESA version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -mesa-version | head -1 | tail -1) >"/home/$user/.config/regataos-prime/system-info/mesa-version.txt"

# Capture OpenGL version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -opengl-version | head -1 | tail -1) >"/home/$user/.config/regataos-prime/system-info/opengl-version.txt"

# Capture Vulkan version
/bin/bash /opt/regataos-prime/scripts/hardware-info -vulkan-version
if test -e "/tmp/regataos-prime/vulkan-version.txt"; then
    echo $(cat "/tmp/regataos-prime/vulkan-version.txt" | awk '{print $4}') >"/home/$user/.config/regataos-prime/system-info/vulkan-version.txt"
fi

# Capture Kernel version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -kernel-version | head -1 | tail -1) >"/home/$user/.config/regataos-prime/system-info/kernel-version.txt"

# Capture graphics driver in use
echo $(lshw -class display | grep "driver") >"/home/$user/.config/regataos-prime/system-info/graphics-driver.txt"
sed -i '/WARNING/d' "/home/$user/.config/regataos-prime/system-info/graphics-driver.txt"
sed -i 's/ /\n/g' "/home/$user/.config/regataos-prime/system-info/graphics-driver.txt"
graphicsDriver=$(grep -r "driver=" "/home/$user/.config/regataos-prime/system-info/graphics-driver.txt" | cut -d'=' -f 2-)
echo "$graphicsDriver" >"/home/$user/.config/regataos-prime/system-info/graphics-driver.txt"

# Capture the discrete GPU video memory (VRAM) size
detect_driver=$(cat "/tmp/regataos-prime/config/system-info/graphics-driver.txt")
if [[ $detect_driver == *"nvidia"* ]]; then
    vram_total=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader | sed 's/ MiB/MB/')
    echo "$vram_total" >"/home/$user/.config/regataos-prime/system-info/total-vram-size.txt"
else
    vram_total=$(DRI_PRIME=1 glxinfo | egrep -i 'device|memory' | grep 'Video memory' | head -n 1 | awk '{print $3}')
    echo "$vram_total" >"/home/$user/.config/regataos-prime/system-info/total-vram-size.txt"
fi

# Capture OpenGL vendor
openglVendor=$(glxinfo | grep vendor | tail -1 | head -1 | cut -d':' -f 2- | awk '{print $1}')
echo "$openglVendor" >"/home/$user/.config/regataos-prime/system-info/opengl-vendor.txt"

exit 0
