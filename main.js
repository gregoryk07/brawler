function MathLerp(a, b ,t){
    return a + t * (b - a);
}


let lastTime = 0;
let lastPingLoopTime = 0;
var fpsLimit = 30;
var runLoop = true;
let prevfps = fpsLimit;

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
		// Adjust lastTime to the current timestamp
		// Subtracting the "overflow" (elapsed % interval) helps maintain 
		// a consistent rhythm even if frames aren't perfectly timed.
		lastTime = timestamp - (elapsed % interval);
		const deltaTime = elapsed / 1000;
		// console.log("tick tock (dt: " + deltaTime + ")");
		
		// update(deltaTime);
		// render();

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
	}

	// 3. Always request the next frame as fast as the monitor allows
	if(runLoop)
	requestAnimationFrame(gameLoop);
}
// a = new gameobject(); 
// a.characterid = 0
requestAnimationFrame(gameLoop);

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