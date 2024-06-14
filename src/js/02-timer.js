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
    theme:'dark',
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};


const stopIntervalOpts = {
    theme: 'dark',
    icon: 'icon-person',
    title: 'Hey',
    message: 'Do you want to stop current countdown and start new?',
    position: 'center',
    progressBarColor: 'rgb(0, 255, 184)',
    buttons: [
        ['<button data-ok>Ok</button>', okToast, true], 
        ['<button>Close</button>', cancelToast]
        ],
}

const fp = flatpickr(refs.calendar, options);


/**
 * check if selected date is valid and add listener 
 * to start button or reset date when calendar closed
 * 
 * @param {Array} selectedDates of dates
 * @returns undefined
 */
function onClose(selectedDates) {
    if (date && date === selectedDates[0]){
        return;
    };
    if (selectedDates[0] < Date.now()) {
        iziToast.error({
            message: "Please choose a date in the future",
            position: "topRight",
            timeout: 2000
            
        })
    } else {
        if (date && date !== selectedDates[0]) {
            iziToast.show(stopIntervalOpts);
            return;
        }
        refs.startBtn.disabled = false;
        refs.startBtn.addEventListener('click', handlerStartCountdown);
    }
}

/**
 * hendler event of click start button or when user wants to change date
 * @param {event || null} e 
 */
function handlerStartCountdown(e = null) {
    if(e) e.target.disabled = true;
    const [selectedDate] = refs.calendar._flatpickr.selectedDates;
    date = selectedDate;
    const delta = selectedDate - Date.now();
    drawCountdown(convertMs(delta));
}

/**convert date from millisecond's format into days, hours, minutes and seconds format
 * 
 * @param {number} ms 
 * @returns {Object}
 */
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

/**convert numbers to string if number less then 10, so it needs to add 0 for begin,
 * for example, '09' or '10'
 * 
 * @param {number} value 
 * @returns {string}
 */
function addLeadingZero(value) {
    return value ? String(value).padStart(2, 0) : '00';
}

/**draw days, hours, minutes and seconds on the HTML
 * and their changes every 1 second
 * 
 * @param {Object} time 
 */
function drawCountdown(time) {
    let { days, hours, minutes, seconds } = time;
    interval_id = setInterval(() => {
        [days, hours, minutes, seconds]
            .forEach((value, index) => refs.timerFields[index].textContent = addLeadingZero(value));
        if (!seconds && !minutes && !hours && !days) {
            clearInterval(interval_id);
            interval_id = -1;
            date = null;

            iziToast.success({
            message: "Countdown has finished. You can selected new time.",
            position: "topRight",
            timeout: 5000
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

/**
 * delete current interval, remove listener form StartBtn and redraw timer for '00'
 */
function resetDate() {
    if (~interval_id) {
        clearInterval(interval_id);
        interval_id = -1;
        refs.startBtn.removeEventListener('click', handlerStartCountdown);
        refs.startBtn.disabled = true;
        refs.timerFields.forEach(field => field.textContent = addLeadingZero(0));
    }
}

/**restart countdown when ok button was confirmed.
 * 
 * @param {Object} instance 
 * @param {HTMLDivElement} toast 
 */
function okToast(instance, toast) {
            resetDate();
            iziToast.info({
                        pauseOnHover: null,
                        message: "Please, waiting for update timer",
                        position: "center",
                        overlay: true,
                        timeout: 2000
            });
            handlerStartCountdown();
            instance.hide({
                transitionOut: 'fadeOutUp',
            }, toast, 'buttonName');
        }

/**close Toast notification
 * 
 * @param {Object} instance 
 * @param {HTMLDivElement} toast 
 */
function cancelToast(instance, toast) {
            instance.hide({
                transitionOut: 'fadeOutUp',
            }, toast, 'buttonName');
        }

