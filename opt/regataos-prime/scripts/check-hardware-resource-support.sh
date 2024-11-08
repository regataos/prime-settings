#!/bin/bash

sleep 2;

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
	#if [[ $(cat /usr/share/X11/xorg.conf.d/20-nvidia.conf) == *"ForceFullCompositionPipeline=On"* ]]; then
	#	nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 { ForceFullCompositionPipeline = Off }"
	#fi

	#For open source drivers
	if test ! -e "/usr/bin/nvidia-xconfig"; then
		screen=$(xrandr --props | grep 'connected primary' | awk '{print $1}')
		xrandr --output $screen --set TearFree off

		sudo /opt/regataos-prime/scripts/gpu-render -tearfree-off
	fi

elif [[ $(cat /tmp/regataos-prime/config/regataos-prime.conf) == *"tearfree=on"* ]]; then
	#For NVIDIA Driver
	# The ForceFullCompositionPipeline option is known to break some games using Vulkan
	# under Proton with NVIDIA driver 535. So, until NVIDIA can fix the issue, disable this feature.
	#if [[ $(cat /usr/share/X11/xorg.conf.d/20-nvidia.conf) == *"ForceFullCompositionPipeline=Off"* ]]; then
	#	nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 { ForceFullCompositionPipeline = Off }"
	#fi

	#For open source drivers
	if test ! -e "/usr/bin/nvidia-xconfig"; then
		screen=$(xrandr --props | grep 'connected primary' | awk '{print $1}')
		xrandr --output $screen --set TearFree on

		sudo /opt/regataos-prime/scripts/gpu-render -tearfree-on
	fi

else
	echo "Option not found in the file with configuration options."
fi

# If necessary, disable desktop effects
if [[ $(cat /tmp/regataos-prime/config/regataos-prime.conf) == *"compositor=off"* ]]; then
	qdbus6 org.kde.KWin /Compositor suspend

else
	# Check if the "compositor" option is present in the configuration file
	if [[ $(grep -r "compositor=" "/tmp/regataos-prime/config/regataos-prime.conf") != *"compositor="* ]]; then
		echo "compositor=on" >> "$HOME/.config/regataos-prime/regataos-prime.conf"
		sed -i '/^$/d' "$HOME/.config/regataos-prime/regataos-prime.conf"
		qdbus6 org.kde.KWin /Compositor resume

	else
		if [[ $(grep -r "compositor=" "/tmp/regataos-prime/config/regataos-prime.conf") == *"compositor=on"* ]]; then
			qdbus6 org.kde.KWin /Compositor resume
		fi
	fi
fi

# If necessary, unlock widgets
if [[ $(cat /tmp/regataos-prime/config/regataos-prime.conf) == *"unlockwidgets=off"* ]]; then
	qdbus6 org.kde.plasmashell /PlasmaShell evaluateScript "lockCorona(false)"

else
	# Check if the "unlockwidgets" option is present in the configuration file
	if [[ $(grep -r "unlockwidgets=" "/tmp/regataos-prime/config/regataos-prime.conf") != *"unlockwidgets="* ]]; then
		echo "unlockwidgets=on" >> "$HOME/.config/regataos-prime/regataos-prime.conf"
		sed -i '/^$/d' "$HOME/.config/regataos-prime/regataos-prime.conf"
		qdbus6 org.kde.plasmashell /PlasmaShell evaluateScript "lockCorona(true)"

	else
		if [[ $(grep -r "unlockwidgets=" "/tmp/regataos-prime/config/regataos-prime.conf") == *"unlockwidgets=on"* ]]; then
			qdbus6 org.kde.plasmashell /PlasmaShell evaluateScript "lockCorona(true)"
		fi
	fi
fi

# If necessary, configure amf
if [[ $(cat /tmp/regataos-prime/config/regataos-prime.conf) == *"amf=off"* ]]; then
	sudo /opt/regataos-prime/scripts/enable-amd-amf -amf-off

else
	# Check if the "amf" option is present in the configuration file
	if [[ $(grep -r "amf=" "/tmp/regataos-prime/config/regataos-prime.conf") != *"amf="* ]]; then
		echo "amf=off" >> "$HOME/.config/regataos-prime/regataos-prime.conf"
		sed -i '/^$/d' "$HOME/.config/regataos-prime/regataos-prime.conf"
		sudo /opt/regataos-prime/scripts/enable-amd-amf -amf-off

	else
		if [[ $(grep -r "amf=" "/tmp/regataos-prime/config/regataos-prime.conf") == *"amf=on"* ]]; then
			sudo /opt/regataos-prime/scripts/enable-amd-amf -amf-on
		fi
	fi
fi
