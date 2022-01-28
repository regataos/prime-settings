// Capture information about the GPU with the RadeonTop utility
function run_radeontop() {
	const exec = require('child_process').exec;
    var command = "ps -C radeontop > /dev/null; if [ $? = 1 ] ; then rm -f /tmp/regataos-prime/radeontop.log; radeontop -d /tmp/regataos-prime/radeontop.log; fi";
	exec(command, (error, stdout, stderr) => {
	});
}
run_radeontop();

// Capture information about using GPU
//Capture the discrete GPU usage
function gpu_usage() {
	const exec = require('child_process').exec;
    var command = "echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -gpu-usage)";
	exec(command, (error, stdout, stderr) => {
	if (stdout.length <= 1) {
		document.getElementById("gpu-usage").style.strokeDashoffset="calc(440 - (440 * 0) / 100)";
		document.getElementById("gpu-usage-number").innerHTML="0";
	} else {
		document.getElementById("gpu-usage").style.strokeDashoffset="calc(440 - (440 * " + stdout + ") / 100)";
		document.getElementById("gpu-usage-number").innerHTML=stdout;
	}
	});
}
gpu_usage();

setInterval(function() {
	gpu_usage();
}, 1000);

//Capture the discrete GPU temp
function gpu_temp() {
	const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/hardware-info -gpu-temp";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("gpu-temp").innerHTML=stdout;
	}
	});
}
gpu_temp();

setInterval(function() {
	gpu_temp();
}, 1000);

//Capture the discrete GPU frequency
function gpu_freq() {
	const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/hardware-info -gpu-freq";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("gpu-freq").innerHTML=stdout;
	}
	});
}
gpu_freq();

setInterval(function() {
	gpu_freq();
}, 1000);

// Capture information about using VRAM
//Capture the discrete GPU video memory (VRAM) frequency
function vram_freq() {
	const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/hardware-info -vram-freq";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("vram-freq").innerHTML=stdout;
	}
	});
}
vram_freq();

setInterval(function() {
	vram_freq();
}, 1000);

//Capture the discrete GPU video memory (VRAM) usage
function vram_usage() {
	const exec = require('child_process').exec;
    var command = "echo $(/bin/bash /opt/regataos-prime/scripts/hardware-info -vram-usage)";
	exec(command, (error, stdout, stderr) => {
	if (stdout.length <= 1) {
		document.getElementById("vram-usage").style.strokeDashoffset="calc(440 - (440 * 0) / 100)";
		document.getElementById("vram-usage-number").innerHTML="0";
	} else {
		document.getElementById("vram-usage").style.strokeDashoffset="calc(440 - (440 * " + stdout + ") / 100)";
		document.getElementById("vram-usage-number").innerHTML=stdout;
	}
	});
}
vram_usage();

setInterval(function() {
	vram_usage();
}, 1000);

// Capture information about using CPU
function cpu_use() {
	const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/hardware-info -cpu-use";
	exec(command, (error, stdout, stderr) => {
	});
}
cpu_use();

setInterval(function() {
	cpu_use();
}, 1000);

function cpu_usage() {
const fs = require('fs');
fs.readFile("/tmp/regataos-prime/cpu-usage.log", (err, data) => {
if (err) throw err;
	var data = data
	if (data.length <= 1) {
		document.getElementById("cpu-usage").style.strokeDashoffset="calc(440 - (440 * 0) / 100)";
		document.getElementById("cpu-usage-number").innerHTML="0";
	} else {
		document.getElementById("cpu-usage").style.strokeDashoffset="calc(440 - (440 * " + data + ") / 100)";
		document.getElementById("cpu-usage-number").innerHTML=data;
	}
}); 
}
cpu_usage();

setInterval(function() {
	cpu_usage();
}, 1000);

function cpu_freq() {
	const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/hardware-info -cpu-freq";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("cpu-freq").innerHTML=stdout;
	}
	});
}
cpu_freq();

setInterval(function() {
	cpu_freq();
}, 1000);

function cpu_temp() {
	const exec = require('child_process').exec;
    var command = "echo $(sensors | egrep -wi 'Tctl|tdie|Package id 0' | sed 's/Package id//' | awk '{print $2}' | cut -d'.' -f -1 | sed 's/+//')°C";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("cpu-temp").innerHTML=stdout;
	}
	});
}
cpu_temp();

setInterval(function() {
	cpu_temp();
}, 1000);

// Capture information about using RAM memory
function ram_total() {
	const exec = require('child_process').exec;

    var command = "echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("ram-size").innerHTML=stdout;
	} else {
		var command = "echo $(free -h | grep -i Mem | awk '{print $2}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
		exec(command, (error, stdout, stderr) => {
			document.getElementById("ram-size").innerHTML=stdout;
		});
	}
	});
}
ram_total();

function ram_usage() {
	const exec = require('child_process').exec;
    var command = "echo $(free -m | grep Mem | awk '{print ($3/$2)*100}' | cut -d'.' -f -1)";
	exec(command, (error, stdout, stderr) => {
	if (stdout.length <= 1) {
		document.getElementById("ram-usage").style.strokeDashoffset="calc(440 - (440 * 0) / 100)";
		document.getElementById("ram-usage-number").innerHTML="0";
	} else {
		document.getElementById("ram-usage").style.strokeDashoffset="calc(440 - (440 * " + stdout + ") / 100)";
		document.getElementById("ram-usage-number").innerHTML=stdout;
	}
	});
}

ram_usage();

setInterval(function() {
	ram_usage();
}, 1000);

function ram_use() {
	const exec = require('child_process').exec;
    var command = "echo $(free -h | grep -i Mem | awk '{print $3}' | sed 's/Mi/MB/' | sed 's/Gi/GB/')";
	exec(command, (error, stdout, stderr) => {
	if (stdout) {
		document.getElementById("ram-use").innerHTML=stdout;
	}
	});
}

ram_use();

setInterval(function() {
	ram_use();
}, 1000);
