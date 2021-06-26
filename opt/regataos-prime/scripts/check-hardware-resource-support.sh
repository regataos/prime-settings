#!/bin/bash

sleep 10;

# Check support for FreeSync and, if necessary, activate the feature
#Check nvidia driver
if test ! -e /usr/bin/nvidia-xconfig ; then
	if [[ $(xrandr --props | grep vrr_capable) == *"1"* ]]; then
		sed -i 's/\(freesync-supported=false\)/freesync-supported=true/' "/tmp/regataos-prime/config/regataos-prime.conf"

		if [[ $(grep -R "freesync=" /tmp/regataos-prime/config/regataos-prime.conf) == *"freesync=on"* ]]; then
			/opt/regataos-prime/scripts/prime-option -freesync-on
		elif [[ $(grep -R "freesync=" /tmp/regataos-prime/config/regataos-prime.conf) == *"freesync=off"* ]]; then
			/opt/regataos-prime/scripts/prime-option -freesync-off
		else
			/opt/regataos-prime/scripts/prime-option -freesync-on
		fi

	elif [[ $(xrandr --props | grep freesync_capable) == *"1"* ]]; then
		sed -i 's/\(freesync-supported=false\)/freesync-supported=true/' "/tmp/regataos-prime/config/regataos-prime.conf"

		if [[ $(grep -R "freesync=" /tmp/regataos-prime/config/regataos-prime.conf) == *"freesync=on"* ]]; then
			/opt/regataos-prime/scripts/prime-option -freesync-on
		elif [[ $(grep -R "freesync=" /tmp/regataos-prime/config/regataos-prime.conf) == *"freesync=off"* ]]; then
			/opt/regataos-prime/scripts/prime-option -freesync-off
		else
			/opt/regataos-prime/scripts/prime-option -freesync-on
		fi

	else
		sed -i 's/\(freesync-supported=true\)/freesync-supported=false/' "/tmp/regataos-prime/config/regataos-prime.conf"
	fi
fi

# If necessary, disable TearFree
if [[ $(cat /tmp/regataos-prime/config/regataos-prime.conf) == *"tearfree=off"* ]]; then
	#For NVIDIA Driver
	if [[ $(cat /usr/share/X11/xorg.conf.d/20-nvidia.conf) == *"ForceFullCompositionPipeline=On"* ]]; then
		nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 { ForceFullCompositionPipeline = Off }"
	fi

	#For open source drivers
	screen=$(xrandr --props | grep 'connected primary' | awk '{print $1}')
	xrandr --output $screen --set TearFree off

	sudo /opt/regataos-prime/scripts/gpu-render -tearfree-off

elif [[ $(cat /tmp/regataos-prime/config/regataos-prime.conf) == *"tearfree=on"* ]]; then
	#For NVIDIA Driver
	if [[ $(cat /usr/share/X11/xorg.conf.d/20-nvidia.conf) == *"ForceFullCompositionPipeline=Off"* ]]; then
		nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 { ForceFullCompositionPipeline = On }"
	fi

	#For open source drivers
	screen=$(xrandr --props | grep 'connected primary' | awk '{print $1}')
	xrandr --output $screen --set TearFree on

	sudo /opt/regataos-prime/scripts/gpu-render -tearfree-on

else
	echo "Option not found in the file with configuration options."
fi
