const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

/* 
TOP LEVEL FUNCTIONS
gup.task - Define tasks
gulp.src - points tofiles to use
gulp.dest - Points to folder to output
gup.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', () => console.log('Gulp is running....@@@@@@@@@'));

// copy html
gulp.task('copyHtml', () => gulp.src('src/*.html').pipe(gulp.dest('dist')));

//optimize images
gulp.task('imageMin', () =>
gulp
.src('src/images/*')
.pipe(imagemin())
.pipe(gulp.dest('dist/images'))
);

//Minify JS
gulp.task('minify', () =>
gulp
.src('src/js/*.js')
.pipe(uglify())
.pipe(gulp.dest('dist/js'))
);

//Compole Sass
gulp.task('sass', () =>
gulp
.src('src/sass/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('dist/scss'))
);

gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'minify', 'sass'));

gulp.task('watch', () => {
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/js/.js*', gulp.series('minify'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});

// gulp.task('default', [message, copyHtml]);
