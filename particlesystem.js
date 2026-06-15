var particles = new Set();
class particle{
    pos = {
        x: 0,
        y: 0
    }
    direction = 0;
    speed = 10;
    lifetime = 1000;
    asset= "assets/particles/cloud.png";
    assetsize= 32;
    constructor(){
        particles.add(this);
    }
    destroy(){
        particles.delete(this);
    }
}
const particleSystem = {
    particlesList: [
        "cloud.png"
    ],
    async sendParticleServerRequest({count = 10, pos= {x: 0, y: 0}, direction= 0 /* deg */, speed= 10, spread= 30 /* degrees*/, lifetime= 1000 /* ms */, asset= "assets/particles/cloud.png", assetsize= 32} = {}){
        if(isConnectedToServer){
            packet = {
                action: "show_particles",
                data: {
                    count: count,
                    position: {
                        x: pos.x,
                        y: pos.y
                    },
                    direction: direction,
                    speed: speed,
                    spread: spread,
                    lifetime: lifetime,
                    asset: asset,
                    assetsize: assetsize
                }
            }
            console.log(packet)
            socket.send(JSON.stringify(packet));
        }
    },
    async showParticles({count = 10, pos= {x: 0, y: 0}, direction= 0 /* deg */, speed= 10, spread= 30 /* degrees*/, lifetime= 1000 /* ms */, asset= "assets/particles/cloud.png", assetsize= 32} = {}){
        // var http = new XMLHttpRequest();
        // http.open('head', asset);
        // http.onreadystatechange = function(){
        //     if(this.readyState == this.DONE){
        //         if(this.status == 404){
        //             asset = "assets/missing.png";
        //         }

        //         console.warn(this.status != 404 ? "exists" : "doesnt exist");

        //         // SHOW PARTICLE
        //         for (let i = 0; i < count; i++) {
                    

        //         console.log("SHOW")
        //         let local_direction = direction + (Math.random() - 0.5) * spread;

        //         let p = $new("div");
        //         p.style.backgroundImage = "url(" + asset + ")";
        //         p.style.zIndex = 15;
        //         p.style.position = "absolute";
        //         p.style.width = assetsize + "px";
        //         p.style.height = assetsize + "px";
        //         p.style.backgroundSize = assetsize + "px";
        //         p.style.imageRendering = "pixelated";
        //         p.classList.add("particle");
        //         p.setAttribute("particle_speed", speed);
        //         p.style.transform = "translate(" + (pos.x) + "px, " + (-pos.y) + "px)";
        //         p.style.left = -assetsize/2 + "px";
        //         p.style.bottom = -assetsize/2 + "px";
        //         p.setAttribute("pos_x", pos.x);
        //         p.setAttribute("pos_y", pos.y);
        //         p.setAttribute("direction", local_direction);



        //         document.body.appendChild(p);




        //         setTimeout(
        //             () => {
        //                 // HIDE PARTICLE
        //                 console.log("DONE");

        //                 p.remove();
        //             },
        //             lifetime
        //         );
                
        //         };


        //     }
        // }
        // http.send();
        for (let i = 0; i < count; i++) {
            console.log(i);
            let p = new particle();
            p.pos = {x: pos.x, y: pos.y};
            p.direction = direction + (Math.random() - 0.5) * spread;;
            p.speed = speed;
            p.lifetime = lifetime;
            p.asset = asset;
            p.assetsize = assetsize;
        }
    },
    runParticleLoop(time = {deltaTime: 0}){
        let p_list = $(".particle");
        for (let i = 0; i < p_list.length; i++) {
            const e = p_list[i];

            let speed = Number(e.getAttribute("particle_speed"));
            let px = Number(e.getAttribute("pos_x"));
            let py = Number(e.getAttribute("pos_y"));
            let direction = Number(e.getAttribute("direction"));

            px += speed * Math.cos(direction * Math.PI / 180) * time.deltaTime;
            py += speed * Math.sin(direction * Math.PI / 180) * time.deltaTime;

            e.setAttribute("pos_x", px);
            e.setAttribute("pos_y", py);

            e.style.transform = "translate("+px+"px, "+(-py)+"px)";
            // e.style.transform = "translateX(" + (Number(e.style.transform.split("translateX")[1].split("(")[1].split("px")[0]) + Number(e.getAttribute("particle_speed")) * time.deltaTime) + "px) " + e.style.transform.split("translateX")[1];
        }
        particles.entries().forEach(elementArr => {
            const element = elementArr[0]
            if(element.lifetime <= 0){
                element.destroy();
            }
            else{
                // console.log(element.lifetime)
                canvas_ctx.drawImage(AssetLoader.getResource.raw(element.asset), element.pos.x - element.assetsize / 2, canvas.height - element.pos.y - element.assetsize / 2, element.assetsize, element.assetsize)
                element.lifetime -= time.deltaTime * 1000;
                element.pos.x += element.speed * Math.cos(element.direction * Math.PI / 180) * time.deltaTime;
                element.pos.y += element.speed * Math.sin(element.direction * Math.PI / 180) * time.deltaTime;
            }
        });
    }
}
// particleSystem.showParticles({lifetime : 10000, pos : {x: 350, y: 200}, spread : 360, count : 100})
// particleSystem.showParticles({lifetime : 10000, pos : {x: 350, y: 200}, spread : 360, count : 1000, asset : "assets/characters/tea_man/idle_right_1.png"})
// particleSystem.showParticles({lifetime : 10000, pos : {x: 350, y: 200}, spread : 360, count : 1000, asset : "assets/characters/tea_man/idle_right_2.png"})
// particleSystem.showParticles({lifetime : 10000, pos : {x: 350, y: 200}, spread : 360, count : 1000, asset : "assets/characters/tea_man/jump_left.png"})