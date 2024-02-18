// Show app only when the UI is ready
const gui = require('nw.gui');
onload = function () {
    gui.Window.get().show();
}

// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Prevent dragging and dropping of icons
const icons = document.querySelectorAll(".icones-menu");
for (let i = 0; i < icons.length; i++) {
    icons[i].draggable = false;
}

// Check configuration files
function checkConfigFile(data, desiredString) {
    const searchString = new RegExp(`(?<=${desiredString}).*`, "g");

    let systemConfig = data.match(searchString)[0];
    systemConfig = systemConfig.replace(/:.*/g, '');
    systemConfig = systemConfig.replace(/\.UTF-8/g, "");
    return systemConfig;
}

// Functions sidebar
//Save the status of the application sidebar
function hide_sidebar_shell() {
    const exec = require('child_process').exec;
    const command = "/bin/bash /opt/regataos-prime/scripts/regataos-prime-configs -hide-sidebar";
    exec(command, function (error, call, errlog) {
    });
}

function show_sidebar_shell() {
    const exec = require('child_process').exec;
    const command = "/bin/bash /opt/regataos-prime/scripts/regataos-prime-configs -show-sidebar";
    exec(command, function (error, call, errlog) {
    });
}

//Icons only
function hide_sidebar(saveConfig) {
    const textSideBar = document.querySelectorAll(".link-items p");
    for (let i = 0; i < textSideBar.length; i++) {
        textSideBar[i].style.visibility = "hidden";
    }

    const itemSideBar = document.querySelectorAll(".sidebar .ul-sidebar li");
    for (let i = 0; i < itemSideBar.length; i++) {
        itemSideBar[i].style.width = "58px";
    }

    document.querySelector(".sidebar").style.width = "58px";
    document.querySelector(".hide-sidebar").style.display = "none";
    document.querySelector(".show-sidebar").style.display = "flex";
    document.querySelector(".div-iframe").style.marginLeft = "58px";
    document.querySelector(".iframe").style.width = "calc(100% - 58px)";

    if (saveConfig == true) {
        hide_sidebar_shell();
    }
}

function show_sidebar(saveConfig) {
    const itemSideBar = document.querySelectorAll(".sidebar .ul-sidebar li");
    for (let i = 0; i < itemSideBar.length; i++) {
        itemSideBar[i].style.width = "230px";
    }

    document.querySelector(".sidebar").style.width = "230px";
    document.querySelector(".hide-sidebar").style.display = "flex";
    document.querySelector(".show-sidebar").style.display = "none";
    document.querySelector(".div-iframe").style.marginLeft = "230px";
    document.querySelector(".iframe").style.width = "calc(100% - 230px)";

    if (saveConfig == true) {
        show_sidebar_shell();
    }

    setTimeout(function () {
        const textSideBar = document.querySelectorAll(".link-items p");
        for (let i = 0; i < textSideBar.length; i++) {
            textSideBar[i].style.visibility = "visible";
        }
    }, 300);
}

//Check sidebar configuration
function check_sidebar_config() {
    const fs = require('fs');

    if (fs.existsSync("/tmp/regataos-prime/config-app/config-app.conf")) {
        const regataHelpConfig = fs.readFileSync("/tmp/regataos-prime/config-app/config-app.conf", "utf8");
        const configOption = "hide_sidebar=";

        const sideBarConfig = checkConfigFile(regataHelpConfig, configOption);
        if (sideBarConfig.includes("0")) {
            show_sidebar();
        } else {
            hide_sidebar();
        }

    } else {
        show_sidebar();
    }
}
check_sidebar_config();

// If supported, display options for Prime
function check_prime_support() {
    const fs = require('fs');

    fs.access("/tmp/regataos-prime/use-hybrid-graphics.txt", (err) => {
        const pageApp = document.querySelector(".applications");

        if (!err) {
            document.getElementById("main-iframe").src = "pages/apps.html";
            pageApp.style.display = "block";
            return;
        } else {
            document.getElementById("main-iframe").src = "pages/settings.html";
            pageApp.style.display = "none";
        }
    });
}
check_prime_support();

//Detect iframe url
function getIframeUrl() {
    const iframeUrl = document.getElementById("main-iframe").src;

    if (iframeUrl.includes("apps.html")) {
        document.querySelector(".applications .sidebar-item-effect").style.backgroundColor = "#3daee9";
    } else {
        document.querySelector(".applications .sidebar-item-effect").style.backgroundColor = "";
    }

    if (iframeUrl.includes("settings.html")) {
        document.querySelector(".settings .sidebar-item-effect").style.backgroundColor = "#3daee9";
    } else {
        document.querySelector(".settings .sidebar-item-effect").style.backgroundColor = "";
    }

    if (iframeUrl.includes("performance.html")) {
        document.querySelector(".system-info .sidebar-item-effect").style.backgroundColor = "#3daee9";
    } else {
        document.querySelector(".system-info .sidebar-item-effect").style.backgroundColor = "";
    }

    if (iframeUrl.includes("system.html")) {
        document.querySelector(".system .sidebar-item-effect").style.backgroundColor = "#3daee9";
    } else {
        document.querySelector(".system .sidebar-item-effect").style.backgroundColor = "";
    }
}

//Go to specific pages
function go_applications() {
    var iframeUrl = document.getElementById("main-iframe").src;
    if ((iframeUrl.indexOf("apps") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/apps.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_settings() {
    var iframeUrl = document.getElementById("main-iframe").src;
    if ((iframeUrl.indexOf("settings") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/settings.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_system_info() {
    var iframeUrl = document.getElementById("main-iframe").src;
    if ((iframeUrl.indexOf("performance") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/performance.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_system() {
    var iframeUrl = document.getElementById("main-iframe").src;
    if ((iframeUrl.indexOf("system") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/system.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}
