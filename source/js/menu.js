const toggleButton = document.querySelector('.button-toggle');
const mainNav = document.querySelector('.main-nav');

// Добавляем обработчик клика
toggleButton.addEventListener('click', () => {
  mainNav.classList.toggle('main-nav--open');
});
