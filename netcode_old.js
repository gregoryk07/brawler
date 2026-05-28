const ip_address = "localhost"

const ip_isSecure = false;

const ip_port = "8765"

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
    official = $("officialserverlist")

    official.innerText = ""

    for (let i = 0; i < officialServers.length; i++) {
        const element = officialServers[i];
        li = $new("li");

        official.appendChild(li);

        h2 = $new("h2");

        h2.innerText = element.name;

        li.appendChild(h2);

        span = $new("span")

        li.appendChild(span);

        span.innerText = element.region
        if(element.precise_region.length > 0){
            span.innerText += " - " + element.precise_region
        }
        if(element.ip.isSecure){
            span.innerText += " (SSL SECURE)"
        }

        li.setAttribute("onclick", "chooseServer(officialServers["+i+"])");

        if(chosenServer == element){
            li.classList.add("chosenServer")
        }
    }


    custom = $("customserverlist")

    custom.innerText = ""

    for (let i = 0; i < customServers.length; i++) {
        const element = customServers[i];
        li = $new("li");

        custom.appendChild(li);

        h2 = $new("h2");

        h2.innerText = element.name;

        li.appendChild(h2);

        span = $new("span")

        li.appendChild(span);

        span.innerText = element.region
        if(element.precise_region.length > 0){
            span.innerText += " - " + element.precise_region
        }
        if(element.ip.isSecure){
            span.innerText += " (SSL SECURE)"
        }

        li.setAttribute("onclick", "chooseServer(customServers["+i+"])");

        if(chosenServer == element){
            li.classList.add("chosenServer")
        }
    }

    if(chosenServer == undefined){
        $("chooseservermenubtn_connect").setAttribute("disabled", "")
    }
    else{
        
        $("chooseservermenubtn_connect").removeAttribute("disabled")
    }
}

function chooseAndConnectToServer(server){
    chosenServer = server;
    connectToServer();
    updateServerList();
}

function chooseServer(server){
    if(chosenServer == server){
        if(chosenServer == undefined)
        {
            chosenServer = server;
        }
        else{
            chosenServer = undefined
        }
    }
    else{
        chosenServer = server
    }
    updateServerList();
}

socket = new WebSocket("");

chosenServer = undefined;

var isConnectedToServer = false

function connectToServer(){
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
    isConnectedToServer = true;
    
    socket.onmessage = socketOnMsg
    
    socket.onopen = socketOnOpen;

    socket.onclose = socketOnClose;
    
    socket.onerror = socketOnError;

}
function socketOnMsg(e) {
    console.log(e);
}
function socketOnOpen(e) {
    console.log("SOCKET OPEN")
}
function socketOnClose(e) {
    console.log("SOCKET CLOSE")
    isConnectedToServer = false;
    connectToServer();
}
function socketOnError(e) {
    isConnectedToServer = false;
    console.error(e)
}
updateServerList();
// connectToServer()