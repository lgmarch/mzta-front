const slides = document.querySelector('.slide__list');
const slideItems = document.querySelectorAll('.slide__item');
const prevButton = document.querySelector('.slide__prev');
const nextButton = document.querySelector('.slide__next');
const progressBar = document.querySelector('.slide__progress-bar');
const progressIndicator = document.querySelector('.slide__progress-indicator');

let currentIndex = 1; // Текущий слайд (с учетом клонированных)
const slideWidth = slideItems[0].clientWidth;

// Количество реальных слайдов (без учета клонированных)
const realSlidesCount = slideItems.length - 2;

// Устанавливаем начальную позицию (на второй слайд — оригинальный первый)
slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

// Функция для обновления ползунка
const updateProgressBar = () => {
  const progressWidth = 100 / realSlidesCount; // Ширина каждого сегмента
  const visibleSlideIndex = currentIndex - 1; // Смещение из-за клонированного элемента
  const translateValue = progressWidth * visibleSlideIndex;

  // Обновляем ширину и позицию индикатора
  progressIndicator.style.width = `${progressWidth}%`;
  progressIndicator.style.transform = `translateX(${translateValue}%)`;
};

// Функция для перехода к следующему слайду
const goToNext = () => {
  if (currentIndex >= slideItems.length - 1) return;
  currentIndex++;
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

  // Проверяем конец карусели
  slides.addEventListener('transitionend', () => {
    if (currentIndex === slideItems.length - 1) {
      slides.style.transition = 'none';
      currentIndex = 1; // Возвращаемся на оригинальный первый слайд
      slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }
  });

  // Обновляем ползунок
  updateProgressBar();
};

// Функция для перехода к предыдущему слайду
const goToPrev = () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

  // Проверяем начало карусели
  slides.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
      slides.style.transition = 'none';
      currentIndex = slideItems.length - 2; // Возвращаемся на оригинальный последний слайд
      slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }
  });

  // Обновляем ползунок
  updateProgressBar();
};

// Обработчики кнопок
nextButton.addEventListener('click', goToNext);
prevButton.addEventListener('click', goToPrev);

// Автоматическое пролистывание (опционально)
setInterval(goToNext, 5000); // Листает каждые 5 секунд

// Обновляем ползунок при загрузке
updateProgressBar();
