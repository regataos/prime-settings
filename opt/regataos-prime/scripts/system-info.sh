#!/bin/bash

sleep 3;

# Detect system language
if test -e "$HOME/.config/plasma-localerc" ; then
    language=$(grep -r LANG "$HOME/.config/plasma-localerc")

elif test -e "$HOME/.config/user-dirs.locale" ; then
    language=$(grep -r LANG "$HOME/.config/user-dirs.locale")

else
    language=$(echo $LANG)
fi

# Configure application language
if [[ $language == *"pt"* ]]; then
	rm -f "/opt/regataos-prime/www/js/translations/language"
	ln -sf /opt/regataos-prime/www/js/translations/pt-br /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-pt /opt/regataos-prime/scripts/notify

elif [[ $language == *"en"* ]]; then
	rm -f "/opt/regataos-prime/www/js/translations/language"
	ln -sf /opt/regataos-prime/www/js/translations/en-us /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-en /opt/regataos-prime/scripts/notify

else
	rm -f "/opt/regataos-prime/www/js/translations/language"
	ln -sf /opt/regataos-prime/www/js/translations/en-us /opt/regataos-prime/www/js/translations/language
	ln -sf /opt/regataos-prime/scripts/notifications/notify-en /opt/regataos-prime/scripts/notify
fi

exit;
