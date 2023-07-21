// Check system
function check_system() {
	const fs = require('fs');

	// Check Prime support
	const useHybridGraphics = document.getElementById("primeon");
	const useHybridGraphicsExists = document.body.contains(useHybridGraphics);
	if (useHybridGraphicsExists) {
		fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
			if (!err) {
				useHybridGraphics.style.display = "block";
				return;
			} else {
				useHybridGraphics.style.display = "none";
			}
		});
	}

	// Check support for Vulkan
	const vulkanSupported = document.getElementById("primeon");
	const vulkanSupportedExists = document.body.contains(vulkanSupported);
	if (vulkanSupportedExists) {
		fs.access("/tmp/regataos-prime/vulkan-version.txt", (err) => {
			if (!err) {
				vulkanSupported.style.display = "block";
				return;
			} else {
				vulkanSupported.style.display = "none";
			}
		});
	}

	// Check NVIDIA driver
	const useNvidiaClick = document.getElementById("use-nvidia-click");
	const useNvidiaClickExists = document.body.contains(useNvidiaClick);
	if (useNvidiaClickExists) {
		fs.access('/usr/bin/nvidia-xconfig', (err) => {
			if (!err) {
				useNvidiaClick.style.display = "block";
				return;
			} else {
				useNvidiaClick.style.display = "none";
			}
		});
	}

	const checkNvidiaDriver = document.getElementById("use-nvidia");
	const checkNvidiaDriverExists = document.body.contains(checkNvidiaDriver);
	if (checkNvidiaDriverExists) {
		fs.access('/usr/bin/nvidia-xconfig', (err) => {
			if (!err) {
				checkNvidiaDriver.style.display = "block";
				return;
			} else {
				checkNvidiaDriver.style.display = "none";
			}
		});
	}

	// Check support for AMD AMF
	const amfToggle = document.getElementById("amf-toggle");
	const amfToggleExists = document.body.contains(amfToggle)
	if (amfToggleExists) {
		fs.access("/tmp/regataos-prime/vulkan-version.txt", (err) => {
			if (!err) {
				const openglVendor = fs.readFileSync("/tmp/regataos-prime/config/system-info/opengl-vendor.txt", "utf8");

				if ((openglVendor.indexOf("AMD") > -1) == "1") {
					amfToggle.style.display = "block";
				} else {
					amfToggle.style.display = "none";
				}

				return;
			} else {
				amfToggle.style.display = "none";
			}
		});
	}
}
check_system();
