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

  var faMongodb = {
    prefix: 'fac',
    iconName: 'mongodb',
    icon: [
      24, 24,
      [],
      null,
      'M17.18 9.518c-1.263-5.56-4.242-7.387-4.562-8.086C12.266.939 11.885 0 11.885 0c-.002.019-.004.031-.005.049v.013h-.001c-.002.015-.003.025-.004.039v.015h-.002c0 .01-.002.018-.002.026v.026h-.003c-.001.008-.001.018-.003.025v.021h-.002c0 .007 0 .015-.002.021v.02h-.002c0 .01-.001.022-.002.032v.002c-.003.017-.006.034-.009.05v.008h-.002c-.001.004-.003.008-.003.012v.017h-.003v.022h-.005v.018h-.005v.021h-.004v.019h-.004v.017h-.006v.014h-.004v.018h-.004v.014h-.005v.013H11.8v.015h-.004c-.001.001-.001.003-.001.004v.01h-.003c-.001.002-.001.004-.001.006v.006h-.002c-.001.003-.002.008-.002.01-.003.007-.007.014-.01.021v.002c-.002.002-.004.005-.005.007v.008h-.004v.008h-.005v.008h-.003v.01h-.006v.014h-.004v.004h-.004v.008h-.004v.011h-.004v.008h-.006v.011h-.004v.008h-.005v.008h-.003v.01h-.005v.008h-.004v.006h-.004v.008h-.006V.76h-.004v.006h-.005v.008h-.004v.011h-.005v.004h-.003v.008h-.006v.004h-.004v.01h-.004v.004h-.004v.008h-.005v.006h-.003l-.002.004v.004h-.002c-.001.002-.002.002-.002.004v.001h-.001c-.001.003-.002.005-.004.007v.003h-.001c-.005.006-.008.012-.012.018v.001c-.002.002-.007.006-.009.01v.002h-.001c-.001.001-.003.002-.003.003v.003h-.002l-.003.003v.001h-.001c0 .001-.002.002-.003.004v.004h-.003l-.002.002v.002h-.002c0 .002-.002.002-.002.003v.003h-.004c0 .001-.001.002-.002.003V.92h-.003v.004h-.004V.93h-.004v.008h-.005V.93h-.005v.004h-.004V.94h-.005v.008h-.005v.004h-.004v.006h-.004v.004h-.004V.97h-.006v.004h-.004V.98h-.005v.004h-.004v.005h-.005v.01h-.002v.004h-.006v.005h-.004v.002h-.004v.004h-.005v.01h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.005v.004h-.004v.004h-.004v.01h-.004v.005h-.006v.004h-.004v.004h-.005v.006h-.004v.004h-.005v.007h-.004v.004h-.006V1.1h-.002v.004h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.003c-.001.001-.001.002-.001.002v.002h-.002l-.004.004s-.002.002-.004.003v.006h-.004v.005h-.004v.004h-.004v.004h-.003l-.003.003v.003h-.002l-.002.002v.003h-.002c-.005.006-.007.01-.014.016-.002.002-.008.007-.012.01-.012.008-.027.021-.039.032-.008.005-.016.012-.022.017v.001h-.001c-.016.013-.031.025-.049.039v.001c-.024.02-.047.039-.074.062V1.34h-.002c-.057.047-.117.1-.186.159V1.5h-.001c-.169.148-.37.338-.595.568l-.015.015-.004.004C9 3.494 6.857 6.426 6.631 11.164c-.02.392-.016.773.006 1.144v.009c.109 1.867.695 3.461 1.428 4.756v.001c.292.516.607.985.926 1.405v.001c1.102 1.455 2.227 2.317 2.514 2.526.441 1.023.4 2.779.4 2.779l.644.215s-.131-1.701.053-2.522c.057-.257.192-.476.349-.662.106-.075.42-.301.797-.645.018-.019.028-.036.044-.054 1.521-1.418 4.362-4.91 3.388-10.599z'
    ]
  };

  library.add(faMongodb);

  const cSharp = {
    prefix: 'fac',
    iconName: 'csharp',
    icon: [
      24, 24,
      [],
      null,
      'M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6l-48.3-27.8c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4v-55.8c.1-.8 0-1.7-.4-2.6zm-53.5 70c-21.8 0-39.5-17.7-39.5-39.5s17.7-39.5 39.5-39.5c14.7 0 27.5 8.1 34.3 20l-13 7.5c-4.2-7.5-12.2-12.5-21.3-12.5-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8zm51-41.5h-3.2l-.9 4h4.1v5h-5l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.5v-5h3.5l.9-4h-4.4v-5h5.3l1.2-6h4.9l-1.2 6h3.8l1.2-6h4.8l-1.2 6h2.2v5zM102.3 66h3.8l.9-4h-3.8z'
    ]
  };

  library.add(cSharp);

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
