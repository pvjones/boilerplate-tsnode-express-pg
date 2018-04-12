const gulp = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')

const pathDefs = {
  Base: __dirname,
  Dist: path.join(__dirname, 'dist'),
  Src: path.join(__dirname, 'src'),
  SrcTs: path.join(__dirname, 'src', '**', '*.ts'),
  Tsconfig: path.join(__dirname, 'src', 'tsconfig.json'),
}



gulp.task('api', () => {
  const tsProject = ts.createProject(pathDefs.Tsconfig)
  return gulp.src(pathDefs.SrcTs)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel())
    .pipe(rename(path => path.extname = '.js'))
    .pipe(sourcemaps.write('.', {
      sourceRoot: function (file) { return file.cwd + '/src' }
    }))
    .pipe(gulp.dest(pathDefs.Dist))
})

gulp.task('api:watch', ['api'], () => {
  gulp.watch(pathDefs.SrcTs, ['api'])
})

gulp.task('default', ['api:watch'])