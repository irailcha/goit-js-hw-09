import Notiflix from 'notiflix';

const formElement = document.querySelector(".form");
const messagesContainer = document.createElement('div');
formElement.appendChild(messagesContainer);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const step = parseInt(document.querySelector('input[name="step"]').value);
  const amount = parseInt(document.querySelector('input[name="amount"]').value);

  let promises = [];

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;

    const promise = createPromise(position, promiseDelay);
    promises.push(promise);
  }

Promise.allSettled(promises)
  .then((results) => {
    let interval = delay;
    results.reduce(async (promise, { status, value, reason }) => {
      await promise;
      const { position, delay } = value || reason;
      if (status === 'fulfilled') {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
      interval += step;
      return new Promise((resolve) => setTimeout(resolve, interval));
    }, Promise.resolve());
  });

    });


