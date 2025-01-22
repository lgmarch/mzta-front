const toggleButton = document.querySelector('.button-toggle');
const mainNav = document.querySelector('.main-nav');

toggleButton.addEventListener('click', () => {
  mainNav.classList.toggle('main-nav--open');
  toggleButton.classList.toggle('open');
});
