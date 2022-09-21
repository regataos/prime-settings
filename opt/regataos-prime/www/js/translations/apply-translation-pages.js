// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslationPages() {
    const fs = require('fs');

    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Apply translations according to page URL
        pageUrl = window.location.href;

        if ((pageUrl.indexOf("apps.html") > -1) == "1") {
            // Title and description
            const appsPage = document.querySelector(".page-apps-title");
            appsPage.innerHTML = data[i].appsPage.title;

            const appsPageDesc = document.querySelector(".page-apps-description");
            appsPageDesc.innerHTML = data[i].appsPage.description;

            // Close popups button
            const closeButton = document.getElementById("button-close");
            closeButton.title = data[i].index.buttonTop.close;

            // Disable/enable for all apps
            const enableApps = document.querySelector(".enable-all");
            enableApps.innerHTML = data[i].appsPage.buttonAllApps.enableApps;

            const disableApps = document.querySelector(".disable-all");
            disableApps.innerHTML = data[i].appsPage.buttonAllApps.disableApps;

            // Power saving or High performance
            const performanceStatus = document.querySelectorAll(".performance");
            for (let b = 0; b < performanceStatus.length; b++) {
                performanceStatus[b].innerHTML = data[i].index.status.performance;
            }

            const powersavingStatus = document.querySelectorAll(".powersaving");
            for (let b = 0; b < powersavingStatus.length; b++) {
                powersavingStatus[b].innerHTML = data[i].index.status.powersaving;
            }

            // Add app button
            document.querySelector(".label-add .text-app").innerHTML = data[i].appsPage.addApp.title;
            document.querySelector(".label-add .desc-option-blocks").innerHTML = data[i].appsPage.addApp.description;
            document.querySelector(".label-add").title = data[i].appsPage.addApp.tip;

        } else if ((pageUrl.indexOf("performance.html") > -1) == "1") {
            // Title and description
            const perfPage = document.querySelector(".page-performance-title");
            perfPage.innerHTML = data[i].performancePage.title;

            const perfPageDesc = document.querySelector(".page-performance-description");
            perfPageDesc.innerHTML = data[i].performancePage.description;

            // Option blocks
            //Block title
            document.querySelector(".ram-desc").innerHTML = data[i].performancePage.blocksTitle.ram;
            document.querySelector(".cpu-desc").innerHTML = data[i].performancePage.blocksTitle.cpu;
            document.querySelector(".vram-desc").innerHTML = data[i].performancePage.blocksTitle.vram;
            document.querySelector(".gpu-desc").innerHTML = data[i].performancePage.blocksTitle.gpu;

            //Description of the blocks
            const freqStatus = document.querySelectorAll(".freq-text");
            for (let b = 0; b < freqStatus.length; b++) {
                freqStatus[b].innerHTML = data[i].performancePage.blocksDesc.frequency;
            }

            document.querySelector(".temp-text").innerHTML = data[i].performancePage.blocksDesc.temperature;
            document.querySelector(".mem-sz-text").innerHTML = data[i].performancePage.blocksDesc.memorySize;
            document.querySelector(".mem-tt-text").innerHTML = data[i].performancePage.blocksDesc.totalMemory;
            document.querySelector(".in-use-text").innerHTML = data[i].performancePage.blocksDesc.inUse;

        } else if ((pageUrl.indexOf("settings.html") > -1) == "1") {
            // Title and description
            const settingsPage = document.querySelector(".page-settings-title");
            settingsPage.innerHTML = data[i].settingsPage.title;

            const settingsPageDesc = document.querySelector(".page-settings-description");
            settingsPageDesc.innerHTML = data[i].settingsPage.description;

            // Close popups button
            const closeButton = document.getElementById("button-close");
            closeButton.title = data[i].index.buttonTop.close;

            // Option blocks

            //Run everything with the dGPU
            document.querySelector(".select-gpu-text").innerHTML = data[i].settingsPage.selectGpu.title;
            document.querySelector(".integrated").innerHTML = data[i].settingsPage.selectGpu.integrated;
            document.querySelector(".dedicated").innerHTML = data[i].settingsPage.selectGpu.dedicated;
            document.querySelector(".render-igpu-desc").innerHTML = data[i].settingsPage.selectGpu.energySaving;
            document.querySelector(".render-dgpu-desc").innerHTML = data[i].settingsPage.selectGpu.performance;

            //Buttons settings
            document.querySelector(".display-settings").innerHTML = data[i].settingsPage.displaySettings.title;
            document.querySelector(".display-settings-info").innerHTML = data[i].settingsPage.displaySettings.description;
            document.querySelector(".nvidia-settings").innerHTML = data[i].settingsPage.nvidiaSettings.title;
            document.querySelector(".nvidia-settings-info").innerHTML = data[i].settingsPage.nvidiaSettings.description;
            document.querySelector(".run-tests").innerHTML = data[i].settingsPage.runTests.title;
            document.querySelector(".run-tests-info").innerHTML = data[i].settingsPage.runTests.description;

            //Popup
            document.querySelector(".popup-title-settings").innerHTML = data[i].settingsPage.popUpTests.title;
            document.querySelector(".popup-desc-settings").innerHTML = data[i].settingsPage.popUpTests.description;
            document.querySelector(".button-gl").innerHTML = data[i].settingsPage.popUpTests.buttonOpengl;
            document.querySelector(".button-vk").innerHTML = data[i].settingsPage.popUpTests.buttonVulkan;

            //FreeSync
            document.querySelector(".freesync").innerHTML = data[i].settingsPage.freesync.title;
            document.querySelector(".freesync-on").innerHTML = data[i].settingsPage.freesync.on;
            document.querySelector(".freesync-off").innerHTML = data[i].settingsPage.freesync.off;

            //TearFree
            document.querySelector(".pst-text").innerHTML = data[i].settingsPage.tearing.title;
            document.querySelector(".tearfree-on").innerHTML = data[i].settingsPage.tearing.on;
            document.querySelector(".tearfree-off").innerHTML = data[i].settingsPage.tearing.off;

            //CPU governor
            document.querySelector(".cpu-governor-text").innerHTML = data[i].settingsPage.cpuPower.title;
            document.querySelector(".governor-powersave").innerHTML = data[i].settingsPage.cpuPower.balanced;
            document.querySelector(".governor-performance").innerHTML = data[i].index.status.performance;
            document.querySelector(".cpu-powersave-desc").innerHTML = data[i].index.status.powersaving;
            document.querySelector(".cpu-performance-desc").innerHTML = data[i].index.status.performance;

            //KWin compositor
            document.querySelector(".compositor-text").innerHTML = data[i].settingsPage.compositor.title;
            document.querySelector(".compositor-on").innerHTML = data[i].settingsPage.compositor.on;
            document.querySelector(".compositor-off").innerHTML = data[i].settingsPage.compositor.off;

            //Unlock widgets
            document.querySelector(".unlockwidgets-text").innerHTML = data[i].settingsPage.unlockWidgets.title;
            document.querySelector(".unlockwidgets-on").innerHTML = data[i].settingsPage.unlockWidgets.on;
            document.querySelector(".unlockwidgets-off").innerHTML = data[i].settingsPage.unlockWidgets.off;

            //AMD AMF
            document.querySelector(".amf-text").innerHTML = data[i].settingsPage.amdAmf.title;
            document.querySelector(".amf-on").innerHTML = data[i].settingsPage.amdAmf.on;
            document.querySelector(".amf-off").innerHTML = data[i].settingsPage.amdAmf.off;

        } else if ((pageUrl.indexOf("system.html") > -1) == "1") {
            // Title and description
            const systemPagePage = document.querySelector(".page-system-title");
            systemPagePage.innerHTML = data[i].systemPage.title;

            const systemPagePageDesc = document.querySelector(".page-system-description");
            systemPagePageDesc.innerHTML = data[i].systemPage.description;

            // Option blocks
            //Copy info button
            document.getElementById("copy-all-txt").innerHTML = data[i].systemPage.copyButton.title;
            document.getElementById("copy-all").title = data[i].systemPage.copyButton.description;

            //Info buttons
            document.querySelector(".nvidia-driver").innerHTML = data[i].systemPage.systemInfo.nvidia;
            document.querySelector(".dgpu-name").innerHTML = data[i].systemPage.systemInfo.dgpu;
            document.querySelector(".vram").innerHTML = data[i].systemPage.systemInfo.vram;
            document.querySelector(".os-name").innerHTML = data[i].systemPage.systemInfo.osName;
            document.querySelector(".ram").innerHTML = data[i].systemPage.systemInfo.ram;
            document.querySelector(".cpu").innerHTML = data[i].systemPage.systemInfo.cpu;
            document.querySelector(".igpu-name").innerHTML = data[i].systemPage.systemInfo.igpu;
            document.querySelector(".mesa-driver").innerHTML = data[i].systemPage.systemInfo.mesa;
            document.querySelector(".opengl-version").innerHTML = data[i].systemPage.systemInfo.opengl;
            document.querySelector(".vulkan-version").innerHTML = data[i].systemPage.systemInfo.vulkan;
            document.querySelector(".kernel-version").innerHTML = data[i].systemPage.systemInfo.linux;
            document.querySelector(".more-info").innerHTML = data[i].systemPage.moreInfo.title;
            document.querySelector(".more-info-desc").innerHTML = data[i].systemPage.moreInfo.description;
        }
    }
}
applyTranslationPages();

// Special function for apps page.
// Select the language while the elements are generated on the screen.
function translation_app_status() {
    const fs = require('fs');

    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        //Power saving or High performance
        const performanceStatus = document.querySelectorAll(".performance");
        for (let b = 0; b < performanceStatus.length; b++) {
            performanceStatus[b].innerHTML = data[i].index.status.performance;
        }

        const powersavingStatus = document.querySelectorAll(".powersaving");
        for (let b = 0; b < powersavingStatus.length; b++) {
            powersavingStatus[b].innerHTML = data[i].index.status.powersaving;
        }
    }
}
