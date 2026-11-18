const formEl = document.querySelector('.form');
const nameEl = document.querySelector('.name');
const emailEl = document.querySelector('.email');
const ratingEl = document.querySelector('.rating');
const ratingValueEl = document.querySelector('.rating-value');
const commentsEl = document.querySelector('.comments');
const resultEl = document.querySelector('.result');
const nameTooltipEl = document.querySelector('.name-tooltip');
const emailTooltipEl = document.querySelector('.email-tooltip');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showTooltip = (tooltipEl) => tooltipEl.classList.add('visible');
const hideTooltip = (tooltipEl) => tooltipEl.classList.remove('visible');

const validateName = () => {
  if (nameEl.value.trim() === '') {
    showTooltip(nameTooltipEl);
    return false;
  }

  hideTooltip(nameTooltipEl);
  return true;
};

const validateEmail = () => {
  const email = emailEl.value.trim();

  if (email === '') {
     emailTooltipEl.textContent = 'Заполните это поле';
    showTooltip(emailTooltipEl);
    return false;
  }

  if (!emailPattern.test(email)) {
    emailTooltipEl.textContent = 'Введите корректный email';
    showTooltip(emailTooltipEl);
    return false;
  }

  hideTooltip(emailTooltipEl);
  return true;
};

nameEl.addEventListener('focus', function () {
  nameEl.style.backgroundColor = 'lightblue';
});

nameEl.addEventListener('blur', function () {
  nameEl.style.backgroundColor = 'white';
  hideTooltip(nameTooltipEl);
});

emailEl.addEventListener('focus', function () {
  emailEl.style.backgroundColor = 'lightblue';
});

emailEl.addEventListener('blur', function () {
  emailEl.style.backgroundColor = 'white';
  hideTooltip(emailTooltipEl);
  if (emailEl.value.trim() !== '') {
    validateEmail();
  }
});

nameEl.addEventListener('input', function () {
  hideTooltip(nameTooltipEl);
});

emailEl.addEventListener('input', function () {
  hideTooltip(emailTooltipEl);
});

ratingEl.addEventListener('input', function () {
  ratingValueEl.textContent = ratingEl.value;
});

formEl.addEventListener('submit', function (event) {
  event.preventDefault();

 const validators = {
    name: { element: nameEl, validator: validateName },
    email: { element: emailEl, validator: validateEmail }
  };

  const configs = Object.values(validators);

  for (let i = 0; i < configs.length; i++) {
    if (!configs[i].validator()) {
      configs[i].element.focus();
      return;
    }
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