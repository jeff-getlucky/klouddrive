/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/comments/src/comments-app.js":
/*!*******************************************!*\
  !*** ./apps/comments/src/comments-app.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_CommentsInstance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/CommentsInstance.js */ "./apps/comments/src/services/CommentsInstance.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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



// Init Comments
if (window.OCA && !window.OCA.Comments) {
  Object.assign(window.OCA, {
    Comments: {}
  });
}

// Init Comments App view
Object.assign(window.OCA.Comments, {
  View: _services_CommentsInstance_js__WEBPACK_IMPORTED_MODULE_0__["default"]
});
console.debug('OCA.Comments.View initialized');

/***/ }),

/***/ "./apps/comments/src/mixins/CommentMixin.js":
/*!**************************************************!*\
  !*** ./apps/comments/src/mixins/CommentMixin.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_NewComment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/NewComment.js */ "./apps/comments/src/services/NewComment.js");
/* harmony import */ var _services_DeleteComment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/DeleteComment.js */ "./apps/comments/src/services/DeleteComment.js");
/* harmony import */ var _services_EditComment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/EditComment.js */ "./apps/comments/src/services/EditComment.js");
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    id: {
      type: Number,
      default: null
    },
    message: {
      type: String,
      default: ''
    },
    ressourceId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      deleted: false,
      editing: false,
      loading: false
    };
  },
  methods: {
    // EDITION
    onEdit() {
      this.editing = true;
    },
    onEditCancel() {
      this.editing = false;
      // Restore original value
      this.updateLocalMessage(this.message);
    },
    async onEditComment(message) {
      this.loading = true;
      try {
        await (0,_services_EditComment_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.commentsType, this.ressourceId, this.id, message);
        this.logger.debug('Comment edited', {
          commentsType: this.commentsType,
          ressourceId: this.ressourceId,
          id: this.id,
          message
        });
        this.$emit('update:message', message);
        this.editing = false;
      } catch (error) {
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_3__.showError)(t('comments', 'An error occurred while trying to edit the comment'));
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // DELETION
    onDeleteWithUndo() {
      this.deleted = true;
      const timeOutDelete = setTimeout(this.onDelete, _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_3__.TOAST_UNDO_TIMEOUT);
      (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_3__.showUndo)(t('comments', 'Comment deleted'), () => {
        clearTimeout(timeOutDelete);
        this.deleted = false;
      });
    },
    async onDelete() {
      try {
        await (0,_services_DeleteComment_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.commentsType, this.ressourceId, this.id);
        this.logger.debug('Comment deleted', {
          commentsType: this.commentsType,
          ressourceId: this.ressourceId,
          id: this.id
        });
        this.$emit('delete', this.id);
      } catch (error) {
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_3__.showError)(t('comments', 'An error occurred while trying to delete the comment'));
        console.error(error);
        this.deleted = false;
      }
    },
    // CREATION
    async onNewComment(message) {
      this.loading = true;
      try {
        const newComment = await (0,_services_NewComment_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.commentsType, this.ressourceId, message);
        this.logger.debug('New comment posted', {
          commentsType: this.commentsType,
          ressourceId: this.ressourceId,
          newComment
        });
        this.$emit('new', newComment);

        // Clear old content
        this.$emit('update:message', '');
        this.localMessage = '';
      } catch (error) {
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_3__.showError)(t('comments', 'An error occurred while trying to create the comment'));
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});

/***/ }),

/***/ "./apps/comments/src/services/CommentsInstance.js":
/*!********************************************************!*\
  !*** ./apps/comments/src/services/CommentsInstance.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CommentInstance)
/* harmony export */ });
/* harmony import */ var _nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/logger */ "./node_modules/@nextcloud/logger/dist/index.js");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _views_Comments_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/Comments.vue */ "./apps/comments/src/views/Comments.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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





const logger = (0,_nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__.getLoggerBuilder)().setApp('comments').detectUser().build();

// Add translates functions
vue__WEBPACK_IMPORTED_MODULE_3__["default"].mixin({
  data() {
    return {
      logger
    };
  },
  methods: {
    t: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate,
    n: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translatePlural
  }
});
class CommentInstance {
  /**
   * Initialize a new Comments instance for the desired type
   *
   * @param {string} commentsType the comments endpoint type
   * @param  {object} options the vue options (propsData, parent, el...)
   */
  constructor() {
    let commentsType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'files';
    let options = arguments.length > 1 ? arguments[1] : undefined;
    // Add comments type as a global mixin
    vue__WEBPACK_IMPORTED_MODULE_3__["default"].mixin({
      data() {
        return {
          commentsType
        };
      }
    });

    // Init Comments component
    const View = vue__WEBPACK_IMPORTED_MODULE_3__["default"].extend(_views_Comments_vue__WEBPACK_IMPORTED_MODULE_2__["default"]);
    return new View(options);
  }
}

/***/ }),

/***/ "./apps/comments/src/services/DavClient.js":
/*!*************************************************!*\
  !*** ./apps/comments/src/services/DavClient.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webdav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webdav */ "./node_modules/webdav/dist/web/index.js");
/* harmony import */ var _utils_davUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/davUtils.js */ "./apps/comments/src/utils/davUtils.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
var _getRequestToken;
/**
 * @copyright Copyright (c) 2021 John Molakvoæ <skjnldsv@protonmail.com>
 *
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */





// init webdav client
const client = (0,webdav__WEBPACK_IMPORTED_MODULE_0__.createClient)((0,_utils_davUtils_js__WEBPACK_IMPORTED_MODULE_1__.getRootPath)(), {
  headers: {
    // Add this so the server knows it is an request from the browser
    'X-Requested-With': 'XMLHttpRequest',
    // Inject user auth
    requesttoken: (_getRequestToken = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_2__.getRequestToken)()) !== null && _getRequestToken !== void 0 ? _getRequestToken : ''
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);

/***/ }),

/***/ "./apps/comments/src/services/DeleteComment.js":
/*!*****************************************************!*\
  !*** ./apps/comments/src/services/DeleteComment.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DavClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DavClient.js */ "./apps/comments/src/services/DavClient.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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
 * Delete a comment
 *
 * @param {string} commentsType the ressource type
 * @param {number} ressourceId the ressource ID
 * @param {number} commentId the comment iD
 */
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(commentsType, ressourceId, commentId) {
  const commentPath = ['', commentsType, ressourceId, commentId].join('/');

  // Fetch newly created comment data
  await _DavClient_js__WEBPACK_IMPORTED_MODULE_0__["default"].deleteFile(commentPath);
}

/***/ }),

/***/ "./apps/comments/src/services/EditComment.js":
/*!***************************************************!*\
  !*** ./apps/comments/src/services/EditComment.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DavClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DavClient.js */ "./apps/comments/src/services/DavClient.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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
 * Edit an existing comment
 *
 * @param {string} commentsType the ressource type
 * @param {number} ressourceId the ressource ID
 * @param {number} commentId the comment iD
 * @param {string} message the message content
 */
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(commentsType, ressourceId, commentId, message) {
  const commentPath = ['', commentsType, ressourceId, commentId].join('/');
  return await _DavClient_js__WEBPACK_IMPORTED_MODULE_0__["default"].customRequest(commentPath, Object.assign({
    method: 'PROPPATCH',
    data: "<?xml version=\"1.0\"?>\n\t\t\t<d:propertyupdate\n\t\t\t\txmlns:d=\"DAV:\"\n\t\t\t\txmlns:oc=\"http://owncloud.org/ns\">\n\t\t\t<d:set>\n\t\t\t\t<d:prop>\n\t\t\t\t\t<oc:message>".concat(message, "</oc:message>\n\t\t\t\t</d:prop>\n\t\t\t</d:set>\n\t\t\t</d:propertyupdate>")
  }));
}

/***/ }),

/***/ "./apps/comments/src/services/NewComment.js":
/*!**************************************************!*\
  !*** ./apps/comments/src/services/NewComment.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _utils_davUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/davUtils.js */ "./apps/comments/src/utils/davUtils.js");
/* harmony import */ var _utils_decodeHtmlEntities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/decodeHtmlEntities.js */ "./apps/comments/src/utils/decodeHtmlEntities.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
/* harmony import */ var _DavClient_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DavClient.js */ "./apps/comments/src/services/DavClient.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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
 * Retrieve the comments list
 *
 * @param {string} commentsType the ressource type
 * @param {number} ressourceId the ressource ID
 * @param {string} message the message
 * @return {object} the new comment
 */
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(commentsType, ressourceId, message) {
  const ressourcePath = ['', commentsType, ressourceId].join('/');
  const response = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"].post((0,_utils_davUtils_js__WEBPACK_IMPORTED_MODULE_1__.getRootPath)() + ressourcePath, {
    actorDisplayName: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)().displayName,
    actorId: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)().uid,
    actorType: 'users',
    creationDateTime: new Date().toUTCString(),
    message,
    objectType: 'files',
    verb: 'comment'
  });

  // Retrieve comment id from ressource location
  const commentId = parseInt(response.headers['content-location'].split('/').pop());
  const commentPath = ressourcePath + '/' + commentId;

  // Fetch newly created comment data
  const comment = await _DavClient_js__WEBPACK_IMPORTED_MODULE_4__["default"].stat(commentPath, {
    details: true
  });
  const props = comment.data.props;
  // Decode twice to handle potentially double-encoded entities
  // FIXME Remove this once https://github.com/nextcloud/server/issues/29306
  // is resolved
  props.actorDisplayName = (0,_utils_decodeHtmlEntities_js__WEBPACK_IMPORTED_MODULE_2__.decodeHtmlEntities)(props.actorDisplayName, 2);
  props.message = (0,_utils_decodeHtmlEntities_js__WEBPACK_IMPORTED_MODULE_2__.decodeHtmlEntities)(props.message, 2);
  return comment.data;
}

/***/ }),

/***/ "./apps/comments/src/utils/cancelableRequest.js":
/*!******************************************************!*\
  !*** ./apps/comments/src/utils/cancelableRequest.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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
 * Creates a cancelable axios 'request object'.
 *
 * @param {Function} request the axios promise request
 * @return {object}
 */
const cancelableRequest = function (request) {
  const controller = new AbortController();
  const signal = controller.signal;

  /**
   * Execute the request
   *
   * @param {string} url the url to send the request to
   * @param {object} [options] optional config for the request
   */
  const fetch = async function (url, options) {
    const response = await request(url, Object.assign({
      signal
    }, options));
    return response;
  };
  return {
    request: fetch,
    abort: () => controller.abort()
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cancelableRequest);

/***/ }),

/***/ "./apps/comments/src/utils/davUtils.js":
/*!*********************************************!*\
  !*** ./apps/comments/src/utils/davUtils.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRootPath": () => (/* binding */ getRootPath)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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


const getRootPath = function () {
  return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateRemoteUrl)('dav/comments');
};


/***/ }),

/***/ "./apps/comments/src/utils/decodeHtmlEntities.js":
/*!*******************************************************!*\
  !*** ./apps/comments/src/utils/decodeHtmlEntities.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeHtmlEntities": () => (/* binding */ decodeHtmlEntities)
/* harmony export */ });
/**
 * @copyright Copyright (c) 2021 Christopher Ng <chrng8@gmail.com>
 *
 * @author Christopher Ng <chrng8@gmail.com>
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
 * @param {any} value -
 * @param {any} passes -
 */
function decodeHtmlEntities(value) {
  let passes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  const parser = new DOMParser();
  let decoded = value;
  for (let i = 0; i < passes; i++) {
    decoded = parser.parseFromString(decoded, 'text/html').documentElement.textContent;
  }
  return decoded;
}

/***/ }),

/***/ "./apps/comments/src/services/GetComments.ts":
/*!***************************************************!*\
  !*** ./apps/comments/src/services/GetComments.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_LIMIT": () => (/* binding */ DEFAULT_LIMIT),
/* harmony export */   "getComments": () => (/* binding */ getComments)
/* harmony export */ });
/* harmony import */ var webdav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webdav */ "./node_modules/webdav/dist/web/index.js");
/* harmony import */ var _node_modules_webdav_dist_node_response_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/webdav/dist/node/response.js */ "./node_modules/webdav/dist/node/response.js");
/* harmony import */ var _node_modules_webdav_dist_node_tools_dav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/webdav/dist/node/tools/dav.js */ "./node_modules/webdav/dist/node/tools/dav.js");
/* harmony import */ var _DavClient_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DavClient.js */ "./apps/comments/src/services/DavClient.js");
/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
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

// https://github.com/perry-mitchell/webdav-client/issues/339



const DEFAULT_LIMIT = 20;
/**
 * Retrieve the comments list
 *
 * @param {object} data destructuring object
 * @param {string} data.commentsType the ressource type
 * @param {number} data.ressourceId the ressource ID
 * @param {object} [options] optional options for axios
 * @param {number} [options.offset] the pagination offset
 * @return {object[]} the comments list
 */
const getComments = async function (_ref, options) {
  let {
    commentsType,
    ressourceId
  } = _ref;
  const ressourcePath = ['', commentsType, ressourceId].join('/');
  const response = await _DavClient_js__WEBPACK_IMPORTED_MODULE_3__["default"].customRequest(ressourcePath, Object.assign({
    method: 'REPORT',
    data: "<?xml version=\"1.0\"?>\n\t\t\t<oc:filter-comments\n\t\t\t\txmlns:d=\"DAV:\"\n\t\t\t\txmlns:oc=\"http://owncloud.org/ns\"\n\t\t\t\txmlns:nc=\"http://nextcloud.org/ns\"\n\t\t\t\txmlns:ocs=\"http://open-collaboration-services.org/ns\">\n\t\t\t\t<oc:limit>".concat(DEFAULT_LIMIT, "</oc:limit>\n\t\t\t\t<oc:offset>").concat(options.offset || 0, "</oc:offset>\n\t\t\t</oc:filter-comments>")
  }, options));
  const responseData = await response.text();
  const result = await (0,webdav__WEBPACK_IMPORTED_MODULE_0__.parseXML)(responseData);
  const stat = getDirectoryFiles(result, true);
  return (0,_node_modules_webdav_dist_node_response_js__WEBPACK_IMPORTED_MODULE_1__.processResponsePayload)(response, stat, true);
};
// https://github.com/perry-mitchell/webdav-client/blob/8d9694613c978ce7404e26a401c39a41f125f87f/source/operations/directoryContents.ts
const getDirectoryFiles = function (result) {
  let isDetailed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // Extract the response items (directory contents)
  const {
    multistatus: {
      response: responseItems
    }
  } = result;
  // Map all items to a consistent output structure (results)
  return responseItems.map(item => {
    // Each item should contain a stat object
    const {
      propstat: {
        prop: props
      }
    } = item;
    return (0,_node_modules_webdav_dist_node_tools_dav_js__WEBPACK_IMPORTED_MODULE_2__.prepareFileFromProps)(props, props.id.toString(), isDetailed);
  });
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _nextcloud_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/moment */ "./node_modules/@nextcloud/moment/dist/index.js");
/* harmony import */ var _nextcloud_moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcActionButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcActionButton.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcActions.js */ "./node_modules/@nextcloud/vue/dist/Components/NcActions.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcActionSeparator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcActionSeparator.js */ "./node_modules/@nextcloud/vue/dist/Components/NcActionSeparator.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcActionSeparator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcActionSeparator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcAvatar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcAvatar.js */ "./node_modules/@nextcloud/vue/dist/Components/NcAvatar.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcAvatar_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcAvatar_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcRichContenteditable_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcRichContenteditable.js */ "./node_modules/@nextcloud/vue/dist/Components/NcRichContenteditable.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcRichContenteditable_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcRichContenteditable_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _nextcloud_vue_dist_Mixins_richEditor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextcloud/vue/dist/Mixins/richEditor.js */ "./node_modules/@nextcloud/vue/dist/Mixins/richEditor.js");
/* harmony import */ var _nextcloud_vue_dist_Mixins_richEditor_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Mixins_richEditor_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vue_material_design_icons_ArrowRight_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-material-design-icons/ArrowRight.vue */ "./node_modules/vue-material-design-icons/ArrowRight.vue");
/* harmony import */ var _Moment_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Moment.vue */ "./apps/comments/src/components/Moment.vue");
/* harmony import */ var _mixins_CommentMixin_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../mixins/CommentMixin.js */ "./apps/comments/src/mixins/CommentMixin.js");












/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Comment',
  components: {
    NcActionButton: (_nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_2___default()),
    NcActions: (_nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_3___default()),
    NcActionSeparator: (_nextcloud_vue_dist_Components_NcActionSeparator_js__WEBPACK_IMPORTED_MODULE_4___default()),
    ArrowRight: vue_material_design_icons_ArrowRight_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    NcAvatar: (_nextcloud_vue_dist_Components_NcAvatar_js__WEBPACK_IMPORTED_MODULE_5___default()),
    NcButton: (_nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6___default()),
    Moment: _Moment_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    NcRichContenteditable: (_nextcloud_vue_dist_Components_NcRichContenteditable_js__WEBPACK_IMPORTED_MODULE_7___default())
  },
  mixins: [(_nextcloud_vue_dist_Mixins_richEditor_js__WEBPACK_IMPORTED_MODULE_8___default()), _mixins_CommentMixin_js__WEBPACK_IMPORTED_MODULE_11__["default"]],
  inheritAttrs: false,
  props: {
    actorDisplayName: {
      type: String,
      required: true
    },
    actorId: {
      type: String,
      required: true
    },
    creationDateTime: {
      type: String,
      default: null
    },
    /**
     * Force the editor display
     */
    editor: {
      type: Boolean,
      default: false
    },
    /**
     * Provide the autocompletion data
     */
    autoComplete: {
      type: Function,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      expanded: false,
      // Only change data locally and update the original
      // parent data when the request is sent and resolved
      localMessage: ''
    };
  },
  computed: {
    /**
     * Is the current user the author of this comment
     *
     * @return {boolean}
     */
    isOwnComment() {
      return (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)().uid === this.actorId;
    },
    /**
     * Rendered content as html string
     *
     * @return {string}
     */
    renderedContent() {
      if (this.isEmptyMessage) {
        return '';
      }
      return this.renderContent(this.localMessage);
    },
    isEmptyMessage() {
      return !this.localMessage || this.localMessage.trim() === '';
    },
    timestamp() {
      // seconds, not milliseconds
      return parseInt(_nextcloud_moment__WEBPACK_IMPORTED_MODULE_1___default()(this.creationDateTime).format('x'), 10) / 1000;
    }
  },
  watch: {
    // If the data change, update the local value
    message(message) {
      this.updateLocalMessage(message);
    }
  },
  beforeMount() {
    // Init localMessage
    this.updateLocalMessage(this.message);
  },
  methods: {
    /**
     * Update local Message on outer change
     *
     * @param {string} message the message to set
     */
    updateLocalMessage(message) {
      this.localMessage = message.toString();
    },
    /**
     * Dispatch message between edit and create
     */
    onSubmit() {
      // Do not submit if message is empty
      if (this.localMessage.trim() === '') {
        return;
      }
      if (this.editor) {
        this.onNewComment(this.localMessage.trim());
        this.$nextTick(() => {
          // Focus the editor again
          this.$refs.editor.$el.focus();
        });
        return;
      }
      this.onEditComment(this.localMessage.trim());
    },
    onExpand() {
      this.expanded = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Moment.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Moment.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/moment */ "./node_modules/@nextcloud/moment/dist/index.js");
/* harmony import */ var _nextcloud_moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_moment__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Moment',
  props: {
    timestamp: {
      type: Number,
      required: true
    },
    format: {
      type: String,
      default: 'LLL'
    }
  },
  computed: {
    title() {
      return _nextcloud_moment__WEBPACK_IMPORTED_MODULE_0___default().unix(this.timestamp).format(this.format);
    },
    formatted() {
      return _nextcloud_moment__WEBPACK_IMPORTED_MODULE_0___default().unix(this.timestamp).fromNow();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.esm.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
/* harmony import */ var v_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! v-tooltip */ "./node_modules/v-tooltip/dist/v-tooltip.esm.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcEmptyContent.js */ "./node_modules/@nextcloud/vue/dist/Components/NcEmptyContent.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vue_material_design_icons_Refresh_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-material-design-icons/Refresh.vue */ "./node_modules/vue-material-design-icons/Refresh.vue");
/* harmony import */ var vue_material_design_icons_MessageReplyText_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-material-design-icons/MessageReplyText.vue */ "./node_modules/vue-material-design-icons/MessageReplyText.vue");
/* harmony import */ var vue_material_design_icons_AlertCircleOutline_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-material-design-icons/AlertCircleOutline.vue */ "./node_modules/vue-material-design-icons/AlertCircleOutline.vue");
/* harmony import */ var _components_Comment_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Comment.vue */ "./apps/comments/src/components/Comment.vue");
/* harmony import */ var _services_GetComments_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/GetComments.ts */ "./apps/comments/src/services/GetComments.ts");
/* harmony import */ var _utils_cancelableRequest_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/cancelableRequest.js */ "./apps/comments/src/utils/cancelableRequest.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");














vue__WEBPACK_IMPORTED_MODULE_13__["default"].use(v_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Comments',
  components: {
    // Avatar,
    Comment: _components_Comment_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    NcEmptyContent: (_nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5___default()),
    NcButton: (_nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_6___default()),
    RefreshIcon: vue_material_design_icons_Refresh_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    MessageReplyTextIcon: vue_material_design_icons_MessageReplyText_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    AlertCircleOutlineIcon: vue_material_design_icons_AlertCircleOutline_vue__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  data() {
    return {
      error: '',
      loading: false,
      done: false,
      ressourceId: null,
      offset: 0,
      comments: [],
      cancelRequest: () => {},
      editorData: {
        actorDisplayName: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)().displayName,
        actorId: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)().uid,
        key: 'editor'
      },
      Comment: _components_Comment_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
      userData: {}
    };
  },
  computed: {
    hasComments() {
      return this.comments.length > 0;
    },
    isFirstLoading() {
      return this.loading && this.offset === 0;
    }
  },
  methods: {
    /**
     * Update current ressourceId and fetch new data
     *
     * @param {number} ressourceId the current ressourceId (fileId...)
     */
    async update(ressourceId) {
      this.ressourceId = ressourceId;
      this.resetState();
      this.getComments();
    },
    /**
     * Ran when the bottom of the tab is reached
     */
    onScrollBottomReached() {
      /**
       * Do not fetch more if we:
       * - are showing an error
       * - already fetched everything
       * - are currently loading
       */
      if (this.error || this.done || this.loading) {
        return;
      }
      this.getComments();
    },
    /**
     * Make sure we have all mentions as Array of objects
     *
     * @param {Array} mentions the mentions list
     * @return {Object<string, object>}
     */
    genMentionsData(mentions) {
      Object.values(mentions).flat().forEach(mention => {
        this.userData[mention.mentionId] = {
          // TODO: support groups
          icon: 'icon-user',
          id: mention.mentionId,
          label: mention.mentionDisplayName,
          source: 'users',
          primary: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)().uid === mention.mentionId
        };
      });
      return this.userData;
    },
    /**
     * Get the existing shares infos
     */
    async getComments() {
      // Cancel any ongoing request
      this.cancelRequest('cancel');
      try {
        this.loading = true;
        this.error = '';

        // Init cancellable request
        const {
          request,
          abort
        } = (0,_utils_cancelableRequest_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_services_GetComments_ts__WEBPACK_IMPORTED_MODULE_11__.getComments);
        this.cancelRequest = abort;

        // Fetch comments
        const {
          data: comments
        } = (await request({
          commentsType: this.commentsType,
          ressourceId: this.ressourceId
        }, {
          offset: this.offset
        })) || {
          data: []
        };
        this.logger.debug("Processed ".concat(comments.length, " comments"), {
          comments
        });

        // We received less than the requested amount,
        // we're done fetching comments
        if (comments.length < _services_GetComments_ts__WEBPACK_IMPORTED_MODULE_11__.DEFAULT_LIMIT) {
          this.done = true;
        }

        // Insert results
        this.comments.push(...comments);

        // Increase offset for next fetch
        this.offset += _services_GetComments_ts__WEBPACK_IMPORTED_MODULE_11__.DEFAULT_LIMIT;
      } catch (error) {
        if (error.message === 'cancel') {
          return;
        }
        this.error = t('comments', 'Unable to load the comments list');
        console.error('Error loading the comments list', error);
      } finally {
        this.loading = false;
      }
    },
    /**
     * Autocomplete @mentions
     *
     * @param {string} search the query
     * @param {Function} callback the callback to process the results with
     */
    async autoComplete(search, callback) {
      const results = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('core/autocomplete/get'), {
        params: {
          search,
          itemType: 'files',
          itemId: this.ressourceId,
          sorter: 'commenters|share-recipients',
          limit: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('comments', 'maxAutoCompleteResults')
        }
      });
      // Save user data so it can be used by the editor to replace mentions
      results.data.ocs.data.forEach(user => {
        this.userData[user.id] = user;
      });
      return callback(Object.values(this.userData));
    },
    /**
     * Add newly created comment to the list
     *
     * @param {object} comment the new comment
     */
    onNewComment(comment) {
      this.comments.unshift(comment);
    },
    /**
     * Remove deleted comment from the list
     *
     * @param {number} id the deleted comment
     */
    onDelete(id) {
      const index = this.comments.findIndex(comment => comment.props.id === id);
      if (index > -1) {
        this.comments.splice(index, 1);
      } else {
        console.error('Could not find the deleted comment in the list', id);
      }
    },
    /**
     * Reset the current view to its default state
     */
    resetState() {
      this.error = '';
      this.loading = false;
      this.done = false;
      this.offset = 0;
      this.comments = [];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=template&id=5aee423d&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=template&id=5aee423d&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c(_vm.tag, {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.deleted,
      expression: "!deleted"
    }],
    tag: "component",
    staticClass: "comment",
    class: {
      "comment--loading": _vm.loading
    }
  }, [_c("div", {
    staticClass: "comment__side"
  }, [_c("NcAvatar", {
    staticClass: "comment__avatar",
    attrs: {
      "display-name": _vm.actorDisplayName,
      user: _vm.actorId,
      size: 32
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "comment__body"
  }, [_c("div", {
    staticClass: "comment__header"
  }, [_c("span", {
    staticClass: "comment__author"
  }, [_vm._v(_vm._s(_vm.actorDisplayName))]), _vm._v(" "), _vm.isOwnComment && _vm.id && !_vm.loading ? _c("NcActions", {
    staticClass: "comment__actions"
  }, [!_vm.editing ? [_c("NcActionButton", {
    attrs: {
      "close-after-click": true,
      icon: "icon-rename"
    },
    on: {
      click: _vm.onEdit
    }
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.t("comments", "Edit comment")) + "\n\t\t\t\t\t")]), _vm._v(" "), _c("NcActionSeparator"), _vm._v(" "), _c("NcActionButton", {
    attrs: {
      "close-after-click": true,
      icon: "icon-delete"
    },
    on: {
      click: _vm.onDeleteWithUndo
    }
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.t("comments", "Delete comment")) + "\n\t\t\t\t\t")])] : _c("NcActionButton", {
    attrs: {
      icon: "icon-close"
    },
    on: {
      click: _vm.onEditCancel
    }
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("comments", "Cancel edit")) + "\n\t\t\t\t")])], 2) : _vm._e(), _vm._v(" "), _vm.id && _vm.loading ? _c("div", {
    staticClass: "comment_loading icon-loading-small"
  }) : _vm.creationDateTime ? _c("Moment", {
    staticClass: "comment__timestamp",
    attrs: {
      timestamp: _vm.timestamp
    }
  }) : _vm._e()], 1), _vm._v(" "), _vm.editor || _vm.editing ? _c("div", {
    staticClass: "comment__editor"
  }, [_c("NcRichContenteditable", {
    ref: "editor",
    attrs: {
      "auto-complete": _vm.autoComplete,
      contenteditable: !_vm.loading,
      value: _vm.localMessage,
      "user-data": _vm.userData
    },
    on: {
      "update:value": _vm.updateLocalMessage,
      submit: _vm.onSubmit
    }
  }), _vm._v(" "), _c("NcButton", {
    staticClass: "comment__submit",
    attrs: {
      type: "tertiary-no-background",
      "native-type": "submit",
      "aria-label": _vm.t("comments", "Post comment"),
      disabled: _vm.isEmptyMessage
    },
    on: {
      click: _vm.onSubmit
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_vm.loading ? _c("span", {
          staticClass: "icon-loading-small"
        }) : _c("ArrowRight", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }], null, false, 2357784758)
  })], 1) : _c("div", {
    staticClass: "comment__message",
    class: {
      "comment__message--expanded": _vm.expanded
    },
    domProps: {
      innerHTML: _vm._s(_vm.renderedContent)
    },
    on: {
      click: _vm.onExpand
    }
  })])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Moment.vue?vue&type=template&id=d9d7c9dc&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Moment.vue?vue&type=template&id=d9d7c9dc& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("span", {
    staticClass: "live-relative-timestamp",
    attrs: {
      "data-timestamp": _vm.timestamp * 1000,
      title: _vm.title
    }
  }, [_vm._v(_vm._s(_vm.formatted))]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "comments",
    class: {
      "icon-loading": _vm.isFirstLoading
    }
  }, [_c("Comment", _vm._b({
    staticClass: "comments__writer",
    attrs: {
      "auto-complete": _vm.autoComplete,
      "user-data": _vm.userData,
      editor: true,
      "ressource-id": _vm.ressourceId
    },
    on: {
      new: _vm.onNewComment
    }
  }, "Comment", _vm.editorData, false)), _vm._v(" "), !_vm.isFirstLoading ? [!_vm.hasComments && _vm.done ? _c("NcEmptyContent", {
    staticClass: "comments__empty",
    attrs: {
      title: _vm.t("comments", "No comments yet, start the conversation!")
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("MessageReplyTextIcon")];
      },
      proxy: true
    }], null, false, 1033639148)
  }) : _c("ul", _vm._l(_vm.comments, function (comment) {
    return _c("Comment", _vm._b({
      key: comment.props.id,
      staticClass: "comments__list",
      attrs: {
        tag: "li",
        "auto-complete": _vm.autoComplete,
        message: comment.props.message,
        "ressource-id": _vm.ressourceId,
        "user-data": _vm.genMentionsData(comment.props.mentions)
      },
      on: {
        "update:message": function ($event) {
          return _vm.$set(comment.props, "message", $event);
        },
        delete: _vm.onDelete
      }
    }, "Comment", comment.props, false));
  }), 1), _vm._v(" "), _vm.loading && !_vm.isFirstLoading ? _c("div", {
    staticClass: "comments__info icon-loading"
  }) : _vm.hasComments && _vm.done ? _c("div", {
    staticClass: "comments__info"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("comments", "No more messages")) + "\n\t\t")]) : _vm.error ? [_c("NcEmptyContent", {
    staticClass: "comments__error",
    attrs: {
      title: _vm.error
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("AlertCircleOutlineIcon")];
      },
      proxy: true
    }], null, false, 66050004)
  }), _vm._v(" "), _c("NcButton", {
    staticClass: "comments__retry",
    on: {
      click: _vm.getComments
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("RefreshIcon")];
      },
      proxy: true
    }], null, false, 3924573781)
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.t("comments", "Retry")) + "\n\t\t\t")])] : _vm._e()] : _vm._e()], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".comment[data-v-5aee423d] {\n  display: flex;\n  gap: 16px;\n  position: relative;\n  padding: 5px 10px;\n}\n.comment__side[data-v-5aee423d] {\n  display: flex;\n  align-items: flex-start;\n  padding-top: 16px;\n}\n.comment__body[data-v-5aee423d] {\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n}\n.comment__header[data-v-5aee423d] {\n  display: flex;\n  align-items: center;\n  min-height: 44px;\n}\n.comment__actions[data-v-5aee423d] {\n  margin-left: 10px !important;\n}\n.comment__author[data-v-5aee423d] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: var(--color-text-maxcontrast);\n}\n.comment_loading[data-v-5aee423d], .comment__timestamp[data-v-5aee423d] {\n  margin-left: auto;\n  text-align: right;\n  white-space: nowrap;\n  color: var(--color-text-maxcontrast);\n}\n.comment__submit[data-v-5aee423d] {\n  position: absolute !important;\n  right: 0;\n  bottom: 0;\n  margin: 1px;\n}\n.comment__message[data-v-5aee423d] {\n  white-space: pre-wrap;\n  word-break: break-word;\n  max-height: 70px;\n  overflow: hidden;\n  margin-top: -6px;\n}\n.comment__message--expanded[data-v-5aee423d] {\n  max-height: none;\n  overflow: visible;\n}\n.rich-contenteditable__input[data-v-5aee423d] {\n  min-height: 44px;\n  margin: 0;\n  padding: 10px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".comments__empty[data-v-b0ddc2e8], .comments__error[data-v-b0ddc2e8] {\n  margin-top: 0 !important;\n}\n.comments__retry[data-v-b0ddc2e8] {\n  margin: 0 auto;\n}\n.comments__info[data-v-b0ddc2e8] {\n  height: 60px;\n  color: var(--color-text-maxcontrast);\n  text-align: center;\n  line-height: 60px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./apps/comments/src/components/Comment.vue":
/*!**************************************************!*\
  !*** ./apps/comments/src/components/Comment.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Comment_vue_vue_type_template_id_5aee423d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment.vue?vue&type=template&id=5aee423d&scoped=true& */ "./apps/comments/src/components/Comment.vue?vue&type=template&id=5aee423d&scoped=true&");
/* harmony import */ var _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.vue?vue&type=script&lang=js& */ "./apps/comments/src/components/Comment.vue?vue&type=script&lang=js&");
/* harmony import */ var _Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true& */ "./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Comment_vue_vue_type_template_id_5aee423d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Comment_vue_vue_type_template_id_5aee423d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5aee423d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/comments/src/components/Comment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/comments/src/components/Moment.vue":
/*!*************************************************!*\
  !*** ./apps/comments/src/components/Moment.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Moment_vue_vue_type_template_id_d9d7c9dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Moment.vue?vue&type=template&id=d9d7c9dc& */ "./apps/comments/src/components/Moment.vue?vue&type=template&id=d9d7c9dc&");
/* harmony import */ var _Moment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Moment.vue?vue&type=script&lang=js& */ "./apps/comments/src/components/Moment.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Moment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Moment_vue_vue_type_template_id_d9d7c9dc___WEBPACK_IMPORTED_MODULE_0__.render,
  _Moment_vue_vue_type_template_id_d9d7c9dc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/comments/src/components/Moment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/comments/src/views/Comments.vue":
/*!**********************************************!*\
  !*** ./apps/comments/src/views/Comments.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Comments_vue_vue_type_template_id_b0ddc2e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true& */ "./apps/comments/src/views/Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true&");
/* harmony import */ var _Comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comments.vue?vue&type=script&lang=js& */ "./apps/comments/src/views/Comments.vue?vue&type=script&lang=js&");
/* harmony import */ var _Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true& */ "./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Comments_vue_vue_type_template_id_b0ddc2e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Comments_vue_vue_type_template_id_b0ddc2e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "b0ddc2e8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/comments/src/views/Comments.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/comments/src/components/Comment.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./apps/comments/src/components/Comment.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/comments/src/components/Moment.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./apps/comments/src/components/Moment.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Moment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Moment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Moment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Moment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/comments/src/views/Comments.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./apps/comments/src/views/Comments.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/comments/src/components/Comment.vue?vue&type=template&id=5aee423d&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./apps/comments/src/components/Comment.vue?vue&type=template&id=5aee423d&scoped=true& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_5aee423d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_5aee423d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_5aee423d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=template&id=5aee423d&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=template&id=5aee423d&scoped=true&");


/***/ }),

/***/ "./apps/comments/src/components/Moment.vue?vue&type=template&id=d9d7c9dc&":
/*!********************************************************************************!*\
  !*** ./apps/comments/src/components/Moment.vue?vue&type=template&id=d9d7c9dc& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Moment_vue_vue_type_template_id_d9d7c9dc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Moment_vue_vue_type_template_id_d9d7c9dc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Moment_vue_vue_type_template_id_d9d7c9dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Moment.vue?vue&type=template&id=d9d7c9dc& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Moment.vue?vue&type=template&id=d9d7c9dc&");


/***/ }),

/***/ "./apps/comments/src/views/Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./apps/comments/src/views/Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_template_id_b0ddc2e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_template_id_b0ddc2e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_template_id_b0ddc2e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=template&id=b0ddc2e8&scoped=true&");


/***/ }),

/***/ "./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5aee423d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/components/Comment.vue?vue&type=style&index=0&id=5aee423d&lang=scss&scoped=true&");


/***/ }),

/***/ "./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_id_b0ddc2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/comments/src/views/Comments.vue?vue&type=style&index=0&id=b0ddc2e8&lang=scss&scoped=true&");


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
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "-" + chunkId + ".js?v=" + "8ddaf1c5ac4936c83e13" + "";
/******/ 		};
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
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "nextcloud:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/******/ 			"comments-comments-app": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["core-common"], () => (__webpack_require__("./apps/comments/src/comments-app.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=comments-comments-app.js.map?v=819310ec717c44d1cd1e