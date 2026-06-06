abletohidemodal = true;
ismodalshown = false;

function showmodal(text, showbutton = false, canhidemodal = true){
    ismodalshown = true;
    abletohidemodal = canhidemodal;
    document.getElementById("modal").innerHTML = "<h2>" + text.split("\n").join("<br>") + "</h2>" + (showbutton ? "<button class='modalbtn' onclick='hidemodal()'>OK</button>" : "");
    document.getElementById("modal").style.display = "block";
}
function hidemodal(force = false){
    if(abletohidemodal || force)
    {
        ismodalshown = false;
        document.getElementById("modal").style.display = "none";
    }
}

hidemodal(true);