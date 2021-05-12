#!/bin/bash

# This script shows words translated in the output, according to what was selected.

# Capture product
vendor=$product

# Select language
if test -e "$HOME/.config/plasma-localerc" ; then
    language=$(grep -r LANG "$HOME/.config/plasma-localerc")

elif test -e "$HOME/.config/user-dirs.locale" ; then
    language=$(grep -r LANG "$HOME/.config/user-dirs.locale")

else
    language=$(echo $LANG)
fi

# Configure application language
if [[ $language == *"pt"* ]]; then
	echo "Usando dGPU $vendor"

elif [[ $language == *"en_US"* ]]; then
	echo "Using $vendor dGPU"

else
	echo "Using $vendor dGPU"
fi
