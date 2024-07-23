import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const { delay, state } = event.currentTarget.elements;

  createPromise(delay.value, state.value)
    .then(delay => {
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
      });
    })
    .catch(delay =>
      iziToast.error({
        title: 'Rejected',
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
      })
    );
  event.currentTarget.reset();
}
