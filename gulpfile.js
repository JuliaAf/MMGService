"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var rename = require("gulp-rename");
var rimraf = require("rimraf");
var merge = require("merge-stream");
var clearCSS = require('gulp-clean-css');

gulp.task("clean", function (cb){
  rimraf("./build", cb);
});

gulp.task("style", ["clean"], function() {
  gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("compress", ["style"], function(){
  gulp.src("src/css/**/*.css")
  .pipe(clearCSS({compatibility: 'ie8'}))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("src/css"));
});

gulp.task("build", ["compress"], function(){
  var htmls = gulp.src("src/*.html")
  .pipe(gulp.dest("build"));

  var csss = gulp.src("src/css/**/*.css")
  .pipe(gulp.dest("build/css"));

  var imgs = gulp.src("src/img/**/*.{png,jpg,gif,svg}")
  .pipe(gulp.dest("build/img"));

  var fonts = gulp.src("src/fonts/**/*.{woff,woff2}")
  .pipe(gulp.dest("build/fonts"));

  var jss = gulp.src("src/js/**/*.js")
  .pipe(gulp.dest("build/js"));

  var phps = gulp.src("src/php/**/*.php")
  .pipe(gulp.dest("build/php"));

  return merge(htmls, csss, imgs, jss, fonts, phps);
})


gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
});
  gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch("src/*.html").on("change", server.reload);
});
