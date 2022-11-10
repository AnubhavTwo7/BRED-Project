import * as THREE from 'three';


const trials = 15;
var trialnum = 0;
var correctcount = 0;
var start_exp=0;
var accept_click=0;
var endTime;
var startTime;

var TargetLocation
var time = [];

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const intersect = intersects[0];
        TargetLocation = intersect.point;
        console.log(TargetLocation);
    }
};
window.addEventListener('mousemove' , onMouseMove);
window.addEventListener('click' , onMouseClick);

const onMouseClick = (event) => {
    if (accept_click==1){
        endTime = new Date();
        time.push(endTime-startTime);
        console.log(time);
        if (TargetLocation.x > 0 && TargetLocation.z > 0){
            correctcount += 1;
        }
        if (trialnum < trials){
            trialnum += 1;
            accept_click=0;
            start_exp=0;
            document.getElementById("trial").innerHTML = trialnum;
            
        }
        else{
            document.getElementById("trial").innerHTML = "Done";
            document.getElementById("correct").innerHTML = correctcount;
            document.getElementById("time").innerHTML = time;
        }
    }
};


class mouseaim {
    constructor() {
        this.crosshair = new THREE.Mesh(
            new THREE.RingGeometry(0.02, 0.04, 32),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                opacity: 0.5,
                transparent: true
            })
        );
        this.crosshair.position.z = -1;
        scene.add(this.crosshair);
    }

    update() {
        const {
            x,
            y
        } = mouse;
        this.crosshair.position.set(x, y, -1);
    }
}

class target {
    constructor() {
        this.geometry = new THREE.SphereGeometry(0.1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.sphere);
        this.sphere.position.set(0, 0, -1);
    }

    update() {
        const {
            x,
            y
        } = mouse;
        this.sphere.position.set(x, y, -1);
    }
}

document.getElementById("count").innerHTML = correctcount;

function getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function clearCanvas() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

function writeText(text, color = "#FFFFFF") {
    clearCanvas();
    window.ctx.fillStyle = color;
    window.ctx.fillText(
        text,
        window.canvas.width / 2,
        window.canvas.height / 2
    );
}

function endExperiment() {
    clearCanvas();
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
    let times = time.toString();
    document.getElementById("experiment").innerHTML = times;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(times, 520-7*(trials/2), 300);
    
} 

function displayTrial() {
    if (trialnum < trials) {
        startTime = Date.now();
        clearCanvas();
        word = getRandom(words);
        color = getRandom(colors);
        window.ctx.font = "50px Times New Roman";
        writeText(word, color);
        accept_click=1;
    }
    else {
        endExperiment();
    }
}

document.addEventListener("keydown", function (f) {
    if (f.key == " " && trialnum == 0) {
        start_exp = 1;
        setTimeout(displayTrial, 1000);
        return;
    }

    if (f.key == "q") {
        correctcount = 0;
        start_exp = 0;
        trialnum = 0;
        document.getElementById("count").innerHTML = correctcount;
        main();
        return;
    }

    if (start_exp == 1 && accept_click == 1 && trialnum < trials) {
        accept_click = 0;
        endTime = Date.now();
        var timetaken = endTime - startTime;
        time.push(timetaken);
        console.log(timetaken);
        console.log(time);
        for (let key in colorDict) {
            if (f.key == key && color == colorDict[key]) {
                writeText("Correct", (color = "#00FF00"));
                correctcount++;
                trialnum++;
                document.getElementById("count").innerHTML = correctcount;

                setTimeout(displayTrial, 2000);
                return;
            }
        }
        setTimeout(displayTrial, 2000);
        trialnum++;
        writeText("Wrong", (color = "#FF0000"));
    }
});


function setup() {
    window.canvas = document.getElementById("experiment");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.textAlign = "center";
    window.ctx.font = "20px sans-serif";
    correctcount = 0;
}

function instructions() {
    writeText(
        "Click on the Targets as they appear on the screen. Press the spacebar to start the experiment."
    );
}

function main() {
    setup();
    instructions();
}
