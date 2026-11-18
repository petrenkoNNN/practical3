const inputEl = document.querySelector('.text');
    const selectEl = document.querySelector('.color');
    const cardEl = document.querySelector('.card');

    const colors = {
      red: '#e53935',
      blue: '#1e88e5',
      green: '#43a047'
    };

    inputEl.addEventListener('input', function () {
      cardEl.textContent = inputEl.value || 'Ваш текст';
    });

    inputEl.addEventListener('focus', function () {
      inputEl.style.borderColor = '#1e88e5';
      inputEl.style.backgroundColor = 'lightblue';
    });

    inputEl.addEventListener('blur', function () {
      inputEl.style.borderColor = '#ccc';
      inputEl.style.backgroundColor = '#fff';
    });

    selectEl.addEventListener('change', function () {
      cardEl.style.backgroundColor = colors[selectEl.value];
    });