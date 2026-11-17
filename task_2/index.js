const formEl = document.querySelector('.form');
const nameEl = document.querySelector('.name');
const weightEl = document.querySelector('.weight');
const distanceEl = document.querySelector('.distance');
const errorEl = document.querySelector('.error');
const tbodyEl = document.querySelector('.product-table tbody');

const namePattern = /^[A-Za-zА-Яа-яЁё0-9\s-]+$/;

const calcCost = (weight, distance) => (weight * distance) / 10;

const addRow = (name, weight, distance, cost) => {
  const rowEl = document.createElement('tr');

  [name, weight, distance, `${cost.toFixed(2)} руб.`].forEach((value) => {
    const cellEl = document.createElement('td');
    cellEl.textContent = value;
    rowEl.appendChild(cellEl);
  });

  tbodyEl.appendChild(rowEl);
};

formEl.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameEl.value.trim();
  const weight = Number(weightEl.value);
  const distance = Number(distanceEl.value);

  if (!namePattern.test(name)) {
    errorEl.textContent = 'Пожалуйста, введите корректное название товара.';
    return;
  }

  if (!(weight > 0) || !(distance > 0)) {
    errorEl.textContent = 'Пожалуйста, введите корректные значения для веса и расстояния.';
    return;
  }

  errorEl.textContent = '';
  addRow(name, weight, distance, calcCost(weight, distance));

  formEl.reset();
  nameEl.focus();
});