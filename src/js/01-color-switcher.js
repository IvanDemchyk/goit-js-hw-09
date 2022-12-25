function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function colorChange() {
  let color = getRandomHexColor();
  body.style.backgroundColor = color;
}

let timerId = null;

startBtn.addEventListener('click', timerStart);
stopBtn.addEventListener('click', timerStop);

function timerStart() {
  timerId = setInterval(colorChange, 1000);
  startBtn.disabled = true;
}

function timerStop() {
  clearInterval(timerId);
  startBtn.disabled = false;
}
