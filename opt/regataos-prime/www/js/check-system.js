// Check system
function check_system() {
const fs = require('fs');

// Check Prime support
fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
if (!err) {
	// Check NVIDIA driver
	fs.access('/usr/bin/nvidia-xconfig', (err) => {
	if (!err) {
		$("#use-nvidia").css("display", "block")
		$("#use-nvidia-click").css("display", "block")
		return;
	} else {
		$("#use-nvidia").css("display", "none")
		$("#use-nvidia-click").css("display", "none")
	}
	});

	$("#primeon").css("display", "block")

	return;
} else {
	// Check NVIDIA driver
	fs.access('/usr/bin/nvidia-xconfig', (err) => {
	if (!err) {
		$("#use-nvidia").css("display", "block")
		$("#use-nvidia-click").css("display", "block")
	return;
	} else {
		$("#use-nvidia").css("display", "none")
		$("#use-nvidia-click").css("display", "none")
	}
	});

	$("#primeon").css("display", "none")
}
});
}

check_system()
