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
    .pipe(gulp.dest('build'));
}

// Scripts
export const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

// Images
export const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}', { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
}

export const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
}

// Copy fonts, icon, manifest
export const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    //'source/manifest.webmanifest',
  ], { base: 'source', encoding: false }).pipe(gulp.dest('build'))
  done();
}

// Clean
export const clean = () => {
  return deleteAsync('build');
}

// Server
export const server = (done) => {
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

// Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
  clean, copy, optimizeImages,
  gulp.parallel(styles,html),
);

// Develop
export default gulp.series(
  clean, copy, copyImages, gulp.parallel(styles, html),
  gulp.series(server, watcher)
);
