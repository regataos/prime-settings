#!/bin/bash

cd /

while :
do

# Display desktop notifications when prompted
if test -e "/tmp/regataos-prime/running-with-dgpu.txt"; then
	ps -C "regataos-dgpu $(echo $binary_file)" > /dev/null
	if [ $? = 0 ] ; then
		running_app=$(echo $binary_file)
		ps -C $running_app > /dev/null
		if [ $? = 1 ] ; then
			ps -C regataos-dgpu > /dev/null
			if [ $? = 1 ] ; then
				killall dgpu-icontray.py
				rm -f "/tmp/regataos-prime/running-with-dgpu.txt"
				break
			else
				running=$(ps -C regataos-dgpu | wc -l)
				if [ $(echo $running) -le 2 ]; then
					killall dgpu-icontray.py
					rm -f "/tmp/regataos-prime/running-with-dgpu.txt"
				fi
				break
			fi
		fi

	else
		running=$(ps -C regataos-dgpu | wc -l)
		if [ $(echo $running) -le 2 ]; then
			killall dgpu-icontray.py
			rm -f "/tmp/regataos-prime/running-with-dgpu.txt"
		fi
		break
	fi

else
	ps -C dgpu-icontray.py > /dev/null
	if [ $? = 0 ] ; then
		killall dgpu-icontray.py
	fi
	break
fi

   sleep 2
done
