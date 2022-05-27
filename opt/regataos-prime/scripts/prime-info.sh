#!/bin/bash

os_name=$(grep -r PRETTY_NAME /etc/os-release | cut -d= -f 2 | sed 's/"//g')
cpu_model=$(lscpu | grep -i model | tail -n 1 | cut -d':' -f 2 | sed 's/^ \+//')
ram_total=$(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')

if test -e "/tmp/regataos-prime/use-hybrid-graphics.txt"; then
    igpu=$(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-igpu)
fi

dgpu=$(/bin/bash /opt/regataos-prime/scripts/hardware-info -capture-dgpu)
vram_size=$(cat /tmp/regataos-prime/config/system-info/total-vram-size.txt)

if test -e /usr/bin/nvidia-xconfig; then
    nv_version=$(echo $(nvidia-smi -i 0 --query-gpu=driver_version --format=csv,noheader))
fi

mesa_version=$(/bin/bash /opt/regataos-prime/scripts/hardware-info -mesa-version)
opengl_version=$(/bin/bash /opt/regataos-prime/scripts/hardware-info -opengl-version)
kernel_version=$(/bin/bash /opt/regataos-prime/scripts/hardware-info -kernel-version)

/bin/bash /opt/regataos-prime/scripts/hardware-info -vulkan-version
if test -e "/tmp/regataos-prime/vulkan-version.txt"; then
    vulkan_version=$(cat "/tmp/regataos-prime/vulkan-version.txt" | awk '{print $4}')
fi

echo "Check out some information about your system:" >/tmp/regataos-prime/prime-info.txt
echo "" >>/tmp/regataos-prime/prime-info.txt

echo "- Operational system: $os_name" >>/tmp/regataos-prime/prime-info.txt
echo "- CPU model: $cpu_model" >>/tmp/regataos-prime/prime-info.txt
echo "- System memory: $ram_total" >>/tmp/regataos-prime/prime-info.txt

if test -e "/tmp/regataos-prime/use-hybrid-graphics.txt"; then
    echo "- Integrated graphics: $igpu" >>/tmp/regataos-prime/prime-info.txt
fi

echo "- Graphic chipset: $dgpu" >>/tmp/regataos-prime/prime-info.txt
echo "- Video memory size: $vram_size" >>/tmp/regataos-prime/prime-info.txt

if test -e /usr/bin/nvidia-xconfig; then
    echo "- NVIDIA driver version: $nv_version" >>/tmp/regataos-prime/prime-info.txt
fi

echo "- Mesa version: $mesa_version" >>/tmp/regataos-prime/prime-info.txt
echo "- OpenGL version: $opengl_version" >>/tmp/regataos-prime/prime-info.txt
echo "- Vulkan version: $vulkan_version" >>/tmp/regataos-prime/prime-info.txt
echo "- Kernel version: $kernel_version" >>/tmp/regataos-prime/prime-info.txt

cp -f /tmp/regataos-prime/prime-info.txt $HOME/system-info.txt
