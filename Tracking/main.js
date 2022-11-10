var correcttime = 0;
var start_exp=0;
var accept_click=0;
var endTime;
var startTime;
var direction

const DelayTime = 5000
const TotalTime = 20000;
const speed = 1000;

var time = [];


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
        "Press key 'g' for 'green', 'b' for 'blue, 'r' for 'red, 'y' for 'yellow.' Ignore the word's meaning. Press Space to start."
    );
}

function main() {
    setup();
    instructions();
}
