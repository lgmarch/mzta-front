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
  let isDraggingIndicator = false;
  let isDraggingSlide = false;
  let startX = 0;
  let progressBarRect;
  let indicatorWidth;

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
    if (!isDraggingIndicator && !isDraggingSlide) {
      goToSlide((currentIndex + 1) % realSlidesCount);
    }
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    if (!isDraggingIndicator && !isDraggingSlide) {
      autoSlideInterval = setInterval(goToNext, intervalTime);
    }
  };

  progressBar.addEventListener('click', (event) => {
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const newIndex = Math.floor((clickX / progressBar.clientWidth) * realSlidesCount);

    stopAutoSlide();
    goToSlide(newIndex);
    startAutoSlide();
  });

  slideItems.forEach(item => {
    item.addEventListener('mousedown', () => {
      stopAutoSlide();
      isDraggingSlide = true;
    });

    item.addEventListener('mouseup', () => {
      isDraggingSlide = false;
      startAutoSlide();
    });

    item.addEventListener('mouseleave', () => {
      isDraggingSlide = false;
      startAutoSlide();
    });

    item.addEventListener('click', goToNext);
    item.addEventListener('mousedown', event => event.preventDefault());

    // Добавляем обработку на мобильных устройствах
    item.addEventListener('touchstart', () => {
      stopAutoSlide();
      isDraggingSlide = true;
    });

    item.addEventListener('touchend', () => {
      isDraggingSlide = false;
      startAutoSlide();
    });

    item.addEventListener('touchcancel', () => {
      isDraggingSlide = false;
      startAutoSlide();
    });
  });

  // Обработчики для перетаскивания индикатора
  progressIndicator.addEventListener('mousedown', (event) => {
    event.preventDefault();

    isDraggingIndicator = true;
    progressBarRect = progressBar.getBoundingClientRect();
    indicatorWidth = progressIndicator.offsetWidth;

    startX = event.clientX;

    stopAutoSlide();

    const onMouseMove = (moveEvent) => {
      if (!isDraggingIndicator) return;
      moveEvent.preventDefault();

      let offsetX = moveEvent.clientX - progressBarRect.left;
      offsetX = Math.max(0, Math.min(offsetX, progressBarRect.width - indicatorWidth));

      progressIndicator.style.transform = `translateX(${offsetX}px)`;

      const newIndex = Math.floor((offsetX / progressBarRect.width) * realSlidesCount);
      goToSlide(newIndex);
    };

    const onMouseUp = () => {
      isDraggingIndicator = false;
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
