// Portuguese language translation

// Window title
document.querySelector("title").innerHTML = "Max-Q";

// Universal
//Popups close button
document.getElementById("button-close").title = "Fechar";

// Settings
//Session title settings
document.querySelector(".page-settings-title").innerHTML = "Configurações";
document.querySelector(".page-settings-description").innerHTML = "Escolha a melhor configuração para a sua GPU dedicada, configure a tela e execute simples testes.";

//Run everything with the dGPU
document.querySelector(".select-gpu-text").innerHTML = "Renderizar com GPU:";
document.querySelector(".integrated").innerHTML = "Integrada";
document.querySelector(".render-igpu-desc").innerHTML = "Economia de energia";
document.querySelector(".dedicated").innerHTML = "Dedicada";
document.querySelector(".render-dgpu-desc").innerHTML = "Alta performance";

//Buttons settings
document.querySelector(".display-settings").innerHTML = "Configurações de tela";
document.querySelector(".display-settings-info").innerHTML = "Gerencie e configure monitores e telas";
document.querySelector(".nvidia-settings").innerHTML = "Configurações do NVIDIA Driver";
document.querySelector(".nvidia-settings-info").innerHTML = "Escolha a melhor configuração para a sua GPU";
document.querySelector(".run-tests").innerHTML = "Testar a GPU dedicada";
document.querySelector(".run-tests-info").innerHTML = "Rode simples teste com OpenGL ou Vulkan";

//Popup
document.querySelector(".popup-title-settings").innerHTML = "Testar a GPU dedicada";
document.querySelector(".popup-desc-settings").innerHTML = "Execute simples testes com a GPU dedicada do seu dispositivo usando as seguintes opções:";
document.querySelector(".button-gl").innerHTML = "Testar com OpenGL";
document.querySelector(".button-vk").innerHTML = "Testar com Vulkan";

//FreeSync
document.querySelector(".freesync-on").innerHTML = "FreeSync ativado";
document.querySelector(".freesync-off").innerHTML = "FreeSync desativado";

//TearFree
document.querySelector(".pst-text").innerHTML = "Prevenir Screen Tearing";
document.querySelector(".tearfree-on").innerHTML = "Ativado";
document.querySelector(".tearfree-off").innerHTML = "Desativado";

//CPU governor
document.querySelector(".cpu-governor-text").innerHTML = "CPU Power";
document.querySelector(".governor-powersave").innerHTML = "Equilibrado";
document.querySelector(".governor-performance").innerHTML = "Desempenho";
document.querySelector(".cpu-powersave-desc").innerHTML = "Equilibrado";
document.querySelector(".cpu-performance-desc").innerHTML = "Desempenho";

//KWin compositor
document.querySelector(".compositor-text").innerHTML = "Efeitos da área de trabalho";
document.querySelector(".compositor-on").innerHTML = "Compositor ativado";
document.querySelector(".compositor-off").innerHTML = "Compositor desativado";

//Unlock widgets
document.querySelector(".unlockwidgets-text").innerHTML = "Bloquear widgets";
document.querySelector(".unlockwidgets-on").innerHTML = "Widgets bloqueados";
document.querySelector(".unlockwidgets-off").innerHTML = "Widgets desbloqueados";

//AMD AMF
document.querySelector(".amf-text").innerHTML = "Ativar o AMD AMF";
document.querySelector(".amf-on").innerHTML = "AMD AMF ativado";
document.querySelector(".amf-off").innerHTML = "AMD AMF desativado";
