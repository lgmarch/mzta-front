// Находим все кнопки и блоки
const buttons = document.querySelectorAll('.contacts__name');
const blocks = document.querySelectorAll('.contacts__text');
const triangles = document.querySelectorAll('.contacts__triangle');

// Скрываем все треугольники
triangles.forEach((triangle) => triangle.style.display = 'none');

// Переменная для хранения текущей кликнутой кнопки
let activeButton = null;

// Добавляем обработчик клика для каждой кнопки
buttons.forEach((button) => {
  button.addEventListener('click', function() {
    // Показываем нужный контент
    // Получаем ID целевого блока из атрибута data-target
    const targetId = button.getAttribute('data-target');
    // Скрываем все блоки
    blocks.forEach((block) => block.classList.remove('active'));
    // Показываем целевой блок
    const targetBlock = document.getElementById(targetId);
    if (targetBlock) {
      targetBlock.classList.add('active');
    }

    // Кнопки
    // Сбрасываем цвет всех кнопок на белый
    buttons.forEach((btn) => {
      btn.style.color = 'white'; // Устанавливаем цвет текста в белый
    });
    this.style.color = 'red';    // Красим текущую кнопку в красный
    // Обновляем активную кнопку
    activeButton = this;
    console.log('Активная кнопка:', activeButton);

    // Треугольники
    // Скрываем все треугольники
    triangles.forEach((triangle) => triangle.style.display = 'none');
    // Находим ближайший родительский <div>, внутри которого находится кликнутый .contacts__name
    const parentDiv = this.closest('div');
    const triangle = parentDiv.querySelector('.contacts__triangle');
    if (triangle) {
      triangle.style.display = 'block';
    }
    console.log('Выбрано:', triangle);
  });

  // Событие наведения мыши
  button.addEventListener('mouseover', function () {
    // Если кнопка не активна, красим в синий
    if (this !== activeButton) {
      this.style.color = 'blue';
    }
  });

  // Событие ухода мыши
  button.addEventListener('mouseout', function () {
    // Если кнопка не активна, возвращаем белый цвет
    if (this !== activeButton) {
      this.style.color = 'white';
    }
  });
});
