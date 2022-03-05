// English language translation
$(document).ready(function() {
	// Window title
	$("title").text("Max-Q");

	// Side bar
	//Back button and more
	$(".hide-sidebar img").attr({title:"Icons only"});
	$(".show-sidebar img").attr({title:"Icons and texts"});
	//Applications
	$(".applications p").text("Applications");
	$(".applications img").attr({title:"Applications"});
	//Settings
	$(".settings p").text("Settings");
	$(".settings img").attr({title:"Settings"});
	//Performance
	$(".system-info p").text("Performance");
	$(".system-info img").attr({title:"Performance"});
	//System
	$(".system p").text("System");
	$(".system img").attr({title:"System"});

    // Universal
    //Popups close button
    $("div#button-close").attr({title:"Close"});

    // Applications
    //Session title applications
    $(".page-apps-title").text("Applications");
    $(".page-apps-description").text("Choose which applications to run with your device's dedicated GPU.");

    //Disable/enable for all apps
    $(".disable-all").text("Disable for all apps");
    $(".enable-all").text("Enable for all apps");

    //Add app button
    $("div.remove-app-buttom").attr({title:"Remove"});

    //Power saving or High performance
    $(".performance").text("High performance");
    $(".powersaving").text("Power saving");

    //Remove app button
    $(".label-add").attr({title:"Use this option to add more applications to the list to run with your device's dGPU."});
    $(".label-add .text-app").text("Add application");
    $(".label-add .desc-option-blocks").text("Add more apps to the list");

    // Settings
    //Session title settings
    $(".page-settings-title").text("Settings");
    $(".page-settings-description").text("Choose the best configuration for your dedicated GPU, configure the display and perform simple tests.");

    //Run everything with the dGPU
    $("#selecte-gpu .text-app").text("Render with GPU:");
    $("#selecte-gpu .render-igpu-desc").text("Energy saving");
    $("#selecte-gpu .render-dgpu-desc").text("High performance");
    $("#selecte-gpu .integrated").text("Integrated");
    $("#selecte-gpu .dedicated").text("Dedicated");

    //Buttons settings
    $(".display-settings").text("Screen settings");
    $(".display-settings-info").text("Manage and configure displays");
    $(".nvidia-settings").text("NVIDIA Driver settings");
    $(".nvidia-settings-info").text("Choose the best configuration for your GPU");
    $(".run-tests").text("Test the dedicated GPU");
    $(".run-tests-info").text("Run simple test with OpenGL or Vulkan");

    //Popup
    $(".popup-title-settings").text("Test the dedicated GPU");
    $(".popup-desc-settings").text("Run simple tests with your device's dedicated GPU using the following options:");
    $(".button-gl").text("Test with OpenGL");
    $(".button-vk").text("Test with Vulkan");

    //FreeSync
    $(".freesync-on").text("FreeSync enabled");
    $(".freesync-off").text("FreeSync disabled");

    //TearFree
    $(".pst-text").text("Prevent Screen Tearing");
    $(".tearfree-on").text("Enabled");
    $(".tearfree-off").text("Disabled");

    //CPU governor
    $(".cpu-governor-text").text("CPU Power");
    $(".governor-powersave").text("Balanced");
    $(".governor-performance").text("Performance");
    $(".cpu-powersave-desc").text("Powersave");
    $(".cpu-performance-desc").text("Performance");

    //KWin compositor
    $(".compositor-text").text("Desktop Effects");
    $(".compositor-on").text("Compositor activated");
    $(".compositor-off").text("Compositor disabled");

    //Unlock widgets
    $(".unlockwidgets-text").text("Lock widgets");
    $(".unlockwidgets-on").text("Blocked widgets");
    $(".unlockwidgets-off").text("Unlocked widgets");

    // Performance
    //Session title performance
    $(".page-performance-title").text("Performance");
    $(".page-performance-description").text("Check hardware resource consumption information.");

    //Block title
    $(".ram-desc").text("RAM usage");
    $(".cpu-desc").text("CPU usage");
    $(".vram-desc").text("VRAM usage");
    $(".gpu-desc").text("GPU usage");

    //Description of the blocks
    $(".temp-text").text("Temperature");
    $(".freq-text").text("Frequency");
    $(".mem-sz-text").text("Memory size");
    $(".mem-tt-text").text("Memory size");
    $(".in-use-text").text("In use");

    // System
    //Session title settings
    $(".page-system-title").text("System");
    $(".page-system-description").text("Check out more information about hardware and software.");

    //Copy info button
    $("#copy-all-txt").text("Copy all");
    $("#copy-all").attr({title:"Copy the information to the clipboard."});

    //Info buttons
    $(".nvidia-driver").text("NVIDIA driver version");
    $(".dgpu-name").text("Graphic chipset");
    $(".vram").text("Video memory size");
    $(".os-name").text("Operational system");
    $(".ram").text("System memory");
    $(".cpu").text("CPU model");
    $(".igpu-name").text("Integrated graphics");
    $(".mesa-driver").text("Mesa Driver version");
    $(".opengl-version").text("OpenGL API version");
    $(".vulkan-version").text("Vulkan API version");
    $(".kernel-version").text("Linux Kernel version ");
    $(".more-info").text("More details about the system");
    $(".more-info-desc").text("System information center");
});

function translation_app_status() {
    //Power saving or High performance
    $("span.performance").text("High performance");
    $("span.powersaving").text("Power saving");
}
