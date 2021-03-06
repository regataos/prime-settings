// Capture information about the GPU with the RadeonTop utility
function run_radeontop() {
	const exec = require('child_process').exec;
	const command = "ps -C radeontop > /dev/null; if [ $? = 1 ] ; then rm -f /tmp/regataos-prime/radeontop.log; radeontop -d /tmp/regataos-prime/radeontop.log; fi";
	exec(command, (error, stdout, stderr) => {
	});
}
run_radeontop();

// Capture information about using GPU
//Capture the discrete GPU usage
function gpu_usage() {
	const exec = require('child_process').exec;
	const command = "echo $(/opt/regataos-prime/scripts/hardware-info -gpu-usage)";
	exec(command, (error, stdout, stderr) => {
		if (stdout.length <= 1) {
			document.getElementById("gpu-usage").style.strokeDashoffset = "calc(440 - (440 * 0) / 100)";
			document.getElementById("gpu-usage-number").innerHTML = "0";
		} else {
			document.getElementById("gpu-usage").style.strokeDashoffset = "calc(440 - (440 * " + stdout + ") / 100)";
			document.getElementById("gpu-usage-number").innerHTML = stdout.trim();
		}
	});
}

setInterval(function () {
	gpu_usage();
}, 1000);

//Capture the discrete GPU temp
function gpu_temp() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -gpu-temp";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("gpu-temp").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	gpu_temp();
}, 1000);

//Capture the discrete GPU frequency
function gpu_freq() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -gpu-freq";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("gpu-freq").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	gpu_freq();
}, 1000);

// Capture information about using VRAM
//Capture total amount of RAM
function vram_size() {
	const fs = require("fs");
	const totalVramSize = fs.readFileSync("/tmp/regataos-prime/config/system-info/total-vram-size.txt", "utf8");

	document.getElementById("vram-size").innerHTML = totalVramSize;
}
vram_size();

//Capture the discrete GPU video memory (VRAM) frequency
function vram_freq() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -vram-freq";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("vram-freq").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	vram_freq();
}, 1000);

//Capture the discrete GPU video memory (VRAM) usage
function vram_usage() {
	const exec = require('child_process').exec;
	const command = "echo $(/opt/regataos-prime/scripts/hardware-info -vram-usage)";
	exec(command, (error, stdout, stderr) => {
		if (stdout.length <= 1) {
			document.getElementById("vram-usage").style.strokeDashoffset = "calc(440 - (440 * 0) / 100)";
			document.getElementById("vram-usage-number").innerHTML = "0";
		} else {
			document.getElementById("vram-usage").style.strokeDashoffset = "calc(440 - (440 * " + stdout + ") / 100)";
			document.getElementById("vram-usage-number").innerHTML = stdout.trim();
		}
	});
}

setInterval(function () {
	vram_usage();
}, 1000);

// Capture information about using CPU
function cpu_use() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -cpu-use";
	exec(command, (error, stdout, stderr) => {
	});
}

function cpu_usage() {
	const exec = require('child_process').exec;
	const command = "cat /tmp/regataos-prime/cpu-usage.log";
	exec(command, (error, stdout, stderr) => {
		if (stdout.length <= 1) {
			document.getElementById("cpu-usage").style.strokeDashoffset = "calc(440 - (440 * 0) / 100)";
			document.getElementById("cpu-usage-number").innerHTML = "0";
		} else {
			document.getElementById("cpu-usage").style.strokeDashoffset = "calc(440 - (440 * " + stdout + ") / 100)";
			document.getElementById("cpu-usage-number").innerHTML = stdout.trim();
		}
	});
}

setInterval(function () {
	cpu_use();
	cpu_usage();
}, 1000);

function cpu_freq() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -cpu-freq";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("cpu-freq").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	cpu_freq();
}, 1000);

function cpu_temp() {
	const exec = require('child_process').exec;
	const command = "echo $(sensors | egrep -wi 'Tctl|tdie|Package id 0' | sed 's/Package id//' | awk '{print $2}' | cut -d'.' -f -1 | sed 's/+//')??C";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("cpu-temp").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	cpu_temp();
}, 1000);

// Capture information about using RAM memory
function ram_total() {
	const exec = require('child_process').exec;

	const command = "echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("ram-size").innerHTML = stdout;
		} else {
			const command = "echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
			exec(command, (error, stdout, stderr) => {
				document.getElementById("ram-size").innerHTML = stdout;
			});
		}
	});
}
ram_total();

function ram_usage() {
	const exec = require('child_process').exec;
	const command = "echo $(free -m | grep Mem | awk '{print ($3/$2)*100}' | cut -d'.' -f -1)";
	exec(command, (error, stdout, stderr) => {
		if (stdout.length <= 1) {
			document.getElementById("ram-usage").style.strokeDashoffset = "calc(440 - (440 * 0) / 100)";
			document.getElementById("ram-usage-number").innerHTML = "0";
		} else {
			document.getElementById("ram-usage").style.strokeDashoffset = "calc(440 - (440 * " + stdout + ") / 100)";
			document.getElementById("ram-usage-number").innerHTML = stdout.trim();
		}
	});
}

setInterval(function () {
	ram_usage();
}, 1000);

function ram_use() {
	const exec = require('child_process').exec;
	const command = "echo $(free -h | grep -i Mem | awk '{print $3}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("ram-use").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	ram_use();
}, 1000);
