import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', formSubmit);

function formSubmit(evt) {
  evt.preventDefault();
  let mainDelay = evt.currentTarget.delay.valueAsNumber;
  const step = evt.currentTarget.step.valueAsNumber;
  const promiseAmount = evt.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= promiseAmount; position += 1) {
    createPromise(position, mainDelay);
    mainDelay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
