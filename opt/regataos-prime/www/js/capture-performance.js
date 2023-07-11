// Capture information about using GPU
//Capture the discrete GPU usage
function graphicsChipUsage() {
	const exec = require('child_process').exec;
	const command = "echo $(/opt/regataos-prime/scripts/hardware-info -gpu-usage | head -1 | tail -1)";
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
graphicsChipUsage();

setInterval(function () {
	graphicsChipUsage();
}, 1000);

//Capture the discrete GPU temp
function gpuTemp() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -gpu-temp | head -1 | tail -1";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("gpu-temp").innerHTML = stdout;
		}
	});
}
gpuTemp();

setInterval(function () {
	gpuTemp();
}, 1000);

//Capture the discrete GPU frequency
function gpuFreq() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -gpu-freq | head -1 | tail -1";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("gpu-freq").innerHTML = stdout;
		}
	});
}
gpuFreq();

setInterval(function () {
	gpuFreq();
}, 1000);

// Capture information about using VRAM
//Capture total amount of RAM
function vramSize() {
	const fs = require("fs");
	const totalVramSize = fs.readFileSync("/tmp/regataos-prime/config/system-info/total-vram-size.txt", "utf8");

	document.getElementById("vram-size").innerHTML = totalVramSize;
}
vramSize();

//Capture the discrete GPU video memory (VRAM) frequency
function vramFreq() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -vram-freq | head -1 | tail -1";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("vram-freq").innerHTML = stdout;
		}
	});
}

setInterval(function () {
	vramFreq();
}, 1000);

//Capture the discrete GPU video memory (VRAM) usage
function vramUsage() {
	const exec = require('child_process').exec;
	const command = "echo $(/opt/regataos-prime/scripts/hardware-info -vram-usage | head -1 | tail -1)";
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
vramUsage();

setInterval(function () {
	vramUsage();
}, 1000);

// Capture information about using CPU
function processorUsage() {
	const fileLog = "/tmp/regataos-prime/cpu-usage.log";
	const commandLine = `/opt/regataos-prime/scripts/hardware-info -cpu-use | head -1 | tail -1;`;

	const exec = require('child_process').exec;
	exec(commandLine, (error, stdout, stderr) => { });

	const fs = require("fs");
	if (fs.existsSync(fileLog)) {
		fs.readFile(fileLog, "utf8", (err, data) => {
			if (err) {
				console.error(err);
				return;
			}

			if (data.length <= 1) {
				document.getElementById("cpu-usage").style.strokeDashoffset = "calc(440 - (440 * 0) / 100)";
				document.getElementById("cpu-usage-number").innerHTML = "0";
			} else {
				document.getElementById("cpu-usage").style.strokeDashoffset = "calc(440 - (440 * " + data + ") / 100)";
				document.getElementById("cpu-usage-number").innerHTML = data.trim();
			}
		});
	}
}
processorUsage();

setInterval(function () {
	processorUsage();
}, 1000);

function cpuFreq() {
	const exec = require('child_process').exec;
	const command = "/opt/regataos-prime/scripts/hardware-info -cpu-freq | head -1 | tail -1";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("cpu-freq").innerHTML = stdout;
		}
	});
}
cpuFreq();

setInterval(function () {
	cpuFreq();
}, 1000);

function cpuTemp() {
	const exec = require('child_process').exec;
	const command = "echo $(sensors | egrep -wi 'Tctl|tdie|Package id 0' | sed 's/Package id//' | awk '{print $2}' | cut -d'.' -f -1 | sed 's/+//')°C";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("cpu-temp").innerHTML = stdout;
		}
	});
}
cpuTemp();

setInterval(function () {
	cpuTemp();
}, 1000);

// Capture information about using RAM memory
function ramTotal() {
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
ramTotal();

function ramUsage() {
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
ramUsage();

setInterval(function () {
	ramUsage();
}, 1000);

function ramUse() {
	const exec = require('child_process').exec;
	const command = "echo $(free -h | grep -i Mem | awk '{print $3}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
	exec(command, (error, stdout, stderr) => {
		if (stdout) {
			document.getElementById("ram-use").innerHTML = stdout;
		}
	});
}
ramUse();

setInterval(function () {
	ramUse();
}, 1000);
