abletohidemodal = true;
ismodalshown = false;
ismodalinputshown = false;

function showmodal(text, showbutton = false, canhidemodal = true, showInputField = false, submitFunction){
    ismodalshown = true;
    abletohidemodal = canhidemodal;
    document.getElementById("modal").innerHTML = "<h2>" + text.split("\n").join("<br>") + "</h2>" + (showInputField ? "<input id='modalinputfield' type='text' class='modalbtn' value=''>" : "") + (showbutton ? "<button class='modalbtn' id='modalbtn' onclick=\"hidemodal()" + ((submitFunction != undefined || submitFunction != null) ? "; " + submitFunction + "($('#modalinputfield').value)" : "") + "\">OK</button>" : "");
    document.getElementById("modal").style.display = "block";
    ismodalinputshown = showInputField;
    if(showInputField) $("#modalinputfield").focus();
}
function hidemodal(force = false){
    if(abletohidemodal || force)
    {
        ismodalshown = false;
        document.getElementById("modal").style.display = "none";
    }
}

hidemodal(true);