const ip_address = "localhost"

const ip_isSecure = false;

const ip_port = "8765"

var networkPlayers = new Set();

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
    isConnectedToServer = true;
    
    socket.onmessage = socketOnMsg
    
    socket.onopen = socketOnOpen;

    socket.onclose = socketOnClose;
    
    socket.onerror = socketOnError;


}
function socketOnMsg(e) {

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
    networkPlayers.clear();
}
nickname = "test";
function setNickname(_nickname){
    nickname = _nickname;
    return true;
}
function socketOnOpen(e) {
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
    clearNetworkPlayers();
    console.log("SOCKET CLOSE")
    isConnectedToServer = false;
    $("#mainmenucontainer").hidden = false;
}
function socketOnError(e) {
    clearNetworkPlayers();
    isConnectedToServer = false;
    console.error(e);
    if(reconnectMaxTries > reconnectCurrentTry++);
    connectToServer(reconnect = true);
}
var reconnectMaxTries = 5;
var reconnectCurrentTry = 0;
function disconnectFromServer(){
    isConnectedToServer = false;
    socket.close();
}
updateServerList();
// connectToServer()