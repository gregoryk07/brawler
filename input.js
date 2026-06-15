var input = {
    left: false,
    right: false,
    jump: false,
    crouch: false,
    attack: false,
    menu: false
}

function runInput(){
    console.log("INPUT");
}
var Input = {
    inputData: 
    {
        "dpad-left": false,
        "dpad-right": false,
        "dpad-up": false,
        "dpad-down": false,
        "jump": false,
        "throw": false,
        "menu-back": false,
        "open-chat": false,
        "submit": false
    },
    gamepadInput: {
        "dpad-left": false,
        "dpad-right": false,
        "dpad-up": false,
        "dpad-down": false,
        "jump": false,
        "throw": false,
        "menu-back": false,
        "open-chat": false,
        "submit": false
    },
    lastGamepadInput: {
        "dpad-left": false,
        "dpad-right": false,
        "dpad-up": false,
        "dpad-down": false,
        "jump": false,
        "throw": false,
        "menu-back": false,
        "open-chat": false,
        "submit": false
    },
    settings: {
        keyboard: {
            "KeyA": "dpad-left",
            "KeyD": "dpad-right",
            "KeyW": "dpad-up",
            "KeyS": "dpad-down",
            "Space": "jump",
            "KeyF": "throw",
            "Escape": "menu-back",
            "KeyT": "open-chat",
            "Enter": "menu-submit"
        }
    },
    handleInputKeyboardDown(e){
        // console.log(e.code);
        if(isRebinding){
            console.log("BIND " + e.code + " TO " + actionToBind);
            bind(e.code);
            e.preventDefault();
            return;
        }
        if(ismodalshown && e.code == "Enter"){
            // console.warn($("#modalbtn").getAttribute("onclick"));
            if($("#modalbtn") != null)
            $("#modalbtn").click();
            e.preventDefault();
            hidemodal();
            return;
        }
        if(ismodalshown && ismodalinputshown && e.code != "Escape"){
            // e.preventDefault();
            return;
        }
        if(Input.settings.keyboard[e.code] == "menu-back" && chatOpened){
            closeChat();
            e.preventDefault();
            return;
        }
        if(Input.settings.keyboard[e.code] == "menu-submit" && chatOpened){
            sendChatMSG();
            e.preventDefault();
            return;
        }
        if(chatOpened){
            return;
        }
        if(Input.settings.keyboard[e.code] == "open-chat" && !chatOpened){
            openChat();
            e.preventDefault();
            return;
        }
        // e.preventDefault();
        // console.log("DOWN " + e.code)
        if(checkIfKeyPresent(Input.settings.keyboard, e.code)) e.preventDefault();
        Input.inputData[Input.settings.keyboard[e.code]] = true;
        dispatchEvent(new CustomEvent(Input.settings.keyboard[e.code], { detail: {
            timestamp: new Date(Date.now()),
            type: "keyboard",
            key: e.code
        }}))
    },
    handleInputKeyboardUp(e){
        // console.log("UP " + e.code)
        Input.inputData[Input.settings.keyboard[e.code]] = false;
    },
    handleInputGamepad(){
        gamepads = navigator.getGamepads();
        for (let i = 0; i < gamepads.length; i++) {
            const gm = gamepads[i];
            if(gm == null) continue;
            console.log(gm);
        }
    },
    getCurrentBinding(action, shortName = false){
        let keys = Object.keys(Input.settings.keyboard);
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if(Input.settings.keyboard[element] == action)
            {
                if(shortName){
                    if(element.toString().includes("Key")){
                        return element.toString().split("Key")[1]
                    }
                }
                return element.toString();
                
            }
        }
        return "unbind";
    }

}
var chatOpened = false;
function openChat(){
    $("#chatmsg").focus();
    chatOpened = true;
    if(isMainMenuVisible) closeChat();
}
function closeChat(){
    chatOpened = false;
    $("#chatmsg").value = "";
    $("#chatmsg").blur();
}
function sendChatMSG(){
    if(isConnectedToServer){
        socket.send(JSON.stringify(
            {
                "action": "chat_message",
                "message": $("#chatmsg").value
            }
        ))
    }
    closeChat();
}
var isRebinding = false;
var actionToBind = "";
function startRebind(action){
    if(action == undefined || action == null) return;
    isRebinding = true;
    actionToBind = action;
    showmodal("Press a key to bind to " + action, false, false);
}
function bind(key){
    isRebinding = false;
    prevKey = "";
    keys = Object.keys(Input.settings.keyboard)
    for (let i = 0; i < keys.length; i++) {
        const _key = keys[i];
        if(Input.settings.keyboard[_key] == actionToBind)
        prevKey = _key;
    }
    delete Input.settings.keyboard[prevKey];
    Input.settings.keyboard[key] = actionToBind;
    actionToBind = "";
    hidemodal(true);
    updateBindings();
}
function updateBindings(){
    $("#btn_rebind_dpad-left").children[0].innerHTML = "Left (" + Input.getCurrentBinding("dpad-left", true) + ")";
    $("#btn_rebind_dpad-right").children[0].innerHTML = "Right (" + Input.getCurrentBinding("dpad-right", true) + ")";
    $("#btn_rebind_dpad-up").children[0].innerHTML = "Up (" + Input.getCurrentBinding("dpad-up", true) + ")";
    $("#btn_rebind_dpad-down").children[0].innerHTML = "Down (" + Input.getCurrentBinding("dpad-down", true) + ")";
    $("#btn_rebind_jump").children[0].innerHTML = "Jump (" + Input.getCurrentBinding("jump", true) + ")";
    $("#btn_rebind_throw").children[0].innerHTML = "Throw (" + Input.getCurrentBinding("throw", true) + ")";
    $("#btn_rebind_menu-back").children[0].innerHTML = "Pause Menu / Back (" + Input.getCurrentBinding("menu-back", true) + ")";
    $("#btn_rebind_menu-submit").children[0].innerHTML = "Submit (" + Input.getCurrentBinding("menu-submit", true) + ")";
    $("#btn_rebind_open-chat").children[0].innerHTML = "Open chat (" + Input.getCurrentBinding("open-chat", true) + ")";
}
onkeydown = Input.handleInputKeyboardDown;
onkeyup = Input.handleInputKeyboardUp;

// https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
function checkIfKeyPresent(object, key){
    return Object.keys(object).indexOf(key) >= 0
}