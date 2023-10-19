<?php
namespace OCA\KloudIntegration\Settings;

use OCA\KloudIntegration\AppInfo\Application;
use OCA\KloudIntegration\Sections\KloudAdmin;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\IL10N;
use OCP\Settings\ISettings;

class AdminSettings implements ISettings {
	private IL10N $l;
	private IConfig $config;

	public function __construct(IConfig $config, IL10N $l) {
		$this->config = $config;
		$this->l = $l;
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm() {
        return new TemplateResponse(Application::APP_ID, 'admin-settings', [
			'checked' => ($this->config->getAppValue(Application::APP_ID, 'checked', '') == 'true') ? 'checked' : '',
			'appkey' => $this->config->getAppValue(Application::APP_ID, 'appkey', ''),
			'connect' => strlen($this->config->getAppValue(Application::APP_ID, 'subdomain_kloudweb', '')) > 5 ? $this->l->t('Connected kloud.cn') : $this->l->t('Disconnected')
		], '');
	}

	public function getSection() {
		return KloudAdmin::SETTINGS_SECTION; // Name of the previously created section.
	}

	/**
	 * @return int whether the form should be rather on the top or bottom of
	 * the admin section. The forms are arranged in ascending order of the
	 * priority values. It is required to return a value between 0 and 100.
	 *
	 * E.g.: 70
	 */
	public function getPriority() {
		return 70;
	}
}
