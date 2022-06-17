// Capture system information
function system_information() {
	const fs = require('fs');

	// Capture Operational System
	const os_name = fs.readFileSync("/tmp/regataos-prime/config/system-info/os-name.txt", "utf8");
	document.getElementById("os-name").innerHTML = os_name;

	// Capture total amount of RAM
	const ram_total = fs.readFileSync("/tmp/regataos-prime/config/system-info/ram-total.txt", "utf8");
	document.getElementById("ram-total").innerHTML = ram_total;

	// Capture the CPU model
	const cpu_model = fs.readFileSync("/tmp/regataos-prime/config/system-info/cpu-model.txt", "utf8");
	document.getElementById("cpu-model").innerHTML = cpu_model;

	// Capture NVIDIA driver version
	if (fs.existsSync("/tmp/regataos-prime/config/system-info/nvdriver-version.txt")) {
		const nvdriver_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/nvdriver-version.txt", "utf8");
		document.getElementById("nvdriver-version").innerHTML = nvdriver_version;
	}

	// Capture the discrete GPU video memory (VRAM) size
	const vram_size = fs.readFileSync("/tmp/regataos-prime/config/system-info/total-vram-size.txt", "utf8");
	document.getElementById("vram-size").innerHTML = vram_size;

	// Capture iGPU
	const igpu_model = fs.readFileSync("/tmp/regataos-prime/config/system-info/igpu-model.txt", "utf8");
	document.getElementById("igpu-model").innerHTML = igpu_model;

	// Capture dgpu
	const dgpu_model = fs.readFileSync("/tmp/regataos-prime/config/system-info/dgpu-model.txt", "utf8");
	document.getElementById("dgpu-model").innerHTML = dgpu_model;

	// Capture MESA version
	const mesa_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/mesa-version.txt", "utf8");
	document.getElementById("mesa-version").innerHTML = mesa_version;

	// Capture OpenGL version
	const opengl_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/opengl-version.txt", "utf8");
	document.getElementById("gl-version").innerHTML = opengl_version;

	// Capture Vulkan version
	const vulkan_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/vulkan-version.txt", "utf8");
	document.getElementById("vk-version").innerHTML = vulkan_version;

	// Capture Kernel version
	const kernel_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/kernel-version.txt", "utf8");
	document.getElementById("linux-version").innerHTML = kernel_version;
}

system_information();
