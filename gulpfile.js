'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const git = require('gulp-git');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const fs = require('fs');

gulp.task('lint', () => {
  return gulp.src('gulpfile.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pull-server', (callback) => {
  if (fs.existsSync('./janodemp-server/.git')) {
    git.pull('origin', 'master', {cwd: 'janodemp-server'}, callback);
  } else {
    git.clone('https://github.com/lkrnac/janodemp-server.git', {cwd: '.'}, callback);
  }
});

gulp.task('pull-client', (callback) => {
  if (fs.existsSync('./janodemp-client/.git')) {
    git.pull('origin', 'master', {cwd: 'janodemp-client'}, callback);
  } else {
    git.clone('https://github.com/lkrnac/janodemp-client.git', {cwd: '.'}, callback);
  }
});

gulp.task('cd-client', (callback) => {
  process.chdir('../janodemp-client');
  callback();
});

gulp.task('cd-server', (callback) => {
  process.chdir('janodemp-server');
  callback();
});

gulp.task('build-client', shell.task(['pwd', 'npm i', 'ng build --prod']));
gulp.task('build-server', shell.task(['pwd', 'npm i']));

gulp.task('default', (callback) => {
  runSequence(
    'lint',
    ['pull-server', 'pull-client'],
    'cd-server',
    'build-server',
    'cd-client',
    'build-client',
    callback
  );
});
