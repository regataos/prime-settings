// Settings page options

// Prevent Screen Tearing
function run_config_option() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = "/opt/regataos-prime/scripts/settings-options -" + config_option;
	exec(command, function (error, call, errlog) {
	});

	setTimeout(function () {
		fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
			if (err) throw err;
			const check_configs = data

			if ((check_configs.indexOf(config_option + "=on") > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";

			} else if ((check_configs.indexOf(config_option) > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "none";
				document.querySelector(`.${config_option}-off`).style.display = "block";

			} else {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";
			}
		});
	}, 500);
}

// Choose gpu to render
function choose_gpu1() {
	const exec = require('child_process').exec;

	const select = document.getElementById('selectnav1');
	const value = select.options[select.selectedIndex].value;

	const command = "sudo /opt/regataos-prime/scripts/gpu-render -" + value;
	exec(command, function (error, call, errlog) {
	});

	//Notify user on desktop that restart is required
	const notify_user = value.indexOf("dgpu") > -1;
	if (notify_user == '1') {
		const command = "/opt/regataos-prime/scripts/notify -restart";
		exec(command, function (error, call, errlog) {
		});
	}
}

function choose_gpu2() {
	const select = document.getElementById('selectnav2');
	const value = select.options[select.selectedIndex].value;

	const exec = require('child_process').exec;
	const command = "sudo /opt/regataos-prime/scripts/gpu-render -" + value;
	exec(command, function (error, call, errlog) {
	});

	//Notify user on desktop that restart is required
	const notify_user = value.indexOf("igpu") > -1;
	if (notify_user == '1') {
		const command = "/opt/regataos-prime/scripts/notify -restart";
		exec(command, function (error, call, errlog) {
		});
	}
}

// Open display
function display() {
	setTimeout(function () {
		const exec = require('child_process').exec;
		const command = "kcmshell5 kcm_kscreen";
		exec(command, function (error, call, errlog) {
		});
	}, 500);
}

// Open dgpu-teste
function teste_dgpu_gl() {
	const exec = require('child_process').exec;
	const command = 'sleep 1; /opt/regataos-prime/scripts/test-dgpu -gl';
	exec(command, function (error, call, errlog) {
	});
}

function teste_dgpu_vk() {
	const exec = require('child_process').exec;
	const command = 'sleep 1; /opt/regataos-prime/scripts/test-dgpu -vk';
	exec(command, function (error, call, errlog) {
	});
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

// Freesync
function enable_freesync() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/settings-options -freesync-on";
	exec(command, function (error, call, errlog) {
	});
}

function disable_freesync() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/settings-options -freesync-off";
	exec(command, function (error, call, errlog) {
	});
}

// Get path to .desktop file
function getDesktopFile() {
	const fileUrl = document.getElementById('add-apps').value

	const exec = require('child_process').exec;
	const command = "sudo /opt/regataos-prime/scripts/prime-config-external-apps " + fileUrl + "; \
		/opt/regataos-prime/scripts/prime-option-add-apps " + fileUrl;
	exec(command, function (error, call, errlog) {
	});

	document.getElementById('add-apps').value = '';

	setTimeout(function () {
		apps_external_list();
	}, 500);
	setTimeout(function () {
		check_external_apps_status();
	}, 500);
}

// Remove external application
function remove_external_app() {
	const exec = require('child_process').exec;
	const command = "sudo /opt/regataos-prime/scripts/prime-option-remove-apps " + appname + " " + desktop;
	exec(command, function (error, call, errlog) {
	});

	document.getElementById(appname).remove()

	setTimeout(function () {
		apps_external_list();
	}, 500);
	setTimeout(function () {
		check_external_apps_status();
	}, 500);
}

// Set cpu governor configuration
function choose_cpugovernor1() {
	const exec = require('child_process').exec;

	const select = document.getElementById('cpugovernor1');
	const value = select.options[select.selectedIndex].value;

	const command = "sudo /opt/regataos-prime/scripts/cpu-configs -cpu-" + value;
	exec(command, function (error, call, errlog) {
	});

	//Notify user on desktop that restart is required
	const notify_user = value.indexOf("powersave") > -1;
	if (notify_user == '1') {
		const command = "/opt/regataos-prime/scripts/notify -cpu-powersave";
		exec(command, function (error, call, errlog) {
		});

		document.querySelector(".cpu-powersave-desc").style.display = "block";
		document.querySelector(".cpu-performance-desc").style.display = "none";
	}

	const notify_user2 = value.indexOf("performance") > -1;
	if (notify_user2 == '1') {
		const command = "/opt/regataos-prime/scripts/notify -cpu-performance";
		exec(command, function (error, call, errlog) {
		});

		document.querySelector(".cpu-powersave-desc").style.display = "none";
		document.querySelector(".cpu-performance-desc").style.display = "block";
	}
}

function choose_cpugovernor2() {
	const select = document.getElementById('cpugovernor2');
	const value = select.options[select.selectedIndex].value;

	const exec = require('child_process').exec;
	const command = "sudo /opt/regataos-prime/scripts/cpu-configs -cpu-" + value;
	exec(command, function (error, call, errlog) {
	});

	//Notify user on desktop that restart is required
	const notify_user = value.indexOf("powersave") > -1;
	if (notify_user == '1') {
		const command = "/opt/regataos-prime/scripts/notify -cpu-powersave";
		exec(command, function (error, call, errlog) {
		});

		document.querySelector(".cpu-powersave-desc").style.display = "block";
		document.querySelector(".cpu-performance-desc").style.display = "none";
	}

	const notify_user2 = value.indexOf("performance") > -1;
	if (notify_user2 == '1') {
		const command = "/opt/regataos-prime/scripts/notify -cpu-performance";
		exec(command, function (error, call, errlog) {
		});

		document.querySelector(".cpu-powersave-desc").style.display = "none";
		document.querySelector(".cpu-performance-desc").style.display = "block";
	}
}

// Configuration option for KWin compositing
function compositor_config() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = "/opt/regataos-prime/scripts/settings-options -" + config_option;
	exec(command, function (error, call, errlog) {
	});

	setTimeout(function () {
		fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
			if (err) throw err;
			const check_configs = data

			if ((check_configs.indexOf(config_option + "=on") > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";

			} else if ((check_configs.indexOf(config_option) > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "none";
				document.querySelector(`.${config_option}-off`).style.display = "block";

			} else {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";
			}
		});
	}, 1000);
}

// Configuration option to unlock widgets
function unlock_widgets_config() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = "/opt/regataos-prime/scripts/settings-options -" + config_option;
	exec(command, function (error, call, errlog) {
	});

	setTimeout(function () {
		fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
			if (err) throw err;
			const check_configs = data

			if ((check_configs.indexOf(config_option + "=on") > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";

			} else if ((check_configs.indexOf(config_option) > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "none";
				document.querySelector(`.${config_option}-off`).style.display = "block";

			} else {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";
			}
		});
	}, 1000);
}

// Configuration option to AMF
function amf_config() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = "/opt/regataos-prime/scripts/settings-options -" + config_option;
	exec(command, function (error, call, errlog) {
	});

	setTimeout(function () {
		fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
			if (err) throw err;
			const check_configs = data

			if ((check_configs.indexOf(config_option + "=on") > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "block";
				document.querySelector(`.${config_option}-off`).style.display = "none";

			} else if ((check_configs.indexOf(config_option) > -1) == "1") {
				document.querySelector(`.${config_option}-on`).style.display = "none";
				document.querySelector(`.${config_option}-off`).style.display = "block";

			} else {
				document.querySelector(`.${config_option}-on`).style.display = "none";
				document.querySelector(`.${config_option}-off`).style.display = "block";
			}
		});
	}, 1000);
}
