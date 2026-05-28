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

    }
    else{
        $("#servermenu").style.left = "240px";
        $("#mainmenu").children[0].classList.add("selectedMenu")

    }
}
function serverMenuPlayOfficial(){
    if($("#servermenu").children[0].classList.contains("selectedMenu"))
    {
        $("#officialservers").style.top = "100vh";
        $("#officialservers").style.bottom = "-100vh";
        $("#officialservers").style.left = "530px";
        $("#servermenu").children[0].classList.remove("selectedMenu")

    }
    else{
        clearServerMenuSelection();
        $("#officialservers").style.left = "580px";
        $("#officialservers").style.top = "0";
        $("#officialservers").style.bottom = "0";
        $("#servermenu").children[0].classList.add("selectedMenu")


    }
}
function serverMenuPlayCustom(){
    if($("#servermenu").children[1].classList.contains("selectedMenu"))
    {
        $("#customservers").style.top = "100vh";
        $("#customservers").style.bottom = "-100vh";
        $("#customservers").style.left = "530px";
        $("#servermenu").children[1].classList.remove("selectedMenu")

    }
    else{
        clearServerMenuSelection();
        $("#customservers").style.left = "580px";
        $("#customservers").style.top = "0";
        $("#customservers").style.bottom = "0";
        $("#servermenu").children[1].classList.add("selectedMenu")


    }
}
function clearServerMenuSelection(){
    list = $("#servermenu").children;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        console.log(element)
        element.classList.remove("selectedMenu")
        
    }
    $("#customservers").style.left = "530px";
    $("#officialservers").style.left = "530px";
    $("#customservers").style.top = "100vh";
    $("#officialservers").style.top = "100vh";
    $("#customservers").style.bottom = "-100vh";
    $("#officialservers").style.bottom = "-100vh";
}
// mainPlayOnline();
// serverMenuPlayOfficial();