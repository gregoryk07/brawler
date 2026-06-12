const $ = (name) => {
    name = String(name);
    switch (name.substring(0, 1)) {
        case "#":
            return document.getElementById(name.substring(1));
            break;

        case ".":
            return document.getElementsByClassName(name.substring(1));
            break;
    
        default:
            return document.getElementsByTagName(name);
            break;
    }
}
const $new = (tagname) => {
    return document.createElement(tagname);
}
function closeCreditsMenu(){
    
    $("#creditsmenu").style.left = "-160px";
    
    clearServerMenuSelection();
    $("#mainmenu").children[3].classList.remove("selectedMenu")
}
function closePlayOnlineMenu(){
    
    $("#servermenu").style.left = "-160px";
    
    clearServerMenuSelection();
    $("#mainmenu").children[0].classList.remove("selectedMenu")
}
function menuSettingsMenu(){
    if($("#mainmenu").children[2].classList.contains("selectedMenu"))
    {
        // clearServerMenuSelection();
        // $("#servermenu").style.left = "-160px";
        // $("#mainmenu").children[0].classList.remove("selectedMenu")
        closeAllMenus();
        mainmenuoptions = [2];
        // console.log("A")

    }
    else{
        closeCreditsMenu();
        closePlayOnlineMenu();
        $("#settings").style.left = "240px";
        $("#mainmenu").children[2].classList.add("selectedMenu")
        mainmenuoptions = [2, 0]
        // console.log("AA")

    }
}
function closeSettingsMenu(){
    $("#settings").style.left = "-160px";
    
    clearServerMenuSelection();
    $("#mainmenu").children[2].classList.remove("selectedMenu")
    closeSettingsMenuControls();
}
function closeAllMenus(){
    $("#creditsmenu").style.left = "-160px";
    $("#mainmenu").children[3].classList.remove("selectedMenu")
    $("#mainmenu").children[1].classList.remove("selectedMenu")
    $("#mainmenu").children[2].classList.remove("selectedMenu")
    $("#servermenu").style.left = "-160px";
        clearServerMenuSelection();
    $("#mainmenu").children[0].classList.remove("selectedMenu")
    mainmenuoptions = [0];
    $("#settings").style.left = "-160px";
    
    $("#mainmenu").children[2].classList.remove("selectedMenu")
}
function hoverOverServer(server){
    $("#servername").innerHTML = "Server name: " + server.name;
    $("#serverregion").innerHTML = "Region: " + server.region;
    $("#preciseregion").innerHTML = "Precise region: " + server.precise_region;
    $("#serveraddress").innerHTML = "Address: " + server.ip.address + ":" + server.ip.port;
    $("#serversecure").innerHTML = server.ip.isSecure ? "SSL SECURE" : "NOT SSL SECURE";
}
function unhoverOverServer(){
    $("#servername").innerHTML = "";
    $("#serverregion").innerHTML = "";
    $("#preciseregion").innerHTML = "";
    $("#serveraddress").innerHTML = "";
    $("#serversecure").innerHTML = "";
}
function mainPlayOnline(){
    // console.error("CALL");
    if($("#mainmenu").children[0].classList.contains("selectedMenu"))
    {
        // clearServerMenuSelection();
        // $("#servermenu").style.left = "-160px";
        // $("#mainmenu").children[0].classList.remove("selectedMenu")
        closeAllMenus();
        mainmenuoptions = [0];
        // console.log("A")

    }
    else{
        closeCreditsMenu();
        closeSettingsMenu();
        $("#servermenu").style.left = "240px";
        $("#mainmenu").children[0].classList.add("selectedMenu")
        mainmenuoptions = [0, 0]
        // console.log("AA")

    }
}
function serverMenuPlayOfficial(){
    
    // console.error("CALL");
    if($("#servermenu").children[0].classList.contains("selectedMenu"))
    {
        $("#officialservers").style.top = "100vh";
        $("#officialservers").style.bottom = "-100vh";
        $("#officialservers").style.left = "530px";
        $("#servermenu").children[0].classList.remove("selectedMenu")
        $("#serverdetails").style.right = "-340px";
        mainmenuoptions = [0, 0]

    }
    else{
        clearServerMenuSelection();
        $("#officialservers").style.left = "580px";
        $("#officialservers").style.top = "0";
        $("#officialservers").style.bottom = "0";
        $("#servermenu").children[0].classList.add("selectedMenu")
        $("#serverdetails").style.right = "0px";
        
        mainmenuoptions = [0, 0, 0]


    }
}
function serverMenuPlayCustom(){
    // console.error("CALL");
    if($("#servermenu").children[1].classList.contains("selectedMenu"))
    {
        $("#customservers").style.top = "100vh";
        $("#customservers").style.bottom = "-100vh";
        $("#customservers").style.left = "530px";
        $("#servermenu").children[1].classList.remove("selectedMenu")
        $("#serverdetails").style.right = "-340px";

        mainmenuoptions = [0, 0]
    }
    else{
        clearServerMenuSelection();
        $("#customservers").style.left = "580px";
        $("#customservers").style.top = "0";
        $("#customservers").style.bottom = "0";
        $("#servermenu").children[1].classList.add("selectedMenu")
        $("#serverdetails").style.right = "0px";

        mainmenuoptions = [0, 0, 1]

    }
}
function closeSettingsMenuControls(){
    $("#controlsettings").style.top = "100vh";
    $("#controlsettings").style.bottom = "-100vh";
    $("#controlsettings").style.left = "530px";
    $("#settings").children[0].classList.remove("selectedMenu")
}
function settingsMenuControls(){
    // console.error("CALL");
    if($("#settings").children[0].classList.contains("selectedMenu"))
    {
        $("#controlsettings").style.top = "100vh";
        $("#controlsettings").style.bottom = "-100vh";
        $("#controlsettings").style.left = "530px";
        $("#settings").children[0].classList.remove("selectedMenu")

        mainmenuoptions = [2, 0]
    }
    else{
        clearServerMenuSelection();
        $("#controlsettings").style.left = "580px";
        $("#controlsettings").style.top = "0";
        $("#controlsettings").style.bottom = "0";
        $("#settings").children[0].classList.add("selectedMenu")

        mainmenuoptions = [2, 0, 0]

    }
}
function clearServerMenuSelection(){
    list = $("#servermenu").children;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        // console.log(element)
        element.classList.remove("selectedMenu")
        
    }
    $("#customservers").style.left = "530px";
    $("#officialservers").style.left = "530px";
    $("#customservers").style.top = "100vh";
    $("#officialservers").style.top = "100vh";
    $("#customservers").style.bottom = "-100vh";
    $("#officialservers").style.bottom = "-100vh";
    $("#serverdetails").style.right = "-340px";
}
function mainCredits(){
    // console.error("CALL");
    if($("#mainmenu").children[3].classList.contains("selectedMenu"))
    {
        // clearServerMenuSelection();
        // $("#creditsmenu").style.left = "-160px";
        // $("#mainmenu").children[3].classList.remove("selectedMenu")
        closeAllMenus();
        mainmenuoptions = [3];
        // console.log("A")

    }
    else{
        closePlayOnlineMenu();
        closeSettingsMenu();
        $("#creditsmenu").style.left = "240px";
        $("#mainmenu").children[3].classList.add("selectedMenu")
        mainmenuoptions = [3, 0]
        // console.log("AA")

    }
}
var mainmenuoptions = [];
addEventListener("dpad-down", (e) => {
    handleMainMenu({ direction: {x: 0, y: -1} })
})
addEventListener("dpad-left", (e) => {
    handleMainMenu({ direction: {x: -1, y: 0} })
})
addEventListener("dpad-right", (e) => {
    handleMainMenu({ direction: {x: 1, y: 0} })
})
addEventListener("dpad-up", (e) => {
    handleMainMenu({ direction: {x: 0, y: 1} })
})
addEventListener("menu-submit", (e) => {
    // console.log("SUBMIT")
    handleMainMenu({ click: true })
})
addEventListener("menu-back", (e) => {
    // console.log("SUBMIT")
    handleMainMenu({ back: true })
})
var isMainMenuVisible = true;
function handleMainMenu({ direction = {x: 0, y: 0}, click = false, back = false } = {}){
    if(ismodalshown){
        if(click){
            hidemodal();
        }
        if(back){
            hidemodal();
        }
        return;
    }
    isMainMenuVisible = !$("#mainmenucontainer").hidden;
    if(!isMainMenuVisible) return;
    // console.log(click);
    if(direction.x > 0) direction.x = 1;
    if(direction.x < 0) direction.x = -1;
    if(direction.y > 0) direction.y = 1;
    if(direction.y < 0) direction.y = -1;
    // console.error(mainmenuoptions)
    if(back){
        tmp = [];
        for (let index = 0; index < mainmenuoptions.length - 1; index++) {
            tmp[tmp.length] = mainmenuoptions[index];
            
        }
        console.log(mainmenuoptions)
        mainmenuoptions = tmp;
        console.log(mainmenuoptions)
        handleMainMenu({click: true});
        return;
    }
    if (mainmenuoptions.length <= 0) {
        mainmenuoptions = [0]
    }
    var handlemainmenu_menu = "NONE"
    // console.error(mainmenuoptions.length)
    switch (mainmenuoptions.length) {
        case 2:
            switch (mainmenuoptions[0]) {
                case 0:
                    switch (mainmenuoptions[1]) {
                        case 0:
                            handlemainmenu_menu = "servermenu"
                            break;
                    }
                    break;

                case 2: 
                    switch (mainmenuoptions[1]) {
                        case 0:
                            handlemainmenu_menu = "settings"
                            break;
                    
                        default:
                            break;
                    }
                    break;
            
                case 3:
                    
                    break;
            }
            
            break;
        case 3:
            // console.warn(mainmenuoptions[2])
            switch(mainmenuoptions[0]){
                case 0:
                    switch (mainmenuoptions[2]) {
                        case 0:
                            // console.log("A")
                            handlemainmenu_menu = "officialservers"
                            break;
                        case 1:
                            // console.log("A")
                            handlemainmenu_menu = "customservers"
                            break;
                    }
                    break;

                case 2:
                    // console.log("a");
                    switch (mainmenuoptions[2]) {
                        case 0:
                            handlemainmenu_menu = "controlsettings"
                            break;
                    
                        case 1:
                            handlemainmenu_menu = "soundsettings";
                            break;
                    }
                    break;
            }
            break;
            
    
        case 1:
            handlemainmenu_menu = "mainmenu"
            break;
    }
    // console.log(handlemainmenu_menu);
    if(handlemainmenu_menu == "NONE") return
    let mainmenubtns = $("#"+handlemainmenu_menu).children;
    lastmainmenubtn = 0;
    for (let i = 0; i < mainmenubtns.length; i++) {
        if(mainmenubtns[i].classList.contains("selectedMenuController")){
            mainmenubtns[i].classList.remove("selectedMenuController");
            lastmainmenubtn = i;
        }
    }
    
    
    // console.log(lastmainmenubtn)
    // if(lastmainmenubtn < 0) lastmainmenubtn = 0;
    if(direction.y == 1){
        lastmainmenubtn -= 1;
        if(lastmainmenubtn < 0){
            lastmainmenubtn = mainmenubtns.length - 1;
        }
    }
    if(direction.y == -1){
        lastmainmenubtn += 1;
        if(lastmainmenubtn > mainmenubtns.length - 1){
            lastmainmenubtn = 0;
        }
    }
    if(direction.x == 1){
        if(mainmenubtns[lastmainmenubtn].tagName.toLowerCase() == "input" && mainmenubtns[lastmainmenubtn].type == "range"){
            mainmenubtns[lastmainmenubtn].value = Number(mainmenubtns[lastmainmenubtn].value) + 1;
            mainmenubtns[lastmainmenubtn].dispatchEvent(new Event("input"))
        }
    }
    if(direction.x == -1){
        if(mainmenubtns[lastmainmenubtn].tagName.toLowerCase() == "input" && mainmenubtns[lastmainmenubtn].type == "range"){
            mainmenubtns[lastmainmenubtn].value = Number(mainmenubtns[lastmainmenubtn].value) - 1;
            mainmenubtns[lastmainmenubtn].dispatchEvent(new Event("input"))
        }
    }
    // console.warn(lastmainmenubtn)
    mainmenubtns[lastmainmenubtn].classList.add("selectedMenuController");

    mainmenubtns[lastmainmenubtn].dispatchEvent(new MouseEvent('mouseover', { 'view': window, 'bubbles': true, 'cancelable': true }));
    // console.error(mainmenubtns[lastmainmenubtn]);
    if(click)
    {
        // console.log("CLICK")
        // console.log(mainmenuoptions)
        // if(mainmenubtns[lastmainmenubtn].hasAttribute("onclick")){
        //     eval(mainmenubtns[lastmainmenubtn].getAttribute("onclick"));
        // }
        // else{
            
            mainmenubtns[lastmainmenubtn].click();
            handleMainMenu();
        // }
    }

    return;

}
isPauseMenuVisible = false;
function showPauseMenu(){
    isPauseMenuVisible = true;
    $("#pausemenucontainer").hidden = false;
}
function hidePauseMenu(){
    isPauseMenuVisible = false;
    $("#pausemenucontainer").hidden = true;
}
function handlePauseMenu() {
    isPauseMenuVisible = !$("#pausemenucontainer").hidden;
}