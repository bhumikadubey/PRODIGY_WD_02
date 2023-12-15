const startButton = document.getElementsByClassName("start")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("rest")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("min")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isStart = false;
let secCounter = 0;
let sec;
let minCounter = 0;
let min;
let centiCounter = 0;
let centiSec = 0;
let isReset = false;
let lapItem = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")
}

const start = () => {
    if (!isStart && !isReset) {
        startButton.innerHTML = "Pause";
        bg.classList.add("animation bg");
        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        }, 60*1000);
        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter} .`;
        }, 1000);
        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);
        isStart = true;
        isReset = true;
    } else {
        startButton.innerHTML = 'Start';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isStart = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}

const reset = () => {
    isReset = true;
    start();
    lapButton.classList.add("hidden")
    resetButton.classList.add("hidden")
    second.innerHTML = `&nbsp;00 .`;
    centiSecond.innerHTML = `&nbsp;00`;
    minute.innerHTML = `00 :`;
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `${++lapItem}`;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} . ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.remove("hidden");
    lapItem = 0 ;
}

startButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
