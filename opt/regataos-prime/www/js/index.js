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
        itemSideBar[i].style.width = "56px";
    }

    document.querySelector(".sidebar").style.width = "56px";
    document.querySelector(".hide-sidebar").style.display = "none";
    document.querySelector(".show-sidebar").style.display = "flex";
    document.querySelector(".div-iframe").style.marginLeft = "56px";
    document.querySelector(".iframe").style.width = "calc(100% - 56px)";

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
function detect_iframe_url() {
    const iframe_url = document.getElementById("main-iframe").src;

    if ((iframe_url.indexOf("apps") > -1) == "1") {
        document.querySelector(".applications a").style.borderLeft = "4px solid #0085e4";
    } else {
        document.querySelector(".applications a").style.borderLeft = "4px solid #2a2d32";
    }

    if ((iframe_url.indexOf("settings") > -1) == "1") {
        document.querySelector(".settings a").style.borderLeft = "4px solid #0085e4";
    } else {
        document.querySelector(".settings a").style.borderLeft = "4px solid #2a2d32";
    }

    if ((iframe_url.indexOf("performance") > -1) == "1") {
        document.querySelector(".system-info a").style.borderLeft = "4px solid #0085e4";
    } else {
        document.querySelector(".system-info a").style.borderLeft = "4px solid #2a2d32";
    }

    if ((iframe_url.indexOf("system") > -1) == "1") {
        document.querySelector(".system a").style.borderLeft = "4px solid #0085e4";
    } else {
        document.querySelector(".system a").style.borderLeft = "4px solid #2a2d32";
    }
}

//Go to specific pages
function go_applications() {
    var iframe_url = document.getElementById("main-iframe").src;
    if ((iframe_url.indexOf("apps") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/apps.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_settings() {
    var iframe_url = document.getElementById("main-iframe").src;
    if ((iframe_url.indexOf("settings") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/settings.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_system_info() {
    var iframe_url = document.getElementById("main-iframe").src;
    if ((iframe_url.indexOf("performance") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/performance.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_system() {
    var iframe_url = document.getElementById("main-iframe").src;
    if ((iframe_url.indexOf("system") > -1) == "0") {
        document.getElementById("main-iframe").src = "./pages/system.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}
