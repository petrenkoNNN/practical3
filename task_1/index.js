const formEl = document.querySelector('.form');
const nameEl = document.querySelector('.name');
const emailEl = document.querySelector('.email');
const ratingEl = document.querySelector('.rating');
const ratingValueEl = document.querySelector('.rating-value');
const commentsEl = document.querySelector('.comments');
const nameErrorEl = document.querySelector('.name-error');
const emailErrorEl = document.querySelector('.email-error');
const resultEl = document.querySelector('.result');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateName = () => {
  if (nameEl.value.trim() === '') {
    nameErrorEl.textContent = '';
    return false;
  }

  nameErrorEl.textContent = '';
  return true;
};

const validateEmail = () => {
  const email = emailEl.value.trim();

  if (email === '') {
    emailErrorEl.textContent = '';
    return false;
  }

  if (!emailPattern.test(email)) {
    emailErrorEl.textContent = '';
    return false;
  }

  emailErrorEl.textContent = '';
  return true;
};

nameEl.addEventListener('focus', function () {
  nameEl.style.backgroundColor = 'lightblue';
});

nameEl.addEventListener('blur', function () {
  nameEl.style.backgroundColor = 'white';
  validateName();
});

emailEl.addEventListener('focus', function () {
  emailEl.style.backgroundColor = 'lightblue';
});

emailEl.addEventListener('blur', function () {
  emailEl.style.backgroundColor = 'white';
  validateEmail();
});

nameEl.addEventListener('input', function () {
  if (nameErrorEl.textContent !== '') {
    validateName();
  }
});

emailEl.addEventListener('input', function () {
  if (emailErrorEl.textContent !== '') {
    validateEmail();
  }
});

ratingEl.addEventListener('input', function () {
  ratingValueEl.textContent = ratingEl.value;
});

formEl.addEventListener('submit', function (event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();

  if (!isNameValid || !isEmailValid) {
    resultEl.innerHTML = '';
    return;
  }

  const genderEl = document.querySelector('input[name="gender"]:checked');
  const interestEls = document.querySelectorAll('input[name="interest"]:checked');
  const interests = Array.from(interestEls).map((el) => el.value);

  const data = [
    ['Имя', nameEl.value.trim()],
    ['Email', emailEl.value.trim()],
    ['Пол', genderEl ? genderEl.value : 'не указан'],
    ['Оценка сервиса', ratingEl.value],
    ['Интересы', interests.length ? interests.join(', ') : 'не выбраны'],
    ['Комментарии', commentsEl.value.trim() || 'нет']
  ];

  resultEl.innerHTML = '';

  const titleEl = document.createElement('h2');
  titleEl.textContent = 'Данные пользователя';
  resultEl.appendChild(titleEl);

  data.forEach(function ([label, value]) {
    const rowEl = document.createElement('p');
    rowEl.textContent = `${label}: ${value}`;
    resultEl.appendChild(rowEl);
  });
});