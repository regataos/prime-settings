// Enable or disable running with dGPU for all applications
function disable_all_external_apps() {
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
	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
	fs.readFile("/tmp/regataos-prime/config/external-app/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
			var command = 'echo "' + apps[i].app_nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
			console.log(command);
			exec(command,function(error,call,errlog){
			});
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
	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
	fs.readFile("/tmp/regataos-prime/config/external-app/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
			var command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
			console.log(command);
			exec(command,function(error,call,errlog){
			});
		}
	}
	return;
	});
	});
	}, 300);
}
}

function enable_all_external_apps() {
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
	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
	fs.readFile("/tmp/regataos-prime/config/external-app/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
			var command = 'echo "' + apps[i].app_nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
			console.log(command);
			exec(command,function(error,call,errlog){
			});
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
	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
	fs.readFile("/tmp/regataos-prime/config/external-app/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {
			var command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
			console.log(command);
			exec(command,function(error,call,errlog){
			});
		}
	}
	return;
	});
	});
	}, 300);
}
}

// Check the list of apps running using the dGPU disabled
function check_external_apps_status() {
	var fs = require("fs");

	var files = [];

	// Read JSON files with the list of apps
	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
	fs.readFile("/tmp/regataos-prime/config/external-app/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		// Read the list of apps that should appear in each block
		for (var i = 0; i < apps.length; i++) {

		// Check if dGPU has been disabled for all apps
		var without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

		if ((without_dgpu.indexOf(apps[i].app_nickname + "=on") > -1) == "1") {
			document.getElementById("switch-shadow-" + apps[i].app_nickname).checked = false;
			document.getElementById("switch-shadow2-" + apps[i].app_nickname).checked = true;
			$(".switch-off-" + apps[i].app_nickname + " + label").css("display", "none")
			$(".switch-on-" + apps[i].app_nickname + " + label").css("display", "block")
			$("." + apps[i].app_nickname + "-off").css("display", "none")
			$("." + apps[i].app_nickname + "-on").css("display", "block")

		} else if ((without_dgpu.indexOf(apps[i].app_nickname) > -1) == "1") {
			document.getElementById("switch-shadow-" + apps[i].app_nickname).checked = true;
			document.getElementById("switch-shadow2-" + apps[i].app_nickname).checked = false;
			$(".switch-off-" + apps[i].app_nickname + " + label").css("display", "block")
			$(".switch-on-" + apps[i].app_nickname + " + label").css("display", "none")
			$("." + apps[i].app_nickname + "-off").css("display", "block")
			$("." + apps[i].app_nickname + "-on").css("display", "none")

		} else {
			document.getElementById("switch-shadow-" + apps[i].app_nickname).checked = false;
			document.getElementById("switch-shadow2-" + apps[i].app_nickname).checked = true;
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
