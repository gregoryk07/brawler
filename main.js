const $ = (id) => {
    return document.getElementById(id);
}
const $new = (name) => { return document.createElement(name); }



let lastTime = 0;
var fpsLimit = 30;
var runLoop = true;

function gameLoop(timestamp) {
    var interval = 1000 / fpsLimit;
  // 1. Calculate how much time has passed since the last frame
  const elapsed = timestamp - lastTime;

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

    $("stats").innerHTML = "FPS: " + (Math.floor(1 / deltaTime) / 1);
  }

  // 3. Always request the next frame as fast as the monitor allows
  if(runLoop)
  requestAnimationFrame(gameLoop);
}
a = new gameobject(); 
a.characterid = 0
requestAnimationFrame(gameLoop);