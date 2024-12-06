import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';

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

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
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
  return del('build'); 	// просто удаляем папку build
}

// Build -> npm run build

export const build = gulp.series(
  clean,
  gulp.parallel(styles,html),
);


export default gulp.series(
  html, styles, server, watcher
);
