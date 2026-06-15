function MathLerp(a, b ,t){
    return a + t * (b - a);
}


let lastTime = 0;
let lastPingLoopTime = 0;
var fpsLimit = 30;
var runLoop = true;
let prevfps = fpsLimit;

const canvas = $("#main_canvas");
const canvas_ctx = canvas.getContext("2d");

function gameLoop(timestamp) {
    var interval = 1000 / fpsLimit;
	// 1. Calculate how much time has passed since the last frame

	pingInterval = 1000 // ping server every 1 second
	const elapsed = timestamp - lastTime;

	const elapsedPing = timestamp - lastPingLoopTime
	if(elapsedPing >= pingInterval){
		lastPingLoopTime = timestamp - (elapsed % pingInterval)
		pingServer();
	}
	// 2. If enough time has passed, run the frame
	if (elapsed >= interval) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		canvas_ctx.imageSmoothingEnabled = false;
		canvas_ctx.mozImageSmoothingEnabled = false;
		canvas_ctx.webkitImageSmoothingEnabled = false;
		// Adjust lastTime to the current timestamp
		// Subtracting the "overflow" (elapsed % interval) helps maintain 
		// a consistent rhythm even if frames aren't perfectly timed.
		lastTime = timestamp - (elapsed % interval);
		const deltaTime = elapsed / 1000;
		// console.log("tick tock (dt: " + deltaTime + ")");
		
		// update(deltaTime);
		// render();
		canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
		// canvas_ctx.beginPath();
		// canvas_ctx.fillStyle = "lightblue";
		// canvas_ctx.rect(0, 0, canvas.width, canvas.height);
		// canvas_ctx.fill();
		// canvas_ctx.closePath();
		canvas_ctx.drawImage(AssetLoader.Assets["assets/backgroundpage.jpg"], 0, 0, canvas.width, canvas.height);

		gameobjects.forEach((el) => {
			el.update({"deltaTime" : deltaTime});
		})


		// Input.runInput()


		curfps = (Math.floor(1 / deltaTime) / 1)

		$("#stats").innerHTML = "FPS: " + Math.round(MathLerp(prevfps, curfps, 0.8 * deltaTime));
		if(isConnectedToServer)
			$("#stats").innerHTML += "<br>PING: " + ping + "ms";
		// prevfps = Math.max(MathLerp(prevfps, curfps, 0.8 * deltaTime), 0);
		prevfps = curfps
		runMovement({deltaTime: deltaTime});

		particleSystem.runParticleLoop({deltaTime: deltaTime});

		$("#chatbox").style.display = isMainMenuVisible ? "none" : "block"

		// TEST ENVIROMENT
		if(testEnviroment.testEnviromentData.isOn){
			canvas_ctx.beginPath();
			canvas_ctx.font = "bold 15px Oswald";
			let textToDisplay = "TEST ENVIROMENT - SERVER: " + 
			testEnviroment.testEnviromentData.server.name + 
			" (" + testEnviroment.testEnviromentData.server.ip.address + ":" + testEnviroment.testEnviromentData.server.ip.port + ")"
			
			if(isConnectedToServer){
				textToDisplay += " - SERVER VERSION: " + serverSettings.version + " - TICKRATE: " + Math.round(1 / serverSettings.tickTime) + "TPS";
			}
			textToDisplay += " - MIN SERVER VERSION: " + minServerVersion;
			let testEnviromentMetrics = canvas_ctx.measureText(textToDisplay)
			let textToDisplayHeight = testEnviromentMetrics.actualBoundingBoxAscent + testEnviromentMetrics.actualBoundingBoxDescent;
			canvas_ctx.globalAlpha = 0.4;
			canvas_ctx.fillStyle = "black";
			let testEnviromentLabelPadding = 4;
			canvas_ctx.fillRect(canvas.width / 2 - testEnviromentMetrics.width / 2 - testEnviromentLabelPadding, 0 - testEnviromentLabelPadding, testEnviromentMetrics.width + 2 * testEnviromentLabelPadding, textToDisplayHeight + 2 * testEnviromentLabelPadding);
			canvas_ctx.fillStyle = "white";
			canvas_ctx.fillText(textToDisplay, canvas.width / 2 - testEnviromentMetrics.width / 2, textToDisplayHeight);
			canvas_ctx.globalAlpha = 1

			canvas_ctx.closePath();

		}
		// END

	}

	// 3. Always request the next frame as fast as the monitor allows
	if(runLoop)
	requestAnimationFrame(gameLoop);
}
// a = new gameobject(); 
// a.characterid = 0
addEventListener("assets_loaded", () => {
    // console.log("ASSETS LOADED!");
	requestAnimationFrame(gameLoop);
});
AssetLoader.loadAssets();

velocity = 50;
posx = 0;
posy = 0;

function runMovement(time = {deltaTime: 0}){
	velx = 0
	vely = 0
	if(!ismodalshown && !isPauseMenuVisible && !chatOpened)
	{
		// data available: serverSettings.tickTime - interval between server ticks in seconds
		// data available: time.deltaTime - interval between frames in seconds

		
		velx -= Number(Input.inputData["dpad-left"]) * velocity;
		velx += Number(Input.inputData["dpad-right"]) * velocity;

		
		
		vely -= Number(Input.inputData["dpad-down"]) * velocity;
		vely += Number(Input.inputData["dpad-up"]) * velocity;
		

		vectorlength = Math.sqrt(Math.pow(velx, 2) + Math.pow(vely, 2));

		if (vectorlength > 0) {
			const desiredlength = Math.min(velocity, vectorlength);
			
			const scale = desiredlength / vectorlength;
			
			velx *= scale;
			vely *= scale;
		}

		posx += velx * time.deltaTime;
		posy += vely * time.deltaTime;

		// console.log(velx);
	}
	moveTo({x: posx, y: posy},{xv: velx, yv: vely});
}
updateBindings();
if(testEnviroment.isOn){
	chooseAndConnectToServer(testEnviroment.server)
}