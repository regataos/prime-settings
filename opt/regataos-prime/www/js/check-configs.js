// Check the status of the various configuration options
function checkFreeSync() {
	const fs = require('fs');
	const configFileWithOptions = "/tmp/regataos-prime/config/regataos-prime.conf";

	if (fs.existsSync(configFileWithOptions)) {
		const checkOptions = fs.readFileSync(configFileWithOptions, "utf8");

		// Check support for FreeSync and make sure it is enabled
		if (checkOptions.includes("freesync-supported=true")) {
			document.getElementById("freesync-toggle").style.display = "block";
			document.getElementById("tearfree-toggle").style.display = "none";
		} else if (checkOptions.includes("freesync-supported=false")) {
			document.getElementById("freesync-toggle").style.display = "none";
			document.getElementById("tearfree-toggle").style.display = "block";
		} else {
			document.getElementById("freesync-toggle").style.display = "none";
			document.getElementById("tearfree-toggle").style.display = "block";
		}

		// Display the status of various configuration options in the UI
		const allOptions = ["freesync", "compositor", "tearfree", "unlockwidgets", "amf"];
		for (let i = 0; i < allOptions.length; i++) {
			console.log(allOptions[i]);

			if (checkOptions.includes(`${allOptions[i]}=on`)) {
				document.querySelector(`.switch-on-${allOptions[i]} + label`).style.display = "block";
				document.querySelector(`.switch-off-${allOptions[i]} + label`).style.display = "none";
				document.querySelector(`.${allOptions[i]}-on`).style.display = "block";
				document.querySelector(`.${allOptions[i]}-off`).style.display = "none";
			} else if (checkOptions.includes(`${allOptions[i]}=off`)) {
				document.querySelector(`.switch-on-${allOptions[i]} + label`).style.display = "none";
				document.querySelector(`.switch-off-${allOptions[i]} + label`).style.display = "block";
				document.querySelector(`.${allOptions[i]}-on`).style.display = "none";
				document.querySelector(`.${allOptions[i]}-off`).style.display = "block";
			} else {
				document.querySelector(`.${allOptions[i]}-on`).style.display = "block";
				document.querySelector(`.${allOptions[i]}-off`).style.display = "none";
				document.querySelector(`.switch-on-${allOptions[i]} + label`).style.display = "block";
				document.querySelector(`.switch-off-${allOptions[i]} + label`).style.display = "none";
			}
		}
	}
}
checkFreeSync();

// Check default rendering GPU
function checkGpuRender() {
	const fs = require('fs');

	if ((fs.existsSync("/tmp/regataos-prime/use-hybrid-graphics.txt")) || (fs.existsSync("/usr/share/X11/xorg.conf.d/10-nvidia-primary.conf"))) {
		document.getElementById("selecte-gpu").style.display = "block";

		const checkGpuRenderConf = fs.readFileSync("/tmp/regataos-prime/config/regataos-prime.conf", "utf8");
		if (checkGpuRenderConf.includes("dgpu")) {
			document.querySelector("#select-default-gpu span").classList.add("dedicated");
			document.querySelector(".render-igpu-desc").style.display = "none";
			document.querySelector(".render-dgpu-desc").style.display = "block";
		} else if (checkGpuRenderConf.includes("igpu")) {
			document.querySelector("#select-default-gpu span").classList.add("integrated");
			document.querySelector(".render-igpu-desc").style.display = "block";
			document.querySelector(".render-dgpu-desc").style.display = "none";
		} else {
			document.querySelector("#select-default-gpu span").classList.add("integrated");
			document.querySelector(".render-igpu-desc").style.display = "block";
			document.querySelector(".render-dgpu-desc").style.display = "none";
		}
	} else {
		document.getElementById("selecte-gpu").style.display = "none";
	}
}
checkGpuRender();

// Check cpu governor configuration
function checkCpuGovernor() {
	const fs = require('fs');

	if (fs.existsSync("/etc/regataos-prime/cpu-governor.txt")) {
		const checkCpuGovernorConf = fs.readFileSync("/etc/regataos-prime/cpu-governor.txt", "utf8");
		if (checkCpuGovernorConf.includes("performance")) {
			document.querySelector("#select-cpu-governor span").classList.add("governor-performance");
			document.querySelector(".cpu-powersave-desc").style.display = "none";
			document.querySelector(".cpu-performance-desc").style.display = "block";
		} else if (checkCpuGovernorConf.includes("powersave")) {
			document.querySelector("#select-cpu-governor span").classList.add("governor-powersave");
			document.querySelector(".cpu-powersave-desc").style.display = "block";
			document.querySelector(".cpu-performance-desc").style.display = "none";
		} else {
			document.querySelector("#select-cpu-governor span").classList.add("governor-powersave");
			document.querySelector(".cpu-powersave-desc").style.display = "block";
			document.querySelector(".cpu-performance-desc").style.display = "none";
		}
	} else {
		document.querySelector("#select-cpu-governor span").classList.add("governor-powersave");
		document.querySelector(".cpu-powersave-desc").style.display = "block";
		document.querySelector(".cpu-performance-desc").style.display = "none";
	}
}
checkCpuGovernor();
