// system page options
//Open the Information Center application
function info() {
	setTimeout(function () {
		const exec = require('child_process').exec;
		const command = "kinfocenter";
		exec(command, function (error, call, errlog) {
		});
	}, 500);
}

// Copy hardware and software information to the clipboard
function copy_info() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/settings-options -copy-info";
	exec(command, function (error, call, errlog) {
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
