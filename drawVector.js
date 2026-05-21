var vector_arrow_id = 0;
const vector_arrow__tip_offset = 4
function drawVector(from_x = 0, from_y = 0, angle = 0, length = 100, color = "red", text = "", showValue = false){
    

    let v = document.createElement("div");
    v.style.width = length - vector_arrow__tip_offset + "px";
    v.style.padding = "2px 0px";
    v.style.height = "0px";
    v.style.margin = "0px"
    v.style.backgroundColor = color
    v.style.position = "absolute"
    v.style.zIndex = "10"

    v.style.left = from_x + "px";
    v.style.top = from_y + "px";
    v.style.transformOrigin = "left";
    v.style.transform = "rotate("+angle+"deg)";

    v.id = "vector_arrow_" + vector_arrow_id;


    let label = document.createElement("span");

    label.style.display = "inline-block"

    label.style.width = "max-content"

    label.innerText = text + (showValue == true ? " : "+length + "px" : "" );

    label.zIndex = "11"

    v.style.textAlign = "right";
    label.style.color = "white";

    label.style.backgroundColor = "black"

    v.appendChild(label)

    label.style.transform = "rotate(-"+angle+"deg) translateY(-40px)";
    label.style.position = "absolute"

    let arrow = document.createElement("div")

    // arrow.src = "assets/vector_arrow.png";

    v.appendChild(arrow);

    arrow.style.display = "inline-block"

    arrow.style.position = "absolute"
    const arrow_size = 25

    arrow.style.height = arrow_size + "px";
    arrow.style.width = arrow_size + "px";
    arrow.style.backgroundColor = color

    arrow.style.clipPath = "polygon(0 0, 0% 100%, 100% 50%)"

    arrow.style.transform = "translate(" + (-arrow_size+vector_arrow__tip_offset)+"px, " + (-arrow_size/2) + "px)"


    document.body.appendChild(v);

    return vector_arrow_id++;
}
function modifyVector(num, newRot, newLen, newStartX, newStartY, newText, newColor){
    vv = document.getElementById("vector_arrow_" + num)

    if(vv == undefined) return

    if(newRot != undefined){
        vv.style.transform = "rotate("+newRot+"deg)";
        vv.children[0].style.transform = "rotate(-"+newRot+"deg) translateY(-40px)";
    }
    if(newLen != undefined){
        vv.style.width = newLen - vector_arrow__tip_offset + "px";
    }
    if(newStartX != undefined){
        vv.style.left = newStartX + "px";
    }
    if(newStartY != undefined){
        vv.style.top = newStartY + "px";
    }
    if(newText != undefined){
        vv.children[0].innerText = newText
    }
    if(newColor != undefined){
        vv.style.backgroundColor = newColor;
        vv.children[1].style.backgroundColor = newColor
    }
}
function removeVector(num){
    document.getElementById("vector_arrow_" + num).remove();
}