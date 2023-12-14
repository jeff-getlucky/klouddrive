<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Poulou <pouloutidis.d@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\HassIntegration\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
	'routes' => [
		['name' => 'Kloud#enabled', 'url' => '/enabled', 'verb' => 'POST'],
		['name' => 'Kloud#regenerate', 'url' => '/regenerate', 'verb' => 'POST'],
		['name' => 'Kloud#auth', 'url' => '/auth', 'verb' => 'GET'],
		['name' => 'Kloud#save', 'url' => '/save', 'verb' => 'POST'],
		['name' => 'Kloud#sendToKloudMeeting', 'url' => '/sendToKloudMeeting', 'verb' => 'POST'],
		['name' => 'Kloud#getPhone', 'url' => '/getPhone', 'verb' => 'POST'],
		['name' => 'Kloud#downloadFile', 'url' => '/downloadFile', 'verb' => 'GET'],
		['name' => 'Kloud#driveStatus', 'url' => '/driveStatus', 'verb' => 'GET'],
		['name' => 'Kloud#opcacheReset', 'url' => '/opcacheReset', 'verb' => 'GET'],
	],
];
