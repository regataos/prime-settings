// This script helps to dynamically create apps blocks
function apps_list() {
	const fs = require("fs");

	let files = [];

	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
		fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
			if (!err) {
				const apps = JSON.parse(data);

				// Request the dynamic creation of apps blocks on the HTML page
				//Capture the main element where the blocks will be created
				const all_blocks = document.querySelector("ul.apps-bottom2");

				//Read the list of apps that should appear in each block
				for (let i = 0; i < apps.length; i++) {
					//Make sure the app uses dGPU by default
					const status_dgpu = apps[i].dgpu;

					if ((status_dgpu.indexOf("activate") > -1) == "1") {
						//Make sure the app is installed
						const installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");

						if ((installed_apps.indexOf(apps[i].nickname) > -1) == "1") {
							//Request the creation of the new element (block) for each
							const new_app_blocks = document.createElement("li");

							//Add id and classes to the new blocks
							new_app_blocks.id = apps[i].nickname;

							//Capture app icon
							const app_icon = fs.readFileSync("/opt/regataos-prime/www/images/apps-icons/" + apps[i].nickname + "-icon.txt", "utf8");

							//Special constiables for runnings
							const appname = "'" + apps[i].nickname + "'";
							const package = "'" + apps[i].package + "'";
							const package_manager = "'" + apps[i].package_manager + "'";

							let executable = apps[i].executable;
							executable = executable.replace(/snap/g, '');
							executable = executable.replace(/run/g, '');
							executable = "'" + executable.trim() + "'";

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
