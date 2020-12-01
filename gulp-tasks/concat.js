"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import concat from "gulp-concat";
import debug from "gulp-debug";

function concatModulesPug() {
  return gulp.src(paths.modules.src + "/**/*.pug")
    .pipe(concat("modules.pug"))
    .pipe(gulp.dest(paths.views.helpers))
    .pipe(debug({
      "title": "Concat modules pug"
    }));
}

function concatVendorPug() {
  return gulp.src(paths.scripts.stage + "/vendor/**/*.pug")
    .pipe(concat("vendor-js.pug"))
    .pipe(gulp.dest(paths.views.helpers))
    .pipe(debug({
      "title": "Concat vendor pug"
    }));
}

function concatModulesJs() {
  return gulp.src([paths.modules.src + "/**/*.js", paths.scripts.stage + "modulesTrigger.js"]) //, paths.helpers + 'blockTrigger.js'
    .pipe(concat("modules.js"))
    .pipe(gulp.dest(paths.scripts.stage))
    .pipe(debug({
      "title": "Concat modules js"
    }));
}

function concatModulesScss() {
  return gulp.src([paths.modules.src + "/**/*.{scss,sass}"])
    .pipe(concat("_modules.scss"))
    .pipe(gulp.dest(paths.styles.stage + "/modules/"))
    .pipe(debug({
      "title": "Concat modules styles"
    }));
}

function concatComponentsScss() {
  return gulp.src([paths.components.src + "/**/*.{scss,sass}"])
    .pipe(concat("_components.scss"))
    .pipe(gulp.dest(paths.styles.stage + "/components/"))
    .pipe(debug({
      "title": "Concat components styles"
    }));
}

function concatComponentsJs() {
  return gulp.src([paths.components.src + "/**/*.js"]) //, paths.helpers + 'blockTrigger.js'
    .pipe(concat("components.js"))
    .pipe(gulp.dest(paths.scripts.stage))
    .pipe(debug({
      "title": "Concat components js"
    }));
}

gulp.task("concat", (done) => {
  return gulp.parallel(concatVendorPug, concatModulesJs, concatComponentsJs)(done); //concatModulesPug, concatModulesScss,
});