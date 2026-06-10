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
    getCurrentBindings(){

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
onkeydown = Input.handleInputKeyboardDown;
onkeyup = Input.handleInputKeyboardUp;

// https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
function checkIfKeyPresent(object, key){
    return Object.keys(object).indexOf(key) >= 0
}