// Settings page options

// Prevent Screen Tearing
function run_config_option() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	var command = "/opt/regataos-prime/scripts/settings-options -" + config_option;
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	setTimeout(function() {
	fs.readFile('/tmp/regataos-prime/config/regataos-prime.conf', (err, data) => {
	if (err) throw err;
	var check_configs = data

	if ((check_configs.indexOf(config_option + "=on") > -1) == "1") {
		$("." + config_option + "-on").css("display", "block")
		$("." + config_option + "-off").css("display", "none")

	} else if ((check_configs.indexOf(config_option) > -1) == "1") {
		$("." + config_option + "-on").css("display", "none")
		$("." + config_option + "-off").css("display", "block")

	} else {
		$("." + config_option + "-on").css("display", "block")
		$("." + config_option + "-off").css("display", "none")
	}
	});
	}, 200);
}

// Choose gpu to render
function choose_gpu1() {
	const exec = require('child_process').exec;

	var select = document.getElementById('selectnav1');
	var value = select.options[select.selectedIndex].value;

	var command = "sudo /opt/regataos-prime/scripts/gpu-render -" + value;
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	//Notify user on desktop that restart is required
	var notify_user = value.indexOf("dgpu") > -1;
	if (notify_user == '1') {
		var command = "/opt/regataos-prime/scripts/notify -restart";
		console.log(command);
		exec(command,function(error,call,errlog){
		});
	}
}

function choose_gpu2() {
	var select = document.getElementById('selectnav2');
	var value = select.options[select.selectedIndex].value;

	const exec = require('child_process').exec;
	var command = "sudo /opt/regataos-prime/scripts/gpu-render -" + value;
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	//Notify user on desktop that restart is required
	var notify_user = value.indexOf("igpu") > -1;
	if (notify_user == '1') {
		var command = "/opt/regataos-prime/scripts/notify -restart";
		console.log(command);
		exec(command,function(error,call,errlog){
		});
	}
}

// Open display
function display() {
	const exec = require('child_process').exec;
	var command = "kcmshell5 kcm_kscreen";
	console.log(command);
	exec(command,function(error,call,errlog){
	});
}

// Open dgpu-teste
function teste_dgpu_gl() {
	const exec = require('child_process').exec;
	var command = 'sleep 1; /opt/regataos-prime/scripts/test-dgpu -gl';
	console.log(command);
	exec(command,function(error,call,errlog){
	});
}

function teste_dgpu_vk() {
	const exec = require('child_process').exec;
	var command = 'sleep 1; /opt/regataos-prime/scripts/test-dgpu -vk';
	console.log(command);
	exec(command,function(error,call,errlog){
	});
}

// Open nvidia-settings
function nvidia_driver() {
	const exec = require('child_process').exec;
	var command = "nvidia-settings";
	console.log(command);
	exec(command,function(error,call,errlog){
	});
}

// Freesync
function enable_freesync() {
	const exec = require('child_process').exec;
	var command = "/opt/regataos-prime/scripts/settings-options -freesync-on";
	console.log(command);
	exec(command,function(error,call,errlog){
	});
}

function disable_freesync() {
	const exec = require('child_process').exec;
	var command = "/opt/regataos-prime/scripts/settings-options -freesync-off";
	console.log(command);
	exec(command,function(error,call,errlog){
	});
}

// Get path to .desktop file
$(document).ready(function(){
	$('input[id="add-apps"]').change(function(e){
		var fileUrl = document.getElementById('add-apps').value

		const exec = require('child_process').exec;
		var command = "sudo /opt/regataos-prime/scripts/prime-config-external-apps " + fileUrl + "; /opt/regataos-prime/scripts/prime-option-add-apps " + fileUrl;
		console.log(command);
		exec(command,function(error,call,errlog){
		});

		document.getElementById('add-apps').value='';

		setTimeout(function(){
			apps_external_list();
		}, 500);
		setTimeout(function(){
			check_external_apps_status();
		}, 500);
	});
});

// Remove external application
function remove_external_app() {
	const exec = require('child_process').exec;
	var command = "sudo /opt/regataos-prime/scripts/prime-option-remove-apps " + appname + " " + desktop;
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	document.getElementById(appname).remove()

	setTimeout(function(){
		apps_external_list();
	}, 500);
	setTimeout(function(){
		check_external_apps_status();
	}, 500);
}

// Set cpu governor configuration
function choose_cpugovernor1() {
	const exec = require('child_process').exec;

	var select = document.getElementById('cpugovernor1');
	var value = select.options[select.selectedIndex].value;

	var command = "sudo /opt/regataos-prime/scripts/cpu-configs -cpu-" + value;
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	//Notify user on desktop that restart is required
	var notify_user = value.indexOf("powersave") > -1;
	if (notify_user == '1') {
		var command = "/opt/regataos-prime/scripts/notify -cpu-powersave";
		console.log(command);
		exec(command,function(error,call,errlog){
		});

		$(".cpu-powersave-desc").css("display", "block")
		$(".cpu-performance-desc").css("display", "none")
	}

	var notify_user = value.indexOf("performance") > -1;
	if (notify_user == '1') {
		var command = "/opt/regataos-prime/scripts/notify -cpu-performance";
		console.log(command);
		exec(command,function(error,call,errlog){
		});

		$(".cpu-powersave-desc").css("display", "none")
		$(".cpu-performance-desc").css("display", "block")
	}
}

function choose_cpugovernor2() {
	var select = document.getElementById('cpugovernor2');
	var value = select.options[select.selectedIndex].value;

	const exec = require('child_process').exec;
	var command = "sudo /opt/regataos-prime/scripts/cpu-configs -cpu-" + value;
	console.log(command);
	exec(command,function(error,call,errlog){
	});

	//Notify user on desktop that restart is required
	var notify_user = value.indexOf("powersave") > -1;
	if (notify_user == '1') {
		var command = "/opt/regataos-prime/scripts/notify -cpu-powersave";
		console.log(command);
		exec(command,function(error,call,errlog){
		});

		$(".cpu-powersave-desc").css("display", "block")
		$(".cpu-performance-desc").css("display", "none")
	}

	var notify_user = value.indexOf("performance") > -1;
	if (notify_user == '1') {
		var command = "/opt/regataos-prime/scripts/notify -cpu-performance";
		console.log(command);
		exec(command,function(error,call,errlog){
		});

		$(".cpu-powersave-desc").css("display", "none")
		$(".cpu-performance-desc").css("display", "block")
	}
}
