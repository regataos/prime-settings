// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslation() {
    const fs = require('fs');

    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Window title
        const windowTitle = document.querySelector("title");
        windowTitle.innerHTML = data[i].index.windowTitle;

        // Side bar
        //Show or hide text
        const showText = document.querySelector(".show-sidebar img");
        showText.title = data[i].index.sideBar.showMenu;

        const hideText = document.querySelector(".hide-sidebar img");
        hideText.title = data[i].index.sideBar.hideMenu;

        //Menu
        //apps page
        const appsPage = document.querySelector(".applications p");
        appsPage.innerHTML = data[i].index.sideBar.applications;

        const appsPageTip = document.querySelector(".applications img");
        appsPageTip.title = data[i].index.sideBar.applications;

        //settings page
        const settingsPage = document.querySelector(".settings p");
        settingsPage.innerHTML = data[i].index.sideBar.settings;

        const settingsPageTip = document.querySelector(".settings img");
        settingsPageTip.title = data[i].index.sideBar.settings;

        //performance page
        const performancePage = document.querySelector(".system-info p");
        performancePage.innerHTML = data[i].index.sideBar.performance;

        const performancePageTip = document.querySelector(".system-info img");
        performancePageTip.title = data[i].index.sideBar.performance;

        //system page
        const systemPage = document.querySelector(".system p");
        systemPage.innerHTML = data[i].index.sideBar.system;

        const systemPageTip = document.querySelector(".system img");
        systemPageTip.title = data[i].index.sideBar.system;
    }
}
applyTranslation();
