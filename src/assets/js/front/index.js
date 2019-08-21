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
    let dataRoot = w.location.origin + 'assets/data/';

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
      128, 128,
      [],
      null,
      'M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6l-48.3-27.8c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4v-55.8c.1-.8 0-1.7-.4-2.6zm-53.5 70c-21.8 0-39.5-17.7-39.5-39.5s17.7-39.5 39.5-39.5c14.7 0 27.5 8.1 34.3 20l-13 7.5c-4.2-7.5-12.2-12.5-21.3-12.5-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8zm51-41.5h-3.2l-.9 4h4.1v5h-5l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.5v-5h3.5l.9-4h-4.4v-5h5.3l1.2-6h4.9l-1.2 6h3.8l1.2-6h4.8l-1.2 6h2.2v5zM102.3 66h3.8l.9-4h-3.8z'
    ]
  };


  library.add(cSharp);

  const dotNet = {
    prefix: 'fac',
    iconName: 'dotnet',
    icon: [
      128, 128,
      [],
      null,
      ['M45.288 49.559c4.417 13.507 6.09 37.601 19.006 37.601.982 0 1.977-.096 2.974-.286-11.74-2.737-13.132-26.569-20.297-38.912-.562.511-1.118 1.043-1.683 1.597',
        'M46.971 47.962c7.165 12.342 8.557 36.174 20.297 38.912.923-.169 1.847-.426 2.773-.749-10.539-5.164-13.451-28.306-21.588-39.447-.492.41-.987.839-1.482 1.284',
        'M57.294 40.623c-.98 0-1.977.096-2.977.286-2.612.493-5.268 1.618-7.944 3.321.73.722 1.427 1.547 2.081 2.448 2.723-2.259 5.427-3.928 8.12-4.932 1.012-.375 2.019-.656 3.029-.842-.729-.184-1.497-.281-2.309-.281"></path><path fill="url(#c)" d="M78.268 81.366c1.078-.857 2.158-1.805 3.24-2.84-4.488-13.443-6.095-37.883-19.101-37.883-.93 0-1.868.087-2.804.26 11.847 2.947 13.365 28.722 18.665 40.463"></path><path fill="#3092C4" d="M59.604 40.904c-.729-.185-1.498-.282-2.311-.282l5.114.019c-.929 0-1.867.086-2.803.263"></path><path fill="#1969BC" d="M78.04 84.221c-.508-.485-.991-1.017-1.466-1.584-2.188 1.549-4.368 2.724-6.533 3.489.771.376 1.578.656 2.436.829.664.136 1.353.206 2.075.206 2.431 0 4.353-.288 5.987-1.072-.9-.488-1.726-1.118-2.499-1.868"></path><path fill="url(#d)" d="M56.573 41.748c10.611 5.55 11.534 30.684 20.001 40.889.568-.4 1.13-.824 1.691-1.271-5.3-11.741-6.815-37.519-18.66-40.463-1.011.189-2.02.469-3.032.845"></path><path fill="url(#e)" d="M48.453 46.678c8.137 11.141 11.049 34.284 21.588 39.448 2.166-.765 4.346-1.939 6.533-3.489-8.467-10.205-9.39-35.338-20.001-40.889-2.693 1.002-5.397 2.671-8.12 4.93"></path><path fill="url(#f)" d="M40.083 49.234c-1.275 2.883-2.578 6.674-4.152 11.621 3.131-4.413 6.253-8.214 9.357-11.295-.428-1.314-.887-2.527-1.382-3.606-1.269.97-2.549 2.064-3.823 3.28"></path><path fill="#2B74B1" d="M45.037 45.121c-.374.268-.751.542-1.13.832.495 1.08.953 2.292 1.38 3.607.564-.552 1.124-1.086 1.684-1.597-.601-1.033-1.24-1.986-1.934-2.842"></path><path fill="#125A9E" d="M46.373 44.229c-.445.282-.888.58-1.337.891.695.855 1.333 1.81 1.936 2.844.495-.448.989-.879 1.482-1.287-.654-.9-1.35-1.726-2.081-2.448"></path><path fill="url(#g)" d="M118.751 39.594c-6.001 23.144-18.536 41.734-29.044 46.42h-.021l-.567.243-.069.027-.161.062-.072.03-.263.093-.108.038-.131.043-.126.044-.112.038-.224.068-.096.025-.151.041-.103.028-.165.043-.201.044c.475.175.97.264 1.503.264 9.965 0 20.013-17.858 36.638-47.556h-6.528l.001.005z"></path><path fill="url(#h)" d="M33.766 41.563l.019-.016.023-.015h.013l.161-.062.032-.016.042-.017.173-.062h.009l.383-.134.057-.015.164-.049.075-.024.165-.049.063-.017.548-.142.075-.017.16-.031.078-.024.161-.03h.038l.333-.062h.066l.154-.027.087-.015.147-.022.081-.016.358-.032c-.345-.032-.699-.054-1.061-.054-11.223 0-26.685 20.822-33.649 47.788h1.343c2.229-3.975 4.231-7.736 6.062-11.266 4.879-19.1 14.814-32.126 23.64-35.577"></path><path fill="#0D82CA" d="M40.083 49.234c1.275-1.216 2.554-2.31 3.823-3.281-.289-.634-.589-1.222-.911-1.761-1.026 1.246-1.964 2.89-2.912 5.042"></path><path fill="#0D82CA" d="M41.005 41.72c.733.614 1.39 1.46 1.99 2.473.189-.232.381-.447.58-.649-.834-.778-1.734-1.416-2.712-1.897l.12.057.022.016"></path><path fill="url(#i)" d="M10.127 77.138c10.233-19.719 15.081-32.199 23.64-35.577-8.825 3.454-18.762 16.479-23.64 35.577"></path><path fill="#127BCA" d="M43.574 43.544c-.199.204-.389.417-.58.649.322.538.621 1.124.913 1.76.378-.29.756-.563 1.129-.832-.462-.571-.951-1.101-1.462-1.577"></path><path fill="url(#j)" d="M14.773 88.315l-.186.022h-.035l-.158.016h-.026l-.376.025h-.039c10.356-.29 15.091-5.475 17.44-12.997 1.785-5.701 3.252-10.505 4.537-14.535-4.338 6.106-8.696 13.384-13.077 21.539-2.112 3.93-5.325 5.572-8.08 5.922"></path><path fill="url(#k)" d="M14.773 88.311c2.755-.351 5.968-1.991 8.08-5.923 4.381-8.151 8.741-15.431 13.075-21.538 1.577-4.949 2.878-8.737 4.154-11.621-8.639 8.223-17.311 21.896-25.31 39.077"></path><path fill="#05A1E6" d="M10.127 77.139c-1.831 3.53-3.833 7.291-6.063 11.266h3.904c.517-3.948 1.249-7.711 2.158-11.264"></path><path fill="url(#l)" d="M37.073 40.709l-.083.016-.146.021-.086.015-.154.027-.066.016-.333.058h-.038l-.162.032-.081.022-.157.031-.074.018-.549.142-.063.018-.166.049-.075.021-.163.049-.06.016-.381.134-.173.06-.072.03-.161.06-.054.026c-8.558 3.377-13.406 15.857-23.639 35.576-.909 3.552-1.645 7.316-2.158 11.264h.547l3.755-.016h1.7229999999999999l.375-.025h.024l.158-.016h.037l.186-.022c8-17.182 16.672-30.854 25.31-39.077.95-2.152 1.887-3.796 2.911-5.04-.6-1.013-1.256-1.861-1.988-2.476l-.021-.016-.122-.059-.121-.061-.117-.057-.139-.058-.108-.047-.227-.095-.097-.036-.169-.068-.091-.03-.235-.081h-.019l-.272-.077-.061-.019-.229-.064-.053-.015c-.185-.05-.376-.088-.569-.125l-.059-.016-.247-.04-.049-.015-.292-.039h-.051l-.226-.025-.358.033"></path><path fill="url(#m)" d="M95.311 52.407c-1.97 6.307-3.563 11.51-4.952 15.791 5.403-7.435 10.725-16.787 15.792-27.579-5.913 1.857-9.065 6.107-10.84 11.788"></path><path fill="url(#n)" d="M90.53 85.621c-.275.14-.552.273-.823.394 10.508-4.687 23.044-23.277 29.044-46.421h-1.216c-13.788 24.631-18.222 41.12-27.005 46.027"></path><path fill="#079AE1" d="M83.668 83.552c2.287-2.791 4.148-7.535 6.691-15.354-2.933 4.029-5.885 7.492-8.84 10.316l-.015.025c.645 1.931 1.352 3.636 2.158 5.012"></path><path fill="#1969BC" d="M83.668 83.552c-.778.95-1.603 1.673-2.519 2.209-.2.117-.404.227-.61.327.968.522 2.023.872 3.206 1.011l.524.046h.031l.252.016h.855l.097-.016.189-.016h.092l.205-.022h.017l.063-.015.219-.034h.064l.246-.041h.04l.491-.104c-1.357-.496-2.492-1.667-3.469-3.334"></path><path fill="#1E5CB3" d="M64.295 87.161c.982 0 1.976-.096 2.973-.288.924-.167 1.848-.424 2.773-.747.771.376 1.579.656 2.435.831.664.135 1.354.205 2.077.205h-10.258z"></path><path fill="#1E5CB3" d="M74.553 87.161c2.429 0 4.353-.288 5.986-1.073.968.523 2.023.872 3.206 1.012l.524.045h.031l.252.016h.302-10.301z"></path><path fill="#1D60B5" d="M84.854 87.161h.5609999999999999l.097-.016.191-.016h.092l.204-.022h.017l.062-.016.219-.033.067-.015.247-.04h.039l.491-.104c.475.175.97.264 1.503.264l-3.788.016-.002-.018z"></path><path fill="#175FAB" d="M81.511 78.54v-.016c-1.082 1.035-2.162 1.983-3.24 2.84-.563.447-1.125.871-1.693 1.271.476.568.959 1.1 1.468 1.585.772.749 1.597 1.38 2.498 1.867.205-.101.41-.211.609-.327.918-.536 1.741-1.26 2.52-2.209-.806-1.376-1.513-3.082-2.157-5.012"></path><path fill="url(#o)" d="M113.685 39.594h-6.121l-.97.047-.451.966c-5.068 10.793-10.388 20.145-15.791 27.58-2.54 7.818-4.404 12.563-6.69 15.353.977 1.668 2.114 2.84 3.466 3.337l.106-.023h.022l.075-.016.17-.042.101-.029.151-.039.094-.027.226-.068.112-.038.126-.046.13-.041.106-.04.264-.093.073-.027.162-.063.068-.025.568-.243h.02c.271-.119.547-.254.821-.394 8.785-4.908 13.22-21.396 27.008-46.026h-3.851l.005-.003z"></path><path fill="#7DCBEC" d="M37.433 40.677l.063.016.16.017h.054l.292.038.049.016.246.041.062.015.567.126.052.016.228.064.063.019.271.077.021.016.237.081.09.029.17.069.096.034.226.094.11.047.136.059.12.057.119.062c.979.48 1.879 1.121 2.713 1.898.308-.323.628-.613.962-.874-1.823-1.293-3.89-2.03-6.271-2.03-.276 0-.552.016-.832.037"></path><path fill="#5EC5ED" d="M43.574 43.544c.511.475 1 1.005 1.462 1.577.448-.311.892-.611 1.337-.891-.583-.583-1.198-1.108-1.839-1.56-.333.26-.652.552-.96.874"></path><path fill="url(#p)" d="M1802.977 441.733l.165.007c.472 0 .881-.146 1.242-.402.381.301.842.406 1.482.406h-3.099l.21-.011"></path><path fill="url(#q)" d="M1805.866 441.744c-.64 0-1.1-.105-1.482-.406.126-.089.248-.193.364-.309.531.337 1.056.561 1.574.658.198.037.395.056.589.056h-1.045v.001z"></path><path fill="url(#r)" d="M90.359 68.202c1.391-4.284 2.98-9.485 4.954-15.794 1.777-5.684 4.925-9.934 10.835-11.788l.456-.966c-9.636.577-14.14 5.479-16.405 12.738-3.964 12.673-6.365 20.888-8.677 26.123 2.952-2.823 5.904-6.288 8.837-10.313'
      ]
    ]
  };

  library.add(dotNet);

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
