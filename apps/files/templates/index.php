<style>
	.peertime-progress-pie-chart {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background-color: #e5e5e5;
		position: relative;
	}
	.peertime-progress-pie-chart.peertime-gt-50 {
		background-color: #81ce97;
	}

	.peertime-ppc-progress {
		content: "";
		position: absolute;
		border-radius: 50%;
		left: calc(50% - 100px);
		top: calc(50% - 100px);
		width: 200px;
		height: 200px;
		clip: rect(0, 200px, 200px, 100px);
	}
	.peertime-ppc-progress .peertime-ppc-progress-fill {
		content: "";
		position: absolute;
		border-radius: 50%;
		left: calc(50% - 100px);
		top: calc(50% - 100px);
		width: 200px;
		height: 200px;
		clip: rect(0, 100px, 200px, 0);
		background: #81ce97;
		transform: rotate(60deg);
	}
	.peertime-gt-50 .peertime-ppc-progress {
		clip: rect(0, 100px, 200px, 0);
	}
	.peertime-gt-50 .peertime-ppc-progress .peertime-ppc-progress-fill {
		clip: rect(0, 200px, 200px, 100px);
		background: #e5e5e5;
	}

	.peertime-ppc-percents {
		content: "";
		position: absolute;
		border-radius: 50%;
		left: calc(50% - 173.9130434783px / 2);
		top: calc(50% - 173.9130434783px / 2);
		width: 173.9130434783px;
		height: 173.9130434783px;
		background: #fff;
		text-align: center;
		display: table;
	}
	.peertime-ppc-percents span {
		display: block;
		font-size: 2.6em;
		font-weight: bold;
		color: #81ce97;
	}

	.peertime-pcc-percents-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.peertime-progress-pie-chart {
		margin: 50px auto 0;
	}
    .without-after.bubble:after {
        display: none;
    }

</style>
<div id="peertime-progress">
    <div class="peertime-progress-pie-chart" data-percent="0" style="display:none;z-index: 9999;position: absolute;margin: auto;left: 50%;top: 50%;transform: translate(-50%,-50%)">
        <div class="peertime-ppc-progress">
            <div class="peertime-ppc-progress-fill"></div>
        </div>
        <div class="peertime-ppc-percents">
            <div class="peertime-pcc-percents-wrapper">
                <span>%</span>
            </div>
        </div>
    </div>
</div>

<dialog id="peertime_iframe_dialog">
	<div class="oc-dialog" id="peertime_iframe_modal" tabindex="-1" role="dialog" style="display:none; position: fixed; width: 1200px; height: 720px;overflow: hidden">
		<button class="oc-dialog-close" id="peertime_iframe__close"></button>
		<iframe id="peertime_ifram_id" src="" style="margin-top:50px; width: 100%; height: calc(100% - 50px)"></iframe>
	</div>
</dialog>


<?php /** @var \OCP\IL10N $l */ ?>

<dialog id="livesync_dialog">
    <div class="oc-dialog" id="livesync_modal" tabindex="-1" role="dialog" style="display: none; position: fixed; width: auto; height: auto;">
        <h2 class="oc-dialog-title"><?php p($l->t('LiveSync'))?></h2>
        <button class="oc-dialog-close" id="livesync_close"></button>
        <span><?php p($l->t('Title'))?></span>
        <br>
        <input type="text" id="livesync_name" value="" style="width: 100%">
        <br>
        <div style="display: flex;align-items: center">
            <input type="checkbox" id="livesync_startMeetingNow" checked="checked">
            <span><?php p($l->t('Start LiveSync Meeting Now'))?></span>
        </div>
        <div class="oc-dialog-buttonrow twobuttons">
            <button id="livesync_no"><?php p($l->t('No'))?></button>
            <button id="livesync_yes" class="primary"><?php p($l->t('Yes'))?></button>
        </div>
    </div>
</dialog>


<div id="sync_menu" class="fileActionsMenu popovermenu without-after bubble open menu" style="display:none; z-index:1999;position: fixed;">
    <ul id="sync_menu_ul">
    </ul>
</div>


<?php $_['appNavigation']->printPage(); ?>

<!-- New files vue container -->
<div id="app-content-vue" class="hidden"></div>

<div id="app-content" tabindex="0">

	<input type="checkbox" class="hidden-visually" id="showgridview"
		aria-label="<?php p($l->t('Toggle grid view'))?>"
		<?php if ($_['showgridview']) { ?>checked="checked" <?php } ?>/>
	<label id="view-toggle" for="showgridview" tabindex="0" class="button <?php p($_['showgridview'] ? 'icon-toggle-filelist' : 'icon-toggle-pictures') ?>"
		title="<?php p($_['showgridview'] ? $l->t('Show list view') : $l->t('Show grid view'))?>"></label>


	<!-- Legacy views -->
	<?php foreach ($_['appContents'] as $content) { ?>
	<div id="app-content-<?php p($content['id']) ?>" class="hidden viewcontainer">
	<?php print_unescaped($content['content']) ?>
	</div>
	<?php } ?>
	<div id="searchresults" class="hidden"></div>
</div><!-- closing app-content -->

<!-- config hints for javascript -->
<input type="hidden" name="filesApp" id="filesApp" value="1" />
<input type="hidden" name="usedSpacePercent" id="usedSpacePercent" value="<?php p($_['usedSpacePercent']); ?>" />
<input type="hidden" name="owner" id="owner" value="<?php p($_['owner']); ?>" />
<input type="hidden" name="ownerDisplayName" id="ownerDisplayName" value="<?php p($_['ownerDisplayName']); ?>" />
<input type="hidden" name="fileNotFound" id="fileNotFound" value="<?php p($_['fileNotFound']); ?>" />
<?php if (!$_['isPublic']) :?>
<input type="hidden" name="allowShareWithLink" id="allowShareWithLink" value="<?php p($_['allowShareWithLink']) ?>" />
<input type="hidden" name="defaultFileSorting" id="defaultFileSorting" value="<?php p($_['defaultFileSorting']) ?>" />
<input type="hidden" name="defaultFileSortingDirection" id="defaultFileSortingDirection" value="<?php p($_['defaultFileSortingDirection']) ?>" />
<input type="hidden" name="showHiddenFiles" id="showHiddenFiles" value="<?php p($_['showHiddenFiles']); ?>" />
<input type="hidden" name="cropImagePreviews" id="cropImagePreviews" value="<?php p($_['cropImagePreviews']); ?>" />
<?php endif;

foreach ($_['hiddenFields'] as $name => $value) {?>
<input type="hidden" name="<?php p($name) ?>" id="<?php p($name) ?>" value="<?php p($value) ?>" />
<?php }
