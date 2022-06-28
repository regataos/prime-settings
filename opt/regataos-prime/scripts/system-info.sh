#!/bin/bash

sleep 3;

# Detect system language
user=$(users | awk '{print $1}')

if test -e "/home/$user/.config/plasma-localerc" ; then
	language=$(grep -r LANGUAGE= "/home/$user/.config/plasma-localerc" | cut -d"=" -f 2- | cut -d":" -f -1)

	if [ -z $language ]; then
    	language=$(grep -r LANG= "/home/$user/.config/plasma-localerc" | cut -d"=" -f 2-)
	fi

elif test -e "/home/$user/.config/user-dirs.locale" ; then
    language=$(cat "/home/$user/.config/user-dirs.locale")

else
    language=$(echo $LANG)
fi

# Configure application language
if [[ $language == *"pt_BR"* ]]; then
	rm -rf "/opt/regataos-prime/www/js/translations/language"
	rm -rf "/opt/regataos-prime/scripts/notify"
	ln -sf /opt/regataos-prime/www/js/translations/pt-br /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-pt /opt/regataos-prime/scripts/notify

elif [[ $language == *"pt_PT"* ]]; then
	rm -rf "/opt/regataos-prime/www/js/translations/language"
	rm -rf "/opt/regataos-prime/scripts/notify"
	ln -sf /opt/regataos-prime/www/js/translations/pt-br /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-pt /opt/regataos-prime/scripts/notify

elif [[ $language == *"en_US"* ]]; then
	rm -rf "/opt/regataos-prime/www/js/translations/language"
	rm -rf "/opt/regataos-prime/scripts/notify"
	ln -sf /opt/regataos-prime/www/js/translations/en-us /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-en /opt/regataos-prime/scripts/notify

else
	rm -rf "/opt/regataos-prime/www/js/translations/language"
	rm -rf "/opt/regataos-prime/scripts/notify"
	ln -sf /opt/regataos-prime/www/js/translations/en-us /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-en /opt/regataos-prime/scripts/notify
fi

exit 0
