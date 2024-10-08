// Settings page options

// Apply configuration option
function runConfigOption(option) {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = `/opt/regataos-prime/scripts/settings-options -${option}`;
	exec(command, function (error, call, errlog) { });

	setTimeout(function () {
		const configFileWithOptions = "/tmp/regataos-prime/config/regataos-prime.conf";

		if (fs.existsSync(configFileWithOptions)) {
			const checkOptions = fs.readFileSync(configFileWithOptions, "utf8");

			if (checkOptions.includes(`${option}=on`)) {
				document.querySelector(`.${option}-on`).style.display = "block";
				document.querySelector(`.${option}-off`).style.display = "none";
			} else if (checkOptions.includes(`${option}=off`)) {
				document.querySelector(`.${option}-on`).style.display = "none";
				document.querySelector(`.${option}-off`).style.display = "block";
			} else {
				document.querySelector(`.${option}-on`).style.display = "block";
				document.querySelector(`.${option}-off`).style.display = "none";
			}
		}
	}, 1000);
}

// Open display
function display() {
	setTimeout(function () {
		const exec = require('child_process').exec;
		const command = "kcmshell6 kcm_kscreen";
		exec(command, function (error, call, errlog) {
		});
	}, 500);
}

// Open dgpu-teste
function dgpuTest(graphicalApi) {
	const exec = require('child_process').exec;
	const command = `sleep 1; /opt/regataos-prime/scripts/test-dgpu -${graphicalApi}`;
	exec(command, function (error, call, errlog) { });
}

// Open nvidia-settings
function nvidia_driver() {
	setTimeout(function () {
		const exec = require('child_process').exec;
		const command = "nvidia-settings";
		exec(command, function (error, call, errlog) {
		});
	}, 500);
}

// Get path to .desktop file
function getDesktopFile() {
	const fileUrl = document.getElementById('add-apps').value
	const commandLine = `
		sudo /opt/regataos-prime/scripts/prime-config-external-apps ${fileUrl};
		/opt/regataos-prime/scripts/prime-option-add-apps ${fileUrl}`;
	const exec = require('child_process').exec;
	exec(commandLine, function (error, call, errlog) { });

	document.getElementById('add-apps').value = '';

	setTimeout(function () {
		createAppList();
	}, 500);
}

// Remove external application
function remove_external_app(appname, desktop) {
	const commandLine = `sudo /opt/regataos-prime/scripts/prime-option-remove-apps ${appname} ${desktop}`;
	const exec = require('child_process').exec;
	exec(commandLine, function (error, call, errlog) { });

	document.getElementById(appname).remove()

	setTimeout(function () {
		createAppList();
	}, 500);
}

// Functions for buttons with drop-down menu.
sessionStorage.setItem("hideMenu", "");
function hideSpecifiedMenu() {
	let buttonId = sessionStorage.getItem("buttonId");
	let menuId = sessionStorage.getItem("hideMenu");
	let clickedElement = document.activeElement.id;

	if (clickedElement != buttonId) {
		let elementToHide = document.querySelector(`#${menuId}`);
		elementToHide.style.display = "none";
	}
}

function showSpecifiedMenu(buttonId, menuId, optionId) {
	let extendedMenu = document.querySelector(`#${menuId}`);
	let styleDefaultValue = extendedMenu.style.display;

	function openMenu() {
		extendedMenu.style.display = "block";
		sessionStorage.setItem("hideMenu", menuId);
		sessionStorage.setItem("buttonId", buttonId);
	}

	if (styleDefaultValue == "" || styleDefaultValue == "none") {
		// check if there are any menus open
		let checkMenuOpen = sessionStorage.getItem("hideMenu");
		if (checkMenuOpen && checkMenuOpen != menuId) {
			document.querySelector(`#${menuId}`).style.display = "none";
			setTimeout(function () {
				openMenu();
			}, 100);
		} else {
			openMenu();
		}

	} else {
		extendedMenu.style.display = "none";
		const buttonText = document.querySelector(`#${optionId} span`).textContent;
		document.querySelector(`#${buttonId} span`).textContent = buttonText;
	}
}

// Set the default GPU for rendering
function chooseDefaultGpu(value) {
	const exec = require('child_process').exec;
	const gpuRender = "sudo /opt/regataos-prime/scripts/gpu-render -" + value;
	exec(gpuRender, function (error, call, errlog) { });

	// Notify user on desktop that restart is required
	if (value.includes("igpu")) {
		document.querySelector(".render-igpu-desc").style.display = "block";
		document.querySelector(".render-dgpu-desc").style.display = "none";
	} else {
		document.querySelector(".render-igpu-desc").style.display = "none";
		document.querySelector(".render-dgpu-desc").style.display = "block";
	}

	setTimeout(function () {
		const command = "/opt/regataos-prime/scripts/notifications/notify -restart";
		exec(command, function (error, call, errlog) { });
	}, 1000);
}

// Set cpu governor configuration
function chooseCpuGovernor(value) {
	const exec = require('child_process').exec;
	const notifyCpuPower = "/opt/regataos-prime/scripts/notifications/notify -cpu-" + value;
	const setCpuGovernor = "sudo /opt/regataos-prime/scripts/cpu-configs -cpu-" + value;
	exec(setCpuGovernor, function (error, call, errlog) { });

	// Notify user on desktop that restart is required
	if (value.includes("powersave")) {
		document.querySelector(".cpu-powersave-desc").style.display = "block";
		document.querySelector(".cpu-performance-desc").style.display = "none";
	} else {
		document.querySelector(".cpu-powersave-desc").style.display = "none";
		document.querySelector(".cpu-performance-desc").style.display = "block";
	}

	setTimeout(function () {
		exec(notifyCpuPower, function (error, call, errlog) { });
	}, 1000);
}
