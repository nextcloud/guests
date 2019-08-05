/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/settings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestDetails.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'guest-details',
  props: ['guestId'],
  data: function data() {
    return {
      loaded: false,
      details: {},
      activeUser: ''
    };
  },
  methods: {
    loadGuestDetails: function loadGuestDetails() {
      var _this = this;

      if (!this.details[this.guestId]) {
        this.loaded = false;
        $.get(OC.generateUrl("apps/guests/users/".concat(encodeURIComponent(this.guestId)))).then(function (data) {
          _this.details[_this.guestId] = data;
          _this.activeUser = _this.guestId;
          _this.loaded = true;
        });
      } else {
        this.activeUser = this.guestId;
      }
    },
    getMimeIcon: function getMimeIcon(mime) {
      return OC.MimeType.getIconUrl(mime);
    },
    formatTime: function formatTime(time) {
      return OC.Util.formatDate(new Date(time * 1000));
    }
  },
  beforeMount: function beforeMount() {
    this.loadGuestDetails();
  },
  watch: {
    guestId: function guestId() {
      this.loadGuestDetails();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'guest-list',
  data: function data() {
    return {
      details_for: '',
      sort: 'email',
      sort_direction: 1,
      loaded: false,
      guests: []
    };
  },
  methods: {
    loadGuests: function loadGuests() {
      var _this = this;

      $.get(OC.generateUrl('apps/guests/users')).then(function (data) {
        _this.guests = data;

        _this.$nextTick(function () {
          _this.loaded = true;
        });
      });
    },
    getSortClass: function getSortClass(name) {
      return name + ' ' + (name === this.sort ? "sort-".concat(this.sort_direction > 0 ? 'asc' : 'desc') : '');
    },
    setSort: function setSort(name) {
      var _this2 = this;

      if (name === this.sort) {
        this.sort_direction = -this.sort_direction;
      } else {
        this.sort = name;
        this.sort_direction = 1;
      }

      this.guests = this.guests.sort(function (a, b) {
        return a[_this2.sort].localeCompare(b[_this2.sort]) * _this2.sort_direction;
      });
    },
    toggleDetails: function toggleDetails(email) {
      this.details_for = email;
    }
  },
  beforeMount: function beforeMount() {
    this.loadGuests();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestSettings.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deep-equal */ "./node_modules/deep-equal/index.js");
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'guest-settings',
  data: function data() {
    return {
      loaded: false,
      enable_save: false,
      config: {
        useWhitelist: false,
        allowExternalStorage: false,
        hideUsers: false,
        whitelist: [],
        whiteListableApps: []
      }
    };
  },
  methods: {
    loadConfig: function loadConfig() {
      var _this = this;

      $.get(OC.generateUrl('apps/guests/config')).then(function (data) {
        _this.config = data;
        _this.loaded = true;

        _this.$nextTick(function () {
          _this.enable_save = true;
        });
      });
    },
    saveConfig: function saveConfig() {
      var _this2 = this;

      if (!this.loaded || !this.enable_save) {
        return;
      }

      OC.msg.startSaving(this.$refs.msg);
      $.ajax({
        type: 'PUT',
        url: OC.generateUrl('apps/guests/config'),
        data: this.config,
        dataType: 'json'
      }).success(function () {
        var data = {
          status: 'success',
          data: {
            message: t('guests', 'Saved')
          }
        };
        OC.msg.finishedSaving(_this2.$refs.msg, data);
      }).fail(function (result) {
        var data = {
          status: 'error',
          data: {
            message: result.responseJSON.message
          }
        };
        OC.msg.finishedSaving(_this2.$refs.msg, data);
      });
    },
    reset: function reset() {
      var _this3 = this;

      OC.msg.startSaving(this.$refs.msg);
      $.ajax({
        type: 'POST',
        url: OC.generateUrl('apps/guests/whitelist/reset')
      }).success(function (response) {
        _this3.config.whitelist = response.whitelist;
        OC.msg.finishedSaving(_this3.$refs.msg, {
          status: 'success',
          data: {
            message: t('guests', 'Reset')
          }
        });
      }).fail(function (response) {
        OC.msg.finishedSaving(_this3.$refs.msg, {
          status: 'error',
          data: {
            message: response.responseJSON.message
          }
        });
      });
    }
  },
  beforeMount: function beforeMount() {
    this.loadConfig();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestDetails.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "#guests-details .loading {\n  height: 50px;\n}\n#guests-details table tr th.name {\n  padding-left: 68px;\n}\n#guests-details table tr td.name {\n  background-repeat: no-repeat;\n  background-size: 32px;\n  padding-left: 68px;\n  background-position: 33px 3px;\n}\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestList.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "@charset \"UTF-8\";\n#guests-list {\n  padding: 20px 0 0;\n}\n#guests-list table {\n    margin: 0 -30px;\n    table-layout: fixed;\n    width: calc(100% + 60px);\n}\n#guests-list table tr {\n      height: 32px;\n}\n#guests-list table tr.active, #guests-list table tr.details {\n        background-color: var(--color-background-dark);\n}\n#guests-list table .sort-desc::after {\n      content: '▼';\n      position: absolute;\n      right: 10px;\n}\n#guests-list table .sort-asc::after {\n      content: '▲';\n      position: absolute;\n      right: 10px;\n}\n#guests-list table th {\n      border-bottom: 1px #ddd solid;\n      cursor: pointer;\n}\n#guests-list table th .sort_arrow {\n        float: right;\n        color: #888;\n}\n#guests-list table td, #guests-list table th {\n      padding: 10px;\n      position: relative;\n      display: table-cell;\n}\n#guests-list table td:first-child, #guests-list table th:first-child {\n        padding-left: 30px;\n}\n#guests-list table td:last-child, #guests-list table th:last-child {\n        padding-right: 30px;\n        text-align: right;\n}\n#guests-list table td.groups, #guests-list table th.groups {\n        width: 400px;\n}\n#guests-list table td.remove, #guests-list table th.remove {\n        width: 32px;\n}\n#guests-list table td a.icon, #guests-list table th a.icon {\n        margin-left: 5px;\n}\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestSettings.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "#guests .note {\n  margin: 5px;\n  padding: 10px;\n  background: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  border: 1px solid var(--color-border);\n}\n#guests .whitelist {\n  display: flex;\n}\n#guests .whitelist .multiselect {\n    width: calc(100% - 48px);\n    margin-right: 0;\n}\n#guests .whitelist .multiselect .multiselect__tags {\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0;\n      border-right: 0;\n      flex-wrap: nowrap;\n}\n#guests .whitelist button {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    margin: 0;\n}\n#guests .whitelist .whitelist-toggle {\n    margin: 1em 0;\n}\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-select/dist/vue-select.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-select/dist/vue-select.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".v-select{position:relative;font-family:inherit}.v-select,.v-select *{box-sizing:border-box}@-webkit-keyframes vSelectSpinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.vs__fade-enter-active,.vs__fade-leave-active{transition:opacity .15s cubic-bezier(1,.5,.8,1)}.vs__fade-enter,.vs__fade-leave-to{opacity:0}.vs--disabled .vs__clear,.vs--disabled .vs__dropdown-toggle,.vs--disabled .vs__open-indicator,.vs--disabled .vs__search,.vs--disabled .vs__selected{cursor:not-allowed;background-color:#f8f8f8}.v-select[dir=rtl] .vs__actions{padding:0 3px 0 6px}.v-select[dir=rtl] .vs__clear{margin-left:6px;margin-right:0}.v-select[dir=rtl] .vs__deselect{margin-left:0;margin-right:2px}.v-select[dir=rtl] .vs__dropdown-menu{text-align:right}.vs__dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:flex;padding:0 0 4px;background:none;border:1px solid rgba(60,60,60,.26);border-radius:4px;white-space:normal}.vs__selected-options{display:flex;flex-basis:100%;flex-grow:1;flex-wrap:wrap;padding:0 2px;position:relative}.vs__actions{display:flex;align-items:center;padding:4px 6px 0 3px}.vs--searchable .vs__dropdown-toggle{cursor:text}.vs--unsearchable .vs__dropdown-toggle{cursor:pointer}.vs--open .vs__dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.vs__open-indicator{fill:rgba(60,60,60,.5);-webkit-transform:scale(1);transform:scale(1);transition:-webkit-transform .15s cubic-bezier(1,-.115,.975,.855);transition:transform .15s cubic-bezier(1,-.115,.975,.855);transition:transform .15s cubic-bezier(1,-.115,.975,.855),-webkit-transform .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855)}.vs--open .vs__open-indicator{-webkit-transform:rotate(180deg) scale(1);transform:rotate(180deg) scale(1)}.vs--loading .vs__open-indicator{opacity:0}.vs__clear{fill:rgba(60,60,60,.5);padding:0;border:0;background-color:transparent;cursor:pointer;margin-right:8px}.vs__dropdown-menu{display:block;position:absolute;top:calc(100% - 1px);left:0;z-index:1000;padding:5px 0;margin:0;width:100%;max-height:350px;min-width:160px;overflow-y:auto;box-shadow:0 3px 6px 0 rgba(0,0,0,.15);border:1px solid rgba(60,60,60,.26);border-top-style:none;border-radius:0 0 4px 4px;text-align:left;list-style:none;background:#fff}.vs__no-options{text-align:center}.vs__dropdown-option{line-height:1.42857143;display:block;padding:3px 20px;clear:both;color:#333;white-space:nowrap}.vs__dropdown-option:hover{cursor:pointer}.vs__dropdown-option--highlight{background:#5897fb;color:#fff}.vs__selected{display:flex;align-items:center;background-color:#f0f0f0;border:1px solid rgba(60,60,60,.26);border-radius:4px;color:#333;line-height:1.4;margin:4px 2px 0;padding:0 .25em}.vs__deselect{display:inline-flex;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-left:4px;padding:0;border:0;cursor:pointer;background:none;fill:rgba(60,60,60,.5);text-shadow:0 1px 0 #fff}.vs--single .vs__selected{background-color:transparent;border-color:transparent}.vs--single.vs--open .vs__selected{position:absolute;opacity:.4}.vs--single.vs--searching .vs__selected{display:none}.vs__search::-ms-clear,.vs__search::-webkit-search-cancel-button,.vs__search::-webkit-search-decoration,.vs__search::-webkit-search-results-button,.vs__search::-webkit-search-results-decoration{display:none}.vs__search,.vs__search:focus{-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.4;font-size:1em;border:1px solid transparent;border-left:none;outline:none;margin:4px 0 0;padding:0 7px;background:none;box-shadow:none;width:0;max-width:100%;flex-grow:1}.vs__search::-webkit-input-placeholder{color:inherit}.vs__search:-ms-input-placeholder{color:inherit}.vs__search::-ms-input-placeholder{color:inherit}.vs__search::placeholder{color:inherit}.vs--unsearchable .vs__search{opacity:1}.vs--unsearchable .vs__search:hover{cursor:pointer}.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search{opacity:.2}.vs__spinner{align-self:center;opacity:0;font-size:5px;text-indent:-9999em;overflow:hidden;border:.9em solid hsla(0,0%,39.2%,.1);border-left-color:rgba(60,60,60,.45);-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation:vSelectSpinner 1.1s linear infinite;animation:vSelectSpinner 1.1s linear infinite;transition:opacity .1s}.vs__spinner,.vs__spinner:after{border-radius:50%;width:5em;height:5em}.vs--loading .vs__spinner{opacity:1}", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/deep-equal/index.js":
/*!******************************************!*\
  !*** ./node_modules/deep-equal/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(/*! ./lib/keys.js */ "./node_modules/deep-equal/lib/keys.js");
var isArguments = __webpack_require__(/*! ./lib/is_arguments.js */ "./node_modules/deep-equal/lib/is_arguments.js");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),

/***/ "./node_modules/deep-equal/lib/is_arguments.js":
/*!*****************************************************!*\
  !*** ./node_modules/deep-equal/lib/is_arguments.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),

/***/ "./node_modules/deep-equal/lib/keys.js":
/*!*********************************************!*\
  !*** ./node_modules/deep-equal/lib/keys.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),

/***/ "./node_modules/nextcloud-vue/dist/ncvuecomponents.js":
/*!************************************************************!*\
  !*** ./node_modules/nextcloud-vue/dist/ncvuecomponents.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js")):undefined}(window,function(e){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=169)}([function(t,e,n){"use strict";function i(t,e,n,i,o,r,a,s){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:l}}n.d(e,"a",function(){return i})},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),r=i.sources.map(function(t){return"/*# sourceURL=".concat(i.sourceRoot).concat(t," */")});return[n].concat(r).concat([o]).join("\n")}var a,s,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(var a=0;a<t.length;a++){var s=t[a];null!=s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),e.push(s))}},e}},function(t,e,n){"use strict";function i(t,e){for(var n=[],i={},o=0;o<e.length;o++){var r=e[o],a=r[0],s={id:t+":"+o,css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}n.r(e),n.d(e,"default",function(){return h});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,l=!1,u=function(){},d=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(t,e,n,o){l=n,d=o||{};var a=i(t,e);return A(a),function(e){for(var n=[],o=0;o<a.length;o++){var s=a[o];(c=r[s.id]).refs--,n.push(c)}e?A(a=i(t,e)):a=[];for(o=0;o<n.length;o++){var c;if(0===(c=n[o]).refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete r[c.id]}}}}function A(t){for(var e=0;e<t.length;e++){var n=t[e],i=r[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(m(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(m(n.parts[o]));r[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,n,i=document.querySelector("style["+p+'~="'+t.id+'"]');if(i){if(l)return u;i.parentNode.removeChild(i)}if(f){var o=c++;i=s||(s=v()),e=y.bind(null,i,o,!1),n=y.bind(null,i,o,!0)}else i=v(),e=function(t,e){var n=e.css,i=e.media,o=e.sourceMap;i&&t.setAttribute("media",i);d.ssrId&&t.setAttribute(p,e.id);o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}var g,b=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function y(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}},function(t,e,n){"use strict";var i=n(62),o=n(86),r=Object.prototype.toString;function a(t){return"[object Array]"===r.call(t)}function s(t){return null!==t&&"object"==typeof t}function c(t){return"[object Function]"===r.call(t)}function l(t,e){if(null!=t)if("object"!=typeof t&&(t=[t]),a(t))for(var n=0,i=t.length;n<i;n++)e.call(null,t[n],n,t);else for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(null,t[o],o,t)}t.exports={isArray:a,isArrayBuffer:function(t){return"[object ArrayBuffer]"===r.call(t)},isBuffer:o,isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:s,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===r.call(t)},isFile:function(t){return"[object File]"===r.call(t)},isBlob:function(t){return"[object Blob]"===r.call(t)},isFunction:c,isStream:function(t){return s(t)&&c(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function t(){var e={};function n(n,i){"object"==typeof e[i]&&"object"==typeof n?e[i]=t(e[i],n):e[i]=n}for(var i=0,o=arguments.length;i<o;i++)l(arguments[i],n);return e},deepMerge:function t(){var e={};function n(n,i){"object"==typeof e[i]&&"object"==typeof n?e[i]=t(e[i],n):e[i]="object"==typeof n?t({},n):n}for(var i=0,o=arguments.length;i<o;i++)l(arguments[i],n);return e},extend:function(t,e,n){return l(e,function(e,o){t[o]=n&&"function"==typeof e?i(e,n):e}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(t,n){t.exports=e},function(t,e,n){"use strict";n.r(e);var i=n(9);n(30);
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
i.a.options.defaultTemplate='<div class="vue-tooltip" role="tooltip" data-v-'.concat("5da3148",'><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'),e.default=i.a},function(t,e){function n(t){return"function"==typeof t.value||(console.warn("[Vue-click-outside:] provided expression",t.expression,"is not a function."),!1)}function i(t){return void 0!==t.componentInstance&&t.componentInstance.$isServer}t.exports={bind:function(t,e,o){function r(e){if(o.context){var n=e.path||e.composedPath&&e.composedPath();n&&n.length>0&&n.unshift(e.target),t.contains(e.target)||function(t,e){if(!t||!e)return!1;for(var n=0,i=e.length;n<i;n++)try{if(t.contains(e[n]))return!0;if(e[n].contains(t))return!1}catch(t){return!1}return!1}(o.context.popupItem,n)||t.__vueClickOutside__.callback(e)}}n(e)&&(t.__vueClickOutside__={handler:r,callback:e.value},!i(o)&&document.addEventListener("click",r))},update:function(t,e){n(e)&&(t.__vueClickOutside__.callback=e.value)},unbind:function(t,e,n){!i(n)&&document.removeEventListener("click",t.__vueClickOutside__.handler),delete t.__vueClickOutside__}}},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var i=n(4),o=n.n(i);
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a={before:function(){this.$slots.default&&""!==this.text.trim()||(o.a.util.warn("".concat(this.$options.name," cannot be empty and requires a meaningful text content"),this),this.$destroy(),this.$el.remove())},beforeUpdate:function(){this.text=this.getText()},data:function(){return{text:this.getText()}},computed:{isLongText:function(){return this.text&&this.text.trim().length>20}},methods:{getText:function(){return this.$slots.default?this.$slots.default[0].text.trim():""}}}},function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return Ln});var i=n(10),o=n(21);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){s(t,e,n[e])})}return t}var l=function(){};function u(t){return"string"==typeof t&&(t=t.split(" ")),t}function d(t,e){var n,i=u(e);n=t.className instanceof l?u(t.className.baseVal):u(t.className),i.forEach(function(t){-1===n.indexOf(t)&&n.push(t)}),t instanceof SVGElement?t.setAttribute("class",n.join(" ")):t.className=n.join(" ")}function p(t,e){var n,i=u(e);n=t.className instanceof l?u(t.className.baseVal):u(t.className),i.forEach(function(t){var e=n.indexOf(t);-1!==e&&n.splice(e,1)}),t instanceof SVGElement?t.setAttribute("class",n.join(" ")):t.className=n.join(" ")}"undefined"!=typeof window&&(l=window.SVGAnimatedString);var f=!1;if("undefined"!=typeof window){f=!1;try{var h=Object.defineProperty({},"passive",{get:function(){f=!0}});window.addEventListener("test",null,h)}catch(t){}}var A={container:!1,delay:0,html:!1,placement:"top",title:"",template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",offset:0},v=[],m=function(){function t(e,n){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),s(this,"_events",[]),s(this,"_setTooltipNodeEvent",function(t,e,n,o){var r=t.relatedreference||t.toElement||t.relatedTarget;return!!i._tooltipNode.contains(r)&&(i._tooltipNode.addEventListener(t.type,function n(r){var a=r.relatedreference||r.toElement||r.relatedTarget;i._tooltipNode.removeEventListener(t.type,n),e.contains(a)||i._scheduleHide(e,o.delay,o,r)}),!0)}),n=c({},A,n),e.jquery&&(e=e[0]),this.show=this.show.bind(this),this.hide=this.hide.bind(this),this.reference=e,this.options=n,this._isOpen=!1,this._init()}var e,n,o;return e=t,(n=[{key:"show",value:function(){this._show(this.reference,this.options)}},{key:"hide",value:function(){this._hide()}},{key:"dispose",value:function(){this._dispose()}},{key:"toggle",value:function(){return this._isOpen?this.hide():this.show()}},{key:"setClasses",value:function(t){this._classes=t}},{key:"setContent",value:function(t){this.options.title=t,this._tooltipNode&&this._setContent(t,this.options)}},{key:"setOptions",value:function(t){var e=!1,n=t&&t.classes||C.options.defaultClass;this._classes!==n&&(this.setClasses(n),e=!0),t=w(t);var i=!1,o=!1;for(var r in this.options.offset===t.offset&&this.options.placement===t.placement||(i=!0),(this.options.template!==t.template||this.options.trigger!==t.trigger||this.options.container!==t.container||e)&&(o=!0),t)this.options[r]=t[r];if(this._tooltipNode)if(o){var a=this._isOpen;this.dispose(),this._init(),a&&this.show()}else i&&this.popperInstance.update()}},{key:"_init",value:function(){var t="string"==typeof this.options.trigger?this.options.trigger.split(" "):[];this._isDisposed=!1,this._enableDocumentTouch=-1===t.indexOf("manual"),t=t.filter(function(t){return-1!==["click","hover","focus"].indexOf(t)}),this._setEventListeners(this.reference,t,this.options),this.$_originalTitle=this.reference.getAttribute("title"),this.reference.removeAttribute("title"),this.reference.setAttribute("data-original-title",this.$_originalTitle)}},{key:"_create",value:function(t,e){var n=window.document.createElement("div");n.innerHTML=e.trim();var i=n.childNodes[0];return i.id="tooltip_".concat(Math.random().toString(36).substr(2,10)),i.setAttribute("aria-hidden","true"),this.options.autoHide&&-1!==this.options.trigger.indexOf("hover")&&(i.addEventListener("mouseenter",this.hide),i.addEventListener("click",this.hide)),i}},{key:"_setContent",value:function(t,e){var n=this;this.asyncContent=!1,this._applyContent(t,e).then(function(){n.popperInstance.update()})}},{key:"_applyContent",value:function(t,e){var n=this;return new Promise(function(i,o){var r=e.html,a=n._tooltipNode;if(a){var s=a.querySelector(n.options.innerSelector);if(1===t.nodeType){if(r){for(;s.firstChild;)s.removeChild(s.firstChild);s.appendChild(t)}}else{if("function"==typeof t){var c=t();return void(c&&"function"==typeof c.then?(n.asyncContent=!0,e.loadingClass&&d(a,e.loadingClass),e.loadingContent&&n._applyContent(e.loadingContent,e),c.then(function(t){return e.loadingClass&&p(a,e.loadingClass),n._applyContent(t,e)}).then(i).catch(o)):n._applyContent(c,e).then(i).catch(o))}r?s.innerHTML=t:s.innerText=t}i()}})}},{key:"_show",value:function(t,e){if(e&&"string"==typeof e.container&&!document.querySelector(e.container))return;clearTimeout(this._disposeTimer),delete(e=Object.assign({},e)).offset;var n=!0;this._tooltipNode&&(d(this._tooltipNode,this._classes),n=!1);var i=this._ensureShown(t,e);return n&&this._tooltipNode&&d(this._tooltipNode,this._classes),d(t,["v-tooltip-open"]),i}},{key:"_ensureShown",value:function(t,e){var n=this;if(this._isOpen)return this;if(this._isOpen=!0,v.push(this),this._tooltipNode)return this._tooltipNode.style.display="",this._tooltipNode.setAttribute("aria-hidden","false"),this.popperInstance.enableEventListeners(),this.popperInstance.update(),this.asyncContent&&this._setContent(e.title,e),this;var o=t.getAttribute("title")||e.title;if(!o)return this;var r=this._create(t,e.template);this._tooltipNode=r,t.setAttribute("aria-describedby",r.id);var a=this._findContainer(e.container,t);this._append(r,a);var s=c({},e.popperOptions,{placement:e.placement});return s.modifiers=c({},s.modifiers,{arrow:{element:this.options.arrowSelector}}),e.boundariesElement&&(s.modifiers.preventOverflow={boundariesElement:e.boundariesElement}),this.popperInstance=new i.a(t,r,s),this._setContent(o,e),requestAnimationFrame(function(){!n._isDisposed&&n.popperInstance?(n.popperInstance.update(),requestAnimationFrame(function(){n._isDisposed?n.dispose():n._isOpen&&r.setAttribute("aria-hidden","false")})):n.dispose()}),this}},{key:"_noLongerOpen",value:function(){var t=v.indexOf(this);-1!==t&&v.splice(t,1)}},{key:"_hide",value:function(){var t=this;if(!this._isOpen)return this;this._isOpen=!1,this._noLongerOpen(),this._tooltipNode.style.display="none",this._tooltipNode.setAttribute("aria-hidden","true"),this.popperInstance.disableEventListeners(),clearTimeout(this._disposeTimer);var e=C.options.disposeTimeout;return null!==e&&(this._disposeTimer=setTimeout(function(){t._tooltipNode&&(t._tooltipNode.removeEventListener("mouseenter",t.hide),t._tooltipNode.removeEventListener("click",t.hide),t._removeTooltipNode())},e)),p(this.reference,["v-tooltip-open"]),this}},{key:"_removeTooltipNode",value:function(){if(this._tooltipNode){var t=this._tooltipNode.parentNode;t&&(t.removeChild(this._tooltipNode),this.reference.removeAttribute("aria-describedby")),this._tooltipNode=null}}},{key:"_dispose",value:function(){var t=this;return this._isDisposed=!0,this.reference.removeAttribute("data-original-title"),this.$_originalTitle&&this.reference.setAttribute("title",this.$_originalTitle),this._events.forEach(function(e){var n=e.func,i=e.event;t.reference.removeEventListener(i,n)}),this._events=[],this._tooltipNode?(this._hide(),this._tooltipNode.removeEventListener("mouseenter",this.hide),this._tooltipNode.removeEventListener("click",this.hide),this.popperInstance.destroy(),this.popperInstance.options.removeOnDestroy||this._removeTooltipNode()):this._noLongerOpen(),this}},{key:"_findContainer",value:function(t,e){return"string"==typeof t?t=window.document.querySelector(t):!1===t&&(t=e.parentNode),t}},{key:"_append",value:function(t,e){e.appendChild(t)}},{key:"_setEventListeners",value:function(t,e,n){var i=this,o=[],r=[];e.forEach(function(t){switch(t){case"hover":o.push("mouseenter"),r.push("mouseleave"),i.options.hideOnTargetClick&&r.push("click");break;case"focus":o.push("focus"),r.push("blur"),i.options.hideOnTargetClick&&r.push("click");break;case"click":o.push("click"),r.push("click")}}),o.forEach(function(e){var o=function(e){!0!==i._isOpen&&(e.usedByTooltip=!0,i._scheduleShow(t,n.delay,n,e))};i._events.push({event:e,func:o}),t.addEventListener(e,o)}),r.forEach(function(e){var o=function(e){!0!==e.usedByTooltip&&i._scheduleHide(t,n.delay,n,e)};i._events.push({event:e,func:o}),t.addEventListener(e,o)})}},{key:"_onDocumentTouch",value:function(t){this._enableDocumentTouch&&this._scheduleHide(this.reference,this.options.delay,this.options,t)}},{key:"_scheduleShow",value:function(t,e,n){var i=this,o=e&&e.show||e||0;clearTimeout(this._scheduleTimer),this._scheduleTimer=window.setTimeout(function(){return i._show(t,n)},o)}},{key:"_scheduleHide",value:function(t,e,n,i){var o=this,r=e&&e.hide||e||0;clearTimeout(this._scheduleTimer),this._scheduleTimer=window.setTimeout(function(){if(!1!==o._isOpen&&document.body.contains(o._tooltipNode)){if("mouseleave"===i.type)if(o._setTooltipNodeEvent(i,t,e,n))return;o._hide(t,n)}},r)}}])&&a(e.prototype,n),o&&a(e,o),t}();"undefined"!=typeof document&&document.addEventListener("touchstart",function(t){for(var e=0;e<v.length;e++)v[e]._onDocumentTouch(t)},!f||{passive:!0,capture:!0});var g={enabled:!0},b=["top","top-start","top-end","right","right-start","right-end","bottom","bottom-start","bottom-end","left","left-start","left-end"],y={defaultPlacement:"top",defaultClass:"vue-tooltip-theme",defaultTargetClass:"has-tooltip",defaultHtml:!0,defaultTemplate:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',defaultArrowSelector:".tooltip-arrow, .tooltip__arrow",defaultInnerSelector:".tooltip-inner, .tooltip__inner",defaultDelay:0,defaultTrigger:"hover focus",defaultOffset:0,defaultContainer:"body",defaultBoundariesElement:void 0,defaultPopperOptions:{},defaultLoadingClass:"tooltip-loading",defaultLoadingContent:"...",autoHide:!0,defaultHideOnTargetClick:!0,disposeTimeout:5e3,popover:{defaultPlacement:"bottom",defaultClass:"vue-popover-theme",defaultBaseClass:"tooltip popover",defaultWrapperClass:"wrapper",defaultInnerClass:"tooltip-inner popover-inner",defaultArrowClass:"tooltip-arrow popover-arrow",defaultOpenClass:"open",defaultDelay:0,defaultTrigger:"click",defaultOffset:0,defaultContainer:"body",defaultBoundariesElement:void 0,defaultPopperOptions:{},defaultAutoHide:!0,defaultHandleResize:!0}};function w(t){var e={placement:void 0!==t.placement?t.placement:C.options.defaultPlacement,delay:void 0!==t.delay?t.delay:C.options.defaultDelay,html:void 0!==t.html?t.html:C.options.defaultHtml,template:void 0!==t.template?t.template:C.options.defaultTemplate,arrowSelector:void 0!==t.arrowSelector?t.arrowSelector:C.options.defaultArrowSelector,innerSelector:void 0!==t.innerSelector?t.innerSelector:C.options.defaultInnerSelector,trigger:void 0!==t.trigger?t.trigger:C.options.defaultTrigger,offset:void 0!==t.offset?t.offset:C.options.defaultOffset,container:void 0!==t.container?t.container:C.options.defaultContainer,boundariesElement:void 0!==t.boundariesElement?t.boundariesElement:C.options.defaultBoundariesElement,autoHide:void 0!==t.autoHide?t.autoHide:C.options.autoHide,hideOnTargetClick:void 0!==t.hideOnTargetClick?t.hideOnTargetClick:C.options.defaultHideOnTargetClick,loadingClass:void 0!==t.loadingClass?t.loadingClass:C.options.defaultLoadingClass,loadingContent:void 0!==t.loadingContent?t.loadingContent:C.options.defaultLoadingContent,popperOptions:c({},void 0!==t.popperOptions?t.popperOptions:C.options.defaultPopperOptions)};if(e.offset){var n=r(e.offset),i=e.offset;("number"===n||"string"===n&&-1===i.indexOf(","))&&(i="0, ".concat(i)),e.popperOptions.modifiers||(e.popperOptions.modifiers={}),e.popperOptions.modifiers.offset={offset:i}}return e.trigger&&-1!==e.trigger.indexOf("click")&&(e.hideOnTargetClick=!1),e}function x(t,e){for(var n=t.placement,i=0;i<b.length;i++){var o=b[i];e[o]&&(n=o)}return n}function _(t){var e=r(t);return"string"===e?t:!(!t||"object"!==e)&&t.content}function T(t){t._tooltip&&(t._tooltip.dispose(),delete t._tooltip,delete t._tooltipOldShow),t._tooltipTargetClasses&&(p(t,t._tooltipTargetClasses),delete t._tooltipTargetClasses)}function k(t,e){var n,i=e.value,o=(e.oldValue,e.modifiers),r=_(i);r&&g.enabled?(t._tooltip?((n=t._tooltip).setContent(r),n.setOptions(c({},i,{placement:x(i,o)}))):n=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=_(e),o=void 0!==e.classes?e.classes:C.options.defaultClass,r=c({title:i},w(c({},e,{placement:x(e,n)}))),a=t._tooltip=new m(t,r);a.setClasses(o),a._vueEl=t;var s=void 0!==e.targetClasses?e.targetClasses:C.options.defaultTargetClass;return t._tooltipTargetClasses=s,d(t,s),a}(t,i,o),void 0!==i.show&&i.show!==t._tooltipOldShow&&(t._tooltipOldShow=i.show,i.show?n.show():n.hide())):T(t)}var C={options:y,bind:k,update:k,unbind:function(t){T(t)}};function E(t){t.addEventListener("click",M),t.addEventListener("touchstart",N,!!f&&{passive:!0})}function S(t){t.removeEventListener("click",M),t.removeEventListener("touchstart",N),t.removeEventListener("touchend",I),t.removeEventListener("touchcancel",O)}function M(t){var e=t.currentTarget;t.closePopover=!e.$_vclosepopover_touch,t.closeAllPopover=e.$_closePopoverModifiers&&!!e.$_closePopoverModifiers.all}function N(t){if(1===t.changedTouches.length){var e=t.currentTarget;e.$_vclosepopover_touch=!0;var n=t.changedTouches[0];e.$_vclosepopover_touchPoint=n,e.addEventListener("touchend",I),e.addEventListener("touchcancel",O)}}function I(t){var e=t.currentTarget;if(e.$_vclosepopover_touch=!1,1===t.changedTouches.length){var n=t.changedTouches[0],i=e.$_vclosepopover_touchPoint;t.closePopover=Math.abs(n.screenY-i.screenY)<20&&Math.abs(n.screenX-i.screenX)<20,t.closeAllPopover=e.$_closePopoverModifiers&&!!e.$_closePopoverModifiers.all}}function O(t){t.currentTarget.$_vclosepopover_touch=!1}var L={bind:function(t,e){var n=e.value,i=e.modifiers;t.$_closePopoverModifiers=i,(void 0===n||n)&&E(t)},update:function(t,e){var n=e.value,i=e.oldValue,o=e.modifiers;t.$_closePopoverModifiers=o,n!==i&&(void 0===n||n?E(t):S(t))},unbind:function(t){S(t)}};function D(t){var e=C.options.popover[t];return void 0===e?C.options[t]:e}var B=!1;"undefined"!=typeof window&&"undefined"!=typeof navigator&&(B=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream);var P=[],R=function(){};"undefined"!=typeof window&&(R=window.Element);var G={name:"VPopover",components:{ResizeObserver:o.a},props:{open:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placement:{type:String,default:function(){return D("defaultPlacement")}},delay:{type:[String,Number,Object],default:function(){return D("defaultDelay")}},offset:{type:[String,Number],default:function(){return D("defaultOffset")}},trigger:{type:String,default:function(){return D("defaultTrigger")}},container:{type:[String,Object,R,Boolean],default:function(){return D("defaultContainer")}},boundariesElement:{type:[String,R],default:function(){return D("defaultBoundariesElement")}},popperOptions:{type:Object,default:function(){return D("defaultPopperOptions")}},popoverClass:{type:[String,Array],default:function(){return D("defaultClass")}},popoverBaseClass:{type:[String,Array],default:function(){return C.options.popover.defaultBaseClass}},popoverInnerClass:{type:[String,Array],default:function(){return C.options.popover.defaultInnerClass}},popoverWrapperClass:{type:[String,Array],default:function(){return C.options.popover.defaultWrapperClass}},popoverArrowClass:{type:[String,Array],default:function(){return C.options.popover.defaultArrowClass}},autoHide:{type:Boolean,default:function(){return C.options.popover.defaultAutoHide}},handleResize:{type:Boolean,default:function(){return C.options.popover.defaultHandleResize}},openGroup:{type:String,default:null},openClass:{type:[String,Array],default:function(){return C.options.popover.defaultOpenClass}}},data:function(){return{isOpen:!1,id:Math.random().toString(36).substr(2,10)}},computed:{cssClass:function(){return s({},this.openClass,this.isOpen)},popoverId:function(){return"popover_".concat(this.id)}},watch:{open:function(t){t?this.show():this.hide()},disabled:function(t,e){t!==e&&(t?this.hide():this.open&&this.show())},container:function(t){if(this.isOpen&&this.popperInstance){var e=this.$refs.popover,n=this.$refs.trigger,i=this.$_findContainer(this.container,n);if(!i)return void console.warn("No container for popover",this);i.appendChild(e),this.popperInstance.scheduleUpdate()}},trigger:function(t){this.$_removeEventListeners(),this.$_addEventListeners()},placement:function(t){var e=this;this.$_updatePopper(function(){e.popperInstance.options.placement=t})},offset:"$_restartPopper",boundariesElement:"$_restartPopper",popperOptions:{handler:"$_restartPopper",deep:!0}},created:function(){this.$_isDisposed=!1,this.$_mounted=!1,this.$_events=[],this.$_preventOpen=!1},mounted:function(){var t=this.$refs.popover;t.parentNode&&t.parentNode.removeChild(t),this.$_init(),this.open&&this.show()},deactivated:function(){this.hide()},beforeDestroy:function(){this.dispose()},methods:{show:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.event,i=(e.skipDelay,e.force);!(void 0!==i&&i)&&this.disabled||(this.$_scheduleShow(n),this.$emit("show")),this.$emit("update:open",!0),this.$_beingShowed=!0,requestAnimationFrame(function(){t.$_beingShowed=!1})},hide:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.event;t.skipDelay;this.$_scheduleHide(e),this.$emit("hide"),this.$emit("update:open",!1)},dispose:function(){if(this.$_isDisposed=!0,this.$_removeEventListeners(),this.hide({skipDelay:!0}),this.popperInstance&&(this.popperInstance.destroy(),!this.popperInstance.options.removeOnDestroy)){var t=this.$refs.popover;t.parentNode&&t.parentNode.removeChild(t)}this.$_mounted=!1,this.popperInstance=null,this.isOpen=!1,this.$emit("dispose")},$_init:function(){-1===this.trigger.indexOf("manual")&&this.$_addEventListeners()},$_show:function(){var t=this,e=this.$refs.trigger,n=this.$refs.popover;if(clearTimeout(this.$_disposeTimer),!this.isOpen){if(this.popperInstance&&(this.isOpen=!0,this.popperInstance.enableEventListeners(),this.popperInstance.scheduleUpdate()),!this.$_mounted){var o=this.$_findContainer(this.container,e);if(!o)return void console.warn("No container for popover",this);o.appendChild(n),this.$_mounted=!0}if(!this.popperInstance){var r=c({},this.popperOptions,{placement:this.placement});if(r.modifiers=c({},r.modifiers,{arrow:c({},r.modifiers&&r.modifiers.arrow,{element:this.$refs.arrow})}),this.offset){var a=this.$_getOffset();r.modifiers.offset=c({},r.modifiers&&r.modifiers.offset,{offset:a})}this.boundariesElement&&(r.modifiers.preventOverflow=c({},r.modifiers&&r.modifiers.preventOverflow,{boundariesElement:this.boundariesElement})),this.popperInstance=new i.a(e,n,r),requestAnimationFrame(function(){if(t.hidden)return t.hidden=!1,void t.$_hide();!t.$_isDisposed&&t.popperInstance?(t.popperInstance.scheduleUpdate(),requestAnimationFrame(function(){if(t.hidden)return t.hidden=!1,void t.$_hide();t.$_isDisposed?t.dispose():t.isOpen=!0})):t.dispose()})}var s=this.openGroup;if(s)for(var l,u=0;u<P.length;u++)(l=P[u]).openGroup!==s&&(l.hide(),l.$emit("close-group"));P.push(this),this.$emit("apply-show")}},$_hide:function(){var t=this;if(this.isOpen){var e=P.indexOf(this);-1!==e&&P.splice(e,1),this.isOpen=!1,this.popperInstance&&this.popperInstance.disableEventListeners(),clearTimeout(this.$_disposeTimer);var n=C.options.popover.disposeTimeout||C.options.disposeTimeout;null!==n&&(this.$_disposeTimer=setTimeout(function(){var e=t.$refs.popover;e&&(e.parentNode&&e.parentNode.removeChild(e),t.$_mounted=!1)},n)),this.$emit("apply-hide")}},$_findContainer:function(t,e){return"string"==typeof t?t=window.document.querySelector(t):!1===t&&(t=e.parentNode),t},$_getOffset:function(){var t=r(this.offset),e=this.offset;return("number"===t||"string"===t&&-1===e.indexOf(","))&&(e="0, ".concat(e)),e},$_addEventListeners:function(){var t=this,e=this.$refs.trigger,n=[],i=[];("string"==typeof this.trigger?this.trigger.split(" ").filter(function(t){return-1!==["click","hover","focus"].indexOf(t)}):[]).forEach(function(t){switch(t){case"hover":n.push("mouseenter"),i.push("mouseleave");break;case"focus":n.push("focus"),i.push("blur");break;case"click":n.push("click"),i.push("click")}}),n.forEach(function(n){var i=function(e){t.isOpen||(e.usedByTooltip=!0,!t.$_preventOpen&&t.show({event:e}),t.hidden=!1)};t.$_events.push({event:n,func:i}),e.addEventListener(n,i)}),i.forEach(function(n){var i=function(e){e.usedByTooltip||(t.hide({event:e}),t.hidden=!0)};t.$_events.push({event:n,func:i}),e.addEventListener(n,i)})},$_scheduleShow:function(){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(clearTimeout(this.$_scheduleTimer),t)this.$_show();else{var e=parseInt(this.delay&&this.delay.show||this.delay||0);this.$_scheduleTimer=setTimeout(this.$_show.bind(this),e)}},$_scheduleHide:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(clearTimeout(this.$_scheduleTimer),n)this.$_hide();else{var i=parseInt(this.delay&&this.delay.hide||this.delay||0);this.$_scheduleTimer=setTimeout(function(){if(t.isOpen){if(e&&"mouseleave"===e.type)if(t.$_setTooltipNodeEvent(e))return;t.$_hide()}},i)}},$_setTooltipNodeEvent:function(t){var e=this,n=this.$refs.trigger,i=this.$refs.popover,o=t.relatedreference||t.toElement||t.relatedTarget;return!!i.contains(o)&&(i.addEventListener(t.type,function o(r){var a=r.relatedreference||r.toElement||r.relatedTarget;i.removeEventListener(t.type,o),n.contains(a)||e.hide({event:r})}),!0)},$_removeEventListeners:function(){var t=this.$refs.trigger;this.$_events.forEach(function(e){var n=e.func,i=e.event;t.removeEventListener(i,n)}),this.$_events=[]},$_updatePopper:function(t){this.popperInstance&&(t(),this.isOpen&&this.popperInstance.scheduleUpdate())},$_restartPopper:function(){if(this.popperInstance){var t=this.isOpen;this.dispose(),this.$_isDisposed=!1,this.$_init(),t&&this.show({skipDelay:!0,force:!0})}},$_handleGlobalClose:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.$_beingShowed||(this.hide({event:t}),t.closePopover?this.$emit("close-directive"):this.$emit("auto-hide"),n&&(this.$_preventOpen=!0,setTimeout(function(){e.$_preventOpen=!1},300)))},$_handleResize:function(){this.isOpen&&this.popperInstance&&(this.popperInstance.scheduleUpdate(),this.$emit("resize"))}}};function U(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=function(n){var i=P[n];if(i.$refs.popover){var o=i.$refs.popover.contains(t.target);requestAnimationFrame(function(){(t.closeAllPopover||t.closePopover&&o||i.autoHide&&!o)&&i.$_handleGlobalClose(t,e)})}},i=0;i<P.length;i++)n(i)}"undefined"!=typeof document&&"undefined"!=typeof window&&(B?document.addEventListener("touchend",function(t){U(t,!0)},!f||{passive:!0,capture:!0}):window.addEventListener("click",function(t){U(t)},!0));var j=function(t,e,n,i,o,r,a,s,c,l){"boolean"!=typeof a&&(c=s,s=a,a=!1);var u,d="function"==typeof n?n.options:n;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,o&&(d.functional=!0)),i&&(d._scopeId=i),r?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,c(t)),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=u):e&&(u=a?function(){e.call(this,l(this.$root.$options.shadowRoot))}:function(t){e.call(this,s(t))}),u)if(d.functional){var p=d.render;d.render=function(t,e){return u.call(e),p(t,e)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,u):[u]}return n},F=G,Y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-popover",class:t.cssClass},[n("div",{ref:"trigger",staticClass:"trigger",staticStyle:{display:"inline-block"},attrs:{"aria-describedby":t.popoverId,tabindex:-1!==t.trigger.indexOf("focus")?0:void 0}},[t._t("default")],2),t._v(" "),n("div",{ref:"popover",class:[t.popoverBaseClass,t.popoverClass,t.cssClass],style:{visibility:t.isOpen?"visible":"hidden"},attrs:{id:t.popoverId,"aria-hidden":t.isOpen?"false":"true",tabindex:t.autoHide?0:void 0},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"]))return null;t.autoHide&&t.hide()}}},[n("div",{class:t.popoverWrapperClass},[n("div",{ref:"inner",class:t.popoverInnerClass,staticStyle:{position:"relative"}},[n("div",[t._t("popover")],2),t._v(" "),t.handleResize?n("ResizeObserver",{on:{notify:t.$_handleResize}}):t._e()],1),t._v(" "),n("div",{ref:"arrow",class:t.popoverArrowClass})])])])};Y._withStripped=!0;var H=j({render:Y,staticRenderFns:[]},void 0,F,void 0,!1,void 0,void 0,void 0);var $=function(){this.__data__=[],this.size=0};var z=function(t,e){return t===e||t!=t&&e!=e};var Q=function(t,e){for(var n=t.length;n--;)if(z(t[n][0],e))return n;return-1},V=Array.prototype.splice;var W=function(t){var e=this.__data__,n=Q(e,t);return!(n<0||(n==e.length-1?e.pop():V.call(e,n,1),--this.size,0))};var Z=function(t){var e=this.__data__,n=Q(e,t);return n<0?void 0:e[n][1]};var J=function(t){return Q(this.__data__,t)>-1};var X=function(t,e){var n=this.__data__,i=Q(n,t);return i<0?(++this.size,n.push([t,e])):n[i][1]=e,this};function q(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}q.prototype.clear=$,q.prototype.delete=W,q.prototype.get=Z,q.prototype.has=J,q.prototype.set=X;var K=q;var tt=function(){this.__data__=new K,this.size=0};var et=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n};var nt=function(t){return this.__data__.get(t)};var it=function(t){return this.__data__.has(t)},ot="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};function rt(t,e){return t(e={exports:{}},e.exports),e.exports}var at="object"==typeof ot&&ot&&ot.Object===Object&&ot,st="object"==typeof self&&self&&self.Object===Object&&self,ct=at||st||Function("return this")(),lt=ct.Symbol,ut=Object.prototype,dt=ut.hasOwnProperty,pt=ut.toString,ft=lt?lt.toStringTag:void 0;var ht=function(t){var e=dt.call(t,ft),n=t[ft];try{t[ft]=void 0;var i=!0}catch(t){}var o=pt.call(t);return i&&(e?t[ft]=n:delete t[ft]),o},At=Object.prototype.toString;var vt=function(t){return At.call(t)},mt="[object Null]",gt="[object Undefined]",bt=lt?lt.toStringTag:void 0;var yt=function(t){return null==t?void 0===t?gt:mt:bt&&bt in Object(t)?ht(t):vt(t)};var wt=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},xt="[object AsyncFunction]",_t="[object Function]",Tt="[object GeneratorFunction]",kt="[object Proxy]";var Ct,Et=function(t){if(!wt(t))return!1;var e=yt(t);return e==_t||e==Tt||e==xt||e==kt},St=ct["__core-js_shared__"],Mt=(Ct=/[^.]+$/.exec(St&&St.keys&&St.keys.IE_PROTO||""))?"Symbol(src)_1."+Ct:"";var Nt=function(t){return!!Mt&&Mt in t},It=Function.prototype.toString;var Ot=function(t){if(null!=t){try{return It.call(t)}catch(t){}try{return t+""}catch(t){}}return""},Lt=/^\[object .+?Constructor\]$/,Dt=Function.prototype,Bt=Object.prototype,Pt=Dt.toString,Rt=Bt.hasOwnProperty,Gt=RegExp("^"+Pt.call(Rt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Ut=function(t){return!(!wt(t)||Nt(t))&&(Et(t)?Gt:Lt).test(Ot(t))};var jt=function(t,e){return null==t?void 0:t[e]};var Ft=function(t,e){var n=jt(t,e);return Ut(n)?n:void 0},Yt=Ft(ct,"Map"),Ht=Ft(Object,"create");var $t=function(){this.__data__=Ht?Ht(null):{},this.size=0};var zt=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Qt="__lodash_hash_undefined__",Vt=Object.prototype.hasOwnProperty;var Wt=function(t){var e=this.__data__;if(Ht){var n=e[t];return n===Qt?void 0:n}return Vt.call(e,t)?e[t]:void 0},Zt=Object.prototype.hasOwnProperty;var Jt=function(t){var e=this.__data__;return Ht?void 0!==e[t]:Zt.call(e,t)},Xt="__lodash_hash_undefined__";var qt=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=Ht&&void 0===e?Xt:e,this};function Kt(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}Kt.prototype.clear=$t,Kt.prototype.delete=zt,Kt.prototype.get=Wt,Kt.prototype.has=Jt,Kt.prototype.set=qt;var te=Kt;var ee=function(){this.size=0,this.__data__={hash:new te,map:new(Yt||K),string:new te}};var ne=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var ie=function(t,e){var n=t.__data__;return ne(e)?n["string"==typeof e?"string":"hash"]:n.map};var oe=function(t){var e=ie(this,t).delete(t);return this.size-=e?1:0,e};var re=function(t){return ie(this,t).get(t)};var ae=function(t){return ie(this,t).has(t)};var se=function(t,e){var n=ie(this,t),i=n.size;return n.set(t,e),this.size+=n.size==i?0:1,this};function ce(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}ce.prototype.clear=ee,ce.prototype.delete=oe,ce.prototype.get=re,ce.prototype.has=ae,ce.prototype.set=se;var le=ce,ue=200;var de=function(t,e){var n=this.__data__;if(n instanceof K){var i=n.__data__;if(!Yt||i.length<ue-1)return i.push([t,e]),this.size=++n.size,this;n=this.__data__=new le(i)}return n.set(t,e),this.size=n.size,this};function pe(t){var e=this.__data__=new K(t);this.size=e.size}pe.prototype.clear=tt,pe.prototype.delete=et,pe.prototype.get=nt,pe.prototype.has=it,pe.prototype.set=de;var fe=pe,he=function(){try{var t=Ft(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Ae=function(t,e,n){"__proto__"==e&&he?he(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n};var ve=function(t,e,n){(void 0===n||z(t[e],n))&&(void 0!==n||e in t)||Ae(t,e,n)};var me=function(t){return function(e,n,i){for(var o=-1,r=Object(e),a=i(e),s=a.length;s--;){var c=a[t?s:++o];if(!1===n(r[c],c,r))break}return e}}(),ge=rt(function(t,e){var n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,o=i&&i.exports===n?ct.Buffer:void 0,r=o?o.allocUnsafe:void 0;t.exports=function(t,e){if(e)return t.slice();var n=t.length,i=r?r(n):new t.constructor(n);return t.copy(i),i}}),be=ct.Uint8Array;var ye=function(t){var e=new t.constructor(t.byteLength);return new be(e).set(new be(t)),e};var we=function(t,e){var n=e?ye(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)};var xe=function(t,e){var n=-1,i=t.length;for(e||(e=Array(i));++n<i;)e[n]=t[n];return e},_e=Object.create,Te=function(){function t(){}return function(e){if(!wt(e))return{};if(_e)return _e(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();var ke=function(t,e){return function(n){return t(e(n))}}(Object.getPrototypeOf,Object),Ce=Object.prototype;var Ee=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ce)};var Se=function(t){return"function"!=typeof t.constructor||Ee(t)?{}:Te(ke(t))};var Me=function(t){return null!=t&&"object"==typeof t},Ne="[object Arguments]";var Ie=function(t){return Me(t)&&yt(t)==Ne},Oe=Object.prototype,Le=Oe.hasOwnProperty,De=Oe.propertyIsEnumerable,Be=Ie(function(){return arguments}())?Ie:function(t){return Me(t)&&Le.call(t,"callee")&&!De.call(t,"callee")},Pe=Array.isArray,Re=9007199254740991;var Ge=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=Re};var Ue=function(t){return null!=t&&Ge(t.length)&&!Et(t)};var je=function(t){return Me(t)&&Ue(t)};var Fe=function(){return!1},Ye=rt(function(t,e){var n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,o=i&&i.exports===n?ct.Buffer:void 0,r=(o?o.isBuffer:void 0)||Fe;t.exports=r}),He="[object Object]",$e=Function.prototype,ze=Object.prototype,Qe=$e.toString,Ve=ze.hasOwnProperty,We=Qe.call(Object);var Ze=function(t){if(!Me(t)||yt(t)!=He)return!1;var e=ke(t);if(null===e)return!0;var n=Ve.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&Qe.call(n)==We},Je={};Je["[object Float32Array]"]=Je["[object Float64Array]"]=Je["[object Int8Array]"]=Je["[object Int16Array]"]=Je["[object Int32Array]"]=Je["[object Uint8Array]"]=Je["[object Uint8ClampedArray]"]=Je["[object Uint16Array]"]=Je["[object Uint32Array]"]=!0,Je["[object Arguments]"]=Je["[object Array]"]=Je["[object ArrayBuffer]"]=Je["[object Boolean]"]=Je["[object DataView]"]=Je["[object Date]"]=Je["[object Error]"]=Je["[object Function]"]=Je["[object Map]"]=Je["[object Number]"]=Je["[object Object]"]=Je["[object RegExp]"]=Je["[object Set]"]=Je["[object String]"]=Je["[object WeakMap]"]=!1;var Xe=function(t){return Me(t)&&Ge(t.length)&&!!Je[yt(t)]};var qe=function(t){return function(e){return t(e)}},Ke=rt(function(t,e){var n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,o=i&&i.exports===n&&at.process,r=function(){try{var t=i&&i.require&&i.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=r}),tn=Ke&&Ke.isTypedArray,en=tn?qe(tn):Xe;var nn=function(t,e){if("__proto__"!=e)return t[e]},on=Object.prototype.hasOwnProperty;var rn=function(t,e,n){var i=t[e];on.call(t,e)&&z(i,n)&&(void 0!==n||e in t)||Ae(t,e,n)};var an=function(t,e,n,i){var o=!n;n||(n={});for(var r=-1,a=e.length;++r<a;){var s=e[r],c=i?i(n[s],t[s],s,n,t):void 0;void 0===c&&(c=t[s]),o?Ae(n,s,c):rn(n,s,c)}return n};var sn=function(t,e){for(var n=-1,i=Array(t);++n<t;)i[n]=e(n);return i},cn=9007199254740991,ln=/^(?:0|[1-9]\d*)$/;var un=function(t,e){var n=typeof t;return!!(e=null==e?cn:e)&&("number"==n||"symbol"!=n&&ln.test(t))&&t>-1&&t%1==0&&t<e},dn=Object.prototype.hasOwnProperty;var pn=function(t,e){var n=Pe(t),i=!n&&Be(t),o=!n&&!i&&Ye(t),r=!n&&!i&&!o&&en(t),a=n||i||o||r,s=a?sn(t.length,String):[],c=s.length;for(var l in t)!e&&!dn.call(t,l)||a&&("length"==l||o&&("offset"==l||"parent"==l)||r&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||un(l,c))||s.push(l);return s};var fn=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e},hn=Object.prototype.hasOwnProperty;var An=function(t){if(!wt(t))return fn(t);var e=Ee(t),n=[];for(var i in t)("constructor"!=i||!e&&hn.call(t,i))&&n.push(i);return n};var vn=function(t){return Ue(t)?pn(t,!0):An(t)};var mn=function(t){return an(t,vn(t))};var gn=function(t,e,n,i,o,r,a){var s=nn(t,n),c=nn(e,n),l=a.get(c);if(l)ve(t,n,l);else{var u=r?r(s,c,n+"",t,e,a):void 0,d=void 0===u;if(d){var p=Pe(c),f=!p&&Ye(c),h=!p&&!f&&en(c);u=c,p||f||h?Pe(s)?u=s:je(s)?u=xe(s):f?(d=!1,u=ge(c,!0)):h?(d=!1,u=we(c,!0)):u=[]:Ze(c)||Be(c)?(u=s,Be(s)?u=mn(s):wt(s)&&!Et(s)||(u=Se(c))):d=!1}d&&(a.set(c,u),o(u,c,i,r,a),a.delete(c)),ve(t,n,u)}};var bn=function t(e,n,i,o,r){e!==n&&me(n,function(a,s){if(wt(a))r||(r=new fe),gn(e,n,s,i,t,o,r);else{var c=o?o(nn(e,s),a,s+"",e,n,r):void 0;void 0===c&&(c=a),ve(e,s,c)}},vn)};var yn=function(t){return t};var wn=function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)},xn=Math.max;var _n=function(t,e,n){return e=xn(void 0===e?t.length-1:e,0),function(){for(var i=arguments,o=-1,r=xn(i.length-e,0),a=Array(r);++o<r;)a[o]=i[e+o];o=-1;for(var s=Array(e+1);++o<e;)s[o]=i[o];return s[e]=n(a),wn(t,this,s)}};var Tn=function(t){return function(){return t}},kn=he?function(t,e){return he(t,"toString",{configurable:!0,enumerable:!1,value:Tn(e),writable:!0})}:yn,Cn=800,En=16,Sn=Date.now;var Mn=function(t){var e=0,n=0;return function(){var i=Sn(),o=En-(i-n);if(n=i,o>0){if(++e>=Cn)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(kn);var Nn=function(t,e){return Mn(_n(t,e,yn),t+"")};var In=function(t,e,n){if(!wt(n))return!1;var i=typeof e;return!!("number"==i?Ue(n)&&un(e,n.length):"string"==i&&e in n)&&z(n[e],t)};var On=function(t){return Nn(function(e,n){var i=-1,o=n.length,r=o>1?n[o-1]:void 0,a=o>2?n[2]:void 0;for(r=t.length>3&&"function"==typeof r?(o--,r):void 0,a&&In(n[0],n[1],a)&&(r=o<3?void 0:r,o=1),e=Object(e);++i<o;){var s=n[i];s&&t(e,s,i,r)}return e})}(function(t,e,n){bn(t,e,n)});!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))}}(".resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}");var Ln=C,Dn={install:function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t.installed){t.installed=!0;var i={};On(i,y,n),Dn.options=i,C.options=i,e.directive("tooltip",C),e.directive("close-popover",L),e.component("v-popover",H)}},get enabled(){return g.enabled},set enabled(t){g.enabled=t}},Bn=null;"undefined"!=typeof window?Bn=window.Vue:void 0!==t&&(Bn=t.Vue),Bn&&Bn.use(Dn)}).call(this,n(7))},function(t,e,n){"use strict";(function(t){for(
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var n="undefined"!=typeof window&&"undefined"!=typeof document,i=["Edge","Trident","Firefox"],o=0,r=0;r<i.length;r+=1)if(n&&navigator.userAgent.indexOf(i[r])>=0){o=1;break}var a=n&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then(function(){e=!1,t()}))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},o))}};function s(t){return t&&"[object Function]"==={}.toString.call(t)}function c(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function l(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function u(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=c(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:u(l(t))}var d=n&&!(!window.MSInputMethodContext||!document.documentMode),p=n&&/MSIE 10/.test(navigator.userAgent);function f(t){return 11===t?d:10===t?p:d||p}function h(t){if(!t)return document.documentElement;for(var e=f(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===c(n,"position")?h(n):n:t?t.ownerDocument.documentElement:document.documentElement}function A(t){return null!==t.parentNode?A(t.parentNode):t}function v(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var a,s,c=r.commonAncestorContainer;if(t!==c&&e!==c||i.contains(o))return"BODY"===(s=(a=c).nodeName)||"HTML"!==s&&h(a.firstElementChild)!==a?h(c):c;var l=A(t);return l.host?v(l.host,e):v(t,A(e).host)}function m(t){var e="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"===n||"HTML"===n){var i=t.ownerDocument.documentElement;return(t.ownerDocument.scrollingElement||i)[e]}return t[e]}function g(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"],10)+parseFloat(t["border"+i+"Width"],10)}function b(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],f(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function y(t){var e=t.body,n=t.documentElement,i=f(10)&&getComputedStyle(n);return{height:b("Height",e,n,i),width:b("Width",e,n,i)}}var w=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},x=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},T=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function k(t){return T({},t,{right:t.left+t.width,bottom:t.top+t.height})}function C(t){var e={};try{if(f(10)){e=t.getBoundingClientRect();var n=m(t,"top"),i=m(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?y(t.ownerDocument):{},a=r.width||t.clientWidth||o.right-o.left,s=r.height||t.clientHeight||o.bottom-o.top,l=t.offsetWidth-a,u=t.offsetHeight-s;if(l||u){var d=c(t);l-=g(d,"x"),u-=g(d,"y"),o.width-=l,o.height-=u}return k(o)}function E(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=f(10),o="HTML"===e.nodeName,r=C(t),a=C(e),s=u(t),l=c(e),d=parseFloat(l.borderTopWidth,10),p=parseFloat(l.borderLeftWidth,10);n&&o&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var h=k({top:r.top-a.top-d,left:r.left-a.left-p,width:r.width,height:r.height});if(h.marginTop=0,h.marginLeft=0,!i&&o){var A=parseFloat(l.marginTop,10),v=parseFloat(l.marginLeft,10);h.top-=d-A,h.bottom-=d-A,h.left-=p-v,h.right-=p-v,h.marginTop=A,h.marginLeft=v}return(i&&!n?e.contains(s):e===s&&"BODY"!==s.nodeName)&&(h=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=m(e,"top"),o=m(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}(h,e)),h}function S(t){if(!t||!t.parentElement||f())return document.documentElement;for(var e=t.parentElement;e&&"none"===c(e,"transform");)e=e.parentElement;return e||document.documentElement}function M(t,e,n,i){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},a=o?S(t):v(t,e);if("viewport"===i)r=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=E(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),a=e?0:m(n),s=e?0:m(n,"left");return k({top:a-i.top+i.marginTop,left:s-i.left+i.marginLeft,width:o,height:r})}(a,o);else{var s=void 0;"scrollParent"===i?"BODY"===(s=u(l(e))).nodeName&&(s=t.ownerDocument.documentElement):s="window"===i?t.ownerDocument.documentElement:i;var d=E(s,a,o);if("HTML"!==s.nodeName||function t(e){var n=e.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===c(e,"position"))return!0;var i=l(e);return!!i&&t(i)}(a))r=d;else{var p=y(t.ownerDocument),f=p.height,h=p.width;r.top+=d.top-d.marginTop,r.bottom=f+d.top,r.left+=d.left-d.marginLeft,r.right=h+d.left}}var A="number"==typeof(n=n||0);return r.left+=A?n:n.left||0,r.top+=A?n:n.top||0,r.right-=A?n:n.right||0,r.bottom-=A?n:n.bottom||0,r}function N(t,e,n,i,o){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var a=M(n,i,r,o),s={top:{width:a.width,height:e.top-a.top},right:{width:a.right-e.right,height:a.height},bottom:{width:a.width,height:a.bottom-e.bottom},left:{width:e.left-a.left,height:a.height}},c=Object.keys(s).map(function(t){return T({key:t},s[t],{area:(e=s[t],e.width*e.height)});var e}).sort(function(t,e){return e.area-t.area}),l=c.filter(function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight}),u=l.length>0?l[0].key:c[0].key,d=t.split("-")[1];return u+(d?"-"+d:"")}function I(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return E(n,i?S(e):v(e,n),i)}function O(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function L(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function D(t,e,n){n=n.split("-")[0];var i=O(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),a=r?"top":"left",s=r?"left":"top",c=r?"height":"width",l=r?"width":"height";return o[a]=e[a]+e[c]/2-i[c]/2,o[s]=n===s?e[s]-i[l]:e[L(s)],o}function B(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function P(t,e,n){return(void 0===n?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var i=B(t,function(t){return t[e]===n});return t.indexOf(i)}(t,"name",n))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&s(n)&&(e.offsets.popper=k(e.offsets.popper),e.offsets.reference=k(e.offsets.reference),e=n(e,t))}),e}function R(t,e){return t.some(function(t){var n=t.name;return t.enabled&&n===e})}function G(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if(void 0!==document.body.style[r])return r}return null}function U(t){var e=t.ownerDocument;return e?e.defaultView:window}function j(t,e,n,i){n.updateBound=i,U(t).addEventListener("resize",n.updateBound,{passive:!0});var o=u(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,a=r?e.ownerDocument.defaultView:e;a.addEventListener(n,i,{passive:!0}),r||t(u(a.parentNode),n,i,o),o.push(a)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function F(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,U(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function Y(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function H(t,e){Object.keys(e).forEach(function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&Y(e[n])&&(i="px"),t.style[n]=e[n]+i})}var $=n&&/Firefox/i.test(navigator.userAgent);function z(t,e,n){var i=B(t,function(t){return t.name===e}),o=!!i&&t.some(function(t){return t.name===n&&t.enabled&&t.order<i.order});if(!o){var r="`"+e+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var Q=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],V=Q.slice(3);function W(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=V.indexOf(t),i=V.slice(n+1).concat(V.slice(0,n));return e?i.reverse():i}var Z={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function J(t,e,n,i){var o=[0,0],r=-1!==["right","left"].indexOf(i),a=t.split(/(\+|\-)/).map(function(t){return t.trim()}),s=a.indexOf(B(a,function(t){return-1!==t.search(/,|\s/)}));a[s]&&-1===a[s].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var c=/\s*,\s*|\s+/,l=-1!==s?[a.slice(0,s).concat([a[s].split(c)[0]]),[a[s].split(c)[1]].concat(a.slice(s+1))]:[a];return(l=l.map(function(t,i){var o=(1===i?!r:r)?"height":"width",a=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,a=!0,t):a?(t[t.length-1]+=e,a=!1,t):t.concat(e)},[]).map(function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],a=o[2];if(!r)return t;if(0===a.indexOf("%")){var s=void 0;switch(a){case"%p":s=n;break;case"%":case"%r":default:s=i}return k(s)[e]/100*r}if("vh"===a||"vw"===a)return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;return r}(t,o,e,n)})})).forEach(function(t,e){t.forEach(function(n,i){Y(n)&&(o[e]+=n*("-"===t[i-1]?-1:1))})}),o}var X={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,a=o.popper,s=-1!==["bottom","top"].indexOf(n),c=s?"left":"top",l=s?"width":"height",u={start:_({},c,r[c]),end:_({},c,r[c]+r[l]-a[l])};t.offsets.popper=T({},a,u[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,a=o.reference,s=i.split("-")[0],c=void 0;return c=Y(+n)?[+n,0]:J(n,r,a,s),"left"===s?(r.top+=c[0],r.left-=c[1]):"right"===s?(r.top+=c[0],r.left+=c[1]):"top"===s?(r.left+=c[0],r.top-=c[1]):"bottom"===s&&(r.left+=c[0],r.top+=c[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||h(t.instance.popper);t.instance.reference===n&&(n=h(n));var i=G("transform"),o=t.instance.popper.style,r=o.top,a=o.left,s=o[i];o.top="",o.left="",o[i]="";var c=M(t.instance.popper,t.instance.reference,e.padding,n,t.positionFixed);o.top=r,o.left=a,o[i]=s,e.boundaries=c;var l=e.priority,u=t.offsets.popper,d={primary:function(t){var n=u[t];return u[t]<c[t]&&!e.escapeWithReference&&(n=Math.max(u[t],c[t])),_({},t,n)},secondary:function(t){var n="right"===t?"left":"top",i=u[n];return u[t]>c[t]&&!e.escapeWithReference&&(i=Math.min(u[n],c[t]-("right"===t?u.width:u.height))),_({},n,i)}};return l.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";u=T({},u,d[e](t))}),t.offsets.popper=u,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,a=-1!==["top","bottom"].indexOf(o),s=a?"right":"bottom",c=a?"left":"top",l=a?"width":"height";return n[s]<r(i[c])&&(t.offsets.popper[c]=r(i[c])-n[l]),n[c]>r(i[s])&&(t.offsets.popper[c]=r(i[s])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!z(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,a=r.popper,s=r.reference,l=-1!==["left","right"].indexOf(o),u=l?"height":"width",d=l?"Top":"Left",p=d.toLowerCase(),f=l?"left":"top",h=l?"bottom":"right",A=O(i)[u];s[h]-A<a[p]&&(t.offsets.popper[p]-=a[p]-(s[h]-A)),s[p]+A>a[h]&&(t.offsets.popper[p]+=s[p]+A-a[h]),t.offsets.popper=k(t.offsets.popper);var v=s[p]+s[u]/2-A/2,m=c(t.instance.popper),g=parseFloat(m["margin"+d],10),b=parseFloat(m["border"+d+"Width"],10),y=v-t.offsets.popper[p]-g-b;return y=Math.max(Math.min(a[u]-A,y),0),t.arrowElement=i,t.offsets.arrow=(_(n={},p,Math.round(y)),_(n,f,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(R(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=M(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed),i=t.placement.split("-")[0],o=L(i),r=t.placement.split("-")[1]||"",a=[];switch(e.behavior){case Z.FLIP:a=[i,o];break;case Z.CLOCKWISE:a=W(i);break;case Z.COUNTERCLOCKWISE:a=W(i,!0);break;default:a=e.behavior}return a.forEach(function(s,c){if(i!==s||a.length===c+1)return t;i=t.placement.split("-")[0],o=L(i);var l=t.offsets.popper,u=t.offsets.reference,d=Math.floor,p="left"===i&&d(l.right)>d(u.left)||"right"===i&&d(l.left)<d(u.right)||"top"===i&&d(l.bottom)>d(u.top)||"bottom"===i&&d(l.top)<d(u.bottom),f=d(l.left)<d(n.left),h=d(l.right)>d(n.right),A=d(l.top)<d(n.top),v=d(l.bottom)>d(n.bottom),m="left"===i&&f||"right"===i&&h||"top"===i&&A||"bottom"===i&&v,g=-1!==["top","bottom"].indexOf(i),b=!!e.flipVariations&&(g&&"start"===r&&f||g&&"end"===r&&h||!g&&"start"===r&&A||!g&&"end"===r&&v),y=!!e.flipVariationsByContent&&(g&&"start"===r&&h||g&&"end"===r&&f||!g&&"start"===r&&v||!g&&"end"===r&&A),w=b||y;(p||m||w)&&(t.flipped=!0,(p||m)&&(i=a[c+1]),w&&(r=function(t){return"end"===t?"start":"start"===t?"end":t}(r)),t.placement=i+(r?"-"+r:""),t.offsets.popper=T({},t.offsets.popper,D(t.instance.popper,t.offsets.reference,t.placement)),t=P(t.instance.modifiers,t,"flip"))}),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,a=-1!==["left","right"].indexOf(n),s=-1===["top","left"].indexOf(n);return o[a?"left":"top"]=r[n]-(s?o[a?"width":"height"]:0),t.placement=L(e),t.offsets.popper=k(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!z(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=B(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=B(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==r?r:e.gpuAcceleration,s=h(t.instance.popper),c=C(s),l={position:o.position},u=function(t,e){var n=t.offsets,i=n.popper,o=n.reference,r=Math.round,a=Math.floor,s=function(t){return t},c=r(o.width),l=r(i.width),u=-1!==["left","right"].indexOf(t.placement),d=-1!==t.placement.indexOf("-"),p=e?u||d||c%2==l%2?r:a:s,f=e?r:s;return{left:p(c%2==1&&l%2==1&&!d&&e?i.left-1:i.left),top:f(i.top),bottom:f(i.bottom),right:p(i.right)}}(t,window.devicePixelRatio<2||!$),d="bottom"===n?"top":"bottom",p="right"===i?"left":"right",f=G("transform"),A=void 0,v=void 0;if(v="bottom"===d?"HTML"===s.nodeName?-s.clientHeight+u.bottom:-c.height+u.bottom:u.top,A="right"===p?"HTML"===s.nodeName?-s.clientWidth+u.right:-c.width+u.right:u.left,a&&f)l[f]="translate3d("+A+"px, "+v+"px, 0)",l[d]=0,l[p]=0,l.willChange="transform";else{var m="bottom"===d?-1:1,g="right"===p?-1:1;l[d]=v*m,l[p]=A*g,l.willChange=d+", "+p}var b={"x-placement":t.placement};return t.attributes=T({},b,t.attributes),t.styles=T({},l,t.styles),t.arrowStyles=T({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return H(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach(function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)}),t.arrowElement&&Object.keys(t.arrowStyles).length&&H(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=I(o,e,t,n.positionFixed),a=N(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",a),H(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},q=function(){function t(e,n){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};w(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=a(this.update.bind(this)),this.options=T({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(T({},t.Defaults.modifiers,o.modifiers)).forEach(function(e){i.options.modifiers[e]=T({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return T({name:t},i.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(t){t.enabled&&s(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)}),this.update();var r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}return x(t,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=I(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=N(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=D(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=P(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,R(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[G("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=j(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return F.call(this)}}]),t}();q.Utils=("undefined"!=typeof window?window:t).PopperUtils,q.placements=Q,q.Defaults=X,e.a=q}).call(this,n(7))},function(t,e,n){"use strict";t.exports=function(t,e){return"string"!=typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)||e?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},function(t,e){t.exports="data:application/vnd.ms-fontobject;base64,0gkAACgJAAABAAIAAAAAAAIABQMAAAAAAAABQJABAAAAAExQAAAAABAAAAAAAAAAAAAAAAAAAAEAAAAAO4MNJQAAAAAAAAAAAAAAAAAAAAAAABgAAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAAAAAAAAFgAAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAYAABpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAAAAAAAQAAAAoAgAADACBPUy8ydOOQiAAAAKwAAABgY21hcOok67wAAAEMAAABSmdseWZ0BZ9ZAAACWAAAAzxoZWFkJPbmCwAABZQAAAA2aGhlYSccE4AAAAXMAAAAJGhtdHgThwAAAAAF8AAAABpsb2NhA5oEoAAABgwAAAAYbWF4cAEYAFcAAAYkAAAAIG5hbWUNIFD5AAAGRAAAAkZwb3N0+8sNdgAACIwAAACcAAQTiAGQAAUAAAxlDawAAAK8DGUNrAAACWAA9QUKAAACAAUDAAAAAAAAAAAAABAAAAAAAAAAAAAAAFBmRWQAQOoB6gsTiAAAAcITiAAAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAAAAAEQAAwABAAAAHAAEACgAAAAGAAQAAQAC6gbqC///AADqAeoH//8WABX/AAEAAAAAAAAAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAOpg9DAAUACwAACQIRCQQRCQEOpvqCBX77ugRG+oL6ggV++7oERg9C+oL6ggE4BEYERgE4+oL6ggE4BEYERgABAAAAAA1uElAABQAACQERCQERBhsHU/d0CIwJxPit/sgIiwiM/scAAgAAAAAP3w9DAAUACwAACQIRCQQRCQEE4gV++oIERvu6BX4Ff/qBBEb7ugRGBX4Ffv7I+7r7uv7IBX4Ffv7I+7r7ugABAAAAAA6mElAABQAACQERCQERDW74rQiL93UJxAdTATn3dPd1ATgAAQAAAAARFxEXAAsAAAkLERf97frA+sD97QVA+sACEwVABUACE/rABIT97QVA+sACEwVABUACE/rABUD97frAAAH//wAAE5MS7AAzAAABIgcOARcWFwEhJgcGBwYHBhQXFhcWFxY3IQEGBwYXFhceARcWFxY3NjcBNjc2JyYnAS4BCmBlT0pGEBJIBdfx4E0+OiknFBQUFCcpOj5NDiD6KTcaGAMDGxlWNTc7Pjo/NQftOxUVFBU8+BMsdBLsOTSsWWBH+ioBGxguLDk4eDg5LC4YGwL6KTU/Oz46NzZWGRoDAxgZOAfsPFFQT1I8B+wtMgAAAAMAAAAAERcRFwADAAcACwAAAREhEQERIREBESERAnEOpvFaDqbxWg6mERf9jwJx+eb9jwJx+eX9jwJxAAMAAAAAElAMNQAYADEASgAAASIHDgEHBhYXHgEXFjI3PgE3NjQnLgEnJiEiBw4BBwYUFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmA6qAdHCtLzIBMS+tcHT/dHCtLzIyL61wdAWbf3RwrTAxMTCtcHT+dHCtMDExMK1wdAWcgHRwrS8xMS+tcHT/dHCtLzIyL61wdAw1MTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxAAAAAgAAAAAP3w/fAAMABwAAAREhESERIREDqgTiAnEE4g/f88sMNfPLDDUAAAABAAAAABEXERcAAgAACQICcQ6m8VoRF/it+K0AAQAAAAEAACUNgztfDzz1AAsTiAAAAADZS69NAAAAANj6003//wAAE5MS7AAAAAgAAgAAAAAAAAABAAATiAAAAAATiP////UTkwABAAAAAAAAAAAAAAAAAAAAAgAAAAATiAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAACIANgBYAGwAjADmAQQBegGQAZ4AAQAAAAsASwADAAAAAAACAAAACgAKAAAA/wAAAAAAAAAAABAAxgABAAAAAAABAAwAAAABAAAAAAACAAcADAABAAAAAAADAAwAEwABAAAAAAAEAAwAHwABAAAAAAAFAAsAKwABAAAAAAAGAAwANgABAAAAAAAKACsAQgABAAAAAAALABMAbQADAAEECQABABgAgAADAAEECQACAA4AmAADAAEECQADABgApgADAAEECQAEABgAvgADAAEECQAFABYA1gADAAEECQAGABgA7AADAAEECQAKAFYBBAADAAEECQALACYBWmljb25mb250LXZ1ZVJlZ3VsYXJpY29uZm9udC12dWVpY29uZm9udC12dWVWZXJzaW9uIDEuMGljb25mb250LXZ1ZUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAFIAZQBnAHUAbABhAHIAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAIAAAAAAAAAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAsACwAAAQIBAwEEAQUBBgEHAQgBCQEKAQsRYXJyb3ctbGVmdC1kb3VibGUKYXJyb3ctbGVmdBJhcnJvdy1yaWdodC1kb3VibGULYXJyb3ctcmlnaHQFY2xvc2UMY29uZmlybS1mYWRlBG1lbnUEbW9yZQVwYXVzZQRwbGF5"},function(t,e){t.exports="data:font/woff;base64,d09GRgABAAAAAAlwAAoAAAAACSgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAA9AAAAGAAAABgdOOQiGNtYXAAAAFUAAABSgAAAUrqJOu8Z2x5ZgAAAqAAAAM8AAADPHQFn1loZWFkAAAF3AAAADYAAAA2JPbmC2hoZWEAAAYUAAAAJAAAACQnHBOAaG10eAAABjgAAAAaAAAAGhOHAABsb2NhAAAGVAAAABgAAAAYA5oEoG1heHAAAAZsAAAAIAAAACABGABXbmFtZQAABowAAAJGAAACRg0gUPlwb3N0AAAI1AAAAJwAAACc+8sNdgAEE4gBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoLE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAuoG6gv//wAA6gHqB///FgAV/wABAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAADqYPQwAFAAsAAAkCEQkEEQkBDqb6ggV++7oERvqC+oIFfvu6BEYPQvqC+oIBOARGBEYBOPqC+oIBOARGBEYAAQAAAAANbhJQAAUAAAkBEQkBEQYbB1P3dAiMCcT4rf7ICIsIjP7HAAIAAAAAD98PQwAFAAsAAAkCEQkEEQkBBOIFfvqCBEb7ugV+BX/6gQRG+7oERgV+BX7+yPu6+7r+yAV+BX7+yPu6+7oAAQAAAAAOphJQAAUAAAkBEQkBEQ1u+K0Ii/d1CcQHUwE593T3dQE4AAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAADAAAAABEXERcAAwAHAAsAAAERIREBESERAREhEQJxDqbxWg6m8VoOphEX/Y8Ccfnm/Y8Ccfnl/Y8CcQADAAAAABJQDDUAGAAxAEoAAAEiBw4BBwYWFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgOqgHRwrS8yATEvrXB0/3RwrS8yMi+tcHQFm390cK0wMTEwrXB0/nRwrTAxMTCtcHQFnIB0cK0vMTEvrXB0/3RwrS8yMi+tcHQMNTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMQAAAAIAAAAAD98P3wADAAcAAAERIREhESERA6oE4gJxBOIP3/PLDDXzyww1AAAAAQAAAAARFxEXAAIAAAkCAnEOpvFaERf4rfitAAEAAAABAAAlDYM7Xw889QALE4gAAAAA2UuvTQAAAADY+tNN//8AABOTEuwAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j////1E5MAAQAAAAAAAAAAAAAAAAAAAAIAAAAAE4gAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAiADYAWABsAIwA5gEEAXoBkAGeAAEAAAALAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAMAAAAAQAAAAAAAgAHAAwAAQAAAAAAAwAMABMAAQAAAAAABAAMAB8AAQAAAAAABQALACsAAQAAAAAABgAMADYAAQAAAAAACgArAEIAAQAAAAAACwATAG0AAwABBAkAAQAYAIAAAwABBAkAAgAOAJgAAwABBAkAAwAYAKYAAwABBAkABAAYAL4AAwABBAkABQAWANYAAwABBAkABgAYAOwAAwABBAkACgBWAQQAAwABBAkACwAmAVppY29uZm9udC12dWVSZWd1bGFyaWNvbmZvbnQtdnVlaWNvbmZvbnQtdnVlVmVyc2lvbiAxLjBpY29uZm9udC12dWVHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAsAAAECAQMBBAEFAQYBBwEIAQkBCgELEWFycm93LWxlZnQtZG91YmxlCmFycm93LWxlZnQSYXJyb3ctcmlnaHQtZG91YmxlC2Fycm93LXJpZ2h0BWNsb3NlDGNvbmZpcm0tZmFkZQRtZW51BG1vcmUFcGF1c2UEcGxheQ=="},function(t,e){t.exports="data:font/ttf;base64,AAEAAAAKAIAAAwAgT1MvMnTjkIgAAACsAAAAYGNtYXDqJOu8AAABDAAAAUpnbHlmdAWfWQAAAlgAAAM8aGVhZCT25gsAAAWUAAAANmhoZWEnHBOAAAAFzAAAACRobXR4E4cAAAAABfAAAAAabG9jYQOaBKAAAAYMAAAAGG1heHABGABXAAAGJAAAACBuYW1lDSBQ+QAABkQAAAJGcG9zdPvLDXYAAAiMAAAAnAAEE4gBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoLE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAuoG6gv//wAA6gHqB///FgAV/wABAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAADqYPQwAFAAsAAAkCEQkEEQkBDqb6ggV++7oERvqC+oIFfvu6BEYPQvqC+oIBOARGBEYBOPqC+oIBOARGBEYAAQAAAAANbhJQAAUAAAkBEQkBEQYbB1P3dAiMCcT4rf7ICIsIjP7HAAIAAAAAD98PQwAFAAsAAAkCEQkEEQkBBOIFfvqCBEb7ugV+BX/6gQRG+7oERgV+BX7+yPu6+7r+yAV+BX7+yPu6+7oAAQAAAAAOphJQAAUAAAkBEQkBEQ1u+K0Ii/d1CcQHUwE593T3dQE4AAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAADAAAAABEXERcAAwAHAAsAAAERIREBESERAREhEQJxDqbxWg6m8VoOphEX/Y8Ccfnm/Y8Ccfnl/Y8CcQADAAAAABJQDDUAGAAxAEoAAAEiBw4BBwYWFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgOqgHRwrS8yATEvrXB0/3RwrS8yMi+tcHQFm390cK0wMTEwrXB0/nRwrTAxMTCtcHQFnIB0cK0vMTEvrXB0/3RwrS8yMi+tcHQMNTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMQAAAAIAAAAAD98P3wADAAcAAAERIREhESERA6oE4gJxBOIP3/PLDDXzyww1AAAAAQAAAAARFxEXAAIAAAkCAnEOpvFaERf4rfitAAEAAAABAAAlDYM7Xw889QALE4gAAAAA2UuvTQAAAADY+tNN//8AABOTEuwAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j////1E5MAAQAAAAAAAAAAAAAAAAAAAAIAAAAAE4gAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAiADYAWABsAIwA5gEEAXoBkAGeAAEAAAALAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAMAAAAAQAAAAAAAgAHAAwAAQAAAAAAAwAMABMAAQAAAAAABAAMAB8AAQAAAAAABQALACsAAQAAAAAABgAMADYAAQAAAAAACgArAEIAAQAAAAAACwATAG0AAwABBAkAAQAYAIAAAwABBAkAAgAOAJgAAwABBAkAAwAYAKYAAwABBAkABAAYAL4AAwABBAkABQAWANYAAwABBAkABgAYAOwAAwABBAkACgBWAQQAAwABBAkACwAmAVppY29uZm9udC12dWVSZWd1bGFyaWNvbmZvbnQtdnVlaWNvbmZvbnQtdnVlVmVyc2lvbiAxLjBpY29uZm9udC12dWVHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAsAAAECAQMBBAEFAQYBBwEIAQkBCgELEWFycm93LWxlZnQtZG91YmxlCmFycm93LWxlZnQSYXJyb3ctcmlnaHQtZG91YmxlC2Fycm93LXJpZ2h0BWNsb3NlDGNvbmZpcm0tZmFkZQRtZW51BG1vcmUFcGF1c2UEcGxheQ=="},function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48Zm9udCBpZD0iaWNvbmZvbnQtdnVlIiBob3Jpei1hZHYteD0iNTAwMCI+PGZvbnQtZmFjZSBmb250LWZhbWlseT0iaWNvbmZvbnQtdnVlIiBmb250LXdlaWdodD0iNDAwIiBmb250LXN0cmV0Y2g9Im5vcm1hbCIgdW5pdHMtcGVyLWVtPSI1MDAwIiBwYW5vc2UtMT0iMiAwIDUgMyAwIDAgMCAwIDAgMCIgYXNjZW50PSI1MDAwIiBkZXNjZW50PSIwIiB4LWhlaWdodD0iMCIgYmJveD0iLTEgMCA1MDExIDQ4NDQiIHVuZGVybGluZS10aGlja25lc3M9IjAiIHVuZGVybGluZS1wb3NpdGlvbj0iNTAiIHVuaWNvZGUtcmFuZ2U9IlUrZWEwMS1lYTBiIiAvPjxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIwIiAgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctbGVmdC1kb3VibGUiIHVuaWNvZGU9IiYjeGVhMDE7IiBkPSJNMzc1MCAzOTA2IGwtMTQwNiAtMTQwNiBsMTQwNiAtMTQwNiBsMCAzMTIgbC0xMDk0IDEwOTQgbDEwOTQgMTA5NCBsMCAzMTIgWk0yMzQ0IDM5MDYgbC0xNDA2IC0xNDA2IGwxNDA2IC0xNDA2IGwwIDMxMiBsLTEwOTQgMTA5NCBsMTA5NCAxMDk0IGwwIDMxMiBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1sZWZ0IiB1bmljb2RlPSImI3hlYTAyOyIgZD0iTTE1NjMgMjUwMCBsMTg3NSAtMTg3NSBsMCAtMzEyIGwtMjE4OCAyMTg3IGwyMTg4IDIxODggbDAgLTMxMyBsLTE4NzUgLTE4NzUgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctcmlnaHQtZG91YmxlIiB1bmljb2RlPSImI3hlYTAzOyIgZD0iTTEyNTAgMTA5NCBsMTQwNiAxNDA2IGwtMTQwNiAxNDA2IGwwIC0zMTIgbDEwOTQgLTEwOTQgbC0xMDk0IC0xMDk0IGwwIC0zMTIgWk0yNjU2IDEwOTQgbDE0MDcgMTQwNiBsLTE0MDcgMTQwNiBsMCAtMzEyIGwxMDk0IC0xMDk0IGwtMTA5NCAtMTA5NCBsMCAtMzEyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LXJpZ2h0IiB1bmljb2RlPSImI3hlYTA0OyIgZD0iTTM0MzggMjUwMCBsLTE4NzUgMTg3NSBsMCAzMTMgbDIxODcgLTIxODggbC0yMTg3IC0yMTg3IGwwIDMxMiBsMTg3NSAxODc1IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImNsb3NlIiB1bmljb2RlPSImI3hlYTA1OyIgZD0iTTQzNzUgMTE1NiBsLTUzMSAtNTMxIGwtMTM0NCAxMzQ0IGwtMTM0NCAtMTM0NCBsLTUzMSA1MzEgbDEzNDQgMTM0NCBsLTEzNDQgMTM0NCBsNTMxIDUzMSBsMTM0NCAtMTM0NCBsMTM0NCAxMzQ0IGw1MzEgLTUzMSBsLTEzNDQgLTEzNDQgbDEzNDQgLTEzNDQgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iY29uZmlybS1mYWRlIiB1bmljb2RlPSImI3hlYTA2OyYjeGVhMDc7IiBkPSJNMjY1NiA0ODQ0IHEtMTAxIDAgLTE4MCAtNTcgcS03NCAtNTIgLTEwOSAtMTM4IHEtMzUgLTg2IC0xOSAtMTc1IHExOCAtOTYgOTAgLTE2NyBsMTQ5NSAtMTQ5NCBsLTM2MTYgMCBxLTc3IDEgLTEzOSAtMjYgcS01OCAtMjQgLTk5IC03MCBxLTM5IC00NCAtNTkgLTEwMSBxLTIwIC01NiAtMjAgLTExNiBxMCAtNjAgMjAgLTExNiBxMjAgLTU3IDU5IC0xMDEgcTQxIC00NiA5OSAtNzAgcTYyIC0yNyAxMzkgLTI1IGwzNjE2IDAgbC0xNDk1IC0xNDk1IHEtNTUgLTUzIC04MSAtMTE2IHEtMjQgLTU5IC0yMSAtMTIxIHEzIC01OCAzMCAtMTEzIHEyNSAtNTQgNjggLTk3IHE0MyAtNDMgOTYgLTY4IHE1NSAtMjYgMTE0IC0yOSBxNjIgLTMgMTIwIDIxIHE2MyAyNSAxMTYgODEgbDIwMjkgMjAyOCBxNTkgNjAgODAgMTQxIHEyMSA4MCAxIDE1OSBxLTIxIDgyIC04MSAxNDIgbC0yMDI5IDIwMjggcS00NCA0NSAtMTAyIDcwIHEtNTggMjUgLTEyMiAyNSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtZW51IiB1bmljb2RlPSImI3hlYTA4OyIgZD0iTTYyNSA0Mzc1IGwwIC02MjUgbDM3NTAgMCBsMCA2MjUgbC0zNzUwIDAgWk02MjUgMjgxMyBsMCAtNjI1IGwzNzUwIDAgbDAgNjI1IGwtMzc1MCAwIFpNNjI1IDEyNTAgbDAgLTYyNSBsMzc1MCAwIGwwIDYyNSBsLTM3NTAgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtb3JlIiB1bmljb2RlPSImI3hlYTA5OyIgZD0iTTkzOCAzMTI1IHEtMTI4IDAgLTI0NCAtNDkgcS0xMTIgLTQ4IC0xOTguNSAtMTM0LjUgcS04Ni41IC04Ni41IC0xMzMuNSAtMTk4LjUgcS01MCAtMTE2IC00OS41IC0yNDMgcTAuNSAtMTI3IDQ5LjUgLTI0MyBxNDcgLTExMiAxMzMuNSAtMTk4LjUgcTg2LjUgLTg2LjUgMTk4LjUgLTEzNC41IHExMTYgLTQ5IDI0My41IC00OSBxMTI3LjUgMCAyNDMuNSA0OSBxMTEyIDQ4IDE5OC41IDEzNC41IHE4Ni41IDg2LjUgMTMzLjUgMTk4LjUgcTUwIDExNiA1MCAyNDMgcTAgMTI3IC01MCAyNDMgcS00NyAxMTIgLTEzMy41IDE5OC41IHEtODYuNSA4Ni41IC0xOTguNSAxMzQuNSBxLTExNiA0OSAtMjQzIDQ5IFpNMjUwMCAzMTI1IHEtMTI3IDAgLTI0MyAtNDkgcS0xMTIgLTQ4IC0xOTguNSAtMTM0LjUgcS04Ni41IC04Ni41IC0xMzQuNSAtMTk4LjUgcS00OSAtMTE2IC00OSAtMjQzIHEwIC0xMjcgNDkgLTI0MyBxNDggLTExMiAxMzQuNSAtMTk4LjUgcTg2LjUgLTg2LjUgMTk4LjUgLTEzNC41IHExMTYgLTQ5IDI0MyAtNDkgcTEyNyAwIDI0MyA0OSBxMTEyIDQ4IDE5OC41IDEzNC41IHE4Ni41IDg2LjUgMTM0LjUgMTk4LjUgcTQ5IDExNiA0OSAyNDMgcTAgMTI3IC00OSAyNDMgcS00OCAxMTIgLTEzNC41IDE5OC41IHEtODYuNSA4Ni41IC0xOTguNSAxMzQuNSBxLTExNiA0OSAtMjQzIDQ5IFpNNDA2MyAzMTI1IHEtMTI4IDAgLTI0NCAtNDkgcS0xMTIgLTQ4IC0xOTguNSAtMTM0LjUgcS04Ni41IC04Ni41IC0xMzMuNSAtMTk4LjUgcS00OSAtMTE2IC00OSAtMjQzIHEwIC0xMjcgNDkgLTI0MyBxNDcgLTExMiAxMzMuNSAtMTk4LjUgcTg2LjUgLTg2LjUgMTk4LjUgLTEzNC41IHExMTYgLTQ5IDI0My41IC00OSBxMTI3LjUgMCAyNDMuNSA0OSBxMTEyIDQ4IDE5OC41IDEzNC41IHE4Ni41IDg2LjUgMTMzLjUgMTk4LjUgcTUwIDExNiA1MCAyNDMgcTAgMTI3IC01MCAyNDMgcS00NyAxMTIgLTEzMy41IDE5OC41IHEtODYuNSA4Ni41IC0xOTguNSAxMzQuNSBxLTExNiA0OSAtMjQzIDQ5IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InBhdXNlIiB1bmljb2RlPSImI3hlYTBhOyIgZD0iTTkzOCA0MDYzIGwwIC0zMTI1IGwxMjUwIDAgbDAgMzEyNSBsLTEyNTAgMCBaTTI4MTMgNDA2MyBsMCAtMzEyNSBsMTI1MCAwIGwwIDMxMjUgbC0xMjUwIDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0icGxheSIgdW5pY29kZT0iJiN4ZWEwYjsiIGQ9Ik02MjUgNDM3NSBsMzc1MCAtMTg3NSBsLTM3NTAgLTE4NzUgbDAgMzc1MCBaIiAvPjwvZm9udD48L2RlZnM+PC9zdmc+"},function(t,e,n){var i=n(37);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("6d914181",i,!0,{})},function(t,e,n){var i=n(39);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("c5024e26",i,!0,{})},function(t,e,n){var i=n(41);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("7947401e",i,!0,{})},function(t,e,n){"use strict";var i=n(8);
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a={mixins:[i.a],props:{icon:{type:String,default:"",required:!0},title:{type:String,default:""}},computed:{isIconUrl:function(){try{return new URL(this.icon)}catch(t){return!1}}},methods:{onClick:function(t){this.$emit("click",t)}}}},function(t,e,n){"use strict";
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a=function(t){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,t||5)}},function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return r});var i=void 0;function o(){o.init||(o.init=!0,i=-1!==function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(t.indexOf("Trident/")>0){var n=t.indexOf("rv:");return parseInt(t.substring(n+3,t.indexOf(".",n)),10)}var i=t.indexOf("Edge/");return i>0?parseInt(t.substring(i+5,t.indexOf(".",i)),10):-1}())}var r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"resize-observer",attrs:{tabindex:"-1"}})},staticRenderFns:[],_scopeId:"data-v-b329ee4c",name:"resize-observer",methods:{compareAndNotify:function(){this._w===this.$el.offsetWidth&&this._h===this.$el.offsetHeight||(this._w=this.$el.offsetWidth,this._h=this.$el.offsetHeight,this.$emit("notify"))},addResizeHandlers:function(){this._resizeObject.contentDocument.defaultView.addEventListener("resize",this.compareAndNotify),this.compareAndNotify()},removeResizeHandlers:function(){this._resizeObject&&this._resizeObject.onload&&(!i&&this._resizeObject.contentDocument&&this._resizeObject.contentDocument.defaultView.removeEventListener("resize",this.compareAndNotify),delete this._resizeObject.onload)}},mounted:function(){var t=this;o(),this.$nextTick(function(){t._w=t.$el.offsetWidth,t._h=t.$el.offsetHeight});var e=document.createElement("object");this._resizeObject=e,e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex",-1),e.onload=this.addResizeHandlers,e.type="text/html",i&&this.$el.appendChild(e),e.data="about:blank",i||this.$el.appendChild(e)},beforeDestroy:function(){this.removeResizeHandlers()}};var a={version:"0.4.5",install:function(t){t.component("resize-observer",r),t.component("ResizeObserver",r)}},s=null;"undefined"!=typeof window?s=window.Vue:void 0!==t&&(s=t.Vue),s&&s.use(a)}).call(this,n(7))},function(t,e,n){var i=n(75);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("d6782d56",i,!0,{})},function(t,e,n){"use strict";n.r(e);var i={name:"PopoverMenuItem",props:{item:{type:Object,required:!0,default:function(){return{key:"nextcloud-link",href:"https://nextcloud.com",icon:"icon-links",text:"Nextcloud"}},validator:function(t){return!t.input||-1!==["text","checkbox"].indexOf(t.input)}}},computed:{key:function(){return this.item.key?this.item.key:Math.round(16*Math.random()*1e6).toString(16)},iconIsUrl:function(){try{return new URL(this.item.icon),!0}catch(t){return!1}}},methods:{action:function(t){this.item.action&&this.item.action(t)}}},o=(n(36),n(38),n(0)),r={name:"PopoverMenu",components:{PopoverMenuItem:Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[t.item.href?n("a",{staticClass:"focusable",attrs:{href:t.item.href?t.item.href:"#",target:t.item.target?t.item.target:"",download:t.item.download,rel:"noreferrer noopener"},on:{click:t.action}},[t.iconIsUrl?n("img",{attrs:{src:t.item.icon}}):n("span",{class:t.item.icon}),t._v(" "),t.item.text&&t.item.longtext?n("p",[n("strong",{staticClass:"menuitem-text"},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")]),n("br"),t._v(" "),n("span",{staticClass:"menuitem-text-detail"},[t._v("\n\t\t\t\t"+t._s(t.item.longtext)+"\n\t\t\t")])]):t.item.text?n("span",[t._v("\n\t\t\t"+t._s(t.item.text)+"\n\t\t")]):t.item.longtext?n("p",[t._v("\n\t\t\t"+t._s(t.item.longtext)+"\n\t\t")]):t._e()]):t.item.input?n("span",{staticClass:"menuitem",class:{active:t.item.active}},["checkbox"!==t.item.input?n("span",{class:t.item.icon}):t._e(),t._v(" "),"text"===t.item.input?n("form",{class:t.item.input,on:{submit:function(e){return e.preventDefault(),t.item.action(e)}}},[n("input",{attrs:{type:t.item.input,placeholder:t.item.text,required:""},domProps:{value:t.item.value}}),t._v(" "),n("input",{staticClass:"icon-confirm",attrs:{type:"submit",value:""}})]):["checkbox"===t.item.input?n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.model,expression:"item.model"}],class:t.item.input,attrs:{id:t.key,type:"checkbox"},domProps:{checked:Array.isArray(t.item.model)?t._i(t.item.model,null)>-1:t.item.model},on:{change:[function(e){var n=t.item.model,i=e.target,o=!!i.checked;if(Array.isArray(n)){var r=t._i(n,null);i.checked?r<0&&t.$set(t.item,"model",n.concat([null])):r>-1&&t.$set(t.item,"model",n.slice(0,r).concat(n.slice(r+1)))}else t.$set(t.item,"model",o)},t.item.action]}}):"radio"===t.item.input?n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.model,expression:"item.model"}],class:t.item.input,attrs:{id:t.key,type:"radio"},domProps:{checked:t._q(t.item.model,null)},on:{change:[function(e){return t.$set(t.item,"model",null)},t.item.action]}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.model,expression:"item.model"}],class:t.item.input,attrs:{id:t.key,type:t.item.input},domProps:{value:t.item.model},on:{change:t.item.action,input:function(e){e.target.composing||t.$set(t.item,"model",e.target.value)}}}),t._v(" "),n("label",{attrs:{for:t.key},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.item.action(e)}}},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")])]],2):t.item.action?n("button",{staticClass:"menuitem focusable",class:{active:t.item.active},attrs:{disabled:t.item.disabled},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.item.action(e)}}},[n("span",{class:t.item.icon}),t._v(" "),t.item.text&&t.item.longtext?n("p",[n("strong",{staticClass:"menuitem-text"},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")]),n("br"),t._v(" "),n("span",{staticClass:"menuitem-text-detail"},[t._v("\n\t\t\t\t"+t._s(t.item.longtext)+"\n\t\t\t")])]):t.item.text?n("span",[t._v("\n\t\t\t"+t._s(t.item.text)+"\n\t\t")]):t.item.longtext?n("p",[t._v("\n\t\t\t"+t._s(t.item.longtext)+"\n\t\t")]):t._e()]):n("span",{staticClass:"menuitem",class:{active:t.item.active}},[n("span",{class:t.item.icon}),t._v(" "),t.item.text&&t.item.longtext?n("p",[n("strong",{staticClass:"menuitem-text"},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")]),n("br"),t._v(" "),n("span",{staticClass:"menuitem-text-detail"},[t._v("\n\t\t\t\t"+t._s(t.item.longtext)+"\n\t\t\t")])]):t.item.text?n("span",[t._v("\n\t\t\t"+t._s(t.item.text)+"\n\t\t")]):t.item.longtext?n("p",[t._v("\n\t\t\t"+t._s(t.item.longtext)+"\n\t\t")]):t._e()])])},[],!1,null,"8dc4efb0",null).exports},props:{menu:{type:Array,default:function(){return[{href:"https://nextcloud.com",icon:"icon-links",text:"Nextcloud"}]},required:!0}}},a=(n(40),Object(o.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("ul",this._l(this.menu,function(t,n){return e("PopoverMenuItem",{key:n,attrs:{item:t}})}),1)},[],!1,null,"2f982451",null).exports);n.d(e,"PopoverMenu",function(){return a});
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=a},function(t,e,n){"use strict";
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a=function(t){t.mounted?Array.isArray(t.mounted)||(t.mounted=[t.mounted]):t.mounted=[],t.mounted.push(function(){this.$el.setAttribute("data-v-".concat("5da3148"),"")})}},function(t,e){},function(t,e,n){var i=n(80);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("547a4bc4",i,!0,{})},function(t,e,n){var i=n(82);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("0f6af71a",i,!0,{})},function(t,e,n){var i=n(105);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("679f8070",i,!0,{})},function(t,e,n){"use strict";n.r(e);var i=n(6),o=n.n(i),r=n(5),a=n(20),s=function(t){var e=t.getBoundingClientRect(),n=document.documentElement.clientHeight,i=document.documentElement.clientWidth,o=Object.assign({});return o.top=e.top<0,o.left=e.left<0,o.bottom=e.bottom>n,o.right=e.right>i,o.any=o.top||o.left||o.bottom||o.right,o.all=o.top&&o.left&&o.bottom&&o.right,o.offsetY=o.top?e.top:o.bottom?e.bottom-n:0,o.offsetX=o.left?e.left:o.right?e.right-i:0,o},c=n(4),l=n.n(c),u=function(t,e){t.$children.forEach(function(n,i){-1===e.indexOf(n.$options.name)&&(l.a.util.warn("".concat(n.$options._componentTag," is not allowed inside the ").concat(t.$options._componentTag," component"),t),t.$children.splice(i,1),n.$el.remove())})},d=["ActionButton","ActionCheckbox","ActionInput","ActionLink","ActionRouter","ActionText"],p={name:"Actions",directives:{ClickOutside:o.a,tooltip:r.default},props:{open:{type:Boolean,default:!1},menuAlign:{type:String,default:"center",validator:function(t){return["left","center","right"].indexOf(t)>-1}}},data:function(){return{actions:[],opened:this.open,focusIndex:0,randomId:"menu-"+Object(a.a)(),offsetX:0}},computed:{isValidSingleAction:function(){return 1===this.actions.length},firstAction:function(){return this.actions[0]},firstActionElement:function(){switch(this.firstAction.$options.name){case"ActionLink":return{is:"a",href:this.firstAction.href,target:this.firstAction.target};case"ActionRouter":return{is:"router-link",to:this.firstAction.to,exact:this.firstAction.exact};default:return{is:"button"}}},firstActionEvent:function(){return this.firstAction&&this.firstAction.$listeners&&this.firstAction.$listeners.click?"click":null}},watch:{open:function(t){var e=this;this.opened=t,this.opened&&this.$nextTick(function(){e.onOpen()})}},beforeMount:function(){this.initActions(),u(this,d)},mounted:function(){this.popupItem=this.$el},beforeUpdate:function(){u(this,d)},methods:{toggleMenu:function(){var t=this;this.opened=!this.opened,this.opened&&(this.$nextTick(function(){t.onOpen(),t.focusFirstAction()}),this.$emit("open")),this.$emit("update:open",this.opened)},closeMenu:function(){this.offsetX=0,this.opened=!1,this.$emit("update:open",this.opened),this.$emit("close")},onOpen:function(){this.offsetX=0;var t=s(this.$refs.menu);t.any&&(this.offsetX=t.offsetX>0?Math.round(t.offsetX)+5:Math.round(t.offsetX)-5)},unFocus:function(){this.$refs.menu.focus(),this.removeCurrentActive()},removeCurrentActive:function(){var t=this.$refs.menu.querySelector("li.active");t&&t.classList.remove("active")},focusAction:function(){var t=this.$refs.menu.querySelectorAll(".focusable:not(:disabled)")[this.focusIndex];if(t){var e=t.closest("li");t.focus(),e&&(this.removeCurrentActive(),e.classList.add("active"))}},focusPreviousAction:function(){this.focusIndex=Math.max(this.focusIndex-1,0),this.focusAction()},focusNextAction:function(){this.focusIndex=Math.min(this.focusIndex+1,this.$el.querySelectorAll(".focusable:not(:disabled)").length-1),this.focusAction()},focusFirstAction:function(){this.focusIndex=0,this.focusAction()},focusLastAction:function(){this.focusIndex=this.$el.querySelectorAll(".focusable:not(:disabled)").length-1,this.focusAction()},execFirstAction:function(t){this.firstAction.$listeners&&this.firstAction.$listeners.click&&(this.firstAction.$listeners.click(t),t.preventDefault())},initActions:function(){this.actions=this.$children||[]}}},f=(n(74),n(0)),h=n(25),A=n.n(h),v=Object(f.a)(p,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isValidSingleAction?n("element",t._b({directives:[{name:"tooltip",rawName:"v-tooltip.auto",value:t.firstAction.text,expression:"firstAction.text",modifiers:{auto:!0}}],staticClass:"action-item action-item--single",class:t.firstAction.icon,attrs:{rel:"noreferrer noopener"},on:t._d({},[t.firstActionEvent,t.execFirstAction])},"element",t.firstActionElement,!1),[n("span",{attrs:{"aria-hidden":!0,hidden:""}},[t._t("default")],2)]):n("div",{directives:[{name:"show",rawName:"v-show",value:t.actions.length>0,expression:"actions.length > 0"}],staticClass:"action-item",class:{"action-item--open":t.opened},on:{keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusPreviousAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusNextAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:e.shiftKey?(e.preventDefault(),t.focusPreviousAction(e)):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"page-up",void 0,e.key,void 0)?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusFirstAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"page-down",void 0,e.key,void 0)?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusLastAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.closeMenu(e))}]}},[n("a",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],staticClass:"icon action-item__menutoggle",attrs:{href:"#","aria-haspopup":"true","aria-controls":t.randomId,"aria-expanded":t.opened},on:{click:function(e){return e.preventDefault(),t.toggleMenu(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"space",32,e.key,[" ","Spacebar"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.toggleMenu(e))}}}),t._v(" "),n("div",{ref:"menu",staticClass:"action-item__menu",class:["menu-"+t.menuAlign,{open:t.opened}],style:{marginRight:t.offsetX+"px"},attrs:{tabindex:"-1"},on:{mousemove:t.unFocus}},[n("div",{staticClass:"action-item__menu_arrow",style:{transform:"translateX("+t.offsetX+"px)"}}),t._v(" "),n("ul",{attrs:{id:t.randomId,tabindex:"-1"}},[t._t("default")],2)])])},[],!1,null,"37fc7310",null);"function"==typeof A.a&&A()(v);var m=v.exports;n.d(e,"Actions",function(){return m});
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=m},function(t,e,n){var i=n(31);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("cb7584ea",i,!0,{})},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"@charset \"UTF-8\";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n* @copyright Copyright (c) 2016, John Molakvoæ <skjnldsv@protonmail.com>\n* @copyright Copyright (c) 2016, Robin Appelman <robin@icewind.nl>\n* @copyright Copyright (c) 2016, Jan-Christoph Borchardt <hey@jancborchardt.net>\n* @copyright Copyright (c) 2016, Erik Pellikka <erik@pellikka.org>\n* @copyright Copyright (c) 2015, Vincent Petry <pvince81@owncloud.com>\n*\n* Bootstrap v3.3.5 (http://getbootstrap.com)\n* Copyright 2011-2015 Twitter, Inc.\n* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n*/\n.vue-tooltip[data-v-5da3148] {\n  position: absolute;\n  z-index: 100000;\n  right: auto;\n  left: auto;\n  display: block;\n  margin: 0;\n  /* default to top */\n  margin-top: -3px;\n  padding: 10px 0;\n  text-align: left;\n  text-align: start;\n  white-space: normal;\n  text-decoration: none;\n  letter-spacing: normal;\n  word-spacing: normal;\n  text-transform: none;\n  word-wrap: normal;\n  word-break: normal;\n  opacity: 0;\n  text-shadow: none;\n  font-family: 'Nunito', 'Open Sans', Frutiger, Calibri, 'Myriad Pro', Myriad, sans-serif;\n  font-size: 12px;\n  font-weight: normal;\n  font-style: normal;\n  line-height: 1.6;\n  line-break: auto;\n  filter: drop-shadow(0 1px 10px var(--color-box-shadow)); }\n  .vue-tooltip[data-v-5da3148][x-placement^='top'] .tooltip-arrow {\n    bottom: 0;\n    left: calc(50% - 10px) !important;\n    margin-top: 0;\n    margin-bottom: 0;\n    border-width: 10px 10px 0 10px;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    border-left-color: transparent; }\n  .vue-tooltip[data-v-5da3148][x-placement^='bottom'] .tooltip-arrow {\n    top: 0;\n    left: calc(50% - 10px) !important;\n    margin-top: 0;\n    margin-bottom: 0;\n    border-width: 0 10px 10px 10px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    border-left-color: transparent; }\n  .vue-tooltip[data-v-5da3148][x-placement^='right'] .tooltip-arrow {\n    top: calc(50% - 10px) !important;\n    right: 100%;\n    margin-right: 0;\n    margin-left: 0;\n    border-width: 10px 10px 10px 0;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n    border-left-color: transparent; }\n  .vue-tooltip[data-v-5da3148][x-placement^='left'] .tooltip-arrow {\n    top: calc(50% - 10px) !important;\n    left: 100%;\n    margin-right: 0;\n    margin-left: 0;\n    border-width: 10px 0 10px 10px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    border-bottom-color: transparent; }\n  .vue-tooltip[data-v-5da3148][aria-hidden='true'] {\n    visibility: hidden;\n    transition: opacity .15s, visibility .15s;\n    opacity: 0; }\n  .vue-tooltip[data-v-5da3148][aria-hidden='false'] {\n    visibility: visible;\n    transition: opacity .15s;\n    opacity: 1; }\n  .vue-tooltip[data-v-5da3148] .tooltip-inner {\n    max-width: 350px;\n    padding: 5px 8px;\n    text-align: center;\n    color: var(--color-main-text);\n    border-radius: var(--border-radius);\n    background-color: var(--color-main-background); }\n  .vue-tooltip[data-v-5da3148] .tooltip-arrow {\n    position: absolute;\n    z-index: 1;\n    width: 0;\n    height: 0;\n    margin: 0;\n    border-style: solid;\n    border-color: var(--color-main-background); }\n",""])},function(t,e){},function(t,e,n){t.exports=n(83)},function(t,e){},function(t,e,n){var i;
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(o,r,a,s){"use strict";var c,l=["","webkit","Moz","MS","ms","o"],u=r.createElement("div"),d="function",p=Math.round,f=Math.abs,h=Date.now;function A(t,e,n){return setTimeout(x(t,n),e)}function v(t,e,n){return!!Array.isArray(t)&&(m(t,n[e],n),!0)}function m(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==s)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function g(t,e,n){var i="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",r=o.console&&(o.console.warn||o.console.log);return r&&r.call(o.console,i,n),t.apply(this,arguments)}}c="function"!=typeof Object.assign?function(t){if(t===s||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==s&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e}:Object.assign;var b=g(function(t,e,n){for(var i=Object.keys(e),o=0;o<i.length;)(!n||n&&t[i[o]]===s)&&(t[i[o]]=e[i[o]]),o++;return t},"extend","Use `assign`."),y=g(function(t,e){return b(t,e,!0)},"merge","Use `assign`.");function w(t,e,n){var i,o=e.prototype;(i=t.prototype=Object.create(o)).constructor=t,i._super=o,n&&c(i,n)}function x(t,e){return function(){return t.apply(e,arguments)}}function _(t,e){return typeof t==d?t.apply(e&&e[0]||s,e):t}function T(t,e){return t===s?e:t}function k(t,e,n){m(M(e),function(e){t.addEventListener(e,n,!1)})}function C(t,e,n){m(M(e),function(e){t.removeEventListener(e,n,!1)})}function E(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function S(t,e){return t.indexOf(e)>-1}function M(t){return t.trim().split(/\s+/g)}function N(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function I(t){return Array.prototype.slice.call(t,0)}function O(t,e,n){for(var i=[],o=[],r=0;r<t.length;){var a=e?t[r][e]:t[r];N(o,a)<0&&i.push(t[r]),o[r]=a,r++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function L(t,e){for(var n,i,o=e[0].toUpperCase()+e.slice(1),r=0;r<l.length;){if((i=(n=l[r])?n+o:e)in t)return i;r++}return s}var D=1;function B(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||o}var P="ontouchstart"in o,R=L(o,"PointerEvent")!==s,G=P&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),U=25,j=1,F=2,Y=4,H=8,$=1,z=2,Q=4,V=8,W=16,Z=z|Q,J=V|W,X=Z|J,q=["x","y"],K=["clientX","clientY"];function tt(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){_(t.options.enable,[t])&&n.handler(e)},this.init()}function et(t,e,n){var i=n.pointers.length,o=n.changedPointers.length,r=e&j&&i-o==0,a=e&(Y|H)&&i-o==0;n.isFirst=!!r,n.isFinal=!!a,r&&(t.session={}),n.eventType=e,function(t,e){var n=t.session,i=e.pointers,o=i.length;n.firstInput||(n.firstInput=nt(e));o>1&&!n.firstMultiple?n.firstMultiple=nt(e):1===o&&(n.firstMultiple=!1);var r=n.firstInput,a=n.firstMultiple,c=a?a.center:r.center,l=e.center=it(i);e.timeStamp=h(),e.deltaTime=e.timeStamp-r.timeStamp,e.angle=st(c,l),e.distance=at(c,l),function(t,e){var n=e.center,i=t.offsetDelta||{},o=t.prevDelta||{},r=t.prevInput||{};e.eventType!==j&&r.eventType!==Y||(o=t.prevDelta={x:r.deltaX||0,y:r.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y});e.deltaX=o.x+(n.x-i.x),e.deltaY=o.y+(n.y-i.y)}(n,e),e.offsetDirection=rt(e.deltaX,e.deltaY);var u=ot(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=u.x,e.overallVelocityY=u.y,e.overallVelocity=f(u.x)>f(u.y)?u.x:u.y,e.scale=a?(d=a.pointers,p=i,at(p[0],p[1],K)/at(d[0],d[1],K)):1,e.rotation=a?function(t,e){return st(e[1],e[0],K)+st(t[1],t[0],K)}(a.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,function(t,e){var n,i,o,r,a=t.lastInterval||e,c=e.timeStamp-a.timeStamp;if(e.eventType!=H&&(c>U||a.velocity===s)){var l=e.deltaX-a.deltaX,u=e.deltaY-a.deltaY,d=ot(c,l,u);i=d.x,o=d.y,n=f(d.x)>f(d.y)?d.x:d.y,r=rt(l,u),t.lastInterval=e}else n=a.velocity,i=a.velocityX,o=a.velocityY,r=a.direction;e.velocity=n,e.velocityX=i,e.velocityY=o,e.direction=r}(n,e);var d,p;var A=t.element;E(e.srcEvent.target,A)&&(A=e.srcEvent.target);e.target=A}(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function nt(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:p(t.pointers[n].clientX),clientY:p(t.pointers[n].clientY)},n++;return{timeStamp:h(),pointers:e,center:it(e),deltaX:t.deltaX,deltaY:t.deltaY}}function it(t){var e=t.length;if(1===e)return{x:p(t[0].clientX),y:p(t[0].clientY)};for(var n=0,i=0,o=0;o<e;)n+=t[o].clientX,i+=t[o].clientY,o++;return{x:p(n/e),y:p(i/e)}}function ot(t,e,n){return{x:e/t||0,y:n/t||0}}function rt(t,e){return t===e?$:f(t)>=f(e)?t<0?z:Q:e<0?V:W}function at(t,e,n){n||(n=q);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return Math.sqrt(i*i+o*o)}function st(t,e,n){n||(n=q);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return 180*Math.atan2(o,i)/Math.PI}tt.prototype={handler:function(){},init:function(){this.evEl&&k(this.element,this.evEl,this.domHandler),this.evTarget&&k(this.target,this.evTarget,this.domHandler),this.evWin&&k(B(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&C(this.element,this.evEl,this.domHandler),this.evTarget&&C(this.target,this.evTarget,this.domHandler),this.evWin&&C(B(this.element),this.evWin,this.domHandler)}};var ct={mousedown:j,mousemove:F,mouseup:Y},lt="mousedown",ut="mousemove mouseup";function dt(){this.evEl=lt,this.evWin=ut,this.pressed=!1,tt.apply(this,arguments)}w(dt,tt,{handler:function(t){var e=ct[t.type];e&j&&0===t.button&&(this.pressed=!0),e&F&&1!==t.which&&(e=Y),this.pressed&&(e&Y&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:"mouse",srcEvent:t}))}});var pt={pointerdown:j,pointermove:F,pointerup:Y,pointercancel:H,pointerout:H},ft={2:"touch",3:"pen",4:"mouse",5:"kinect"},ht="pointerdown",At="pointermove pointerup pointercancel";function vt(){this.evEl=ht,this.evWin=At,tt.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}o.MSPointerEvent&&!o.PointerEvent&&(ht="MSPointerDown",At="MSPointerMove MSPointerUp MSPointerCancel"),w(vt,tt,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),o=pt[i],r=ft[t.pointerType]||t.pointerType,a="touch"==r,s=N(e,t.pointerId,"pointerId");o&j&&(0===t.button||a)?s<0&&(e.push(t),s=e.length-1):o&(Y|H)&&(n=!0),s<0||(e[s]=t,this.callback(this.manager,o,{pointers:e,changedPointers:[t],pointerType:r,srcEvent:t}),n&&e.splice(s,1))}});var mt={touchstart:j,touchmove:F,touchend:Y,touchcancel:H},gt="touchstart",bt="touchstart touchmove touchend touchcancel";function yt(){this.evTarget=gt,this.evWin=bt,this.started=!1,tt.apply(this,arguments)}w(yt,tt,{handler:function(t){var e=mt[t.type];if(e===j&&(this.started=!0),this.started){var n=function(t,e){var n=I(t.touches),i=I(t.changedTouches);e&(Y|H)&&(n=O(n.concat(i),"identifier",!0));return[n,i]}.call(this,t,e);e&(Y|H)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}}});var wt={touchstart:j,touchmove:F,touchend:Y,touchcancel:H},xt="touchstart touchmove touchend touchcancel";function _t(){this.evTarget=xt,this.targetIds={},tt.apply(this,arguments)}w(_t,tt,{handler:function(t){var e=wt[t.type],n=function(t,e){var n=I(t.touches),i=this.targetIds;if(e&(j|F)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var o,r,a=I(t.changedTouches),s=[],c=this.target;if(r=n.filter(function(t){return E(t.target,c)}),e===j)for(o=0;o<r.length;)i[r[o].identifier]=!0,o++;o=0;for(;o<a.length;)i[a[o].identifier]&&s.push(a[o]),e&(Y|H)&&delete i[a[o].identifier],o++;if(!s.length)return;return[O(r.concat(s),"identifier",!0),s]}.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}});var Tt=2500,kt=25;function Ct(){tt.apply(this,arguments);var t=x(this.handler,this);this.touch=new _t(this.manager,t),this.mouse=new dt(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function Et(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches;setTimeout(function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)},Tt)}}w(Ct,tt,{handler:function(t,e,n){var i="touch"==n.pointerType,o="mouse"==n.pointerType;if(!(o&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)(function(t,e){t&j?(this.primaryTouch=e.changedPointers[0].identifier,Et.call(this,e)):t&(Y|H)&&Et.call(this,e)}).call(this,e,n);else if(o&&function(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var o=this.lastTouches[i],r=Math.abs(e-o.x),a=Math.abs(n-o.y);if(r<=kt&&a<=kt)return!0}return!1}.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var St=L(u.style,"touchAction"),Mt=St!==s,Nt="auto",It="manipulation",Ot="none",Lt="pan-x",Dt="pan-y",Bt=function(){if(!Mt)return!1;var t={},e=o.CSS&&o.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=!e||o.CSS.supports("touch-action",n)}),t}();function Pt(t,e){this.manager=t,this.set(e)}Pt.prototype={set:function(t){"compute"==t&&(t=this.compute()),Mt&&this.manager.element.style&&Bt[t]&&(this.manager.element.style[St]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return m(this.manager.recognizers,function(e){_(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),function(t){if(S(t,Ot))return Ot;var e=S(t,Lt),n=S(t,Dt);if(e&&n)return Ot;if(e||n)return e?Lt:Dt;if(S(t,It))return It;return Nt}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var i=this.actions,o=S(i,Ot)&&!Bt[Ot],r=S(i,Dt)&&!Bt[Dt],a=S(i,Lt)&&!Bt[Lt];if(o){var s=1===t.pointers.length,c=t.distance<2,l=t.deltaTime<250;if(s&&c&&l)return}if(!a||!r)return o||r&&n&Z||a&&n&J?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var Rt=1,Gt=2,Ut=4,jt=8,Ft=jt,Yt=16;function Ht(t){this.options=c({},this.defaults,t||{}),this.id=D++,this.manager=null,this.options.enable=T(this.options.enable,!0),this.state=Rt,this.simultaneous={},this.requireFail=[]}function $t(t){return t&Yt?"cancel":t&jt?"end":t&Ut?"move":t&Gt?"start":""}function zt(t){return t==W?"down":t==V?"up":t==z?"left":t==Q?"right":""}function Qt(t,e){var n=e.manager;return n?n.get(t):t}function Vt(){Ht.apply(this,arguments)}function Wt(){Vt.apply(this,arguments),this.pX=null,this.pY=null}function Zt(){Vt.apply(this,arguments)}function Jt(){Ht.apply(this,arguments),this._timer=null,this._input=null}function Xt(){Vt.apply(this,arguments)}function qt(){Vt.apply(this,arguments)}function Kt(){Ht.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function te(t,e){return(e=e||{}).recognizers=T(e.recognizers,te.defaults.preset),new ee(t,e)}Ht.prototype={defaults:{},set:function(t){return c(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(v(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=Qt(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return v(t,"dropRecognizeWith",this)?this:(t=Qt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(v(t,"requireFailure",this))return this;var e=this.requireFail;return-1===N(e,t=Qt(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(v(t,"dropRequireFailure",this))return this;t=Qt(t,this);var e=N(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){var e=this,n=this.state;function i(n){e.manager.emit(n,t)}n<jt&&i(e.options.event+$t(n)),i(e.options.event),t.additionalEvent&&i(t.additionalEvent),n>=jt&&i(e.options.event+$t(n))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=32},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|Rt)))return!1;t++}return!0},recognize:function(t){var e=c({},t);if(!_(this.options.enable,[this,e]))return this.reset(),void(this.state=32);this.state&(Ft|Yt|32)&&(this.state=Rt),this.state=this.process(e),this.state&(Gt|Ut|jt|Yt)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},w(Vt,Ht,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(Gt|Ut),o=this.attrTest(t);return i&&(n&H||!o)?e|Yt:i||o?n&Y?e|jt:e&Gt?e|Ut:Gt:32}}),w(Wt,Vt,{defaults:{event:"pan",threshold:10,pointers:1,direction:X},getTouchAction:function(){var t=this.options.direction,e=[];return t&Z&&e.push(Dt),t&J&&e.push(Lt),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,o=t.direction,r=t.deltaX,a=t.deltaY;return o&e.direction||(e.direction&Z?(o=0===r?$:r<0?z:Q,n=r!=this.pX,i=Math.abs(t.deltaX)):(o=0===a?$:a<0?V:W,n=a!=this.pY,i=Math.abs(t.deltaY))),t.direction=o,n&&i>e.threshold&&o&e.direction},attrTest:function(t){return Vt.prototype.attrTest.call(this,t)&&(this.state&Gt||!(this.state&Gt)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=zt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),w(Zt,Vt,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Ot]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&Gt)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),w(Jt,Ht,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[Nt]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,o=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(Y|H)&&!o)this.reset();else if(t.eventType&j)this.reset(),this._timer=A(function(){this.state=Ft,this.tryEmit()},e.time,this);else if(t.eventType&Y)return Ft;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===Ft&&(t&&t.eventType&Y?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=h(),this.manager.emit(this.options.event,this._input)))}}),w(Xt,Vt,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Ot]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&Gt)}}),w(qt,Vt,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Z|J,pointers:1},getTouchAction:function(){return Wt.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Z|J)?e=t.overallVelocity:n&Z?e=t.overallVelocityX:n&J&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&f(e)>this.options.velocity&&t.eventType&Y},emit:function(t){var e=zt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),w(Kt,Ht,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[It]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,o=t.deltaTime<e.time;if(this.reset(),t.eventType&j&&0===this.count)return this.failTimeout();if(i&&o&&n){if(t.eventType!=Y)return this.failTimeout();var r=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||at(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&r?this.count+=1:this.count=1,this._input=t,0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=A(function(){this.state=Ft,this.tryEmit()},e.interval,this),Gt):Ft}return 32},failTimeout:function(){return this._timer=A(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Ft&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),te.VERSION="2.0.7",te.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[Xt,{enable:!1}],[Zt,{enable:!1},["rotate"]],[qt,{direction:Z}],[Wt,{direction:Z},["swipe"]],[Kt],[Kt,{event:"doubletap",taps:2},["tap"]],[Jt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};function ee(t,e){var n;this.options=c({},te.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=new((n=this).options.inputClass||(R?vt:G?_t:P?Ct:dt))(n,et),this.touchAction=new Pt(this,this.options.touchAction),ne(this,!0),m(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ne(t,e){var n,i=t.element;i.style&&(m(t.options.cssProps,function(o,r){n=L(i.style,r),e?(t.oldCssProps[n]=i.style[n],i.style[n]=o):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={}))}ee.prototype={set:function(t){return c(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){var n;this.touchAction.preventDefaults(t);var i=this.recognizers,o=e.curRecognizer;(!o||o&&o.state&Ft)&&(o=e.curRecognizer=null);for(var r=0;r<i.length;)n=i[r],2===e.stopped||o&&n!=o&&!n.canRecognizeWith(o)?n.reset():n.recognize(t),!o&&n.state&(Gt|Ut|jt)&&(o=e.curRecognizer=n),r++}},get:function(t){if(t instanceof Ht)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(v(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(v(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=N(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==s&&e!==s){var n=this.handlers;return m(M(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==s){var n=this.handlers;return m(M(t),function(t){e?n[t]&&n[t].splice(N(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&function(t,e){var n=r.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&ne(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},c(te,{INPUT_START:j,INPUT_MOVE:F,INPUT_END:Y,INPUT_CANCEL:H,STATE_POSSIBLE:Rt,STATE_BEGAN:Gt,STATE_CHANGED:Ut,STATE_ENDED:jt,STATE_RECOGNIZED:Ft,STATE_CANCELLED:Yt,STATE_FAILED:32,DIRECTION_NONE:$,DIRECTION_LEFT:z,DIRECTION_RIGHT:Q,DIRECTION_UP:V,DIRECTION_DOWN:W,DIRECTION_HORIZONTAL:Z,DIRECTION_VERTICAL:J,DIRECTION_ALL:X,Manager:ee,Input:tt,TouchAction:Pt,TouchInput:_t,MouseInput:dt,PointerEventInput:vt,TouchMouseInput:Ct,SingleTouchInput:yt,Recognizer:Ht,AttrRecognizer:Vt,Tap:Kt,Pan:Wt,Swipe:qt,Pinch:Zt,Rotate:Xt,Press:Jt,on:k,off:C,each:m,merge:y,extend:b,assign:c,inherit:w,bindFn:x,prefixed:L}),(void 0!==o?o:"undefined"!=typeof self?self:{}).Hammer=te,(i=function(){return te}.call(e,n,e,t))===s||(t.exports=i)}(window,document)},function(t,e,n){"use strict";var i=n(16);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"\nbutton.menuitem[data-v-8dc4efb0] {\n\ttext-align: left;\n}\nbutton.menuitem *[data-v-8dc4efb0] {\n\tcursor: pointer;\n}\nbutton.menuitem[data-v-8dc4efb0]:disabled {\n\topacity: 0.5 !important;\n\tcursor: default;\n}\nbutton.menuitem:disabled *[data-v-8dc4efb0] {\n\tcursor: default;\n}\n.menuitem.active[data-v-8dc4efb0] {\n\tbox-shadow: inset 2px 0 var(--color-primary);\n\tborder-radius: 0;\n}\n",""])},function(t,e,n){"use strict";var i=n(17);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"@charset \"UTF-8\";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-8dc4efb0] {\n  display: flex;\n  flex: 0 0 auto;\n  /* css hack, only first not hidden */\n}\nli.hidden[data-v-8dc4efb0] {\n    display: none;\n}\nli > button[data-v-8dc4efb0],\n  li > a[data-v-8dc4efb0],\n  li > .menuitem[data-v-8dc4efb0] {\n    cursor: pointer;\n    line-height: 44px;\n    border: 0;\n    border-radius: 0;\n    background-color: transparent;\n    display: flex;\n    align-items: flex-start;\n    height: auto;\n    margin: 0;\n    padding: 0;\n    font-weight: normal;\n    box-shadow: none;\n    width: 100%;\n    color: var(--color-main-text);\n    white-space: nowrap;\n    opacity: 0.7;\n    /* prevent .action class to break the design */\n    /* Add padding if contains icon+text */\n    /* DEPRECATED! old img in popover fallback\n\t\t\t* TODO: to remove */\n    /* checkbox/radio fixes */\n    /* no margin if hidden span before */\n    /* Inputs inside popover supports text, submit & reset */\n}\nli > button span[class^='icon-'][data-v-8dc4efb0],\n    li > button span[class*=' icon-'][data-v-8dc4efb0], li > button[class^='icon-'][data-v-8dc4efb0], li > button[class*=' icon-'][data-v-8dc4efb0],\n    li > a span[class^='icon-'][data-v-8dc4efb0],\n    li > a span[class*=' icon-'][data-v-8dc4efb0],\n    li > a[class^='icon-'][data-v-8dc4efb0],\n    li > a[class*=' icon-'][data-v-8dc4efb0],\n    li > .menuitem span[class^='icon-'][data-v-8dc4efb0],\n    li > .menuitem span[class*=' icon-'][data-v-8dc4efb0],\n    li > .menuitem[class^='icon-'][data-v-8dc4efb0],\n    li > .menuitem[class*=' icon-'][data-v-8dc4efb0] {\n      min-width: 0;\n      /* Overwrite icons*/\n      min-height: 0;\n      background-position: 14px center;\n      background-size: 16px;\n}\nli > button span[class^='icon-'][data-v-8dc4efb0],\n    li > button span[class*=' icon-'][data-v-8dc4efb0],\n    li > a span[class^='icon-'][data-v-8dc4efb0],\n    li > a span[class*=' icon-'][data-v-8dc4efb0],\n    li > .menuitem span[class^='icon-'][data-v-8dc4efb0],\n    li > .menuitem span[class*=' icon-'][data-v-8dc4efb0] {\n      /* Keep padding to define the width to\n\t\t\t\tassure correct position of a possible text */\n      padding: 22px 0 22px 44px;\n}\nli > button:not([class^='icon-']):not([class*='icon-']) > span[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > button:not([class^='icon-']):not([class*='icon-']) > input[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > button:not([class^='icon-']):not([class*='icon-']) > form[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > a:not([class^='icon-']):not([class*='icon-']) > span[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > a:not([class^='icon-']):not([class*='icon-']) > input[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > a:not([class^='icon-']):not([class*='icon-']) > form[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > .menuitem:not([class^='icon-']):not([class*='icon-']) > span[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > .menuitem:not([class^='icon-']):not([class*='icon-']) > input[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,\n    li > .menuitem:not([class^='icon-']):not([class*='icon-']) > form[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child {\n      margin-left: 44px;\n}\nli > button[class^='icon-'][data-v-8dc4efb0], li > button[class*=' icon-'][data-v-8dc4efb0],\n    li > a[class^='icon-'][data-v-8dc4efb0],\n    li > a[class*=' icon-'][data-v-8dc4efb0],\n    li > .menuitem[class^='icon-'][data-v-8dc4efb0],\n    li > .menuitem[class*=' icon-'][data-v-8dc4efb0] {\n      padding: 0 14px 0 44px;\n}\nli > button[data-v-8dc4efb0]:not(:disabled):hover, li > button[data-v-8dc4efb0]:not(:disabled):focus, li > button:not(:disabled).active[data-v-8dc4efb0],\n    li > a[data-v-8dc4efb0]:not(:disabled):hover,\n    li > a[data-v-8dc4efb0]:not(:disabled):focus,\n    li > a:not(:disabled).active[data-v-8dc4efb0],\n    li > .menuitem[data-v-8dc4efb0]:not(:disabled):hover,\n    li > .menuitem[data-v-8dc4efb0]:not(:disabled):focus,\n    li > .menuitem:not(:disabled).active[data-v-8dc4efb0] {\n      opacity: 1 !important;\n}\nli > button.action[data-v-8dc4efb0],\n    li > a.action[data-v-8dc4efb0],\n    li > .menuitem.action[data-v-8dc4efb0] {\n      padding: inherit !important;\n}\nli > button > span[data-v-8dc4efb0],\n    li > a > span[data-v-8dc4efb0],\n    li > .menuitem > span[data-v-8dc4efb0] {\n      cursor: pointer;\n      white-space: nowrap;\n}\nli > button > p[data-v-8dc4efb0],\n    li > a > p[data-v-8dc4efb0],\n    li > .menuitem > p[data-v-8dc4efb0] {\n      width: 150px;\n      line-height: 1.6em;\n      padding: 8px 0;\n      white-space: normal;\n}\nli > button > select[data-v-8dc4efb0],\n    li > a > select[data-v-8dc4efb0],\n    li > .menuitem > select[data-v-8dc4efb0] {\n      margin: 0;\n      margin-left: 6px;\n}\nli > button[data-v-8dc4efb0]:not(:empty),\n    li > a[data-v-8dc4efb0]:not(:empty),\n    li > .menuitem[data-v-8dc4efb0]:not(:empty) {\n      padding-right: 14px !important;\n}\nli > button > img[data-v-8dc4efb0],\n    li > a > img[data-v-8dc4efb0],\n    li > .menuitem > img[data-v-8dc4efb0] {\n      width: 16px;\n      padding: 14px;\n}\nli > button > input.radio + label[data-v-8dc4efb0],\n    li > button > input.checkbox + label[data-v-8dc4efb0],\n    li > a > input.radio + label[data-v-8dc4efb0],\n    li > a > input.checkbox + label[data-v-8dc4efb0],\n    li > .menuitem > input.radio + label[data-v-8dc4efb0],\n    li > .menuitem > input.checkbox + label[data-v-8dc4efb0] {\n      padding: 0 !important;\n      width: 100%;\n}\nli > button > input.checkbox + label[data-v-8dc4efb0]::before,\n    li > a > input.checkbox + label[data-v-8dc4efb0]::before,\n    li > .menuitem > input.checkbox + label[data-v-8dc4efb0]::before {\n      margin: -2px 13px 0;\n}\nli > button > input.radio + label[data-v-8dc4efb0]::before,\n    li > a > input.radio + label[data-v-8dc4efb0]::before,\n    li > .menuitem > input.radio + label[data-v-8dc4efb0]::before {\n      margin: -2px 12px 0;\n}\nli > button > input[data-v-8dc4efb0]:not([type=radio]):not([type=checkbox]):not([type=image]),\n    li > a > input[data-v-8dc4efb0]:not([type=radio]):not([type=checkbox]):not([type=image]),\n    li > .menuitem > input[data-v-8dc4efb0]:not([type=radio]):not([type=checkbox]):not([type=image]) {\n      width: 150px;\n}\nli > button form[data-v-8dc4efb0],\n    li > a form[data-v-8dc4efb0],\n    li > .menuitem form[data-v-8dc4efb0] {\n      display: flex;\n      flex: 1 1 auto;\n      /* put a small space between text and form\n\t\t\t\tif there is an element before */\n}\nli > button form[data-v-8dc4efb0]:not(:first-child),\n      li > a form[data-v-8dc4efb0]:not(:first-child),\n      li > .menuitem form[data-v-8dc4efb0]:not(:first-child) {\n        margin-left: 5px;\n}\nli > button > span.hidden + form[data-v-8dc4efb0],\n    li > button > span[style*='display:none'] + form[data-v-8dc4efb0],\n    li > a > span.hidden + form[data-v-8dc4efb0],\n    li > a > span[style*='display:none'] + form[data-v-8dc4efb0],\n    li > .menuitem > span.hidden + form[data-v-8dc4efb0],\n    li > .menuitem > span[style*='display:none'] + form[data-v-8dc4efb0] {\n      margin-left: 0;\n}\nli > button input[data-v-8dc4efb0],\n    li > a input[data-v-8dc4efb0],\n    li > .menuitem input[data-v-8dc4efb0] {\n      min-width: 44px;\n      max-height: 40px;\n      /* twice the element margin-y */\n      margin: 2px 0;\n      flex: 1 1 auto;\n}\nli > button input[data-v-8dc4efb0]:not(:first-child),\n      li > a input[data-v-8dc4efb0]:not(:first-child),\n      li > .menuitem input[data-v-8dc4efb0]:not(:first-child) {\n        margin-left: 5px;\n}\nli:not(.hidden):not([style*='display:none']):first-of-type > button > form[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):first-of-type > button > input[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):first-of-type > a > form[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):first-of-type > a > input[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):first-of-type > .menuitem > form[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):first-of-type > .menuitem > input[data-v-8dc4efb0] {\n    margin-top: 12px;\n}\nli:not(.hidden):not([style*='display:none']):last-of-type > button > form[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):last-of-type > button > input[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):last-of-type > a > form[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):last-of-type > a > input[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):last-of-type > .menuitem > form[data-v-8dc4efb0], li:not(.hidden):not([style*='display:none']):last-of-type > .menuitem > input[data-v-8dc4efb0] {\n    margin-bottom: 12px;\n}\nli > button[data-v-8dc4efb0] {\n    padding: 0;\n}\nli > button span[data-v-8dc4efb0] {\n      opacity: 1;\n}\n",""])},function(t,e,n){"use strict";var i=n(18);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nul[data-v-2f982451] {\n  display: flex;\n  flex-direction: column;\n}\n',""])},function(t,e,n){var i=n(131);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("76e0948c",i,!0,{})},function(t,e,n){var i=n(133);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("0f74015a",i,!0,{})},function(t,e,n){var i=n(135);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("ffde66b6",i,!0,{})},function(t,e,n){var i=n(137);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("783ad393",i,!0,{})},function(t,e,n){var i=n(139);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("642ee2a5",i,!0,{})},function(t,e,n){var i=n(141);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("791a92ed",i,!0,{})},function(t,e,n){var i=n(143);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("140f9040",i,!0,{})},function(t,e,n){var i=n(145);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("ee2e3280",i,!0,{})},function(t,e,n){var i=n(147);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("3230dd40",i,!0,{})},function(t,e,n){var i=n(149);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("2eb234c2",i,!0,{})},function(t,e,n){var i=n(151);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("5432755d",i,!0,{})},function(t,e,n){var i=n(153);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("0cb9017e",i,!0,{})},function(t,e,n){var i=n(155);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("e4ae4cd2",i,!0,{})},function(t,e,n){var i=n(159);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("0ce977a2",i,!0,{})},function(t,e,n){var i=n(161);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("7025810e",i,!0,{})},function(t,e,n){var i=n(163);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("4605445f",i,!0,{})},function(t,e,n){var i=n(165);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("69cb96d3",i,!0,{})},function(t,e,n){"use strict";n.r(e);var i=n(33),o=n.n(i),r=n(71),a=n.n(r),s=n(5),c=n(23),l=n(6),u=n.n(l),d=n(72),p=n.n(d),f=n(73),h=n.n(f),A=function(t){var e=t.toLowerCase();function n(t,e,n){this.r=t,this.g=e,this.b=n}function i(t,e,i){var o=[];o.push(e);for(var r=function(t,e){var n=new Array(3);return n[0]=(e[1].r-e[0].r)/t,n[1]=(e[1].g-e[0].g)/t,n[2]=(e[1].b-e[0].b)/t,n}(t,[e,i]),a=1;a<t;a++){var s=parseInt(e.r+r[0]*a),c=parseInt(e.g+r[1]*a),l=parseInt(e.b+r[2]*a);o.push(new n(s,c,l))}return o}null===e.match(/^([0-9a-f]{4}-?){8}$/)&&(e=h()(e)),e=e.replace(/[^0-9a-f]/g,"");var o=new n(182,70,157),r=new n(221,203,85),a=new n(0,130,201),s=i(6,o,r),c=i(6,r,a),l=i(6,a,o);return s.concat(c).concat(l)[function(t,e){for(var n=0,i=[],o=0;o<t.length;o++)i.push(parseInt(t.charAt(o),16)%16);for(var r in i)n+=i[r];return parseInt(parseInt(n)%e)}(e,18)]},v={name:"Avatar",directives:{tooltip:s.default,ClickOutside:u.a},components:{PopoverMenu:c.PopoverMenu},props:{url:{type:String,default:void 0},user:{type:String,default:void 0},displayName:{type:String,default:void 0},size:{type:Number,default:32},allowPlaceholder:{type:Boolean,default:!0},disableTooltip:{type:Boolean,default:!1},tooltipMessage:{type:String,default:null},isNoUser:{type:Boolean,default:!1},status:{type:String,default:null,validator:function(t){switch(t){case"positive":case"negative":case"neutral":return!0}return!1}},statusColor:{type:[Number,String],default:null,validator:function(t){return/^([a-f0-9]{3}){1,2}$/i.test(t)}}},data:function(){return{avatarUrlLoaded:null,avatarSrcSetLoaded:null,userDoesNotExist:!1,isAvatarLoaded:!1,isMenuLoaded:!1,contactsMenuActions:[],contactsMenuOpenState:!1}},computed:{getUserIdentifier:function(){return this.isDisplayNameDefined?this.displayName:this.isUserDefined?this.user:""},isUserDefined:function(){return void 0!==this.user},isDisplayNameDefined:function(){return void 0!==this.displayName},isUrlDefined:function(){return void 0!==this.url},hasMenu:function(){return this.isMenuLoaded?this.menu.length>0:!(this.user===OC.getCurrentUser().uid||this.userDoesNotExist||this.url)},shouldShowPlaceholder:function(){return this.allowPlaceholder&&this.userDoesNotExist},avatarStyle:function(){var t={width:this.size+"px",height:this.size+"px",lineHeight:this.size+"px",fontSize:Math.round(.55*this.size)+"px"},e=A(this.getUserIdentifier);return t.backgroundColor="rgb("+e.r+", "+e.g+", "+e.b+")",t},tooltip:function(){return!this.disableTooltip&&(this.tooltipMessage?this.tooltipMessage:this.displayName)},initials:function(){return this.shouldShowPlaceholder?this.getUserIdentifier.charAt(0).toUpperCase():"?"},menu:function(){return this.contactsMenuActions.map(function(t){return{href:t.hyperlink,icon:t.icon,text:t.title}})}},watch:{url:function(){this.userDoesNotExist=!1,this.loadAvatarUrl()},user:function(){this.userDoesNotExist=!1,this.isMenuLoaded=!1,this.loadAvatarUrl()}},mounted:function(){this.loadAvatarUrl()},methods:{toggleMenu:function(){this.hasMenu&&(this.contactsMenuOpenState=!this.contactsMenuOpenState,this.contactsMenuOpenState&&this.fetchContactsMenu())},closeMenu:function(){this.contactsMenuOpenState=!1},fetchContactsMenu:function(){var t=a()(o.a.mark(function t(){var e,n,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=encodeURIComponent(this.user),t.next=4,p.a.post(OC.generateUrl("contactsmenu/findOne"),"shareType=0&shareWith=".concat(e));case 4:n=t.sent,i=n.data,this.contactsMenuActions=[i.topAction].concat(i.actions),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),this.contactsMenuOpenState=!1;case 12:this.isMenuLoaded=!0;case 13:case"end":return t.stop()}},t,this,[[0,9]])}));return function(){return t.apply(this,arguments)}}(),loadAvatarUrl:function(){var t=this;if(this.isAvatarLoaded=!1,!this.isUrlDefined&&(!this.isUserDefined||this.isNoUser))return this.isAvatarLoaded=!0,void(this.userDoesNotExist=!0);var e=function(t,e){var n=OC.generateUrl("/avatar/{user}/{size}",{user:t,size:e});return t===OC.getCurrentUser().uid&&"undefined"!=typeof oc_userconfig&&(n+="?v="+oc_userconfig.avatar.version),n},n=e(this.user,this.size);this.isUrlDefined&&(n=this.url);var i=[n+" 1x",e(this.user,2*this.size)+" 2x",e(this.user,4*this.size)+" 4x"].join(", "),o=new Image;o.onload=function(){t.avatarUrlLoaded=n,t.isUrlDefined||(t.avatarSrcSetLoaded=i),t.isAvatarLoaded=!0},o.onerror=function(){t.userDoesNotExist=!0,t.isAvatarLoaded=!0},this.isUrlDefined||(o.srcset=i),o.src=n}}},m=(n(104),n(0)),g=n(34),b=n.n(g),y=Object(m.a)(v,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.tooltip,expression:"tooltip"},{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],staticClass:"avatardiv popovermenu-wrapper",class:{"icon-loading":!t.isAvatarLoaded,"avatardiv--unknown":t.userDoesNotExist,"avatardiv--with-menu":t.hasMenu},style:t.avatarStyle,on:{click:t.toggleMenu}},[t.isAvatarLoaded&&!t.userDoesNotExist?n("img",{attrs:{src:t.avatarUrlLoaded,srcset:t.avatarSrcSetLoaded}}):t._e(),t._v(" "),t.hasMenu?n("div",{staticClass:"icon-more"}):t._e(),t._v(" "),t.status?n("div",{staticClass:"avatardiv__status",class:"avatardiv__status--"+t.status,style:{backgroundColor:"#"+t.statusColor}},["neutral"===t.status?n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"11",viewBox:"0 0 3.175 2.91"}},[n("path",{style:{fill:"#"+t.statusColor},attrs:{d:"M3.21 3.043H.494l.679-1.177.68-1.176.678 1.176z",stroke:"#fff","stroke-width":".265","stroke-linecap":"square"}})]):t._e()]):t._e(),t._v(" "),t.userDoesNotExist?n("div",{staticClass:"unknown"},[t._v("\n\t\t"+t._s(t.initials)+"\n\t")]):t._e(),t._v(" "),t.hasMenu?n("div",{directives:[{name:"show",rawName:"v-show",value:t.contactsMenuOpenState,expression:"contactsMenuOpenState"}],staticClass:"popovermenu menu-center"},[n("PopoverMenu",{attrs:{"is-open":t.contactsMenuOpenState,menu:t.menu}})],1):t._e()])},[],!1,null,"72b53a12",null);"function"==typeof b.a&&b()(y);var w=y.exports;n.d(e,"Avatar",function(){return w});
/**
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=w},function(t,e,n){"use strict";n.r(e);var i={name:"ActionButton",mixins:[n(19).a],props:{disabled:{type:Boolean,default:!1}}},o=(n(79),n(0)),r=n(32),a=n.n(r),s=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("button",{staticClass:"action-button focusable",attrs:{disabled:t.disabled},on:{click:t.onClick}},[n("span",{staticClass:"action-button__icon",class:[t.isIconUrl?"action-button__icon--url":t.icon],style:{backgroundImage:t.isIconUrl?"url("+t.icon+")":null}}),t._v(" "),t.title?n("p",[n("strong",{staticClass:"action-button__title"},[t._v("\n\t\t\t\t"+t._s(t.title)+"\n\t\t\t")]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"action-button__longtext",domProps:{textContent:t._s(t.text)}})]):t.isLongText?n("p",{staticClass:"action-button__longtext",domProps:{textContent:t._s(t.text)}}):n("span",{staticClass:"action-button__text"},[t._v(t._s(t.text))]),t._v(" "),t._e()],2)])},[],!1,null,"73841ba8",null);"function"==typeof a.a&&a()(s);var c=s.exports;n.d(e,"ActionButton",function(){return c});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=c},function(t,e,n){window,t.exports=function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){var i;!function(o){"use strict";var r={},a=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,s=/\d\d?/,c=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,l=/\[([^]*?)\]/gm,u=function(){};function d(t,e){for(var n=[],i=0,o=t.length;i<o;i++)n.push(t[i].substr(0,e));return n}function p(t){return function(e,n,i){var o=i[t].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~o&&(e.month=o)}}function f(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var h=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],A=["January","February","March","April","May","June","July","August","September","October","November","December"],v=d(A,3),m=d(h,3);r.i18n={dayNamesShort:m,dayNames:h,monthNamesShort:v,monthNames:A,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10)*t%10]}};var g={D:function(t){return t.getDate()},DD:function(t){return f(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDay()},dd:function(t){return f(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return f(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return String(t.getFullYear()).substr(2)},YYYY:function(t){return f(t.getFullYear(),4)},h:function(t){return t.getHours()%12||12},hh:function(t){return f(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return f(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return f(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return f(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return f(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return f(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+f(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},b={D:[s,function(t,e){t.day=e}],Do:[new RegExp(s.source+c.source),function(t,e){t.day=parseInt(e,10)}],M:[s,function(t,e){t.month=e-1}],YY:[s,function(t,e){var n=+(""+(new Date).getFullYear()).substr(0,2);t.year=""+(e>68?n-1:n)+e}],h:[s,function(t,e){t.hour=e}],m:[s,function(t,e){t.minute=e}],s:[s,function(t,e){t.second=e}],YYYY:[/\d{4}/,function(t,e){t.year=e}],S:[/\d/,function(t,e){t.millisecond=100*e}],SS:[/\d{2}/,function(t,e){t.millisecond=10*e}],SSS:[/\d{3}/,function(t,e){t.millisecond=e}],d:[s,u],ddd:[c,u],MMM:[c,p("monthNamesShort")],MMMM:[c,p("monthNames")],a:[c,function(t,e,n){var i=e.toLowerCase();i===n.amPm[0]?t.isPm=!1:i===n.amPm[1]&&(t.isPm=!0)}],ZZ:[/([\+\-]\d\d:?\d\d|Z)/,function(t,e){"Z"===e&&(e="+00:00");var n,i=(e+"").match(/([\+\-]|\d\d)/gi);i&&(n=60*i[1]+parseInt(i[2],10),t.timezoneOffset="+"===i[0]?n:-n)}]};b.dd=b.d,b.dddd=b.ddd,b.DD=b.D,b.mm=b.m,b.hh=b.H=b.HH=b.h,b.MM=b.M,b.ss=b.s,b.A=b.a,r.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},r.format=function(t,e,n){var i=n||r.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");var o=[];return(e=(e=(e=r.masks[e]||e||r.masks.default).replace(l,function(t,e){return o.push(e),"??"})).replace(a,function(e){return e in g?g[e](t,i):e.slice(1,e.length-1)})).replace(/\?\?/g,function(){return o.shift()})},r.parse=function(t,e,n){var i=n||r.i18n;if("string"!=typeof e)throw new Error("Invalid format in fecha.parse");if(e=r.masks[e]||e,t.length>1e3)return!1;var o=!0,s={};if(e.replace(a,function(e){if(b[e]){var n=b[e],r=t.search(n[0]);~r?t.replace(n[0],function(e){return n[1](s,e,i),t=t.substr(r+e.length),e}):o=!1}return b[e]?"":e.slice(1,e.length-1)}),!o)return!1;var c,l=new Date;return!0===s.isPm&&null!=s.hour&&12!=+s.hour?s.hour=+s.hour+12:!1===s.isPm&&12==+s.hour&&(s.hour=0),null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,c=new Date(Date.UTC(s.year||l.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):c=new Date(s.year||l.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),c},void 0!==t&&t.exports?t.exports=r:void 0===(i=function(){return r}.call(e,n,e,t))||(t.exports=i)}()},function(t,e){var n=/^(attrs|props|on|nativeOn|class|style|hook)$/;function i(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}}t.exports=function(t){return t.reduce(function(t,e){var o,r,a,s,c;for(a in e)if(o=t[a],r=e[a],o&&n.test(a))if("class"===a&&("string"==typeof o&&(c=o,t[a]=o={},o[c]=!0),"string"==typeof r&&(c=r,e[a]=r={},r[c]=!0)),"on"===a||"nativeOn"===a||"hook"===a)for(s in r)o[s]=i(o[s],r[s]);else if(Array.isArray(o))t[a]=o.concat(r);else if(Array.isArray(r))t[a]=[o].concat(r);else for(s in r)o[s]=r[s];else t[a]=e[a];return t},{})}},function(t,e,n){"use strict";function i(t,e){for(var n=[],i={},o=0;o<e.length;o++){var r=e[o],a=r[0],s={id:t+":"+o,css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}n.r(e),n.d(e,"default",function(){return h});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,l=!1,u=function(){},d=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(t,e,n,o){l=n,d=o||{};var a=i(t,e);return A(a),function(e){for(var n=[],o=0;o<a.length;o++){var s=a[o];(c=r[s.id]).refs--,n.push(c)}for(e?A(a=i(t,e)):a=[],o=0;o<n.length;o++){var c;if(0===(c=n[o]).refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete r[c.id]}}}}function A(t){for(var e=0;e<t.length;e++){var n=t[e],i=r[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(m(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(m(n.parts[o]));r[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,n,i=document.querySelector("style["+p+'~="'+t.id+'"]');if(i){if(l)return u;i.parentNode.removeChild(i)}if(f){var o=c++;i=s||(s=v()),e=y.bind(null,i,o,!1),n=y.bind(null,i,o,!0)}else i=v(),e=function(t,e){var n=e.css,i=e.media,o=e.sourceMap;if(i&&t.setAttribute("media",i),d.ssrId&&t.setAttribute(p,e.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}var g,b=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function y(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}},function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i),r=void 0,a=function(t){return r=t.target},s={bind:function(t,e,n){t["@clickoutside"]=function(i){var o=i.target,a=n&&n.context&&n.context.popupElm;!r||!o||t.contains(o)||t.contains(r)||a&&(a.contains(r)||a.contains(o))||!e.expression||!n.context[e.expression]||e.value()},document.addEventListener("mousedown",a),document.addEventListener("mouseup",t["@clickoutside"])},unbind:function(t){document.removeEventListener("mousedown",a),document.removeEventListener("mouseup",t["@clickoutside"])}};function c(t){return"[object Object]"===Object.prototype.toString.call(t)}function l(t){return t instanceof Date}function u(t){return null!=t&&!isNaN(new Date(t).getTime())}function d(t){var e=(t||"").split(":");return e.length>=2?{hours:parseInt(e[0],10),minutes:parseInt(e[1],10)}:null}function p(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"24",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"a",i=t.hours,o=(i=(i="24"===e?i:i%12||12)<10?"0"+i:i)+":"+(t.minutes<10?"0"+t.minutes:t.minutes);if("12"===e){var r=t.hours>=12?"pm":"am";"A"===n&&(r=r.toUpperCase()),o=o+" "+r}return o}function f(t,e){if(!t)return"";try{return o.a.format(new Date(t),e)}catch(t){return""}}var h={date:{value2date:function(t){return u(t)?new Date(t):null},date2value:function(t){return t}},timestamp:{value2date:function(t){return u(t)?new Date(t):null},date2value:function(t){return t&&new Date(t).getTime()}}},A={zh:{days:["日","一","二","三","四","五","六"],months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],pickers:["未来7天","未来30天","最近7天","最近30天"],placeholder:{date:"请选择日期",dateRange:"请选择日期范围"}},en:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],pickers:["next 7 days","next 30 days","previous 7 days","previous 30 days"],placeholder:{date:"Select Date",dateRange:"Select Date Range"}},ro:{days:["Lun","Mar","Mie","Joi","Vin","Sâm","Dum"],months:["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec"],pickers:["urmatoarele 7 zile","urmatoarele 30 zile","ultimele 7 zile","ultimele 30 zile"],placeholder:{date:"Selectați Data",dateRange:"Selectați Intervalul De Date"}},fr:{days:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],months:["Jan","Fev","Mar","Avr","Mai","Juin","Juil","Aout","Sep","Oct","Nov","Dec"],pickers:["7 jours suivants","30 jours suivants","7 jours précédents","30 jours précédents"],placeholder:{date:"Sélectionnez une date",dateRange:"Sélectionnez une période"}},es:{days:["Dom","Lun","mar","Mie","Jue","Vie","Sab"],months:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],pickers:["próximos 7 días","próximos 30 días","7 días anteriores","30 días anteriores"],placeholder:{date:"Seleccionar fecha",dateRange:"Seleccionar un rango de fechas"}},"pt-br":{days:["Dom","Seg","Ter","Qua","Quin","Sex","Sáb"],months:["Jan","Fev","Mar","Abr","Maio","Jun","Jul","Ago","Set","Out","Nov","Dez"],pickers:["próximos 7 dias","próximos 30 dias","7 dias anteriores"," 30 dias anteriores"],placeholder:{date:"Selecione uma data",dateRange:"Selecione um período"}},ru:{days:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],pickers:["след. 7 дней","след. 30 дней","прош. 7 дней","прош. 30 дней"],placeholder:{date:"Выберите дату",dateRange:"Выберите период"}},de:{days:["So","Mo","Di","Mi","Do","Fr","Sa"],months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],pickers:["nächsten 7 Tage","nächsten 30 Tage","vorigen 7 Tage","vorigen 30 Tage"],placeholder:{date:"Datum auswählen",dateRange:"Zeitraum auswählen"}},it:{days:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],months:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],pickers:["successivi 7 giorni","successivi 30 giorni","precedenti 7 giorni","precedenti 30 giorni"],placeholder:{date:"Seleziona una data",dateRange:"Seleziona un intervallo date"}},cs:{days:["Ned","Pon","Úte","Stř","Čtv","Pát","Sob"],months:["Led","Úno","Bře","Dub","Kvě","Čer","Čerc","Srp","Zář","Říj","Lis","Pro"],pickers:["příštích 7 dní","příštích 30 dní","předchozích 7 dní","předchozích 30 dní"],placeholder:{date:"Vyberte datum",dateRange:"Vyberte časové rozmezí"}},sl:{days:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"],months:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"],pickers:["naslednjih 7 dni","naslednjih 30 dni","prejšnjih 7 dni","prejšnjih 30 dni"],placeholder:{date:"Izberite datum",dateRange:"Izberite razpon med 2 datumoma"}}},v=A.zh,m={methods:{t:function(t){for(var e=this,n=e.$options.name;e&&(!n||"DatePicker"!==n);)(e=e.$parent)&&(n=e.$options.name);for(var i=e&&e.language||v,o=t.split("."),r=i,a=void 0,s=0,c=o.length;s<c;s++){if(a=r[o[s]],s===c-1)return a;if(!a)return"";r=a}return""}}};function g(t,e){if(e){for(var n=[],i=e.offsetParent;i&&t!==i&&t.contains(i);)n.push(i),i=i.offsetParent;var o=e.offsetTop+n.reduce(function(t,e){return t+e.offsetTop},0),r=o+e.offsetHeight,a=t.scrollTop,s=a+t.clientHeight;o<a?t.scrollTop=o:r>s&&(t.scrollTop=r-t.clientHeight)}else t.scrollTop=0}var b=n(1),y=n.n(b),w={name:"panelDate",mixins:[m],props:{value:null,startAt:null,endAt:null,dateFormat:{type:String,default:"YYYY-MM-DD"},calendarMonth:{default:(new Date).getMonth()},calendarYear:{default:(new Date).getFullYear()},firstDayOfWeek:{default:7,type:Number,validator:function(t){return t>=1&&t<=7}},disabledDate:{type:Function,default:function(){return!1}}},methods:{selectDate:function(t){var e=t.year,n=t.month,i=t.day,o=new Date(e,n,i);this.disabledDate(o)||this.$emit("select",o)},getDays:function(t){var e=this.t("days"),n=parseInt(t,10);return e.concat(e).slice(n,n+7)},getDates:function(t,e,n){var i=[],o=new Date(t,e);o.setDate(0);for(var r=(o.getDay()+7-n)%7+1,a=o.getDate()-(r-1),s=0;s<r;s++)i.push({year:t,month:e-1,day:a+s});o.setMonth(o.getMonth()+2,0);for(var c=o.getDate(),l=0;l<c;l++)i.push({year:t,month:e,day:1+l});o.setMonth(o.getMonth()+1,1);for(var u=42-(r+c),d=0;d<u;d++)i.push({year:t,month:e+1,day:1+d});return i},getCellClasses:function(t){var e=t.year,n=t.month,i=t.day,o=[],r=new Date(e,n,i).getTime(),a=(new Date).setHours(0,0,0,0),s=this.value&&new Date(this.value).setHours(0,0,0,0),c=this.startAt&&new Date(this.startAt).setHours(0,0,0,0),l=this.endAt&&new Date(this.endAt).setHours(0,0,0,0);return n<this.calendarMonth?o.push("last-month"):n>this.calendarMonth?o.push("next-month"):o.push("cur-month"),r===a&&o.push("today"),this.disabledDate(r)&&o.push("disabled"),s&&(r===s?o.push("actived"):c&&r<=s?o.push("inrange"):l&&r>=s&&o.push("inrange")),o},getCellTitle:function(t){var e=t.year,n=t.month,i=t.day;return f(new Date(e,n,i),this.dateFormat)}},render:function(t){var e=this,n=this.getDays(this.firstDayOfWeek).map(function(e){return t("th",[e])}),i=this.getDates(this.calendarYear,this.calendarMonth,this.firstDayOfWeek),o=Array.apply(null,{length:6}).map(function(n,o){var r=i.slice(7*o,7*o+7).map(function(n){var i={class:e.getCellClasses(n)};return t("td",y()([{class:"cell"},i,{attrs:{"data-year":n.year,"data-month":n.month,title:e.getCellTitle(n)},on:{click:e.selectDate.bind(e,n)}}]),[n.day])});return t("tr",[r])});return t("table",{class:"mx-panel mx-panel-date"},[t("thead",[t("tr",[n])]),t("tbody",[o])])}},x={name:"panelYear",props:{value:null,firstYear:Number,disabledYear:Function},methods:{isDisabled:function(t){return!("function"!=typeof this.disabledYear||!this.disabledYear(t))},selectYear:function(t){this.isDisabled(t)||this.$emit("select",t)}},render:function(t){var e=this,n=10*Math.floor(this.firstYear/10),i=this.value&&new Date(this.value).getFullYear(),o=Array.apply(null,{length:10}).map(function(o,r){var a=n+r;return t("span",{class:{cell:!0,actived:i===a,disabled:e.isDisabled(a)},on:{click:e.selectYear.bind(e,a)}},[a])});return t("div",{class:"mx-panel mx-panel-year"},[o])}},_={name:"panelMonth",mixins:[m],props:{value:null,calendarYear:{default:(new Date).getFullYear()},disabledMonth:Function},methods:{isDisabled:function(t){return!("function"!=typeof this.disabledMonth||!this.disabledMonth(t))},selectMonth:function(t){this.isDisabled(t)||this.$emit("select",t)}},render:function(t){var e=this,n=this.t("months"),i=this.value&&new Date(this.value).getFullYear(),o=this.value&&new Date(this.value).getMonth();return n=n.map(function(n,r){return t("span",{class:{cell:!0,actived:i===e.calendarYear&&o===r,disabled:e.isDisabled(r)},on:{click:e.selectMonth.bind(e,r)}},[n])}),t("div",{class:"mx-panel mx-panel-month"},[n])}},T=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function C(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function E(t,e,n,i,o,r,a,s){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:l}}var S=E({name:"CalendarPanel",components:{PanelDate:w,PanelYear:x,PanelMonth:_,PanelTime:{name:"panelTime",props:{timePickerOptions:{type:[Object,Function],default:function(){return null}},timeSelectOptions:{type:Object,default:function(){return null}},minuteStep:{type:Number,default:0,validator:function(t){return t>=0&&t<=60}},value:null,timeType:{type:Array,default:function(){return["24","a"]}},disabledTime:Function},computed:{currentHours:function(){return this.value?new Date(this.value).getHours():0},currentMinutes:function(){return this.value?new Date(this.value).getMinutes():0},currentSeconds:function(){return this.value?new Date(this.value).getSeconds():0}},methods:{stringifyText:function(t){return("00"+t).slice(String(t).length)},selectTime:function(t){"function"==typeof this.disabledTime&&this.disabledTime(t)||this.$emit("select",new Date(t))},pickTime:function(t){"function"==typeof this.disabledTime&&this.disabledTime(t)||this.$emit("pick",new Date(t))},getTimePickerOptions:function(){var t=[],e=this.timePickerOptions;if(!e)return[];if("function"==typeof e)return e()||[];var n=d(e.start),i=d(e.end),o=d(e.step);if(n&&i&&o)for(var r=n.minutes+60*n.hours,a=i.minutes+60*i.hours,s=o.minutes+60*o.hours,c=Math.floor((a-r)/s),l=0;l<=c;l++){var u=r+l*s,f={hours:Math.floor(u/60),minutes:u%60};t.push({value:f,label:p.apply(void 0,[f].concat(C(this.timeType)))})}return t}},render:function(t){var e=this,n=this.value?new Date(this.value):(new Date).setHours(0,0,0,0),i="function"==typeof this.disabledTime&&this.disabledTime,o=this.getTimePickerOptions();if(Array.isArray(o)&&o.length)return o=o.map(function(o){var r=o.value.hours,a=o.value.minutes,s=new Date(n).setHours(r,a,0);return t("li",{class:{"mx-time-picker-item":!0,cell:!0,actived:r===e.currentHours&&a===e.currentMinutes,disabled:i&&i(s)},on:{click:e.pickTime.bind(e,s)}},[o.label])}),t("div",{class:"mx-panel mx-panel-time"},[t("ul",{class:"mx-time-list"},[o])]);var r=this.minuteStep||1,a=parseInt(60/r),s={hours:Array.apply(null,{length:24}).map(function(t,e){return e}),minutes:Array.apply(null,{length:a}).map(function(t,e){return e*r}),seconds:0===this.minuteStep?Array.apply(null,{length:60}).map(function(t,e){return e}):[]};this.timeSelectOptions&&"object"===k(this.timeSelectOptions)&&(s=T({},s,this.timeSelectOptions));var c=[s.hours.map(function(o){var r=new Date(n).setHours(o);return t("li",{class:{cell:!0,actived:o===e.currentHours,disabled:i&&i(r)},on:{click:e.selectTime.bind(e,r)}},[e.stringifyText(o)])}),s.minutes.map(function(o){var r=new Date(n).setMinutes(o);return t("li",{class:{cell:!0,actived:o===e.currentMinutes,disabled:i&&i(r)},on:{click:e.selectTime.bind(e,r)}},[e.stringifyText(o)])}),s.seconds.map(function(o){var r=new Date(n).setSeconds(o);return t("li",{class:{cell:!0,actived:o===e.currentSeconds,disabled:i&&i(r)},on:{click:e.selectTime.bind(e,r)}},[e.stringifyText(o)])})].filter(function(t){return t.length>0});return c=c.map(function(e){return t("ul",{class:"mx-time-list",style:{width:100/c.length+"%"}},[e])}),t("div",{class:"mx-panel mx-panel-time"},[c])}}},mixins:[m,{methods:{dispatch:function(t,e,n){for(var i=this.$parent||this.$root,o=i.$options.name;i&&(!o||o!==t);)(i=i.$parent)&&(o=i.$options.name);o&&o===t&&(i=i||this).$emit.apply(i,[e].concat(n))}}}],props:{value:{default:null,validator:function(t){return null===t||u(t)}},startAt:null,endAt:null,visible:{type:Boolean,default:!1},type:{type:String,default:"date"},dateFormat:{type:String,default:"YYYY-MM-DD"},index:Number,defaultValue:{validator:function(t){return u(t)}},firstDayOfWeek:{default:7,type:Number,validator:function(t){return t>=1&&t<=7}},notBefore:{default:null,validator:function(t){return!t||u(t)}},notAfter:{default:null,validator:function(t){return!t||u(t)}},disabledDays:{type:[Array,Function],default:function(){return[]}},minuteStep:{type:Number,default:0,validator:function(t){return t>=0&&t<=60}},timeSelectOptions:{type:Object,default:function(){return null}},timePickerOptions:{type:[Object,Function],default:function(){return null}}},data:function(){var t=this.getNow(this.value),e=t.getFullYear();return{panel:"NONE",dates:[],calendarMonth:t.getMonth(),calendarYear:e,firstYear:10*Math.floor(e/10)}},computed:{now:{get:function(){return new Date(this.calendarYear,this.calendarMonth).getTime()},set:function(t){var e=new Date(t);this.calendarYear=e.getFullYear(),this.calendarMonth=e.getMonth()}},timeType:function(){return[/h+/.test(this.$parent.format)?"12":"24",/A/.test(this.$parent.format)?"A":"a"]},timeHeader:function(){return"time"===this.type?this.$parent.format:this.value&&f(this.value,this.dateFormat)},yearHeader:function(){return this.firstYear+" ~ "+(this.firstYear+9)},months:function(){return this.t("months")},notBeforeTime:function(){return this.getCriticalTime(this.notBefore)},notAfterTime:function(){return this.getCriticalTime(this.notAfter)}},watch:{value:{immediate:!0,handler:"updateNow"},visible:{immediate:!0,handler:"init"},panel:{handler:"handelPanelChange"}},methods:{handelPanelChange:function(t,e){var n=this;this.dispatch("DatePicker","panel-change",[t,e]),"YEAR"===t?this.firstYear=10*Math.floor(this.calendarYear/10):"TIME"===t&&this.$nextTick(function(){for(var t=n.$el.querySelectorAll(".mx-panel-time .mx-time-list"),e=0,i=t.length;e<i;e++){var o=t[e];g(o,o.querySelector(".actived"))}})},init:function(t){if(t){var e=this.type;"month"===e?this.showPanelMonth():"year"===e?this.showPanelYear():"time"===e?this.showPanelTime():this.showPanelDate()}else this.showPanelNone(),this.updateNow(this.value)},getNow:function(t){return t?new Date(t):this.defaultValue&&u(this.defaultValue)?new Date(this.defaultValue):new Date},updateNow:function(t){var e=this.now;this.now=this.getNow(t),this.visible&&this.now!==e&&this.dispatch("DatePicker","calendar-change",[new Date(this.now),new Date(e)])},getCriticalTime:function(t){if(!t)return null;var e=new Date(t);return"year"===this.type?new Date(e.getFullYear(),0).getTime():"month"===this.type?new Date(e.getFullYear(),e.getMonth()).getTime():"date"===this.type?e.setHours(0,0,0,0):e.getTime()},inBefore:function(t,e){return void 0===e&&(e=this.startAt),this.notBeforeTime&&t<this.notBeforeTime||e&&t<this.getCriticalTime(e)},inAfter:function(t,e){return void 0===e&&(e=this.endAt),this.notAfterTime&&t>this.notAfterTime||e&&t>this.getCriticalTime(e)},inDisabledDays:function(t){var e=this;return Array.isArray(this.disabledDays)?this.disabledDays.some(function(n){return e.getCriticalTime(n)===t}):"function"==typeof this.disabledDays&&this.disabledDays(new Date(t))},isDisabledYear:function(t){var e=new Date(t,0).getTime(),n=new Date(t+1,0).getTime()-1;return this.inBefore(n)||this.inAfter(e)||"year"===this.type&&this.inDisabledDays(e)},isDisabledMonth:function(t){var e=new Date(this.calendarYear,t).getTime(),n=new Date(this.calendarYear,t+1).getTime()-1;return this.inBefore(n)||this.inAfter(e)||"month"===this.type&&this.inDisabledDays(e)},isDisabledDate:function(t){var e=new Date(t).getTime(),n=new Date(t).setHours(23,59,59,999);return this.inBefore(n)||this.inAfter(e)||this.inDisabledDays(e)},isDisabledTime:function(t,e,n){var i=new Date(t).getTime();return this.inBefore(i,e)||this.inAfter(i,n)||this.inDisabledDays(i)},selectDate:function(t){if("datetime"===this.type){var e=new Date(t);return l(this.value)&&e.setHours(this.value.getHours(),this.value.getMinutes(),this.value.getSeconds()),this.isDisabledTime(e)&&(e.setHours(0,0,0,0),this.notBefore&&e.getTime()<new Date(this.notBefore).getTime()&&(e=new Date(this.notBefore)),this.startAt&&e.getTime()<new Date(this.startAt).getTime()&&(e=new Date(this.startAt))),this.selectTime(e),void this.showPanelTime()}this.$emit("select-date",t)},selectYear:function(t){if(this.changeCalendarYear(t),"year"===this.type.toLowerCase())return this.selectDate(new Date(this.now));this.dispatch("DatePicker","select-year",[t,this.index]),this.showPanelMonth()},selectMonth:function(t){if(this.changeCalendarMonth(t),"month"===this.type.toLowerCase())return this.selectDate(new Date(this.now));this.dispatch("DatePicker","select-month",[t,this.index]),this.showPanelDate()},selectTime:function(t){this.$emit("select-time",t,!1)},pickTime:function(t){this.$emit("select-time",t,!0)},changeCalendarYear:function(t){this.updateNow(new Date(t,this.calendarMonth))},changeCalendarMonth:function(t){this.updateNow(new Date(this.calendarYear,t))},getSibling:function(){var t=this,e=this.$parent.$children.filter(function(e){return e.$options.name===t.$options.name});return e[1^e.indexOf(this)]},handleIconMonth:function(t){var e=this.calendarMonth;this.changeCalendarMonth(e+t),this.$parent.$emit("change-calendar-month",{month:e,flag:t,vm:this,sibling:this.getSibling()})},handleIconYear:function(t){if("YEAR"===this.panel)this.changePanelYears(t);else{var e=this.calendarYear;this.changeCalendarYear(e+t),this.$parent.$emit("change-calendar-year",{year:e,flag:t,vm:this,sibling:this.getSibling()})}},handleBtnYear:function(){this.showPanelYear()},handleBtnMonth:function(){this.showPanelMonth()},handleTimeHeader:function(){"time"!==this.type&&this.showPanelDate()},changePanelYears:function(t){this.firstYear=this.firstYear+10*t},showPanelNone:function(){this.panel="NONE"},showPanelTime:function(){this.panel="TIME"},showPanelDate:function(){this.panel="DATE"},showPanelYear:function(){this.panel="YEAR"},showPanelMonth:function(){this.panel="MONTH"}}},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-calendar",class:"mx-calendar-panel-"+t.panel.toLowerCase()},[n("div",{staticClass:"mx-calendar-header"},[n("a",{directives:[{name:"show",rawName:"v-show",value:"TIME"!==t.panel,expression:"panel !== 'TIME'"}],staticClass:"mx-icon-last-year",on:{click:function(e){t.handleIconYear(-1)}}},[t._v("«")]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"DATE"===t.panel,expression:"panel === 'DATE'"}],staticClass:"mx-icon-last-month",on:{click:function(e){t.handleIconMonth(-1)}}},[t._v("‹")]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"TIME"!==t.panel,expression:"panel !== 'TIME'"}],staticClass:"mx-icon-next-year",on:{click:function(e){t.handleIconYear(1)}}},[t._v("»")]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"DATE"===t.panel,expression:"panel === 'DATE'"}],staticClass:"mx-icon-next-month",on:{click:function(e){t.handleIconMonth(1)}}},[t._v("›")]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"DATE"===t.panel,expression:"panel === 'DATE'"}],staticClass:"mx-current-month",on:{click:t.handleBtnMonth}},[t._v(t._s(t.months[t.calendarMonth]))]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"DATE"===t.panel||"MONTH"===t.panel,expression:"panel === 'DATE' || panel === 'MONTH'"}],staticClass:"mx-current-year",on:{click:t.handleBtnYear}},[t._v(t._s(t.calendarYear))]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"YEAR"===t.panel,expression:"panel === 'YEAR'"}],staticClass:"mx-current-year"},[t._v(t._s(t.yearHeader))]),t._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:"TIME"===t.panel,expression:"panel === 'TIME'"}],staticClass:"mx-time-header",on:{click:t.handleTimeHeader}},[t._v(t._s(t.timeHeader))])]),t._v(" "),n("div",{staticClass:"mx-calendar-content"},[n("panel-date",{directives:[{name:"show",rawName:"v-show",value:"DATE"===t.panel,expression:"panel === 'DATE'"}],attrs:{value:t.value,"date-format":t.dateFormat,"calendar-month":t.calendarMonth,"calendar-year":t.calendarYear,"start-at":t.startAt,"end-at":t.endAt,"first-day-of-week":t.firstDayOfWeek,"disabled-date":t.isDisabledDate},on:{select:t.selectDate}}),t._v(" "),n("panel-year",{directives:[{name:"show",rawName:"v-show",value:"YEAR"===t.panel,expression:"panel === 'YEAR'"}],attrs:{value:t.value,"disabled-year":t.isDisabledYear,"first-year":t.firstYear},on:{select:t.selectYear}}),t._v(" "),n("panel-month",{directives:[{name:"show",rawName:"v-show",value:"MONTH"===t.panel,expression:"panel === 'MONTH'"}],attrs:{value:t.value,"disabled-month":t.isDisabledMonth,"calendar-year":t.calendarYear},on:{select:t.selectMonth}}),t._v(" "),n("panel-time",{directives:[{name:"show",rawName:"v-show",value:"TIME"===t.panel,expression:"panel === 'TIME'"}],attrs:{"minute-step":t.minuteStep,"time-picker-options":t.timePickerOptions,"time-select-options":t.timeSelectOptions,value:t.value,"disabled-time":t.isDisabledTime,"time-type":t.timeType},on:{select:t.selectTime,pick:t.pickTime}})],1)])},[],!1,null,null,null).exports,M=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},N=E({fecha:o.a,name:"DatePicker",components:{CalendarPanel:S},mixins:[m],directives:{clickoutside:s},props:{value:null,valueType:{default:"date",validator:function(t){return-1!==["timestamp","format","date"].indexOf(t)||c(t)}},placeholder:{type:String,default:null},lang:{type:[String,Object],default:"zh"},format:{type:[String,Object],default:"YYYY-MM-DD"},dateFormat:{type:String},type:{type:String,default:"date"},range:{type:Boolean,default:!1},rangeSeparator:{type:String,default:"~"},width:{type:[String,Number],default:null},confirmText:{type:String,default:"OK"},confirm:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},clearable:{type:Boolean,default:!0},shortcuts:{type:[Boolean,Array],default:!0},inputName:{type:String,default:"date"},inputClass:{type:[String,Array],default:"mx-input"},inputAttr:Object,appendToBody:{type:Boolean,default:!1},popupStyle:{type:Object}},data:function(){return{currentValue:this.range?[null,null]:null,userInput:null,popupVisible:!1,position:{}}},watch:{value:{immediate:!0,handler:"handleValueChange"},popupVisible:function(t){t?this.initCalendar():(this.userInput=null,this.blur())}},computed:{transform:function(){var t=this.valueType;return c(t)?M({},h.date,t):"format"===t?{value2date:this.parse.bind(this),date2value:this.stringify.bind(this)}:h[t]||h.date},language:function(){return c(this.lang)?M({},A.en,this.lang):A[this.lang]||A.en},innerPlaceholder:function(){return"string"==typeof this.placeholder?this.placeholder:this.range?this.t("placeholder.dateRange"):this.t("placeholder.date")},text:function(){if(null!==this.userInput)return this.userInput;var t=this.transform.value2date;return this.range?this.isValidRangeValue(this.value)?this.stringify(t(this.value[0]))+" "+this.rangeSeparator+" "+this.stringify(t(this.value[1])):"":this.isValidValue(this.value)?this.stringify(t(this.value)):""},computedWidth:function(){return"number"==typeof this.width||"string"==typeof this.width&&/^\d+$/.test(this.width)?this.width+"px":this.width},showClearIcon:function(){return!this.disabled&&this.clearable&&(this.range?this.isValidRangeValue(this.value):this.isValidValue(this.value))},innerType:function(){return String(this.type).toLowerCase()},innerShortcuts:function(){if(Array.isArray(this.shortcuts))return this.shortcuts;if(!1===this.shortcuts)return[];var t=this.t("pickers");return[{text:t[0],onClick:function(t){t.currentValue=[new Date,new Date(Date.now()+6048e5)],t.updateDate(!0)}},{text:t[1],onClick:function(t){t.currentValue=[new Date,new Date(Date.now()+2592e6)],t.updateDate(!0)}},{text:t[2],onClick:function(t){t.currentValue=[new Date(Date.now()-6048e5),new Date],t.updateDate(!0)}},{text:t[3],onClick:function(t){t.currentValue=[new Date(Date.now()-2592e6),new Date],t.updateDate(!0)}}]},innerDateFormat:function(){return this.dateFormat?this.dateFormat:"string"!=typeof this.format?"YYYY-MM-DD":"date"===this.innerType?this.format:this.format.replace(/[Hh]+.*[msSaAZ]|\[.*?\]/g,"").trim()||"YYYY-MM-DD"},innerPopupStyle:function(){return M({},this.position,this.popupStyle)}},mounted:function(){var t,e,n,i=this;this.appendToBody&&(this.popupElm=this.$refs.calendar,document.body.appendChild(this.popupElm)),this._displayPopup=(t=function(){i.popupVisible&&i.displayPopup()},e=0,n=null,function(){var i=this;if(!n){var o=arguments,r=function(){e=Date.now(),n=null,t.apply(i,o)};Date.now()-e>=200?r():n=setTimeout(r,200)}}),window.addEventListener("resize",this._displayPopup),window.addEventListener("scroll",this._displayPopup)},beforeDestroy:function(){this.popupElm&&this.popupElm.parentNode===document.body&&document.body.removeChild(this.popupElm),window.removeEventListener("resize",this._displayPopup),window.removeEventListener("scroll",this._displayPopup)},methods:{initCalendar:function(){this.handleValueChange(this.value),this.displayPopup()},stringify:function(t){return c(this.format)&&"function"==typeof this.format.stringify?this.format.stringify(t):f(t,this.format)},parse:function(t){return c(this.format)&&"function"==typeof this.format.parse?this.format.parse(t):function(t,e){try{return o.a.parse(t,e)||null}catch(t){return null}}(t,this.format)},isValidValue:function(t){return u((0,this.transform.value2date)(t))},isValidRangeValue:function(t){var e=this.transform.value2date;return Array.isArray(t)&&2===t.length&&this.isValidValue(t[0])&&this.isValidValue(t[1])&&e(t[1]).getTime()>=e(t[0]).getTime()},dateEqual:function(t,e){return l(t)&&l(e)&&t.getTime()===e.getTime()},rangeEqual:function(t,e){var n=this;return Array.isArray(t)&&Array.isArray(e)&&t.length===e.length&&t.every(function(t,i){return n.dateEqual(t,e[i])})},selectRange:function(t){"function"==typeof t.onClick?!1!==t.onClick(this)&&this.closePopup():(this.currentValue=[new Date(t.start),new Date(t.end)],this.updateDate(!0),this.closePopup())},clearDate:function(){var t=this.range?[null,null]:null;this.currentValue=t,this.updateDate(!0),this.$emit("clear")},confirmDate:function(){var t;(this.range?(t=this.currentValue,Array.isArray(t)&&2===t.length&&u(t[0])&&u(t[1])&&new Date(t[1]).getTime()>=new Date(t[0]).getTime()):u(this.currentValue))&&this.updateDate(!0),this.emitDate("confirm"),this.closePopup()},updateDate:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return!(this.confirm&&!t||this.disabled||(this.range?this.rangeEqual(this.value,this.currentValue):this.dateEqual(this.value,this.currentValue))||(this.emitDate("input"),this.emitDate("change"),0))},emitDate:function(t){var e=this.transform.date2value,n=this.range?this.currentValue.map(e):e(this.currentValue);this.$emit(t,n)},handleValueChange:function(t){var e=this.transform.value2date;this.range?this.currentValue=this.isValidRangeValue(t)?t.map(e):[null,null]:this.currentValue=this.isValidValue(t)?e(t):null},selectDate:function(t){this.currentValue=t,this.updateDate()&&this.closePopup()},selectStartDate:function(t){this.$set(this.currentValue,0,t),this.currentValue[1]&&this.updateDate()},selectEndDate:function(t){this.$set(this.currentValue,1,t),this.currentValue[0]&&this.updateDate()},selectTime:function(t,e){this.currentValue=t,this.updateDate()&&e&&this.closePopup()},selectStartTime:function(t){this.selectStartDate(t)},selectEndTime:function(t){this.selectEndDate(t)},showPopup:function(){this.disabled||(this.popupVisible=!0)},closePopup:function(){this.popupVisible=!1},getPopupSize:function(t){var e=t.style.display,n=t.style.visibility;t.style.display="block",t.style.visibility="hidden";var i=window.getComputedStyle(t),o={width:t.offsetWidth+parseInt(i.marginLeft)+parseInt(i.marginRight),height:t.offsetHeight+parseInt(i.marginTop)+parseInt(i.marginBottom)};return t.style.display=e,t.style.visibility=n,o},displayPopup:function(){var t=document.documentElement.clientWidth,e=document.documentElement.clientHeight,n=this.$el.getBoundingClientRect(),i=this._popupRect||(this._popupRect=this.getPopupSize(this.$refs.calendar)),o={},r=0,a=0;this.appendToBody&&(r=window.pageXOffset+n.left,a=window.pageYOffset+n.top),t-n.left<i.width&&n.right<i.width?o.left=r-n.left+1+"px":n.left+n.width/2<=t/2?o.left=r+"px":o.left=r+n.width-i.width+"px",n.top<=i.height&&e-n.bottom<=i.height?o.top=a+e-n.top-i.height+"px":n.top+n.height/2<=e/2?o.top=a+n.height+"px":o.top=a-i.height+"px",o.top===this.position.top&&o.left===this.position.left||(this.position=o)},blur:function(){this.$refs.input.blur()},handleBlur:function(t){this.$emit("blur",t)},handleFocus:function(t){this.popupVisible||this.showPopup(),this.$emit("focus",t)},handleKeydown:function(t){var e=t.keyCode;9!==e&&13!==e||(t.stopPropagation(),this.handleChange(),this.userInput=null,this.closePopup())},handleInput:function(t){this.userInput=t.target.value},handleChange:function(){if(this.editable&&null!==this.userInput){var t=this.text,e=this.$refs.calendarPanel.isDisabledTime;if(!t)return void this.clearDate();if(this.range){var n=t.split(" "+this.rangeSeparator+" ");if(2===n.length){var i=this.parse(n[0]),o=this.parse(n[1]);if(i&&o&&!e(i,null,o)&&!e(o,i,null))return this.currentValue=[i,o],this.updateDate(!0),void this.closePopup()}}else{var r=this.parse(t);if(r&&!e(r,null,null))return this.currentValue=r,this.updateDate(!0),void this.closePopup()}this.$emit("input-error",t)}}}},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.closePopup,expression:"closePopup"}],staticClass:"mx-datepicker",class:{"mx-datepicker-range":t.range,disabled:t.disabled},style:{width:t.computedWidth}},[n("div",{staticClass:"mx-input-wrapper",on:{click:function(e){return e.stopPropagation(),t.showPopup(e)}}},[n("input",t._b({ref:"input",class:t.inputClass,attrs:{name:t.inputName,type:"text",autocomplete:"off",disabled:t.disabled,readonly:!t.editable,placeholder:t.innerPlaceholder},domProps:{value:t.text},on:{keydown:t.handleKeydown,focus:t.handleFocus,blur:t.handleBlur,input:t.handleInput,change:t.handleChange}},"input",t.inputAttr,!1)),t._v(" "),t.showClearIcon?n("span",{staticClass:"mx-input-append mx-clear-wrapper",on:{click:function(e){return e.stopPropagation(),t.clearDate(e)}}},[t._t("mx-clear-icon",[n("i",{staticClass:"mx-input-icon mx-clear-icon"})])],2):t._e(),t._v(" "),n("span",{staticClass:"mx-input-append"},[t._t("calendar-icon",[n("svg",{staticClass:"mx-calendar-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 200 200"}},[n("rect",{attrs:{x:"13",y:"29",rx:"14",ry:"14",width:"174",height:"158",fill:"transparent"}}),t._v(" "),n("line",{attrs:{x1:"46",x2:"46",y1:"8",y2:"50"}}),t._v(" "),n("line",{attrs:{x1:"154",x2:"154",y1:"8",y2:"50"}}),t._v(" "),n("line",{attrs:{x1:"13",x2:"187",y1:"70",y2:"70"}}),t._v(" "),n("text",{attrs:{x:"50%",y:"135","font-size":"90","stroke-width":"1","text-anchor":"middle","dominant-baseline":"middle"}},[t._v(t._s((new Date).getDate()))])])])],2)]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.popupVisible,expression:"popupVisible"}],ref:"calendar",staticClass:"mx-datepicker-popup",style:t.innerPopupStyle,on:{click:function(t){t.stopPropagation(),t.preventDefault()}}},[t._t("header",[t.range&&t.innerShortcuts.length?n("div",{staticClass:"mx-shortcuts-wrapper"},t._l(t.innerShortcuts,function(e,i){return n("button",{key:i,staticClass:"mx-shortcuts",attrs:{type:"button"},on:{click:function(n){t.selectRange(e)}}},[t._v(t._s(e.text))])})):t._e()]),t._v(" "),t.range?n("div",{staticClass:"mx-range-wrapper"},[n("calendar-panel",t._b({ref:"calendarPanel",staticStyle:{"box-shadow":"1px 0 rgba(0, 0, 0, .1)"},attrs:{index:0,type:t.innerType,"date-format":t.innerDateFormat,value:t.currentValue[0],"end-at":t.currentValue[1],"start-at":null,visible:t.popupVisible},on:{"select-date":t.selectStartDate,"select-time":t.selectStartTime}},"calendar-panel",t.$attrs,!1)),t._v(" "),n("calendar-panel",t._b({attrs:{index:1,type:t.innerType,"date-format":t.innerDateFormat,value:t.currentValue[1],"start-at":t.currentValue[0],"end-at":null,visible:t.popupVisible},on:{"select-date":t.selectEndDate,"select-time":t.selectEndTime}},"calendar-panel",t.$attrs,!1))],1):n("calendar-panel",t._b({ref:"calendarPanel",attrs:{index:-1,type:t.innerType,"date-format":t.innerDateFormat,value:t.currentValue,visible:t.popupVisible},on:{"select-date":t.selectDate,"select-time":t.selectTime}},"calendar-panel",t.$attrs,!1)),t._v(" "),t._t("footer",[t.confirm?n("div",{staticClass:"mx-datepicker-footer"},[n("button",{staticClass:"mx-datepicker-btn mx-datepicker-btn-confirm",attrs:{type:"button"},on:{click:t.confirmDate}},[t._v(t._s(t.confirmText))])]):t._e()],{confirm:t.confirmDate})],2)])},[],!1,null,null,null).exports;n(7),N.install=function(t){t.component(N.name,N)},"undefined"!=typeof window&&window.Vue&&N.install(window.Vue),e.default=N},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(i[r]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},,function(t,e,n){(t.exports=n(4)()).push([t.i,"",""])},function(t,e,n){var i=n(6);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals),(0,n(2).default)("529d5378",i,!0,{})}])},function(t,e,n){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),i=0;i<n.length;i++)n[i]=arguments[i];return t.apply(e,n)}}},function(t,e,n){"use strict";var i=n(3);function o(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,n){if(!e)return t;var r;if(n)r=n(e);else if(i.isURLSearchParams(e))r=e.toString();else{var a=[];i.forEach(e,function(t,e){null!=t&&(i.isArray(t)?e+="[]":t=[t],i.forEach(t,function(t){i.isDate(t)?t=t.toISOString():i.isObject(t)&&(t=JSON.stringify(t)),a.push(o(e)+"="+o(t))}))}),r=a.join("&")}if(r){var s=t.indexOf("#");-1!==s&&(t=t.slice(0,s)),t+=(-1===t.indexOf("?")?"?":"&")+r}return t}},function(t,e,n){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},function(t,e,n){"use strict";(function(e){var i=n(3),o=n(92),r={"Content-Type":"application/x-www-form-urlencoded"};function a(t,e){!i.isUndefined(t)&&i.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var s,c={adapter:(void 0!==e&&"[object process]"===Object.prototype.toString.call(e)?s=n(66):"undefined"!=typeof XMLHttpRequest&&(s=n(66)),s),transformRequest:[function(t,e){return o(e,"Accept"),o(e,"Content-Type"),i.isFormData(t)||i.isArrayBuffer(t)||i.isBuffer(t)||i.isStream(t)||i.isFile(t)||i.isBlob(t)?t:i.isArrayBufferView(t)?t.buffer:i.isURLSearchParams(t)?(a(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):i.isObject(t)?(a(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(t){c.headers[t]={}}),i.forEach(["post","put","patch"],function(t){c.headers[t]=i.merge(r)}),t.exports=c}).call(this,n(91))},function(t,e,n){"use strict";var i=n(3),o=n(93),r=n(63),a=n(95),s=n(96),c=n(67);t.exports=function(t){return new Promise(function(e,l){var u=t.data,d=t.headers;i.isFormData(u)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(t.auth){var f=t.auth.username||"",h=t.auth.password||"";d.Authorization="Basic "+btoa(f+":"+h)}if(p.open(t.method.toUpperCase(),r(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,i={data:t.responseType&&"text"!==t.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:n,config:t,request:p};o(e,l,i),p=null}},p.onabort=function(){p&&(l(c("Request aborted",t,"ECONNABORTED",p)),p=null)},p.onerror=function(){l(c("Network Error",t,null,p)),p=null},p.ontimeout=function(){l(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",p)),p=null},i.isStandardBrowserEnv()){var A=n(97),v=(t.withCredentials||s(t.url))&&t.xsrfCookieName?A.read(t.xsrfCookieName):void 0;v&&(d[t.xsrfHeaderName]=v)}if("setRequestHeader"in p&&i.forEach(d,function(t,e){void 0===u&&"content-type"===e.toLowerCase()?delete d[e]:p.setRequestHeader(e,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){p&&(p.abort(),l(t),p=null)}),void 0===u&&(u=null),p.send(u)})}},function(t,e,n){"use strict";var i=n(94);t.exports=function(t,e,n,o,r){var a=new Error(t);return i(a,e,n,o,r)}},function(t,e,n){"use strict";var i=n(3);t.exports=function(t,e){e=e||{};var n={};return i.forEach(["url","method","params","data"],function(t){void 0!==e[t]&&(n[t]=e[t])}),i.forEach(["headers","auth","proxy"],function(o){i.isObject(e[o])?n[o]=i.deepMerge(t[o],e[o]):void 0!==e[o]?n[o]=e[o]:i.isObject(t[o])?n[o]=i.deepMerge(t[o]):void 0!==t[o]&&(n[o]=t[o])}),i.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(i){void 0!==e[i]?n[i]=e[i]:void 0!==t[i]&&(n[i]=t[i])}),n}},function(t,e,n){"use strict";function i(t){this.message=t}i.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},i.prototype.__CANCEL__=!0,t.exports=i},function(t,e){var n={utf8:{stringToBytes:function(t){return n.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(n.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}};t.exports=n},function(t,e){function n(t,e,n,i,o,r,a){try{var s=t[r](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(i,o)}t.exports=function(t){return function(){var e=this,i=arguments;return new Promise(function(o,r){var a=t.apply(e,i);function s(t){n(a,o,r,s,c,"next",t)}function c(t){n(a,o,r,s,c,"throw",t)}s(void 0)})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(84).default.create({headers:{requesttoken:OC.requestToken}});e.default=i},function(t,e,n){var i,o,r,a,s;i=n(102),o=n(70).utf8,r=n(103),a=n(70).bin,(s=function(t,e){t.constructor==String?t=e&&"binary"===e.encoding?a.stringToBytes(t):o.stringToBytes(t):r(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());for(var n=i.bytesToWords(t),c=8*t.length,l=1732584193,u=-271733879,d=-1732584194,p=271733878,f=0;f<n.length;f++)n[f]=16711935&(n[f]<<8|n[f]>>>24)|4278255360&(n[f]<<24|n[f]>>>8);n[c>>>5]|=128<<c%32,n[14+(c+64>>>9<<4)]=c;var h=s._ff,A=s._gg,v=s._hh,m=s._ii;for(f=0;f<n.length;f+=16){var g=l,b=u,y=d,w=p;l=h(l,u,d,p,n[f+0],7,-680876936),p=h(p,l,u,d,n[f+1],12,-389564586),d=h(d,p,l,u,n[f+2],17,606105819),u=h(u,d,p,l,n[f+3],22,-1044525330),l=h(l,u,d,p,n[f+4],7,-176418897),p=h(p,l,u,d,n[f+5],12,1200080426),d=h(d,p,l,u,n[f+6],17,-1473231341),u=h(u,d,p,l,n[f+7],22,-45705983),l=h(l,u,d,p,n[f+8],7,1770035416),p=h(p,l,u,d,n[f+9],12,-1958414417),d=h(d,p,l,u,n[f+10],17,-42063),u=h(u,d,p,l,n[f+11],22,-1990404162),l=h(l,u,d,p,n[f+12],7,1804603682),p=h(p,l,u,d,n[f+13],12,-40341101),d=h(d,p,l,u,n[f+14],17,-1502002290),l=A(l,u=h(u,d,p,l,n[f+15],22,1236535329),d,p,n[f+1],5,-165796510),p=A(p,l,u,d,n[f+6],9,-1069501632),d=A(d,p,l,u,n[f+11],14,643717713),u=A(u,d,p,l,n[f+0],20,-373897302),l=A(l,u,d,p,n[f+5],5,-701558691),p=A(p,l,u,d,n[f+10],9,38016083),d=A(d,p,l,u,n[f+15],14,-660478335),u=A(u,d,p,l,n[f+4],20,-405537848),l=A(l,u,d,p,n[f+9],5,568446438),p=A(p,l,u,d,n[f+14],9,-1019803690),d=A(d,p,l,u,n[f+3],14,-187363961),u=A(u,d,p,l,n[f+8],20,1163531501),l=A(l,u,d,p,n[f+13],5,-1444681467),p=A(p,l,u,d,n[f+2],9,-51403784),d=A(d,p,l,u,n[f+7],14,1735328473),l=v(l,u=A(u,d,p,l,n[f+12],20,-1926607734),d,p,n[f+5],4,-378558),p=v(p,l,u,d,n[f+8],11,-2022574463),d=v(d,p,l,u,n[f+11],16,1839030562),u=v(u,d,p,l,n[f+14],23,-35309556),l=v(l,u,d,p,n[f+1],4,-1530992060),p=v(p,l,u,d,n[f+4],11,1272893353),d=v(d,p,l,u,n[f+7],16,-155497632),u=v(u,d,p,l,n[f+10],23,-1094730640),l=v(l,u,d,p,n[f+13],4,681279174),p=v(p,l,u,d,n[f+0],11,-358537222),d=v(d,p,l,u,n[f+3],16,-722521979),u=v(u,d,p,l,n[f+6],23,76029189),l=v(l,u,d,p,n[f+9],4,-640364487),p=v(p,l,u,d,n[f+12],11,-421815835),d=v(d,p,l,u,n[f+15],16,530742520),l=m(l,u=v(u,d,p,l,n[f+2],23,-995338651),d,p,n[f+0],6,-198630844),p=m(p,l,u,d,n[f+7],10,1126891415),d=m(d,p,l,u,n[f+14],15,-1416354905),u=m(u,d,p,l,n[f+5],21,-57434055),l=m(l,u,d,p,n[f+12],6,1700485571),p=m(p,l,u,d,n[f+3],10,-1894986606),d=m(d,p,l,u,n[f+10],15,-1051523),u=m(u,d,p,l,n[f+1],21,-2054922799),l=m(l,u,d,p,n[f+8],6,1873313359),p=m(p,l,u,d,n[f+15],10,-30611744),d=m(d,p,l,u,n[f+6],15,-1560198380),u=m(u,d,p,l,n[f+13],21,1309151649),l=m(l,u,d,p,n[f+4],6,-145523070),p=m(p,l,u,d,n[f+11],10,-1120210379),d=m(d,p,l,u,n[f+2],15,718787259),u=m(u,d,p,l,n[f+9],21,-343485551),l=l+g>>>0,u=u+b>>>0,d=d+y>>>0,p=p+w>>>0}return i.endian([l,u,d,p])})._ff=function(t,e,n,i,o,r,a){var s=t+(e&n|~e&i)+(o>>>0)+a;return(s<<r|s>>>32-r)+e},s._gg=function(t,e,n,i,o,r,a){var s=t+(e&i|n&~i)+(o>>>0)+a;return(s<<r|s>>>32-r)+e},s._hh=function(t,e,n,i,o,r,a){var s=t+(e^n^i)+(o>>>0)+a;return(s<<r|s>>>32-r)+e},s._ii=function(t,e,n,i,o,r,a){var s=t+(n^(e|~i))+(o>>>0)+a;return(s<<r|s>>>32-r)+e},s._blocksize=16,s._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var n=i.wordsToBytes(s(t,e));return e&&e.asBytes?n:e&&e.asString?a.bytesToString(n):i.bytesToHex(n)}},function(t,e,n){"use strict";var i=n(22);n.n(i).a},function(t,e,n){e=t.exports=n(1)(!1);var i=n(11),o=i(n(12)),r=i(n(13)),a=i(n(14)),s=i(n(15));e.push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n@font-face {\n  font-family: "iconfont-vue";\n  src: url('+o+");\n  /* IE9 Compat Modes */\n  src: url("+o+') format("embedded-opentype"), url('+r+') format("woff"), url('+a+') format("truetype"), url('+s+') format("svg");\n  /* Legacy iOS */\n}\n.icon[data-v-37fc7310] {\n  font-style: normal;\n  font-weight: 400;\n}\n.icon.arrow-left-double[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-left[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right-double[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.close[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm-fade[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.menu[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.more[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.pause[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.play[data-v-37fc7310]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.action-item[data-v-37fc7310] {\n  position: relative;\n  display: inline-block;\n}\n.action-item[data-v-37fc7310]:hover, .action-item[data-v-37fc7310]:focus, .action-item[data-v-37fc7310]:active, .action-item__menutoggle[data-v-37fc7310]:focus, .action-item__menutoggle[data-v-37fc7310]:active, .action-item.action-item--open[data-v-37fc7310] {\n    border-radius: 22px;\n    background-color: rgba(127, 127, 127, 0.25) !important;\n}\n.action-item[data-v-37fc7310]:hover,\n    .action-item:hover .action-item__menutoggle[data-v-37fc7310], .action-item[data-v-37fc7310]:focus,\n    .action-item:focus .action-item__menutoggle[data-v-37fc7310], .action-item[data-v-37fc7310]:active,\n    .action-item:active .action-item__menutoggle[data-v-37fc7310], .action-item__menutoggle[data-v-37fc7310]:focus,\n    .action-item__menutoggle:focus .action-item__menutoggle[data-v-37fc7310], .action-item__menutoggle[data-v-37fc7310]:active,\n    .action-item__menutoggle:active .action-item__menutoggle[data-v-37fc7310], .action-item.action-item--open[data-v-37fc7310],\n    .action-item.action-item--open .action-item__menutoggle[data-v-37fc7310] {\n      opacity: 1;\n      border-radius: 22px;\n      background-color: rgba(127, 127, 127, 0.25);\n}\n.action-item--single[data-v-37fc7310], .action-item__menutoggle[data-v-37fc7310] {\n    box-sizing: border-box;\n    width: 44px;\n    height: 44px;\n    margin: 0;\n    padding: 14px;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n}\n.action-item__menutoggle[data-v-37fc7310] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    opacity: 0.7;\n    font-size: 16px;\n}\n.action-item__menutoggle[data-v-37fc7310]:before {\n      font-family: "iconfont-vue";\n      font-style: normal;\n      font-weight: 400;\n      content: "";\n}\n.action-item--single[data-v-37fc7310] {\n    opacity: 0.7;\n}\n.action-item--single[data-v-37fc7310]:hover, .action-item--single[data-v-37fc7310]:focus, .action-item--single[data-v-37fc7310]:active {\n      opacity: 1;\n}\n.action-item--single > [hidden][data-v-37fc7310] {\n      display: none;\n}\n.action-item--multiple[data-v-37fc7310] {\n    position: relative;\n}\n.action-item__menu[data-v-37fc7310] {\n    position: absolute;\n    z-index: 110;\n    right: 50%;\n    display: none;\n    margin: 0;\n    margin-top: -5px;\n    transform: translateX(50%);\n    color: var(--color-main-text);\n    border-radius: var(--border-radius);\n    background-color: var(--color-main-background);\n    filter: drop-shadow(0 1px 3px var(--color-box-shadow));\n    /* Arrow */\n    /* Align the popover to the right */\n    /* Align the popover to the left */\n}\n.action-item__menu ul[data-v-37fc7310] > :not(li) {\n      display: none;\n}\n.action-item__menu.open[data-v-37fc7310] {\n      display: block;\n}\n.action-item__menu .action-item__menu_arrow[data-v-37fc7310] {\n      position: absolute;\n      right: 50%;\n      bottom: 100%;\n      width: 0;\n      height: 0;\n      margin-right: -9px;\n      content: \' \';\n      pointer-events: none;\n      /* change this to adjust the arrow position */\n      border: solid transparent;\n      border-width: 9px;\n      border-bottom-color: var(--color-main-background);\n}\n.action-item__menu.menu-right[data-v-37fc7310] {\n      right: 0;\n      left: auto;\n      transform: none;\n}\n.action-item__menu.menu-right .action-item__menu_arrow[data-v-37fc7310] {\n        right: 13px;\n        margin-right: 0;\n}\n.action-item__menu.menu-left[data-v-37fc7310] {\n      right: auto;\n      left: 0;\n      transform: none;\n}\n.action-item__menu.menu-left .action-item__menu_arrow[data-v-37fc7310] {\n        right: auto;\n        left: 13px;\n        margin-right: 0;\n}\n.ie .action-item__menu[data-v-37fc7310],\n.ie .action-item__menu .action-item__menu_arrow[data-v-37fc7310],\n.edge .action-item__menu[data-v-37fc7310],\n.edge .action-item__menu .action-item__menu_arrow[data-v-37fc7310] {\n  border: 1px solid var(--color-border);\n}\n',""])},function(t,e,n){"use strict";n.r(e);var i={name:"AppNavigationToggle",methods:{emitClick:function(){this.$emit("click")}}},o=(n(81),n(0)),r=Object(o.a)(i,function(){var t=this,e=t.$createElement;return(t._self._c||e)("a",{attrs:{id:"app-navigation-toggle",tabindex:"0",href:"#"},on:{click:function(e){return e.preventDefault(),t.emitClick(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"space",32,e.key,[" ","Spacebar"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.emitClick(e))}}})},[],!1,null,"d9538ec8",null).exports;n.d(e,"AppNavigationSpacer",function(){return r});
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e){},function(t,e){},function(t,e,n){"use strict";var i=n(26);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-73841ba8]:hover, li.active[data-v-73841ba8] {\n  box-shadow: inset 4px 0 var(--color-primary);\n}\n.action-button[data-v-73841ba8] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-right: 14px;\n  cursor: pointer;\n  white-space: nowrap;\n  opacity: 0.7;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  line-height: 44px;\n}\n.action-button[data-v-73841ba8]:hover, .action-button[data-v-73841ba8]:focus {\n    opacity: 1;\n}\n.action-button > span[data-v-73841ba8] {\n    cursor: pointer;\n    white-space: nowrap;\n}\n.action-button__icon[data-v-73841ba8] {\n    width: 44px;\n    height: 44px;\n    opacity: 1;\n    background-position: 14px center;\n    background-size: 16px;\n}\n.action-button p[data-v-73841ba8] {\n    width: 150px;\n    padding: 7px 0;\n    cursor: pointer;\n    text-align: left;\n    line-height: 1.6em;\n}\n.action-button__longtext[data-v-73841ba8] {\n    cursor: pointer;\n    white-space: pre-wrap;\n}\n.action-button__title[data-v-73841ba8] {\n    font-weight: bold;\n}\n',""])},function(t,e,n){"use strict";var i=n(27);n.n(i).a},function(t,e,n){e=t.exports=n(1)(!1);var i=n(11),o=i(n(12)),r=i(n(13)),a=i(n(14)),s=i(n(15));e.push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n@font-face {\n  font-family: "iconfont-vue";\n  src: url('+o+");\n  /* IE9 Compat Modes */\n  src: url("+o+') format("embedded-opentype"), url('+r+') format("woff"), url('+a+') format("truetype"), url('+s+') format("svg");\n  /* Legacy iOS */\n}\n.icon[data-v-d9538ec8] {\n  font-style: normal;\n  font-weight: 400;\n}\n.icon.arrow-left-double[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-left[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right-double[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.close[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm-fade[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.menu[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.more[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.pause[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.play[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n#app-navigation-toggle[data-v-d9538ec8] {\n  display: none;\n  position: fixed;\n  z-index: 1050;\n  left: 0;\n  width: 44px;\n  height: 44px;\n  padding: 14px;\n  cursor: pointer;\n  opacity: 0.6;\n  font-size: 16px;\n  line-height: 17px;\n}\n#app-navigation-toggle[data-v-d9538ec8]:before {\n    font-family: "iconfont-vue";\n    font-style: normal;\n    font-weight: 400;\n    content: "";\n}\n#app-navigation-toggle[data-v-d9538ec8]:hover, #app-navigation-toggle[data-v-d9538ec8]:focus {\n    opacity: 1;\n}\n@media only screen and (max-width: 768px) {\n#app-navigation-toggle[data-v-d9538ec8] {\n    display: inline-block !important;\n}\n}\n',""])},function(t,e,n){var i=function(t){"use strict";var e,n=Object.prototype,i=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},r=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,n,i){var o=e&&e.prototype instanceof A?e:A,r=Object.create(o.prototype),a=new E(i||[]);return r._invoke=function(t,e,n){var i=u;return function(o,r){if(i===p)throw new Error("Generator is already running");if(i===f){if("throw"===o)throw r;return M()}for(n.method=o,n.arg=r;;){var a=n.delegate;if(a){var s=T(a,n);if(s){if(s===h)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(i===u)throw i=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);i=p;var c=l(t,e,n);if("normal"===c.type){if(i=n.done?f:d,c.arg===h)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(i=f,n.method="throw",n.arg=c.arg)}}}(t,n,a),r}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var u="suspendedStart",d="suspendedYield",p="executing",f="completed",h={};function A(){}function v(){}function m(){}var g={};g[r]=function(){return this};var b=Object.getPrototypeOf,y=b&&b(b(S([])));y&&y!==n&&i.call(y,r)&&(g=y);var w=m.prototype=A.prototype=Object.create(g);function x(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function _(t){var e;this._invoke=function(n,o){function r(){return new Promise(function(e,r){!function e(n,o,r,a){var s=l(t[n],t,o);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"==typeof u&&i.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,r,a)},function(t){e("throw",t,r,a)}):Promise.resolve(u).then(function(t){c.value=t,r(c)},function(t){return e("throw",t,r,a)})}a(s.arg)}(n,o,e,r)})}return e=e?e.then(r,r):r()}}function T(t,n){var i=t.iterator[n.method];if(i===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,T(t,n),"throw"===n.method))return h;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var o=l(i,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,h;var r=o.arg;return r?r.done?(n[t.resultName]=r.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,h):r:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,h)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function S(t){if(t){var n=t[r];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){for(;++o<t.length;)if(i.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:M}}function M(){return{value:e,done:!0}}return v.prototype=w.constructor=m,m.constructor=v,m[s]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(_.prototype),_.prototype[a]=function(){return this},t.AsyncIterator=_,t.async=function(e,n,i,o){var r=new _(c(e,n,i,o));return t.isGeneratorFunction(n)?r:r.next().then(function(t){return t.done?t.value:r.next()})},x(w),w[s]="Generator",w[r]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var i=e.pop();if(i in t)return n.value=i,n.done=!1,n}return n.done=!0,n}},t.values=S,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var n in this)"t"===n.charAt(0)&&i.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(i,o){return s.type="throw",s.arg=t,n.next=i,o&&(n.method="next",n.arg=e),!!o}for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),l=i.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&i.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var r=o;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var a=r?r.completion:{};return a.type=t,a.arg=e,r?(this.method="next",this.next=r.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),C(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var i=n.completion;if("throw"===i.type){var o=i.arg;C(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,i){return this.delegate={iterator:S(t),resultName:n,nextLoc:i},"next"===this.method&&(this.arg=e),h}},t}(t.exports);try{regeneratorRuntime=i}catch(t){Function("r","regeneratorRuntime = r")(i)}},function(t,e,n){t.exports=n(85)},function(t,e,n){"use strict";var i=n(3),o=n(62),r=n(87),a=n(68);function s(t){var e=new r(t),n=o(r.prototype.request,e);return i.extend(n,r.prototype,e),i.extend(n,e),n}var c=s(n(65));c.Axios=r,c.create=function(t){return s(a(c.defaults,t))},c.Cancel=n(69),c.CancelToken=n(100),c.isCancel=n(64),c.all=function(t){return Promise.all(t)},c.spread=n(101),t.exports=c,t.exports.default=c},function(t,e){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}},function(t,e,n){"use strict";var i=n(3),o=n(63),r=n(88),a=n(89),s=n(68);function c(t){this.defaults=t,this.interceptors={request:new r,response:new r}}c.prototype.request=function(t){"string"==typeof t?(t=arguments[1]||{}).url=arguments[0]:t=t||{},(t=s(this.defaults,t)).method=t.method?t.method.toLowerCase():"get";var e=[a,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},c.prototype.getUri=function(t){return t=s(this.defaults,t),o(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},i.forEach(["delete","get","head","options"],function(t){c.prototype[t]=function(e,n){return this.request(i.merge(n||{},{method:t,url:e}))}}),i.forEach(["post","put","patch"],function(t){c.prototype[t]=function(e,n,o){return this.request(i.merge(o||{},{method:t,url:e,data:n}))}}),t.exports=c},function(t,e,n){"use strict";var i=n(3);function o(){this.handlers=[]}o.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){i.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=o},function(t,e,n){"use strict";var i=n(3),o=n(90),r=n(64),a=n(65),s=n(98),c=n(99);function l(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){return l(t),t.baseURL&&!s(t.url)&&(t.url=c(t.baseURL,t.url)),t.headers=t.headers||{},t.data=o(t.data,t.headers,t.transformRequest),t.headers=i.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),i.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||a.adapter)(t).then(function(e){return l(t),e.data=o(e.data,e.headers,t.transformResponse),e},function(e){return r(e)||(l(t),e&&e.response&&(e.response.data=o(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},function(t,e,n){"use strict";var i=n(3);t.exports=function(t,e,n){return i.forEach(n,function(n){t=n(t,e)}),t}},function(t,e){var n,i,o=t.exports={};function r(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===r||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:r}catch(t){n=r}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(t){i=a}}();var c,l=[],u=!1,d=-1;function p(){u&&c&&(u=!1,c.length?l=c.concat(l):d=-1,l.length&&f())}function f(){if(!u){var t=s(p);u=!0;for(var e=l.length;e;){for(c=l,l=[];++d<e;)c&&c[d].run();d=-1,e=l.length}c=null,u=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function h(t,e){this.fun=t,this.array=e}function A(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new h(t,e)),1!==l.length||u||s(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=A,o.addListener=A,o.once=A,o.off=A,o.removeListener=A,o.removeAllListeners=A,o.emit=A,o.prependListener=A,o.prependOnceListener=A,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e,n){"use strict";var i=n(3);t.exports=function(t,e){i.forEach(t,function(n,i){i!==e&&i.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[i])})}},function(t,e,n){"use strict";var i=n(67);t.exports=function(t,e,n){var o=n.config.validateStatus;!o||o(n.status)?t(n):e(i("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(t,e,n){"use strict";t.exports=function(t,e,n,i,o){return t.config=e,n&&(t.code=n),t.request=i,t.response=o,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},t}},function(t,e,n){"use strict";var i=n(3),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,n,r,a={};return t?(i.forEach(t.split("\n"),function(t){if(r=t.indexOf(":"),e=i.trim(t.substr(0,r)).toLowerCase(),n=i.trim(t.substr(r+1)),e){if(a[e]&&o.indexOf(e)>=0)return;a[e]="set-cookie"===e?(a[e]?a[e]:[]).concat([n]):a[e]?a[e]+", "+n:n}}),a):a}},function(t,e,n){"use strict";var i=n(3);t.exports=i.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(t){var i=t;return e&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return t=o(window.location.href),function(e){var n=i.isString(e)?o(e):e;return n.protocol===t.protocol&&n.host===t.host}}():function(){return!0}},function(t,e,n){"use strict";var i=n(3);t.exports=i.isStandardBrowserEnv()?{write:function(t,e,n,o,r,a){var s=[];s.push(t+"="+encodeURIComponent(e)),i.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),i.isString(o)&&s.push("path="+o),i.isString(r)&&s.push("domain="+r),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(t,e,n){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},function(t,e,n){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},function(t,e,n){"use strict";var i=n(69);function o(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new i(t),e(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t;return{token:new o(function(e){t=e}),cancel:t}},t.exports=o},function(t,e,n){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},function(t,e){var n,i;n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&i.rotl(t,8)|4278255360&i.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=i.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,i=0;n<t.length;n++,i+=8)e[i>>>5]|=t[n]<<24-i%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var e=[],i=0;i<t.length;i+=3)for(var o=t[i]<<16|t[i+1]<<8|t[i+2],r=0;r<4;r++)8*i+6*r<=8*t.length?e.push(n.charAt(o>>>6*(3-r)&63)):e.push("=");return e.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],i=0,o=0;i<t.length;o=++i%4)0!=o&&e.push((n.indexOf(t.charAt(i-1))&Math.pow(2,-2*o+8)-1)<<2*o|n.indexOf(t.charAt(i))>>>6-2*o);return e}},t.exports=i},function(t,e){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(n(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}(t)||!!t._isBuffer)}},function(t,e,n){"use strict";var i=n(28);n.n(i).a},function(t,e,n){e=t.exports=n(1)(!1);var i=n(11),o=i(n(12)),r=i(n(13)),a=i(n(14)),s=i(n(15));e.push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n@font-face {\n  font-family: "iconfont-vue";\n  src: url('+o+");\n  /* IE9 Compat Modes */\n  src: url("+o+') format("embedded-opentype"), url('+r+') format("woff"), url('+a+') format("truetype"), url('+s+') format("svg");\n  /* Legacy iOS */\n}\n.icon[data-v-72b53a12] {\n  font-style: normal;\n  font-weight: 400;\n}\n.icon.arrow-left-double[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-left[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right-double[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.close[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm-fade[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.menu[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.more[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.pause[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.play[data-v-72b53a12]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.avatardiv[data-v-72b53a12] {\n  position: relative;\n  display: inline-block;\n}\n.avatardiv--unknown[data-v-72b53a12] {\n    position: relative;\n    background-color: var(--color-text-maxcontrast);\n}\n.avatardiv--with-menu[data-v-72b53a12] {\n    cursor: pointer;\n}\n.avatardiv--with-menu .icon-more[data-v-72b53a12] {\n      position: absolute;\n      top: 0;\n      left: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: inherit;\n      height: inherit;\n      cursor: pointer;\n      opacity: 0;\n      background: none;\n      font-size: 18px;\n}\n.avatardiv--with-menu .icon-more[data-v-72b53a12]:before {\n        font-family: "iconfont-vue";\n        font-style: normal;\n        font-weight: 400;\n        content: "";\n}\n.avatardiv--with-menu .icon-more[data-v-72b53a12]::before {\n        display: block;\n}\n.avatardiv--with-menu:focus .icon-more[data-v-72b53a12], .avatardiv--with-menu:hover .icon-more[data-v-72b53a12] {\n      opacity: 1;\n}\n.avatardiv--with-menu:focus img[data-v-72b53a12], .avatardiv--with-menu:hover img[data-v-72b53a12] {\n      opacity: 0;\n}\n.avatardiv--with-menu .icon-more[data-v-72b53a12],\n    .avatardiv--with-menu img[data-v-72b53a12] {\n      transition: opacity var(--animation-quick);\n}\n.avatardiv > .unknown[data-v-72b53a12] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    text-align: center;\n    color: var(--color-main-background);\n}\n.avatardiv img[data-v-72b53a12] {\n    width: 100%;\n    height: 100%;\n}\n.avatardiv .avatardiv__status[data-v-72b53a12] {\n    position: absolute;\n    top: 22px;\n    left: 22px;\n    width: 10px;\n    height: 10px;\n    border: 1px solid rgba(255, 255, 255, 0.5);\n    background-clip: content-box;\n}\n.avatardiv .avatardiv__status--positive[data-v-72b53a12] {\n      border-radius: 50%;\n      background-color: var(--color-success);\n}\n.avatardiv .avatardiv__status--negative[data-v-72b53a12] {\n      background-color: var(--color-error);\n}\n.avatardiv .avatardiv__status--neutral[data-v-72b53a12] {\n      border: none;\n      background-color: transparent !important;\n}\n.avatardiv .avatardiv__status--neutral svg[data-v-72b53a12] {\n        position: absolute;\n        top: -3px;\n        left: -2px;\n}\n.avatardiv .avatardiv__status--neutral svg path[data-v-72b53a12] {\n          fill: #aaa;\n}\n.avatardiv .popovermenu-wrapper[data-v-72b53a12] {\n    position: relative;\n    display: inline-block;\n}\n.avatardiv .popovermenu[data-v-72b53a12] {\n    display: block;\n    margin: 0;\n    font-size: initial;\n}\n',""])},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=i=function(t){return n(t)}:t.exports=i=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},i(e)}t.exports=i},function(t,e,n){t.exports=function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=60)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(49)("wks"),o=n(30),r=n(0).Symbol,a="function"==typeof r;(t.exports=function(t){return i[t]||(i[t]=a&&r[t]||(a?r:o)("Symbol."+t))}).store=i},function(t,e,n){var i=n(5);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(0),o=n(10),r=n(8),a=n(6),s=n(11),c=function(t,e,n){var l,u,d,p,f=t&c.F,h=t&c.G,A=t&c.S,v=t&c.P,m=t&c.B,g=h?i:A?i[e]||(i[e]={}):(i[e]||{}).prototype,b=h?o:o[e]||(o[e]={}),y=b.prototype||(b.prototype={});for(l in h&&(n=e),n)u=!f&&g&&void 0!==g[l],d=(u?g:n)[l],p=m&&u?s(d,i):v&&"function"==typeof d?s(Function.call,d):d,g&&a(g,l,d,t&c.U),b[l]!=d&&r(b,l,p),v&&y[l]!=d&&(y[l]=d)};i.core=o,c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(0),o=n(8),r=n(12),a=n(30)("src"),s=Function.toString,c=(""+s).split("toString");n(10).inspectSource=function(t){return s.call(t)},(t.exports=function(t,e,n,s){var l="function"==typeof n;l&&(r(n,"name")||o(n,"name",e)),t[e]!==n&&(l&&(r(n,a)||o(n,a,t[e]?""+t[e]:c.join(String(e)))),t===i?t[e]=n:s?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[a]||s.call(this)})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(13),o=n(25);t.exports=n(4)?function(t,e,n){return i.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(14);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,o){return t.call(e,n,i,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(2),o=n(41),r=n(29),a=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=r(e,!0),i(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var i=n(7);t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var i=n(23),o=n(16);t.exports=function(t){return i(o(t))}},function(t,e,n){var i=n(53),o=Math.min;t.exports=function(t){return t>0?o(i(t),9007199254740991):0}},function(t,e,n){var i=n(11),o=n(23),r=n(28),a=n(19),s=n(64);t.exports=function(t,e){var n=1==t,c=2==t,l=3==t,u=4==t,d=6==t,p=5==t||d,f=e||s;return function(e,s,h){for(var A,v,m=r(e),g=o(m),b=i(s,h,3),y=a(g.length),w=0,x=n?f(e,y):c?f(e,0):void 0;y>w;w++)if((p||w in g)&&(A=g[w],v=b(A,w,m),t))if(n)x[w]=v;else if(v)switch(t){case 3:return!0;case 5:return A;case 6:return w;case 2:x.push(A)}else if(u)return!1;return d?-1:l||u?u:x}}},function(t,e,n){var i=n(5),o=n(0).document,r=i(o)&&i(o.createElement);t.exports=function(t){return r?o.createElement(t):{}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){t.exports=!1},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(13).f,o=n(12),r=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,r)&&i(t,r,{configurable:!0,value:e})}},function(t,e,n){var i=n(49)("keys"),o=n(30);t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e,n){var i=n(16);t.exports=function(t){return Object(i(t))}},function(t,e,n){var i=n(5);t.exports=function(t,e){if(!i(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!i(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!i(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!i(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(0),o=n(12),r=n(9),a=n(67),s=n(29),c=n(7),l=n(77).f,u=n(45).f,d=n(13).f,p=n(51).trim,f=i.Number,h=f,A=f.prototype,v="Number"==r(n(44)(A)),m="trim"in String.prototype,g=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){var n,i,o,r=(e=m?e.trim():p(e,3)).charCodeAt(0);if(43===r||45===r){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:i=2,o=49;break;case 79:case 111:i=8,o=55;break;default:return+e}for(var a,c=e.slice(2),l=0,u=c.length;l<u;l++)if((a=c.charCodeAt(l))<48||a>o)return NaN;return parseInt(c,i)}}return+e};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof f&&(v?c(function(){A.valueOf.call(n)}):"Number"!=r(n))?a(new h(g(e)),n,f):g(e)};for(var b,y=n(4)?l(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;y.length>w;w++)o(h,b=y[w])&&!o(f,b)&&d(f,b,u(h,b));f.prototype=A,A.constructor=f,n(6)(i,"Number",f)}},function(t,e,n){"use strict";function i(t){return!(0===t||(!Array.isArray(t)||0!==t.length)&&t)}function o(t,e,n,i){return t.filter(function(t){return function(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}(i(t,n),e)})}function r(t){return t.filter(function(t){return!t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function s(t,e,i,r,a){return function(s){return s.map(function(s){var c;if(!s[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var l=o(s[i],t,e,a);return l.length?(c={},n.i(p.a)(c,r,s[r]),n.i(p.a)(c,i,l),c):[]})}}var c=n(59),l=n(54),u=(n.n(l),n(95)),d=(n.n(u),n(31)),p=(n.n(d),n(58)),f=n(91),h=(n.n(f),n(98)),A=(n.n(h),n(92)),v=(n.n(A),n(88)),m=(n.n(v),n(97)),g=(n.n(m),n(89)),b=(n.n(g),n(96)),y=(n.n(b),n(93)),w=(n.n(y),n(90)),x=(n.n(w),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return[]}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):o(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(function(t){return function(){return!t.apply(void 0,arguments)}}(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null))},search:function(){this.$emit("search-change",this.search,this.id)}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return x(s(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return x(a(this.groupValues,this.groupLabel),r)(t)},updateSearch:function(t){this.search=t},isExistingOption:function(t){return!!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},isOptionDisabled:function(t){return!!t.$isDisabled},getOptionLabel:function(t){if(i(t))return"";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)this.selectGroup(t);else if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return-1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id)}else{var o=n[this.groupValues].filter(function(t){return!(e.isOptionDisabled(t)||e.isSelected(t))});this.$emit("select",o,this.id),this.$emit("input",this.internalValue.concat(o),this.id)}},wholeGroupSelected:function(t){var e=this;return t[this.groupValues].every(function(t){return e.isSelected(t)||e.isOptionDisabled(t)})},wholeGroupDisabled:function(t){return t[this.groupValues].every(this.isOptionDisabled)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled&&!t.$isDisabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===n.i(c.a)(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var o=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("input",o,this.id)}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate()}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle:function(){this.isOpen?this.deactivate():this.activate()},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight))}}}}},function(t,e,n){"use strict";var i=n(54),o=(n.n(i),n(31));n.n(o),e.a={data:function(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust()},isOpen:function(){this.pointerDirty=!1}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return["multiselect__option--group","multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0}}}},function(t,e,n){"use strict";var i=n(36),o=n(74),r=n(15),a=n(18);t.exports=n(72)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),r.Arguments=r.Array,i("keys"),i("values"),i("entries")},function(t,e,n){"use strict";var i=n(31),o=(n.n(i),n(32)),r=n(33);e.a={name:"vue-multiselect",mixins:[o.a,r.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return"and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return(this.singleValue||0===this.singleValue)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.searchable||this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.preferredOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}}},function(t,e,n){var i=n(1)("unscopables"),o=Array.prototype;null==o[i]&&n(8)(o,i,{}),t.exports=function(t){o[i][t]=!0}},function(t,e,n){var i=n(18),o=n(19),r=n(85);t.exports=function(t){return function(e,n,a){var s,c=i(e),l=o(c.length),u=r(a,l);if(t&&n!=n){for(;l>u;)if((s=c[u++])!=s)return!0}else for(;l>u;u++)if((t||u in c)&&c[u]===n)return t||u||0;return!t&&-1}}},function(t,e,n){var i=n(9),o=n(1)("toStringTag"),r="Arguments"==i(function(){return arguments}());t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:r?i(e):"Object"==(a=i(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){"use strict";var i=n(2);t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){var i=n(0).document;t.exports=i&&i.documentElement},function(t,e,n){t.exports=!n(4)&&!n(7)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(9);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";function i(t){var e,n;this.promise=new t(function(t,i){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=i}),this.resolve=o(e),this.reject=o(n)}var o=n(14);t.exports.f=function(t){return new i(t)}},function(t,e,n){var i=n(2),o=n(76),r=n(22),a=n(27)("IE_PROTO"),s=function(){},c=function(){var t,e=n(21)("iframe"),i=r.length;for(e.style.display="none",n(40).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;i--;)delete c.prototype[r[i]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=i(t),n=new s,s.prototype=null,n[a]=t):n=c(),void 0===e?n:o(n,e)}},function(t,e,n){var i=n(79),o=n(25),r=n(18),a=n(29),s=n(12),c=n(41),l=Object.getOwnPropertyDescriptor;e.f=n(4)?l:function(t,e){if(t=r(t),e=a(e,!0),c)try{return l(t,e)}catch(t){}if(s(t,e))return o(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(12),o=n(18),r=n(37)(!1),a=n(27)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),c=0,l=[];for(n in s)n!=a&&i(s,n)&&l.push(n);for(;e.length>c;)i(s,n=e[c++])&&(~r(l,n)||l.push(n));return l}},function(t,e,n){var i=n(46),o=n(22);t.exports=Object.keys||function(t){return i(t,o)}},function(t,e,n){var i=n(2),o=n(5),r=n(43);t.exports=function(t,e){if(i(t),o(e)&&e.constructor===t)return e;var n=r.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var i=n(10),o=n(0),r=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return r[t]||(r[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var i=n(2),o=n(14),r=n(1)("species");t.exports=function(t,e){var n,a=i(t).constructor;return void 0===a||null==(n=i(a)[r])?e:o(n)}},function(t,e,n){var i=n(3),o=n(16),r=n(7),a=n(84),s="["+a+"]",c=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),u=function(t,e,n){var o={},s=r(function(){return!!a[t]()||"​"!="​"[t]()}),c=o[t]=s?e(d):a[t];n&&(o[n]=c),i(i.P+i.F*s,"String",o)},d=u.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(l,"")),t};t.exports=u},function(t,e,n){var i,o,r,a=n(11),s=n(68),c=n(40),l=n(21),u=n(0),d=u.process,p=u.setImmediate,f=u.clearImmediate,h=u.MessageChannel,A=u.Dispatch,v=0,m={},g=function(){var t=+this;if(m.hasOwnProperty(t)){var e=m[t];delete m[t],e()}},b=function(t){g.call(t.data)};p&&f||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return m[++v]=function(){s("function"==typeof t?t:Function(t),e)},i(v),v},f=function(t){delete m[t]},"process"==n(9)(d)?i=function(t){d.nextTick(a(g,t,1))}:A&&A.now?i=function(t){A.now(a(g,t,1))}:h?(o=new h,r=o.port2,o.port1.onmessage=b,i=a(r.postMessage,r,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(i=function(t){u.postMessage(t+"","*")},u.addEventListener("message",b,!1)):i="onreadystatechange"in l("script")?function(t){c.appendChild(l("script")).onreadystatechange=function(){c.removeChild(this),g.call(t)}}:function(t){setTimeout(a(g,t,1),0)}),t.exports={set:p,clear:f}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){"use strict";var i=n(3),o=n(20)(5),r=!0;"find"in[]&&Array(1).find(function(){r=!1}),i(i.P+i.F*r,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(36)("find")},function(t,e,n){"use strict";var i,o,r,a,s=n(24),c=n(0),l=n(11),u=n(38),d=n(3),p=n(5),f=n(14),h=n(61),A=n(66),v=n(50),m=n(52).set,g=n(75)(),b=n(43),y=n(80),w=n(86),x=n(48),_=c.TypeError,T=c.process,k=T&&T.versions,C=k&&k.v8||"",E=c.Promise,S="process"==u(T),M=function(){},N=o=b.f,I=!!function(){try{var t=E.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(M,M)};return(S||"function"==typeof PromiseRejectionEvent)&&t.then(M)instanceof e&&0!==C.indexOf("6.6")&&-1===w.indexOf("Chrome/66")}catch(t){}}(),O=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},L=function(t,e){if(!t._n){t._n=!0;var n=t._c;g(function(){for(var i=t._v,o=1==t._s,r=0;n.length>r;)!function(e){var n,r,a,s=o?e.ok:e.fail,c=e.resolve,l=e.reject,u=e.domain;try{s?(o||(2==t._h&&P(t),t._h=1),!0===s?n=i:(u&&u.enter(),n=s(i),u&&(u.exit(),a=!0)),n===e.promise?l(_("Promise-chain cycle")):(r=O(n))?r.call(n,c,l):c(n)):l(i)}catch(t){u&&!a&&u.exit(),l(t)}}(n[r++]);t._c=[],t._n=!1,e&&!t._h&&D(t)})}},D=function(t){m.call(c,function(){var e,n,i,o=t._v,r=B(t);if(r&&(e=y(function(){S?T.emit("unhandledRejection",o,t):(n=c.onunhandledrejection)?n({promise:t,reason:o}):(i=c.console)&&i.error&&i.error("Unhandled promise rejection",o)}),t._h=S||B(t)?2:1),t._a=void 0,r&&e.e)throw e.v})},B=function(t){return 1!==t._h&&0===(t._a||t._c).length},P=function(t){m.call(c,function(){var e;S?T.emit("rejectionHandled",t):(e=c.onrejectionhandled)&&e({promise:t,reason:t._v})})},R=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),L(e,!0))},G=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw _("Promise can't be resolved itself");(e=O(t))?g(function(){var i={_w:n,_d:!1};try{e.call(t,l(G,i,1),l(R,i,1))}catch(t){R.call(i,t)}}):(n._v=t,n._s=1,L(n,!1))}catch(t){R.call({_w:n,_d:!1},t)}}};I||(E=function(t){h(this,E,"Promise","_h"),f(t),i.call(this);try{t(l(G,this,1),l(R,this,1))}catch(t){R.call(this,t)}},(i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n(81)(E.prototype,{then:function(t,e){var n=N(v(this,E));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=S?T.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&L(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),r=function(){var t=new i;this.promise=t,this.resolve=l(G,t,1),this.reject=l(R,t,1)},b.f=N=function(t){return t===E||t===a?new r(t):o(t)}),d(d.G+d.W+d.F*!I,{Promise:E}),n(26)(E,"Promise"),n(83)("Promise"),a=n(10).Promise,d(d.S+d.F*!I,"Promise",{reject:function(t){var e=N(this);return(0,e.reject)(t),e.promise}}),d(d.S+d.F*(s||!I),"Promise",{resolve:function(t){return x(s&&this===a?E:this,t)}}),d(d.S+d.F*!(I&&n(73)(function(t){E.all(t).catch(M)})),"Promise",{all:function(t){var e=this,n=N(e),i=n.resolve,o=n.reject,r=y(function(){var n=[],r=0,a=1;A(t,!1,function(t){var s=r++,c=!1;n.push(void 0),a++,e.resolve(t).then(function(t){c||(c=!0,n[s]=t,--a||i(n))},o)}),--a||i(n)});return r.e&&o(r.v),n.promise},race:function(t){var e=this,n=N(e),i=n.reject,o=y(function(){A(t,!1,function(t){e.resolve(t).then(n.resolve,i)})});return o.e&&i(o.v),n.promise}})},function(t,e,n){"use strict";var i=n(3),o=n(10),r=n(0),a=n(50),s=n(48);i(i.P+i.R,"Promise",{finally:function(t){var e=a(this,o.Promise||r.Promise),n="function"==typeof t;return this.then(n?function(n){return s(e,t()).then(function(){return n})}:t,n?function(n){return s(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";var i=n(35),o=n(101),r=n(100),a=function(t){n(99)},s=r(i.a,o.a,!1,a,null,null);e.a=s.exports},function(t,e,n){"use strict";e.a=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return(o="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}e.a=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),o=(n.n(i),n(55)),r=(n.n(o),n(56)),a=(n.n(r),n(57)),s=n(32),c=n(33);n.d(e,"Multiselect",function(){return a.a}),n.d(e,"multiselectMixin",function(){return s.a}),n.d(e,"pointerMixin",function(){return c.a}),e.default=a.a},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(14),o=n(28),r=n(23),a=n(19);t.exports=function(t,e,n,s,c){i(e);var l=o(t),u=r(l),d=a(l.length),p=c?d-1:0,f=c?-1:1;if(n<2)for(;;){if(p in u){s=u[p],p+=f;break}if(p+=f,c?p<0:d<=p)throw TypeError("Reduce of empty array with no initial value")}for(;c?p>=0:d>p;p+=f)p in u&&(s=e(s,u[p],p,l));return s}},function(t,e,n){var i=n(5),o=n(42),r=n(1)("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0),i(e)&&null===(e=e[r])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(63);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8),o=n(6),r=n(7),a=n(16),s=n(1);t.exports=function(t,e,n){var c=s(t),l=n(a,c,""[t]),u=l[0],d=l[1];r(function(){var e={};return e[c]=function(){return 7},7!=""[t](e)})&&(o(String.prototype,t,u),i(RegExp.prototype,c,2==e?function(t,e){return d.call(t,this,e)}:function(t){return d.call(t,this)}))}},function(t,e,n){var i=n(11),o=n(70),r=n(69),a=n(2),s=n(19),c=n(87),l={},u={},e=t.exports=function(t,e,n,d,p){var f,h,A,v,m=p?function(){return t}:c(t),g=i(n,d,e?2:1),b=0;if("function"!=typeof m)throw TypeError(t+" is not iterable!");if(r(m)){for(f=s(t.length);f>b;b++)if((v=e?g(a(h=t[b])[0],h[1]):g(t[b]))===l||v===u)return v}else for(A=m.call(t);!(h=A.next()).done;)if((v=o(A,g,h.value,e))===l||v===u)return v};e.BREAK=l,e.RETURN=u},function(t,e,n){var i=n(5),o=n(82).set;t.exports=function(t,e,n){var r,a=e.constructor;return a!==n&&"function"==typeof a&&(r=a.prototype)!==n.prototype&&i(r)&&o&&o(t,r),t}},function(t,e){t.exports=function(t,e,n){var i=void 0===n;switch(e.length){case 0:return i?t():t.call(n);case 1:return i?t(e[0]):t.call(n,e[0]);case 2:return i?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var i=n(15),o=n(1)("iterator"),r=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||r[o]===t)}},function(t,e,n){var i=n(2);t.exports=function(t,e,n,o){try{return o?e(i(n)[0],n[1]):e(n)}catch(e){var r=t.return;throw void 0!==r&&i(r.call(t)),e}}},function(t,e,n){"use strict";var i=n(44),o=n(25),r=n(26),a={};n(8)(a,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(a,{next:o(1,n)}),r(t,e+" Iterator")}},function(t,e,n){"use strict";var i=n(24),o=n(3),r=n(6),a=n(8),s=n(15),c=n(71),l=n(26),u=n(78),d=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),f=function(){return this};t.exports=function(t,e,n,h,A,v,m){c(n,e,h);var g,b,y,w=function(t){if(!p&&t in k)return k[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},x=e+" Iterator",_="values"==A,T=!1,k=t.prototype,C=k[d]||k["@@iterator"]||A&&k[A],E=C||w(A),S=A?_?w("entries"):E:void 0,M="Array"==e&&k.entries||C;if(M&&(y=u(M.call(new t)))!==Object.prototype&&y.next&&(l(y,x,!0),i||"function"==typeof y[d]||a(y,d,f)),_&&C&&"values"!==C.name&&(T=!0,E=function(){return C.call(this)}),i&&!m||!p&&!T&&k[d]||a(k,d,E),s[e]=E,s[x]=f,A)if(g={values:_?E:w("values"),keys:v?E:w("keys"),entries:S},m)for(b in g)b in k||r(k,b,g[b]);else o(o.P+o.F*(p||T),e,g);return g}},function(t,e,n){var i=n(1)("iterator"),o=!1;try{var r=[7][i]();r.return=function(){o=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var r=[7],a=r[i]();a.next=function(){return{done:n=!0}},r[i]=function(){return a},t(r)}catch(t){}return n}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(0),o=n(52).set,r=i.MutationObserver||i.WebKitMutationObserver,a=i.process,s=i.Promise,c="process"==n(9)(a);t.exports=function(){var t,e,n,l=function(){var i,o;for(c&&(i=a.domain)&&i.exit();t;){o=t.fn,t=t.next;try{o()}catch(i){throw t?n():e=void 0,i}}e=void 0,i&&i.enter()};if(c)n=function(){a.nextTick(l)};else if(!r||i.navigator&&i.navigator.standalone)if(s&&s.resolve){var u=s.resolve(void 0);n=function(){u.then(l)}}else n=function(){o.call(i,l)};else{var d=!0,p=document.createTextNode("");new r(l).observe(p,{characterData:!0}),n=function(){p.data=d=!d}}return function(i){var o={fn:i,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){var i=n(13),o=n(2),r=n(47);t.exports=n(4)?Object.defineProperties:function(t,e){o(t);for(var n,a=r(e),s=a.length,c=0;s>c;)i.f(t,n=a[c++],e[n]);return t}},function(t,e,n){var i=n(46),o=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,o)}},function(t,e,n){var i=n(12),o=n(28),r=n(27)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),i(t,r)?t[r]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var i=n(6);t.exports=function(t,e,n){for(var o in e)i(t,o,e[o],n);return t}},function(t,e,n){var i=n(5),o=n(2),r=function(t,e){if(o(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{(i=n(11)(Function.call,n(45).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return r(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:r}},function(t,e,n){"use strict";var i=n(0),o=n(13),r=n(4),a=n(1)("species");t.exports=function(t){var e=i[t];r&&e&&!e[a]&&o.f(e,a,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var i=n(53),o=Math.max,r=Math.min;t.exports=function(t,e){return(t=i(t))<0?o(t+e,0):r(t,e)}},function(t,e,n){var i=n(0),o=i.navigator;t.exports=o&&o.userAgent||""},function(t,e,n){var i=n(38),o=n(1)("iterator"),r=n(15);t.exports=n(10).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||r[i(t)]}},function(t,e,n){"use strict";var i=n(3),o=n(20)(2);i(i.P+i.F*!n(17)([].filter,!0),"Array",{filter:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),o=n(37)(!1),r=[].indexOf,a=!!r&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(a||!n(17)(r)),"Array",{indexOf:function(t){return a?r.apply(this,arguments)||0:o(this,t,arguments[1])}})},function(t,e,n){var i=n(3);i(i.S,"Array",{isArray:n(42)})},function(t,e,n){"use strict";var i=n(3),o=n(20)(1);i(i.P+i.F*!n(17)([].map,!0),"Array",{map:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),o=n(62);i(i.P+i.F*!n(17)([].reduce,!0),"Array",{reduce:function(t){return o(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){var i=Date.prototype,o=i.toString,r=i.getTime;new Date(NaN)+""!="Invalid Date"&&n(6)(i,"toString",function(){var t=r.call(this);return t==t?o.call(this):"Invalid Date"})},function(t,e,n){n(4)&&"g"!=/./g.flags&&n(13).f(RegExp.prototype,"flags",{configurable:!0,get:n(39)})},function(t,e,n){n(65)("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),o=null==n?void 0:n[e];return void 0!==o?o.call(n,i):new RegExp(n)[e](String(i))},n]})},function(t,e,n){"use strict";n(94);var i=n(2),o=n(39),r=n(4),a=/./.toString,s=function(t){n(6)(RegExp.prototype,"toString",t,!0)};n(7)(function(){return"/a/b"!=a.call({source:"a",flags:"b"})})?s(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!r&&t instanceof RegExp?o.call(t):void 0)}):"toString"!=a.name&&s(function(){return a.call(this)})},function(t,e,n){"use strict";n(51)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){for(var i=n(34),o=n(47),r=n(6),a=n(0),s=n(8),c=n(15),l=n(1),u=l("iterator"),d=l("toStringTag"),p=c.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(f),A=0;A<h.length;A++){var v,m=h[A],g=f[m],b=a[m],y=b&&b.prototype;if(y&&(y[u]||s(y,u,p),y[d]||s(y,d,m),c[m]=p,g))for(v in i)y[v]||r(y,v,i[v],!0)}},function(t,e){},function(t,e){t.exports=function(t,e,n,i,o,r){var a,s=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(a=t,s=t.default);var l,u="function"==typeof s?s.options:s;if(e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId=o),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=l):i&&(l=i),l){var d=u.functional,p=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),p(t,e)}):u.beforeCreate=p?[].concat(p,l):[l]}return{esModule:a,exports:s,options:u}}},function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate()},blur:function(e){!t.searchable&&t.deactivate()},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[t._t("selection",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e,i){return[t._t("tag",[n("span",{key:i,staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keypress:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e)},mousedown:function(n){n.preventDefault(),t.removeElement(e)}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e()],{search:t.search,remove:t.removeElement,values:t.visibleValues,isOpen:t.isOpen}),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),t.searchable?n("input",{ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"nope",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value)},focus:function(e){e.preventDefault(),t.activate()},blur:function(e){e.preventDefault(),t.deactivate()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault(),t.pointerForward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"]))return null;e.preventDefault(),t.pointerBackward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement()}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}}}):t._e(),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{staticClass:"multiselect__placeholder",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[t._v("\n          "+t._s(t.placeholder)+"\n        ")])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},attrs:{tabindex:"-1"},on:{focus:t.activate,mousedown:function(t){t.preventDefault()}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e)},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i)},mousedown:function(n){n.preventDefault(),t.selectGroup(e)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")],{search:t.search})],2)]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoOptions&&0===t.options.length&&!t.search&&!t.loading,expression:"showNoOptions && (options.length === 0 && !search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noOptions",[t._v("List is empty.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},staticRenderFns:[]};e.a=i}])},function(t,e,n){"use strict";n.r(e),
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default={data:function(){return{isFullscreen:this._isFullscreen()}},beforeMount:function(){window.addEventListener("resize",this._onResize)},beforeDestroy:function(){window.removeEventListener("resize",this._onResize)},methods:{_onResize:function(){this.isFullscreen=this._isFullscreen()},_isFullscreen:function(){return window.outerHeight===screen.height}}}},function(t,e,n){"use strict";n.r(e),
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default={data:function(){return{isMobile:this._isMobile()}},beforeMount:function(){window.addEventListener("resize",this._onResize)},beforeDestroy:function(){window.removeEventListener("resize",this._onResize)},methods:{_onResize:function(){this.isMobile=this._isMobile()},_isMobile:function(){return document.documentElement.clientWidth<768}}}},function(t,e,n){"use strict";n.r(e);var i=n(24),o=n(106),r=n.n(o),a={name:"AvatarSelectOption",components:{Avatar:n(59).default},props:{option:{type:Object,default:function(){return{desc:"",displayName:"Admin",icon:"icon-user",user:"admin",isNoUser:!1}},validator:function(t){return"displayName"in t}}}},s=(n(162),n(0)),c=Object(s.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"option"},[n("Avatar",{staticClass:"option__avatar",attrs:{"display-name":t.option.displayName,user:t.option.user,"disable-tooltip":!0,"is-no-user":t.option.isNoUser}}),t._v(" "),n("div",{staticClass:"option__desc"},[n("span",{staticClass:"option__desc--lineone"},[t._v("\n\t\t\t"+t._s(t.option.displayName)+"\n\t\t")]),t._v(" "),t.option.desc?n("span",{staticClass:"option__desc--linetwo"},[t._v("\n\t\t\t"+t._s(t.option.desc)+"\n\t\t")]):t._e()]),t._v(" "),t.option.icon?n("span",{staticClass:"icon option__icon",class:t.option.icon}):t._e()],1)},[],!1,null,"5fcb244d",null).exports,l={name:"EllipsisedOption",props:{option:{type:[String,Object],required:!0,default:""},label:{type:String,default:""}},computed:{name:function(){return this.label?this.option[this.label]:this.option},needsTruncate:function(){return this.name.length>=10},part1:function(){if(this.needsTruncate){var t=Math.min(Math.floor(this.name.length/2),10);return this.name.substr(0,this.name.length-t)}return this.name},part2:function(){if(this.needsTruncate){var t=Math.min(Math.floor(this.name.length/2),10);return this.name.substr(this.name.length-t)}return""}}},u=(n(164),Object(s.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"name-parts",attrs:{title:t.name}},[n("span",{staticClass:"name-parts__first"},[t._v(t._s(t.part1))]),t._v(" "),t.part2?n("span",{staticClass:"name-parts__last"},[t._v(t._s(t.part2))]):t._e()])},[],!1,null,"e9d10674",null).exports),d=n(5),p=n(107),f={name:"Multiselect",components:{AvatarSelectOption:c,EllipsisedOption:u,VueMultiselect:n.n(p).a},directives:{tooltip:d.default},inheritAttrs:!1,props:{value:{default:function(){return[]}},multiple:{type:Boolean,default:!1},limit:{type:Number,default:99999},label:{type:String,default:""},trackBy:{type:String,default:""},userSelect:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},autoLimit:{type:Boolean,default:!0},tagWidth:{type:Number,default:150,validator:function(t){return t>0}}},data:function(){return{elWidth:0}},computed:{maxOptions:function(){if(this.autoLimit&&this.elWidth>0&&0!==this.tagWidth){var t=Math.floor(this.elWidth/this.tagWidth);return t>0?t:1}return this.limit?this.limit:9999},limitString:function(){return"+".concat(this.value.length-this.maxOptions)}},watch:{value:function(){this.updateWidth()}},mounted:function(){this.updateWidth(),window.addEventListener("resize",this.updateWidth)},beforeDestroy:function(){window.removeEventListener("resize",this.updateWidth)},methods:{formatLimitTitle:function(t){var e=this;if(Array.isArray(t)&&t.length>0){var n=t;return"object"===r()(t[0])&&(n=t.map(function(t){return t[e.label]})),n.slice(this.maxOptions).join(", ")}return""},updateWidth:function(){this.$el&&(this.elWidth=this.$el.querySelector(".multiselect__tags-wrap").offsetWidth-10)}}},h=Object(s.a)(f,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("VueMultiselect",t._g(t._b({class:[{"icon-loading-small":t.loading},t.multiple?"multiselect--multiple":"multiselect--single"],attrs:{value:t.value,limit:t.maxOptions,"close-on-select":!t.multiple,multiple:t.multiple,label:t.label,"track-by":t.trackBy,"tag-placeholder":"create"},on:{"update:value":function(e){return t.$emit("update:value",t.value)}},scopedSlots:t._u([{key:"option",fn:function(e){return[t.userSelect&&!t.$scopedSlots.option?n("AvatarSelectOption",{attrs:{option:e.option}}):t.$scopedSlots.option?t._t("option",null,null,e):n("EllipsisedOption",{attrs:{option:e.option,label:t.label}})]}},t.multiple?{key:"limit",fn:function(){return[n("span",{directives:[{name:"tooltip",rawName:"v-tooltip.auto",value:t.formatLimitTitle(t.value),expression:"formatLimitTitle(value)",modifiers:{auto:!0}}],staticClass:"multiselect__limit"},[t._v("\n\t\t\t"+t._s(t.limitString)+"\n\t\t")])]},proxy:!0}:null,t.$scopedSlots.singleLabel?{key:"singleLabel",fn:function(e){return[t._t("singleLabel",null,null,e)]}}:null],null,!0)},"VueMultiselect",t.$attrs,!1),t.$listeners))},[],!1,null,null,null).exports;n(166);n.d(e,"Multiselect",function(){return h}),
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
Object(i.a)(h);e.default=h},function(t,e,n){"use strict";n.r(e);var i=n(8),o=n(20),r={name:"ActionCheckbox",mixins:[i.a],props:{id:{type:String,default:function(){return"action-"+Object(o.a)()},validator:function(t){return""!==t.trim()}},checked:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},methods:{checkInput:function(t){this.$refs.label.click()},onChange:function(t){this.$emit("change",t),this.$emit("update:checked",this.$refs.checkbox.checked)}}},a=(n(130),n(0)),s=Object(a.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("span",{staticClass:"action-checkbox",class:{"action-checkbox--disabled":t.disabled}},[n("input",{ref:"checkbox",staticClass:"focusable checkbox action-checkbox__checkbox",attrs:{id:t.id,disabled:t.disabled,type:"checkbox"},domProps:{checked:t.checked},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.checkInput(e))},change:t.onChange}}),t._v(" "),n("label",{ref:"label",staticClass:"action-checkbox__label",attrs:{for:t.id}},[t._v(t._s(t.text))]),t._v(" "),t._e()],2)])},[],!1,null,"2a50ed86",null).exports;n.d(e,"ActionCheckbox",function(){return s});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=s},function(t,e,n){"use strict";n.r(e);var i=n(8),o=n(20),r={name:"ActionInput",mixins:[i.a],props:{id:{type:String,default:function(){return"action-"+Object(o.a)()},validator:function(t){return""!==t.trim()}},icon:{type:String,default:"",required:!0},type:{type:String,default:"text",validator:function(t){return["date","datetime-local","month","number","password","search","tel","text","time","url","week"].indexOf(t)>-1}},value:{type:String,default:""},disabled:{type:Boolean,default:!1}},computed:{isIconUrl:function(){try{return new URL(this.icon)}catch(t){return!1}}},methods:{onInput:function(t){this.$emit("input",t),this.$emit("update:value",t.target.value)},onSubmit:function(t){if(t.preventDefault(),t.stopPropagation(),this.disabled)return!1;this.$emit("submit",t)}}},a=(n(132),n(0)),s=Object(a.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("span",{staticClass:"action-input"},[n("span",{staticClass:"action-input__icon",class:[t.isIconUrl?"action-input__icon--url":t.icon],style:{backgroundImage:t.isIconUrl?"url("+t.icon+")":null}}),t._v(" "),n("form",{ref:"form",staticClass:"action-input__form",attrs:{disabled:t.disabled},on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("input",{staticClass:"action-input__submit",attrs:{id:t.id,type:"submit"}}),t._v(" "),n("input",{staticClass:"action-input__input focusable",attrs:{type:t.type,placeholder:t.text,disabled:t.disabled,required:""},domProps:{value:t.value},on:{input:t.onInput}}),t._v(" "),n("label",{directives:[{name:"show",rawName:"v-show",value:!t.disabled,expression:"!disabled"}],staticClass:"action-input__label",attrs:{for:t.id}})])])])},[],!1,null,"6afd5248",null).exports;n.d(e,"ActionInput",function(){return s});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=s},function(t,e,n){"use strict";n.r(e);var i={name:"ActionLink",mixins:[n(19).a],props:{href:{type:String,default:"#",required:!0,validator:function(t){try{return new URL(t)}catch(e){return t.startsWith("#")||t.startsWith("/")}}},download:{type:String,default:""},target:{type:String,default:"_self",validator:function(t){return["_blank","_self","_parent","_top"].indexOf(t)>-1}}}},o=(n(134),n(0)),r=n(77),a=n.n(r),s=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("a",{staticClass:"action-link focusable",attrs:{download:t.download,href:t.href,target:t.target,rel:"noreferrer noopener"},on:{click:t.onClick}},[n("span",{staticClass:"action-link__icon",class:[t.isIconUrl?"action-link__icon--url":t.icon],style:{backgroundImage:t.isIconUrl?"url("+t.icon+")":null}}),t._v(" "),t.title?n("p",[n("strong",{staticClass:"action-link__title"},[t._v("\n\t\t\t\t"+t._s(t.title)+"\n\t\t\t")]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"action-link__longtext",domProps:{textContent:t._s(t.text)}})]):t.isLongText?n("p",{staticClass:"action-link__longtext",domProps:{textContent:t._s(t.text)}}):n("span",{staticClass:"action-link__text"},[t._v(t._s(t.text))]),t._v(" "),t._e()],2)])},[],!1,null,"3adcef72",null);"function"==typeof a.a&&a()(s);var c=s.exports;n.d(e,"ActionLink",function(){return c});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=c},function(t,e,n){"use strict";n.r(e);var i={name:"ActionRouter",mixins:[n(19).a],props:{to:{type:[String,Object],default:"",required:!0},exact:{type:Boolean,default:!1}}},o=(n(136),n(0)),r=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("router-link",{staticClass:"action-router focusable",attrs:{to:t.to,exact:t.exact,rel:"noreferrer noopener"}},[n("span",{staticClass:"action-router__icon",class:[t.isIconUrl?"action-router__icon--url":t.icon],style:{backgroundImage:t.isIconUrl?"url("+t.icon+")":null}}),t._v(" "),t.title?n("p",[n("strong",{staticClass:"action-router__title"},[t._v("\n\t\t\t\t"+t._s(t.title)+"\n\t\t\t")]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"action-router__longtext",domProps:{textContent:t._s(t.text)}})]):t.isLongText?n("p",{staticClass:"action-router__longtext",domProps:{textContent:t._s(t.text)}}):n("span",{staticClass:"action-router__text"},[t._v(t._s(t.text))]),t._v(" "),t._e()],2)],1)},[],!1,null,"4b10ba60",null).exports;n.d(e,"ActionRouter",function(){return r});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i={name:"ActionText",mixins:[n(19).a],props:{disabled:{type:Boolean,default:!1}}},o=(n(138),n(0)),r=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("span",{staticClass:"action-text"},[n("span",{staticClass:"action-text__icon",class:[t.isIconUrl?"action-text__icon--url":t.icon],style:{backgroundImage:t.isIconUrl?"url("+t.icon+")":null}}),t._v(" "),t.title?n("p",[n("strong",{staticClass:"action-text__title"},[t._v("\n\t\t\t\t"+t._s(t.title)+"\n\t\t\t")]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"action-text__longtext",domProps:{textContent:t._s(t.text)}})]):t.isLongText?n("p",{staticClass:"action-text__longtext",domProps:{textContent:t._s(t.text)}}):n("span",{staticClass:"action-text__text"},[t._v(t._s(t.text))]),t._v(" "),t._e()],2)])},[],!1,null,"02357c5a",null).exports;n.d(e,"ActionText",function(){return r});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i=n(35),o=n.n(i),r={name:"AppContent",components:{AppNavigationToggle:n(76).default},data:function(){return{opened:!1}},mounted:function(){var t=this;this.mc=new o.a(this.$el,{cssProps:{userSelect:"text"}}),this.mc.on("swipeleft swiperight",function(e){t.handleSwipe(e)})},unmounted:function(){this.mc.off("swipeleft swiperight"),this.mc.destroy()},methods:{toggleNavigation:function(t){this.opened=t||!this.opened,this.opened?document.body.classList.add("nav-open"):document.body.classList.remove("nav-open")},handleSwipe:function(t){var e=t.srcEvent.pageX-t.deltaX,n=Math.abs(t.deltaX)>70;n&&e<40?this.toggleNavigation(!0):this.opened&&n&&e<340&&this.toggleNavigation(!1)}}},a=(n(140),n(0)),s=Object(a.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"no-snapper",style:this.opened?"transform: translateX(300px)":"",attrs:{id:"app-content"}},[e("AppNavigationToggle",{attrs:{"aria-expanded":this.opened,"aria-controls":"app-navigation"},on:{click:this.toggleNavigation}}),this._v(" "),this._t("default")],2)},[],!1,null,"0fe2f738",null).exports;n.d(e,"AppContent",function(){return s});
/*
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=s},function(t,e,n){"use strict";n.r(e);var i={name:"AppContentDetails"},o=n(0),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"app-content-details"},[this._t("default")],2)},[],!1,null,null,null).exports;n.d(e,"AppContentDetails",function(){return r});
/*
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i={name:"AppContentList",props:{selection:{type:Boolean,default:!1},showDetails:{type:Boolean,default:!1}}},o=n(0),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"app-content-list",class:{selection:this.selection,showdetails:this.showDetails}},[this._t("default")],2)},[],!1,null,null,null).exports;n.d(e,"AppContentList",function(){return r});
/*
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i={name:"AppNavigation"},o=(n(142),n(0)),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"app-navigation"}},[this._t("default")],2)},[],!1,null,null,null).exports;n.d(e,"AppNavigation",function(){return r});
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i={name:"AppNavigationCaption",props:{text:{type:String,required:!0}}},o=(n(144),n(0)),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"app-navigation-caption--item"},[this._v("\n\t"+this._s(this.text)+"\n")])},[],!1,null,"9639e4a4",null).exports;n.d(e,"AppNavigationCaption",function(){return r});e.default=r},function(t,e,n){"use strict";n.r(e);var i=n(23),o=n(6),r=n.n(o),a={name:"AppNavigationItem",components:{PopoverMenu:i.PopoverMenu},directives:{ClickOutside:r.a},props:{item:{type:Object,required:!0},open:{type:Boolean,default:!1},menuOpen:{type:Boolean,default:!1}},data:function(){return{opened:this.open,openedMenu:this.menuOpen}},computed:{collapsible:function(){return this.item.collapsible&&this.item.children&&this.item.children.length>0},simpleAction:function(){return this.collapsible&&!this.item.action?this.toggleCollapse:this.item.action}},watch:{open:function(t){this.opened=t},menuOpen:function(t){this.openedMenu=t}},mounted:function(){this.popupItem=this.$el},methods:{hideMenu:function(){this.openedMenu=!1,this.$emit("update:menuOpen",this.openedMenu)},toggleMenu:function(){this.openedMenu=!this.openedMenu,this.$emit("update:menuOpen",this.openedMenu)},toggleCollapse:function(){this.opened=!this.opened,this.$emit("update:open",this.opened)},callPreventStop:function(t,e){t&&(e.preventDefault(),e.stopPropagation(),t())},cancelEdit:function(t){Array.isArray(this.item.classes)&&(this.item.classes=this.item.classes.filter(function(t){return"editing"!==t})),this.item.edit.reset(t)},navElement:function(t){if(t.router){var e=t.router.exact;return void 0===t.router.exact&&(e=!0),{is:"router-link",tag:"li",to:t.router,exact:e}}return{is:"li"}}}},s=n(0),c=Object(s.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav-element",t._b({class:[{"icon-loading-small":t.item.loading,open:t.opened,collapsible:t.collapsible},t.item.classes],attrs:{id:t.item.id,title:t.item.title}},"nav-element",t.navElement(t.item),!1),[t.item.bullet?n("div",{staticClass:"app-navigation-entry-bullet",style:{backgroundColor:t.item.bullet}}):t._e(),t._v(" "),t.collapsible?n("button",{staticClass:"collapse",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.toggleCollapse(e)}}}):t._e(),t._v(" "),n("a",{class:t.item.icon,attrs:{href:t.item.href?t.item.href:"#"},on:{click:function(e){return t.callPreventStop(t.simpleAction,e)}}},[t.item.iconUrl?n("img",{attrs:{alt:t.item.text,src:t.item.iconUrl}}):t._e(),t._v("\n\t\t"+t._s(t.item.text)+"\n\t")]),t._v(" "),t.item.utils?n("div",{staticClass:"app-navigation-entry-utils"},[n("ul",[Number.isInteger(t.item.utils.counter)&&t.item.utils.counter>0?n("li",{staticClass:"app-navigation-entry-utils-counter",class:{highlighted:t.item.utils.counter_highlighted}},[n("span",[t._v(t._s(t.item.utils.counter))])]):t._e(),t._v(" "),t.item.utils.actions&&1===t.item.utils.actions.length?n("li",{staticClass:"app-navigation-entry-utils-menu-button"},[n("button",{class:t.item.utils.actions[0].icon,attrs:{title:t.item.utils.actions[0].text},on:{click:t.item.utils.actions[0].action}})]):t.item.utils.actions&&t.item.utils.actions.length>1?n("li",{staticClass:"app-navigation-entry-utils-menu-button"},[n("button",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.hideMenu,expression:"hideMenu"}],on:{click:t.toggleMenu}})]):t._e()])]):t._e(),t._v(" "),t.item.utils&&t.item.utils.actions&&t.item.utils.actions.length>1?n("div",{staticClass:"app-navigation-entry-menu",class:{open:t.openedMenu}},[n("PopoverMenu",{attrs:{menu:t.item.utils.actions}})],1):t._e(),t._v(" "),t.item.undo?n("div",{staticClass:"app-navigation-entry-deleted"},[n("div",{staticClass:"app-navigation-entry-deleted-description"},[t._v("\n\t\t\t"+t._s(t.item.undo.text)+"\n\t\t")]),t._v(" "),n("button",{staticClass:"app-navigation-entry-deleted-button icon-history",attrs:{title:t.t("settings","Undo")}})]):t._e(),t._v(" "),t.item.edit?n("div",{staticClass:"app-navigation-entry-edit"},[n("form",{on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.item.edit.action(e)}}},[n("input",{attrs:{placeholder:t.item.edit.text,type:"text"}}),t._v(" "),n("input",{staticClass:"icon-confirm",attrs:{type:"submit",value:""}}),t._v(" "),n("input",{staticClass:"icon-close",attrs:{type:"submit",value:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.cancelEdit(e)}}})])]):t._e(),t._v(" "),t.item.children?n("ul",t._l(t.item.children,function(t,e){return n("app-navigation-item",{key:e,attrs:{item:t}})}),1):t._e()])},[],!1,null,null,null).exports;n.d(e,"AppNavigationItem",function(){return c});
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=c},function(t,e,n){"use strict";n.r(e);var i={props:{buttonId:{type:String,required:!1,default:""},buttonClass:{type:[String,Array,Object],required:!1,default:""},disabled:{type:Boolean,required:!1,default:!1},text:{type:String,required:!0}}},o=n(0),r=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-navigation-new"},[n("button",{class:t.buttonClass,attrs:{id:t.buttonId,type:"button",disabled:t.disabled},on:{click:function(e){return t.$emit("click")}}},[t._v("\n\t\t"+t._s(t.text)+"\n\t")])])},[],!1,null,null,null).exports;n.d(e,"AppNavigationNew",function(){return r});
/*
 * @copyright 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(e,n,i){"use strict";i.r(n);var o=i(6),r={directives:{ClickOutside:i.n(o).a},props:{title:{type:String,required:!1,default:t("core","Settings")}},data:function(){return{open:!1}},methods:{toggleMenu:function(){this.open=!this.open},closeMenu:function(){this.open=!1}}},a=(i(146),i(0)),s=Object(a.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],class:{open:t.open},attrs:{id:"app-settings"}},[n("div",{attrs:{id:"app-settings-header"}},[n("button",{staticClass:"settings-button",on:{click:t.toggleMenu}},[t._v("\n\t\t\t"+t._s(t.title)+"\n\t\t")])]),t._v(" "),n("transition",{attrs:{name:"slide-up"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],attrs:{id:"app-settings-content"}},[t._t("default")],2)])],1)},[],!1,null,"7f13ea43",null).exports;i.d(n,"AppNavigationSettings",function(){return s});
/*
 * @copyright 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */n.default=s},function(t,e,n){"use strict";n.r(e);var i={name:"AppNavigationSpacer"},o=(n(148),n(0)),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"app-navigation-spacer"})},[],!1,null,"18241e10",null).exports;n.d(e,"AppNavigationSpacer",function(){return r});
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i=n(4),o=n.n(i),r=n(29),a=function(t){return t&&"string"==typeof t&&""!==t.trim()&&-1===t.indexOf(" ")},s={name:"AppSidebar",components:{Actions:r.default},props:{active:{type:String,default:""},title:{type:String,default:"",required:!0},subtitle:{type:String,default:""},background:{type:String,default:""},starred:{type:Boolean,default:null},starLoading:{type:Boolean,default:!1},compact:{type:Boolean,default:!1}},data:function(){return{tabs:[],activeTab:"",isStarred:this.starred}},computed:{canStar:function(){return null!==this.isStarred},hasFigure:function(){return this.$slots.header||this.background},hasMultipleTabs:function(){return this.tabs.length>1},hasFigureClickListener:function(){return this.$listeners["figure-click"]},currentTabIndex:function(){var t=this;return this.tabs.findIndex(function(e){return e.id===t.activeTab})}},watch:{active:function(t){t!==this.activeTab&&this.updateActive()},starred:function(){this.isStarred=this.starred}},mounted:function(){this.updateTabs()},methods:{closeSidebar:function(t){this.$emit("close",t)},onFigureClick:function(t){this.$emit("figure-click",t)},setActive:function(t){var e=t.target.closest("a").dataset.id;this.activeTab=e,this.$emit("update:active",e)},focusPreviousTab:function(){this.currentTabIndex>0&&(this.activeTab=this.tabs[this.currentTabIndex-1].id,this.$emit("update:active",this.activeTab)),this.focusActiveTab()},focusNextTab:function(){this.currentTabIndex<this.tabs.length-1&&(this.activeTab=this.tabs[this.currentTabIndex+1].id,this.$emit("update:active",this.activeTab)),this.focusActiveTab()},focusFirstTab:function(){this.activeTab=this.tabs[0].id,this.$emit("update:active",this.activeTab),this.focusActiveTab()},focusLastTab:function(){this.activeTab=this.tabs[this.tabs.length-1].id,this.$emit("update:active",this.activeTab),this.focusActiveTab()},focusActiveTab:function(){this.$el.querySelector("#"+this.activeTab).focus()},focusActiveTabContent:function(){this.$el.querySelector("#tab-"+this.activeTab).focus()},updateActive:function(){var t=this;this.activeTab=this.active&&-1!==this.tabs.findIndex(function(e){return e.id===t.active})?this.active:this.tabs.length>0?this.tabs[0].id:""},toggleStarred:function(){this.isStarred=!this.isStarred,this.$emit("update:starred",this.isStarred)},updateTabs:function(){var t=this.$children.reduce(function(t,e){return e.name&&"string"==typeof e.name?a(e.id)?a(e.icon)?(t.push(e),t):(o.a.util.warn("This tab is missing a valid icon: ".concat(e.icon),e),t):(o.a.util.warn("This tab is missing a valid id: ".concat(e.id),e),t):(o.a.util.warn("This tab is missing a valid name: ".concat(e.name),e),t)},[]);this.tabs=t.sort(function(t,e){var n=t.order||0,i=e.order||0;return n===i?OC.Util.naturalSortCompare(t.name,e.name):n-i}),this.tabs.length>0&&this.updateActive()}}},c=(n(150),n(152),n(0)),l=Object(c.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"slide-right"}},[n("aside",{attrs:{id:"app-sidebar"}},[n("header",{staticClass:"app-sidebar-header",class:{"app-sidebar-header--with-figure":t.hasFigure,"app-sidebar-header--compact":t.compact}},[n("a",{staticClass:"icon-close",attrs:{href:"#",title:t.t("core","close")},on:{click:t.closeSidebar}}),t._v(" "),t.hasFigure?n("div",{staticClass:"app-sidebar-header__figure",class:{"app-sidebar-header__figure--with-action":t.hasFigureClickListener},style:{backgroundImage:"url("+t.background+")"},on:{click:t.onFigureClick}},[t._t("header")],2):t._e(),t._v(" "),n("div",{staticClass:"app-sidebar-header__desc",class:{"app-sidebar-header__desc--with-star":t.canStar,"app-sidebar-header__desc--with-subtitle":t.subtitle}},[t.canStar?n("a",{staticClass:"app-sidebar-header__star",class:{"icon-starred":t.isStarred&&!t.starLoading,"icon-star":!t.isStarred&&!t.starLoading,"icon-loading-small":t.starLoading},on:{click:function(e){return e.preventDefault(),t.toggleStarred(e)}}}):t._e(),t._v(" "),n("h3",{staticClass:"app-sidebar-header__title"},[t._v("\n\t\t\t\t\t"+t._s(t.title)+"\n\t\t\t\t")]),t._v(" "),""!==t.subtitle.trim()?n("h4",{staticClass:"app-sidebar-header__subtitle"},[t._v("\n\t\t\t\t\t"+t._s(t.subtitle)+"\n\t\t\t\t")]):t._e(),t._v(" "),t.$slots["secondary-actions"]?n("Actions",{staticClass:"app-sidebar-header__menu"},[t._t("secondary-actions")],2):t._e()],1),t._v(" "),t.$slots["primary-actions"]?n("div",{staticClass:"app-sidebar-header__action"},[t._t("primary-actions")],2):t._e()]),t._v(" "),t.hasMultipleTabs?n("nav",{staticClass:"app-sidebar-tabs__nav",on:{keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])?null:"button"in e&&0!==e.button?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusPreviousTab(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])?null:"button"in e&&2!==e.button?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusNextTab(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusActiveTabContent(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"page-up",void 0,e.key,void 0)?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusFirstTab(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"page-down",void 0,e.key,void 0)?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusLastTab(e))}]}},[n("ul",t._l(t.tabs,function(e){return n("li",{key:e.id,staticClass:"app-sidebar-tabs__tab"},[n("a",{class:{active:t.activeTab===e.id},attrs:{id:e.id,"aria-controls":"tab-"+e.id,"aria-selected":t.activeTab===e.id,"data-id":e.id,href:"#tab-"+e.id,tabindex:t.activeTab===e.id?null:-1,role:"tab"},on:{click:function(e){return e.preventDefault(),t.setActive(e)}}},[n("span",{staticClass:"app-sidebar-tabs__tab-icon",class:e.icon}),t._v("\n\t\t\t\t\t\t"+t._s(e.name)+"\n\t\t\t\t\t")])])}),0)]):t._e(),t._v(" "),n("div",{staticClass:"app-sidebar-tabs__content",class:{"app-sidebar-tabs__content--multiple":t.hasMultipleTabs}},[t._t("default",null,{activeTab:t.activeTab})],2)])])},[],!1,null,"625289d6",null).exports;n.d(e,"AppSidebar",function(){return l});
/*
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=l},function(t,e,n){"use strict";n.r(e);var i={name:"AppSidebarTab",props:{name:{type:String,default:"",required:!0},icon:{type:String,default:"",required:!0}},computed:{id:function(){return this.name.toLowerCase().replace(/ /g,"-")},isActive:function(){return this.$parent.activeTab===this.id}}},o=(n(154),n(0)),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("section",{directives:[{name:"show",rawName:"v-show",value:this.isActive,expression:"isActive"}],attrs:{id:"tab-"+this.id,"aria-hidden":!this.isActive,"aria-labelledby":this.name,tabindex:"0",role:"tabpanel"}},[this._t("default")],2)},[],!1,null,"067ef8fa",null).exports;n.d(e,"AppSidebarTab",function(){return r});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i={props:{appName:{type:String,required:!0}}},o=n(0),r=Object(o.a)(i,function(){var t=this.$createElement;return(this._self._c||t)("div",{class:"app-"+this.appName,attrs:{id:"content"}},[this._t("default")],2)},[],!1,null,null,null).exports;n.d(e,"Content",function(){return r});
/*
 * @copyright 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */e.default=r},function(t,e,n){"use strict";n.r(e);var i=n(24),o=n(61),r=n.n(o);r.a.components.CalendarPanel.components.PanelTime.methods.stringifyText=function(t){return t},r.a.methods.displayPopup=function(){var t=this.$el.querySelector(".mx-datepicker-popup");t&&!t.classList.contains("popovermenu")&&(t.className+=" popovermenu menu-center open")};var a={name:"DatetimePicker",components:{DatePicker:r.a},inheritAttrs:!1,props:{value:{default:function(){return new Date}}},methods:{handleSelectYear:function(t){if(this.value)try{var e=new Date(new Date(this.value).setFullYear(t));this.$refs.datepicker.selectDate(e)}catch(e){console.error("Invalid value",this.value,t)}},handleSelectMonth:function(t){if(this.value)try{var e=new Date(new Date(this.value).setMonth(t));this.$refs.datepicker.selectDate(e)}catch(e){console.error("Invalid value",this.value,t)}}}},s=n(0),c=Object(s.a)(a,function(){var t=this,e=t.$createElement;return(t._self._c||e)("DatePicker",t._g(t._b({ref:"datepicker",attrs:{clearable:!1,"minute-step":10,value:t.value},on:{"select-year":t.handleSelectYear,"select-month":t.handleSelectMonth,"update:value":function(e){return t.$emit("update:value",t.value)}}},"DatePicker",t.$attrs,!1),t.$listeners))},[],!1,null,null,null).exports;n(156);n.d(e,"DatetimePicker",function(){return c}),
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
Object(i.a)(c);e.default=c},function(e,n,i){"use strict";i.r(n);var o=i(24),r=i(35),a=i.n(r),s=i(29),c=i(60),l=i(5),u={name:"Modal",components:{Actions:s.default,ActionButton:c.default},directives:{tooltip:l.default},props:{title:{type:String,default:""},hasPrevious:{type:Boolean,default:!1},hasNext:{type:Boolean,default:!1},outTransition:{type:Boolean,default:!1},enableSlideshow:{type:Boolean,default:!1},clearViewDelay:{type:Number,default:5e3},slideshowDelay:{type:Number,default:3e3},enableSwipe:{type:Boolean,default:!0},spreadNavigation:{type:Boolean,default:!1},size:{type:String,default:"normal",validator:function(t){return-1!==["normal","large","full"].indexOf(t)}},canClose:{type:Boolean,default:!0}},data:function(){return{mc:null,showModal:!1,clearView:!1,clearViewTimeout:null,playing:!1,slideshowTimeout:null}},computed:{modalTransitionName:function(){return"modal-".concat(this.outTransition?"out":"in")},playPauseTitle:function(){return this.playing?t("core","Pause slideshow"):t("core","Start slideshow")}},beforeMount:function(){window.addEventListener("keydown",this.handleKeydown)},beforeDestroy:function(){window.removeEventListener("keydown",this.handleKeydown)},mounted:function(){var t=this;this.showModal=!0,this.handleMouseMove(),this.mc=new a.a(this.$refs.mask),this.mc.on("swipeleft swiperight",function(e){t.handleSwipe(e)}),document.body.insertBefore(this.$el,document.body.lastChild)},unmounted:function(){this.mc.off("swipeleft swiperight"),this.mc.destroy()},methods:{previous:function(t){this.hasPrevious&&(t&&this.resetSlideshow(),this.$emit("previous",t))},next:function(t){this.hasNext&&(t&&this.resetSlideshow(),this.$emit("next",t))},close:function(t){var e=this;this.canClose&&(this.showModal=!1,setTimeout(function(){e.$emit("close",t)},300))},handleKeydown:function(t){switch(t.keyCode){case 37:this.previous(t);break;case 13:case 39:this.next(t);break;case 27:this.close(t)}},handleSwipe:function(t){this.enableSwipe&&("swipeleft"===t.type?this.next(t):"swiperight"===t.type&&this.previous(t))},handleMouseMove:function(){var t=this;this.clearViewDelay>0&&(this.clearView=!1,clearTimeout(this.clearViewTimeout),this.clearViewTimeout=setTimeout(function(){t.clearView=!0},this.clearViewDelay))},togglePlayPause:function(){this.playing=!this.playing,this.playing?this.handleSlideshow():clearTimeout(this.slideshowTimeout)},resetSlideshow:function(){this.playing=!this.playing,clearTimeout(this.slideshowTimeout),this.$nextTick(function(){this.togglePlayPause()})},handleSlideshow:function(){var t=this;this.playing=!0,this.hasNext?this.slideshowTimeout=setTimeout(function(){t.next(),t.handleSlideshow()},this.slideshowDelay):(this.playing=!1,clearTimeout(this.slideshowTimeout))}}},d=(i(158),i(160),i(0)),p=i(78),f=i.n(p),h=Object(d.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"}},[n("div",{ref:"mask",staticClass:"modal-mask",on:{click:t.handleMouseMove,mousemove:t.handleMouseMove,touchmove:t.handleMouseMove}},[n("transition",{attrs:{name:"fade-visibility"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.clearView,expression:"!clearView"}],staticClass:"modal-header",class:{invisible:t.clearView}},[""!==t.title.trim()?n("div",{staticClass:"modal-title"},[t._v("\n\t\t\t\t\t"+t._s(t.title)+"\n\t\t\t\t")]):t._e(),t._v(" "),n("div",{staticClass:"icons-menu"},[n("Actions",{staticClass:"header-actions"},[t._t("actions")],2),t._v(" "),t.hasNext&&t.enableSlideshow?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip.auto",value:t.playPauseTitle,expression:"playPauseTitle",modifiers:{auto:!0}}],staticClass:"play-pause",on:{click:t.togglePlayPause}},[n("div",{class:[t.playing?"icon-pause":"icon-play"]},[n("span",{staticClass:"hidden-visually"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.playPauseTitle)+"\n\t\t\t\t\t\t\t")])]),t._v(" "),t.playing?n("svg",{staticClass:"progress-ring",attrs:{height:"50",width:"50"}},[n("circle",{staticClass:"progress-ring__circle",attrs:{stroke:"white","stroke-width":"2",fill:"transparent",r:"15",cx:"25",cy:"25"}})]):t._e()]):t._e(),t._v(" "),t.canClose?n("Actions",{staticClass:"header-close"},[n("ActionButton",{attrs:{icon:"icon-close"},on:{click:t.close}},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.t("core","Close"))+"\n\t\t\t\t\t\t")])],1):t._e()],1)])]),t._v(" "),n("transition",{attrs:{name:t.modalTransitionName}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showModal,expression:"showModal"}],staticClass:"modal-wrapper",class:["modal-wrapper--"+t.size,t.spreadNavigation?"modal-wrapper--spread-navigation":""],on:{click:function(e){return e.target!==e.currentTarget?null:t.close(e)}}},[n("transition",{attrs:{name:"fade-visibility"}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t.hasPrevious&&!t.clearView,expression:"hasPrevious && !clearView"}],staticClass:"prev",class:{invisible:t.clearView||!t.hasPrevious},on:{click:t.previous}},[n("div",{staticClass:"icon icon-previous"},[n("span",{staticClass:"hidden-visually"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.t("core","Previous"))+"\n\t\t\t\t\t\t\t")])])])]),t._v(" "),n("div",{staticClass:"modal-container"},[t._t("default")],2),t._v(" "),n("transition",{attrs:{name:"fade-visibility"}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t.hasNext&&!t.clearView,expression:"hasNext && !clearView"}],staticClass:"next",class:{invisible:t.clearView||!t.hasNext},on:{click:t.next}},[n("div",{staticClass:"icon icon-next"},[n("span",{staticClass:"hidden-visually"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.t("core","Next"))+"\n\t\t\t\t\t\t\t")])])])])],1)])],1)])},[],!1,null,"1ba9fc2e",null);"function"==typeof f.a&&f()(h);var A=h.exports;i.d(n,"Modal",function(){return A}),
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
Object(o.a)(A);n.default=A},function(t,e,n){"use strict";var i=n(42);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-2a50ed86]:hover, li.active[data-v-2a50ed86] {\n  box-shadow: inset 4px 0 var(--color-primary);\n}\n.action-checkbox[data-v-2a50ed86] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  white-space: nowrap;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  line-height: 44px;\n  /* checkbox/radio fixes */\n}\n.action-checkbox__checkbox[data-v-2a50ed86] {\n    position: absolute;\n    top: auto;\n    left: -10000px;\n    overflow: hidden;\n    width: 1px;\n    height: 1px;\n}\n.action-checkbox__checkbox:focus + .action-checkbox__label[data-v-2a50ed86] {\n      opacity: 1;\n}\n.action-checkbox__label[data-v-2a50ed86] {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    padding: 0 !important;\n    padding-right: 14px;\n    opacity: 0.7;\n}\n.action-checkbox__label[data-v-2a50ed86]::before {\n      margin: 0 14px 0 !important;\n}\n.action-checkbox--disabled[data-v-2a50ed86],\n  .action-checkbox--disabled .action-checkbox__label[data-v-2a50ed86] {\n    cursor: pointer;\n}\n.action-checkbox:not(.action-checkbox--disabled):hover .action-checkbox__label[data-v-2a50ed86], .action-checkbox:not(.action-checkbox--disabled):focus .action-checkbox__label[data-v-2a50ed86] {\n    opacity: 1;\n}\n',""])},function(t,e,n){"use strict";var i=n(43);n.n(i).a},function(t,e,n){e=t.exports=n(1)(!1);var i=n(11),o=i(n(12)),r=i(n(13)),a=i(n(14)),s=i(n(15));e.push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n@font-face {\n  font-family: "iconfont-vue";\n  src: url('+o+");\n  /* IE9 Compat Modes */\n  src: url("+o+') format("embedded-opentype"), url('+r+') format("woff"), url('+a+') format("truetype"), url('+s+') format("svg");\n  /* Legacy iOS */\n}\n.icon[data-v-6afd5248] {\n  font-style: normal;\n  font-weight: 400;\n}\n.icon.arrow-left-double[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-left[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right-double[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.close[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm-fade[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.menu[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.more[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.pause[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.play[data-v-6afd5248]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n * color-text-lighter\t\tnormal state\n * color-text-lighter\t\tactive state\n * color-text-maxcontrast \tdisabled state\n */\n/* Default global values */\nbutton[data-v-6afd5248],\ninput[data-v-6afd5248]:not([type=\'range\']),\ntextarea[data-v-6afd5248] {\n  margin: 0;\n  padding: 7px 6px;\n  cursor: text;\n  color: var(--color-text-lighter);\n  border: 1px solid var(--color-border-dark);\n  border-radius: var(--border-radius);\n  outline: none;\n  background-color: var(--color-main-background);\n  font-size: 13px;\n  /* Primary action button, use sparingly */\n}\nbutton[data-v-6afd5248]:not(:disabled):not(.primary):hover, button[data-v-6afd5248]:not(:disabled):not(.primary):focus, button:not(:disabled):not(.primary).active[data-v-6afd5248],\n  input[data-v-6afd5248]:not([type=\'range\']):not(:disabled):not(.primary):hover,\n  input[data-v-6afd5248]:not([type=\'range\']):not(:disabled):not(.primary):focus,\n  input:not([type=\'range\']):not(:disabled):not(.primary).active[data-v-6afd5248],\n  textarea[data-v-6afd5248]:not(:disabled):not(.primary):hover,\n  textarea[data-v-6afd5248]:not(:disabled):not(.primary):focus,\n  textarea:not(:disabled):not(.primary).active[data-v-6afd5248] {\n    /* active class used for multiselect */\n    border-color: var(--color-primary-element);\n    outline: none;\n}\nbutton[data-v-6afd5248]:not(:disabled):not(.primary):active,\n  input[data-v-6afd5248]:not([type=\'range\']):not(:disabled):not(.primary):active,\n  textarea[data-v-6afd5248]:not(:disabled):not(.primary):active {\n    color: var(--color-text-light);\n    outline: none;\n    background-color: var(--color-main-background);\n}\nbutton[data-v-6afd5248]:disabled,\n  input[data-v-6afd5248]:not([type=\'range\']):disabled,\n  textarea[data-v-6afd5248]:disabled {\n    cursor: default;\n    opacity: 0.5;\n    color: var(--color-text-maxcontrast);\n    background-color: var(--color-background-dark);\n}\nbutton[data-v-6afd5248]:required,\n  input[data-v-6afd5248]:not([type=\'range\']):required,\n  textarea[data-v-6afd5248]:required {\n    box-shadow: none;\n}\nbutton[data-v-6afd5248]:invalid,\n  input[data-v-6afd5248]:not([type=\'range\']):invalid,\n  textarea[data-v-6afd5248]:invalid {\n    border-color: var(--color-error);\n    box-shadow: none !important;\n}\nbutton.primary[data-v-6afd5248],\n  input:not([type=\'range\']).primary[data-v-6afd5248],\n  textarea.primary[data-v-6afd5248] {\n    cursor: pointer;\n    color: var(--color-primary-text);\n    border-color: var(--color-primary-element);\n    background-color: var(--color-primary-element);\n}\nbutton.primary[data-v-6afd5248]:not(:disabled):hover, button.primary[data-v-6afd5248]:not(:disabled):focus, button.primary[data-v-6afd5248]:not(:disabled):active,\n    input:not([type=\'range\']).primary[data-v-6afd5248]:not(:disabled):hover,\n    input:not([type=\'range\']).primary[data-v-6afd5248]:not(:disabled):focus,\n    input:not([type=\'range\']).primary[data-v-6afd5248]:not(:disabled):active,\n    textarea.primary[data-v-6afd5248]:not(:disabled):hover,\n    textarea.primary[data-v-6afd5248]:not(:disabled):focus,\n    textarea.primary[data-v-6afd5248]:not(:disabled):active {\n      border-color: var(--color-primary-element-light);\n      background-color: var(--color-primary-element-light);\n}\nbutton.primary[data-v-6afd5248]:not(:disabled):active,\n    input:not([type=\'range\']).primary[data-v-6afd5248]:not(:disabled):active,\n    textarea.primary[data-v-6afd5248]:not(:disabled):active {\n      color: var(--color-primary-text-dark);\n}\nbutton.primary[data-v-6afd5248]:disabled,\n    input:not([type=\'range\']).primary[data-v-6afd5248]:disabled,\n    textarea.primary[data-v-6afd5248]:disabled {\n      cursor: default;\n      color: var(--color-primary-text-dark);\n      background-color: var(--color-primary-element);\n}\n\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-6afd5248]:hover, li.active[data-v-6afd5248] {\n  box-shadow: inset 4px 0 var(--color-primary);\n}\n.action-input[data-v-6afd5248] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  white-space: nowrap;\n  opacity: 0.7;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  line-height: 44px;\n  /* Inputs inside popover supports text, submit & reset */\n}\n.action-input[data-v-6afd5248]:hover, .action-input[data-v-6afd5248]:focus {\n    opacity: 1;\n}\n.action-input > span[data-v-6afd5248] {\n    cursor: pointer;\n    white-space: nowrap;\n}\n.action-input__icon[data-v-6afd5248] {\n    min-width: 0;\n    /* Overwrite icons*/\n    min-height: 0;\n    /* Keep padding to define the width to\n\t\t\tassure correct position of a possible text */\n    padding: 22px 0 22px 44px;\n    background-position: 14px center;\n    background-size: 16px;\n}\n.action-input__form[data-v-6afd5248] {\n    display: flex;\n    align-items: center;\n    flex: 1 1 auto;\n    margin: 4px 0;\n    padding-right: 14px;\n}\n.action-input__submit[data-v-6afd5248] {\n    position: absolute;\n    left: -10000px;\n    top: auto;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n}\n.action-input__label[data-v-6afd5248] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 36px;\n    height: 36px;\n    margin: 0 0 0 -8px;\n    padding: 7px 6px;\n    cursor: pointer;\n    opacity: 1;\n    color: var(--color-text-lighter);\n    border: 1px solid var(--color-border-dark);\n    border-left-color: transparent;\n    border-radius: 0 var(--border-radius) var(--border-radius) 0;\n    /* Avoid background under border */\n    background-color: var(--color-main-background);\n    background-clip: padding-box;\n    font-size: 16px;\n}\n.action-input__label[data-v-6afd5248]:before {\n      font-family: "iconfont-vue";\n      font-style: normal;\n      font-weight: 400;\n      content: "";\n}\n.action-input__input[data-v-6afd5248] {\n    flex: 1 1 auto;\n    min-width: 132px;\n    min-height: 36px;\n    /* twice the element margin-y */\n    max-height: 36px;\n    /* twice the element margin-y */\n    margin: 0;\n    /* only show confirm borders if input is not focused */\n}\n.action-input__input[data-v-6afd5248]:disabled {\n      cursor: default;\n}\n.action-input__input:not(:active):not(:hover):not(:focus):invalid + .action-input__label[data-v-6afd5248] {\n      border-color: var(--color-error);\n      border-left-color: transparent;\n}\n.action-input__input:not(:active):not(:hover):not(:focus):not(:disabled) + .action-input__label[data-v-6afd5248]:active, .action-input__input:not(:active):not(:hover):not(:focus):not(:disabled) + .action-input__label[data-v-6afd5248]:hover, .action-input__input:not(:active):not(:hover):not(:focus):not(:disabled) + .action-input__label[data-v-6afd5248]:focus {\n      border-color: var(--color-primary-element);\n      border-radius: var(--border-radius);\n}\n.action-input__input:active:not(:disabled) + .action-input__label[data-v-6afd5248], .action-input__input:hover:not(:disabled) + .action-input__label[data-v-6afd5248], .action-input__input:focus:not(:disabled) + .action-input__label[data-v-6afd5248] {\n      /* above previous input */\n      z-index: 2;\n      border-color: var(--color-primary-element);\n      border-left-color: transparent;\n}\nli:last-child > .action-input[data-v-6afd5248] {\n  margin-bottom: 10px;\n}\nli:first-child > .action-input[data-v-6afd5248] {\n  margin-top: 10px;\n}\n',""])},function(t,e,n){"use strict";var i=n(44);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-3adcef72]:hover, li.active[data-v-3adcef72] {\n  box-shadow: inset 4px 0 var(--color-primary);\n}\n.action-link[data-v-3adcef72] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-right: 14px;\n  cursor: pointer;\n  white-space: nowrap;\n  opacity: 0.7;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  line-height: 44px;\n}\n.action-link[data-v-3adcef72]:hover, .action-link[data-v-3adcef72]:focus {\n    opacity: 1;\n}\n.action-link > span[data-v-3adcef72] {\n    cursor: pointer;\n    white-space: nowrap;\n}\n.action-link__icon[data-v-3adcef72] {\n    width: 44px;\n    height: 44px;\n    opacity: 1;\n    background-position: 14px center;\n    background-size: 16px;\n}\n.action-link p[data-v-3adcef72] {\n    width: 150px;\n    padding: 7px 0;\n    cursor: pointer;\n    text-align: left;\n    line-height: 1.6em;\n}\n.action-link__longtext[data-v-3adcef72] {\n    cursor: pointer;\n    white-space: pre-wrap;\n}\n.action-link__title[data-v-3adcef72] {\n    font-weight: bold;\n}\n',""])},function(t,e,n){"use strict";var i=n(45);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-4b10ba60]:hover, li.active[data-v-4b10ba60] {\n  box-shadow: inset 4px 0 var(--color-primary);\n}\n.action-router[data-v-4b10ba60] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-right: 14px;\n  cursor: pointer;\n  white-space: nowrap;\n  opacity: 0.7;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  line-height: 44px;\n}\n.action-router[data-v-4b10ba60]:hover, .action-router[data-v-4b10ba60]:focus {\n    opacity: 1;\n}\n.action-router > span[data-v-4b10ba60] {\n    cursor: pointer;\n    white-space: nowrap;\n}\n.action-router__icon[data-v-4b10ba60] {\n    width: 44px;\n    height: 44px;\n    opacity: 1;\n    background-position: 14px center;\n    background-size: 16px;\n}\n.action-router p[data-v-4b10ba60] {\n    width: 150px;\n    padding: 7px 0;\n    cursor: pointer;\n    text-align: left;\n    line-height: 1.6em;\n}\n.action-router__longtext[data-v-4b10ba60] {\n    cursor: pointer;\n    white-space: pre-wrap;\n}\n.action-router__title[data-v-4b10ba60] {\n    font-weight: bold;\n}\n',""])},function(t,e,n){"use strict";var i=n(46);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nli[data-v-02357c5a]:hover, li.active[data-v-02357c5a] {\n  box-shadow: inset 4px 0 var(--color-primary);\n}\n.action-text[data-v-02357c5a] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-right: 14px;\n  cursor: pointer;\n  white-space: nowrap;\n  opacity: 0.7;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  line-height: 44px;\n}\n.action-text[data-v-02357c5a]:hover, .action-text[data-v-02357c5a]:focus {\n    opacity: 1;\n}\n.action-text > span[data-v-02357c5a] {\n    cursor: pointer;\n    white-space: nowrap;\n}\n.action-text__icon[data-v-02357c5a] {\n    width: 44px;\n    height: 44px;\n    opacity: 1;\n    background-position: 14px center;\n    background-size: 16px;\n}\n.action-text p[data-v-02357c5a] {\n    width: 150px;\n    padding: 7px 0;\n    cursor: pointer;\n    text-align: left;\n    line-height: 1.6em;\n}\n.action-text__longtext[data-v-02357c5a] {\n    cursor: pointer;\n    white-space: pre-wrap;\n}\n.action-text__title[data-v-02357c5a] {\n    font-weight: bold;\n}\n.action-text[data-v-02357c5a],\n.action-text span[data-v-02357c5a] {\n  cursor: default;\n}\n',""])},function(t,e,n){"use strict";var i=n(47);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n#app-content[data-v-0fe2f738] {\n  z-index: 1000;\n  background-color: var(--color-main-background);\n  position: relative;\n  flex-basis: 100vw;\n  min-height: 100%;\n  transition: transform var(--animation-quick);\n}\n',""])},function(t,e,n){"use strict";var i=n(48);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n#app-navigation {\n  will-change: transform;\n  transition: transform var(--animation-quick);\n}\n@media only screen and (max-width: 768px) {\n.nav-open #app-navigation {\n    transform: translateX(0);\n}\n}\n',""])},function(t,e,n){"use strict";var i=n(49);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n.app-navigation-caption--item[data-v-9639e4a4] {\n  font-weight: bold;\n  color: var(--color-text-maxcontrast);\n  line-height: 44px;\n  padding-left: 44px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  opacity: 0.7;\n  box-shadow: none !important;\n  pointer-events: none;\n}\n.app-navigation-caption--item[data-v-9639e4a4]:not(:first-child) {\n  margin-top: 22px;\n}\n',""])},function(t,e,n){"use strict";var i=n(50);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n#app-settings-content[data-v-7f13ea43] {\n  display: block;\n  padding: 10px;\n  background-color: var(--color-main-background);\n  /* restrict height of settings and make scrollable */\n  max-height: 300px;\n  overflow-y: auto;\n  box-sizing: border-box;\n}\n.slide-up-leave-active[data-v-7f13ea43],\n.slide-up-enter-active[data-v-7f13ea43] {\n  transition-duration: var(--animation-slow);\n  transition-property: max-height, padding;\n  overflow-y: hidden !important;\n}\n.slide-up-enter[data-v-7f13ea43],\n.slide-up-leave-to[data-v-7f13ea43] {\n  max-height: 0 !important;\n  padding: 0 10px !important;\n}\n',""])},function(t,e,n){"use strict";var i=n(51);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"\n.app-navigation-spacer[data-v-18241e10] {\n\theight: 22px;\n}\n",""])},function(t,e,n){"use strict";var i=n(52);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n/*\n\tSidebar: to be used within #content\n\t#app-content will be shrinked properly\n*/\n#app-sidebar[data-v-625289d6] {\n  z-index: 1500;\n  height: calc(100vh - 50px);\n  width: 27vw;\n  min-width: 300px;\n  max-width: 500px;\n  top: 50px;\n  right: 0;\n  display: flex;\n  flex-shrink: 0;\n  flex-direction: column;\n  position: -webkit-sticky;\n  position: sticky;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background: var(--color-main-background);\n  border-left: 1px solid var(--color-border);\n}\n#app-sidebar .app-sidebar-header > .icon-close[data-v-625289d6] {\n    position: absolute;\n    width: 44px;\n    height: 44px;\n    top: 0;\n    right: 0;\n    z-index: 100;\n    opacity: 0.7;\n    border-radius: 22px;\n}\n#app-sidebar .app-sidebar-header > .icon-close[data-v-625289d6]:hover, #app-sidebar .app-sidebar-header > .icon-close[data-v-625289d6]:active, #app-sidebar .app-sidebar-header > .icon-close[data-v-625289d6]:focus {\n      opacity: 1;\n      background-color: rgba(127, 127, 127, 0.25);\n}\n#app-sidebar .app-sidebar-header__figure[data-v-625289d6] {\n    max-height: 250px;\n    height: 250px;\n    width: 100%;\n    background-size: contain;\n    background-position: center;\n    background-repeat: no-repeat;\n}\n#app-sidebar .app-sidebar-header__figure--with-action[data-v-625289d6] {\n      cursor: pointer;\n}\n#app-sidebar .app-sidebar-header__desc[data-v-625289d6] {\n    position: relative;\n    padding: 18px 88px 18px 9px;\n    display: flex;\n    height: 23px;\n    flex-direction: column;\n    justify-content: center;\n    box-sizing: content-box;\n}\n#app-sidebar .app-sidebar-header__desc--with-star[data-v-625289d6] {\n      padding-left: 44px;\n}\n#app-sidebar .app-sidebar-header__desc--with-subtitle[data-v-625289d6] {\n      justify-content: space-between;\n      height: 46px;\n}\n#app-sidebar .app-sidebar-header__desc h3[data-v-625289d6], #app-sidebar .app-sidebar-header__desc h4[data-v-625289d6] {\n      width: 100%;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      margin: 0;\n}\n#app-sidebar .app-sidebar-header__desc h3[data-v-625289d6] {\n      font-size: 16px;\n      padding: 0;\n}\n#app-sidebar .app-sidebar-header__desc h4[data-v-625289d6] {\n      font-size: 14px;\n      padding: 0;\n      opacity: 0.7;\n}\n#app-sidebar .app-sidebar-header__desc .app-sidebar-header__star[data-v-625289d6] {\n      display: block;\n      width: 44px;\n      height: 44px;\n      padding: 14px;\n      position: absolute;\n      top: 6px;\n      left: 0;\n}\n#app-sidebar .app-sidebar-header__desc .app-sidebar-header__menu[data-v-625289d6] {\n      position: absolute;\n      right: 22px;\n      top: 50%;\n      margin-top: -22px;\n      background-color: rgba(127, 127, 127, 0.25);\n      border-radius: 22px;\n}\n#app-sidebar .app-sidebar-header__action[data-v-625289d6] {\n    display: flex;\n    margin: 10px;\n    max-height: 50px;\n    align-items: center;\n}\n#app-sidebar .app-sidebar-header--compact[data-v-625289d6] {\n    padding-left: 40px;\n}\n#app-sidebar .app-sidebar-header--compact .app-sidebar-header__figure[data-v-625289d6] {\n      height: 64px;\n      width: 64px;\n      margin: 9px;\n      border-radius: 3px;\n      position: absolute;\n      left: 0;\n      top: 0;\n      z-index: 2;\n}\n#app-sidebar .app-sidebar-header--compact .app-sidebar-header__desc[data-v-625289d6] {\n      padding-left: 44px;\n      height: 46px;\n}\n#app-sidebar .app-sidebar-header--compact .app-sidebar-header__desc .app-sidebar-header__star[data-v-625289d6] {\n        margin-top: -9px;\n        z-index: 3;\n}\n#app-sidebar .app-sidebar-header--compact .app-sidebar-header__desc .app-sidebar-header__menu[data-v-625289d6] {\n        right: 44px;\n        top: 0;\n        margin: 0;\n        background-color: transparent;\n}\n#app-sidebar .app-sidebar-tabs__nav[data-v-625289d6] {\n    margin-top: 10px;\n}\n#app-sidebar .app-sidebar-tabs__nav ul[data-v-625289d6] {\n      display: flex;\n      justify-content: stretch;\n}\n#app-sidebar .app-sidebar-tabs__tab[data-v-625289d6] {\n    display: block;\n    text-align: center;\n    flex: 1 1;\n}\n#app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6] {\n      display: block;\n      padding-top: 25px;\n      padding-bottom: 5px;\n      position: relative;\n      border-bottom: 1px solid var(--color-border);\n      text-align: center;\n      opacity: 0.7;\n      color: var(--color-main-text);\n      transition: color var(--animation-quick), opacity var(--animation-quick), border-color var(--animation-quick);\n}\n#app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6]:hover, #app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6]:focus, #app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6]:active, #app-sidebar .app-sidebar-tabs__tab a.active[data-v-625289d6] {\n        opacity: 1;\n}\n#app-sidebar .app-sidebar-tabs__tab a:hover .app-sidebar-tabs__tab-icon[data-v-625289d6], #app-sidebar .app-sidebar-tabs__tab a:focus .app-sidebar-tabs__tab-icon[data-v-625289d6], #app-sidebar .app-sidebar-tabs__tab a:active .app-sidebar-tabs__tab-icon[data-v-625289d6], #app-sidebar .app-sidebar-tabs__tab a.active .app-sidebar-tabs__tab-icon[data-v-625289d6] {\n          opacity: 1;\n}\n#app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6]:not(.active):hover, #app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6]:not(.active):focus {\n        box-shadow: inset 0 -1px 0 var(--color-background-darker);\n        border-bottom-color: var(--color-background-darker);\n}\n#app-sidebar .app-sidebar-tabs__tab a.active[data-v-625289d6] {\n        font-weight: bold;\n        color: var(--color-text-light);\n        border-bottom-color: var(--color-text-light);\n        box-shadow: inset 0 -1px 0 var(--color-text-light);\n}\n#app-sidebar .app-sidebar-tabs__tab a[data-v-625289d6]:focus {\n        border-bottom-color: var(--color-primary-element);\n        box-shadow: inset 0 -1px 0 var(--color-primary-element);\n}\n#app-sidebar .app-sidebar-tabs__tab-icon[data-v-625289d6] {\n    height: 25px;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    opacity: 0.7;\n    background-position: center 8px;\n    background-size: 16px;\n    transition: opacity var(--animation-quick);\n}\n#app-sidebar .app-sidebar-tabs__content[data-v-625289d6] {\n    position: relative;\n    flex: 1 1 100%;\n}\n#app-sidebar .app-sidebar-tabs__content--multiple[data-v-625289d6] > :not(section) {\n      display: none;\n}\n.slide-right-leave-active[data-v-625289d6],\n.slide-right-enter-active[data-v-625289d6] {\n  transition-duration: var(--animation-quick);\n  transition-property: max-width, min-width;\n}\n.slide-right-enter-to[data-v-625289d6],\n.slide-right-leave[data-v-625289d6] {\n  min-width: 300px;\n  max-width: 500px;\n}\n.slide-right-enter[data-v-625289d6],\n.slide-right-leave-to[data-v-625289d6] {\n  min-width: 0 !important;\n  max-width: 0 !important;\n}\n.fade-leave-active[data-v-625289d6],\n.fade-enter-active[data-v-625289d6] {\n  transition-duration: var(--animation-quick);\n  transition-property: opacity;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  opacity: 1;\n}\n.fade-enter[data-v-625289d6],\n.fade-leave-to[data-v-625289d6] {\n  opacity: 0;\n}\n',""])},function(t,e,n){"use strict";var i=n(53);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"@charset \"UTF-8\";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n.app-sidebar-header__action button, .app-sidebar-header__action .button,\n.app-sidebar-header__action input[type='button'],\n.app-sidebar-header__action input[type='submit'],\n.app-sidebar-header__action input[type='reset'] {\n  padding: 6px 22px;\n}\n",""])},function(t,e,n){"use strict";var i=n(54);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\nsection[data-v-067ef8fa] {\n  padding: 10px;\n  min-height: 100%;\n}\nsection[data-v-067ef8fa]:focus {\n    border-color: var(--color-primary);\n    box-shadow: 0 0 0.2em var(--color-primary);\n    outline: 0;\n}\n',""])},function(t,e,n){var i=n(157);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("56ea6c9e",i,!0,{})},function(t,e,n){e=t.exports=n(1)(!1);var i=n(11),o=i(n(12)),r=i(n(13)),a=i(n(14)),s=i(n(15));e.push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n@font-face {\n  font-family: "iconfont-vue";\n  src: url('+o+");\n  /* IE9 Compat Modes */\n  src: url("+o+') format("embedded-opentype"), url('+r+') format("woff"), url('+a+') format("truetype"), url('+s+') format("svg");\n  /* Legacy iOS */ }\n\n.icon {\n  font-style: normal;\n  font-weight: 400; }\n  .icon.arrow-left-double:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.arrow-left:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.arrow-right-double:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.arrow-right:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.close:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.confirm-fade:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.confirm:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.menu:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.more:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.pause:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n  .icon.play:before {\n    font-family: "iconfont-vue";\n    content: ""; }\n\n.mx-datepicker[data-v-5da3148] {\n  width: 210px;\n  color: inherit;\n  user-select: none;\n  position: relative;\n  display: inline-block;\n  /* INPUT CONTAINER */\n  /* FOOTER if confirm option enabled*/ }\n  .mx-datepicker[data-v-5da3148].disabled {\n    opacity: 0.7;\n    cursor: not-allowed; }\n  .mx-datepicker[data-v-5da3148] .mx-input-wrapper .mx-input {\n    width: 100%; }\n  .mx-datepicker[data-v-5da3148] .mx-input-wrapper .mx-input-append {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 30px;\n    height: 100%;\n    padding: 6px;\n    background-color: var(--color-main-background);\n    background-clip: content-box; }\n    .mx-datepicker[data-v-5da3148] .mx-input-wrapper .mx-input-append .mx-input-icon {\n      display: inline-block;\n      font-style: normal;\n      text-align: center;\n      cursor: pointer; }\n    .mx-datepicker[data-v-5da3148] .mx-input-wrapper .mx-input-append .mx-clear-wrapper {\n      display: none; }\n    .mx-datepicker[data-v-5da3148] .mx-input-wrapper .mx-input-append .mx-calendar-icon {\n      stroke-width: 8px;\n      stroke: currentColor;\n      fill: currentColor;\n      width: 100%;\n      height: 100%;\n      color: var(--color-text-lighter); }\n  .mx-datepicker[data-v-5da3148] .mx-datepicker-popup {\n    box-shadow: none;\n    background-color: var(--color-main-background);\n    position: absolute;\n    margin-top: 1px;\n    margin-bottom: 1px;\n    z-index: 1000; }\n  .mx-datepicker[data-v-5da3148] .mx-range-wrapper {\n    display: flex;\n    overflow: hidden; }\n    .mx-datepicker[data-v-5da3148] .mx-range-wrapper .mx-calendar:first-child {\n      box-shadow: var(--color-border) 1px 0px !important; }\n    .mx-datepicker[data-v-5da3148] .mx-range-wrapper .mx-calendar-content .mx-panel .cell.actived {\n      border-radius: var(--border-radius) 0 0 var(--border-radius); }\n    .mx-datepicker[data-v-5da3148] .mx-range-wrapper .mx-calendar-content .mx-panel .cell.inrange + .cell.actived {\n      border-radius: 0 var(--border-radius) var(--border-radius) 0; }\n  .mx-datepicker[data-v-5da3148] .mx-shortcuts-wrapper {\n    display: flex;\n    justify-content: space-evenly;\n    padding: 5px;\n    border-bottom: 1px solid var(--color-border); }\n    .mx-datepicker[data-v-5da3148] .mx-shortcuts-wrapper .mx-shortcuts {\n      font-weight: normal; }\n  .mx-datepicker[data-v-5da3148] .mx-calendar {\n    font: inherit;\n    color: var(--color-main-text);\n    padding: 5px;\n    width: 240px; }\n  .mx-datepicker[data-v-5da3148] .mx-calendar-header {\n    padding: 0 4px;\n    margin-bottom: 4px;\n    text-align: center;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-header > a {\n      text-decoration: none;\n      cursor: pointer;\n      color: var(--color-text-lighter);\n      padding: 7px 10px;\n      margin: 0 auto;\n      border-radius: 32px;\n      height: 32px;\n      line-height: 20px;\n      min-width: 32px; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-header > a:hover, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a:focus {\n        opacity: 1;\n        color: var(--color-main-text);\n        background-color: var(--color-background-darker); }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-last-year, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-last-month, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-month, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-year {\n        background-position: center;\n        background-repeat: no-repeat;\n        font-size: 0;\n        opacity: 0.5;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: 0; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-last-year:before, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-last-month:before, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-month:before, .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-year:before {\n          display: block;\n          font-size: 16px; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-last-year:before {\n        font-family: "iconfont-vue";\n        font-style: normal;\n        font-weight: 400;\n        content: ""; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-last-month:before {\n        font-family: "iconfont-vue";\n        font-style: normal;\n        font-weight: 400;\n        content: ""; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-month {\n        order: 3; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-month:before {\n          font-family: "iconfont-vue";\n          font-style: normal;\n          font-weight: 400;\n          content: ""; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-year {\n        order: 4; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-header > a.mx-icon-next-year:before {\n          font-family: "iconfont-vue";\n          font-style: normal;\n          font-weight: 400;\n          content: ""; }\n  .mx-datepicker[data-v-5da3148] .mx-calendar-content {\n    /* DATE SELECTOR */\n    /* YEAR SELECTOR */\n    /* MONTH SELECTOR */\n    /* TIME SELECTOR */ }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel {\n      width: 100%;\n      height: 100%;\n      text-align: center; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell {\n        opacity: 0.7;\n        border-radius: 50px;\n        transition: all 100ms ease-in-out;\n        cursor: pointer; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell:hover, .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell:focus, .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell.actived, .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell.inrange {\n          font-weight: bold;\n          opacity: 1;\n          color: var(--color-primary-text);\n          background-color: var(--color-primary-element); }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell.inrange, .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell.disabled {\n          border-radius: 0;\n          font-weight: normal; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell.inrange {\n          opacity: 0.7; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel .cell.disabled {\n          color: var(--color-text-lighter);\n          opacity: 0.5;\n          background-color: var(--color-background-darker); }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel span.cell,\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel li.cell {\n        min-height: 32px; }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date {\n      table-layout: fixed;\n      border-collapse: collapse;\n      border-spacing: 0; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date td, .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date th {\n        font-size: 12px;\n        width: 32px;\n        height: 32px;\n        padding: 0;\n        overflow: hidden;\n        text-align: center; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date th {\n        color: var(--color-text-lighter);\n        opacity: 0.5; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date td.today {\n        color: var(--color-primary);\n        opacity: 1;\n        font-weight: bold; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date td.last-month, .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date td.next-month {\n        color: var(--color-text-lighter);\n        opacity: 0.5; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date tr:hover,\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date tr:focus,\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-date tr:active {\n        background: none; }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-year,\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-month {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: space-around; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-year span.cell,\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-month span.cell {\n        display: block;\n        padding: 5px;\n        height: 44px;\n        line-height: 36px;\n        margin-bottom: 1%; }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-year .cell {\n      width: 45%; }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-month .cell {\n      width: 30%; }\n    .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-time {\n      display: flex; }\n      .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-time .mx-time-list {\n        position: relative;\n        width: 100%;\n        height: 100%;\n        padding: 5px;\n        margin: 0;\n        list-style: none;\n        overflow-y: auto;\n        max-height: 220px; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-time .mx-time-list .mx-time-picker-item {\n          display: block;\n          text-align: left;\n          padding-left: 10px; }\n        .mx-datepicker[data-v-5da3148] .mx-calendar-content .mx-panel-time .mx-time-list .cell {\n          display: flex;\n          justify-content: center;\n          margin-bottom: 1px;\n          width: 100%;\n          font-size: 12px;\n          height: 32px;\n          line-height: 32px; }\n  .mx-datepicker[data-v-5da3148] .mx-datepicker-footer {\n    padding: 4px;\n    clear: both;\n    text-align: right;\n    border-top: 1px solid var(--color-border); }\n',""])},function(t,e,n){"use strict";var i=n(55);n.n(i).a},function(t,e,n){e=t.exports=n(1)(!1);var i=n(11),o=i(n(12)),r=i(n(13)),a=i(n(14)),s=i(n(15));e.push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n@font-face {\n  font-family: "iconfont-vue";\n  src: url('+o+");\n  /* IE9 Compat Modes */\n  src: url("+o+') format("embedded-opentype"), url('+r+') format("woff"), url('+a+') format("truetype"), url('+s+') format("svg");\n  /* Legacy iOS */\n}\n.icon[data-v-1ba9fc2e] {\n  font-style: normal;\n  font-weight: 400;\n}\n.icon.arrow-left-double[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-left[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right-double[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.arrow-right[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.close[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm-fade[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.confirm[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.menu[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.more[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.pause[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.icon.play[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    content: "";\n}\n.modal-mask[data-v-1ba9fc2e] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.92);\n}\n.modal-header[data-v-1ba9fc2e] {\n  position: absolute;\n  z-index: 10001;\n  top: 0;\n  right: 0;\n  left: 0;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 50px;\n  transition: opacity 250ms, visibility 250ms;\n}\n.modal-header.invisible[style*=\'display:none\'][data-v-1ba9fc2e], .modal-header.invisible[style*=\'display: none\'][data-v-1ba9fc2e] {\n    visibility: hidden;\n}\n.modal-header .modal-title[data-v-1ba9fc2e] {\n    overflow-x: hidden;\n    box-sizing: border-box;\n    max-width: 100%;\n    padding: 0 88px;\n    transition: padding ease 100ms;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: #fff;\n    font-size: 14px;\n}\n.modal-header .icons-menu[data-v-1ba9fc2e] {\n    position: absolute;\n    right: 0;\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n}\n.modal-header .icons-menu .icon-close[data-v-1ba9fc2e] {\n      box-sizing: border-box;\n      margin: 3px;\n      padding: 10px 11px;\n      color: #fff;\n      background-image: none;\n      font-size: 23px;\n}\n.modal-header .icons-menu .icon-close[data-v-1ba9fc2e]:before {\n        font-family: "iconfont-vue";\n        font-style: normal;\n        font-weight: 400;\n        content: "";\n}\n.modal-header .icons-menu .play-pause[data-v-1ba9fc2e] {\n      position: relative;\n      width: 50px;\n      height: 50px;\n      margin: 0;\n      padding: 0;\n      cursor: pointer;\n      color: white;\n      border: none;\n      background-color: transparent;\n      font-size: 22px;\n}\n.modal-header .icons-menu .play-pause:hover .icon-play[data-v-1ba9fc2e],\n      .modal-header .icons-menu .play-pause:hover .icon-pause[data-v-1ba9fc2e], .modal-header .icons-menu .play-pause:focus .icon-play[data-v-1ba9fc2e],\n      .modal-header .icons-menu .play-pause:focus .icon-pause[data-v-1ba9fc2e] {\n        opacity: 1;\n        border-radius: 22px;\n        background-color: rgba(127, 127, 127, 0.25);\n}\n.modal-header .icons-menu .play-pause .icon-play[data-v-1ba9fc2e],\n      .modal-header .icons-menu .play-pause .icon-pause[data-v-1ba9fc2e] {\n        box-sizing: border-box;\n        width: 44px;\n        height: 44px;\n        margin: 3px;\n        opacity: .7;\n        background-image: none;\n        cursor: pointer;\n}\n.modal-header .icons-menu .play-pause .icon-play[data-v-1ba9fc2e] {\n        padding: 11px 13px;\n}\n.modal-header .icons-menu .play-pause .icon-play[data-v-1ba9fc2e]:before {\n          font-family: "iconfont-vue";\n          font-style: normal;\n          font-weight: 400;\n          content: "";\n}\n.modal-header .icons-menu .play-pause .icon-pause[data-v-1ba9fc2e] {\n        padding: 12px;\n        font-size: 19.5px;\n}\n.modal-header .icons-menu .play-pause .icon-pause[data-v-1ba9fc2e]:before {\n          font-family: "iconfont-vue";\n          font-style: normal;\n          font-weight: 400;\n          content: "";\n}\n.modal-header .icons-menu .header-actions[data-v-1ba9fc2e] {\n      margin: 3px;\n      color: white;\n}\n.modal-header .icons-menu .action-item--single[data-v-1ba9fc2e] {\n      box-sizing: border-box;\n      width: 44px;\n      height: 44px;\n      cursor: pointer;\n      background-position: center;\n      background-size: 22px;\n}\n.modal-wrapper[data-v-1ba9fc2e] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  /* Navigation buttons */\n  /* Content */\n}\n.modal-wrapper .prev[data-v-1ba9fc2e],\n  .modal-wrapper .next[data-v-1ba9fc2e] {\n    z-index: 10000;\n    display: flex !important;\n    align-items: center;\n    justify-content: center;\n    width: 15%;\n    min-width: 60px;\n    height: 100%;\n    transition: opacity 250ms, visibility 250ms;\n}\n.modal-wrapper .prev.invisible[style*=\'display:none\'][data-v-1ba9fc2e], .modal-wrapper .prev.invisible[style*=\'display: none\'][data-v-1ba9fc2e],\n    .modal-wrapper .next.invisible[style*=\'display:none\'][data-v-1ba9fc2e],\n    .modal-wrapper .next.invisible[style*=\'display: none\'][data-v-1ba9fc2e] {\n      visibility: hidden;\n}\n.modal-wrapper .icon-next[data-v-1ba9fc2e],\n  .modal-wrapper .icon-previous[data-v-1ba9fc2e] {\n    box-sizing: border-box;\n    width: 44px;\n    height: 44px;\n    padding: 12px 11px;\n    color: white;\n    border-radius: 22px;\n    background-image: none;\n    font-size: 24px;\n}\n.modal-wrapper .icon-previous[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    font-style: normal;\n    font-weight: 400;\n    content: "";\n}\n.modal-wrapper .icon-next[data-v-1ba9fc2e]:before {\n    font-family: "iconfont-vue";\n    font-style: normal;\n    font-weight: 400;\n    content: "";\n}\n.modal-wrapper .modal-container[data-v-1ba9fc2e] {\n    display: block;\n    overflow: hidden;\n    padding: 0;\n    transition: transform 300ms ease;\n    border-radius: var(--border-radius-large);\n    background-color: var(--color-main-background);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n}\n.modal-wrapper:not(.modal-wrapper--large):not(.modal-wrapper--full) .modal-container[data-v-1ba9fc2e] {\n    max-width: 900px;\n    max-height: 80%;\n}\n.modal-wrapper--full .modal-container[data-v-1ba9fc2e] {\n    max-width: 100%;\n    max-height: 100%;\n    border-radius: 0;\n}\n.modal-wrapper--full .prev[data-v-1ba9fc2e],\n  .modal-wrapper--full .next[data-v-1ba9fc2e], .modal-wrapper--spread-navigation .prev[data-v-1ba9fc2e],\n  .modal-wrapper--spread-navigation .next[data-v-1ba9fc2e] {\n    position: absolute;\n    width: 10%;\n}\n.modal-wrapper--full .prev[data-v-1ba9fc2e], .modal-wrapper--spread-navigation .prev[data-v-1ba9fc2e] {\n    left: 0;\n}\n.modal-wrapper--full .next[data-v-1ba9fc2e], .modal-wrapper--spread-navigation .next[data-v-1ba9fc2e] {\n    right: 0;\n}\n.modal-wrapper--large .modal-container[data-v-1ba9fc2e] {\n    max-width: 70%;\n    max-height: 90%;\n}\n.modal-wrapper--large .prev[data-v-1ba9fc2e],\n  .modal-wrapper--large .next[data-v-1ba9fc2e] {\n    width: 10%;\n}\n\n/* TRANSITIONS */\n.fade-enter-active[data-v-1ba9fc2e],\n.fade-leave-active[data-v-1ba9fc2e] {\n  transition: opacity 250ms;\n}\n.fade-enter[data-v-1ba9fc2e],\n.fade-leave-to[data-v-1ba9fc2e] {\n  opacity: 0;\n}\n.fade-visibility-enter[data-v-1ba9fc2e],\n.fade-visibility-leave-to[data-v-1ba9fc2e] {\n  visibility: hidden;\n  opacity: 0;\n}\n.modal-in-enter-active[data-v-1ba9fc2e],\n.modal-in-leave-active[data-v-1ba9fc2e],\n.modal-out-enter-active[data-v-1ba9fc2e],\n.modal-out-leave-active[data-v-1ba9fc2e] {\n  transition: opacity 250ms;\n}\n.modal-in-enter[data-v-1ba9fc2e],\n.modal-in-leave-to[data-v-1ba9fc2e],\n.modal-out-enter[data-v-1ba9fc2e],\n.modal-out-leave-to[data-v-1ba9fc2e] {\n  opacity: 0;\n}\n.modal-in-enter .modal-container[data-v-1ba9fc2e],\n.modal-in-leave-to .modal-container[data-v-1ba9fc2e] {\n  transform: scale(0.9);\n}\n.modal-out-enter .modal-container[data-v-1ba9fc2e],\n.modal-out-leave-to .modal-container[data-v-1ba9fc2e] {\n  transform: scale(1.1);\n}\n',""])},function(t,e,n){"use strict";var i=n(56);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n.modal-mask[data-v-5da3148] .modal-header .icons-menu .action-item__menutoggle {\n  padding: 13px 11px;\n  color: #fff;\n  font-size: 22px;\n}\n.modal-mask[data-v-5da3148] .progress-ring {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg);\n}\n.modal-mask[data-v-5da3148] .progress-ring .progress-ring__circle {\n    transition: 100ms stroke-dashoffset;\n    transform-origin: 50% 50%;\n    animation: progressring linear 3s infinite;\n    stroke-linecap: round;\n    stroke-dashoffset: 94.24778;\n    stroke-dasharray: 94.24778;\n}\n@keyframes progressring {\nfrom {\n    stroke-dashoffset: 94.24778;\n}\nto {\n    stroke-dashoffset: 0;\n}\n}\n',""])},function(t,e,n){"use strict";var i=n(57);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n.option[data-v-5fcb244d] {\n  display: flex;\n  align-items: center;\n  height: 32px;\n  width: 100%;\n}\n.option__avatar[data-v-5fcb244d] {\n    flex: 0 0 32px;\n    width: 32px;\n    height: 32px;\n    margin-right: 6px;\n}\n.option__desc[data-v-5fcb244d] {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    flex: 1 1;\n}\n.option__desc--lineone[data-v-5fcb244d] {\n      color: var(--color-text-light);\n}\n.option__desc--lineone--highlight[data-v-5fcb244d] {\n        font-weight: 600;\n}\n.option__desc--linetwo[data-v-5fcb244d] {\n      opacity: 0.7;\n}\n.option__icon[data-v-5fcb244d] {\n    width: 44px;\n    height: 44px;\n    flex: 0 0 44px;\n    margin: -6px;\n    opacity: 0.5;\n}\n',""])},function(t,e,n){"use strict";var i=n(58);n.n(i).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,'@charset "UTF-8";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n.name-parts[data-v-e9d10674] {\n  display: flex;\n  max-width: 100%;\n}\n.name-parts__first[data-v-e9d10674] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.name-parts__first[data-v-e9d10674], .name-parts__last[data-v-e9d10674] {\n    white-space: pre;\n}\n',""])},function(t,e,n){var i=n(167);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("3eae9ff2",i,!0,{})},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"@charset \"UTF-8\";\n/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n.multiselect[data-v-5da3148] {\n  margin: 0;\n  padding: 0 !important;\n  display: inline-block;\n  /* override this rule with your width styling if you need */\n  min-width: 160px;\n  position: relative;\n  background-color: var(--color-main-background);\n  /* results wrapper */\n  /* ABOVE display */\n  /* Icon before option select */\n  /* No need for an icon here */\n  /* Mouse feedback */ }\n  .multiselect[data-v-5da3148].multiselect--active {\n    /* Opened: force display the input */\n    /* multiselect__limit hidden if active */ }\n    .multiselect[data-v-5da3148].multiselect--active input.multiselect__input {\n      opacity: 1 !important;\n      cursor: text !important;\n      border-radius: var(--border-radius) var(--border-radius) 0 0; }\n    .multiselect[data-v-5da3148].multiselect--active .multiselect__limit {\n      display: none; }\n  .multiselect[data-v-5da3148].multiselect--active.multiselect--above input.multiselect__input {\n    border-radius: 0 0 var(--border-radius) var(--border-radius); }\n  .multiselect[data-v-5da3148].multiselect--disabled,\n  .multiselect[data-v-5da3148].multiselect--disabled .multiselect__single {\n    background-color: var(--color-background-dark) !important; }\n  .multiselect[data-v-5da3148].icon-loading-small::after {\n    left: 100%;\n    margin-left: -24px; }\n  .multiselect[data-v-5da3148] .multiselect__tags {\n    /* space between tags and limit tag */\n    display: flex;\n    flex-wrap: nowrap;\n    overflow: hidden;\n    border: 1px solid var(--color-border-dark);\n    cursor: pointer;\n    position: relative;\n    border-radius: 3px;\n    height: 34px;\n    /* tag wrapper */\n    /* Single select default value\n\t\tor default placeholder if search disabled*/\n    /* displayed text if tag limit reached */\n    /* default multiselect input for search and placeholder */ }\n    .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap {\n      align-items: center;\n      display: inline-flex;\n      overflow: hidden;\n      max-width: 100%;\n      position: relative;\n      padding: 3px 5px;\n      flex-grow: 1;\n      /* no tags or simple select? Show input directly\n\t\t\tinput is used to display single value */\n      /* selected tag */ }\n      .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap:empty ~ input.multiselect__input {\n        opacity: 1 !important;\n        /* hide default empty text like .multiselect__placeholder,\n\t\t\t\tand show input instead. It looks better without a transition between\n\t\t\t\ta span and the input that have different styling */ }\n        .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap:empty ~ input.multiselect__input + span:not(.multiselect__single) {\n          display: none; }\n      .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap .multiselect__tag {\n        flex: 1 0 0;\n        line-height: 20px;\n        padding: 1px 5px;\n        background-image: none;\n        color: var(--color-text-lighter);\n        border: 1px solid var(--color-border-dark);\n        display: inline-flex;\n        align-items: center;\n        border-radius: 3px;\n        /* require to override the default width\n\t\t\t\tand force the tag to shring properly */\n        min-width: 0;\n        max-width: 50%;\n        max-width: fit-content;\n        max-width: -moz-fit-content;\n        /* css hack, detect if more than two tags\n\t\t\t\tif so, flex-basis is set to half */\n        /* ellipsis the groups to be sure\n\t\t\t\twe display at least two of them */ }\n        .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap .multiselect__tag:only-child {\n          flex: 0 1 auto; }\n        .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap .multiselect__tag:not(:last-child) {\n          margin-right: 5px; }\n        .multiselect[data-v-5da3148] .multiselect__tags .multiselect__tags-wrap .multiselect__tag > span {\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          overflow: hidden; }\n    .multiselect[data-v-5da3148] .multiselect__tags .multiselect__single,\n    .multiselect[data-v-5da3148] .multiselect__tags .multiselect__placeholder {\n      padding: 7px 6px;\n      flex: 0 0 100%;\n      z-index: 1;\n      /* above input */\n      background-color: var(--color-main-background);\n      cursor: pointer;\n      line-height: 18px;\n      color: var(--color-text-lighter); }\n    .multiselect[data-v-5da3148] .multiselect__tags .multiselect__strong,\n    .multiselect[data-v-5da3148] .multiselect__tags .multiselect__limit {\n      flex: 0 0 auto;\n      line-height: 20px;\n      color: var(--color-text-lighter);\n      display: inline-flex;\n      align-items: center;\n      opacity: 0.7;\n      margin-right: 5px;\n      /* above the input */\n      z-index: 5; }\n    .multiselect[data-v-5da3148] .multiselect__tags input.multiselect__input {\n      width: 100% !important;\n      position: absolute !important;\n      top: 0;\n      left: 0;\n      margin: 0;\n      opacity: 0;\n      /* let's leave it on top of tags but hide it */\n      height: 100%;\n      border: none;\n      /* override hide to force show the placeholder */\n      display: block !important;\n      /* only when not active */\n      cursor: pointer;\n      /* override inline styling of the lib */\n      padding: 7px 6px !important; }\n  .multiselect[data-v-5da3148] .multiselect__content-wrapper {\n    position: absolute;\n    width: 100%;\n    margin-top: -1px;\n    border: 1px solid var(--color-border-dark);\n    background: var(--color-main-background);\n    z-index: 50;\n    max-height: 250px;\n    overflow-y: auto;\n    border-radius: 0 0 var(--border-radius) var(--border-radius); }\n    .multiselect[data-v-5da3148] .multiselect__content-wrapper .multiselect__content {\n      width: 100%;\n      padding: 0; }\n    .multiselect[data-v-5da3148] .multiselect__content-wrapper li {\n      position: relative;\n      display: flex;\n      align-items: center;\n      background-color: transparent; }\n      .multiselect[data-v-5da3148] .multiselect__content-wrapper li,\n      .multiselect[data-v-5da3148] .multiselect__content-wrapper li span {\n        cursor: pointer; }\n      .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span {\n        padding: 8px;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        margin: 0;\n        height: auto;\n        min-height: 1em;\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: inline-flex;\n        align-items: center;\n        background-color: transparent;\n        color: var(--color-text-lighter);\n        width: 100%;\n        /* selected checkmark icon */ }\n        .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span::before {\n          content: ' ';\n          background-repeat: no-repeat;\n          background-position: center;\n          min-width: 16px;\n          min-height: 16px;\n          display: block;\n          opacity: 0.5;\n          margin-right: 5px;\n          visibility: hidden; }\n        .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span.multiselect__option--disabled {\n          background-color: var(--color-background-dark);\n          opacity: 0.5; }\n        .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span.multiselect__option--highlight {\n          color: var(--color-main-text);\n          background-color: var(--color-background-dark); }\n        .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span:not(.multiselect__option--disabled):hover::before {\n          opacity: .3; }\n        .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span.multiselect__option--selected::before, .multiselect[data-v-5da3148] .multiselect__content-wrapper li > span:not(.multiselect__option--disabled):hover::before {\n          visibility: visible; }\n  .multiselect[data-v-5da3148].multiselect--above .multiselect__content-wrapper {\n    bottom: 100%;\n    margin-bottom: -1px; }\n  .multiselect[data-v-5da3148].multiselect--multiple .multiselect__content-wrapper li > span {\n    /* add the prop tag-placeholder=\"create\" to add the +\n\t\ticon on top of an unknown-and-ready-to-be-created entry */ }\n    .multiselect[data-v-5da3148].multiselect--multiple .multiselect__content-wrapper li > span::before {\n      background-image: var(--icon-checkmark-000); }\n    .multiselect[data-v-5da3148].multiselect--multiple .multiselect__content-wrapper li > span[data-select='create']::before {\n      background-image: var(--icon-add-000);\n      visibility: visible; }\n  .multiselect[data-v-5da3148].multiselect--single .multiselect__content-wrapper li > span::before {\n    display: none; }\n  .multiselect[data-v-5da3148]:hover .multiselect__placeholder,\n  .multiselect[data-v-5da3148] input.multiselect__input .multiselect__placeholder {\n    color: var(--color-main-text); }\n",""])},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";n.r(e);var i={};n.r(i),n.d(i,"ActionButton",function(){return a.default}),n.d(i,"ActionCheckbox",function(){return s.default}),n.d(i,"ActionInput",function(){return c.default}),n.d(i,"ActionLink",function(){return l.default}),n.d(i,"ActionRouter",function(){return u.default}),n.d(i,"ActionText",function(){return d.default}),n.d(i,"Actions",function(){return p.default}),n.d(i,"AppContent",function(){return f.default}),n.d(i,"AppContentDetails",function(){return h.default}),n.d(i,"AppContentList",function(){return A.default}),n.d(i,"AppNavigation",function(){return v.default}),n.d(i,"AppNavigationCaption",function(){return m.default}),n.d(i,"AppNavigationItem",function(){return g.default}),n.d(i,"AppNavigationNew",function(){return b.default}),n.d(i,"AppNavigationSettings",function(){return y.default}),n.d(i,"AppNavigationSpacer",function(){return w.default}),n.d(i,"AppSidebar",function(){return x.default}),n.d(i,"AppSidebarTab",function(){return _.default}),n.d(i,"Avatar",function(){return T.default}),n.d(i,"Content",function(){return k.default}),n.d(i,"DatetimePicker",function(){return C.default}),n.d(i,"Modal",function(){return E.default}),n.d(i,"Multiselect",function(){return S.default}),n.d(i,"PopoverMenu",function(){return M.default});var o=n(168),r=n.n(o),a=n(60),s=n(111),c=n(112),l=n(113),u=n(114),d=n(115),p=n(29),f=n(116),h=n(117),A=n(118),v=n(119),m=n(120),g=n(121),b=n(122),y=n(123),w=n(124),x=n(125),_=n(126),T=n(59),k=n(127),C=n(128),E=n(129),S=n(110),M=n(23),N=n(5),I=n(108),O=n(109);
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
function L(t){Object.values(i).forEach(function(e){t.component(e.name,e)})}
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */n.d(e,"ActionButton",function(){return a.default}),n.d(e,"ActionCheckbox",function(){return s.default}),n.d(e,"ActionInput",function(){return c.default}),n.d(e,"ActionLink",function(){return l.default}),n.d(e,"ActionRouter",function(){return u.default}),n.d(e,"ActionText",function(){return d.default}),n.d(e,"Actions",function(){return p.default}),n.d(e,"AppContent",function(){return f.default}),n.d(e,"AppContentDetails",function(){return h.default}),n.d(e,"AppContentList",function(){return A.default}),n.d(e,"AppNavigation",function(){return v.default}),n.d(e,"AppNavigationCaption",function(){return m.default}),n.d(e,"AppNavigationItem",function(){return g.default}),n.d(e,"AppNavigationNew",function(){return b.default}),n.d(e,"AppNavigationSettings",function(){return y.default}),n.d(e,"AppNavigationSpacer",function(){return w.default}),n.d(e,"AppSidebar",function(){return x.default}),n.d(e,"AppSidebarTab",function(){return _.default}),n.d(e,"Avatar",function(){return T.default}),n.d(e,"Content",function(){return k.default}),n.d(e,"DatetimePicker",function(){return C.default}),n.d(e,"Modal",function(){return E.default}),n.d(e,"Multiselect",function(){return S.default}),n.d(e,"PopoverMenu",function(){return M.default}),n.d(e,"Tooltip",function(){return N.default}),n.d(e,"isFullscreen",function(){return I.default}),n.d(e,"isMobile",function(){return O.default}),"undefined"!=typeof window&&window.Vue&&L(window.Vue);e.default=function(t){for(var e=1;e<arguments.length;e++)if(e%2){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){r()(t,e,n[e])})}else Object.defineProperties(t,Object.getOwnPropertyDescriptors(arguments[e]));return t}({install:L},i)}])});
//# sourceMappingURL=ncvuecomponents.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=template&id=54e5d8c3&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestDetails.vue?vue&type=template&id=54e5d8c3& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "guests-details" } }, [
    _vm.loaded
      ? _c("div", [
          _c("table", [
            _c("thead", [
              _c("tr", [
                _c("th", { attrs: { colspan: "2" } }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.t("guests", "Name")) +
                      "\n\t\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c("th", [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.t("guests", "Shared By")) +
                      "\n\t\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c("th", [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.t("guests", "Shared At")) +
                      "\n\t\t\t\t"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.details[_vm.activeUser].shares, function(share) {
                return _c("tr", [
                  _c(
                    "td",
                    {
                      staticClass: "name",
                      style: {
                        backgroundImage:
                          "url(" + _vm.getMimeIcon(share.mime_type) + ")"
                      },
                      attrs: { colspan: "2" }
                    },
                    [_vm._v("\n\t\t\t\t\t" + _vm._s(share.name) + "\n\t\t\t\t")]
                  ),
                  _vm._v(" "),
                  _c("td", { staticClass: "shared_by" }, [
                    _vm._v(_vm._s(share.shared_by))
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "shared_at" }, [
                    _vm._v(_vm._s(_vm.formatTime(share.time)))
                  ])
                ])
              }),
              0
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loaded ? _c("div", [_c("div", { staticClass: "loading" })]) : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=template&id=22b3e026&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestList.vue?vue&type=template&id=22b3e026& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "section", attrs: { id: "guests-list" } }, [
    _c("h2", [_vm._v(_vm._s(_vm.t("guests", "Guests accounts")))]),
    _vm._v(" "),
    _vm.loaded
      ? _c("div", [
          _vm.guests.length
            ? _c("table", { staticClass: "table" }, [
                _c("thead", [
                  _c("tr", [
                    _c(
                      "th",
                      {
                        class: _vm.getSortClass("email"),
                        on: {
                          click: function($event) {
                            return _vm.setSort("email")
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t" +
                            _vm._s(_vm.t("guests", "Email")) +
                            "\n\t\t\t\t"
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "th",
                      {
                        class: _vm.getSortClass("display_name"),
                        on: {
                          click: function($event) {
                            return _vm.setSort("display_name")
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t" +
                            _vm._s(_vm.t("guests", "Name")) +
                            "\n\t\t\t\t"
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "th",
                      {
                        class: _vm.getSortClass("created_by"),
                        on: {
                          click: function($event) {
                            return _vm.setSort("created_by")
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t" +
                            _vm._s(_vm.t("guests", "Invited by")) +
                            "\n\t\t\t\t"
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "th",
                      {
                        class: _vm.getSortClass("share_count"),
                        on: {
                          click: function($event) {
                            return _vm.setSort("share_count")
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t" +
                            _vm._s(_vm.t("guests", "Received shares")) +
                            "\n\t\t\t\t"
                        )
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.guests, function(guest) {
                      return [
                        _c(
                          "tr",
                          {
                            class:
                              guest.email === _vm.details_for ? "active" : "",
                            on: {
                              click: function($event) {
                                return _vm.toggleDetails(guest.email)
                              }
                            }
                          },
                          [
                            _c("td", { staticClass: "email" }, [
                              _vm._v(_vm._s(guest.email))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "display_name" }, [
                              _vm._v(_vm._s(guest.display_name))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "created_by" }, [
                              _vm._v(_vm._s(guest.created_by))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "share_count" }, [
                              _vm._v(_vm._s(guest.share_count))
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        guest.email === _vm.details_for
                          ? _c("tr", { staticClass: "details" }, [
                              _c(
                                "td",
                                { attrs: { colspan: "4" } },
                                [
                                  _c("guest-details", {
                                    attrs: { "guest-id": guest.email }
                                  })
                                ],
                                1
                              )
                            ])
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          !_vm.guests.length
            ? _c("div", [
                _vm._v(
                  "\n\t\t\t" +
                    _vm._s(_vm.t("guests", "No guest accounts created")) +
                    "\n\t\t"
                )
              ])
            : _vm._e()
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loaded ? _c("div", [_c("div", { staticClass: "loading" })]) : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=template&id=15501d72&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestSettings.vue?vue&type=template&id=15501d72& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "section", attrs: { id: "guests" } },
    [
      _c("h2", [
        _vm._v(_vm._s(_vm.t("guests", "Guests")) + " "),
        _c("span", { ref: "msg", staticClass: "msg" })
      ]),
      _vm._v(" "),
      _vm.loaded
        ? _c("div", [
            _c("p", [
              _c("span", { staticClass: "user-info-label" }, [
                _vm._v(
                  "\n\t\t\t\t" +
                    _vm._s(
                      _vm.t(
                        "guests",
                        "Guest users are grouped under a virtual group in the user manager"
                      )
                    ) +
                    "\n\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "external-storage-toggle" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.config.allowExternalStorage,
                    expression: "config.allowExternalStorage"
                  }
                ],
                staticClass: "checkbox",
                attrs: { type: "checkbox", id: "allowExternalStorage" },
                domProps: {
                  checked: Array.isArray(_vm.config.allowExternalStorage)
                    ? _vm._i(_vm.config.allowExternalStorage, null) > -1
                    : _vm.config.allowExternalStorage
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.config.allowExternalStorage,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.config,
                              "allowExternalStorage",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.config,
                              "allowExternalStorage",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.config, "allowExternalStorage", $$c)
                      }
                    },
                    _vm.saveConfig
                  ]
                }
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "allowExternalStorage" } }, [
                _vm._v(
                  "\n\t\t\t\t" +
                    _vm._s(
                      _vm.t(
                        "guests",
                        "Guest users can access mounted external storages"
                      )
                    ) +
                    "\n\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "hide-users-toggle" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.config.hideUsers,
                    expression: "config.hideUsers"
                  }
                ],
                staticClass: "checkbox",
                attrs: { type: "checkbox", id: "hideUsers" },
                domProps: {
                  checked: Array.isArray(_vm.config.hideUsers)
                    ? _vm._i(_vm.config.hideUsers, null) > -1
                    : _vm.config.hideUsers
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.config.hideUsers,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(_vm.config, "hideUsers", $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.config,
                              "hideUsers",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.config, "hideUsers", $$c)
                      }
                    },
                    _vm.saveConfig
                  ]
                }
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "hideUsers" } }, [
                _vm._v(
                  "\n\t\t\t\t" +
                    _vm._s(_vm.t("guests", "Hide other users from guests")) +
                    "\n\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _vm.config.hideUsers
              ? _c("p", { staticClass: "note" }, [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(
                        _vm.t(
                          "guests",
                          "Guests will still be able to see users from any group they are added to"
                        )
                      ) +
                      "\n\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("p", { staticClass: "whitelist-toggle" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.config.useWhitelist,
                    expression: "config.useWhitelist"
                  }
                ],
                staticClass: "checkbox",
                attrs: { type: "checkbox", id: "guestUseWhitelist" },
                domProps: {
                  checked: Array.isArray(_vm.config.useWhitelist)
                    ? _vm._i(_vm.config.useWhitelist, null) > -1
                    : _vm.config.useWhitelist
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.config.useWhitelist,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.config,
                              "useWhitelist",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.config,
                              "useWhitelist",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.config, "useWhitelist", $$c)
                      }
                    },
                    _vm.saveConfig
                  ]
                }
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "guestUseWhitelist" } }, [
                _vm._v(
                  "\n\t\t\t\t" +
                    _vm._s(
                      _vm.t("guests", "Limit guest access to an app whitelist")
                    ) +
                    "\n\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _vm.config.useWhitelist
              ? _c(
                  "p",
                  { staticClass: "whitelist" },
                  [
                    _c("Multiselect", {
                      attrs: {
                        options: _vm.config.whiteListableApps,
                        multiple: true,
                        "close-on-select": false,
                        "clear-on-select": false,
                        tagWidth: 75
                      },
                      on: { input: _vm.saveConfig },
                      model: {
                        value: _vm.config.whitelist,
                        callback: function($$v) {
                          _vm.$set(_vm.config, "whitelist", $$v)
                        },
                        expression: "config.whitelist"
                      }
                    }),
                    _vm._v(" "),
                    _c("button", {
                      staticClass: "icon-history icon",
                      attrs: {
                        title: _vm.t("guests", "Reset"),
                        type: "button"
                      },
                      on: { click: _vm.reset }
                    })
                  ],
                  1
                )
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.loaded
        ? _c("div", [_c("div", { staticClass: "loading" })])
        : _vm._e(),
      _vm._v(" "),
      _c("guest-list")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-select/dist/vue-select.css":
/*!*****************************************************!*\
  !*** ./node_modules/vue-select/dist/vue-select.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../css-loader/dist/cjs.js!./vue-select.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-select/dist/vue-select.css");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2ab8496e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestDetails.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib??vue-loader-options!./GuestDetails.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("348ad616", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestList.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib??vue-loader-options!./GuestList.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("001fb7cc", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/GuestSettings.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib??vue-loader-options!./GuestSettings.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7ebe9864", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/*!**************************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/addStylesClient.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listToStyles */ "./node_modules/vue-style-loader/lib/listToStyles.js");
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/*!***********************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/listToStyles.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listToStyles; });
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./node_modules/vue/dist/vue.runtime.esm.js":
/*!**************************************************!*\
  !*** ./node_modules/vue/dist/vue.runtime.esm.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ( true && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
       true && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ( true && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (true) {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ( true &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ( true &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

/*  */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ( true && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ( true && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
     true && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ( true && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ( true &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        true
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ( true &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/GuestDetails.vue":
/*!******************************!*\
  !*** ./src/GuestDetails.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GuestDetails_vue_vue_type_template_id_54e5d8c3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuestDetails.vue?vue&type=template&id=54e5d8c3& */ "./src/GuestDetails.vue?vue&type=template&id=54e5d8c3&");
/* harmony import */ var _GuestDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuestDetails.vue?vue&type=script&lang=js& */ "./src/GuestDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuestDetails.vue?vue&type=style&index=0&lang=scss& */ "./src/GuestDetails.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GuestDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GuestDetails_vue_vue_type_template_id_54e5d8c3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GuestDetails_vue_vue_type_template_id_54e5d8c3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/GuestDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/GuestDetails.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./src/GuestDetails.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./GuestDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/GuestDetails.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************!*\
  !*** ./src/GuestDetails.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib??vue-loader-options!./GuestDetails.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/GuestDetails.vue?vue&type=template&id=54e5d8c3&":
/*!*************************************************************!*\
  !*** ./src/GuestDetails.vue?vue&type=template&id=54e5d8c3& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_template_id_54e5d8c3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./GuestDetails.vue?vue&type=template&id=54e5d8c3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/GuestDetails.vue?vue&type=template&id=54e5d8c3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_template_id_54e5d8c3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestDetails_vue_vue_type_template_id_54e5d8c3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/GuestList.vue":
/*!***************************!*\
  !*** ./src/GuestList.vue ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GuestList_vue_vue_type_template_id_22b3e026___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuestList.vue?vue&type=template&id=22b3e026& */ "./src/GuestList.vue?vue&type=template&id=22b3e026&");
/* harmony import */ var _GuestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuestList.vue?vue&type=script&lang=js& */ "./src/GuestList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuestList.vue?vue&type=style&index=0&lang=scss& */ "./src/GuestList.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GuestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GuestList_vue_vue_type_template_id_22b3e026___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GuestList_vue_vue_type_template_id_22b3e026___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/GuestList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/GuestList.vue?vue&type=script&lang=js&":
/*!****************************************************!*\
  !*** ./src/GuestList.vue?vue&type=script&lang=js& ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./GuestList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/GuestList.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************!*\
  !*** ./src/GuestList.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib??vue-loader-options!./GuestList.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/GuestList.vue?vue&type=template&id=22b3e026&":
/*!**********************************************************!*\
  !*** ./src/GuestList.vue?vue&type=template&id=22b3e026& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_template_id_22b3e026___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./GuestList.vue?vue&type=template&id=22b3e026& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/GuestList.vue?vue&type=template&id=22b3e026&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_template_id_22b3e026___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestList_vue_vue_type_template_id_22b3e026___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/GuestSettings.vue":
/*!*******************************!*\
  !*** ./src/GuestSettings.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GuestSettings_vue_vue_type_template_id_15501d72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuestSettings.vue?vue&type=template&id=15501d72& */ "./src/GuestSettings.vue?vue&type=template&id=15501d72&");
/* harmony import */ var _GuestSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuestSettings.vue?vue&type=script&lang=js& */ "./src/GuestSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuestSettings.vue?vue&type=style&index=0&lang=scss& */ "./src/GuestSettings.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GuestSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GuestSettings_vue_vue_type_template_id_15501d72___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GuestSettings_vue_vue_type_template_id_15501d72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/GuestSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/GuestSettings.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./src/GuestSettings.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./GuestSettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/GuestSettings.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************!*\
  !*** ./src/GuestSettings.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib??vue-loader-options!./GuestSettings.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/GuestSettings.vue?vue&type=template&id=15501d72&":
/*!**************************************************************!*\
  !*** ./src/GuestSettings.vue?vue&type=template&id=15501d72& ***!
  \**************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_template_id_15501d72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./GuestSettings.vue?vue&type=template&id=15501d72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/GuestSettings.vue?vue&type=template&id=15501d72&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_template_id_15501d72___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestSettings_vue_vue_type_template_id_15501d72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/mixins/Nextcloud.js":
/*!*********************************!*\
  !*** ./src/mixins/Nextcloud.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    t: t
  }
});

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _GuestSettings_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuestSettings.vue */ "./src/GuestSettings.vue");
/* harmony import */ var _mixins_Nextcloud__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/Nextcloud */ "./src/mixins/Nextcloud.js");
/* harmony import */ var _GuestList_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GuestList.vue */ "./src/GuestList.vue");
/* harmony import */ var _GuestDetails_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GuestDetails.vue */ "./src/GuestDetails.vue");
/* harmony import */ var nextcloud_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nextcloud-vue */ "./node_modules/nextcloud-vue/dist/ncvuecomponents.js");
/* harmony import */ var nextcloud_vue__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nextcloud_vue__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vue_select_dist_vue_select_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-select/dist/vue-select.css */ "./node_modules/vue-select/dist/vue-select.css");
/* harmony import */ var vue_select_dist_vue_select_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_select_dist_vue_select_css__WEBPACK_IMPORTED_MODULE_6__);







vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('guest-list', _GuestList_vue__WEBPACK_IMPORTED_MODULE_3__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('guest-details', _GuestDetails_vue__WEBPACK_IMPORTED_MODULE_4__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('Multiselect', nextcloud_vue__WEBPACK_IMPORTED_MODULE_5__["Multiselect"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].mixin(_mixins_Nextcloud__WEBPACK_IMPORTED_MODULE_2__["default"]);
new vue__WEBPACK_IMPORTED_MODULE_0__["default"](_GuestSettings_vue__WEBPACK_IMPORTED_MODULE_1__["default"]).$mount('#guest-settings');

/***/ })

/******/ });
//# sourceMappingURL=settings.js.map