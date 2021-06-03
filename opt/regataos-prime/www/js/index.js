// If supported, display options for Prime
function check_prime_support() {
const fs = require('fs');
fs.access("/tmp/regataos-prime/use-hybrid-graphics.txt", (err) => {
if (!err) {
	document.getElementById("main-iframe").src = "pages/apps.html";
	$(".applications").css("display", "block")

	return;
} else {
	document.getElementById("main-iframe").src = "pages/settings.html";
	$(".applications").css("display", "none")
}
});
}
check_prime_support();

// Save the status of the application sidebar
function hide_sidebar_shell() {
    const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/regataos-prime-configs -hide-sidebar";
    console.log(command);
    exec(command,function(error,call,errlog){
    });
}

function show_sidebar_shell() {
    const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-prime/scripts/regataos-prime-configs -show-sidebar";
    console.log(command);
    exec(command,function(error,call,errlog){
    });
}

// Functions sidebar
//Icons only
function hide_sidebar() {
    $(".sidebar").css("width", "56px");
    $(".sidebar").css("transition", "all 0.3s ease-in-out");
    $(".sidebar .ul-sidebar li").css("width", "56px");
    $(".link-items p").css("visibility", "hidden");
    $(".hide-sidebar").css("display", "none");
    $(".show-sidebar").css("display", "flex");
    $(".iframe").css("width", "calc(100% - 68px)");
    $(".div-iframe").css("margin-left", "56px");

    hide_sidebar_shell();
}

function show_sidebar() {
    $(".sidebar").css("width", "230px");
    $(".sidebar").css("transition", "all 0.3s ease-in-out");
    $(".sidebar .ul-sidebar li").css("width", "230px");
    $(".link-items p").css("visibility", "visible");
    $(".hide-sidebar").css("display", "flex");
    $(".show-sidebar").css("display", "none");
    $(".iframe").css("width", "calc(100% - 230px)");
    $(".div-iframe").css("margin-left", "230px");

    show_sidebar_shell();

    setTimeout(function(){ 
        $(".link-items p").css("visibility", "visible");
    }, 300);
}

function hide_sidebar2() {
    $(".sidebar").css("width", "56px");
    $(".sidebar .ul-sidebar li").css("width", "56px");
    $(".link-items p").css("visibility", "hidden");
    $(".hide-sidebar").css("display", "none");
    $(".show-sidebar").css("display", "flex");
    $(".iframe").css("width", "calc(100% - 68px)");
    $(".div-iframe").css("margin-left", "56px");

    hide_sidebar_shell();
}

function show_sidebar2() {
    $(".sidebar").css("width", "230px");
    $(".sidebar .ul-sidebar li").css("width", "230px");
    $(".link-items p").css("visibility", "visible");
    $(".hide-sidebar").css("display", "flex");
    $(".show-sidebar").css("display", "none");
    $(".iframe").css("width", "calc(100% - 230px)");
    $(".div-iframe").css("margin-left", "230px");

    show_sidebar_shell();

    setTimeout(function(){ 
        $(".link-items p").css("visibility", "visible");
    }, 300);
}

// Check sidebar configuration
function check_sidebar_config() {
const fs = require('fs');

fs.access('/tmp/regataos-prime/config-app/config-app.conf', (err) => {
if (!err) {
    fs.readFile('/tmp/regataos-prime/config-app/config-app.conf', (err, data) => {
	if (err) throw err;

	    var data = data
	    var status1 = "hide_sidebar=0"
	    var status2 = "hide_sidebar=1"

	    var showsidebar = data.indexOf(status1) > -1;
	    var hidesidebar = data.indexOf(status2) > -1;

	    if (showsidebar == '1') {
		    $(document).ready(function() {
                show_sidebar2();
		    });
	    } else if (hidesidebar == '1') {
		    $(document).ready(function() {
                hide_sidebar2();
            });
        } else {
        
	    }
    });
    return;
    } else {
        show_sidebar2();
    }
});
}
check_sidebar_config();

function apply_css_after() {
    setTimeout(function(){
        $(".sidebar .ul-sidebar li").css("transition", "all 0.3s ease-in-out");
    }, 2000);
}
apply_css_after();

//Detect iframe url
function detect_iframe_url() {
	var iframe_url = document.getElementById("main-iframe").src;

	if ((iframe_url.indexOf("apps") > -1) == "1") {
		$(".applications a").css("border-left", "4px solid #0085e4");
	} else {
		$(".applications a").css("border-left", "4px solid #2a2d32");
	}

	if ((iframe_url.indexOf("settings") > -1) == "1") {
		$(".settings a").css("border-left", "4px solid #0085e4");
	} else {
		$(".settings a").css("border-left", "4px solid #2a2d32");
	}

	if ((iframe_url.indexOf("performance") > -1) == "1") {
		$(".system-info a").css("border-left", "4px solid #0085e4");
	} else {
		$(".system-info a").css("border-left", "4px solid #2a2d32");
	}

	if ((iframe_url.indexOf("system") > -1) == "1") {
		$(".system a").css("border-left", "4px solid #0085e4");
	} else {
		$(".system a").css("border-left", "4px solid #2a2d32");
	}
}

setInterval(function() {
    detect_iframe_url();
}, 100);

//Go to specific pages
function go_applications() {
var iframe_url = document.getElementById("main-iframe").src;
if ((iframe_url.indexOf("apps") > -1) == "0") {
	document.getElementById("main-iframe").src = "./pages/apps.html";

	// Take the page to the top
	setTimeout(function() {
		window.scrollTo(0,0);
	}, 300);
}
}

function go_settings() {
var iframe_url = document.getElementById("main-iframe").src;
if ((iframe_url.indexOf("settings") > -1) == "0") {
	document.getElementById("main-iframe").src = "./pages/settings.html";

	// Take the page to the top
	setTimeout(function() {
		window.scrollTo(0,0);
	}, 300);
}
}

function go_system_info() {
var iframe_url = document.getElementById("main-iframe").src;
if ((iframe_url.indexOf("performance") > -1) == "0") {
	document.getElementById("main-iframe").src = "./pages/performance.html";

	// Take the page to the top
	setTimeout(function() {
		window.scrollTo(0,0);
	}, 300);
}
}

function go_system() {
var iframe_url = document.getElementById("main-iframe").src;
if ((iframe_url.indexOf("system") > -1) == "0") {
	document.getElementById("main-iframe").src = "./pages/system.html";

	// Take the page to the top
	setTimeout(function() {
		window.scrollTo(0,0);
	}, 300);
}
}
