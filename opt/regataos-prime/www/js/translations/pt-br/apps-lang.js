// Portuguese language translation

// Window title
document.querySelector("title").innerHTML = "Max-Q";

// Universal
//Popups close button
document.getElementById("button-close").title = "Fechar";

// Applications
//Session title applications
document.querySelector(".page-apps-title").innerHTML = "Aplicativos";
document.querySelector(".page-apps-description").innerHTML = "Escolha quais aplicativos devem ser executados com a GPU dedicada do seu dispositivo.";

//Disable/enable for all apps
document.querySelector(".disable-all").innerHTML = "Desativar para todos os aplicativos";
document.querySelector(".enable-all").innerHTML = "Ativar para todos os aplicativos";

//Power saving or High performance
const performanceStatus = document.querySelectorAll(".performance");
for (let i = 0; i < performanceStatus.length; i++) {
    performanceStatus[i].innerHTML = "Alta performance";
}

const powersavingStatus = document.querySelectorAll(".powersaving");
for (let i = 0; i < powersavingStatus.length; i++) {
    powersavingStatus[i].innerHTML = "Economia de energia";
}

//Add app button
document.querySelector(".label-add").title = "Use esta opção para adicionar mais aplicativos na lista para executar com a dGPU do seu dispositivo.";
document.querySelector(".label-add .text-app").innerHTML = "Adicionar aplicativo";
document.querySelector(".label-add .desc-option-blocks").innerHTML = "Adicione mais aplicativos na lista";

function translation_app_status() {
    //Power saving or High performance
    const performanceStatus = document.querySelectorAll(".performance");
    for (let i = 0; i < performanceStatus.length; i++) {
        performanceStatus[i].innerHTML = "Alta performance";
    }

    const powersavingStatus = document.querySelectorAll(".powersaving");
    for (let i = 0; i < powersavingStatus.length; i++) {
        powersavingStatus[i].innerHTML = "Economia de energia";
    }
}
