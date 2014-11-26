'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('cloneServer', function(){
  plugins.git.clone('git@github.com:lkrnac/janodemp-server.git',
    {cwd: '..'}, function(err){
      if (err){
        console.log(err);
      }
    });
});
