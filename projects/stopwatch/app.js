const lapBtn = document.getElementById('lapBtn');
const timerMilliSec = document.getElementById('timerMilliSec');
const timerSec = document.getElementById('timerSec');
const timerMins = document.getElementById('timerMins');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapRecord = document.getElementById('lapRecord');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let displayMillisec = milliseconds;
let displaySec = seconds;
let displayMins = minutes;

let interval = null;

let status = "stopped";
let lapNow = null;

function start() {
  milliseconds++;

  if (milliseconds < 10) displayMillisec = "0" + milliseconds;
  else displayMillisec = milliseconds;      

  if (seconds < 10) displaySec = "0" + seconds;
  else displaySec = seconds;

  if (minutes < 10) displayMins = "0" + minutes;
  else displayMins = minutes;

  if (milliseconds / 100 === 1) {
    seconds++;
    milliseconds = 0;

  if (seconds / 60 === 1) {
    minutes++;
    seconds = 0;
    }
  }

  timerMillisec.innerHTML = displayMillisec;
  timerSec.innerHTML = displaySec;
  timerMins.innerHTML = displayMins;
}

function startStop() {
  if (status === "stopped") {
    interval = setInterval(start, 1);
    startBtn.innerHTML = "Stop";
    startBtn.style.backgroundColor = 'pink';
    startBtn.style.color = 'darkred';
    status = "started";
  } else {
    clearInterval(interval);
    startBtn.innerHTML = "Start";
    startBtn.style.backgroundColor = 'lightgreen';
    startBtn.style.color = 'darkgreen';
    status = "stopped";
  }
}

function reset() {
  clearInterval(interval);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  timerMillisec.innerHTML = "00";
  timerSec.innerHTML = "00";
  timerMins.innerHTML = "00";
  startBtn.innerHTML = "Start";
  lapRecord.innerHTML = '';
  startBtn.style.backgroundColor = 'lightgreen';
  startBtn.style.color = 'darkgreen';
  resetBtn.style.display = 'none';
  lapBtn.style.display = 'flex';
  status = "stopped";
}

function lap() {
  lapNow = `<div class="lap">${minutes} : ${seconds} : ${milliseconds}</div>`;
  lapRecord.innerHTML += lapNow;
}

lapBtn.addEventListener('click', lap);
startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

startBtn.addEventListener('click', () => {
  if (status === 'started') {
    resetBtn.style.display = 'flex';
    lapBtn.style.display = 'none';
  }
});