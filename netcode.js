const ip_address = "localhost"

const ip_isSecure = false;

const ip_port = "8765"

var networkPlayers = new Set();

var serverSettings = {
    tickTime: 0.1,
    version: "0.0.0"
}

const minServerVersion = new Version("0.1.0");

const officialServers = [
    {
        region: "local",
        precise_region: "localhost",
        name: "localhost test server",
        ip: {
            address: "localhost",
            port: 8765,
            isSecure: false
        }
    },
    {
        region: "eu",
        precise_region: "Germany Central (Frankfurt)",
        name: "gregoryk07.online official server",
        ip: {
            address: "wss.gregoryk07.online",
            port: 8765,
            isSecure: true
        }
    }
]
const customServers = [
    {
        region: "local",
        precise_region: "localhost",
        name: "207",
        ip: {
            address: "10.224.40.133",
            port: 8765,
            isSecure: false
        }
    },
    {
        region: "local",
        precise_region: "localhost",
        name: "306",
        ip: {
            address: "10.224.41.99",
            port: 8765,
            isSecure: false
        }
    },
    {
        region: "local",
        precise_region: "localhost",
        name: "localhost test server 1",
        ip: {
            address: "localhost",
            port: 8765,
            isSecure: false
        }
    },
    {
        region: "local",
        precise_region: "localhost",
        name: "localhost test server 1",
        ip: {
            address: "localhost",
            port: 8765,
            isSecure: false
        }
    },
]

function updateServerList(){
    official = $("#officialservers")

    official.innerText = ""

    for (let i = 0; i < officialServers.length; i++) {
        const element = officialServers[i];
        li = $new("button");

        official.appendChild(li);

        // h2 = $new("span");

        span = $new("span")

        span.innerText = element.name;

        li.appendChild(span)

        // li.appendChild(h2);

        // span = $new("span")

        // li.appendChild(span);

        // span.innerText = element.region
        // if(element.precise_region.length > 0){
        //     span.innerText += " - " + element.precise_region
        // }
        // if(element.ip.isSecure){
        //     span.innerText += " (SSL SECURE)"
        // }

        li.setAttribute("onmouseover", "hoverOverServer(officialServers[" + i + "])");
        li.setAttribute("onmouseleave", "unhoverOverServer()");

        li.setAttribute("onclick", "chooseAndConnectToServer(officialServers["+i+"])");

        if(chosenServer == element){
            li.classList.add("chosenServer")
        }
    }


    custom = $("#customservers")

    custom.innerText = ""

    for (let i = 0; i < customServers.length; i++) {
        const element = customServers[i];
        li = $new("button");

        custom.appendChild(li);

        span = $new("span")

        span.innerText = element.name;

        li.appendChild(span)

        // h2 = $new("h2");

        // h2.innerText = element.name;

        // li.appendChild(h2);

        // span = $new("span")

        // li.appendChild(span);

        // span.innerText = element.region
        // if(element.precise_region.length > 0){
        //     span.innerText += " - " + element.precise_region
        // }
        // if(element.ip.isSecure){
        //     span.innerText += " (SSL SECURE)"
        // }

        
        li.setAttribute("onmouseover", "hoverOverServer(customServers[" + i + "])");
        li.setAttribute("onmouseleave", "unhoverOverServer()");

        li.setAttribute("onclick", "chooseAndConnectToServer(customServers["+i+"])");

        if(chosenServer == element){
            li.classList.add("chosenServer")
        }
    }
}

function chooseAndConnectToServer(server){
    chosenServer = server;
    connectToServer();
    updateServerList();
}

socket = new WebSocket("");
socket.close();

chosenServer = undefined;

var isConnectedToServer = false

function connectToServer(reconnect=false){
    try {
        socket.close();
    } catch (error) {
        
    }
    if(!reconnect) reconnectCurrentTry = 0;
    if(isConnectedToServer) {
        console.warn("ALREADY CONNECTED TO A SERVER, ABORTING");
        return;
    }
    console.log("CONNECTING TO WEBSOCKET...");
    if(chosenServer == undefined) {
        console.warn("SERVER NOT CHOSEN BUT ATTEMPTED CONNECTION!")
        return;
    }
    try {
        addr = (chosenServer.ip.isSecure ? "wss" : "ws") + "://" + chosenServer.ip.address + ":" + chosenServer.ip.port;
    } catch (error) {
        console.error("INVALID CHOSEN SERVER CONFIGURATION");
        
    }

    console.log(addr);

    socket = new WebSocket(addr);
    
    $("#mainmenucontainer").hidden = true;
    
    socket.onmessage = socketOnMsg
    
    socket.onopen = socketOnOpen;

    socket.onclose = socketOnClose;
    
    socket.onerror = socketOnError;


}
var lastPingTime
var ping = 0;
function pingServer(){
    if(isConnectedToServer){
        lastPingTime = new Date();
        socket.send(JSON.stringify({"action":"ping"}));

    }
}
function socketOnMsg(e) {
    if(JSON.parse(e.data).action == "ping_reply"){
        ping = Math.abs(lastPingTime - new Date());
    }
    if(JSON.parse(e.data).action == "show_particles"){
        console.log("PARTICLE");
        msg = JSON.parse(e.data);
        console.log(msg);
        args = {count: msg.count, pos: {x: msg.position.x, y: msg.position.y}, direction: msg.direction, speed: msg.speed, spread: msg.spread, lifetime: msg.lifetime, asset: msg.asset, assetsize: msg.assetsize}
        particleSystem.showParticles(args)
        console.log(args);
        
    }
    if(JSON.parse(e.data).action == "init_data"){
        try {
            
            msg = JSON.parse(e.data);
            serverVersion = new Version(msg.version);
            if(minServerVersion.isGreaterThan(serverVersion)){
                disconnectFromServer();
                console.error("Server is deprecated ("+serverVersion.toString()+")\nMinimum server version required: "+minServerVersion.toString());
                showmodal("Server is deprecated ("+serverVersion.toString()+")\nMinimum server version required: "+minServerVersion.toString(), true, true);
                return;
            }
            console.log("SERVER VERSION: " + serverVersion.toString());
            serverSettings.version = serverVersion.toString();
            serverSettings.tickTime = msg.tickTime;
            hidemodal(true);
        } catch (error) {
            console.error(error)
            disconnectFromServer();
            console.error("Server is deprecated (unknown)\nMinimum server version required: "+minServerVersion.toString());
            showmodal("Server is deprecated (unknown)\nMinimum server version required: "+minServerVersion.toString(), true, true);
            return;
        }
    }

    if(JSON.parse(e.data).action == "chat_message"){
        newmsg = $new("div");

        msg = JSON.parse(e.data);

        newmsg.innerText = msg.from + ": " + msg.content;

        $("#chatcontents").appendChild(newmsg);
        $("#chatcontents").scrollBy(0, 1000)
    }
    // console.log(e);
    // console.log("UPDATE");
    if(JSON.parse(e.data).action == "update")
    {

        newPlayers = JSON.parse(e.data).players;

        notUsed = new Set();

        networkPlayers.entries().forEach(element => {
            notUsed.add(element[0])
        });
        
        for (let i = 0; i < newPlayers.length; i++) {
            const newPlayer = newPlayers[i];
            
            uuid = newPlayer.id;
            // console.log(uuid);
            found = null;
            networkPlayers.entries().forEach(element => {
                if(element[0].uuid == uuid)
                {
                    found = element[0];
                    // console.error("AAA")
                    notUsed.delete(element[0]);
                }
            });
            // console.warn(notUsed.size)
            // notUsed.entries().forEach(element => {
            //     if(element[0].uuid == uuid)
            //     {
            //         // found = element;
            //         // notUsed.delete(element);
            //         console.warn(element[0].uuid + "\n"+uuid)
            //         // console.error("AA");
            //     }
            // });
            if(found == null || found == undefined){
                console.warn("CREATING NEW!");
                let a = new gameobject();
                a.setUUID(uuid);
                networkPlayers.add(a);
                found = a;
            }
            found.characterid = newPlayer.hero;
            found.nickname = newPlayer.nickname;
            found.position = {
                x: newPlayer.position.x,
                y: newPlayer.position.y
            }
            found.velocity = {
                x: newPlayer.velocity.x,
                y: newPlayer.velocity.y
            }
            found.showNickname = true;
            // console.log(found);
        }
        notUsed.entries().forEach(element => {
            // console.log(element);
            element[0].destroy();
            notUsed.delete(element[0]);
            networkPlayers.delete(element[0])
        });
        // console.log(notUsed.size)
    }
}

function clearNetworkPlayers(){
    serverSettings = {
        tickTime: 0.1,
        version: "0.0.0"
    };
    networkPlayers.entries().forEach((e) => {
        e[0].destroy();
    })
    networkPlayers.clear();
}
nickname = "test";
function setNickname(_nickname){
    if(_nickname.length == 0) return;
    nickname = _nickname;
    if(isConnectedToServer){
         socket.send(JSON.stringify(
        {
            "action":"information_set",
            "data": 
            {
                "username" : nickname,
                "hero": "0"
            }
        }
    ))
    }
    saveNickname();
    updateNicknameUI();
    return true;
}
function updateNicknameUI(){
    $("#changenicknamebtn").children[0].innerText = "Update nickname (" + nickname + ")";
}
updateNicknameUI();
function setNicknameModal(){
    showmodal("Enter your new nickname", true, true, true, "setNickname");
}
function moveTo({x= 0, y= 0} = {}, {xv = 0, yv = 0} = {}){
    if(isConnectedToServer){
        socket.send(JSON.stringify({
        "action":"update_player","data": 
            {
            "position" :
                {
                    "x": x,
                    "y": y
                },
            "velocity": {
                    "x": xv,
                    "y": yv
                },
                "rot": 90
            }
        }) );
        return true;
    }
    return false;
}
function socketOnOpen(e) {
    
    isConnectedToServer = true;
    socket.send(JSON.stringify(
        {
            "action":"information_set",
            "data": 
            {
                "username" : nickname,
                "hero": "0"
            }
        }
    ))
    clearNetworkPlayers();
    console.log("SOCKET OPEN")
    reconnectCurrentTry = 0;
}
function socketOnClose(e) {
    console.warn(e);
    clearNetworkPlayers();
    console.log("SOCKET CLOSE")
    isConnectedToServer = false;
    $("#mainmenucontainer").hidden = false;
}
function socketOnError(e) {
    console.error(e);
    clearNetworkPlayers();
    console.log("SOCKET ERROR")
    isConnectedToServer = false;
    $("#mainmenucontainer").hidden = false;
}
var reconnectMaxTries = 5;
var reconnectCurrentTry = 0;
function disconnectFromServer(){
    isConnectedToServer = false;
    socket.close();
    socketOnClose();
    closeAllMenus();
}
updateServerList();
// connectToServer()
