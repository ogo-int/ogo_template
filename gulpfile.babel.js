"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
  paths = {
    views: {
      src: [
        "./src/views/index.pug",
        "./src/views/pages/**/*.pug"
      ],
      helpers: "./src/views/helpers",
      dist: "./dist/",
      watch: [
        "./src/blocks/**/*.pug",
        "./src/views/**/*.pug"
      ]
    },
    modules: {
      src: [
        "./src/blocks/modules"
      ]
    },
    components: {
      src: [
        "./src/blocks/components"
      ]
    },
    styles: {
      src: [
        "./src/styles/adaptive.{scss,sass}",
        "./src/styles/components.{scss,sass}",
        "./src/styles/global.{scss,sass}",
        "./src/styles/modules.{scss,sass}",
        "./src/styles/main.{scss,sass}"
      ],
      stage: "./src/styles/",
      dist: "./dist/assets/css/",
      watch: [
        "./src/blocks/**/*.{scss,sass}",
        "./src/styles/**/*.{scss,sass}"
      ]
    },
    scripts: {
      src: [
        "./src/js/wishlist.js",
        "./src/js/tech.js",
        "./src/js/script.js",
        "./src/js/kladr.js",
        "./src/js/global.js",
        "./src/js/modules.js",
        "./src/js/main.js"
      ],
      stage: "./src/js/",
      dist: "./dist/assets/js/",
      watch: [
        "./src/blocks/**/*.js",
        "./src/js/**/*.js"
      ]
    },
    images: {
      src: [
        "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
        //"!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
      ],
      dist: "./dist/assets/img/",
      watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
    },
    sprites: {
      src: "./src/img/svg/*.svg",
      dist: "./dist/assets/img/sprites/",
      watch: "./src/img/svg/*.svg"
    },
    fonts: {
      src: "./src/fonts/**/*.{eot,svg,ttf,woff,woff2}",
      dist: "./dist/assets/fonts/",
      watch: "./src/fonts/**/*.{eot,svg,ttf,woff,woff2}"
    },
    favicons: {
      src: "./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}",
      dist: "./dist/assets/img/favicons/",
    },
    gzip: {
      src: "./src/.htaccess",
      dist: "./dist/"
    }
  };

requireDir("./gulp-tasks/");

export {
  paths
};

export const development = gulp.series("clean", "concat",
  gulp.parallel(["views", "styles", "copyVendor", "scripts", "images", "sprites", "fonts"]), //, "webp", "favicons"
  gulp.parallel("serve"));

export const prod = gulp.series("clean", "concat",
  gulp.parallel(["views", "styles", "copyVendor", "scripts", "images", "sprites", "fonts", "gzip"])); //"webp", "favicons",

export default development;