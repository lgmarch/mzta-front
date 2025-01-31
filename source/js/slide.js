const slideContainers = document.querySelectorAll('.slide');

slideContainers.forEach(container => {
  const slideItems = container.querySelectorAll('.slide__item');
  const progressBar = container.querySelector('.slide__progress-bar');
  const progressIndicator = container.querySelector('.slide__progress-indicator');
  const slideList = container.querySelector('.slide__list');

  if (!progressBar || !progressIndicator || !slideList) return;

  let currentIndex = 0;
  const realSlidesCount = slideItems.length;
  const slideWidth = slideItems[0].clientWidth;
  const intervalTime = 1000;

  let autoSlideInterval;
  let isDragging = false;
  let startX = 0;
  let initialIndicatorPosition = 0;

  const updateProgressBar = () => {
    const progressBarWidth = progressBar.clientWidth;
    const indicatorWidth = progressBarWidth / realSlidesCount;
    const translateValue = indicatorWidth * currentIndex;

    progressIndicator.style.width = `${indicatorWidth}px`;
    progressIndicator.style.transform = `translateX(${translateValue}px)`;
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < realSlidesCount) {
      currentIndex = index;
      slideList.style.transition = 'transform 0.5s ease-in-out';
      slideList.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

      updateProgressBar();
    }
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % realSlidesCount);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(goToNext, intervalTime);
  };

  progressBar.addEventListener('click', (event) => {
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const newIndex = Math.floor((clickX / progressBar.clientWidth) * realSlidesCount);

    stopAutoSlide();
    goToSlide(newIndex);
    startAutoSlide();
  });

  slideItems.forEach(item => {
    item.addEventListener('mousedown', stopAutoSlide);
    item.addEventListener('mouseup', startAutoSlide);
    item.addEventListener('click', goToNext);

    item.addEventListener('mousedown', event => {
      event.preventDefault(); // Отмена выделения текста
    });
  });

  // Обработчики для перетаскивания индикатора
  progressIndicator.addEventListener('mousedown', (event) => {
    event.preventDefault(); // предотвращаем выделение текста

    isDragging = true;
    const progressBarRect = progressBar.getBoundingClientRect();
    const indicatorWidth = progressIndicator.offsetWidth;

    // Прекращаем автоперелистывание слайдов при перетаскивании индикатора
    stopAutoSlide();

    startX = event.clientX;
    initialIndicatorPosition = progressIndicator.getBoundingClientRect().left - progressBarRect.left;

    const onMouseMove = (moveEvent) => {
      if (isDragging) {
        // Вычисляем смещение относительно начальной точки
        let offsetX = moveEvent.clientX - startX + initialIndicatorPosition;

        // Ограничиваем движение индикатора в пределах прогресс-бара
        offsetX = Math.max(0, Math.min(offsetX, progressBarRect.width - indicatorWidth));

        // Обновляем позицию индикатора
        progressIndicator.style.transform = `translateX(${offsetX}px)`;

        // Вычисляем новый индекс слайда на основе позиции индикатора
        const newIndex = Math.floor((offsetX / progressBarRect.width) * realSlidesCount);

        // Обновляем слайды
        goToSlide(newIndex);
      }
    };

    const onMouseUp = () => {
      isDragging = false;

      // После отпускания мыши вычисляем новое положение индикатора и слайдов
      const offsetX = progressIndicator.getBoundingClientRect().left - progressBar.getBoundingClientRect().left;
      const newIndex = Math.floor((offsetX / progressBar.offsetWidth) * realSlidesCount);

      // Обновляем индекс слайда и продолжаем движение с того места, где остановились
      goToSlide(newIndex);
      startAutoSlide();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  startAutoSlide();
  updateProgressBar();
});
