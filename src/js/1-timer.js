import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daySpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minSpan = document.querySelector('[data-minutes]');
const secSpan = document.querySelector('[data-seconds]');

btn.addEventListener('click', startTimer);

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      btn.disabled = true;
      return iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
    userSelectedDate = selectedDates[0];

    btn.disabled = false;
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timer = null;

function updateTimer() {
  const currentDate = new Date();
  const dif = userSelectedDate - currentDate;
  console.log(convertMs(dif));
  if (dif > 0) {
    btn.disabled = true;
    const { days, hours, minutes, seconds } = convertMs(dif);
    daySpan.textContent = String(days).padStart(2, 0);
    hoursSpan.textContent = String(hours).padStart(2, 0);
    minSpan.textContent = String(minutes).padStart(2, 0);
    secSpan.textContent = String(seconds).padStart(2, 0);
  } else {
    btn.disabled = false;
    clearInterval(timer);
  }
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}
