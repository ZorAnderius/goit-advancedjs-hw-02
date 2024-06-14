import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

const toastOption = {
  icon: '',
  position: 'topRight',
  timeout: 5000
}

/**submit form and handler of data with show notification about create promises
 * 
 * @param {SubmitEvent} e 
 * @returns undefined
 */
function handlerSubmit(e) {
  e.preventDefault();
  const [delay, steps, amount ] = [...e.target.elements].map(({value}) => !value.match('e') ? Number(value) : NaN);
  
  if (isNaN(delay) || isNaN(steps) || isNaN(amount)) {
    iziToast.error({
      ...toastOption,
      message: 'Invalid data'
    })
    form.reset();
    return;
  }

  for (let i = 1; i <= amount; i += 1){
    const totalDelay = delay + steps * i;
    showPromises(i, totalDelay);
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
      .then(res => {
        iziToast.success({
          ...toastOption,
          message: res,
          title: '✅'
        });
      }).catch(rej => {
        iziToast.error({
          ...toastOption,
          message: rej,
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
          resolve(`Fulfilled promise ${position} in ${delay}ms`);
        } else {
          reject(`Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    });
}
