var codeInBox;
var actionsToBeRun = [];
var canvasArea = document.querySelector("#canvasArea");

var codeButton = document.createElement("button");
codeButton.innerText = "Get Code";
codeButton.onclick = getCode;
codeButton.className = "getCodeButton";
canvasArea.append(codeButton);

var runButton = document.createElement("button");
runButton.innerText = "Run Code";
runButton.onclick = runCode;
runButton.className = "runCodeButton";
canvasArea.append(runButton);

var actionDiv = document.createElement("div");
actionDiv.id = "commandBar";
actionDiv.style.marginTop = Math.floor(((window.innerWidth * .67 * .15) + 5)) + "px";
actionDiv.style.marginLeft = "3px";
actionDiv.style.height =  Math.floor((window.innerWidth * .67 / 4 - 20 ) - (window.innerWidth * .67 * .15)) + "px";
actionDiv.style.width =  Math.floor(window.innerWidth / 2) - 6 + "px";
actionDiv.style.outline = "3px solid black";
canvasArea.append(actionDiv);

var actionsRow = document.createElement("p");
actionsRow.style.fontSize = "x-large";
actionDiv.append(actionsRow)



function getCode(){
  codeInBox = document.getElementsByClassName("codeBox")[0].value;
  console.log(codeInBox);
}

function listActions(){
  actionsRow.innerHTML = "";
  for( i = 0; i < actionsToBeRun.length; i++){
    actionsRow.innerHTML += "- > " + actionsToBeRun[i];
  }
}

function runCode(){
  code = codeInBox;
  lines = code.split("\n");
  console.log(lines);
  // actionsToBeRun = ["👉", "👆", "👈", "👇"];
  for( i = 0; i < lines.length; i++){
    switch(lines[i]) {
      case "moveRight();":
        actionsToBeRun.push("👉"); break;
      case "moveUp();":
        actionsToBeRun.push("👆"); break;
      case "moveLeft();":
        actionsToBeRun.push("👈"); break;
      case "moveDown();":
        actionsToBeRun.push("👇"); break;
    }
  }
  listActions();
}
