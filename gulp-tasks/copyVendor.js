"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("copyVendor", () => {
  return gulp.src(
      paths.scripts.stage + "/vendor/**/*.{js,css,jpg,png,gif}"
    )
    .pipe(gulp.dest(paths.scripts.dist + "/vendor/"))
    .pipe(debug({
      "title": "Copy vendor"
    }));
});