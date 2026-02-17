// Check system
function checkSystem() {
	const fs = require('fs');

	// Check Prime support
	const useHybridGraphics = document.getElementById("primeon");
	const useHybridGraphicsExists = document.body.contains(useHybridGraphics);
	if (useHybridGraphicsExists) {
		if (fs.existsSync("/tmp/regataos-prime/use-hybrid-graphics.txt")) {
			useHybridGraphics.style.display = "block";
		} else {
			useHybridGraphics.style.display = "none";
		}
	}

	// Check NVIDIA driver
	const useNvidiaClick = document.getElementById("use-nvidia-click");
	const useNvidiaClickExists = document.body.contains(useNvidiaClick);
	if (useNvidiaClickExists) {
		if (fs.existsSync("/usr/bin/nvidia-xconfig")) {
			useNvidiaClick.style.display = "block";
		} else {
			useNvidiaClick.style.display = "none";
		}
	}

	const checkNvidiaDriver = document.getElementById("use-nvidia");
	const checkNvidiaDriverExists = document.body.contains(checkNvidiaDriver);
	if (checkNvidiaDriverExists) {
		if (fs.existsSync("/usr/bin/nvidia-xconfig")) {
			checkNvidiaDriver.style.display = "block";
		} else {
			checkNvidiaDriver.style.display = "none";
		}
	}

	// Check support for Vulkan
	function checkVulkanSupport() {
		if (fs.existsSync("/tmp/regataos-prime/vulkan-version.txt")) {
			const vulkanSupport = fs.readFileSync("/tmp/regataos-prime/vulkan-version.txt", "utf8");
			if ((!vulkanSupport.includes("Incomplete support")) && (!vulkanSupport.includes("Not supported"))) {
				return true
			}
		}
	}

	const vulkanSupported = document.getElementById("primeon");
	const vulkanSupportedExists = document.body.contains(vulkanSupported);
	if (vulkanSupportedExists) {
		if (checkVulkanSupport) {
			vulkanSupported.style.display = "block";
		} else {
			vulkanSupported.style.display = "none";
		}
	}

	// Check support for AMD AMF
	const amfToggle = document.getElementById("amf-toggle");
	const amfToggleExists = document.body.contains(amfToggle)
	if (amfToggleExists) {
		if (checkVulkanSupport) {
			const openglVendor = fs.readFileSync("/tmp/regataos-prime/config/system-info/opengl-vendor.txt", "utf8");
			if (openglVendor.includes("AMD")) {
				amfToggle.style.display = "block";
			} else {
				amfToggle.style.display = "none";
			}
		} else {
			amfToggle.style.display = "none";
		}
	}
}
checkSystem();
