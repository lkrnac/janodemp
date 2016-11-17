"use strict";

const gulp = require("gulp");
const eslint = require("gulp-eslint");
const plugins = require("gulp-load-plugins")();

gulp.task("lint", () => {
  gulp.src("gulpfile.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("cloneServer", () => {
  plugins.git.clone("git@github.com:lkrnac/janodemp-server.git",
    {cwd: "."}, (err) => {
      if (err) {
        console.log(err); // eslint-disable-line no-console
      }
    });
});
