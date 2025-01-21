const slides = document.querySelector('.slide__list');
const slideItems = document.querySelectorAll('.slide__item');
const progressBar = document.querySelector('.slide__progress-bar');
const progressIndicator = document.querySelector('.slide__progress-indicator');

let currentIndex = 0; // Текущий индекс слайда
const realSlidesCount = slideItems.length; // Количество слайдов
const slideWidth = slideItems[0].clientWidth;

let slideInterval; // Переменная для хранения интервала автоматического пролистывания
const intervalTime = 2000; // Время между сменой слайдов (5 секунд)

let isMouseDown = false; // Флаг для отслеживания, нажата ли кнопка мыши

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

// Останавливаем автоматическое перелистывание
const stopAutoSlide = () => {
  clearInterval(slideInterval); // Останавливаем интервал
};

// Запускаем автоматическое перелистывание слайдов
const startAutoSlide = () => {
  slideInterval = setInterval(goToNext, intervalTime); // Запускаем новый интервал
};

// Добавляем обработчики для кликов и удержания кнопки мыши
slideItems.forEach(item => {
  item.addEventListener('mousedown', () => {
    stopAutoSlide(); // Останавливаем автоматическое перелистывание при удержании кнопки мыши
    isMouseDown = true; // Устанавливаем флаг, что кнопка мыши нажата

  });

  item.addEventListener('mouseup', () => {
    isMouseDown = false; // Сбрасываем флаг, что кнопка мыши отпущена
    startAutoSlide(); // Возобновляем автоматическое перелистывание
  });

  item.addEventListener('click', () => {
    goToNext(); // Перелистываем слайд при клике
  });
});

// Запускаем автоматическое пролистывание при загрузке страницы
startAutoSlide();

// Обновляем прогресс-бар при загрузке
updateProgressBar();
