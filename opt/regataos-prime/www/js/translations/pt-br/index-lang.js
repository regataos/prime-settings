// Portuguese language translation
$(document).ready(function() {
	// Window title
	$("title").text("Configurações gráficas");

	// Side bar
	//Back button and more
	$(".hide-sidebar img").attr({title:"Apenas ícones"});
	$(".show-sidebar img").attr({title:"Ícones e textos"});
	//Applications
	$(".applications p").text("Aplicativos");
	$(".applications img").attr({title:"Aplicativos"});
	//Settings
	$(".settings p").text("Configurações");
	$(".settings img").attr({title:"Configurações"});
	//Performance
	$(".system-info p").text("Desempenho");
	$(".system-info img").attr({title:"Desempenho"});
	//System
	$(".system p").text("Sistema");
	$(".system img").attr({title:"Sistema"});

    // Universal
    //Popups close button
    $("div#button-close").attr({title:"Fechar"});

    // Applications
    //Session title applications
    $(".page-apps-title").text("Aplicativos");
    $(".page-apps-description").text("Escolha quais aplicativos devem ser executados com a GPU dedicada do seu dispositivo.");

    //Disable/enable for all apps
    $(".disable-all").text("Desativar para todos os aplicativos");
    $(".enable-all").text("Ativar para todos os aplicativos");

    //Add app button
    $("div.remove-app-buttom").attr({title:"Remover"});

    //Power saving or High performance
    $(".performance").text("Alta performance");
    $(".powersaving").text("Economia de energia");

    //Remove app button
    $(".label-add").attr({title:"Use esta opção para adicionar mais aplicativos na lista para executar com a dGPU do seu dispositivo."});
    $(".label-add .text-app").text("Adicionar aplicativo");
    $(".label-add .desc-option-blocks").text("Adicione mais aplicativos na lista");

    // Settings
    //Session title settings
    $(".page-settings-title").text("Configurações");
    $(".page-settings-description").text("Escolha a melhor configuração para a sua GPU dedicada, configure a tela e execute simples testes.");

    //Run everything with the dGPU
    $("#selecte-gpu .text-app").text("Renderizar com GPU:");
    $("#selecte-gpu .integrated").text("Integrada");
    $("#selecte-gpu .render-igpu-desc").text("Economia de energia");
    $("#selecte-gpu .dedicated").text("Dedicada");
    $("#selecte-gpu .render-dgpu-desc").text("Alta performance");

    //Buttons settings
    $(".display-settings").text("Configurações de tela");
    $(".display-settings-info").text("Gerencie e configure monitores e telas");
    $(".nvidia-settings").text("Configurações do NVIDIA Driver");
    $(".nvidia-settings-info").text("Escolha a melhor configuração para a sua GPU");
    $(".run-tests").text("Testar a GPU dedicada");
    $(".run-tests-info").text("Rode simples teste com OpenGL ou Vulkan");

    //Popup
    $(".popup-title-settings").text("Testar a GPU dedicada");
    $(".popup-desc-settings").text("Execute um teste simples com a GPU dedicada do seu dispositivo, escolhendo uma das opções:");
    $(".button-gl").text("Teste com o OpenGL");
    $(".button-vk").text("Teste com a Vulkan");

    //FreeSync
    $(".freesync-on").text("FreeSync ativado");
    $(".freesync-off").text("FreeSync desativado");

    //TearFree
    $(".pst-text").text("Prevenir Screen Tearing");
    $(".tearfree-on").text("Ativado");
    $(".tearfree-off").text("Desativado");

    //CPU governor
    $(".cpu-governor-text").text("CPU Power");
    $(".governor-powersave").text("Equilibrado");
    $(".governor-performance").text("Desempenho");
    $(".cpu-powersave-desc").text("Equilibrado");
    $(".cpu-performance-desc").text("Desempenho");

    //KWin compositor
    $(".compositor-text").text("Efeitos da área de trabalho");
    $(".compositor-on").text("Compositor ativado");
    $(".compositor-off").text("Compositor desativado");

    // Performance
    //Session title performance
    $(".page-performance-title").text("Desempenho");
    $(".page-performance-description").text("Verifique informações sobre o consumo de recursos do hardware.");

    //Block title
    $(".ram-desc").text("Uso da RAM");
    $(".cpu-desc").text("Uso da CPU");
    $(".vram-desc").text("Uso da VRAM");
    $(".gpu-desc").text("Uso da GPU");

    //Description of the blocks
    $(".temp-text").text("Temperatura");
    $(".freq-text").text("Frequência");
    $(".mem-sz-text").text("Tamanho");
    $(".mem-tt-text").text("Tamanho");
    $(".in-use-text").text("Em uso");

    // System
    //Session title settings
    $(".page-system-title").text("Sistema");
    $(".page-system-description").text("Confira mais informações sobre o hardware e software.");

    //Copy info button
    $("#copy-all-txt").text("Copiar tudo");
    $("#copy-all").attr({title:"Copiar as informações para a área de transferência."});

    //Info buttons
    $(".nvidia-driver").text("Versão do NVIDIA Driver");
    $(".dgpu-name").text("Chipset gráfico");
    $(".vram").text("Tamanho da memória de vídeo");
    $(".os-name").text("Sistema operacional");
    $(".ram").text("Memória do sistema");
    $(".cpu").text("Modelo da CPU");
    $(".igpu-name").text("Gráficos integrados");
    $(".mesa-driver").text("Versão do Mesa Driver");
    $(".more-info").text("Mais detalhes sobre o sistema");
    $(".more-info-desc").text("Centro de informações do sistema");
});

function translation_app_status() {
    //Power saving or High performance
    $("span.performance").text("Alta performance");
    $("span.powersaving").text("Economia de energia");
}
