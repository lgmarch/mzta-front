// Находим все кнопки и блоки
const buttons = document.querySelectorAll('.contacts__name');
const blocks = document.querySelectorAll('.contacts__text');
const triangles = document.querySelectorAll('.contacts__triangle');

// Переменная для хранения текущей кликнутой кнопки
let activeButton = null;

// Функция для установки активной кнопки, треугольника и контента
function setActiveButton(button) {
  if (!button) return; // Проверяем, что кнопка передана

  // Кнопки
  // Сбрасываем цвет всех кнопок на белый
  buttons.forEach((btn) => {
    btn.style.color = 'white'; // Устанавливаем цвет текста в белый
  });
  button.style.color = 'red';    // Красим текущую кнопку в красный
  // Обновляем активную кнопку
  activeButton = button;

  // Треугольники
  // Скрываем все треугольники
  triangles.forEach((triangle) => triangle.style.display = 'none');
  // Находим ближайший родительский <div>,
  // внутри которого находится кликнутый .contacts__name
  const parentDiv = button.closest('div');
  const triangle = parentDiv.querySelector('.contacts__triangle');
  if (triangle) {
    triangle.style.display = 'block';
  }

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
}

// Устанавливаем начальное состояние после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  // Указываем кнопку, которая будет активной по умолчанию (например, первая)
  const defaultButton = document.querySelector('.contacts__name');
  if (defaultButton) {
    setActiveButton(defaultButton);
  }
});

// Навешиваем обработчики на все кнопки
buttons.forEach((button) => {
  // Событие клика
  button.addEventListener('click', function () {
    setActiveButton(button);
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
