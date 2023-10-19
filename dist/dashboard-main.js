/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/dashboard/src/main.js":
/*!************************************!*\
  !*** ./apps/dashboard/src/main.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _DashboardApp_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardApp.vue */ "./apps/dashboard/src/DashboardApp.vue");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _nextcloud_vue_dist_Directives_Tooltip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/vue/dist/Directives/Tooltip.js */ "./node_modules/@nextcloud/vue/dist/Directives/Tooltip.js");
/* harmony import */ var _nextcloud_vue_dist_Directives_Tooltip_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Directives_Tooltip_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
 *
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







// eslint-disable-next-line camelcase
__webpack_require__.nc = btoa((0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_3__.getRequestToken)());
vue__WEBPACK_IMPORTED_MODULE_4__["default"].directive('Tooltip', (_nextcloud_vue_dist_Directives_Tooltip_js__WEBPACK_IMPORTED_MODULE_2___default()));
vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.t = _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_1__.translate;

// FIXME workaround to make the sidebar work
if (!window.OCA.Files) {
  window.OCA.Files = {};
}
Object.assign(window.OCA.Files, {
  App: {
    fileList: {
      filesClient: OC.Files.getClient()
    }
  }
}, window.OCA.Files);
const Dashboard = vue__WEBPACK_IMPORTED_MODULE_4__["default"].extend(_DashboardApp_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
const Instance = new Dashboard({}).$mount('#app-content-vue');
window.OCA.Dashboard = {
  register: (app, callback) => Instance.register(app, callback),
  registerStatus: (app, callback) => Instance.registerStatus(app, callback)
};

/***/ }),

/***/ "./apps/dashboard/src/mixins/isMobile.js":
/*!***********************************************!*\
  !*** ./apps/dashboard/src/mixins/isMobile.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      isMobile: this._isMobile()
    };
  },
  beforeMount() {
    window.addEventListener('resize', this._onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._onResize);
  },
  methods: {
    _onResize() {
      // Update mobile mode
      this.isMobile = this._isMobile();
    },
    _isMobile() {
      // check if content width is under 768px
      return document.documentElement.clientWidth < 768;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.esm.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcModal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcModal.js */ "./node_modules/@nextcloud/vue/dist/Components/NcModal.js");
/* harmony import */ var _nextcloud_vue_dist_Components_NcModal_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_vue_dist_Components_NcModal_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vue_material_design_icons_Pencil_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-material-design-icons/Pencil.vue */ "./node_modules/vue-material-design-icons/Pencil.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _mixins_isMobile_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mixins/isMobile.js */ "./apps/dashboard/src/mixins/isMobile.js");
/* harmony import */ var _components_ApiDashboardWidget_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/ApiDashboardWidget.vue */ "./apps/dashboard/src/components/ApiDashboardWidget.vue");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");











const panels = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('dashboard', 'panels');
const firstRun = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('dashboard', 'firstRun');
const statusInfo = {
  weather: {
    text: t('dashboard', 'Weather'),
    icon: 'icon-weather-status'
  },
  status: {
    text: t('dashboard', 'Status'),
    icon: 'icon-user-status-online'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DashboardApp',
  components: {
    ApiDashboardWidget: _components_ApiDashboardWidget_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    NcButton: (_nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_4___default()),
    Draggable: (vuedraggable__WEBPACK_IMPORTED_MODULE_5___default()),
    NcModal: (_nextcloud_vue_dist_Components_NcModal_js__WEBPACK_IMPORTED_MODULE_6___default()),
    Pencil: vue_material_design_icons_Pencil_vue__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  mixins: [_mixins_isMobile_js__WEBPACK_IMPORTED_MODULE_8__["default"]],
  data() {
    var _getCurrentUser, _getCurrentUser2;
    return {
      isAdmin: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)().isAdmin,
      timer: new Date(),
      registeredStatus: [],
      callbacks: {},
      callbacksStatus: {},
      allCallbacksStatus: {},
      statusInfo,
      enabledStatuses: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('dashboard', 'statuses'),
      panels,
      firstRun,
      displayName: (_getCurrentUser = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)()) === null || _getCurrentUser === void 0 ? void 0 : _getCurrentUser.displayName,
      uid: (_getCurrentUser2 = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)()) === null || _getCurrentUser2 === void 0 ? void 0 : _getCurrentUser2.uid,
      layout: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('dashboard', 'layout').filter(panelId => panels[panelId]),
      modal: false,
      appStoreUrl: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/settings/apps/dashboard'),
      statuses: {},
      apiWidgets: [],
      apiWidgetItems: {},
      loadingItems: true
    };
  },
  computed: {
    greeting() {
      const time = this.timer.getHours();

      // Determine part of the day
      let partOfDay;
      if (time >= 22 || time < 5) {
        partOfDay = 'night';
      } else if (time >= 18) {
        partOfDay = 'evening';
      } else if (time >= 12) {
        partOfDay = 'afternoon';
      } else {
        partOfDay = 'morning';
      }

      // Define the greetings
      const good = {
        morning: {
          generic: t('dashboard', 'Good morning'),
          withName: t('dashboard', 'Good morning, {name}', {
            name: this.displayName
          }, undefined, {
            escape: false
          })
        },
        afternoon: {
          generic: t('dashboard', 'Good afternoon'),
          withName: t('dashboard', 'Good afternoon, {name}', {
            name: this.displayName
          }, undefined, {
            escape: false
          })
        },
        evening: {
          generic: t('dashboard', 'Good evening'),
          withName: t('dashboard', 'Good evening, {name}', {
            name: this.displayName
          }, undefined, {
            escape: false
          })
        },
        night: {
          // Don't use "Good night" as it's not a greeting
          generic: t('dashboard', 'Hello'),
          withName: t('dashboard', 'Hello, {name}', {
            name: this.displayName
          }, undefined, {
            escape: false
          })
        }
      };

      // Figure out which greeting to show
      const shouldShowName = this.displayName && this.uid !== this.displayName;
      return {
        text: shouldShowName ? good[partOfDay].withName : good[partOfDay].generic
      };
    },
    isActive() {
      return panel => this.layout.indexOf(panel.id) > -1;
    },
    isStatusActive() {
      return status => !(status in this.enabledStatuses) || this.enabledStatuses[status];
    },
    sortedAllStatuses() {
      return Object.keys(this.allCallbacksStatus).slice().sort(this.sortStatuses);
    },
    sortedPanels() {
      return Object.values(this.panels).sort((a, b) => {
        const indexA = this.layout.indexOf(a.id);
        const indexB = this.layout.indexOf(b.id);
        if (indexA === -1 || indexB === -1) {
          return indexB - indexA || a.id - b.id;
        }
        return indexA - indexB || a.id - b.id;
      });
    },
    sortedRegisteredStatus() {
      return this.registeredStatus.slice().sort(this.sortStatuses);
    }
  },
  watch: {
    callbacks() {
      this.rerenderPanels();
    },
    callbacksStatus() {
      for (const app in this.callbacksStatus) {
        const element = this.$refs['status-' + app];
        if (this.statuses[app] && this.statuses[app].mounted) {
          continue;
        }
        if (element) {
          this.callbacksStatus[app](element[0]);
          vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.statuses, app, {
            mounted: true
          });
        } else {
          console.error('Failed to register panel in the frontend as no backend data was provided for ' + app);
        }
      }
    }
  },
  async created() {
    await this.fetchApiWidgets();
    const apiWidgetIdsToFetch = Object.values(this.apiWidgets).filter(widget => this.isApiWidgetV2(widget.id)).map(widget => widget.id);
    await Promise.all(apiWidgetIdsToFetch.map(id => this.fetchApiWidgetItems([id], true)));
    for (const widget of Object.values(this.apiWidgets)) {
      if (widget.reload_interval > 0) {
        setInterval(async () => {
          await this.fetchApiWidgetItems([widget.id], true);
        }, widget.reload_interval * 1000);
      }
    }
  },
  mounted() {
    this.updateSkipLink();
    window.addEventListener('scroll', this.handleScroll);
    setInterval(() => {
      this.timer = new Date();
    }, 30000);
    if (this.firstRun) {
      window.addEventListener('scroll', this.disableFirstrunHint);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    /**
     * Method to register panels that will be called by the integrating apps
     *
     * @param {string} app The unique app id for the widget
     * @param {Function} callback The callback function to register a panel which gets the DOM element passed as parameter
     */
    register(app, callback) {
      vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.callbacks, app, callback);
    },
    registerStatus(app, callback) {
      // always save callbacks in case user enables the status later
      vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.allCallbacksStatus, app, callback);
      // register only if status is enabled or missing from config
      if (this.isStatusActive(app)) {
        this.registeredStatus.push(app);
        this.$nextTick(() => {
          vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.callbacksStatus, app, callback);
        });
      }
    },
    rerenderPanels() {
      for (const app in this.callbacks) {
        // TODO: Properly rerender v2 widgets
        if (this.isApiWidgetV2(this.panels[app].id)) {
          continue;
        }
        const element = this.$refs[app];
        if (this.layout.indexOf(app) === -1) {
          continue;
        }
        if (this.panels[app] && this.panels[app].mounted) {
          continue;
        }
        if (element) {
          this.callbacks[app](element[0], {
            widget: this.panels[app]
          });
          vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.panels[app], 'mounted', true);
        } else {
          console.error('Failed to register panel in the frontend as no backend data was provided for ' + app);
        }
      }
    },
    saveLayout() {
      _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/dashboard/layout'), {
        layout: this.layout.join(',')
      });
    },
    saveStatuses() {
      _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/dashboard/statuses'), {
        statuses: JSON.stringify(this.enabledStatuses)
      });
    },
    showModal() {
      this.modal = true;
      this.firstRun = false;
    },
    closeModal() {
      this.modal = false;
    },
    updateCheckbox(panel, currentValue) {
      const index = this.layout.indexOf(panel.id);
      if (!currentValue && index > -1) {
        this.layout.splice(index, 1);
      } else {
        this.layout.push(panel.id);
      }
      vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.panels[panel.id], 'mounted', false);
      this.saveLayout();
      this.$nextTick(() => this.rerenderPanels());
    },
    disableFirstrunHint() {
      window.removeEventListener('scroll', this.disableFirstrunHint);
      setTimeout(() => {
        this.firstRun = false;
      }, 1000);
    },
    updateSkipLink() {
      // Make sure "Skip to main content" link points to the app content
      document.getElementsByClassName('skip-navigation')[0].setAttribute('href', '#app-dashboard');
    },
    updateStatusCheckbox(app, checked) {
      if (checked) {
        this.enableStatus(app);
      } else {
        this.disableStatus(app);
      }
    },
    enableStatus(app) {
      this.enabledStatuses[app] = true;
      this.registerStatus(app, this.allCallbacksStatus[app]);
      this.saveStatuses();
    },
    disableStatus(app) {
      this.enabledStatuses[app] = false;
      const i = this.registeredStatus.findIndex(s => s === app);
      if (i !== -1) {
        this.registeredStatus.splice(i, 1);
        vue__WEBPACK_IMPORTED_MODULE_10__["default"].set(this.statuses, app, {
          mounted: false
        });
        this.$nextTick(() => {
          vue__WEBPACK_IMPORTED_MODULE_10__["default"]["delete"](this.callbacksStatus, app);
        });
      }
      this.saveStatuses();
    },
    sortStatuses(a, b) {
      const al = a.toLowerCase();
      const bl = b.toLowerCase();
      return al > bl ? 1 : al < bl ? -1 : 0;
    },
    handleScroll() {
      if (window.scrollY > 70) {
        document.body.classList.add('dashboard--scrolled');
      } else {
        document.body.classList.remove('dashboard--scrolled');
      }
    },
    async fetchApiWidgets() {
      const response = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('/apps/dashboard/api/v1/widgets'));
      this.apiWidgets = response.data.ocs.data;
    },
    async fetchApiWidgetItems(widgetIds) {
      let merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      try {
        const url = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('/apps/dashboard/api/v2/widget-items');
        const params = new URLSearchParams(widgetIds.map(id => ['widgets[]', id]));
        const response = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"].get("".concat(url, "?").concat(params.toString()));
        const widgetItems = response.data.ocs.data;
        if (merge) {
          this.apiWidgetItems = Object.assign({}, this.apiWidgetItems, widgetItems);
        } else {
          this.apiWidgetItems = widgetItems;
        }
      } finally {
        this.loadingItems = false;
      }
    },
    isApiWidgetV2(id) {
      for (const widget of Object.values(this.apiWidgets)) {
        if (widget.id === id && widget.item_api_versions.includes(2)) {
          return true;
        }
      }
      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.module.js");
/* harmony import */ var vue_material_design_icons_Check_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-material-design-icons/Check.vue */ "./node_modules/vue-material-design-icons/Check.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ApiDashboardWidget',
  components: {
    NcAvatar: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcAvatar,
    NcDashboardWidget: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcDashboardWidget,
    NcDashboardWidgetItem: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcDashboardWidgetItem,
    NcEmptyContent: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcEmptyContent,
    NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcButton,
    CheckIcon: vue_material_design_icons_Check_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    widget: {
      type: [Object, undefined],
      default: undefined
    },
    data: {
      type: [Object, undefined],
      default: undefined
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    /** @return {object[]} */
    items() {
      var _this$data$items, _this$data;
      return (_this$data$items = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.items) !== null && _this$data$items !== void 0 ? _this$data$items : [];
    },
    /** @return {string} */
    emptyContentMessage() {
      var _this$data$emptyConte, _this$data2;
      return (_this$data$emptyConte = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.emptyContentMessage) !== null && _this$data$emptyConte !== void 0 ? _this$data$emptyConte : '';
    },
    /** @return {string} */
    halfEmptyContentMessage() {
      var _this$data$halfEmptyC, _this$data3;
      return (_this$data$halfEmptyC = (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.halfEmptyContentMessage) !== null && _this$data$halfEmptyC !== void 0 ? _this$data$halfEmptyC : '';
    },
    /** @return {object|undefined} */
    newButton() {
      var _this$widget, _this$widget$buttons;
      // TODO: Render new button in the template
      // I couldn't find a widget that makes use of the button. Furthermore, there is no convenient
      // way to render such a button using the official widget component.
      return (_this$widget = this.widget) === null || _this$widget === void 0 ? void 0 : (_this$widget$buttons = _this$widget.buttons) === null || _this$widget$buttons === void 0 ? void 0 : _this$widget$buttons.find(button => button.type === 'new');
    },
    /** @return {object|undefined} */
    moreButton() {
      var _this$widget2, _this$widget2$buttons;
      return (_this$widget2 = this.widget) === null || _this$widget2 === void 0 ? void 0 : (_this$widget2$buttons = _this$widget2.buttons) === null || _this$widget2$buttons === void 0 ? void 0 : _this$widget2$buttons.find(button => button.type === 'more');
    },
    /** @return {object|undefined} */
    setupButton() {
      var _this$widget3, _this$widget3$buttons;
      return (_this$widget3 = this.widget) === null || _this$widget3 === void 0 ? void 0 : (_this$widget3$buttons = _this$widget3.buttons) === null || _this$widget3$buttons === void 0 ? void 0 : _this$widget3$buttons.find(button => button.type === 'setup');
    },
    /** @return {string|undefined} */
    showMoreLabel() {
      var _this$moreButton;
      return (_this$moreButton = this.moreButton) === null || _this$moreButton === void 0 ? void 0 : _this$moreButton.text;
    },
    /** @return {string|undefined} */
    showMoreUrl() {
      var _this$moreButton2;
      return (_this$moreButton2 = this.moreButton) === null || _this$moreButton2 === void 0 ? void 0 : _this$moreButton2.link;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=template&id=37a61812&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=template&id=37a61812&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "app-dashboard"
    }
  }, [_c("h2", [_vm._v(_vm._s(_vm.greeting.text))]), _vm._v(" "), _c("ul", {
    staticClass: "statuses"
  }, _vm._l(_vm.sortedRegisteredStatus, function (status) {
    return _c("li", {
      key: status,
      attrs: {
        id: "status-" + status
      }
    }, [_c("div", {
      ref: "status-" + status,
      refInFor: true
    })]);
  }), 0), _vm._v(" "), _c("Draggable", _vm._b({
    staticClass: "panels",
    attrs: {
      handle: ".panel--header"
    },
    on: {
      end: _vm.saveLayout
    },
    model: {
      value: _vm.layout,
      callback: function ($$v) {
        _vm.layout = $$v;
      },
      expression: "layout"
    }
  }, "Draggable", {
    swapThreshold: 0.3,
    delay: 500,
    delayOnTouchOnly: true,
    touchStartThreshold: 3
  }, false), [_vm._l(_vm.layout, function (panelId) {
    return [_vm.isApiWidgetV2(_vm.panels[panelId].id) ? _c("div", {
      key: "".concat(_vm.panels[panelId].id, "-v2"),
      staticClass: "panel"
    }, [_c("div", {
      staticClass: "panel--header"
    }, [_c("h2", [_c("div", {
      class: _vm.apiWidgets[_vm.panels[panelId].id].icon_class,
      attrs: {
        "aria-labelledby": "panel--header--icon--description",
        "aria-hidden": "true",
        role: "img"
      }
    }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.apiWidgets[_vm.panels[panelId].id].title) + "\n\t\t\t\t\t")]), _vm._v(" "), _c("span", {
      staticClass: "hidden-visually",
      attrs: {
        id: "panel--header--icon--description"
      }
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.t("dashboard", '"{title} icon"', {
      title: _vm.apiWidgets[_vm.panels[panelId].id].title
    })) + "\n\t\t\t\t\t")])]), _vm._v(" "), _c("div", {
      staticClass: "panel--content"
    }, [_c("ApiDashboardWidget", {
      attrs: {
        widget: _vm.apiWidgets[_vm.panels[panelId].id],
        data: _vm.apiWidgetItems[_vm.panels[panelId].id],
        loading: _vm.loadingItems
      }
    })], 1)]) : _c("div", {
      key: _vm.panels[panelId].id,
      staticClass: "panel"
    }, [_c("div", {
      staticClass: "panel--header"
    }, [_c("h2", [_c("div", {
      class: _vm.panels[panelId].iconClass,
      attrs: {
        "aria-labelledby": "panel--header--icon--description",
        "aria-hidden": "true",
        role: "img"
      }
    }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.panels[panelId].title) + "\n\t\t\t\t\t")]), _vm._v(" "), _c("span", {
      staticClass: "hidden-visually",
      attrs: {
        id: "panel--header--icon--description"
      }
    }, [_vm._v(" " + _vm._s(_vm.t("dashboard", '"{title} icon"', {
      title: _vm.panels[panelId].title
    })) + " ")])]), _vm._v(" "), _c("div", {
      staticClass: "panel--content",
      class: {
        loading: !_vm.panels[panelId].mounted
      }
    }, [_c("div", {
      ref: _vm.panels[panelId].id,
      refInFor: true,
      attrs: {
        "data-id": _vm.panels[panelId].id
      }
    })])])];
  })], 2), _vm._v(" "), _c("div", {
    staticClass: "footer"
  }, [_c("NcButton", {
    on: {
      click: _vm.showModal
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("Pencil", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }])
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("dashboard", "Customize")) + "\n\t\t")])], 1), _vm._v(" "), _vm.modal ? _c("NcModal", {
    attrs: {
      size: "large"
    },
    on: {
      close: _vm.closeModal
    }
  }, [_c("div", {
    staticClass: "modal__content"
  }, [_c("h3", [_vm._v(_vm._s(_vm.t("dashboard", "Edit widgets")))]), _vm._v(" "), _c("ol", {
    staticClass: "panels"
  }, _vm._l(_vm.sortedAllStatuses, function (status) {
    return _c("li", {
      key: status,
      class: "panel-" + status
    }, [_c("input", {
      staticClass: "checkbox",
      attrs: {
        id: "status-checkbox-" + status,
        type: "checkbox"
      },
      domProps: {
        checked: _vm.isStatusActive(status)
      },
      on: {
        input: function ($event) {
          return _vm.updateStatusCheckbox(status, $event.target.checked);
        }
      }
    }), _vm._v(" "), _c("label", {
      attrs: {
        for: "status-checkbox-" + status
      }
    }, [_c("div", {
      class: _vm.statusInfo[status].icon,
      attrs: {
        "aria-hidden": "true",
        role: "img"
      }
    }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.statusInfo[status].text) + "\n\t\t\t\t\t")])]);
  }), 0), _vm._v(" "), _c("Draggable", _vm._b({
    staticClass: "panels",
    attrs: {
      tag: "ol",
      handle: ".draggable"
    },
    on: {
      end: _vm.saveLayout
    },
    model: {
      value: _vm.layout,
      callback: function ($$v) {
        _vm.layout = $$v;
      },
      expression: "layout"
    }
  }, "Draggable", {
    swapThreshold: 0.3,
    delay: 500,
    delayOnTouchOnly: true,
    touchStartThreshold: 3
  }, false), _vm._l(_vm.sortedPanels, function (panel) {
    return _c("li", {
      key: panel.id,
      class: "panel-" + panel.id
    }, [_c("input", {
      staticClass: "checkbox",
      attrs: {
        id: "panel-checkbox-" + panel.id,
        type: "checkbox"
      },
      domProps: {
        checked: _vm.isActive(panel)
      },
      on: {
        input: function ($event) {
          return _vm.updateCheckbox(panel, $event.target.checked);
        }
      }
    }), _vm._v(" "), _c("label", {
      class: {
        draggable: _vm.isActive(panel)
      },
      attrs: {
        for: "panel-checkbox-" + panel.id
      }
    }, [_c("div", {
      class: panel.iconClass,
      attrs: {
        "aria-hidden": "true",
        role: "img"
      }
    }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(panel.title) + "\n\t\t\t\t\t")])]);
  }), 0), _vm._v(" "), _vm.isAdmin ? _c("a", {
    staticClass: "button",
    attrs: {
      href: _vm.appStoreUrl
    }
  }, [_vm._v(_vm._s(_vm.t("dashboard", "Get more widgets from the App Store")))]) : _vm._e(), _vm._v(" "), _vm.statuses.weather && _vm.isStatusActive("weather") ? _c("div", [_c("h3", [_vm._v(_vm._s(_vm.t("dashboard", "Weather service")))]), _vm._v(" "), _c("p", [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("dashboard", "For your privacy, the weather data is requested by your Nextcloud server on your behalf so the weather service receives no personal information.")) + "\n\t\t\t\t")]), _vm._v(" "), _c("p", {
    staticClass: "credits--end"
  }, [_c("a", {
    attrs: {
      href: "https://api.met.no/doc/TermsOfService",
      target: "_blank",
      rel: "noopener"
    }
  }, [_vm._v(_vm._s(_vm.t("dashboard", "Weather data from Met.no")))]), _vm._v(",\n\t\t\t\t\t"), _c("a", {
    attrs: {
      href: "https://wiki.osmfoundation.org/wiki/Privacy_Policy",
      target: "_blank",
      rel: "noopener"
    }
  }, [_vm._v(_vm._s(_vm.t("dashboard", "geocoding with Nominatim")))]), _vm._v(",\n\t\t\t\t\t"), _c("a", {
    attrs: {
      href: "https://www.opentopodata.org/#public-api",
      target: "_blank",
      rel: "noopener"
    }
  }, [_vm._v(_vm._s(_vm.t("dashboard", "elevation data from OpenTopoData")))]), _vm._v(".\n\t\t\t\t")])]) : _vm._e()], 1)]) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NcDashboardWidget", {
    attrs: {
      items: _vm.items,
      "show-more-label": _vm.showMoreLabel,
      "show-more-url": _vm.showMoreUrl,
      loading: _vm.loading,
      "show-items-and-empty-content": !!_vm.halfEmptyContentMessage,
      "half-empty-content-message": _vm.halfEmptyContentMessage
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function (_ref) {
        let {
          item
        } = _ref;
        return [_c("NcDashboardWidgetItem", {
          attrs: {
            "target-url": item.link,
            "overlay-icon-url": item.overlayIconUrl ? item.overlayIconUrl : "",
            "main-text": item.title,
            "sub-text": item.subtitle
          },
          scopedSlots: _vm._u([{
            key: "avatar",
            fn: function () {
              return [item.iconUrl ? [_c("NcAvatar", {
                attrs: {
                  size: 44,
                  url: item.iconUrl
                }
              })] : _vm._e()];
            },
            proxy: true
          }], null, true)
        })];
      }
    }, {
      key: "empty-content",
      fn: function () {
        return [_vm.items.length === 0 ? _c("NcEmptyContent", {
          attrs: {
            description: _vm.emptyContentMessage
          },
          scopedSlots: _vm._u([{
            key: "icon",
            fn: function () {
              return [_vm.emptyContentMessage ? _c("CheckIcon", {
                attrs: {
                  size: 65
                }
              }) : _vm._e()];
            },
            proxy: true
          }, {
            key: "action",
            fn: function () {
              return [_vm.setupButton ? _c("NcButton", {
                attrs: {
                  href: _vm.setupButton.link
                }
              }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.setupButton.text) + "\n\t\t\t\t")]) : _vm._e()];
            },
            proxy: true
          }], null, false, 4172361897)
        }) : _vm._e()];
      },
      proxy: true
    }])
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "#app-dashboard[data-v-37a61812] {\n  width: 100%;\n  min-height: 100%;\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n}\n#app-dashboard > h2[data-v-37a61812] {\n  color: var(--color-primary-element-text);\n  text-align: center;\n  font-size: 32px;\n  line-height: 130%;\n  padding: 1rem 0;\n}\n.panels[data-v-37a61812] {\n  width: auto;\n  margin: auto;\n  max-width: 1800px;\n  display: flex;\n  justify-content: center;\n  flex-direction: row;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.panel[data-v-37a61812], .panels > div[data-v-37a61812] {\n  width: 320px;\n  max-width: 100%;\n  margin: 16px;\n  align-self: stretch;\n  background-color: var(--color-main-background-blur);\n  -webkit-backdrop-filter: var(--filter-background-blur);\n  backdrop-filter: var(--filter-background-blur);\n  border-radius: var(--border-radius-rounded);\n}\n#body-user.theme--highcontrast .panel[data-v-37a61812], #body-user.theme--highcontrast .panels > div[data-v-37a61812] {\n  border: 2px solid var(--color-border);\n}\n.panel.sortable-ghost[data-v-37a61812], .panels > div.sortable-ghost[data-v-37a61812] {\n  opacity: 0.1;\n}\n.panel > .panel--header[data-v-37a61812], .panels > div > .panel--header[data-v-37a61812] {\n  display: flex;\n  z-index: 1;\n  top: 50px;\n  padding: 16px;\n  cursor: grab;\n}\n.panel > .panel--header[data-v-37a61812], .panel > .panel--header[data-v-37a61812] *, .panels > div > .panel--header[data-v-37a61812], .panels > div > .panel--header[data-v-37a61812] * {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.panel > .panel--header[data-v-37a61812]:active, .panels > div > .panel--header[data-v-37a61812]:active {\n  cursor: grabbing;\n}\n.panel > .panel--header a[data-v-37a61812], .panels > div > .panel--header a[data-v-37a61812] {\n  flex-grow: 1;\n}\n.panel > .panel--header > h2[data-v-37a61812], .panels > div > .panel--header > h2[data-v-37a61812] {\n  display: block;\n  align-items: center;\n  flex-grow: 1;\n  margin: 0;\n  font-size: 20px;\n  line-height: 24px;\n  font-weight: bold;\n  padding: 16px 8px;\n  height: 56px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  cursor: grab;\n}\n.panel > .panel--header > h2 div[data-v-37a61812], .panels > div > .panel--header > h2 div[data-v-37a61812] {\n  background-size: 32px;\n  width: 32px;\n  height: 32px;\n  margin-right: 16px;\n  background-position: center;\n  float: left;\n  margin-top: -6px;\n}\n.panel > .panel--content[data-v-37a61812], .panels > div > .panel--content[data-v-37a61812] {\n  margin: 0 16px 16px 16px;\n  height: 424px;\n  overflow: visible;\n}\n@media only screen and (max-width: 709px) {\n.panel > .panel--content[data-v-37a61812], .panels > div > .panel--content[data-v-37a61812] {\n    height: auto;\n}\n}\n.footer[data-v-37a61812] {\n  display: flex;\n  justify-content: center;\n  transition: bottom var(--animation-slow) ease-in-out;\n  padding: 1rem 0;\n}\n.edit-panels[data-v-37a61812] {\n  display: inline-block;\n  margin: auto;\n  background-position: 16px center;\n  padding: 12px 16px;\n  padding-left: 36px;\n  border-radius: var(--border-radius-pill);\n  max-width: 200px;\n  opacity: 1;\n  text-align: center;\n}\n.button[data-v-37a61812],\n.button-vue[data-v-37a61812],\n.edit-panels[data-v-37a61812],\n.statuses[data-v-37a61812] .action-item .action-item__menutoggle,\n.statuses[data-v-37a61812] .action-item.action-item--open .action-item__menutoggle {\n  background-color: var(--color-main-background-blur);\n  -webkit-backdrop-filter: var(--filter-background-blur);\n  backdrop-filter: var(--filter-background-blur);\n  opacity: 1 !important;\n}\n.button[data-v-37a61812]:hover, .button[data-v-37a61812]:focus, .button[data-v-37a61812]:active,\n.button-vue[data-v-37a61812]:hover,\n.button-vue[data-v-37a61812]:focus,\n.button-vue[data-v-37a61812]:active,\n.edit-panels[data-v-37a61812]:hover,\n.edit-panels[data-v-37a61812]:focus,\n.edit-panels[data-v-37a61812]:active,\n.statuses[data-v-37a61812] .action-item .action-item__menutoggle:hover,\n.statuses[data-v-37a61812] .action-item .action-item__menutoggle:focus,\n.statuses[data-v-37a61812] .action-item .action-item__menutoggle:active,\n.statuses[data-v-37a61812] .action-item.action-item--open .action-item__menutoggle:hover,\n.statuses[data-v-37a61812] .action-item.action-item--open .action-item__menutoggle:focus,\n.statuses[data-v-37a61812] .action-item.action-item--open .action-item__menutoggle:active {\n  background-color: var(--color-background-hover) !important;\n}\n.button[data-v-37a61812]:focus-visible,\n.button-vue[data-v-37a61812]:focus-visible,\n.edit-panels[data-v-37a61812]:focus-visible,\n.statuses[data-v-37a61812] .action-item .action-item__menutoggle:focus-visible,\n.statuses[data-v-37a61812] .action-item.action-item--open .action-item__menutoggle:focus-visible {\n  box-shadow: 0 0 0 2px var(--color-main-text) !important;\n}\n.modal__content[data-v-37a61812] {\n  padding: 32px 16px;\n  text-align: center;\n}\n.modal__content ol[data-v-37a61812] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  list-style-type: none;\n  padding-bottom: 16px;\n}\n.modal__content li label[data-v-37a61812] {\n  position: relative;\n  display: block;\n  padding: 48px 16px 14px 16px;\n  margin: 8px;\n  width: 140px;\n  background-color: var(--color-background-hover);\n  border: 2px solid var(--color-main-background);\n  border-radius: var(--border-radius-large);\n  text-align: left;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.modal__content li label div[data-v-37a61812] {\n  position: absolute;\n  top: 16px;\n  width: 24px;\n  height: 24px;\n  background-size: 24px;\n}\n.modal__content li label[data-v-37a61812]:hover {\n  border-color: var(--color-primary-element);\n}\n.modal__content li:not(.panel-status) label div[data-v-37a61812] {\n  filter: var(--background-invert-if-dark);\n}\n.modal__content li input[type=checkbox].checkbox + label[data-v-37a61812]:before {\n  position: absolute;\n  right: 12px;\n  top: 16px;\n}\n.modal__content li input:focus + label[data-v-37a61812] {\n  border-color: var(--color-primary-element);\n}\n.modal__content h3[data-v-37a61812] {\n  font-weight: bold;\n}\n.modal__content h3[data-v-37a61812]:not(:first-of-type) {\n  margin-top: 64px;\n}\n.modal__content .button[data-v-37a61812] {\n  display: inline-block;\n  padding: 10px 16px;\n  margin: 0;\n}\n.modal__content p[data-v-37a61812] {\n  max-width: 650px;\n  margin: 0 auto;\n}\n.modal__content p a[data-v-37a61812]:hover,\n.modal__content p a[data-v-37a61812]:focus {\n  border-bottom: 2px solid var(--color-border);\n}\n.modal__content .credits--end[data-v-37a61812] {\n  padding-bottom: 32px;\n  color: var(--color-text-maxcontrast);\n}\n.modal__content .credits--end a[data-v-37a61812] {\n  color: var(--color-text-maxcontrast);\n}\n.flip-list-move[data-v-37a61812] {\n  transition: transform var(--animation-slow);\n}\n.statuses[data-v-37a61812] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  flex-wrap: wrap;\n  margin-bottom: 36px;\n}\n.statuses > li[data-v-37a61812] {\n  margin: 8px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\nhtml, body {\n\tbackground-attachment: fixed;\n}\n#body-user #header {\n\tposition: fixed;\n}\n#content {\n\toverflow: auto;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./apps/dashboard/src/DashboardApp.vue":
/*!*********************************************!*\
  !*** ./apps/dashboard/src/DashboardApp.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardApp_vue_vue_type_template_id_37a61812_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardApp.vue?vue&type=template&id=37a61812&scoped=true& */ "./apps/dashboard/src/DashboardApp.vue?vue&type=template&id=37a61812&scoped=true&");
/* harmony import */ var _DashboardApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardApp.vue?vue&type=script&lang=js& */ "./apps/dashboard/src/DashboardApp.vue?vue&type=script&lang=js&");
/* harmony import */ var _DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true& */ "./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true&");
/* harmony import */ var _DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css& */ "./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _DashboardApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashboardApp_vue_vue_type_template_id_37a61812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _DashboardApp_vue_vue_type_template_id_37a61812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "37a61812",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/dashboard/src/DashboardApp.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/dashboard/src/components/ApiDashboardWidget.vue":
/*!**************************************************************!*\
  !*** ./apps/dashboard/src/components/ApiDashboardWidget.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ApiDashboardWidget_vue_vue_type_template_id_d7bbf3fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true& */ "./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true&");
/* harmony import */ var _ApiDashboardWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ApiDashboardWidget.vue?vue&type=script&lang=js& */ "./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ApiDashboardWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ApiDashboardWidget_vue_vue_type_template_id_d7bbf3fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ApiDashboardWidget_vue_vue_type_template_id_d7bbf3fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "d7bbf3fc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/dashboard/src/components/ApiDashboardWidget.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/dashboard/src/DashboardApp.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./apps/dashboard/src/DashboardApp.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardApp.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ApiDashboardWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ApiDashboardWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ApiDashboardWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/dashboard/src/DashboardApp.vue?vue&type=template&id=37a61812&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./apps/dashboard/src/DashboardApp.vue?vue&type=template&id=37a61812&scoped=true& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_template_id_37a61812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_template_id_37a61812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_template_id_37a61812_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardApp.vue?vue&type=template&id=37a61812&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=template&id=37a61812&scoped=true&");


/***/ }),

/***/ "./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ApiDashboardWidget_vue_vue_type_template_id_d7bbf3fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ApiDashboardWidget_vue_vue_type_template_id_d7bbf3fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ApiDashboardWidget_vue_vue_type_template_id_d7bbf3fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/components/ApiDashboardWidget.vue?vue&type=template&id=d7bbf3fc&scoped=true&");


/***/ }),

/***/ "./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_0_id_37a61812_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=0&id=37a61812&lang=scss&scoped=true&");


/***/ }),

/***/ "./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css&":
/*!******************************************************************************************!*\
  !*** ./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardApp_vue_vue_type_style_index_1_id_37a61812_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/dashboard/src/DashboardApp.vue?vue&type=style&index=1&id=37a61812&lang=css&");


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
/******/ 			"dashboard-main": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["core-common"], () => (__webpack_require__("./apps/dashboard/src/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=dashboard-main.js.map?v=40f23f134121c6ec3dbd