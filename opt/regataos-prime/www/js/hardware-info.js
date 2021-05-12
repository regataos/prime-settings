// Capture system information
function system_information() {
const fs = require('fs');

$(document).ready(function() {
	// Capture Operational System
	var os_name = fs.readFileSync("/tmp/regataos-prime/config/system-info/os-name.txt", "utf8");
	document.getElementById("os-name").innerHTML=os_name;

	// Capture total amount of RAM
	var ram_total = fs.readFileSync("/tmp/regataos-prime/config/system-info/ram-total.txt", "utf8");
	document.getElementById("ram-total").innerHTML=ram_total;

	// Capture the CPU model
	var cpu_model = fs.readFileSync("/tmp/regataos-prime/config/system-info/cpu-model.txt", "utf8");
	document.getElementById("cpu-model").innerHTML=cpu_model;

	// Capture NVIDIA driver version
	var nvdriver_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/nvdriver-version.txt", "utf8");
	document.getElementById("nvdriver-version").innerHTML=nvdriver_version;

	// Capture the discrete GPU video memory (VRAM) size
	var vram_size = fs.readFileSync("/tmp/regataos-prime/config/system-info/vram-size.txt", "utf8");
	document.getElementById("vram-size").innerHTML=vram_size;

	// Capture iGPU
	var igpu_model = fs.readFileSync("/tmp/regataos-prime/config/system-info/igpu-model.txt", "utf8");
	document.getElementById("igpu-model").innerHTML=igpu_model;

	// Capture dgpu
	var dgpu_model = fs.readFileSync("/tmp/regataos-prime/config/system-info/dgpu-model.txt", "utf8");
	document.getElementById("dgpu-model").innerHTML=dgpu_model;

	// Capture MESA version
	var mesa_version = fs.readFileSync("/tmp/regataos-prime/config/system-info/mesa-version.txt", "utf8");
	document.getElementById("mesa-version").innerHTML=mesa_version;
});
}

system_information();
