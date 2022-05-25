// Check system
function check_system() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	// Check Prime support
	fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
		if (!err) {
			// Check NVIDIA driver
			fs.access('/usr/bin/nvidia-xconfig', (err) => {
				if (!err) {
					document.getElementById("use-nvidia").style.display = "block";
					document.getElementById("use-nvidia-click").style.display = "block";
					return;
				} else {
					document.getElementById("use-nvidia").style.display = "none";
					document.getElementById("use-nvidia-click").style.display = "none";
				}
			});

			document.getElementById("primeon").style.display = "block";
			return;

		} else {
			// Check NVIDIA driver
			fs.access('/usr/bin/nvidia-xconfig', (err) => {
				if (!err) {
					document.getElementById("use-nvidia").style.display = "block";
					document.getElementById("use-nvidia-click").style.display = "block";
					return;
				} else {
					document.getElementById("use-nvidia").style.display = "none";
					document.getElementById("use-nvidia-click").style.display = "none";
				}
			});

			document.getElementById("primeon").style.display = "none";
		}
	});

	// Check support for Vulkan
	fs.access("/tmp/regataos-prime/vulkan-version.txt", (err) => {
		if (!err) {
			document.getElementById("vulkan-supported").style.display = "block"
			return;
		} else {
			document.getElementById("vulkan-supported").style.display = "none"
		}
	});

	// Check support for AMD AMF
	fs.access("/tmp/regataos-prime/vulkan-version.txt", (err) => {
		if (!err) {
			const command_line = "glxinfo | grep -i 'OpenGL vendor' | cut -d':' -f 2- | awk '{print $1}'";
			exec(command_line, (error, stdout, stderr) => {
				if (stdout) {
					if ((stdout.indexOf("AMD") > -1) == "1") {
						document.getElementById("amf-toggle").style.display = "block"
					} else {
						document.getElementById("amf-toggle").style.display = "none"
					}
				}
			});
			return;

		} else {
			document.getElementById("amf-toggle").style.display = "none"
		}
	});
}

check_system()
