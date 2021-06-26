// Check whether running with dGPU is enabled or disabled for all applications
function all_apps_buttom() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
	if (err) throw err;

		var data = data
		var status1 = "one-apps=on"
		var status2 = "one-apps=off"
	
		var disable_all_apps = data.indexOf(status1) > -1;
		var enable_all_apps = data.indexOf(status2) > -1;
	
		if (disable_all_apps == '1') {
			$(".all-apps").css("display", "block")
			$(".all-apps2").css("display", "none")
			document.getElementById("switch-shadow-all-apps").checked = false;
		} else if (enable_all_apps == '1') {
			$(".all-apps").css("display", "none")
			$(".all-apps2").css("display", "block")
			document.getElementById("switch-shadow2-all-apps").checked = false;
		} else {
			$(".all-apps").css("display", "block")
			$(".all-apps2").css("display", "none")
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
	var check_configs = data
	
	if ((check_configs.indexOf("freesync-supported=true") > -1) == "1") {
		$("#freesync-toggle").css("display", "block");
		$("#tearfree-toggle").css("display", "none");
	
	} else if ((check_configs.indexOf("freesync-supported=false") > -1) == "1") {
		$("#freesync-toggle").css("display", "none");
		$("#tearfree-toggle").css("display", "block");
	
	} else {
		$("#freesync-toggle").css("display", "none");
		$("#tearfree-toggle").css("display", "block");
	}
	});

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
	if (err) throw err;

		var data = data
		var status1 = "freesync=on"
		var status2 = "freesync=off"
	
		var freesync_on = data.indexOf(status1) > -1;
		var freesync_off = data.indexOf(status2) > -1;
	
		if (freesync_on == '1') {
			$(".freesync-on").css("display", "block")
			$(".freesync-off").css("display", "none")
			$(".switch--shadow-freesync + label").css("display", "block")
			$(".switch--shadow2-freesync + label").css("display", "none")
			document.getElementById("switch-shadow-freesync").checked = false;
		} else if (freesync_off == '1') {
			$(".freesync-off").css("display", "block")
			$(".freesync-on").css("display", "none")
			$(".switch--shadow-freesync + label").css("display", "none")
			$(".switch--shadow2-freesync + label").css("display", "block")
			document.getElementById("switch-shadow2-freesync").checked = false;
		} else {
			$(".freesync-on").css("display", "block")
			$(".freesync-off").css("display", "none")
			$(".switch--shadow-freesync + label").css("display", "block")
			$(".switch--shadow2-freesync + label").css("display", "none")
			document.getElementById("switch-shadow-freesync").checked = false;
		}
	});
}

// Choose which GPU to render everything
function option_choose_gpu() {
	const fs = require('fs');
	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
	if (err) throw err;

		var data = data
		var status1 = "render=igpu"
		var status2 = "render=dgpu"

		var render_igpu = data.indexOf(status1) > -1;
		var render_dgpu = data.indexOf(status2) > -1;

		if (render_igpu == '1') {
			$("#selectnav1").css("display", "block")
			$(".render-igpu-desc").css("display", "block")
			$("#selectnav2").css("display", "none")
			$(".render-dgpu-desc").css("display", "none")
		} else if (render_dgpu == '1') {
			$("#selectnav1").css("display", "none")
			$(".render-igpu-desc").css("display", "none")
			$("#selectnav2").css("display", "block")
			$(".render-dgpu-desc").css("display", "block")
		} else {
			$("#selectnav1").css("display", "block")
			$(".render-igpu-desc").css("display", "block")
			$("#selectnav2").css("display", "none")
			$(".render-dgpu-desc").css("display", "none")
		}
	});
}
option_choose_gpu();

//Select performance or energy savings for the description
function option_choose_gpu_desc() {
	const fs = require('fs');
	fs.access('/tmp/regataos-prime/use-hybrid-graphics.txt', (err) => {
	if (!err) {
		$("#selecte-gpu").css("display", "block")
		return;
	} else {
		$("#selecte-gpu").css("display", "none")
	}
	});

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
	if (err) throw err;

		var data = data
		var status1 = "render=igpu"
		var status2 = "render=dgpu"

		var render_igpu = data.indexOf(status1) > -1;
		var render_dgpu = data.indexOf(status2) > -1;

		if (render_igpu == '1') {
			$(".render-igpu-desc").css("display", "block")
			$(".render-dgpu-desc").css("display", "none")
		} else if (render_dgpu == '1') {
			$(".render-igpu-desc").css("display", "none")
			$(".render-dgpu-desc").css("display", "block")
		} else {
			$(".render-igpu-desc").css("display", "block")
			$(".render-dgpu-desc").css("display", "none")
		}
	});
}

// Prevent Screen Tearing
function check_tearfree() {
	const fs = require('fs');

	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
	if (err) throw err;
	var check_configs = data

	if ((check_configs.indexOf("tearfree=on") > -1) == "1") {
		$(".switch-on-tearfree + label").css("display", "block")
		$(".switch-off-tearfree + label").css("display", "none")
		$(".tearfree-on").css("display", "block")
		$(".tearfree-off").css("display", "none")

	} else if ((check_configs.indexOf("tearfree=off") > -1) == "1") {
		$(".switch-on-tearfree + label").css("display", "none")
		$(".switch-off-tearfree + label").css("display", "block")
		$(".tearfree-on").css("display", "none")
		$(".tearfree-off").css("display", "block")

	} else {
		$(".switch-on-tearfree + label").css("display", "block")
		$(".switch-off-tearfree + label").css("display", "none")
		$(".tearfree-on").css("display", "block")
		$(".tearfree-off").css("display", "none")
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
			var check_configs = data

			if ((check_configs.indexOf("performance") > -1) == "1") {
				$("select#cpugovernor1").css("display", "none")
				$("select#cpugovernor2").css("display", "block")
				$(".cpu-powersave-desc").css("display", "none")
				$(".cpu-performance-desc").css("display", "block")

			} else if ((check_configs.indexOf("powersave") > -1) == "1") {
				$("select#cpugovernor1").css("display", "block")
				$("select#cpugovernor2").css("display", "none")
				$(".cpu-powersave-desc").css("display", "block")
				$(".cpu-performance-desc").css("display", "none")

			} else {
				$("select#cpugovernor1").css("display", "block")
				$("select#cpugovernor2").css("display", "none")
				$(".cpu-powersave-desc").css("display", "block")
				$(".cpu-performance-desc").css("display", "none")
			}
		});

	} else {
		$("select#cpugovernor1").css("display", "block")
		$("select#cpugovernor2").css("display", "none")
		$(".cpu-powersave-desc").css("display", "block")
		$(".cpu-performance-desc").css("display", "none")
	}
	});
}
check_cpu_governor();

setInterval(function() {
	option_choose_gpu_desc();
	check_freesync();
}, 100);
