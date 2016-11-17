"use strict";

const gulp = require("gulp");
const eslint = require("gulp-eslint");
const git = require("gulp-git");
const del = require("del");
const runSequence = require("run-sequence");

gulp.task("lint", () => {
  gulp.src("gulpfile.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("cleanServer", () => del("janodemp-server"));
gulp.task("cleanClient", () => del("janodemp-client"));

gulp.task("cloneServer", () => {
  git.clone("git@github.com:lkrnac/janodemp-server.git",
    {cwd: "."}, (err) => {
      if (err) {
        console.log(err); // eslint-disable-line no-console
      }
    });
});

gulp.task("cloneClient", () => {
  git.clone("git@github.com:lkrnac/janodemp-client.git",
    {cwd: "."}, (err) => {
      if (err) {
        console.log(err); // eslint-disable-line no-console
      }
    });
});

gulp.task("default", (callback) => {
  runSequence(["lint", "cleanClient", "cleanServer"], ["cloneClient", "cloneServer"], callback);
});
