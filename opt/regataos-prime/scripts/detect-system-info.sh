#!/bin/bash

sleep 3

# Collect hardware information
user=$(users | awk '{print $1}')
system_info_dir="/home/$user/.config/regataos-prime/system-info"

if test ! -e "$system_info_dir"; then
    mkdir -p "$system_info_dir/"
fi

# Capture Operational System
echo $(grep -r PRETTY_NAME /etc/os-release | cut -d= -f 2 | sed 's/"//g') >"$system_info_dir/os-name.txt" &

# Capture total amount of RAM
echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/') >"$system_info_dir/ram-total.txt" &

# Capture the CPU model
echo $(lscpu | grep -i "model name" | tail -n 1 | cut -d':' -f 2 | sed 's/^ \+//' | sed 's/(R)//' | sed 's/(TM)//' | sed 's/CPU //' | sed 's/ Graphics//') >"$system_info_dir/cpu-model.txt" &

# Capture NVIDIA driver version
function get_nvidia_driver_version() {
    detect_driver=$(cat "/tmp/regataos-prime/config/system-info/graphics-driver.txt")
    if [[ $detect_driver == *"nvidia"* ]]; then
        echo $(nvidia-smi -i 0 --query-gpu=driver_version --format=csv,noheader) >"$system_info_dir/nvdriver-version.txt"
    fi
}
get_nvidia_driver_version &

# Capture iGPU
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-igpu | head -1 | tail -1) >"$system_info_dir/igpu-model.txt" &

# Capture dgpu
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-dgpu | head -1 | tail -1) >"$system_info_dir/dgpu-model.txt" &

# Capture MESA version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -mesa-version | head -1 | tail -1) >"$system_info_dir/mesa-version.txt" &

# Capture OpenGL version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -opengl-version | head -1 | tail -1) >"$system_info_dir/opengl-version.txt" &

# Capture Vulkan version
/bin/bash /opt/regataos-prime/scripts/hardware-info -vulkan-version
if test -e "/tmp/regataos-prime/vulkan-version.txt"; then
    echo $(cat "/tmp/regataos-prime/vulkan-version.txt" | awk '{print $4}') >"$system_info_dir/vulkan-version.txt" &
fi

# Capture Kernel version
echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -kernel-version | head -1 | tail -1) >"$system_info_dir/kernel-version.txt" &

# Capture graphics driver in use
function get_graphics_driver_in_use() {
    echo $(lshw -class display | grep "driver") >"$system_info_dir/graphics-driver.txt"
    sed -i '/WARNING/d' "$system_info_dir/graphics-driver.txt"
    sed -i 's/ /\n/g' "$system_info_dir/graphics-driver.txt"
    graphicsDriver=$(grep -r "driver=" "$system_info_dir/graphics-driver.txt" | cut -d'=' -f 2-)
    echo "$graphicsDriver" >"$system_info_dir/graphics-driver.txt"
}
get_graphics_driver_in_use &

# Capture the discrete GPU video memory (VRAM) size
function get_dgpu_vram() {
    detect_driver=$(cat "/tmp/regataos-prime/config/system-info/graphics-driver.txt")
    if [[ $detect_driver == *"nvidia"* ]]; then
        vram_total=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader | sed 's/ MiB/MB/')
        echo "$vram_total" >"$system_info_dir/total-vram-size.txt"
    else
        vram_total=$(DRI_PRIME=1 glxinfo | egrep -i 'device|memory' | grep 'Video memory' | head -n 1 | awk '{print $3}')
        echo "$vram_total" >"$system_info_dir/total-vram-size.txt"
    fi
}
get_dgpu_vram &

# Capture OpenGL vendor
openglVendor=$(glxinfo | grep vendor | tail -1 | head -1 | cut -d':' -f 2- | awk '{print $1}')
echo "$openglVendor" >"$system_info_dir/opengl-vendor.txt"

exit 0
