/*
 * Copyright (c) 2014
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function() {

	/**
	 * Construct a new FileActions instance
	 * @constructs FileActions
	 * @memberof OCA.Files
	 */

	let peertime_userToken, peertime_uniqueIDs, drive_phone = ''
	$.ajax({
		type: 'POST',
		url: OC.generateUrl('apps/integration_kloud/getPhone'),
		contentType: 'application/json',
		success:function (res) {
			drive_phone = res.message
			$.ajax({
				type: 'POST',
				url: 'https://api.peertime.cn/peertime/V1/P1Integration/ExchangeToken?languageid=1',
				contentType: 'application/json',
				data: JSON.stringify({
					UniqueID: 'drive-' + OC.getCurrentUser().uid,
					Phone: drive_phone
				}),
				success:function (res) {
					peertime_userToken = res.RetData
				}
			})
		}
	})
	var FileActions = function() {
		this.initialize();
	};
	FileActions.TYPE_DROPDOWN = 0;
	FileActions.TYPE_INLINE = 1;
	FileActions.prototype = {
		/** @lends FileActions.prototype */
		actions: {},
		defaults: {},
		icons: {},

		/**
		 * @deprecated
		 */
		currentFile: null,

		/**
		 * Dummy jquery element, for events
		 */
		$el: null,

		_fileActionTriggerTemplate: null,

		/**
		 * @private
		 */
		initialize: function() {
			this.clear();
			// abusing jquery for events until we get a real event lib
			this.$el = $('<div class="dummy-fileactions hidden"></div>');
			$('body').append(this.$el);

			this._showMenuClosure = _.bind(this._showMenu, this);
		},

		/**
		 * Adds an event handler
		 *
		 * @param {String} eventName event name
		 * @param {Function} callback
		 */
		on: function(eventName, callback) {
			this.$el.on(eventName, callback);
		},

		/**
		 * Removes an event handler
		 *
		 * @param {String} eventName event name
		 * @param {Function} callback
		 */
		off: function(eventName, callback) {
			this.$el.off(eventName, callback);
		},

		/**
		 * Notifies the event handlers
		 *
		 * @param {String} eventName event name
		 * @param {Object} data data
		 */
		_notifyUpdateListeners: function(eventName, data) {
			this.$el.trigger(new $.Event(eventName, data));
		},

		/**
		 * Merges the actions from the given fileActions into
		 * this instance.
		 *
		 * @param {OCA.Files.FileActions} fileActions instance of OCA.Files.FileActions
		 */
		merge: function(fileActions) {
			var self = this;
			// merge first level to avoid unintended overwriting
			_.each(fileActions.actions, function(sourceMimeData, mime) {
				var targetMimeData = self.actions[mime];
				if (!targetMimeData) {
					targetMimeData = {};
				}
				self.actions[mime] = _.extend(targetMimeData, sourceMimeData);
			});

			this.defaults = _.extend(this.defaults, fileActions.defaults);
			this.icons = _.extend(this.icons, fileActions.icons);
		},
		/**
		 * @deprecated use #registerAction() instead
		 */
		register: function(mime, name, permissions, icon, action, displayName) {
			return this.registerAction({
				name: name,
				mime: mime,
				permissions: permissions,
				icon: icon,
				actionHandler: action,
				displayName: displayName || name
			});
		},

		/**
		 * Register action
		 *
		 * @param {OCA.Files.FileAction} action object
		 */
		registerAction: function (action) {
			var mime = action.mime;
			var name = action.name;
			var actionSpec = {
				action: function(fileName, context) {
					// Actions registered in one FileAction may be executed on a
					// different one (for example, due to the "merge" function),
					// so the listeners have to be updated on the FileActions
					// from the context instead of on the one in which it was
					// originally registered.
					if (context && context.fileActions) {
						context.fileActions._notifyUpdateListeners('beforeTriggerAction', {action: actionSpec, fileName: fileName, context: context});
					}

					action.actionHandler(fileName, context);

					if (context && context.fileActions) {
						context.fileActions._notifyUpdateListeners('afterTriggerAction', {action: actionSpec, fileName: fileName, context: context});
					}
				},
				name: name,
				displayName: action.displayName,
				mime: mime,
				filename: action.filename,
				order: action.order || 0,
				icon: action.icon,
				iconClass: action.iconClass,
				permissions: action.permissions,
				type: action.type || FileActions.TYPE_DROPDOWN,
				altText: action.altText || ''
			};
			if (_.isUndefined(action.displayName)) {
				actionSpec.displayName = t('files', name);
			}
			if (_.isFunction(action.render)) {
				actionSpec.render = action.render;
			}
			if (_.isFunction(action.shouldRender)) {
				actionSpec.shouldRender = action.shouldRender;
			}
			if (!this.actions[mime]) {
				this.actions[mime] = {};
			}
			this.actions[mime][name] = actionSpec;
			this.icons[name] = action.icon;
			this._notifyUpdateListeners('registerAction', {action: action});
		},
		/**
		 * Clears all registered file actions.
		 */
		clear: function() {
			this.actions = {};
			this.defaults = {};
			this.icons = {};
			this.currentFile = null;
		},
		/**
		 * Sets the default action for a given mime type.
		 *
		 * @param {String} mime mime type
		 * @param {String} name action name
		 */
		setDefault: function (mime, name) {
			this.defaults[mime] = name;
			this._notifyUpdateListeners('setDefault', {defaultAction: {mime: mime, name: name}});
		},

		/**
		 * Returns a map of file actions handlers matching the given conditions
		 *
		 * @param {string} mime mime type
		 * @param {string} type "dir" or "file"
		 * @param {number} permissions permissions
		 * @param {string} filename filename
		 *
		 * @return {Object.<string,OCA.Files.FileActions~actionHandler>} map of action name to action spec
		 */
		get: function(mime, type, permissions, filename) {
			var actions = this.getActions(mime, type, permissions, filename);
			var filteredActions = {};
			$.each(actions, function (name, action) {
				filteredActions[name] = action.action;
			});
			return filteredActions;
		},

		/**
		 * Returns an array of file actions matching the given conditions
		 *
		 * @param {string} mime mime type
		 * @param {string} type "dir" or "file"
		 * @param {number} permissions permissions
		 * @param {string} filename filename
		 *
		 * @return {Array.<OCA.Files.FileAction>} array of action specs
		 */
		getActions: function(mime, type, permissions, filename) {
			var actions = {};
			if (this.actions.all) {
				actions = $.extend(actions, this.actions.all);
			}
			if (type) {//type is 'dir' or 'file'
				if (this.actions[type]) {
					actions = $.extend(actions, this.actions[type]);
				}
			}
			if (mime) {
				var mimePart = mime.substr(0, mime.indexOf('/'));
				if (this.actions[mimePart]) {
					actions = $.extend(actions, this.actions[mimePart]);
				}
				if (this.actions[mime]) {
					actions = $.extend(actions, this.actions[mime]);
				}
			}

			var filteredActions = {};
			var self = this;
			$.each(actions, function(name, action) {
				if (self.allowedPermissions(action.permissions, permissions) &&
					self.allowedFilename(action.filename, filename)) {
					filteredActions[name] = action;
				}
			});

			return filteredActions;
		},


		allowedPermissions: function(actionPermissions, permissions) {
			return (actionPermissions === OC.PERMISSION_NONE || (actionPermissions & permissions));
		},

		allowedFilename: function(actionFilename, filename) {
			return (!filename || filename === '' || !actionFilename
				|| actionFilename === '' || actionFilename === filename);
		},

		/**
		 * Returns the default file action handler for the given conditions
		 *
		 * @param {string} mime mime type
		 * @param {string} type "dir" or "file"
		 * @param {number} permissions permissions
		 *
		 * @return {OCA.Files.FileActions~actionHandler} action handler
		 *
		 * @deprecated use getDefaultFileAction instead
		 */
		getDefault: function (mime, type, permissions) {
			var defaultActionSpec = this.getDefaultFileAction(mime, type, permissions);
			if (defaultActionSpec) {
				return defaultActionSpec.action;
			}
			return undefined;
		},

		/**
		 * Returns the default file action handler for the current file
		 *
		 * @return {OCA.Files.FileActions~actionSpec} action spec
		 * @since 8.2
		 */
		getCurrentDefaultFileAction: function() {
			var mime = this.getCurrentMimeType();
			var type = this.getCurrentType();
			var permissions = this.getCurrentPermissions();
			return this.getDefaultFileAction(mime, type, permissions);
		},

		/**
		 * Returns the default file action handler for the given conditions
		 *
		 * @param {string} mime mime type
		 * @param {string} type "dir" or "file"
		 * @param {number} permissions permissions
		 *
		 * @return {OCA.Files.FileActions~actionSpec} action spec
		 * @since 8.2
		 */
		getDefaultFileAction: function(mime, type, permissions) {
			var mimePart;
			if (mime) {
				mimePart = mime.substr(0, mime.indexOf('/'));
			}
			var name = false;
			if (mime && this.defaults[mime]) {
				name = this.defaults[mime];
			} else if (mime && this.defaults[mimePart]) {
				name = this.defaults[mimePart];
			} else if (type && this.defaults[type]) {
				name = this.defaults[type];
			} else {
				name = this.defaults.all;
			}
			var actions = this.getActions(mime, type, permissions);
			return actions[name];
		},

		/**
		 * Default function to render actions
		 *
		 * @param {OCA.Files.FileAction} actionSpec file action spec
		 * @param {boolean} isDefault true if the action is a default one,
		 * false otherwise
		 * @param {OCA.Files.FileActionContext} context action context
		 */
		_defaultRenderAction: function(actionSpec, isDefault, context) {
			if (!isDefault) {
				var params = {
					name: actionSpec.name,
					nameLowerCase: actionSpec.name.toLowerCase(),
					displayName: actionSpec.displayName,
					icon: actionSpec.icon,
					iconClass: actionSpec.iconClass,
					altText: actionSpec.altText,
					hasDisplayName: !!actionSpec.displayName
				};
				if (_.isFunction(actionSpec.icon)) {
					params.icon = actionSpec.icon(context.$file.attr('data-file'), context);
				}
				if (_.isFunction(actionSpec.iconClass)) {
					params.iconClass = actionSpec.iconClass(context.$file.attr('data-file'), context);
				}

				var $actionLink = this._makeActionLink(params, context);
				context.$file.find('a.name>span.fileactions').append($actionLink);
				$actionLink.addClass('permanent');
				return $actionLink;
			}
		},

		/**
		 * Renders the action link element
		 *
		 * @param {Object} params action params
		 */
		_makeActionLink: function(params) {
			return $(OCA.Files.Templates['file_action_trigger'](params));
		},

		/**
		 * Displays the file actions dropdown menu
		 *
		 * @param {string} fileName file name
		 * @param {OCA.Files.FileActionContext} context rendering context
		 */
		_showMenu: function(fileName, context) {
			var menu;
			var $trigger = context.$file.closest('tr').find('.fileactions .action-menu');
			$trigger.addClass('open');
			$trigger.attr('aria-expanded', 'true');

			menu = new OCA.Files.FileActionsMenu();

			context.$file.find('td.filename').append(menu.$el);

			menu.$el.on('afterHide', function() {
				context.$file.removeClass('mouseOver');
				$trigger.removeClass('open');
				$trigger.attr('aria-expanded', 'false');
				menu.remove();
				$('#sync_menu').hide()
			});

			context.$file.addClass('mouseOver');
			menu.show(context);
			// if (drive_phone === '') {
			// 	$('.action-viewlivedoc-container').addClass('hidden');
			// 	$('.action-startmeeting-container').addClass('hidden');
			// 	$('.action-sync-container').addClass('hidden');
			// }
			$('.action-sendtokloudmeeting-container').addClass('hidden');
			if (context.$file.attr('data-type') !== 'dir') {
				getIsInMeeting();
				getSyncList(fileName, context);
			}
		},

		/**
		 * Renders the menu trigger on the given file list row
		 *
		 * @param {Object} $tr file list row element
		 * @param {OCA.Files.FileActionContext} context rendering context
		 */
		_renderMenuTrigger: function($tr, context) {
			// remove previous
			$tr.find('.action-menu').remove();

			var $el = this._renderInlineAction({
				name: 'menu',
				displayName: '',
				iconClass: 'icon-more',
				altText: t('files', 'Actions'),
				action: this._showMenuClosure
			}, false, context);

			$el.addClass('permanent');
			$el.attr('aria-expanded', 'false');

		},

		/**
		 * Renders the action element by calling actionSpec.render() and
		 * registers the click event to process the action.
		 *
		 * @param {OCA.Files.FileAction} actionSpec file action to render
		 * @param {boolean} isDefault true if the action is a default action,
		 * false otherwise
		 * @param {OCA.Files.FileActionContext} context rendering context
		 */
		_renderInlineAction: function(actionSpec, isDefault, context) {
			if (actionSpec.shouldRender) {
				if (!actionSpec.shouldRender(context)) {
					return;
				}
			}
			var renderFunc = actionSpec.render || _.bind(this._defaultRenderAction, this);
			var $actionEl = renderFunc(actionSpec, isDefault, context);
			if (!$actionEl || !$actionEl.length) {
				return;
			}
			$actionEl.on(
				'click', {
					a: null
				},
				function(event) {
					event.stopPropagation();
					event.preventDefault();

					if ($actionEl.hasClass('open')) {
						return;
					}

					var $file = $(event.target).closest('tr');
					if ($file.hasClass('busy')) {
						return;
					}
					var currentFile = $file.find('td.filename');
					var fileName = $file.attr('data-file');

					context.fileActions.currentFile = currentFile;

					var callContext = _.extend({}, context);

					if (!context.dir && context.fileList) {
						callContext.dir = $file.attr('data-path') || context.fileList.getCurrentDirectory();
					}

					if (!context.fileInfoModel && context.fileList) {
						callContext.fileInfoModel = context.fileList.getModelForFile(fileName);
						if (!callContext.fileInfoModel) {
							console.warn('No file info model found for file "' + fileName + '"');
						}
					}

					actionSpec.action(
						fileName,
						callContext
					);
				}
			);

			return $actionEl;
		},

		/**
		 * Trigger the given action on the given file.
		 *
		 * @param {string} actionName action name
		 * @param {OCA.Files.FileInfoModel} fileInfoModel file info model
		 * @param {OCA.Files.FileList} [fileList] file list, for compatibility with older action handlers [DEPRECATED]
		 *
		 * @return {boolean} true if the action handler was called, false otherwise
		 *
		 * @since 8.2
		 */
		triggerAction: function(actionName, fileInfoModel, fileList) {
			var actionFunc;
			var actions = this.get(
				fileInfoModel.get('mimetype'),
				fileInfoModel.isDirectory() ? 'dir' : 'file',
				fileInfoModel.get('permissions'),
				fileInfoModel.get('name')
			);

			if (actionName) {
				actionFunc = actions[actionName];
			} else {
				actionFunc = this.getDefault(
					fileInfoModel.get('mimetype'),
					fileInfoModel.isDirectory() ? 'dir' : 'file',
					fileInfoModel.get('permissions')
				);
			}

			if (!actionFunc) {
				actionFunc = actions['Download'];
			}

			if (!actionFunc) {
				return false;
			}

			var context = {
				fileActions: this,
				fileInfoModel: fileInfoModel,
				dir: fileInfoModel.get('path')
			};

			var fileName = fileInfoModel.get('name');
			this.currentFile = fileName;

			if (fileList) {
				// compatibility with action handlers that expect these
				context.fileList = fileList;
				context.$file = fileList.findFileEl(fileName);
			}

			actionFunc(fileName, context);
		},

		/**
		 * Display file actions for the given element
		 * @param parent "td" element of the file for which to display actions
		 * @param triggerEvent if true, triggers the fileActionsReady on the file
		 * list afterwards (false by default)
		 * @param fileList OCA.Files.FileList instance on which the action is
		 * done, defaults to OCA.Files.App.fileList
		 */
		display: function (parent, triggerEvent, fileList) {
			if (!fileList) {
				console.warn('FileActions.display() MUST be called with a OCA.Files.FileList instance');
				return;
			}
			this.currentFile = parent;
			var self = this;
			var $tr = parent.closest('tr');
			var actions = this.getActions(
				this.getCurrentMimeType(),
				this.getCurrentType(),
				this.getCurrentPermissions(),
				this.getCurrentFile()
			);
			var nameLinks;
			if ($tr.data('renaming')) {
				return;
			}

			// recreate fileactions container
			nameLinks = parent.children('a.name');
			nameLinks.find('.fileactions, .nametext .action').remove();
			nameLinks.append('<span class="fileactions"></span>');
			var defaultAction = this.getDefaultFileAction(
				this.getCurrentMimeType(),
				this.getCurrentType(),
				this.getCurrentPermissions()
			);

			var context = {
				$file: $tr,
				fileActions: this,
				fileList: fileList
			};

			$.each(actions, function (name, actionSpec) {
				if (actionSpec.type === FileActions.TYPE_INLINE) {
					self._renderInlineAction(
						actionSpec,
						defaultAction && actionSpec.name === defaultAction.name,
						context
					);
				}
			});

			function objectValues(obj) {
				var res = [];
				for (var i in obj) {
					if (obj.hasOwnProperty(i)) {
						res.push(obj[i]);
					}
				}
				return res;
			}
			// polyfill
			if (!Object.values) {
				Object.values = objectValues;
			}

			var menuActions = Object.values(actions).filter(function (action) {
				return action.type !== OCA.Files.FileActions.TYPE_INLINE && (!defaultAction || action.name !== defaultAction.name)
			});
			// do not render the menu if nothing is in it
			if (menuActions.length > 0) {
				this._renderMenuTrigger($tr, context);
			}

			if (triggerEvent){
				fileList.$fileList.trigger(jQuery.Event("fileActionsReady", {fileList: fileList, $files: $tr}));
			}
		},
		getCurrentFile: function () {
			return this.currentFile.parent().attr('data-file');
		},
		getCurrentMimeType: function () {
			return this.currentFile.parent().attr('data-mime');
		},
		getCurrentType: function () {
			return this.currentFile.parent().attr('data-type');
		},
		getCurrentPermissions: function () {
			return this.currentFile.parent().data('permissions');
		},

		/**
		 * Register the actions that are used by default for the files app.
		 */
		registerDefaultActions: function() {
			this.registerAction({
				name: 'Download',
				displayName: t('files', 'Download'),
				order: -20,
				mime: 'all',
				permissions: OC.PERMISSION_READ,
				iconClass: 'icon-download',
				actionHandler: function (filename, context) {
					var dir = context.dir || context.fileList.getCurrentDirectory();
					var isDir = context.$file.attr('data-type') === 'dir';
					var url = context.fileList.getDownloadUrl(filename, dir, isDir);

					var downloadFileaction = $(context.$file).find('.fileactions .action-download');

					// don't allow a second click on the download action
					if(downloadFileaction.hasClass('disabled')) {
						return;
					}

					if (url) {
						var disableLoadingState = function() {
							context.fileList.showFileBusyState(filename, false);
						};

						context.fileList.showFileBusyState(filename, true);
						OCA.Files.Files.handleDownload(url, disableLoadingState);
					}
				}
			});

			this.registerAction({
				name: 'Rename',
				displayName: t('files', 'Rename'),
				mime: 'all',
				order: -30,
				permissions: OC.PERMISSION_UPDATE,
				iconClass: 'icon-rename',
				actionHandler: function (filename, context) {
					context.fileList.rename(filename);
				}
			});

			this.registerAction({
				name: 'StartMeeting',
				displayName: t('files', 'Start Meeting'),
				mime: 'file',
				order: -1000,
				permissions: OC.PERMISSION_READ,
				iconClass: 'icon-kloud',
				actionHandler: function (filename, context) {
					kloud(filename, context, 'StartMeeting')
				}
			});

			this.registerAction({
				name: 'Sync',
				displayName: t('files', 'Sync'),
				mime: 'file',
				order: -998,
				permissions: OC.PERMISSION_READ,
				iconClass: 'icon-kloud',
			});

			this.registerAction({
				name: 'SendtoKloudmeeting',
				displayName: t('files', 'Send to Kloud meeting'),
				mime: 'file',
				order: -999,
				permissions: OC.PERMISSION_READ,
				iconClass: 'icon-kloud',
				actionHandler: function (filename, context) {
					kloud(filename, context, 'SendtoKloudmeeting')
				}
			});

			this.registerAction({
				name: 'ViewLiveDoc',
				displayName: t('files', 'View LiveDoc'),
				mime: 'file',
				order: -1000,
				permissions: OC.PERMISSION_READ,
				iconClass: 'icon-kloud',
				actionHandler: function (filename, context) {
					kloud(filename, context, 'ViewLiveDoc')
				}
			});

			this.registerAction({
				name: 'MoveCopy',
				displayName: function(context) {
					var permissions = context.fileInfoModel.attributes.permissions;
					if (permissions & OC.PERMISSION_UPDATE) {
						if (!context.fileInfoModel.canDownload()) {
							return t('files', 'Move');
						}
						return t('files', 'Move or copy');
					}
					return t('files', 'Copy');
				},
				mime: 'all',
				order: -25,
				permissions: $('#isPublic').val() ? OC.PERMISSION_UPDATE : OC.PERMISSION_READ,
				iconClass: 'icon-external',
				actionHandler: function (filename, context) {
					var permissions = context.fileInfoModel.attributes.permissions;
					var actions = OC.dialogs.FILEPICKER_TYPE_COPY;
					if (permissions & OC.PERMISSION_UPDATE) {
						if (!context.fileInfoModel.canDownload()) {
							actions = OC.dialogs.FILEPICKER_TYPE_MOVE;
						} else {
							actions = OC.dialogs.FILEPICKER_TYPE_COPY_MOVE;
						}
					}
					var dialogDir = context.dir;
					if (typeof context.fileList.dirInfo.dirLastCopiedTo !== 'undefined') {
						dialogDir = context.fileList.dirInfo.dirLastCopiedTo;
					}
					OC.dialogs.filepicker(t('files', 'Choose target folder'), function(targetPath, type) {
						if (type === OC.dialogs.FILEPICKER_TYPE_COPY) {
							context.fileList.copy(filename, targetPath, false, context.dir);
						}
							if (type === OC.dialogs.FILEPICKER_TYPE_MOVE) {
								context.fileList.move(filename, targetPath, false, context.dir);
							}
							context.fileList.dirInfo.dirLastCopiedTo = targetPath;
						}, false, "httpd/unix-directory", true, actions, dialogDir);
				}
			});

			if (Boolean(OC.appswebroots.files_reminders) && Boolean(OC.appswebroots.notifications)) {
				this.registerAction({
					name: 'SetReminder',
					displayName: function(_context) {
						return t('files', 'Set reminder');
					},
					mime: 'all',
					order: -24,
					icon: function(_filename, _context) {
						return OC.imagePath('files_reminders', 'alarm.svg')
					},
					permissions: $('#isPublic').val() ? null : OC.PERMISSION_READ,
					actionHandler: function(_filename, _context) {},
				});
			}

			if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				this.registerAction({
					name: 'EditLocally',
					displayName: function(context) {
						var locked = context.$file.data('locked');
						if (!locked) {
							return t('files', 'Edit locally');
						}
					},
					mime: 'all',
					order: -23,
					icon: function(filename, context) {
						var locked = context.$file.data('locked');
						if (!locked) {
							return OC.imagePath('files', 'computer.svg')
						}
					},
					permissions: OC.PERMISSION_UPDATE,
					actionHandler: function (filename, context) {
						var dir = context.dir || context.fileList.getCurrentDirectory();
						var path = dir === '/' ? dir + filename : dir + '/' + filename;
						context.fileList.openLocalClient(path);
					},
				});
			}

			this.registerAction({
				name: 'Open',
				mime: 'dir',
				permissions: OC.PERMISSION_READ,
				icon: '',
				actionHandler: function (filename, context) {
					let dir, id
					if (context.$file) {
						dir = context.$file.attr('data-path')
						id = context.$file.attr('data-id')
					} else {
						dir = context.fileList.getCurrentDirectory()
						id = context.fileId
					}
					if (OCA.Files.App && OCA.Files.App.getActiveView() !== 'files') {
						OCA.Files.App.setActiveView('files', {silent: true});
						OCA.Files.App.fileList.changeDirectory(OC.joinPaths(dir, filename), true, true);
					} else {
						context.fileList.changeDirectory(OC.joinPaths(dir, filename), true, false, parseInt(id, 10));
					}
				},
				displayName: t('files', 'Open')
			});

			this.registerAction({
				name: 'Delete',
				displayName: function(context) {
					var mountType = context.$file.attr('data-mounttype');
					var type = context.$file.attr('data-type');
					var deleteTitle = (type && type === 'file')
						? t('files', 'Delete file')
						: t('files', 'Delete folder')
					if (mountType === 'external-root') {
						deleteTitle = t('files', 'Disconnect storage');
					} else if (mountType === 'shared-root') {
						deleteTitle = t('files', 'Leave this share');
					}
					return deleteTitle;
				},
				mime: 'all',
				order: 1000,
				// permission is READ because we show a hint instead if there is no permission
				permissions: OC.PERMISSION_DELETE,
				iconClass: 'icon-delete',
				actionHandler: function(fileName, context) {
					// if there is no permission to delete do nothing
					if((context.$file.data('permissions') & OC.PERMISSION_DELETE) === 0) {
						return;
					}
					context.fileList.do_delete(fileName, context.dir);
					$('.tipsy').remove();

					// close sidebar on delete
					const path = context.dir + '/' + fileName
					if (OCA.Files.Sidebar && OCA.Files.Sidebar.file === path) {
						OCA.Files.Sidebar.close()
					}
				}
			});

			this.setDefault('dir', 'Open');
		}
	};


	function getIsInMeeting()
	{
		if (drive_phone == '') {
			return
		}
		$.ajax({
			type: 'GET',
			url: 'https://api.peertime.cn/peertime/V1/P1Integration/CheckUserInMeeting?languageid=1',
			contentType: 'application/json',
			headers: {
				'Usertoken': peertime_userToken
			},
			success:function (res) {
				if (res.RetCode === 0) {
					if (res.RetData === true) {
						$('.action-sendtokloudmeeting-container').removeClass('hidden');
					} else {
						$('.action-sendtokloudmeeting-container').addClass('hidden');
					}
				}
			}
		})
	}


	function getSyncList(filename, context)
	{
		if (drive_phone == '') {
			return
		}
		$('.action-sync-container').mouseenter(function () {
			$('#sync_menu_ul').html("")
			let sync_menu_pos = $('.action-sync-container').offset();
			// $('#sync_menu_ul').append('<li>\n' +
			// 	'            <a href="#" id="startlivesync" class="menuitem action permanent">\n' +
			// 	'                <span class="icon icon-kloud"></span>\n' +
			// 	'                <span>' + t('files', 'Start LiveSync') + '</span>\n' +
			// 	'            </a>\n' +
			// 	'        </li>')
			// $('#startlivesync').on('click', function () {
			// 	kloud(filename, context, 'StartLiveSync')
			// })
			$('#sync_menu').css('left', sync_menu_pos.left + $('.action-sync-container').width()).css('top', sync_menu_pos.top + $('.action-sync-container').height() - ($('.action-sync-container').height())).css('width',  $('.action-sync-container').width() + 40);
			// $('#sync_menu').show();
			kloud(filename, context, 'ViewSync')
		}).mouseleave(function () {
			$('#sync_menu').mouseleave(function () {
				if ($(".action-sync-container").length > 0) {
					if (!$("#sync_menu").is(":hover") && !$(".action-sync-container").is(":hover")) {
						$('#sync_menu').hide();
					}
				} else {
					$('#sync_menu').hide();
				}
			})
			setTimeout(function () {
				if ($(".action-sync-container").length > 0) {
					if (!$("#sync_menu").is(":hover") && !$(".action-sync-container").is(":hover")) {
						$('#sync_menu').hide();
					}
				} else {
					$('#sync_menu').hide();
				}
			}, 1000);
		})
	}

	function kloud_iframe(url)
	{
		$('#peertime_iframe_modal').css('width', document.body.clientWidth * 0.9)
		$('#peertime_iframe_modal').css('height', document.body.clientHeight * 0.9)
		$('#peertime_iframe_modal').show()
		$('#peertime_ifram_id').attr('src', url)
		$('#peertime_iframe__close').off('click').on('click', function () {
			$('#peertime_ifram_id').attr('src', '')
			$('#peertime_iframe_modal').hide();
		})
	}

	function kloud(filename, context, action)
	{
		let drive_dir, drive_file_id, drive_file_mtime, drive_file_hash, drive_mounttype, drive_share_owner_id, peertime_AttachmentID, AttachmentIDhandler

		if (action === 'StartMeeting') {
			AttachmentIDhandler = function () {
				kloud_iframe('https://kloud.cn/p1/meeting/create?title=' + encodeURI(filename) + '&attachmentIds='+peertime_AttachmentID+'&needClearSessionStorage=1&noCallBack=0')
			}
		} else if (action === 'ViewLiveDoc') {
			AttachmentIDhandler = function () {
				kloud_iframe('https://kloud.cn/attachment/' + peertime_AttachmentID)
			}
		} else if (action === 'SendtoKloudmeeting') {
			AttachmentIDhandler = function () {
				$.ajax({
					type: 'POST',
					url: 'https://api.peertime.cn/peertime/V1/P1Integration/AddLessonWithUniqueID?languageid=1',
					contentType: 'application/json',
					data: JSON.stringify({
						Title: filename,
						PhoneNumber: drive_phone,
						UniqueID: peertime_uniqueIDs,
					}),
					success:function (res) {
						if (res.RetCode !== 0) {
							OC.Notification.show(t('files', 'Failed to AddLessonWithUniqueID') + " : " + res.ErrorMessage, {type: 'error'});
							return
						} else {
							OC.Notification.show(t('files', 'Send successful'));
						}
					}
				}).fail(function(err) {
					console.log(err)
					OC.Notification.show(t('files', 'Failed to AddLessonWithUniqueID') + " : " + JSON.stringify(err), {type: 'error'});
				});
			}

		} else if (action === 'StartLiveSync') {
			AttachmentIDhandler = function () {
				//todo  companyId是写死的  但暂时不影响  因为不同companyId下的userid相同
				$.ajax({
					type: 'GET',
					// url: 'https://api.peertime.cn/peertime/V1/User/GetUserCompanyInfo?companyId=3255',
					url: 'https://api.peertime.cn/peertime/V1/User/UserProfile',
					contentType: 'application/json',
					headers: {
						'Usertoken': peertime_userToken
					},
					success:function (res) {
						if (res.RetCode !== 0) {
							OC.Notification.show(t('files', 'Failed to GetUserCompanyInfo') + " : " + res.ErrorMessage, {type: 'error'});
							return
						} else {
							let peertime_userid = res.RetData.UserID
							// let peertime_role = res.RetData.RoleID
							let peertime_role = 2
							// let peertime_companyid = res.RetData.CompanyID
							let peertime_companyid = 3255
							let peertime_fullname = res.RetData.FullName
							$('#livesync_name').val(peertime_fullname + "'s LiveSync")
							$('#livesync_dialog')[0].showModal();
							$('#livesync_modal').show();
							$('#livesync_close').off('click').on('click', function () {
								$('#livesync_dialog')[0].close();
								$('#livesync_modal').hide();
							})
							$('#livesync_no').off('click').on('click', function () {
								$('#livesync_dialog')[0].close();
								$('#livesync_modal').hide();
							})
							$('#livesync_yes').off('click').on('click', function () {
								$('#livesync_yes').attr('disabled', 'disabled')
								$.ajax({
									type: 'POST',
									url: 'https://wss.peertime.cn/MeetingServer/livesync/create_live_sync',
									contentType: 'application/json',
									headers: {
										'Usertoken': peertime_userToken
									},
									data: JSON.stringify({
										attachmentIds: [peertime_AttachmentID],
										companyId: peertime_companyid,
										members: [
											{
												memberId: peertime_userid,
												role: peertime_role,
											}
										],
										startMeetingNow: $('#livesync_startMeetingNow').is(":checked"),
										title: peertime_fullname + "'s LiveSync",
										sourceFromId: 8
									}),
									success:function (res) {
										$('#livesync_yes').removeAttr('disabled')
										$('#livesync_dialog')[0].close();
										$('#livesync_modal').hide();
										if (res.code !== 0) {
											OC.Notification.show(t('files', 'Failed to create_live_sync') + " : " + res.msg, {type: 'error'});
											return
										} else {
											let mainLiveSyncId = res.data.mainLiveSyncId
											let subMeetingId = res.data.subMeetingId
											if (!subMeetingId) {
												kloud_iframe('https://kloud.cn/livesync/' + mainLiveSyncId)
											} else if (subMeetingId) {
												kloud_iframe('https://kloud.cn/livesync/' + subMeetingId)
											} else {
												OC.Notification.show(t('files', 'Failed to create_live_sync') + " : " + JSON.stringify(err), {type: 'error'});
											}
										}
									}
								}).fail(function(err) {
									$('#livesync_yes').removeAttr('disabled')
									$('#livesync_dialog')[0].close();
									$('#livesync_modal').hide();
									console.log(err)
									OC.Notification.show(t('files', 'Failed to create_live_sync') + " : " + JSON.stringify(err), {type: 'error'});
								});
							})
						}
					}
				}).fail(function(err) {
					console.log(err)
					OC.Notification.show(t('files', 'Failed to GetUserCompanyInfo') + " : " + JSON.stringify(err), {type: 'error'});
				});

			}
		} else if (action === 'ViewSync') {
			AttachmentIDhandler = function () {
				$.ajax({
					type: 'GET',
					url: 'https://api.peertime.cn/peertime/V1/Soundtrack/DocNoteSyncList?attachmentIds=' + peertime_AttachmentID + '&isPublic=0&includeVideoSync=0',
					contentType: 'application/json',
					success:function (res) {
						if (res.RetCode !== 0) {
							OC.Notification.show(t('files', 'Failed to DocNoteSyncList') + " : " + res.ErrorMessage, {type: 'error'});
							return
						} else {
							if (res.RetData.length > 0) {
								$('#sync_menu_ul').html('');
								// $('#livesync_menu_ul').append('<li>\n' +
								// 	'            <a href="#" id="startlivesync" class="menuitem action permanent">\n' +
								// 	'                <span class="icon icon-kloud"></span>\n' +
								// 	'                <span>' + t('files', 'Start LiveSync') + '</span>\n' +
								// 	'            </a>\n' +
								// 	'        </li>')
								// $('#startlivesync').on('click', function () {
								// 	kloud(filename, context, 'StartLiveSync')
								// })
								res.RetData.forEach(function(item) {
									if (item.Title === '') {
										item.Title = t('files', 'Unnamed Sync')
									}
									$('#sync_menu_ul').append('<li>\n' +
										'            <a href="https://kloud.cn/sync/' + item.SoundtrackID + '" target="_blank"  class="menuitem action permanent">\n' +
										'                <span class="icon icon-kloud"></span>\n' +
										'                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + item.Title + '</span>\n' +
										'            </a>\n' +
										'        </li>')
								})
								$('#sync_menu').show();
							} else {
								$('#sync_menu').hide();
							}
						}
					}
				}).fail(function(err) {
					console.log(err)
					OC.Notification.show(t('files', 'Failed to DocNoteSyncList') + " : " + JSON.stringify(err), {type: 'error'});
				});
			}
		} else {
			OC.Notification.show('Error', {type: 'error'});
			return
		}

		if (context.$file) {
			drive_dir = context.$file.attr('data-path')
			drive_file_id = context.$file.attr('data-id')
			drive_file_mtime = context.$file.attr('data-mtime')
			drive_file_hash = context.$file.attr('data-etag')
            drive_mounttype = context.$file.attr('data-mounttype')
			drive_share_owner_id = context.$file.attr('data-share-owner-id')
		} else {
			OC.Notification.show('Error', {type: 'error'});
			return
		}
		function b64EncodeUnicode(str) {
			return btoa(encodeURI(str))
		}

		let peertime_file_hash, peertime_UploadFileWithHash_FileID, peertime_UploadFileWithHash_Path, peertime_startSending_body, peertime_QuerySending_token, peertime_UploadNewFile_body, peertime_UpdateAttachmentBindRelation_body, peertime_FinishPercent
		peertime_FinishPercent = -1
		peertime_uniqueIDs = 'drive-' + drive_file_id + '-' + drive_file_mtime;
		let peertime_LinkedAttachmentInfo = function () {
			$.ajax({
				type: 'GET',
				url: 'https://api.peertime.cn/peertime/V1/P1Integration/LinkedAttachmentInfo?languageid=1&uniqueIDs=' + peertime_uniqueIDs,
				contentType: 'application/json',
				success:function (res) {
					if (res.RetCode !== 0) {
						OC.Notification.show(t('files', 'Failed to LinkedAttachmentInfo') + " : " + res.ErrorMessage, {type: 'error'});
						return
					}
					if (res.RetData.length > 0) {
						peertime_AttachmentID = res.RetData[0]['AttachmentID']
						AttachmentIDhandler();
						return
					} else {
						if (action === 'ViewSync') {
							//鼠标悬浮不应该触发文件上传
							return
						}
					}
					peertime_file_hash = drive_file_hash;
					if (peertime_userToken) {
						peertime_UploadFileWithHash()
					} else {
						peertime_ExchangeToken()
					}

				}
			}).fail(function(err) {
				console.log(err)
				OC.Notification.show(t('files', 'Failed to LinkedAttachmentInfo') + " : " + JSON.stringify(err), {type: 'error'});
			});
		}
		let peertime_ExchangeToken = function () {
			$.ajax({
				type: 'POST',
				url: 'https://api.peertime.cn/peertime/V1/P1Integration/ExchangeToken?languageid=1',
				contentType: 'application/json',
				data: JSON.stringify({
					UniqueID: 'drive-' + OC.getCurrentUser().uid,
					Phone: drive_phone
				}),
				success:function (res) {
					if (res.RetCode !== 0) {
						OC.Notification.show(t('files', 'Failed to get user token') + " : " + res.ErrorMessage, {type: 'error'});
						return
					}
					peertime_userToken = res.RetData
					peertime_UploadFileWithHash()
				}
			}).fail(function(err) {
				console.log(err)
				OC.Notification.show(t('files', 'Failed to get user token') + " : " + JSON.stringify(err), {type: 'error'});
			});
		}
		let peertime_UploadFileWithHash = function () {
			$.ajax({
				type: 'POST',
				url: 'https://api.peertime.cn/peertime/V1/SpaceAttachment/UploadFileWithHash?spaceID=1586&folderID=-1&Title=' + b64EncodeUnicode(filename) + '&Description=&Hash=' + peertime_file_hash + '&isFromP1=1',
				contentType: 'application/json',
				headers: {
					'Usertoken': peertime_userToken
				},
				success:function (res) {
					if (res.RetCode === 0) {
						peertime_AttachmentID = res.RetData.AttachmentID
						peertime_UpdateAttachmentBindRelation_body = '{"PhoneNumber":"'+drive_phone+'","UniqueID":"'+peertime_uniqueIDs+'","AttachmentID":'+peertime_AttachmentID+'}'
						peertime_UpdateAttachmentBindRelation()
						AttachmentIDhandler();
						return
					}
					if (res.RetCode === -1401) {
						//延时执行防止卡死
						setTimeout(function () {
							peertime_ExchangeToken()
						}, 500)
						return
					}
					if (res.RetCode !== -6002) {
						OC.Notification.show(t('files', 'Failed to UploadFileWithHash') + " : " + res.ErrorMessage, {type: 'error'});
						return
					}
					peertime_UploadFileWithHash_FileID = res.RetData.FileID
					peertime_UploadFileWithHash_Path = res.RetData.Path
					let peertime_file_ext = filename.substr(filename.lastIndexOf('.') + 1)
					let peertime_file_name = filename.replace(/\.[^/.]+$/, "")

					if (drive_mounttype === 'external') {
						//todo drive和AmazonS3目前写死的
						peertime_startSending_body = '{"Bucket":{"ServiceProviderId":2,"RegionName":"oss-cn-shanghai","BucketName":"peertime"},"Config":{"Retry":{"MaxTimes":1,"MinutesOfIntervalTime":2}},"SourceUrl":"http://drive.windows365.org.cn:19000/drive' + drive_dir.replace('/AmazonS3', '') + '/' + filename + '","DocumentType":"' + peertime_file_ext + '","TargetFolderKey":"' + peertime_UploadFileWithHash_Path + '","IgnoreConverting":false,"EnableExtractingImagesFromPDF":false,"FileName":"' + peertime_file_name + '"}'
					} else {
						let download_api_uid = OC.getCurrentUser().uid
						if (drive_share_owner_id) {
							download_api_uid = drive_share_owner_id
						}
						if (OC.debug) {
							peertime_startSending_body = '{"Bucket":{"ServiceProviderId":2,"RegionName":"oss-cn-shanghai","BucketName":"peertime"},"Config":{"Retry":{"MaxTimes":1,"MinutesOfIntervalTime":2}},"SourceUrl":"https://drive.windows365.org.cn:44443/apps/integration_kloud/downloadFile?uid=' + download_api_uid + '&file_id=' + drive_file_id + '&token=' + drive_file_hash +'","DocumentType":"' + peertime_file_ext + '","TargetFolderKey":"' + peertime_UploadFileWithHash_Path + '","IgnoreConverting":false,"EnableExtractingImagesFromPDF":false,"FileName":"' + peertime_file_name + '"}'
						} else {
							peertime_startSending_body = '{"Bucket":{"ServiceProviderId":2,"RegionName":"oss-cn-shanghai","BucketName":"peertime"},"Config":{"Retry":{"MaxTimes":1,"MinutesOfIntervalTime":2}},"SourceUrl":"'+ window.location.origin + '/apps/integration_kloud/downloadFile?uid=' + download_api_uid + '&file_id=' + drive_file_id + '&token=' + drive_file_hash +'","DocumentType":"' + peertime_file_ext + '","TargetFolderKey":"' + peertime_UploadFileWithHash_Path + '","IgnoreConverting":false,"EnableExtractingImagesFromPDF":false,"FileName":"' + peertime_file_name + '"}'
						}
					}

					peertime_startSending()
				}
			}).fail(function(err) {
				console.log(err)
				OC.Notification.show(t('files', 'Failed to UploadFileWithHash') + " : " + JSON.stringify(err), {type: 'error'});
			});
		}
		let peertime_startSending = function () {
			$.ajax({
				type: 'POST',
				url: 'https://livedoc.peertime.cn/TxLiveDocumentApi/api/startSending',
				contentType: 'application/json',
				headers: {
					'Authorization': 'Bearer 02912174-3dcb-49eb-b9fa-6d90b390d495'
				},
				data: peertime_startSending_body,
				success: function (res) {
					if (res.Success !== true) {
						OC.Notification.show(t('files', 'Failed to startSending') + " : " + res.Error.ErrorMessage, {type: 'error'});
						return
					}
					peertime_QuerySending_token = res.Data.Token
					peertime_QuerySending()
				}
			}).fail(function(err) {
				console.log(err)
				OC.Notification.show(t('files', 'Failed to startSending') + " : " + JSON.stringify(err), {type: 'error'});
			});
		}
		let peertime_QuerySending = function () {
			$.ajax({
				type: 'GET',
				url: 'https://livedoc.peertime.cn/TxLiveDocumentApi/api/querySending?token=' + peertime_QuerySending_token,
				contentType: 'application/json',
				headers: {
					'Authorization': 'Bearer 02912174-3dcb-49eb-b9fa-6d90b390d495'
				},
				success: function (res) {
					let peertime_div = '    <div class="peertime-progress-pie-chart" data-percent="0" style="display:none;z-index: 9999;position: absolute;margin: auto;left: 50%;top: 50%;transform: translate(-50%,-50%)">\n' +
						'        <div class="peertime-ppc-progress">\n' +
						'            <div class="peertime-ppc-progress-fill"></div>\n' +
						'        </div>\n' +
						'        <div class="peertime-ppc-percents">\n' +
						'            <div class="peertime-pcc-percents-wrapper">\n' +
						'                <span>%</span>\n' +
						'            </div>\n' +
						'        </div>\n' +
						'    </div>'
					let peertime_ppc = document.querySelector(".peertime-progress-pie-chart")
					if (res.Data.FinishPercent === 100) {
						$("#peertime-progress").html(peertime_div)
						let peertime_queryConverting_FileName = res.Data.Result.FileName
						let peertime_queryConverting_FileSize = res.Data.Result.FileSize
						let peertime_queryConverting_PageCount = res.Data.Result.Count
						peertime_UploadNewFile_body = '{"Title":"'+filename+'","SpaceID":1586,"Description":"'+filename+'","Hash":"'+peertime_file_hash+'","FileID":' + peertime_UploadFileWithHash_FileID + ',"PageCount":'+peertime_queryConverting_PageCount+',"FileName":"'+peertime_queryConverting_FileName+'","FileSize":'+peertime_queryConverting_FileSize+',"PdfFileSize":0,"FileFrom":"","FileFromID":"","FileFromLink":"","FileFromType":"","FileFromVersion":"","FileFromAccount":""}'
						peertime_UploadNewFile()
					} else {
						if (res.Data.FailureMessage !== undefined) {
							OC.Notification.show(t('files', 'Failed to querySending') + " : " + res.Data.FailureMessage, {type: 'error'});
							peertime_ppc.style.display = 'none'
						} else {
							if (res.Data.FinishPercent > peertime_FinishPercent || peertime_FinishPercent < 0) {
								peertime_FinishPercent = res.Data.FinishPercent
								let peertime_deg = (360 * peertime_FinishPercent) / 100

								if (peertime_FinishPercent > 50) {
									peertime_ppc.classList.add("peertime-gt-50")
								}

								let progressFill = document.querySelector(".peertime-ppc-progress-fill")
								progressFill.style.transform = "rotate(" + peertime_deg + "deg)"

								var percentsSpan = document.querySelector(".peertime-ppc-percents span")
								percentsSpan.innerHTML = peertime_FinishPercent + "%"
								peertime_ppc.style.display = 'block'
							}
							setTimeout(function () {
								peertime_QuerySending()
							}, 1000)
						}
					}
				}
			}).fail(function(err) {
				console.log(err)
				OC.Notification.show(t('files', 'Failed to querySending') + " : " + JSON.stringify(err), {type: 'error'});
			});
		}
		let peertime_UploadNewFile = function () {
			$.ajax({
				type: 'POST',
				url: 'https://api.peertime.cn/peertime/V1/SpaceAttachment/UploadNewFile',
				contentType: 'application/json',
				headers: {
					'Usertoken': peertime_userToken
				},
				data: peertime_UploadNewFile_body,
				success: function (res) {
					if (res.RetCode !== 0) {
						OC.Notification.show(t('files', 'Failed to UploadNewFile') + " : " + res.ErrorMessage, {type: 'error'});
						return
					}
					peertime_AttachmentID = res.RetData.AttachmentID
					peertime_UpdateAttachmentBindRelation_body = '{"PhoneNumber":"+'+drive_phone+'","UniqueID":"'+peertime_uniqueIDs+'","AttachmentID":'+peertime_AttachmentID+'}'
					peertime_UpdateAttachmentBindRelation()
					AttachmentIDhandler();
				}
			}).fail(function(err) {
				console.log(err)
				OC.Notification.show(t('files', 'Failed to UploadNewFile') + " : " + JSON.stringify(err), {type: 'error'});
			});
		}
		let peertime_UpdateAttachmentBindRelation = function () {
			$.ajax({
				type: 'POST',
				url: 'https://api.peertime.cn/peertime/V1/P1Integration/UpdateAttachmentBindRelation?languageid=1',
				contentType: 'application/json',
				headers: {
					'Usertoken': peertime_userToken
				},
				data: peertime_UpdateAttachmentBindRelation_body,
			})
		}

		if (drive_phone !== '') {
			peertime_LinkedAttachmentInfo()
		} else {
			$.ajax({
				type: 'POST',
				url: OC.generateUrl('apps/integration_kloud/getPhone'),
				contentType: 'application/json',
				success:function (res) {
					drive_phone = res.message
					peertime_LinkedAttachmentInfo()
				}
			}).fail(function(err) {
				OC.Notification.show(err.responseJSON.message, {type: 'error'});
			});
		}
	}

	OCA.Files.FileActions = FileActions;

	/**
	 * Replaces the button icon with a loading spinner and vice versa
	 * - also adds the class disabled to the passed in element
	 *
	 * @param {jQuery} $buttonElement The button element
	 * @param {boolean} showIt whether to show the spinner(true) or to hide it(false)
	 */
	OCA.Files.FileActions.updateFileActionSpinner = function($buttonElement, showIt) {
		var $icon = $buttonElement.find('.icon');
		if (showIt) {
			var $loadingIcon = $('<span class="icon icon-loading-small"></span>');
			$icon.after($loadingIcon);
			$icon.addClass('hidden');
		} else {
			$buttonElement.find('.icon-loading-small').remove();
			$buttonElement.find('.icon').removeClass('hidden');
		}
	};

	/**
	 * File action attributes.
	 *
	 * @todo make this a real class in the future
	 * @typedef {Object} OCA.Files.FileAction
	 *
	 * @property {String} name identifier of the action
	 * @property {(String|OCA.Files.FileActions~displayNameFunction)} displayName
	 * display name string for the action, or function that returns the display name.
	 * Defaults to the name given in name property
	 * @property {String} mime mime type
	 * @property {String} filename filename
	 * @property {number} permissions permissions
	 * @property {(Function|String)} icon icon path to the icon or function that returns it (deprecated, use iconClass instead)
	 * @property {(String|OCA.Files.FileActions~iconClassFunction)} iconClass class name of the icon (recommended for theming)
	 * @property {OCA.Files.FileActions~renderActionFunction} [render] optional rendering function
	 * @property {OCA.Files.FileActions~actionHandler} actionHandler action handler function
	 */

	/**
	 * File action context attributes.
	 *
	 * @typedef {Object} OCA.Files.FileActionContext
	 *
	 * @property {Object} $file jQuery file row element
	 * @property {OCA.Files.FileActions} fileActions file actions object
	 * @property {OCA.Files.FileList} fileList file list object
	 */

	/**
	 * Render function for actions.
	 * The function must render a link element somewhere in the DOM
	 * and return it. The function should NOT register the event handler
	 * as this will be done after the link was returned.
	 *
	 * @callback OCA.Files.FileActions~renderActionFunction
	 * @param {OCA.Files.FileAction} actionSpec action definition
	 * @param {Object} $row row container
	 * @param {boolean} isDefault true if the action is the default one,
	 * false otherwise
	 * @return {Object} jQuery link object
	 */

	/**
	 * Display name function for actions.
	 * The function returns the display name of the action using
	 * the given context information..
	 *
	 * @callback OCA.Files.FileActions~displayNameFunction
	 * @param {OCA.Files.FileActionContext} context action context
	 * @return {String} display name
	 */

	/**
	 * Icon class function for actions.
	 * The function returns the icon class of the action using
	 * the given context information.
	 *
	 * @callback OCA.Files.FileActions~iconClassFunction
	 * @param {String} fileName name of the file on which the action must be performed
	 * @param {OCA.Files.FileActionContext} context action context
	 * @return {String} icon class
	 */

	/**
	 * Action handler function for file actions
	 *
	 * @callback OCA.Files.FileActions~actionHandler
	 * @param {String} fileName name of the file on which the action must be performed
	 * @param context context
	 * @param {String} context.dir directory of the file
	 * @param {OCA.Files.FileInfoModel} fileInfoModel file info model
	 * @param {Object} [context.$file] jQuery element of the file [DEPRECATED]
	 * @param {OCA.Files.FileList} [context.fileList] the FileList instance on which the action occurred [DEPRECATED]
	 * @param {OCA.Files.FileActions} context.fileActions the FileActions instance on which the action occurred
	 */

	// global file actions to be used by all lists
	OCA.Files.fileActions = new OCA.Files.FileActions();
})();
