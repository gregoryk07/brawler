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
    controlsGUI: true,
    GUISettings: {
        margin: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },
        size: 25,
        color: "black",
        opacity: 0.5,
        knobRadius: 50,
        knobSize: 10
    },
    inputData: 
    {
        "dpad-left": 0,
        "dpad-right": 0,
        "dpad-up": 0,
        "dpad-down": 0,
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
    drawControlsGUI(ctx){
        if(!this.drawControlsGUI) return;

        ctx.beginPath();
        ctx.fillStyle = this.GUISettings.color;
        let size = canvas.width * this.GUISettings.size / 100
        ctx.roundRect(
            this.GUISettings.margin.left,
            canvas.height - this.GUISettings.margin.bottom,
            size,
            -size,
            size * this.GUISettings.knobRadius / 100
        );
        ctx.globalAlpha = this.GUISettings.opacity;
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();


        ctx.fillStyle = "white";
        ctx.strokeStyle = "gray";
        
        let knobSize = canvas.width * this.GUISettings.knobSize / 100
        let moveKnobX = ((size - knobSize) / 2) * (this.inputData["dpad-right"] - this.inputData["dpad-left"]);
        let moveKnobY = ((size - knobSize) / 2) * (this.inputData["dpad-down"] - this.inputData["dpad-up"]);
        
        let vectorlength = Math.sqrt(Math.pow(moveKnobX, 2) + Math.pow(moveKnobY, 2));

        let maxLength = ((size - knobSize) / 2)
		if (vectorlength > 0) {
            // console.log(moveKnobX, moveKnobY)
            const desiredlength = Math.min(maxLength, vectorlength);
            // console.log(desiredlength)
			
			const scale = desiredlength / vectorlength;
			
			moveKnobX *= scale;
			moveKnobY *= scale;
            // console.log(moveKnobX, moveKnobY)
		}
        
        ctx.roundRect(
            this.GUISettings.margin.left + (size - knobSize) / 2 + moveKnobX,
            canvas.height - this.GUISettings.margin.bottom - (size - knobSize) / 2 + moveKnobY,
            knobSize,
            -knobSize,
            size * this.GUISettings.knobRadius / 100
        )
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.closePath();

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
        if(ismodalshown && e.code == "Escape"){
            // console.warn($("#modalbtn").getAttribute("onclick"));
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

addEventListener("touchstart", (e) => {
    if(document.fullscreenElement == null)
    $("#main_canvas").requestFullscreen();
});
addEventListener("touchmove", (e) => {
    
    dpadDesired = {
        right: 0,
        left: 0,
        up: 0,
        down: 0
    }
    for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        let size = canvas.width * Input.GUISettings.size / 100
        // ctx.roundRect(
        //     this.GUISettings.margin.left,
        //     canvas.height - this.GUISettings.margin.bottom,
        //     size,
        //     -size,
        //     size * this.GUISettings.knobRadius / 100
        // );
        let touchpadding = size * 0.2;
        if(
            touch.clientX > Input.GUISettings.margin.left - touchpadding &&
            touch.clientX < Input.GUISettings.margin.left + size + touchpadding &&
            touch.clientY < canvas.height - Input.GUISettings.margin.bottom + touchpadding &&
            touch.clientY > canvas.height - Input.GUISettings.margin.bottom - size - touchpadding
        )
        {
            // console.log("TOUCHHHHHHH")
            let centerX = Input.GUISettings.margin.left + size / 2
            let centerY = canvas.height - Input.GUISettings.margin.bottom - size / 2

            let moveX = -centerX+touch.clientX
            let moveY = centerY-touch.clientY



            let vectorlength = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2))

            let desiredlength = Math.min(vectorlength, size / 2)
            
            console.log(desiredlength, size / 2)
            moveX *= 1 / (size / 2)
            moveY *= 1 / (size / 2)

            // console.log(moveX, moveY)

            if(moveX > 0){
                dpadDesired.right = moveX;
                dpadDesired.left = 0;
            }

            if(moveX < 0){
                dpadDesired.right = 0;
                dpadDesired.left = -moveX;
            }

            if(moveY > 0){
                dpadDesired.up = moveY;
                dpadDesired.down = 0;
            }

            if(moveY < 0){
                dpadDesired.up = 0;
                dpadDesired.down = -moveY;
            }

        }
    }
    Input.inputData["dpad-up"] = dpadDesired.up
    Input.inputData["dpad-down"] = dpadDesired.down
    Input.inputData["dpad-left"] = dpadDesired.left
    Input.inputData["dpad-right"] = dpadDesired.right
    // console.log(dpadDesired)
})
addEventListener("touchend", (e) => {
    Input.inputData["dpad-up"]    = 0
    Input.inputData["dpad-down"]  = 0
    Input.inputData["dpad-left"]  = 0
    Input.inputData["dpad-right"] = 0
})
// https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
function checkIfKeyPresent(object, key){
    return Object.keys(object).indexOf(key) >= 0
}