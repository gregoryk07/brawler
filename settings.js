const Cookies = {
    setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
    }
}
function saveKeybinds(){
    Cookies.setCookie("keybinds", JSON.stringify(Input.settings.keyboard))
    console.log("SAVED")
}
addEventListener("blur", (e) => saveSettings())
function loadKeybinds(){
    keybindstring = Cookies.getCookie("keybinds");
    if(keybindstring.length > 0){
        keyboardObj = JSON.parse(keybindstring);
        Input.settings.keyboard = keyboardObj;
    }
    updateBindings();
}
loadSettings();

function loadSettings(){
    loadKeybinds();
    loadNickname();
}
function loadNickname(){
    nicknameString = Cookies.getCookie("nickname");
    if(nicknameString.length > 0) setNickname(nicknameString);
}
function saveNickname(){
    Cookies.setCookie("nickname", nickname);
}
function saveSettings(){
    saveKeybinds()
}
var testEnviroment = {
    activate(){
        testEnviroment.testEnviromentData.isOn = true;
        testEnviroment.save();
        location.reload();
    },
    deactivate(){
        testEnviroment.testEnviromentData.isOn = false;
        testEnviroment.save();
        location.reload();
    },
    save(){
        Cookies.setCookie("testEnviroment", JSON.stringify(testEnviroment.testEnviromentData));
    },
    changeServer(server){
        testEnviroment.testEnviromentData.server = server;
        testEnviroment.save();
        location.reload();
    },
    loadSettings(){
        let testEnviromentJSON = Cookies.getCookie("testEnviroment")
        if(testEnviromentJSON.length > 0)
        {
            testEnviroment.testEnviromentData = JSON.parse(testEnviromentJSON);
        }
        if(testEnviroment.testEnviromentData.isOn){
            console.log("%cTEST ENVIROMENT IS ON", "background: black; color: white; font-size: xx-large; font-weight: bold; padding: 20px; margin: 20px;")
            chooseAndConnectToServer(testEnviroment.testEnviromentData.server)
        }
    },
    testEnviromentData: {
        isOn: false,
        server: officialServers[1]
    }
}
testEnviroment.loadSettings();