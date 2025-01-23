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

  const updateProgressBar = () => {
    const progressBarWidth = progressBar.clientWidth;
    const indicatorWidth = progressBarWidth / realSlidesCount;
    const translateValue = indicatorWidth * currentIndex;

    progressIndicator.style.width = `${indicatorWidth}px`;
    progressIndicator.style.transform = `translateX(${translateValue}px)`;
  };

  const goToNext = () => {
    if (currentIndex < realSlidesCount - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    slideList.style.transition = 'transform 0.5s ease-in-out';
    slideList.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

    updateProgressBar();
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(goToNext, intervalTime);
  };

  slideItems.forEach(item => {
    item.addEventListener('mousedown', stopAutoSlide);
    item.addEventListener('mouseup', startAutoSlide);
    item.addEventListener('click', goToNext);

    item.addEventListener('mousedown', event => {
      event.preventDefault(); // Отмена выделения текста
    });
  });

  startAutoSlide();

  updateProgressBar();
});
