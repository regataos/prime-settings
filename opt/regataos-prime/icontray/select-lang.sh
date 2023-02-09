#!/bin/bash

# This script shows words translated in the output, according to what was selected.

# Capture product
vendor=$product

# Detect system language
user=$(users | awk '{print $1}')

if test -e "/home/$user/.config/plasma-localerc" ; then
	language=$(grep -r LANGUAGE= "/home/$user/.config/plasma-localerc" | cut -d"=" -f 2- | cut -d":" -f -1 | tr [A-Z] [a-z] | sed 's/_/-/' | cut -d"." -f -1)

	if [ -z $language ]; then
    	language=$(grep -r LANG= "/home/$user/.config/plasma-localerc" | cut -d"=" -f 2- | cut -d"." -f -1 | tr [A-Z] [a-z] | sed 's/_/-/' | cut -d"." -f -1)
	fi

elif test -e "/home/$user/.config/user-dirs.locale" ; then
    language=$(cat "/home/$user/.config/user-dirs.locale" | tr [A-Z] [a-z] | sed 's/_/-/')

else
    language=$(echo $LANG | tr [A-Z] [a-z] | sed 's/_/-/' | cut -d"." -f -1)
fi

# Configure application language
if [[ $language == *"pt"* ]]; then
	echo "Usando dGPU $vendor"

elif [[ $language == *"en"* ]]; then
	echo "Using $vendor dGPU"

else
	echo "Using $vendor dGPU"
fi
