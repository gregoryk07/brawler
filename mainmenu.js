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

function mainPlayOnline(){
    if($("#mainmenu").children[0].classList.contains("selectedMenu"))
    {
        clearServerMenuSelection();
        $("#servermenu").style.left = "-160px";
        $("#mainmenu").children[0].classList.remove("selectedMenu")
        mainmenuoptions = [0];
        // console.log("A")

    }
    else{
        $("#servermenu").style.left = "240px";
        $("#mainmenu").children[0].classList.add("selectedMenu")
        mainmenuoptions = [0, 0]
        // console.log("AA")

    }
}
function serverMenuPlayOfficial(){
    if($("#servermenu").children[0].classList.contains("selectedMenu"))
    {
        $("#officialservers").style.top = "100vh";
        $("#officialservers").style.bottom = "-100vh";
        $("#officialservers").style.left = "530px";
        $("#servermenu").children[0].classList.remove("selectedMenu")
        mainmenuoptions = [0, 0]

    }
    else{
        clearServerMenuSelection();
        $("#officialservers").style.left = "580px";
        $("#officialservers").style.top = "0";
        $("#officialservers").style.bottom = "0";
        $("#servermenu").children[0].classList.add("selectedMenu")
        
        mainmenuoptions = [0, 0, 0]


    }
}
function serverMenuPlayCustom(){
    if($("#servermenu").children[1].classList.contains("selectedMenu"))
    {
        $("#customservers").style.top = "100vh";
        $("#customservers").style.bottom = "-100vh";
        $("#customservers").style.left = "530px";
        $("#servermenu").children[1].classList.remove("selectedMenu")

        mainmenuoptions = [0, 1]
    }
    else{
        clearServerMenuSelection();
        $("#customservers").style.left = "580px";
        $("#customservers").style.top = "0";
        $("#customservers").style.bottom = "0";
        $("#servermenu").children[1].classList.add("selectedMenu")

        mainmenuoptions = [0, 1, 1]

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
}
var mainmenuoptions = [];
addEventListener("dpad-down", (e) => {
    handleMainMenu({ direction: {x: 0, y: -1} })
})
addEventListener("dpad-up", (e) => {
    handleMainMenu({ direction: {x: 0, y: 1} })
})
addEventListener("menu-submit", (e) => {
    console.log("SUBMIT")
    handleMainMenu({ click: true })
})
addEventListener("menu-back", (e) => {
    console.log("SUBMIT")
    handleMainMenu({ back: true })
})
function handleMainMenu({ direction = {x: 0, y: 0}, click = false, back = false } = {}){
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
    var handlemainmenu_menu = "mainmenu"
    // console.error(mainmenuoptions.length)
    switch (mainmenuoptions.length) {
        case 2:
            switch (mainmenuoptions[1]) {
                case 0:
                    handlemainmenu_menu = "servermenu"
                    break;
            }
            break;
        case 3:
            // console.warn(mainmenuoptions[2])
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
    
        default:
            handlemainmenu_menu = "mainmenu"
            break;
    }
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
    // console.warn(lastmainmenubtn)
    mainmenubtns[lastmainmenubtn].classList.add("selectedMenuController");
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
        // switch (mainmenuoptions.length) {
        //     case 1:
        //         console.log("111!!!")
        //         //##################################################
        //         let mainmenubtns = $("#mainmenu").children;
        //         lastmainmenubtn = -1;
        //         for (let i = 0; i < mainmenubtns.length; i++) {
        //             if(mainmenubtns[i].classList.contains("selectedMenuController")){
        //                 mainmenubtns[i].classList.remove("selectedMenuController");
        //                 lastmainmenubtn = i;
        //             }
        //         }
        //         console.log(lastmainmenubtn)
        //         if(lastmainmenubtn < 0) lastmainmenubtn = 0;

        //         if(direction.y == 1){
        //             lastmainmenubtn -= 1;
        //             if(lastmainmenubtn < 0){
        //                 lastmainmenubtn = mainmenubtns.length - 1;
        //             }
        //         }
        //         if(direction.y == -1){
        //             lastmainmenubtn += 1;
        //             if(lastmainmenubtn > mainmenubtns.length - 1){
        //                 lastmainmenubtn = 0;
        //             }
        //         }
        //         console.warn(lastmainmenubtn)

        //         mainmenubtns[lastmainmenubtn].classList.add("selectedMenuController");
        //         if(click)
        //         {
        //             console.log("CLICK")
        //             console.log(mainmenuoptions)
        //             // if(mainmenubtns[lastmainmenubtn].hasAttribute("onclick")){
        //             //     eval(mainmenubtns[lastmainmenubtn].getAttribute("onclick"));
        //             // }
        //             // else{
                        
        //                 mainmenubtns[lastmainmenubtn].click();
        //             // }
        //         }
                
        //             console.log(mainmenuoptions)
                
        //         //##################################################
                
        //         console.error("AAA   1")
        //         break;
        //         return;
        
            

        //     case 2:
        //         console.error("AAA   2")
        //         if(back){
        //             let mainmenubtns = $("#mainmenu").children;
        //             mainmenubtns[mainmenuoptions[0]].click();
        //             return
        //         }
        //         if("")
        //         let servermenubtns = $("#servermenu").children;
        //         lastmainmenubtn = -1;
        //         for (let i = 0; i < servermenubtns.length; i++) {
        //             if(servermenubtns[i].classList.contains("selectedMenuController")){
        //                 servermenubtns[i].classList.remove("selectedMenuController");
        //                 lastmainmenubtn = i;
        //             }
        //         }
        //         console.log(lastmainmenubtn)
        //         if(lastmainmenubtn < 0) lastmainmenubtn = 0;

        //         if(direction.y == 1){
        //             lastmainmenubtn -= 1;
        //             if(lastmainmenubtn < 0){
        //                 lastmainmenubtn = servermenubtns.length - 1;
        //             }
        //         }
        //         if(direction.y == -1){
        //             lastmainmenubtn += 1;
        //             if(lastmainmenubtn > servermenubtns.length - 1){
        //                 lastmainmenubtn = 0;
        //             }
        //         }
        //         console.warn(lastmainmenubtn)

        //         servermenubtns[lastmainmenubtn].classList.add("selectedMenuController");

        //         if(click){
        //             servermenubtns[lastmainmenubtn].click();
        //         }

        //         break;


        //     case 3:
        //         console.error("AAA   3")
        //         if(back){
        //             let servermenubtns = $("#servermenu").children;
        //             servermenubtns[mainmenuoptions[1]].click();
        //             return
        //         }
        //         break;
        // }
        
    }
