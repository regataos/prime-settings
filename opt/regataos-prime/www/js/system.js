// system page options
//Open the Information Center application
function info() {
	setTimeout(function () {
		const exec = require('child_process').exec;
		const comando = "kinfocenter";
		exec(comando, function (error, call, errlog) {
		});
	}, 500);
}

// Copy hardware and software information to the clipboard
function copy_info() {
	const exec = require('child_process').exec;
	const comando = "/bin/bash /opt/regataos-prime/scripts/prime-info.sh; \
	cat /tmp/regataos-prime/prime-info.txt | xclip -sel clip; \
	/opt/regataos-prime/scripts/notify -copy-info";
	exec(comando, function (error, call, errlog) {
	});
}

// If PRIME is not supported, hide some elements in the System session
function hide_elements() {
	const fs = require('fs');
	fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
		const optionPrimeOn = document.querySelector("li.primeon");

		if (!err) {
			optionPrimeOn.style.display = "inline-block";
		} else
			optionPrimeOn.style.display = "none";
	});
}
hide_elements();
