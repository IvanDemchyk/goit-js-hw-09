import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const startBtn = document.querySelector('button[data-start]');
const dateChosen = document.querySelector('#datetime-picker');
const d = document.querySelector('[data-days]');
const h = document.querySelector('[data-hours]');
const m = document.querySelector('[data-minutes]');
const s = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    if (selectedDates[0] > new Date()) {
      startBtn.disabled = false;
    }

    startBtn.addEventListener('click', setTimer);

    function setTimer() {
      timer = setInterval(() => {
        const differenceInTime = selectedDates[0] - new Date();
        startBtn.disabled = true;
        if (differenceInTime < 1000) {
          clearInterval(timer);
        }
        const result = convertMs(differenceInTime);
        timerView(result);
      }, 1000);
    }
  },
};

flatpickr(dateChosen, options);

function timerView({ days, hours, minutes, seconds }) {
  d.textContent = `${days}`;
  h.textContent = `${hours}`;
  m.textContent = `${minutes}`;
  s.textContent = `${seconds}`;
}
