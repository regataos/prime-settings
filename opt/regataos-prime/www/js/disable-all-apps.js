// Enable or disable running with dGPU for all applications
function disable_all_apps() {
const exec = require('child_process').exec;
var fs = require("fs");

var checkbox1 = document.getElementById('switch-shadow-all-apps');
if(checkbox1.checked) {
	var command = "/opt/regataos-prime/scripts/prime-options -disable-run-dgpu; /opt/regataos-prime/scripts/notify -disable-run-dgpu";
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	setTimeout(function(){

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
		var installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
		var app_nickname = apps[i].nickname
		if ((installed_apps.indexOf(app_nickname) > -1) == "1") {

			var executable = apps[i].executable;
			var executable = executable.replace(/snap/g, '');
			var executable = executable.replace(/run/g, '');
			var executable = executable.trim()

			//Make sure the app uses dGPU by default
			var status_dgpu = apps[i].dgpu;
			if (((status_dgpu.indexOf("activate") > -1) == "1") || ((status_dgpu.indexOf("deactivate") > -1) == "1")) {
				var command = 'echo "' + apps[i].nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
				console.log(command);
				exec(command,function(error,call,errlog){
				});
			}
		}
		}
	}
	return;
	});
	});
	}, 300);

} else {
	var command = "/opt/regataos-prime/scripts/prime-options -enable-run-dgpu; /opt/regataos-prime/scripts/notify -enable-run-dgpu";
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	setTimeout(function(){

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
		var installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
		var app_nickname = apps[i].nickname
		if ((installed_apps.indexOf(app_nickname) > -1) == "1") {

			var executable = apps[i].executable;
			var executable = executable.replace(/snap/g, '');
			var executable = executable.replace(/run/g, '');
			var executable = executable.trim()

			//Make sure the app uses dGPU by default
			var status_dgpu = apps[i].dgpu;
			if (((status_dgpu.indexOf("activate") > -1) == "1") || ((status_dgpu.indexOf("deactivate") > -1) == "1")) {
				var command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
				console.log(command);
				exec(command,function(error,call,errlog){
				});
			}
		}
		}
	}
	return;
	});
	});
	}, 300);
}
}

function enable_all_apps() {
const exec = require('child_process').exec;
var fs = require("fs");

var checkbox2 = document.getElementById('switch-shadow2-all-apps');
if(!checkbox2.checked) {
	var command = "/opt/regataos-prime/scripts/prime-options -disable-run-dgpu; /opt/regataos-prime/scripts/notify -disable-run-dgpu";
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	setTimeout(function(){

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
		var installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
		var app_nickname = apps[i].nickname
		if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
	
			var executable = apps[i].executable;
			var executable = executable.replace(/snap/g, '');
			var executable = executable.replace(/run/g, '');
			var executable = executable.trim()

			//Make sure the app uses dGPU by default
			var status_dgpu = apps[i].dgpu;
			if (((status_dgpu.indexOf("activate") > -1) == "1") || ((status_dgpu.indexOf("deactivate") > -1) == "1")) {
				var command = 'echo "' + apps[i].nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
				console.log(command);
				exec(command,function(error,call,errlog){
				});
			}
		}
		}
	}
	return;
	});
	});
	}, 300);

} else {
	var command = "/opt/regataos-prime/scripts/prime-options -enable-run-dgpu; /opt/regataos-prime/scripts/notify -enable-run-dgpu";
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	setTimeout(function(){

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
		var installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
		var app_nickname = apps[i].nickname
		if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
	
			var executable = apps[i].executable;
			var executable = executable.replace(/snap/g, '');
			var executable = executable.replace(/run/g, '');
			var executable = executable.trim()

			//Make sure the app uses dGPU by default
			var status_dgpu = apps[i].dgpu;
			if (((status_dgpu.indexOf("activate") > -1) == "1") || ((status_dgpu.indexOf("deactivate") > -1) == "1")) {
				var command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
				console.log(command);
				exec(command,function(error,call,errlog){
				});
			}
		}
		}
	}
	return;
	});
	});
	}, 300);
}
}

// Check the list of apps running using the dGPU disabled
function check_apps_status() {
	var fs = require("fs");

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
		var installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
		var app_nickname = apps[i].nickname
		if ((installed_apps.indexOf(app_nickname) > -1) == "1") {

		//Make sure the app uses dGPU by default
		var status_dgpu = apps[i].dgpu;
		if (((status_dgpu.indexOf("activate") > -1) == "1") || ((status_dgpu.indexOf("deactivate") > -1) == "1")) {

		// Check if dGPU has been disabled for all apps
		var without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

		if ((without_dgpu.indexOf(apps[i].nickname + "=on") > -1) == "1") {
			document.getElementById("switch-shadow-" + apps[i].nickname).checked = false;
			document.getElementById("switch-shadow2-" + apps[i].nickname).checked = true;
			$(".switch-off-" + apps[i].nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].nickname + " + label").css("display", "block")
			$("." + apps[i].nickname + "-off").css("display", "none")
			$("." + apps[i].nickname + "-on").css("display", "block")

		} else if ((without_dgpu.indexOf(apps[i].nickname) > -1) == "1") {
			document.getElementById("switch-shadow-" + apps[i].nickname).checked = true;
			document.getElementById("switch-shadow2-" + apps[i].nickname).checked = false;
			$(".switch-off-" + apps[i].nickname + " + label").css("display", "block")
			$(".switch-on-" + apps[i].nickname + " + label").css("display", "none")
			$("." + apps[i].nickname + "-off").css("display", "block")
			$("." + apps[i].nickname + "-on").css("display", "none")

		} else {
			document.getElementById("switch-shadow-" + apps[i].nickname).checked = false;
			document.getElementById("switch-shadow2-" + apps[i].nickname).checked = true;
			$(".switch-off-" + apps[i].nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].nickname + " + label").css("display", "block")
			$("." + apps[i].nickname + "-off").css("display", "none")
			$("." + apps[i].nickname + "-on").css("display", "block")
		}
		}
		
		}
		}
	}
	return;
	});
	});
}
