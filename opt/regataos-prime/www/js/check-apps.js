// Check that the application is installed, as well as the current configuration to run with the dGPU
function check_apps() {
	var fs = require("fs");

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {

		// Make sure the app is running with the device's dGPU
		var without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

		if ((without_dgpu.indexOf(apps[i].nickname + "=on") > -1) == "1") {
			$(".switch-off-" + apps[i].nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].nickname + " + label").css("display", "block")
			$("." + apps[i].nickname + "-off").css("display", "none")
			$("." + apps[i].nickname + "-on").css("display", "block")

		} else if ((without_dgpu.indexOf(apps[i].nickname) > -1) == "1") {
			$(".switch-off-" + apps[i].nickname + " + label").css("display", "block")
			$(".switch-on-" + apps[i].nickname + " + label").css("display", "none")
			$("." + apps[i].nickname + "-off").css("display", "block")
			$("." + apps[i].nickname + "-on").css("display", "none")

		} else {
			$(".switch-off-" + apps[i].nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].nickname + " + label").css("display", "block")
			$("." + apps[i].nickname + "-off").css("display", "none")
			$("." + apps[i].nickname + "-on").css("display", "block")
		}
		}
	}
	return;
	});
	});
}

check_apps();

function check_external_apps() {
	var fs = require("fs");

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
	fs.readFile("/tmp/regataos-prime/config/external-app/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {

		// Make sure the app is running with the device's dGPU
		var without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

		if ((without_dgpu.indexOf(apps[i].app_nickname + "=on") > -1) == "1") {
			$(".switch-off-" + apps[i].app_nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].app_nickname + " + label").css("display", "block")
			$("." + apps[i].app_nickname + "-off").css("display", "none")
			$("." + apps[i].app_nickname + "-on").css("display", "block")

		} else if ((without_dgpu.indexOf(apps[i].app_nickname) > -1) == "1") {
			$(".switch-off-" + apps[i].app_nickname + " + label").css("display", "block")
			$(".switch-on-" + apps[i].app_nickname + " + label").css("display", "none")
			$("." + apps[i].app_nickname + "-off").css("display", "block")
			$("." + apps[i].app_nickname + "-on").css("display", "none")

		} else {
			$(".switch-off-" + apps[i].app_nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].app_nickname + " + label").css("display", "block")
			$("." + apps[i].app_nickname + "-off").css("display", "none")
			$("." + apps[i].app_nickname + "-on").css("display", "block")
		}
		}
	}
	return;
	});
	});
}

check_external_apps();
