<?php
/** @var $l \OCP\IL10N */
/** @var $_ array */

use OCA\KloudIntegration\AppInfo\Application;

script(Application::APP_ID, 'admin_settings');
//style(Application::APP_ID, 'admin_settings');
?>

<div id="integration_kloud" class="section">
    <h2><?php p($l->t('Kloud integration')); ?></h2>

    <div><?php p($l->t('Allow access data from Kloud')); ?>
        <input id="checked" <?php p($_['checked']) ?> type="checkbox">
    </div>

    <div>
        <?php p($l->t('AccessKey')); ?>
    </div>
    <div>
        <?php p($l->t('Copy the key below and paste into')); ?>
    </div>
    <input type="text" id="accesskey" style="width: 70%" value="<?php p((((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . '/api/kloudIntegrations/auth?appKey=' . $_['appkey']) ?>"></input>
    <button id="copy""><?php p($l->t('Copy')); ?></button>
    <button id="regenerate"><?php p($l->t('Regenerate')); ?></button>

    <div><?php p($l->t('Status')); ?>:&nbsp;<?php p($_['connect']) ?></div>
</div>