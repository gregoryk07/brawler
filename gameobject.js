var gameobjects = new Set();
nextid = 0;

class gameobject{
    showNickname = false;
    id = -1;
    nickname = "";
    uuid = "";
    position = {
        x: 0,
        y: 0
    };
    velocity = {
        x: 0,
        y: 0
    };
    facing = {

    }
    velVector = drawVector(0, 0, 0, 0, "red", "VELOCITY", true);
    animationFrame = 0;
    update(time = {deltaTime: 0.1}){
        this.#nicknameObj.innerText = this.nickname;
        // console.log(Math.floor(this.animationFrame/this.animationFrameTimeSpan));
        // animations
        if(this.characterid != -1){
            this.animationFrame+= time.deltaTime;
            while(characters[this.characterid].sprites.animations[this.selectedAnimation].length * this.animationFrameTimeSpan < this.animationFrame){
                this.animationFrame -= characters[this.characterid].sprites.animations[this.selectedAnimation].length * this.animationFrameTimeSpan;
                // console.warn(this.animationFrame);
            }

        }
        //INTERPOLATION BASED ON VELOCITY GIVEN BY SERVER
        this.position.x += this.velocity.x * time.deltaTime;
        this.position.y += this.velocity.y * time.deltaTime;

        // let angleInDegrees = (180 / Math.PI) * Math.asin(this.velocity.y / Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2)));


        //// VELOCITY VECTORS
        // Returns the angle in radians from -PI to PI
        let angleInRadians = Math.atan2(this.velocity.y, this.velocity.x);

        // Convert to degrees
        let angleInDegrees = angleInRadians * (180 / Math.PI);

        modifyVector(this.velVector, -angleInDegrees, Math.sqrt(
            Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2)
        ), this.position.x+64, this.position.y+64, "VELOCITY", "red", true);

        this.renderSelf();
    }

    renderSelf(){
        var self = $("#gameobject-" + this.id)
        if(self == null){
            $("#sprites").innerHTML += "<div id=\"gameobject-" + this.id + "\" class=\"characters\">";
            self = $("#gameobject-" + this.id);
            self.appendChild(this.#nicknameObj);
        }
        this.#nicknameObj.style.display = this.showNickname ? "inline-block" : "none";
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

    setUUID(uuid){
        this.uuid = uuid;
    }

    #nicknameObj = null;
    
    constructor(){
        this.#nicknameObj = $new("span");
        this.#nicknameObj.innerText = this.nickname;
        this.#nicknameObj.classList.add("nickname_nameplate");
        console.log("CREATED");
        this.id = nextid++;
        gameobjects.add(this);
    }
    destroy(){
        $("#gameobject-" + this.id).outerHTML = "";
        gameobjects.delete(this);
        console.warn(this.velVector);
        removeVector(this.velVector);
        console.log("DESTROYED");
    }
}