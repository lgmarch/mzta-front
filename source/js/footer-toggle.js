// Находим все кнопки и блоки
const buttons = document.querySelectorAll('.contacts__name');
const blocks = document.querySelectorAll('.contacts__text');
const triangles = document.querySelectorAll('.contacts__triangle');

// Скрываем все треугольники
triangles.forEach((triangle) => triangle.style.display = 'none');

document.addEventListener('DOMContentLoaded', () => {
  // Добавляем обработчик клика для каждой кнопки
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Получаем ID целевого блока из атрибута data-target
      const targetId = button.getAttribute('data-target');
      // Скрываем все блоки
      blocks.forEach((block) => block.classList.remove('active'));

      // Показываем целевой блок
      const targetBlock = document.getElementById(targetId);
      if (targetBlock) {
        targetBlock.classList.add('active');
      }
    });
  });
});

// Навешиваем обработчик события на каждую кнопку
buttons.forEach(name => {
  name.addEventListener('click', function () {
    triangles.forEach((triangle) => triangle.style.display = 'none');
    // Находим ближайший родительский <div>, внутри которого находится кликнутый .contacts__name
    const parentDiv = this.closest('div');

    // Внутри этого родителя находим .contacts__triangle
    const triangle = parentDiv.querySelector('.contacts__triangle');

    // Добавляем действие — например, скрыть или показать треугольник
    if (triangle) {
      triangle.style.display = 'block'; // Или 'none' для скрытия
    }

    console.log('Выбрано:', triangle); // Для проверки
  });
});
