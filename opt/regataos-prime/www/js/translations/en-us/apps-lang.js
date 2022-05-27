// English language translation

// Window title
document.querySelector("title").innerHTML = "Max-Q";

// Universal
//Popups close button
document.getElementById("button-close").title = "Close";

// Applications
//Session title applications
document.querySelector(".page-apps-title").innerHTML = "Applications";
document.querySelector(".page-apps-description").innerHTML = "Choose which applications to run with your device's dedicated GPU.";

//Disable/enable for all apps
document.querySelector(".disable-all").innerHTML = "Disable for all apps";
document.querySelector(".enable-all").innerHTML = "Enable for all apps";

//Power saving or High performance
const performanceStatus = document.querySelectorAll(".performance");
for (let i = 0; i < performanceStatus.length; i++) {
    performanceStatus[i].innerHTML = "High performance";
}

const powersavingStatus = document.querySelectorAll(".powersaving");
for (let i = 0; i < powersavingStatus.length; i++) {
    powersavingStatus[i].innerHTML = "Power saving";
}

//Add app button
document.querySelector(".label-add").title = "Use this option to add more applications to the list to run with your device's dGPU.";
document.querySelector(".label-add .text-app").innerHTML = "Add application";
document.querySelector(".label-add .desc-option-blocks").innerHTML = "Add more apps to the list";

function translation_app_status() {
    //Power saving or High performance
    const performanceStatus = document.querySelectorAll(".performance");
    for (let i = 0; i < performanceStatus.length; i++) {
        performanceStatus[i].innerHTML = "High performance";
    }

    const powersavingStatus = document.querySelectorAll(".powersaving");
    for (let i = 0; i < powersavingStatus.length; i++) {
        powersavingStatus[i].innerHTML = "Power saving";
    }
}
