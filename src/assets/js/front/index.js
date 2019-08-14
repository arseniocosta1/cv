/* jshint unused:false */
/*!
 * Project:     cv
 * File:        ./assets/js/front/index.js
 * Copyright(c) 2016-present Baltrushaitis Tomas <tbaltrushaitis@gmail.com>
 * License:     MIT
 */

'use strict';
import { library, dom } from '@fortawesome/fontawesome-svg-core';


window.jQuery(($) => {

  let defOpts = Object.assign({}, {
    selector: 'div'
    , inclass: ''
    , outclass: ''
  });

  // ---------------------------------------------------------------------------
  // Waypoints
  // ---------------------------------------------------------------------------

  let wShow = (o) => {
    let opts = Object.assign({}, defOpts || {}, o || {});

    new window.Waypoint.Inview({
      element: $(opts.selector)
      , enter: function (dir) {
        // console.log('Enter fired for', this.element , dir);
        this.element.removeClass(opts.outclass).addClass(opts.inclass);
      }
      , entered: function (dir) {
        // noty({text: 'Entered fired with direction ' + dir, type: 'information'});
      }
      , exit: function (dir) {
        // noty({text: 'Exit fired with direction ' + dir, type: 'notification'});
        // console.log('exit() for ', this.element , dir);
      }
      , exited: function (dir) {
        // console.log('Exited fired for ', this.element , dir);
        this.element.removeClass(opts.inclass).addClass(opts.outclass);
      }
      , offset: opts.offset || '-50%'
    });

    // , offset: function () {
    //     // console.info('this.element.clientHeight = ', this.element.clientHeight);
    //     return 70 + this.element.clientHeight;
    //   }

  };

  // ---------------------------------------------------------------------------
  //  Animations
  // ---------------------------------------------------------------------------

  (function () {

    let w = window;
    let dataRoot = w.location.origin + '/data/';

    // Examine the text in the response
    function status(r) {
      if (r.status >= 200 && r.status < 300) {
        return Promise.resolve(r);
      } else {
        console.warn('Looks like there was a problem. Status Code: ' + r.status);
        return Promise.reject(new Error(r.statusText));
      }
    }

    // Parse response text into javascript object
    function json(r) {
      let contentType = r.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return r.json();
      } else if (contentType && contentType.includes('text/plain')) {
        return JSON.parse(r);
      }
      throw new TypeError('Oops, we haven\'t got JSON!');
    }

    // Get response text
    function text(r) {
      return r.text();
    }

    // Fetch animations configuration
    let AnimationsConfig = fetch(dataRoot + 'animations.json')
    .then(status)
    .then(json)
    .then(function (lo) {
      // console.log('Fetch Request succeeded with JSON response (', typeof lo, '): [', lo, ']');
      return Promise.resolve(lo.animations);
    })
    .catch(function (err) {
      console.warn('Failed to fetch DATA: [', err, ']');
      return Promise.reject(err);
    });

    // Enable animations on elements
    let AnimationsEnabled = AnimationsConfig.then(function (loAnimations) {
      return Promise.resolve(loAnimations).then(function (lo) {
        return new Promise(function (resolve, reject) {

          $.each(lo, (i, o) => {
            // Assign Waypoint animation handler
            wShow(o);
          });

          return resolve();

        });
      });

    })
    .catch(function (e) {
      console.warn('Failed to Enable Animations: [', e, ']');
      return Promise.resolve();
    });

    AnimationsEnabled.then(function () {
      console.info('ANIMATIONS ENABLED');
    });

  })();

  // ---------------------------------------------------------------------------
  //  NOTY options
  // ---------------------------------------------------------------------------

  (function () {
    $.noty.defaults = {
      layout: 'topRight'
      ,
      theme: 'defaultTheme'     // or relax
      ,
      type: 'success'          // alert, success, error, warning, information, notification
      ,
      text: ''                 // [string|html] can be HTML or STRING
      ,
      dismissQueue: true               // [boolean] If you want to use queue feature set this true
      ,
      force: false              // [boolean] adds notification to the beginning of queue when set to true
      ,
      maxVisible: 8                  // [integer] you can set max visible notification count for dismissQueue true option,
      ,
      template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>'
      ,
      timeout: 5000               // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
      ,
      progressBar: true               // [boolean] - displays a progress bar
      ,
      buttons: false              // [boolean|array] an array of buttons, for creating confirmation dialogs.
      ,
      animation: {
        open: { height: 'toggle' }  // or Animate.css class names like: 'animated bounceInLeft'
        , close: 'animated flipOutY' // or Animate.css class names like: 'animated bounceOutLeft'
        , easing: 'swing'
        , speed: 500                 // opening & closing animation speed
      }
      ,
      closeWith: ['click'] // ['click', 'button', 'hover', 'backdrop']     // backdrop click will close all notifications
      ,
      modal: false     // [boolean] if true adds an overlay
      ,
      killer: false     // [boolean] if true closes all notifications and shows itself
      ,
      callback: {
        onShow: function () {
        }
        , afterShow: function () {
        }
        , onClose: function () {
        }
        , afterClose: function () {
        }
        , onCloseClick: function () {
        }
      }
    };
  }());

  // ---------------------------------------------------------------------------
  //  Transformations
  // ---------------------------------------------------------------------------

  (function () {

    $(window).on('load', function () {
      $('[name="contact-cell"]').html(atob('{{person.contacts.cell}}'));
      $('[name="contact-email"]').prop('href', atob('{{person.contacts.email}}'));
      console.log('CONTACTS SET');
    });

  })();

  // ---------------------------------------------------------------------------
  // Add custom fa icons
  // ---------------------------------------------------------------------------
  const faGrapQl = {
    prefix: 'fac',
    iconName: 'graphql', // Any name you like
    icon: [
      400, // width
      400, // height
      [], // ligatures
      '', // unicode (if relevant)
      'M57.468 302.66l-14.376-8.3 160.15-277.38 14.376 8.3z M39.8 272.2h320.3v16.6H39.8z M206.348 374.026l-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z M54.482 132.883l-8.3-14.375 160.21-92.5 8.3 14.376z M342.568 302.663l-160.15-277.38 14.376-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5zM330.9 107.5h16.6v185h-16.6z M203.522 367l-7.25-12.558 139.34-80.45 7.25 12.557z M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.8 9.7 22.5 31 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9' // svg path data
    ]
  };

  library.add(faGrapQl);

  var faSplat = {
    prefix: 'fac',
    iconName: 'splat',
    icon: [
      448, 448,
      [],
      null,
      'M163.006,417.598 L166.015,306.629 L63.506,343.841 L129.87,255.871 L25.5,224.5 L129.87,193.129 L63.506,105.159 L166.015,142.371 L163.006,31.402 L224.5,122.983 L285.995,31.402 L282.985,142.371 L385.495,105.159 L319.13,193.13 L423.5,224.5 L319.13,255.871 L385.494,343.841 L282.984,306.629 L285.994,417.598 L224.5,326.017 z'
    ]
  };

  library.add(faSplat);

  console.log('Added custom icons');

  dom.watch();

  // fontawesome.library.add(fas);

  // ---------------------------------------------------------------------------
  //  LOAD Indicators
  // ---------------------------------------------------------------------------

  $(window).ready(function () {
    console.log('WINDOW___READY');
  });

  $(document).ready(function () {
    console.log('DOCUMENT___READY');
  });

  $(window).on('load', function () {
    console.log('WINDOW___LOAD');
  });

});
