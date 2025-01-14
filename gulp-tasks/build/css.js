/*!
 * Project:     cv
 * File:        ./gulp-tasks/build/css.js
 * Copyright(c) 2016-nowdays Baltrushaitis Tomas <tbaltrushaitis@gmail.com>
 * License:     MIT
 */

'use strict';

//  ------------------------------------------------------------------------  //
//  -----------------------------  DEPENDENCIES  ---------------------------  //
//  ------------------------------------------------------------------------  //

const path = require('path');
const utin = require('util').inspect;

const readConfig = require('read-config');
const cleanCSS   = require('gulp-clean-css');
const concatCSS  = require('gulp-concat-css');
const gulpif     = require('gulp-if');
const headfoot   = require('gulp-headerfooter');
const merge      = require('merge-stream');
const vPaths     = require('vinyl-paths');

//  ------------------------------------------------------------------------  //
//  ----------------------------  CONFIGURATION  ---------------------------  //
//  ------------------------------------------------------------------------  //

let ME = Object.assign({}, global.ME || {});
utin.defaultOptions = Object.assign({}, ME.pkg.options.iopts || {});

const modName = path.basename(module.filename, '.js');
const modPath = path.relative(ME.WD, path.dirname(module.filename));
const confPath = path.join(ME.WD, 'config', path.sep);
const modConfigFile = `${path.join(confPath, modPath, modName)}.json`;
const modConfig = readConfig(modConfigFile, ME.pkg.options.readconf);

ME.Config = Object.assign({}, ME.Config || {}, modConfig || {});
let C = ME.Config.colors;

//  ------------------------------------------------------------------------  //
//  ------------------------------  FUNCTIONS  -----------------------------  //
//  ------------------------------------------------------------------------  //

const buildCss = function (gulp) {
  console.log(`${ME.L}${ME.d()}[${C.Y}${modPath}/${modName}${C.N}] with [${modConfigFile}]`);

  //
  //  PROCESS CSS files
  //
  let FROM = path.join(ME.SRC, 'assets/css');
  let DEST = path.join(ME.BUILD, 'assets/css');
  let CONF = {
    debug: false
  // , format: 'keep-breaks'
  , rebase: false
  , level: {
      1: {
        all: false
      , removeEmpty: true
      , specialComments: 0
      }
    , 2: {
        all: false
      , removeEmpty: true
      }
    }
  };
  let STYLES_SRC = [
      path.join(FROM, 'default.css')
    , path.join(FROM, 'theme.css')
    , path.join(FROM, 'responsive.css')
  // , path.join(FROM, 'magnific-popup.css')
    , path.join(FROM, 'og-grid.css')
    , path.join(FROM, 'custom.css')
    , path.join(FROM, 'fa-colors.css')
  ];

  let frontCSS = gulp.src(STYLES_SRC)
    .pipe(vPaths(function (p) {
      console.log(`${ME.d()}[${C.W}FRONT${C.N}] Bundling ${C.Y}CSS${C.N}: [${p}]`);
      return Promise.resolve(p);
    }))
    .pipe(concatCSS('frontend-bundle.css', {rebaseUrls: true}))
    .pipe(gulpif('production' === ME.NODE_ENV, new cleanCSS(CONF, function (d) {
      console.log(`${ME.d()}[${C.W}FRONT${C.N}] Compress ${C.P}CSS${C.N}: [${d.path}]: [${utin(d.stats.originalSize)} -> ${utin(d.stats.minifiedSize)}] [${utin(parseFloat((100 * d.stats.efficiency).toFixed(2)))}%] in [${utin(d.stats.timeSpent)}ms]`);
    }), false))
    //  Write banners
    // .pipe(headfoot.header(ME.Banner.header))
    // .pipe(headfoot.footer(ME.Banner.footer))
    .pipe(gulp.dest(DEST));

  return merge(frontCSS)
          .on('error', console.error.bind(console));

};


/**
 * EXPOSE
 * @public
 */

module.exports = exports = buildCss;
