// Check whether running with dGPU is enabled or disabled for all applications
function all_apps_buttom() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;

		const status1 = "one-apps=on"
		const status2 = "one-apps=off"

		const disable_all_apps = data.indexOf(status1) > -1;
		const enable_all_apps = data.indexOf(status2) > -1;

		if (disable_all_apps == '1') {
			document.querySelector(".all-apps").style.display = "block";
			document.querySelector(".all-apps2").style.display = "none";
			document.getElementById("switch-shadow-all-apps").checked = false;

		} else if (enable_all_apps == '1') {
			document.querySelector(".all-apps").style.display = "none";
			document.querySelector(".all-apps2").style.display = "block";
			document.getElementById("switch-shadow2-all-apps").checked = false;

		} else {
			document.querySelector(".all-apps").style.display = "block";
			document.querySelector(".all-apps2").style.display = "none";
			document.getElementById("switch-shadow-all-apps").checked = false;
		}
	});
}
all_apps_buttom();

// Check support for FreeSync and make sure it is enabled
function check_freesync() {
	const fs = require('fs');

	// Check support for FreeSync and make sure it is enabled
	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;
		const check_configs = data

		if ((check_configs.indexOf("freesync-supported=true") > -1) == "1") {
			document.getElementById("freesync-toggle").style.display = "block";
			document.getElementById("tearfree-toggle").style.display = "none";

		} else if ((check_configs.indexOf("freesync-supported=false") > -1) == "1") {
			document.getElementById("freesync-toggle").style.display = "none";
			document.getElementById("tearfree-toggle").style.display = "block";

		} else {
			document.getElementById("freesync-toggle").style.display = "none";
			document.getElementById("tearfree-toggle").style.display = "block";
		}
	});

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;

		const status1 = "freesync=on"
		const status2 = "freesync=off"

		const freesync_on = data.indexOf(status1) > -1;
		const freesync_off = data.indexOf(status2) > -1;

		if (freesync_on == '1') {
			document.querySelector(".freesync-on").style.display = "block";
			document.querySelector(".freesync-off").style.display = "none";
			document.querySelector(".switch--shadow-freesync + label").style.display = "block";
			document.querySelector(".switch--shadow2-freesync + label").style.display = "none";
			document.getElementById("switch-shadow-freesync").checked = false;

		} else if (freesync_off == '1') {
			document.querySelector(".freesync-on").style.display = "none";
			document.querySelector(".freesync-off").style.display = "block";
			document.querySelector(".switch--shadow-freesync + label").style.display = "none";
			document.querySelector(".switch--shadow2-freesync + label").style.display = "block";
			document.getElementById("switch-shadow2-freesync").checked = false;

		} else {
			document.querySelector(".freesync-on").style.display = "block";
			document.querySelector(".freesync-off").style.display = "none";
			document.querySelector(".switch--shadow-freesync + label").style.display = "block";
			document.querySelector(".switch--shadow2-freesync + label").style.display = "none";
			document.getElementById("switch-shadow-freesync").checked = false;
		}
	});
}

// Choose which GPU to render everything
function option_choose_gpu() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;

		const status1 = "render=igpu"
		const status2 = "render=dgpu"

		const render_igpu = data.indexOf(status1) > -1;
		const render_dgpu = data.indexOf(status2) > -1;

		if (render_igpu == '1') {
			document.getElementById("selectnav1").style.display = "block";
			document.getElementById("selectnav2").style.display = "none";
			document.querySelector(".render-igpu-desc").style.display = "block";
			document.querySelector(".render-dgpu-desc").style.display = "none";

		} else if (render_dgpu == '1') {
			document.getElementById("selectnav1").style.display = "none";
			document.getElementById("selectnav2").style.display = "block";
			document.querySelector(".render-igpu-desc").style.display = "none";
			document.querySelector(".render-dgpu-desc").style.display = "block";

		} else {
			document.getElementById("selectnav1").style.display = "block";
			document.getElementById("selectnav2").style.display = "none";
			document.querySelector(".render-igpu-desc").style.display = "block";
			document.querySelector(".render-dgpu-desc").style.display = "none";
		}
	});
}
option_choose_gpu();

//Select performance or energy savings for the description
function option_choose_gpu_desc() {
	const fs = require('fs');

	fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
		if (!err) {
			document.getElementById("selecte-gpu").style.display = "block";
			return;
		} else {
			document.getElementById("selecte-gpu").style.display = "none";
		}
	});

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;

		const status1 = "render=igpu"
		const status2 = "render=dgpu"

		const render_igpu = data.indexOf(status1) > -1;
		const render_dgpu = data.indexOf(status2) > -1;

		if (render_igpu == '1') {
			document.querySelector(".render-igpu-desc").style.display = "block";
			document.querySelector(".render-dgpu-desc").style.display = "none";

		} else if (render_dgpu == '1') {
			document.querySelector(".render-igpu-desc").style.display = "none";
			document.querySelector(".render-dgpu-desc").style.display = "block";

		} else {
			document.querySelector(".render-igpu-desc").style.display = "block";
			document.querySelector(".render-dgpu-desc").style.display = "none";
		}
	});
}

// Prevent Screen Tearing
function check_tearfree() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;
		const check_configs = data

		if ((check_configs.indexOf("tearfree=on") > -1) == "1") {
			document.querySelector(".switch-on-tearfree + label").style.display = "block";
			document.querySelector(".switch-off-tearfree + label").style.display = "none";
			document.querySelector(".tearfree-on").style.display = "block";
			document.querySelector(".tearfree-off").style.display = "none";

		} else if ((check_configs.indexOf("tearfree=off") > -1) == "1") {
			document.querySelector(".switch-on-tearfree + label").style.display = "none";
			document.querySelector(".switch-off-tearfree + label").style.display = "block";
			document.querySelector(".tearfree-on").style.display = "none";
			document.querySelector(".tearfree-off").style.display = "block";

		} else {
			document.querySelector(".switch-on-tearfree + label").style.display = "block";
			document.querySelector(".switch-off-tearfree + label").style.display = "none";
			document.querySelector(".tearfree-on").style.display = "block";
			document.querySelector(".tearfree-off").style.display = "none";
		}
	});
}
check_tearfree();

// Check cpu governor configuration
function check_cpu_governor() {
	const fs = require('fs');

	fs.access('/etc/regataos-prime/cpu-governor.txt', (err) => {
		if (!err) {
			fs.readFile('/etc/regataos-prime/cpu-governor.txt', (err, data) => {
				if (err) throw err;
				const check_configs = data

				if ((check_configs.indexOf("performance") > -1) == "1") {
					document.getElementById("cpugovernor1").style.display = "none";
					document.getElementById("cpugovernor2").style.display = "block";
					document.querySelector(".cpu-powersave-desc").style.display = "none";
					document.querySelector(".cpu-performance-desc").style.display = "block";

				} else if ((check_configs.indexOf("powersave") > -1) == "1") {
					document.getElementById("cpugovernor1").style.display = "block";
					document.getElementById("cpugovernor2").style.display = "none";
					document.querySelector(".cpu-powersave-desc").style.display = "block";
					document.querySelector(".cpu-performance-desc").style.display = "none";

				} else {
					document.getElementById("cpugovernor1").style.display = "block";
					document.getElementById("cpugovernor2").style.display = "none";
					document.querySelector(".cpu-powersave-desc").style.display = "block";
					document.querySelector(".cpu-performance-desc").style.display = "none";
				}
			});

		} else {
			document.getElementById("cpugovernor1").style.display = "block";
			document.getElementById("cpugovernor2").style.display = "none";
			document.querySelector(".cpu-powersave-desc").style.display = "block";
			document.querySelector(".cpu-performance-desc").style.display = "none";
		}
	});
}
check_cpu_governor();

// Check the configuration for the KWin compositor
function check_option_compositor() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;
		const check_compositor = data

		if ((check_compositor.indexOf("compositor=on") > -1) == "1") {
			document.getElementById("compositor1").style.display = "block";
			document.getElementById("compositor2").style.display = "none";
			document.querySelector(".compositor-on").style.display = "block";
			document.querySelector(".compositor-off").style.display = "none";

		} else if ((check_compositor.indexOf("compositor=off") > -1) == "1") {
			document.getElementById("compositor1").style.display = "none";
			document.getElementById("compositor2").style.display = "block";
			document.querySelector(".compositor-on").style.display = "none";
			document.querySelector(".compositor-off").style.display = "block";

		} else {
			document.getElementById("compositor1").style.display = "block";
			document.getElementById("compositor2").style.display = "none";
			document.querySelector(".compositor-on").style.display = "block";
			document.querySelector(".compositor-off").style.display = "none";
		}
	});
}
check_option_compositor();

// Check whether widgets are locked or unlocked
function check_option_unlock_widgets() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;
		const check_unlock_widgets = data

		if ((check_unlock_widgets.indexOf("unlockwidgets=on") > -1) == "1") {
			document.getElementById("unlockwidgets1").style.display = "block";
			document.getElementById("unlockwidgets2").style.display = "none";
			document.querySelector(".unlockwidgets-on").style.display = "block";
			document.querySelector(".unlockwidgets-off").style.display = "none";

		} else if ((check_unlock_widgets.indexOf("unlockwidgets=off") > -1) == "1") {
			document.getElementById("unlockwidgets1").style.display = "none";
			document.getElementById("unlockwidgets2").style.display = "block";
			document.querySelector(".unlockwidgets-on").style.display = "none";
			document.querySelector(".unlockwidgets-off").style.display = "block";

		} else {
			document.getElementById("unlockwidgets1").style.display = "block";
			document.getElementById("unlockwidgets2").style.display = "none";
			document.querySelector(".unlockwidgets-on").style.display = "block";
			document.querySelector(".unlockwidgets-off").style.display = "none";
		}
	});
}
check_option_unlock_widgets();

// Check AMD AMF Configuration
function check_option_amf() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
		if (err) throw err;
		const check_amf = data

		if ((check_amf.indexOf("amf=on") > -1) == "1") {
			document.getElementById("amf1").style.display = "block";
			document.getElementById("amf2").style.display = "none";

			document.querySelector(".amf-on").style.display = "block";
			document.querySelector(".amf-off").style.display = "none";

		} else if ((check_amf.indexOf("amf=off") > -1) == "1") {
			document.getElementById("amf1").style.display = "none";
			document.getElementById("amf2").style.display = "block";
			document.querySelector(".amf-on").style.display = "none";
			document.querySelector(".amf-off").style.display = "block";

		} else {
			document.getElementById("amf1").style.display = "none";
			document.getElementById("amf2").style.display = "block";
			document.querySelector(".amf-on").style.display = "none";
			document.querySelector(".amf-off").style.display = "block";
		}
	});
}
check_option_amf();

setInterval(function () {
	option_choose_gpu_desc();
	check_freesync();
}, 100);
