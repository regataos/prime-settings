// This script helps to dynamically create apps blocks
function apps_external_list() {
	const fs = require("fs");

	let files = [];

	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
		fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
			if (!err) {
				const apps = JSON.parse(data);

				// Request the dynamic creation of apps blocks on the HTML page
				//Capture the main element where the blocks will be created
				const all_blocks = document.querySelector("ul.apps-bottom1");

				//Read the list of apps that should appear in each block
				for (let i = 0; i < apps.length; i++) {
					//If the element already exists, do not create a clone
					const dad = document.getElementById("dad");
					const child = dad.querySelector("#" + apps[i].app_nickname);

					if (child !== null) {
						const appfile = apps[i].app_nickname + ".json"

						if (!fs.existsSync("/tmp/regataos-prime/config/external-app/" + appfile)) {
							//Request the creation of the new element (block) for each
							const new_app_blocks = document.createElement("li");

							//Add id and classes to the new blocks
							new_app_blocks.id = apps[i].app_nickname;

							//Special constiables for runnings
							const appname = "'" + apps[i].app_nickname + "'";
							const desktop = "'" + apps[i].desktop_app_file + "'";

							//Add app details within the newly created block
							new_app_blocks.innerHTML = ' \
							<div class="icon-app" style="background-image:url(' + apps[i].app_icon + ');"></div> \
							<div class="remove-app-buttom" title="" onclick="window.appname=' + appname + '; window.desktop=' + desktop + '; remove_external_app();" style="background-image:url(../images/close.png); background-repeat: no-repeat; background-size: 12px 12px;"></div> \
							<div class="text-app app-name">' + apps[i].app_name + '</div> \
							<div class="switch__container"> \
								<input id="switch-shadow-' + apps[i].app_nickname + '" class="switch switch--shadow-app switch-on-' + apps[i].app_nickname + '" type="checkbox" onclick="window.appname=' + appname + '; window.desktop=' + desktop + '; action_external_apps();"> \
								<label for="switch-shadow-' + apps[i].app_nickname + '"></label> \
							</div> \
							<div class="switch__container"> \
								<input id="switch-shadow2-' + apps[i].app_nickname + '" class="switch switch--shadow2-app switch-off-' + apps[i].app_nickname + '" type="checkbox" onclick="window.appname=' + appname + '; window.desktop=' + desktop + '; action_external_apps();"> \
								<label for="switch-shadow2-' + apps[i].app_nickname + '" class="label-apps-off"></label> \
							</div> \
							<span class="' + apps[i].app_nickname + '-on performance"></span> \
							<span class="' + apps[i].app_nickname + '-off powersaving"></span>';

							//Finally, create the new blocks dynamically
							all_blocks.appendChild(new_app_blocks);
						}

					} else {
						//Request the creation of the new element (block) for each
						const new_app_blocks = document.createElement("li");

						//Add id and classes to the new blocks
						new_app_blocks.id = apps[i].app_nickname;

						//Special constiables for runnings
						const appname = "'" + apps[i].app_nickname + "'";
						const desktop = "'" + apps[i].desktop_app_file + "'";

						//Add app details within the newly created block
						new_app_blocks.innerHTML = ' \
						<div class="icon-app" style="background-image:url(' + apps[i].app_icon + ');"></div> \
						<div class="remove-app-buttom" onclick="window.appname=' + appname + '; window.desktop=' + desktop + '; remove_external_app();" style="background-image:url(../images/close.png); background-repeat: no-repeat; background-size: 12px 12px;"></div> \
						<div class="text-app app-name">' + apps[i].app_name + '</div> \
						<div class="switch__container"> \
							<input id="switch-shadow-' + apps[i].app_nickname + '" class="switch switch--shadow-app switch-on-' + apps[i].app_nickname + '" type="checkbox" onclick="window.appname=' + appname + '; window.desktop=' + desktop + '; action_external_apps();"> \
							<label for="switch-shadow-' + apps[i].app_nickname + '"></label> \
						</div> \
						<div class="switch__container"> \
							<input id="switch-shadow2-' + apps[i].app_nickname + '" class="switch switch--shadow2-app switch-off-' + apps[i].app_nickname + '" type="checkbox" onclick="window.appname=' + appname + '; window.desktop=' + desktop + '; action_external_apps();"> \
							<label for="switch-shadow2-' + apps[i].app_nickname + '" class="label-apps-off"></label> \
						</div> \
						<span class="' + apps[i].app_nickname + '-on performance">Alta performance</span> \
						<span class="' + apps[i].app_nickname + '-off powersaving">Economia de energia</span>';

						//Finally, create the new blocks dynamically
						all_blocks.appendChild(new_app_blocks);
						translation_app_status();
					}
				}
				return;
			}
		});
	});
}

apps_external_list();
