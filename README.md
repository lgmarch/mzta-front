✨ Status of Last CI/CD: ✨ <br>
<img src="https://github.com/lgmarch/mzta-front/workflows/node.js.yml/badge.svg?branch=master">

# Краткая инструкция по работе

## Локальный компьютер
1. [Установить node.js](https://nodejs.org/download/release/latest-v16.x/). Сборка работает на 20 версии Node.
2. Установка зависимостей - `npm i`
3. Запуск сборки - `npm start`
4. Проверка на ошибки - `npm test`
5. Автоматическое исправление ошибок - `npm run fix`
6. Сборка проекта (папка build) - `npm run build`

## При push или pull_request в ветку master на Github:
1. Выполняется проверка кода.
2. Сборка проекта.
3. Размещение проекта в интернете.

# Страница в интернете
### [Ссылка на страницу](https://lgmarch.github.io/mzta-front/)

[Документация GitHub Actions](https://docs.github.com/ru/actions)<br>
[GuickStart](https://docs.github.com/ru/actions/writing-workflows/quickstart)<br>

### Работа с изображениями
[gulp-libsquoosh](https://www.npmjs.com/package/gulp-libsquoosh)<br>
[Sharp](https://www.npmjs.com/package/sharp)
