// This script helps to dynamically create apps blocks
function apps_list() {
var fs = require("fs");

var files = [];

// Read JSON files with the list of apps
fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
if(!err) {
	var apps = JSON.parse(data);

	// Request the dynamic creation of apps blocks on the HTML page
	//Capture the main element where the blocks will be created
	var all_blocks = document.querySelector("ul.apps-bottom2");

	//Read the list of apps that should appear in each block
	for (var i = 0; i < apps.length; i++) {

	//Make sure the app uses dGPU by default
	var status_dgpu = apps[i].dgpu;
	if ((status_dgpu.indexOf("activate") > -1) == "1") {

		//Make sure the app is installed
		var installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");

		if ((installed_apps.indexOf(apps[i].nickname) > -1) == "1") {
			//Request the creation of the new element (block) for each
			var new_app_blocks = document.createElement("li");

			//Add id and classes to the new blocks
			new_app_blocks.id = apps[i].nickname;

			//Capture app icon
			var app_icon = fs.readFileSync("/opt/regataos-prime/www/images/apps-icons/" + apps[i].nickname + "-icon.txt", "utf8");

			//Special variables for runnings
			var appname = "'" + apps[i].nickname + "'";
			var package = "'" + apps[i].package + "'";
			var package_manager = "'" + apps[i].package_manager + "'";
			var executable = apps[i].executable;
			var executable = executable.replace(/snap/g, '');
			var executable = executable.replace(/run/g, '');
			var executable = "'" + executable.trim() + "'";

			//Add app details within the newly created block
			new_app_blocks.innerHTML = ' \
			<div class="icon-app" style="background-image:url(' + app_icon + ');"></div> \
			<div class="text-app app-name">' + apps[i].name + '</div> \
			<div class="switch__container"> \
				<input id="switch-shadow-' + apps[i].nickname + '" class="switch switch--shadow-app switch-on-' + apps[i].nickname + '" type="checkbox" onclick="window.appname=' + appname + '; window.package=' + package + '; window.package_manager=' + package_manager + '; window.executable=' + executable + '; action_apps();"> \
				<label for="switch-shadow-' + apps[i].nickname + '"></label> \
			</div> \
			<div class="switch__container"> \
				<input id="switch-shadow2-' + apps[i].nickname + '" class="switch switch--shadow2-app switch-off-' + apps[i].nickname + '" type="checkbox" onclick="window.appname=' + appname + '; window.package=' + package + '; window.package_manager=' + package_manager + '; window.executable=' + executable + '; action_apps();"> \
				<label for="switch-shadow2-' + apps[i].nickname + '"></label> \
			</div> \
			<span class="' + apps[i].nickname + '-on performance">Alta performance</span> \
			<span class="' + apps[i].nickname + '-off powersaving">Economia de energia</span>';

			//Finally, create the new blocks dynamically
			all_blocks.appendChild(new_app_blocks);
			translation_app_status();
		}
	}
	}
return;
}
});
});
}

apps_list();
