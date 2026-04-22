var gameobjects = new Set();
nextid = 0;

class gameobject{
    id = -1;
    position = {
        x: 0,
        y: 0
    }
    facing = {

    }
    animationFrame = 0;
    update(time = {deltaTime: 0.1}){
        // console.log(Math.floor(this.animationFrame/this.animationFrameTimeSpan));
        // animations
        if(this.characterid != -1){
            this.animationFrame+= time.deltaTime;
            while(characters[this.characterid].sprites.animations[this.selectedAnimation].length * this.animationFrameTimeSpan < this.animationFrame){
                this.animationFrame -= characters[this.characterid].sprites.animations[this.selectedAnimation].length * this.animationFrameTimeSpan;
                // console.warn(this.animationFrame);
            }

        }

        this.renderSelf();
    }

    renderSelf(){
        var self = $("gameobject-" + this.id)
        if(self == null){
            $("sprites").innerHTML += "<div id=\"gameobject-" + this.id + "\" class=\"characters\">";
            self = $("gameobject-" + this.id);
        }
        // console.log(self);

        self.style.transform = "translate(" + this.position.x + "px, -" + this.position.y + "px)";

        if(this.characterid != -1)
        {
            self.style.backgroundSize = "128px 128px";
            self.style.imageRendering = "pixelated";
            self.style.backgroundImage = "url('assets/characters/" + characters[this.characterid].
            sprites.animations[this.selectedAnimation]
            [Math.min(characters[this.characterid].sprites.animations[this.selectedAnimation].length-1, Math.floor(this.animationFrame/this.animationFrameTimeSpan))] + "')"
        }
    }

    characterid = -1;

    selectedAnimation = "idle_right";

    animationFrameTimeSpan = 0.5;
    
    constructor(){
        console.log("CREATED");
        this.id = nextid++;
        gameobjects.add(this);
    }
    destroy(){
        gameobjects.delete(this);
        console.log("DESTROYED");
    }
}