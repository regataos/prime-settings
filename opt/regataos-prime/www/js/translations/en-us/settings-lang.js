// English language translation

// Window title
document.querySelector("title").innerHTML = "Max-Q";

// Universal
//Popups close button
document.getElementById("button-close").title = "Close";

// Settings
//Session title settings
document.querySelector(".page-settings-title").innerHTML = "Settings";
document.querySelector(".page-settings-description").innerHTML = "Choose the best configuration for your dedicated GPU, configure the display and perform simple tests.";

//Run everything with the dGPU
document.querySelector(".select-gpu-text").innerHTML = "Render with GPU:";
document.querySelector(".render-igpu-desc").innerHTML = "Energy saving";
document.querySelector(".render-dgpu-desc").innerHTML = "High performance";
document.querySelector(".integrated").innerHTML = "Integrated";
document.querySelector(".dedicated").innerHTML = "Dedicated";

//Buttons settings
document.querySelector(".display-settings").innerHTML = "Screen settings";
document.querySelector(".display-settings-info").innerHTML = "Manage and configure displays";
document.querySelector(".nvidia-settings").innerHTML = "NVIDIA Driver settings";
document.querySelector(".nvidia-settings-info").innerHTML = "Choose the best configuration for your GPU";
document.querySelector(".run-tests").innerHTML = "Test the dedicated GPU";
document.querySelector(".run-tests-info").innerHTML = "Run simple test with OpenGL or Vulkan";

//Popup
document.querySelector(".popup-title-settings").innerHTML = "Test the dedicated GPU";
document.querySelector(".popup-desc-settings").innerHTML = "Run simple tests with your device's dedicated GPU using the following options:";
document.querySelector(".button-gl").innerHTML = "Test with OpenGL";
document.querySelector(".button-vk").innerHTML = "Test with Vulkan";

//FreeSync
document.querySelector(".freesync-on").innerHTML = "FreeSync enabled";
document.querySelector(".freesync-off").innerHTML = "FreeSync disabled";

//TearFree
document.querySelector(".pst-text").innerHTML = "Prevent Screen Tearing";
document.querySelector(".tearfree-on").innerHTML = "Enabled";
document.querySelector(".tearfree-off").innerHTML = "Disabled";

//CPU governor
document.querySelector(".cpu-governor-text").innerHTML = "CPU Power";
document.querySelector(".governor-powersave").innerHTML = "Balanced";
document.querySelector(".governor-performance").innerHTML = "Performance";
document.querySelector(".cpu-powersave-desc").innerHTML = "Powersave";
document.querySelector(".cpu-performance-desc").innerHTML = "Performance";

//KWin compositor
document.querySelector(".compositor-text").innerHTML = "Desktop Effects";
document.querySelector(".compositor-on").innerHTML = "Compositor activated";
document.querySelector(".compositor-off").innerHTML = "Compositor disabled";

//Unlock widgets
document.querySelector(".unlockwidgets-text").innerHTML = "Lock widgets";
document.querySelector(".unlockwidgets-on").innerHTML = "Blocked widgets";
document.querySelector(".unlockwidgets-off").innerHTML = "Unlocked widgets";

//AMD AMF
document.querySelector(".amf-text").innerHTML = "Enable AMD AMF";
document.querySelector(".amf-on").innerHTML = "AMD AMF enabled";
document.querySelector(".amf-off").innerHTML = "AMD AMF disabled";
