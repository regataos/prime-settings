#!/bin/bash

cd /opt/regataos-prime/icontray/

# Verifying that the NVIDIA driver is installed.
if test -e /usr/bin/nvidia-xconfig ; then
	ps -C dgpu-icontray.py > /dev/null
	if [ $? = 1 ] ; then
		export product="NVIDIA";
		./dgpu-icontray.py
	fi

else
	# If the NVIDIA driver is not installed, detect which dGPU is available on the hardware
	detect_dgpu=$(DRI_PRIME=1 glxinfo | grep vendor)
	if [[ $detect_dgpu == *"AMD"* ]]; then
		ps -C dgpu-icontray.py > /dev/null
		if [ $? = 1 ] ; then
			export product="AMD";
			./dgpu-icontray.py
		fi

	elif [[ $detect_dgpu == *"Intel"* ]]; then
		ps -C dgpu-icontray.py > /dev/null
		if [ $? = 1 ] ; then
			export product="Intel";
			./dgpu-icontray.py
		fi

	else
		echo "Nothing to do..."
	fi
fi
