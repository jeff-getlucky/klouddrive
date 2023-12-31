/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./core/src/services/UnifiedSearchService.js":
/*!***************************************************!*\
  !*** ./core/src/services/UnifiedSearchService.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultLimit": () => (/* binding */ defaultLimit),
/* harmony export */   "enableLiveSearch": () => (/* binding */ enableLiveSearch),
/* harmony export */   "getTypes": () => (/* binding */ getTypes),
/* harmony export */   "minSearchLength": () => (/* binding */ minSearchLength),
/* harmony export */   "regexFilterIn": () => (/* binding */ regexFilterIn),
/* harmony export */   "regexFilterNot": () => (/* binding */ regexFilterNot),
/* harmony export */   "search": () => (/* binding */ search)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.esm.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/**
 * @copyright 2020, John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author Daniel Calviño Sánchez <danxuliu@gmail.com>
 * @author Joas Schilling <coding@schilljs.com>
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




const defaultLimit = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('unified-search', 'limit-default');
const minSearchLength = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('unified-search', 'min-search-length', 1);
const enableLiveSearch = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('unified-search', 'live-search', true);
const regexFilterIn = /(^|\s)in:([a-z_-]+)/ig;
const regexFilterNot = /(^|\s)-in:([a-z_-]+)/ig;

/**
 * Create a cancel token
 *
 * @return {import('axios').CancelTokenSource}
 */
const createCancelToken = () => _nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"].CancelToken.source();

/**
 * Get the list of available search providers
 *
 * @return {Promise<Array>}
 */
async function getTypes() {
  try {
    const {
      data
    } = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('search/providers'), {
      params: {
        // Sending which location we're currently at
        from: window.location.pathname.replace('/index.php', '') + window.location.search
      }
    });
    if ('ocs' in data && 'data' in data.ocs && Array.isArray(data.ocs.data) && data.ocs.data.length > 0) {
      // Providers are sorted by the api based on their order key
      return data.ocs.data;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

/**
 * Get the list of available search providers
 *
 * @param {object} options destructuring object
 * @param {string} options.type the type to search
 * @param {string} options.query the search
 * @param {number|string|undefined} options.cursor the offset for paginated searches
 * @return {object} {request: Promise, cancel: Promise}
 */
function search(_ref) {
  let {
    type,
    query,
    cursor
  } = _ref;
  /**
   * Generate an axios cancel token
   */
  const cancelToken = createCancelToken();
  const request = async () => _nextcloud_axios__WEBPACK_IMPORTED_MODULE_2__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('search/providers/{type}/search', {
    type
  }), {
    cancelToken: cancelToken.token,
    params: {
      term: query,
      cursor,
      // Sending which location we're currently at
      from: window.location.pathname.replace('/index.php', '') + window.location.search
    }
  });
  return {
    request,
    cancel: cancelToken.cancel
  };
}

/***/ }),

/***/ "./core/src/unified-search.js":
/*!************************************!*\
  !*** ./core/src/unified-search.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/logger */ "./node_modules/@nextcloud/logger/dist/index.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _views_UnifiedSearch_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/UnifiedSearch.vue */ "./core/src/views/UnifiedSearch.vue");
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







// eslint-disable-next-line camelcase
__webpack_require__.nc = btoa((0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getRequestToken)());
const logger = (0,_nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__.getLoggerBuilder)().setApp('unified-search').detectUser().build();
vue__WEBPACK_IMPORTED_MODULE_4__["default"].mixin({
  data() {
    return {
      logger
    };
  },
  methods: {
    t: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translate,
    n: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translatePlural
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new vue__WEBPACK_IMPORTED_MODULE_4__["default"]({
  el: '#unified-search',
  // eslint-disable-next-line vue/match-component-file-name
  name: 'UnifiedSearchRoot',
  render: h => h(_views_UnifiedSearch_vue__WEBPACK_IMPORTED_MODULE_3__["default"])
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue_dist_Components_NcHighlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcHighlight.js */ "./node_modules/@nextcloud/vue/dist/Components/NcHighlight.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcHighlight_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcHighlight_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SearchResult',
  components: {
    NcHighlight: (_nextcloud_vue_dist_Components_NcHighlight_js__WEBPACK_IMPORTED_MODULE_0___default())
  },
  props: {
    thumbnailUrl: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    subline: {
      type: String,
      default: null
    },
    resourceUrl: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
      default: ''
    },
    /**
     * Only used for the first result as a visual feedback
     * so we can keep the search input focused but pressing
     * enter still opens the first result
     */
    focused: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasValidThumbnail: this.thumbnailUrl && this.thumbnailUrl.trim() !== '',
      loaded: false
    };
  },
  computed: {
    isIconUrl() {
      // If we're facing an absolute url
      if (this.icon.startsWith('/')) {
        return true;
      }

      // Otherwise, let's check if this is a valid url
      try {
        // eslint-disable-next-line no-new
        new URL(this.icon);
      } catch {
        return false;
      }
      return true;
    }
  },
  watch: {
    // Make sure to reset state on change even when vue recycle the component
    thumbnailUrl() {
      this.hasValidThumbnail = this.thumbnailUrl && this.thumbnailUrl.trim() !== '';
      this.loaded = false;
    }
  },
  methods: {
    reEmitEvent(e) {
      this.$emit(e.type, e);
    },
    /**
     * If the image fails to load, fallback to iconClass
     */
    onError() {
      this.hasValidThumbnail = false;
    },
    onLoad() {
      this.loaded = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SearchResultPlaceholders',
  data() {
    return {
      light: null,
      dark: null
    };
  },
  mounted() {
    const styles = getComputedStyle(document.documentElement);
    this.dark = styles.getPropertyValue('--color-placeholder-dark');
    this.light = styles.getPropertyValue('--color-placeholder-light');
  },
  methods: {
    randWidth() {
      return Math.floor(Math.random() * 20) + 30;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcActionButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcActionButton.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcActions.js */ "./node_modules/@nextcloud/vue/dist/Components/NcActions.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcEmptyContent.js */ "./node_modules/@nextcloud/vue/dist/Components/NcEmptyContent.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcHeaderMenu_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcHeaderMenu.js */ "./node_modules/@nextcloud/vue/dist/Components/NcHeaderMenu.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcHeaderMenu_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcHeaderMenu_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vue_material_design_icons_Magnify_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-material-design-icons/Magnify.vue */ "./node_modules/vue-material-design-icons/Magnify.vue");
/* harmony import */ var _components_UnifiedSearch_SearchResult_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/UnifiedSearch/SearchResult.vue */ "./core/src/components/UnifiedSearch/SearchResult.vue");
/* harmony import */ var _components_UnifiedSearch_SearchResultPlaceholders_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/UnifiedSearch/SearchResultPlaceholders.vue */ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue");
/* harmony import */ var _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/UnifiedSearchService.js */ "./core/src/services/UnifiedSearchService.js");











const REQUEST_FAILED = 0;
const REQUEST_OK = 1;
const REQUEST_CANCELED = 2;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'UnifiedSearch',
  components: {
    Magnify: vue_material_design_icons_Magnify_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    NcActionButton: (_nextcloud_vue_dist_Components_NcActionButton_js__WEBPACK_IMPORTED_MODULE_3___default()),
    NcActions: (_nextcloud_vue_dist_Components_NcActions_js__WEBPACK_IMPORTED_MODULE_4___default()),
    NcEmptyContent: (_nextcloud_vue_dist_Components_NcEmptyContent_js__WEBPACK_IMPORTED_MODULE_5___default()),
    NcHeaderMenu: (_nextcloud_vue_dist_Components_NcHeaderMenu_js__WEBPACK_IMPORTED_MODULE_6___default()),
    SearchResult: _components_UnifiedSearch_SearchResult_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    SearchResultPlaceholders: _components_UnifiedSearch_SearchResultPlaceholders_vue__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  data() {
    return {
      types: [],
      // Cursors per types
      cursors: {},
      // Various search limits per types
      limits: {},
      // Loading types
      loading: {},
      // Reached search types
      reached: {},
      // Pending cancellable requests
      requests: [],
      // List of all results
      results: {},
      query: '',
      focused: null,
      triggered: false,
      defaultLimit: _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.defaultLimit,
      minSearchLength: _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.minSearchLength,
      enableLiveSearch: _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.enableLiveSearch,
      open: false
    };
  },
  computed: {
    typesIDs() {
      return this.types.map(type => type.id);
    },
    typesNames() {
      return this.types.map(type => type.name);
    },
    typesMap() {
      return this.types.reduce((prev, curr) => {
        prev[curr.id] = curr.name;
        return prev;
      }, {});
    },
    ariaLabel() {
      return t('core', 'Search');
    },
    /**
     * Is there any result to display
     *
     * @return {boolean}
     */
    hasResults() {
      return Object.keys(this.results).length !== 0;
    },
    /**
     * Return ordered results
     *
     * @return {Array}
     */
    orderedResults() {
      return this.typesIDs.filter(type => type in this.results).map(type => ({
        type,
        list: this.results[type]
      }));
    },
    /**
     * Available filters
     * We only show filters that are available on the results
     *
     * @return {string[]}
     */
    availableFilters() {
      return Object.keys(this.results);
    },
    /**
     * Applied filters
     *
     * @return {string[]}
     */
    usedFiltersIn() {
      let match;
      const filters = [];
      while ((match = _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.regexFilterIn.exec(this.query)) !== null) {
        filters.push(match[2]);
      }
      return filters;
    },
    /**
     * Applied anti filters
     *
     * @return {string[]}
     */
    usedFiltersNot() {
      let match;
      const filters = [];
      while ((match = _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.regexFilterNot.exec(this.query)) !== null) {
        filters.push(match[2]);
      }
      return filters;
    },
    /**
     * Valid query empty content title
     *
     * @return {string}
     */
    validQueryTitle() {
      return this.triggered ? t('core', 'No results for {query}', {
        query: this.query
      }) : t('core', 'Press Enter to start searching');
    },
    /**
     * Short query empty content description
     *
     * @return {string}
     */
    shortQueryDescription() {
      if (!this.isShortQuery) {
        return '';
      }
      return n('core', 'Please enter {minSearchLength} character or more to search', 'Please enter {minSearchLength} characters  or more to search', this.minSearchLength, {
        minSearchLength: this.minSearchLength
      });
    },
    /**
     * Is the current search too short
     *
     * @return {boolean}
     */
    isShortQuery() {
      return this.query && this.query.trim().length < _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.minSearchLength;
    },
    /**
     * Is the current search valid
     *
     * @return {boolean}
     */
    isValidQuery() {
      return this.query && this.query.trim() !== '' && !this.isShortQuery;
    },
    /**
     * Have we reached the end of all types searches
     *
     * @return {boolean}
     */
    isDoneSearching() {
      return Object.values(this.reached).every(state => state === false);
    },
    /**
     * Is there any search in progress
     *
     * @return {boolean}
     */
    isLoading() {
      return Object.values(this.loading).some(state => state === true);
    }
  },
  async created() {
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_1__.subscribe)('files:navigation:changed', this.onNavigationChange);
    this.types = await (0,_services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.getTypes)();
    this.logger.debug('Unified Search initialized with the following providers', this.types);
  },
  beforeDestroy() {
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_1__.unsubscribe)('files:navigation:changed', this.onNavigationChange);
  },
  mounted() {
    if (OCP.Accessibility.disableKeyboardShortcuts()) {
      return;
    }
    document.addEventListener('keydown', event => {
      // if not already opened, allows us to trigger default browser on second keydown
      if (event.ctrlKey && event.key === 'f' && !this.open) {
        event.preventDefault();
        this.open = true;
      }

      // https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus
      if (this.open) {
        // If arrow down, focus next result
        if (event.key === 'ArrowDown') {
          this.focusNext(event);
        }

        // If arrow up, focus prev result
        if (event.key === 'ArrowUp') {
          this.focusPrev(event);
        }
      }
    });
  },
  methods: {
    async onOpen() {
      // Update types list in the background
      this.types = await (0,_services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.getTypes)();
    },
    onClose() {
      (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_1__.emit)('nextcloud:unified-search.close');
    },
    onNavigationChange() {
      this.$el.querySelector('form[role="search"]').reset();
    },
    /**
     * Reset the search state
     */
    onReset() {
      (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_1__.emit)('nextcloud:unified-search.reset');
      this.logger.debug('Search reset');
      this.query = '';
      this.resetState();
      this.focusInput();
    },
    async resetState() {
      this.cursors = {};
      this.limits = {};
      this.reached = {};
      this.results = {};
      this.focused = null;
      this.triggered = false;
      await this.cancelPendingRequests();
    },
    /**
     * Cancel any ongoing searches
     */
    async cancelPendingRequests() {
      // Cloning so we can keep processing other requests
      const requests = this.requests.slice(0);
      this.requests = [];

      // Cancel all pending requests
      await Promise.all(requests.map(cancel => cancel()));
    },
    /**
     * Focus the search input on next tick
     */
    focusInput() {
      this.$nextTick(() => {
        this.$refs.input.focus();
        this.$refs.input.select();
      });
    },
    /**
     * If we have results already, open first one
     * If not, trigger the search again
     */
    onInputEnter() {
      if (this.hasResults) {
        const results = this.getResultsList();
        results[0].click();
        return;
      }
      this.onInput();
    },
    /**
     * Start searching on input
     */
    async onInput() {
      // emit the search query
      (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_1__.emit)('nextcloud:unified-search.search', {
        query: this.query
      });

      // Do not search if not long enough
      if (this.query.trim() === '' || this.isShortQuery) {
        for (const type of this.typesIDs) {
          this.$delete(this.results, type);
        }
        return;
      }
      let types = this.typesIDs;
      let query = this.query;

      // Filter out types
      if (this.usedFiltersNot.length > 0) {
        types = this.typesIDs.filter(type => this.usedFiltersNot.indexOf(type) === -1);
      }

      // Only use those filters if any and check if they are valid
      if (this.usedFiltersIn.length > 0) {
        types = this.typesIDs.filter(type => this.usedFiltersIn.indexOf(type) > -1);
      }

      // Remove any filters from the query
      query = query.replace(_services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.regexFilterIn, '').replace(_services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.regexFilterNot, '');

      // Reset search if the query changed
      await this.resetState();
      this.triggered = true;
      if (!types.length) {
        // no results since no types were selected
        this.logger.error('No types to search in');
        return;
      }
      this.$set(this.loading, 'all', true);
      this.logger.debug("Searching ".concat(query, " in"), types);
      Promise.all(types.map(async type => {
        try {
          // Init cancellable request
          const {
            request,
            cancel
          } = (0,_services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.search)({
            type,
            query
          });
          this.requests.push(cancel);

          // Fetch results
          const {
            data
          } = await request();

          // Process results
          if (data.ocs.data.entries.length > 0) {
            this.$set(this.results, type, data.ocs.data.entries);
          } else {
            this.$delete(this.results, type);
          }

          // Save cursor if any
          if (data.ocs.data.cursor) {
            this.$set(this.cursors, type, data.ocs.data.cursor);
          } else if (!data.ocs.data.isPaginated) {
            // If no cursor and no pagination, we save the default amount
            // provided by server's initial state `defaultLimit`
            this.$set(this.limits, type, this.defaultLimit);
          }

          // Check if we reached end of pagination
          if (data.ocs.data.entries.length < this.defaultLimit) {
            this.$set(this.reached, type, true);
          }

          // If none already focused, focus the first rendered result
          if (this.focused === null) {
            this.focused = 0;
          }
          return REQUEST_OK;
        } catch (error) {
          this.$delete(this.results, type);

          // If this is not a cancelled throw
          if (error.response && error.response.status) {
            this.logger.error("Error searching for ".concat(this.typesMap[type]), error);
            (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__.showError)(this.t('core', 'An error occurred while searching for {type}', {
              type: this.typesMap[type]
            }));
            return REQUEST_FAILED;
          }
          return REQUEST_CANCELED;
        }
      })).then(results => {
        // Do not declare loading finished if the request have been cancelled
        // This means another search was triggered and we're therefore still loading
        if (results.some(result => result === REQUEST_CANCELED)) {
          return;
        }
        // We finished all searches
        this.loading = {};
      });
    },
    onInputDebounced: _services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.enableLiveSearch ? debounce__WEBPACK_IMPORTED_MODULE_0___default()(function (e) {
      this.onInput(e);
    }, 500) : function () {
      this.triggered = false;
    },
    /**
     * Load more results for the provided type
     *
     * @param {string} type type
     */
    async loadMore(type) {
      // If already loading, ignore
      if (this.loading[type]) {
        return;
      }
      if (this.cursors[type]) {
        // Init cancellable request
        const {
          request,
          cancel
        } = (0,_services_UnifiedSearchService_js__WEBPACK_IMPORTED_MODULE_10__.search)({
          type,
          query: this.query,
          cursor: this.cursors[type]
        });
        this.requests.push(cancel);

        // Fetch results
        const {
          data
        } = await request();

        // Save cursor if any
        if (data.ocs.data.cursor) {
          this.$set(this.cursors, type, data.ocs.data.cursor);
        }

        // Process results
        if (data.ocs.data.entries.length > 0) {
          this.results[type].push(...data.ocs.data.entries);
        }

        // Check if we reached end of pagination
        if (data.ocs.data.entries.length < this.defaultLimit) {
          this.$set(this.reached, type, true);
        }
      } else
        // If no cursor, we might have all the results already,
        // let's fake pagination and show the next xxx entries
        if (this.limits[type] && this.limits[type] >= 0) {
          this.limits[type] += this.defaultLimit;

          // Check if we reached end of pagination
          if (this.limits[type] >= this.results[type].length) {
            this.$set(this.reached, type, true);
          }
        }

      // Focus result after render
      if (this.focused !== null) {
        this.$nextTick(() => {
          this.focusIndex(this.focused);
        });
      }
    },
    /**
     * Return a subset of the array if the search provider
     * doesn't supports pagination
     *
     * @param {Array} list the results
     * @param {string} type the type
     * @return {Array}
     */
    limitIfAny(list, type) {
      if (type in this.limits) {
        return list.slice(0, this.limits[type]);
      }
      return list;
    },
    getResultsList() {
      return this.$el.querySelectorAll('.unified-search__results .unified-search__result');
    },
    /**
     * Focus the first result if any
     *
     * @param {Event} event the keydown event
     */
    focusFirst(event) {
      const results = this.getResultsList();
      if (results && results.length > 0) {
        if (event) {
          event.preventDefault();
        }
        this.focused = 0;
        this.focusIndex(this.focused);
      }
    },
    /**
     * Focus the next result if any
     *
     * @param {Event} event the keydown event
     */
    focusNext(event) {
      if (this.focused === null) {
        this.focusFirst(event);
        return;
      }
      const results = this.getResultsList();
      // If we're not focusing the last, focus the next one
      if (results && results.length > 0 && this.focused + 1 < results.length) {
        event.preventDefault();
        this.focused++;
        this.focusIndex(this.focused);
      }
    },
    /**
     * Focus the previous result if any
     *
     * @param {Event} event the keydown event
     */
    focusPrev(event) {
      if (this.focused === null) {
        this.focusFirst(event);
        return;
      }
      const results = this.getResultsList();
      // If we're not focusing the first, focus the previous one
      if (results && results.length > 0 && this.focused > 0) {
        event.preventDefault();
        this.focused--;
        this.focusIndex(this.focused);
      }
    },
    /**
     * Focus the specified result index if it exists
     *
     * @param {number} index the result index
     */
    focusIndex(index) {
      const results = this.getResultsList();
      if (results && results[index]) {
        results[index].focus();
      }
    },
    /**
     * Set the current focused element based on the target
     *
     * @param {Event} event the focus event
     */
    setFocusedIndex(event) {
      const entry = event.target;
      const results = this.getResultsList();
      const index = [...results].findIndex(search => search === entry);
      if (index > -1) {
        // let's not use focusIndex as the entry is already focused
        this.focused = index;
      }
    },
    onClickFilter(filter) {
      this.query = "".concat(this.query, " ").concat(filter).replace(/ {2}/g, ' ').trim();
      this.onInput();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("a", {
    staticClass: "unified-search__result",
    class: {
      "unified-search__result--focused": _vm.focused
    },
    attrs: {
      href: _vm.resourceUrl || "#"
    },
    on: {
      click: _vm.reEmitEvent,
      focus: _vm.reEmitEvent
    }
  }, [_c("div", {
    staticClass: "unified-search__result-icon",
    class: {
      "unified-search__result-icon--rounded": _vm.rounded,
      "unified-search__result-icon--no-preview": !_vm.hasValidThumbnail && !_vm.loaded,
      "unified-search__result-icon--with-thumbnail": _vm.hasValidThumbnail && _vm.loaded,
      [_vm.icon]: !_vm.loaded && !_vm.isIconUrl
    },
    style: {
      backgroundImage: _vm.isIconUrl ? "url(".concat(_vm.icon, ")") : ""
    }
  }, [_vm.hasValidThumbnail ? _c("img", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.loaded,
      expression: "loaded"
    }],
    attrs: {
      src: _vm.thumbnailUrl,
      alt: ""
    },
    on: {
      error: _vm.onError,
      load: _vm.onLoad
    }
  }) : _vm._e()]), _vm._v(" "), _c("span", {
    staticClass: "unified-search__result-content"
  }, [_c("span", {
    staticClass: "unified-search__result-line-one",
    attrs: {
      title: _vm.title
    }
  }, [_c("NcHighlight", {
    attrs: {
      text: _vm.title,
      search: _vm.query
    }
  })], 1), _vm._v(" "), _vm.subline ? _c("span", {
    staticClass: "unified-search__result-line-two",
    attrs: {
      title: _vm.subline
    }
  }, [_vm._v(_vm._s(_vm.subline))]) : _vm._e()])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("ul", [_c("svg", {
    staticClass: "unified-search__result-placeholder-gradient"
  }, [_c("defs", [_c("linearGradient", {
    attrs: {
      id: "unified-search__result-placeholder-gradient"
    }
  }, [_c("stop", {
    attrs: {
      offset: "0%",
      "stop-color": _vm.light
    }
  }, [_c("animate", {
    attrs: {
      attributeName: "stop-color",
      values: "".concat(_vm.light, "; ").concat(_vm.light, "; ").concat(_vm.dark, "; ").concat(_vm.dark, "; ").concat(_vm.light),
      dur: "2s",
      repeatCount: "indefinite"
    }
  })]), _vm._v(" "), _c("stop", {
    attrs: {
      offset: "100%",
      "stop-color": _vm.dark
    }
  }, [_c("animate", {
    attrs: {
      attributeName: "stop-color",
      values: "".concat(_vm.dark, "; ").concat(_vm.light, "; ").concat(_vm.light, "; ").concat(_vm.dark, "; ").concat(_vm.dark),
      dur: "2s",
      repeatCount: "indefinite"
    }
  })])], 1)], 1)]), _vm._v(" "), _vm._l([1, 2, 3], function (placeholder) {
    return _c("li", {
      key: placeholder
    }, [_c("svg", {
      staticClass: "unified-search__result-placeholder",
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "url(#unified-search__result-placeholder-gradient)"
      }
    }, [_c("rect", {
      staticClass: "unified-search__result-placeholder-icon"
    }), _vm._v(" "), _c("rect", {
      staticClass: "unified-search__result-placeholder-line-one"
    }), _vm._v(" "), _c("rect", {
      staticClass: "unified-search__result-placeholder-line-two",
      style: {
        width: "calc(".concat(_vm.randWidth(), "%)")
      }
    })])]);
  })], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NcHeaderMenu", {
    staticClass: "unified-search",
    attrs: {
      id: "unified-search",
      "exclude-click-outside-classes": "popover",
      open: _vm.open,
      "aria-label": _vm.ariaLabel
    },
    on: {
      "update:open": function ($event) {
        _vm.open = $event;
      },
      open: _vm.onOpen,
      close: _vm.onClose
    },
    scopedSlots: _vm._u([{
      key: "trigger",
      fn: function () {
        return [_c("Magnify", {
          staticClass: "unified-search__trigger",
          attrs: {
            size: 22 /* fit better next to other 20px icons */
          }
        })];
      },

      proxy: true
    }])
  }, [_vm._v(" "), _c("div", {
    staticClass: "unified-search__input-wrapper"
  }, [_c("label", {
    attrs: {
      for: "unified-search__input"
    }
  }, [_vm._v(_vm._s(_vm.ariaLabel))]), _vm._v(" "), _c("div", {
    staticClass: "unified-search__input-row"
  }, [_c("form", {
    staticClass: "unified-search__form",
    class: {
      "icon-loading-small": _vm.isLoading
    },
    attrs: {
      role: "search"
    },
    on: {
      submit: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.onInputEnter.apply(null, arguments);
      },
      reset: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.onReset.apply(null, arguments);
      }
    }
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.query,
      expression: "query"
    }],
    ref: "input",
    staticClass: "unified-search__form-input",
    class: {
      "unified-search__form-input--with-reset": !!_vm.query
    },
    attrs: {
      id: "unified-search__input",
      type: "search",
      placeholder: _vm.t("core", "Search {types} …", {
        types: _vm.typesNames.join(", ")
      }),
      "aria-describedby": "unified-search-desc"
    },
    domProps: {
      value: _vm.query
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.query = $event.target.value;
      }, _vm.onInputDebounced],
      keypress: function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.onInputEnter.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _c("p", {
    staticClass: "hidden-visually",
    attrs: {
      id: "unified-search-desc"
    }
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("core", "Search starts once you start typing and results may be reached with the arrow keys")) + "\n\t\t\t\t")]), _vm._v(" "), !!_vm.query && !_vm.isLoading ? _c("input", {
    staticClass: "unified-search__form-reset icon-close",
    attrs: {
      type: "reset",
      "aria-label": _vm.t("core", "Reset search"),
      value: ""
    }
  }) : _vm._e(), _vm._v(" "), !!_vm.query && !_vm.isLoading && !_vm.enableLiveSearch ? _c("input", {
    staticClass: "unified-search__form-submit icon-confirm",
    attrs: {
      type: "submit",
      "aria-label": _vm.t("core", "Start search"),
      value: ""
    }
  }) : _vm._e()]), _vm._v(" "), _vm.availableFilters.length > 1 ? _c("NcActions", {
    staticClass: "unified-search__filters",
    attrs: {
      placement: "bottom",
      container: ".unified-search__input-wrapper"
    }
  }, _vm._l(_vm.availableFilters, function (filter) {
    return _c("NcActionButton", {
      key: filter,
      attrs: {
        icon: "icon-filter",
        title: _vm.t("core", "Search for {name} only", {
          name: _vm.typesMap[filter]
        })
      },
      on: {
        click: function ($event) {
          $event.stopPropagation();
          return _vm.onClickFilter("in:".concat(filter));
        }
      }
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s("in:".concat(filter)) + "\n\t\t\t\t")]);
  }), 1) : _vm._e()], 1)]), _vm._v(" "), !_vm.hasResults ? [_vm.isLoading ? _c("SearchResultPlaceholders") : _vm.isValidQuery ? _c("NcEmptyContent", {
    attrs: {
      title: _vm.validQueryTitle
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("Magnify")];
      },
      proxy: true
    }], null, false, 931131664)
  }) : !_vm.isLoading || _vm.isShortQuery ? _c("NcEmptyContent", {
    attrs: {
      title: _vm.t("core", "Start typing to search"),
      description: _vm.shortQueryDescription
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("Magnify")];
      },
      proxy: true
    }], null, false, 931131664)
  }) : _vm._e()] : _vm._l(_vm.orderedResults, function (_ref, typesIndex) {
    let {
      list,
      type
    } = _ref;
    return _c("ul", {
      key: type,
      staticClass: "unified-search__results",
      class: "unified-search__results-".concat(type),
      attrs: {
        "aria-label": _vm.typesMap[type]
      }
    }, [_c("h2", {
      staticClass: "unified-search__results-header"
    }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.typesMap[type]) + "\n\t\t\t")]), _vm._v(" "), _vm._l(_vm.limitIfAny(list, type), function (result, index) {
      return _c("li", {
        key: result.resourceUrl
      }, [_c("SearchResult", _vm._b({
        attrs: {
          query: _vm.query,
          focused: _vm.focused === 0 && typesIndex === 0 && index === 0
        },
        on: {
          focus: _vm.setFocusedIndex
        }
      }, "SearchResult", result, false))], 1);
    }), _vm._v(" "), _c("li", [!_vm.reached[type] ? _c("SearchResult", {
      staticClass: "unified-search__result-more",
      attrs: {
        title: _vm.loading[type] ? _vm.t("core", "Loading more results …") : _vm.t("core", "Load more results"),
        "icon-class": _vm.loading[type] ? "icon-loading-small" : ""
      },
      on: {
        click: function ($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return _vm.loadMore(type);
        },
        focus: _vm.setFocusedIndex
      }
    }) : _vm._e()], 1)], 2);
  })], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, ".unified-search__result[data-v-69f8eb86] {\n  display: flex;\n  align-items: center;\n  height: 44px;\n  padding: 10px;\n  border: 2px solid transparent;\n  border-radius: var(--border-radius-large) !important;\n}\n.unified-search__result--focused[data-v-69f8eb86] {\n  background-color: var(--color-background-hover);\n}\n.unified-search__result[data-v-69f8eb86]:active, .unified-search__result[data-v-69f8eb86]:hover, .unified-search__result[data-v-69f8eb86]:focus {\n  background-color: var(--color-background-hover);\n  border: 2px solid var(--color-border-maxcontrast);\n}\n.unified-search__result *[data-v-69f8eb86] {\n  cursor: pointer;\n}\n.unified-search__result-icon[data-v-69f8eb86] {\n  overflow: hidden;\n  width: 44px;\n  height: 44px;\n  border-radius: var(--border-radius);\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 32px;\n}\n.unified-search__result-icon--rounded[data-v-69f8eb86] {\n  border-radius: 22px;\n}\n.unified-search__result-icon--no-preview[data-v-69f8eb86] {\n  background-size: 32px;\n}\n.unified-search__result-icon--with-thumbnail[data-v-69f8eb86] {\n  background-size: cover;\n}\n.unified-search__result-icon--with-thumbnail[data-v-69f8eb86]:not(.unified-search__result-icon--rounded) {\n  max-width: 42px;\n  max-height: 42px;\n  border: 1px solid var(--color-border);\n}\n.unified-search__result-icon img[data-v-69f8eb86] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.unified-search__result-icon[data-v-69f8eb86], .unified-search__result-actions[data-v-69f8eb86] {\n  flex: 0 0 44px;\n}\n.unified-search__result-content[data-v-69f8eb86] {\n  display: flex;\n  align-items: center;\n  flex: 1 1 100%;\n  flex-wrap: wrap;\n  min-width: 0;\n  padding-left: 10px;\n}\n.unified-search__result-line-one[data-v-69f8eb86], .unified-search__result-line-two[data-v-69f8eb86] {\n  overflow: hidden;\n  flex: 1 1 100%;\n  margin: 1px 0;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: inherit;\n  font-size: inherit;\n}\n.unified-search__result-line-two[data-v-69f8eb86] {\n  opacity: 0.7;\n  font-size: var(--default-font-size);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, ".unified-search__result-placeholder-gradient[data-v-ff2497f4] {\n  position: fixed;\n  height: 0;\n  width: 0;\n  z-index: -1;\n}\n.unified-search__result-placeholder[data-v-ff2497f4] {\n  width: calc(100% - 2 * 10px);\n  height: 44px;\n  margin: 10px;\n}\n.unified-search__result-placeholder-icon[data-v-ff2497f4] {\n  width: 44px;\n  height: 44px;\n  rx: var(--border-radius);\n  ry: var(--border-radius);\n}\n.unified-search__result-placeholder-line-one[data-v-ff2497f4], .unified-search__result-placeholder-line-two[data-v-ff2497f4] {\n  width: calc(100% - 54px);\n  height: 1em;\n  x: 54px;\n}\n.unified-search__result-placeholder-line-one[data-v-ff2497f4] {\n  y: 5px;\n}\n.unified-search__result-placeholder-line-two[data-v-ff2497f4] {\n  y: 25px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".unified-search__input-wrapper[data-v-d79c2f68] {\n  position: sticky;\n  z-index: 2;\n  top: 0;\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  background-color: var(--color-main-background);\n}\n.unified-search__input-wrapper label[for=unified-search__input][data-v-d79c2f68] {\n  align-self: flex-start;\n  font-weight: bold;\n  font-size: 19px;\n  margin-left: 13px;\n}\n.unified-search__form-input[data-v-d79c2f68] {\n  margin: 0 !important;\n}\n.unified-search__input-row[data-v-d79c2f68] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n}\n.unified-search__filters[data-v-d79c2f68] {\n  margin: 10px 0 10px 5px;\n}\n.unified-search__filters ul[data-v-d79c2f68] {\n  display: inline-flex;\n  justify-content: space-between;\n}\n.unified-search__form[data-v-d79c2f68] {\n  position: relative;\n  width: 100%;\n  margin: 10px 0;\n}\n.unified-search__form[data-v-d79c2f68]::after {\n  right: 6px;\n  left: auto;\n}\n.unified-search__form-input[data-v-d79c2f68], .unified-search__form-reset[data-v-d79c2f68] {\n  margin: 3px;\n}\n.unified-search__form-input[data-v-d79c2f68] {\n  width: 100%;\n  height: 34px;\n  padding: 6px;\n}\n.unified-search__form-input[data-v-d79c2f68], .unified-search__form-input[placeholder][data-v-d79c2f68], .unified-search__form-input[data-v-d79c2f68]::placeholder {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.unified-search__form-input[data-v-d79c2f68]::-webkit-search-decoration, .unified-search__form-input[data-v-d79c2f68]::-webkit-search-cancel-button, .unified-search__form-input[data-v-d79c2f68]::-webkit-search-results-button, .unified-search__form-input[data-v-d79c2f68]::-webkit-search-results-decoration {\n  -webkit-appearance: none;\n}\n.icon-loading-small .unified-search__form-input[data-v-d79c2f68], .unified-search__form-input--with-reset[data-v-d79c2f68] {\n  padding-right: 34px;\n}\n.unified-search__form-reset[data-v-d79c2f68], .unified-search__form-submit[data-v-d79c2f68] {\n  position: absolute;\n  top: 0;\n  right: 4px;\n  width: 28px;\n  height: 28px;\n  min-height: 30px;\n  padding: 0;\n  opacity: 0.5;\n  border: none;\n  background-color: transparent;\n  margin-right: 0;\n}\n.unified-search__form-reset[data-v-d79c2f68]:hover, .unified-search__form-reset[data-v-d79c2f68]:focus, .unified-search__form-reset[data-v-d79c2f68]:active, .unified-search__form-submit[data-v-d79c2f68]:hover, .unified-search__form-submit[data-v-d79c2f68]:focus, .unified-search__form-submit[data-v-d79c2f68]:active {\n  opacity: 1;\n}\n.unified-search__form-submit[data-v-d79c2f68] {\n  right: 28px;\n}\n.unified-search__results[data-v-d79c2f68] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.unified-search__results-header[data-v-d79c2f68] {\n  display: block;\n  margin: 10px;\n  margin-bottom: 6px;\n  margin-left: 13px;\n  color: var(--color-primary-element);\n  font-size: 19px;\n  font-weight: bold;\n}\n.unified-search .unified-search__result-more[data-v-d79c2f68] {\n  color: var(--color-text-maxcontrast);\n}\n.unified-search .empty-content[data-v-d79c2f68] {\n  margin: 10vh 0;\n}\n.unified-search .empty-content[data-v-d79c2f68] .empty-content__title {\n  font-weight: normal;\n  font-size: var(--default-font-size);\n  padding: 0 15px;\n  text-align: center;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResult.vue":
/*!************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResult.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SearchResult_vue_vue_type_template_id_69f8eb86_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true& */ "./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true&");
/* harmony import */ var _SearchResult_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchResult.vue?vue&type=script&lang=js& */ "./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=script&lang=js&");
/* harmony import */ var _SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true& */ "./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SearchResult_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SearchResult_vue_vue_type_template_id_69f8eb86_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _SearchResult_vue_vue_type_template_id_69f8eb86_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "69f8eb86",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "core/src/components/UnifiedSearch/SearchResult.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue":
/*!************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SearchResultPlaceholders_vue_vue_type_template_id_ff2497f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true& */ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true&");
/* harmony import */ var _SearchResultPlaceholders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchResultPlaceholders.vue?vue&type=script&lang=js& */ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=script&lang=js&");
/* harmony import */ var _SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true& */ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SearchResultPlaceholders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SearchResultPlaceholders_vue_vue_type_template_id_ff2497f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _SearchResultPlaceholders_vue_vue_type_template_id_ff2497f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "ff2497f4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "core/src/components/UnifiedSearch/SearchResultPlaceholders.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./core/src/views/UnifiedSearch.vue":
/*!******************************************!*\
  !*** ./core/src/views/UnifiedSearch.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UnifiedSearch_vue_vue_type_template_id_d79c2f68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true& */ "./core/src/views/UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true&");
/* harmony import */ var _UnifiedSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UnifiedSearch.vue?vue&type=script&lang=js& */ "./core/src/views/UnifiedSearch.vue?vue&type=script&lang=js&");
/* harmony import */ var _UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true& */ "./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UnifiedSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UnifiedSearch_vue_vue_type_template_id_d79c2f68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _UnifiedSearch_vue_vue_type_template_id_d79c2f68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "d79c2f68",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "core/src/views/UnifiedSearch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResult.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResultPlaceholders.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./core/src/views/UnifiedSearch.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./core/src/views/UnifiedSearch.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UnifiedSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_template_id_69f8eb86_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_template_id_69f8eb86_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_template_id_69f8eb86_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=template&id=69f8eb86&scoped=true&");


/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true& ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_template_id_ff2497f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_template_id_ff2497f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_template_id_ff2497f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=template&id=ff2497f4&scoped=true&");


/***/ }),

/***/ "./core/src/views/UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true&":
/*!*************************************************************************************!*\
  !*** ./core/src/views/UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_template_id_d79c2f68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_template_id_d79c2f68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_template_id_d79c2f68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=template&id=d79c2f68&scoped=true&");


/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResult_vue_vue_type_style_index_0_id_69f8eb86_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResult.vue?vue&type=style&index=0&id=69f8eb86&lang=scss&scoped=true&");


/***/ }),

/***/ "./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************!*\
  !*** ./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchResultPlaceholders_vue_vue_type_style_index_0_id_ff2497f4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/components/UnifiedSearch/SearchResultPlaceholders.vue?vue&type=style&index=0&id=ff2497f4&lang=scss&scoped=true&");


/***/ }),

/***/ "./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UnifiedSearch_vue_vue_type_style_index_0_id_d79c2f68_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./core/src/views/UnifiedSearch.vue?vue&type=style&index=0&id=d79c2f68&lang=scss&scoped=true&");


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
/******/ 			"core-unified-search": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["core-common"], () => (__webpack_require__("./core/src/unified-search.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=core-unified-search.js.map?v=e149d3756c196585bf19