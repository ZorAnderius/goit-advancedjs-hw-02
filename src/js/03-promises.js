import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

const toastOption = {
  icon: '',
  position: 'topRight',
  timeout: 5000,
}

/**submit form and handler of data with show notification about create promises
 * 
 * @param {SubmitEvent} e 
 * @returns undefined
 */
function handlerSubmit(e) {
  e.preventDefault();
  const [delay, steps, amount ] = [...e.target.elements].map(({value}) => !value.match('e') ? +value : NaN);
  
  if (isNaN(delay) || isNaN(steps) || isNaN(amount)) {
    iziToast.error({
      ...toastOption,
      message: 'Invalid data'
    })
    form.reset();
    return;
  }

  for (let i = 0; i < amount; i += 1){
    const totalDelay = delay + steps * i;
    showPromises(i + 1, totalDelay);
  }
  form.reset();
}

/**show notifications about created promises
 * 
 * @param {number} position 
 * @param {number} delay 
 */
function showPromises(position, delay) {
    createPromise(position, delay)
      .then(({position, delay}) => {
        iziToast.success({
          ...toastOption,
          message: `Fulfilled promise ${position} in ${delay}ms`,
          title: '✅'
        });
      }).catch(({position, delay})  => {
        iziToast.error({
          ...toastOption,
          message: `Rejected promise ${position} in ${delay}ms`,
          title: '❌'
        })
      });
}

/**create one promises with random status
 * 
 * @param {number} position 
 * @param {number} delay 
 * @returns {Promises}
 */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({position, delay});
        }
      }, delay);
    });
}
