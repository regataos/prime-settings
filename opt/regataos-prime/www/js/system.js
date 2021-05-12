// system page options
//Open the Information Center application
function info() {
	const exec = require('child_process').exec;
	var comando = "kinfocenter";
	console.log(comando);
	exec(comando,function(error,call,errlog){
	});
}

// Copy hardware and software information to the clipboard
function copy_info() {
	const exec = require('child_process').exec;
	var comando = "/bin/bash /opt/regataos-prime/scripts/prime-info.sh; cat /tmp/regataos-prime/prime-info.txt | xclip -sel clip; /opt/regataos-prime/scripts/notify -copy-info";
	console.log(comando);
	exec(comando,function(error,call,errlog){
	});
}

// If PRIME is not supported, hide some elements in the System session
function hide_elements() {
	const fs = require('fs');
	fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
	if (!err) {
		$("li.primeon").css("display", "inline-block")
	} else
		$("li.primeon").css("display", "none")
	});
}

hide_elements();
