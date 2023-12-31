/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./core/src/OC/requesttoken.js":
/*!*************************************!*\
  !*** ./core/src/OC/requesttoken.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getToken": () => (/* binding */ getToken),
/* harmony export */   "manageToken": () => (/* binding */ manageToken),
/* harmony export */   "setToken": () => (/* binding */ setToken)
/* harmony export */ });
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
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
 */



/**
 * @private
 * @param {Document} global the document to read the initial value from
 * @param {Function} emit the function to invoke for every new token
 * @return {object}
 */
const manageToken = (global, emit) => {
  let token = global.getElementsByTagName('head')[0].getAttribute('data-requesttoken');
  return {
    getToken: () => token,
    setToken: newToken => {
      token = newToken;
      emit('csrf-token-update', {
        token
      });
    }
  };
};
const manageFromDocument = manageToken(document, _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__.emit);

/**
 * @return {string}
 */
const getToken = manageFromDocument.getToken;

/**
 * @param {string} newToken new token
 */
const setToken = manageFromDocument.setToken;

/***/ }),

/***/ "./core/src/Polyfill/tooltip.js":
/*!**************************************!*\
  !*** ./core/src/Polyfill/tooltip.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/**
 * @copyright 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
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
 */


(jquery__WEBPACK_IMPORTED_MODULE_0___default().prototype.tooltip) = function (tooltip) {
  return function (config) {
    try {
      return tooltip.call(this, config);
    } catch (ex) {
      if (ex instanceof TypeError && config === 'destroy') {
        if (window.TESTING === undefined) {
          OC.debug && console.warn('Deprecated call $.tooltip(\'destroy\') has been deprecated and should be removed');
        }
        return tooltip.call(this, 'dispose');
      }
      if (ex instanceof TypeError && config === 'fixTitle') {
        if (window.TESTING === undefined) {
          OC.debug && console.warn('Deprecated call $.tooltip(\'fixTitle\') has been deprecated and should be removed');
        }
        return tooltip.call(this, '_fixTitle');
      }
    }
  };
}((jquery__WEBPACK_IMPORTED_MODULE_0___default().prototype.tooltip));

/***/ }),

/***/ "./core/src/Util/get-url-parameter.js":
/*!********************************************!*\
  !*** ./core/src/Util/get-url-parameter.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getURLParameter)
/* harmony export */ });
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
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
 */

/**
 * @param {any} name -
 */
function getURLParameter(name) {
  return decodeURIComponent(
  // eslint-disable-next-line no-sparse-arrays
  (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || '';
}

/***/ }),

/***/ "./core/src/install.js":
/*!*****************************!*\
  !*** ./core/src/install.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _OC_requesttoken_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OC/requesttoken.js */ "./core/src/OC/requesttoken.js");
/* harmony import */ var _Util_get_url_parameter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util/get-url-parameter.js */ "./core/src/Util/get-url-parameter.js");
/* harmony import */ var _jquery_showpassword_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jquery/showpassword.js */ "./core/src/jquery/showpassword.js");
/* harmony import */ var jquery_ui_ui_widgets_button_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery-ui/ui/widgets/button.js */ "./node_modules/jquery-ui/ui/widgets/button.js");
/* harmony import */ var jquery_ui_ui_widgets_button_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_button_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jquery_ui_themes_base_theme_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jquery-ui/themes/base/theme.css */ "./node_modules/jquery-ui/themes/base/theme.css");
/* harmony import */ var jquery_ui_themes_base_button_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery-ui/themes/base/button.css */ "./node_modules/jquery-ui/themes/base/button.css");
/* harmony import */ var _Polyfill_tooltip_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Polyfill/tooltip.js */ "./core/src/Polyfill/tooltip.js");
/* harmony import */ var strengthify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! strengthify */ "./node_modules/strengthify/jquery.strengthify.js");
/* harmony import */ var strengthify__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(strengthify__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var strengthify_strengthify_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! strengthify/strengthify.css */ "./node_modules/strengthify/strengthify.css");
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Julius Härtl <jus@bitgrid.net>
 * @author Richard Steinmetz <richard@steinmetz.cloud>
 *
 * @license AGPL-3.0-or-later
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
 */












window.addEventListener('DOMContentLoaded', function () {
  const dbtypes = {
    sqlite: !!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#hasSQLite').val(),
    mysql: !!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#hasMySQL').val(),
    postgresql: !!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#hasPostgreSQL').val(),
    oracle: !!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#hasOracle').val()
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selectDbType').buttonset();
  // change links inside an info box back to their default appearance
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selectDbType p.info a').button('destroy');
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#hasSQLite').val()) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_other_db').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_oracle_db').hide();
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqliteInformation').hide();
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#adminlogin').change(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#adminlogin').val(jquery__WEBPACK_IMPORTED_MODULE_0___default().trim(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#adminlogin').val()));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlite').click(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_other_db').slideUp(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_oracle_db').slideUp(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqliteInformation').show();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dbname').attr('pattern', '[0-9a-zA-Z$_-]+');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mysql,#pgsql').click(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_other_db').slideDown(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_oracle_db').slideUp(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqliteInformation').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dbname').attr('pattern', '[0-9a-zA-Z$_-]+');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#oci').click(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_other_db').slideDown(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#use_oracle_db').show(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqliteInformation').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dbname').attr('pattern', '[0-9a-zA-Z$_-.]+');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showAdvanced').click(function (e) {
    e.preventDefault();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#datadirContent').slideToggle(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#databaseBackend').slideToggle(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#databaseField').slideToggle(250);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('form').submit(function () {
    // Save form parameters
    const post = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serializeArray();

    // Show spinner while finishing setup
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.float-spinner').show(250);

    // Disable inputs
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="submit"]').attr('disabled', 'disabled').val(jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="submit"]').data('finishing'));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input', this).addClass('ui-state-disabled').attr('disabled', 'disabled');
    // only disable buttons if they are present
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selectDbType').find('.ui-button').length > 0) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selectDbType').buttonset('disable');
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.strengthify-wrapper, .tipsy').css('filter', 'alpha(opacity=30)').css('opacity', 0.3);

    // Create the form
    const form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<form>');
    form.attr('action', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('action'));
    form.attr('method', 'POST');
    for (let i = 0; i < post.length; i++) {
      const input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="hidden">');
      input.attr(post[i]);
      form.append(input);
    }

    // Add redirect_url
    const redirectURL = (0,_Util_get_url_parameter_js__WEBPACK_IMPORTED_MODULE_3__["default"])('redirect_url');
    if (redirectURL) {
      const redirectURLInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="hidden">');
      redirectURLInput.attr({
        name: 'redirect_url',
        value: redirectURL
      });
      form.append(redirectURLInput);
    }

    // Submit the form
    form.appendTo(document.body);
    form.submit();
    return false;
  });

  // Expand latest db settings if page was reloaded on error
  const currentDbType = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="radio"]:checked').val();
  if (currentDbType === undefined) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="radio"]').first().click();
  }
  if (currentDbType === 'sqlite' || dbtypes.sqlite && currentDbType === undefined) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#datadirContent').hide(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#databaseBackend').hide(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#databaseField').hide(250);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.float-spinner').hide(250);
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#adminpass').strengthify({
    zxcvbn: OC.linkTo('core', 'vendor/zxcvbn/dist/zxcvbn.js'),
    titles: [(0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate)('core', 'Very weak password'), (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate)('core', 'Weak password'), (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate)('core', 'So-so password'), (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate)('core', 'Good password'), (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate)('core', 'Strong password')],
    drawTitles: true,
    nonce: btoa((0,_OC_requesttoken_js__WEBPACK_IMPORTED_MODULE_2__.getToken)())
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dbpass').showPassword().keyup();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.toggle-password').click(function (event) {
    event.preventDefault();
    const currentValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().children('input').attr('type');
    if (currentValue === 'password') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().children('input').attr('type', 'text');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().children('input').attr('type', 'password');
    }
  });
});

/***/ }),

/***/ "./core/src/jquery/showpassword.js":
/*!*****************************************!*\
  !*** ./core/src/jquery/showpassword.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @copyright 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
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
 */



/**
 * @name Show Password
 * @description
 * @version 1.3.0
 * @requires Jquery 1.5
 *
 * @author Jan Jarfalk <jan.jarfalk@unwrongest.com>
 * author-website http://www.unwrongest.com
 *
 * special-thanks Michel Gratton
 *
 * @license MIT
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.extend({
  showPassword(c) {
    // Setup callback object
    const callback = {
      fn: null,
      args: {}
    };
    callback.fn = c;

    // Clones passwords and turn the clones into text inputs
    const cloneElement = function (element) {
      const $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
      const $clone = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input />');

      // Name added for JQuery Validation compatibility
      // Element name is required to avoid script warning.
      $clone.attr({
        type: 'text',
        class: $element.attr('class'),
        style: $element.attr('style'),
        size: $element.attr('size'),
        name: $element.attr('name') + '-clone',
        tabindex: $element.attr('tabindex'),
        autocomplete: 'off'
      });
      if ($element.attr('placeholder') !== undefined) {
        $clone.attr('placeholder', $element.attr('placeholder'));
      }
      return $clone;
    };

    // Transfers values between two elements
    const update = function (a, b) {
      b.val(a.val());
    };

    // Shows a or b depending on checkbox
    const setState = function (checkbox, a, b) {
      if (checkbox.is(':checked')) {
        update(a, b);
        b.show();
        a.hide();
      } else {
        update(b, a);
        b.hide();
        a.show();
      }
    };
    return this.each(function () {
      const $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      const $checkbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()($input.data('typetoggle'));

      // Create clone
      const $clone = cloneElement($input);
      $clone.insertAfter($input);

      // Set callback arguments
      if (callback.fn) {
        callback.args.input = $input;
        callback.args.checkbox = $checkbox;
        callback.args.clone = $clone;
      }
      $checkbox.bind('click', function () {
        setState($checkbox, $input, $clone);
      });
      $input.bind('keyup', function () {
        update($input, $clone);
      });
      $clone.bind('keyup', function () {
        update($clone, $input);

        // Added for JQuery Validation compatibility
        // This will trigger validation if it's ON for keyup event
        $input.trigger('keyup');
      });

      // Added for JQuery Validation compatibility
      // This will trigger validation if it's ON for blur event
      $clone.bind('blur', function () {
        $input.trigger('focusout');
      });
      setState($checkbox, $input, $clone);

      // set type of password field clone (type=text) to password right on submit
      // to prevent browser save the value of this field
      $clone.closest('form').submit(function (e) {
        // .prop has to be used, because .attr throws
        // an error while changing a type of an input
        // element
        $clone.prop('type', 'password');
      });
      if (callback.fn) {
        callback.fn(callback.args);
      }
    });
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"core-install": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunknextcloud"] = self["webpackChunknextcloud"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["core-common"], () => (__webpack_require__("./core/src/install.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=core-install.js.map?v=4d9691df6dd9ccf1c54e