const slides = document.querySelector('.slide__list');
const slideItems = document.querySelectorAll('.slide__item');
const prevButton = document.querySelector('.slide__prev');
const nextButton = document.querySelector('.slide__next');
const progressBar = document.querySelector('.slide__progress-bar');
const progressIndicator = document.querySelector('.slide__progress-indicator');

let currentIndex = 0; // Текущий индекс слайда
const realSlidesCount = slideItems.length; // Количество слайдов
const slideWidth = slideItems[0].clientWidth;

// Функция для обновления положения индикатора
const updateProgressBar = () => {
  const progressBarWidth = progressBar.clientWidth; // Общая ширина прогресс-бара
  const indicatorWidth = progressBarWidth / realSlidesCount; // Ширина индикатора для каждого слайда
  const translateValue = indicatorWidth * currentIndex; // Смещение индикатора

  // Обновляем ширину и позицию индикатора
  progressIndicator.style.width = `${indicatorWidth}px`;
  progressIndicator.style.transform = `translateX(${translateValue}px)`;
};

// Функция для перехода к следующему слайду
const goToNext = () => {
  if (currentIndex < realSlidesCount - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Возврат к первому слайду
  }
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

  updateProgressBar();
};

// Функция для перехода к предыдущему слайду
const goToPrev = () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = realSlidesCount - 1; // Возврат к последнему слайду
  }
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

  updateProgressBar();
};

// Обработчики кнопок
nextButton.addEventListener('click', goToNext);
prevButton.addEventListener('click', goToPrev);

// Автоматическое пролистывание
setInterval(goToNext, 5000);

// Обновляем прогресс-бар при загрузке
updateProgressBar();
