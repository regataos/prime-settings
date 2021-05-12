#!/bin/bash

# Find the user's desktop
user=$(users | awk '{print $1}')
test -f "${XDG_CONFIG_HOME:-/home/$user/.config}/user-dirs.dirs" && source "${XDG_CONFIG_HOME:-/home/$user/.config}/user-dirs.dirs"
desktop_dir="${XDG_DESKTOP_DIR:-/home/$user/Desktop}"
desktop_folder="$(echo $desktop_dir | cut -d/ -f 3-)"

# Directories where possible .desktop files for apps
apps_dir="/usr/share/applications"
desktop_dir="/home/$user/$desktop_folder"
apps_local_dir="/home/$user/.local/share/applications"
snap_dir="/var/lib/snapd/desktop/applications"
flatpak_dir="/var/lib/flatpak/exports/share/applications"

# Enable or disable running applications with the dGPU
function check_app() {
	if [[ $(grep -R "$app_name=on" /tmp/regataos-prime/config/run-without-dgpu.conf) == *"$app_name=on"* ]]; then
		# Run app with the dGPU
		if [[ $(grep -R 'regataos-dgpu' "$apps_dir/$(ls "$apps_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$apps_dir/$(ls "$apps_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$desktop_dir/$(ls "$desktop_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$desktop_dir/$(ls "$desktop_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$apps_local_dir/$(ls "$apps_local_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$apps_local_dir/$(ls "$apps_local_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$snap_dir/$(ls "$snap_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$snap_dir/$(ls "$snap_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$flatpak_dir/$(ls "$flatpak_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$flatpak_dir/$(ls "$flatpak_dir" | grep "$search_desktop_file")"
		fi

	elif [[ $(grep -R 'all-apps' /tmp/regataos-prime/config/regataos-prime.conf | cut -d'=' -f 2-) == *"off"* ]]; then
		# Run app without the dGPU
		sed -i 's/Exec=regataos-dgpu /Exec=/' "$apps_dir/$(ls "$apps_dir" | grep "$search_desktop_file")" \
		"$desktop_dir/$(ls "$desktop_dir" | grep "$search_desktop_file")" \
		"$apps_local_dir/$(ls "$apps_local_dir" | grep "$search_desktop_file")" \
		"$snap_dir/$(ls "$snap_dir" | grep "$search_desktop_file")" \
		"$flatpak_dir/$(ls "$flatpak_dir" | grep "$search_desktop_file")"

		# Add the app name to the list of apps not running with the dGPU
		if [[ $(grep -R "$app_name" /tmp/regataos-prime/config/run-without-dgpu.conf) != *"$app_name"* ]]; then
			echo "$app_name" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"
		fi

		# Clear empty lines
		sed -i '/^$/d' "/tmp/regataos-prime/config/run-without-dgpu.conf"

	elif [[ $(grep -R "$app_name" /tmp/regataos-prime/config/run-without-dgpu.conf) == *"$app_name"* ]]; then
		# Run app without the dGPU
		sed -i 's/Exec=regataos-dgpu /Exec=/' "$apps_dir/$(ls "$apps_dir" | grep "$search_desktop_file")" \
		"$desktop_dir/$(ls "$desktop_dir" | grep "$search_desktop_file")" \
		"$apps_local_dir/$(ls "$apps_local_dir" | grep "$search_desktop_file")" \
		"$snap_dir/$(ls "$snap_dir" | grep "$search_desktop_file")" \
		"$flatpak_dir/$(ls "$flatpak_dir" | grep "$search_desktop_file")"

	else
		# Run app with the dGPU
		if [[ $(grep -R 'regataos-dgpu' "$apps_dir/$(ls "$apps_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$apps_dir/$(ls "$apps_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$desktop_dir/$(ls "$desktop_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$desktop_dir/$(ls "$desktop_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$apps_local_dir/$(ls "$apps_local_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$apps_local_dir/$(ls "$apps_local_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$snap_dir/$(ls "$snap_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$snap_dir/$(ls "$snap_dir" | grep "$search_desktop_file")"
		fi

		if [[ $(grep -R 'regataos-dgpu' "$flatpak_dir/$(ls "$flatpak_dir" | grep "$search_desktop_file")") != *"regataos-dgpu"* ]]; then
			sed -i 's/Exec=/Exec=regataos-dgpu /' "$flatpak_dir/$(ls "$flatpak_dir" | grep "$search_desktop_file")"
		fi
	fi
}

# Blender
app_name="blender"
search_desktop_file="$app_name"
check_app
