import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import {deleteAsync} from 'del';

// Styles
export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())       // style.less -> style.css
    .pipe(postcss([     // style.css
      autoprefixer(),   // style.css -> style.css[prefix]
      csso()            // style.sss[prefix] -> style.css[prefix, min]
    ]))
    .pipe(rename('style.min.css')) // переименовываем
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))   // положи все в папку build
    .pipe(browser.stream());
}

// HTML
export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));		// положи все в папку build
}

// Images
// Задача для продакшена - оптимизация изображений
export const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
}

// Задача не для продакшина (чтобы быстрее выполнялась)
// Копируем изображения в папку build без оптимизации
export const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
}

// Scripts
export const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html)).on('change', browser.reload);
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Clean -> gulp clean
const clean = () => {
  return deleteAsync(['build']);
}

// Copy
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2, woff}', 	// копируем и переносим шрифты в папку build
    'source/*.ico',			// копируем фавиконки и переносим в build
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
  done();
}

// Build -> npm run build
const build = gulp.series(
  clean, copy,
  gulp.parallel(styles, html)
);

// Develop
export default gulp.series(
  clean, copy, copyImages,
  gulp.parallel(styles, html),
  gulp.series(server, watcher)
);
