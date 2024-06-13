import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    calendar: document.querySelector('input[type="text"]'),
    startBtn: document.querySelector('[data-start]'),
    timerFields: document.querySelectorAll('.field .value'),
}
let interval_id = -1;
let date = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};

const fp = flatpickr(refs.calendar, options);

function onClose(selectedDates) {
    if (date && date !== selectedDates[0]) {
        resetDate();
    }
    if (selectedDates[0] < Date.now()) {
        iziToast.error({
            message: "Please choose a date in the future",
            position: "topRight",
            timeout: 2000
    })
    } else {
        date = selectedDates[0];
            refs.startBtn.disabled = false;
            refs.startBtn.addEventListener('click', handlerStartCountdown);
    }
}

function handlerStartCountdown(e) {
    e.target.disabled = true;
    const [selectedDate] = refs.calendar._flatpickr.selectedDates;
    const delta = selectedDate - Date.now();
    drawCountdown(convertMs(delta));
}


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

function addLeadingZero(value) {
    return value ? String(value).padStart(2, 0) : '00';
}

function drawCountdown(time) {
    let { days, hours, minutes, seconds } = time;
    interval_id = setInterval(() => {
        [days, hours, minutes, seconds]
            .forEach((value, index) => refs.timerFields[index].textContent = addLeadingZero(value));
        if (!seconds && !minutes && !hours && !days) {
            clearInterval(interval_id);
            interval_id = -1;

            iziToast.success({
            message: "Countdown has finished. You can selected new time.",
            position: "topRight",
            timeout: 2000
    })
        }

        if (seconds) {
                seconds--;
            } else if (seconds === 0 && minutes || hours || days) {
                seconds = 59;
                if (minutes) {
                    minutes--;
                } else if (minutes === 0 && hours || days) {
                    minutes = 59;
                    if (hours) {
                        hours--;
                    } else if (hours === 0 && days) {
                        hours = 23;
                        days--;
                    }
                }
            }
    }, 1000);
}

function resetDate() {
    if (~interval_id) {
        clearInterval(interval_id);
        iziToast.info({
            message: "Countdown was stopped. Select new time.",
            position: "topRight",
            timeout: 2000
        });

        interval_id = -1;
        refs.startBtn.removeEventListener('click', handlerStartCountdown);
        refs.startBtn.disabled = true;
        refs.timerFields.forEach(field => field.textContent = addLeadingZero(0));
    }
    
}



