<?php

namespace OCA\KloudIntegration\Controller;

use OCA\KloudIntegration\AppInfo\Application;
use OCP\AppFramework\Http;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use Sabre\VObject\UUIDUtil;

class KloudController extends Controller
{
    public function __construct(string $appName, IRequest $request)
    {
        parent::__construct($appName, $request);
    }

    /**
     * @NoCSRFRequired
     *
     * @return DataResponse
     */
    public function enabled() {
        $checked = isset($_POST['checked']) ? $_POST['checked'] : false;
        \OC::$server->getConfig()->setAppValue('integration_kloud', 'checked', $checked);
        return new DataResponse('checked:' . $checked, Http::STATUS_OK);
    }

    /**
     * @NoCSRFRequired
     *
     * @return DataResponse
     */
    public function regenerate() {
        $uuid = UUIDUtil::getUUID();
        \OC::$server->getConfig()->setAppValue('integration_kloud', 'appkey', $uuid);
        return new DataResponse((((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . '/apps/integration_kloud/auth?appKey=' . $uuid, Http::STATUS_OK);
    }

    /**
     * @NoCSRFRequired
     * @PublicPage
     * @return DataResponse
     */
    public function auth() {
        $appkey = $_GET['appKey'];
        if($appkey == \OC::$server->getConfig()->getAppValue(Application::APP_ID, 'appkey', '')) {
            $this->JsonReturn(true, ['BaseUrl' => '', 'DevTrackApi' => null, 'DevSpecApi' => null]);
        } else {
            $this->JsonReturn(false, '');
        }
    }

    /**
     * @NoCSRFRequired
     * @PublicPage
     * @return DataResponse
     */
    public function save() {
        $json = file_get_contents('php://input');
        $json = json_decode($json, true);
        if (!$json) {
            $this->JsonReturn(false, 'Empty data');
        }
        $appkey = $json['AppKey'];
        if($appkey != \OC::$server->getConfig()->getAppValue(Application::APP_ID, 'appkey', '')) {
            $this->JsonReturn(false, 'Invalid AppKey');
        }
        $SubSystemId = $json['SubSystemId'];
        if (!isset($json['KloudServer'])) {
            $this->JsonReturn(false, 'Missing parameter KloudServer');
        }
        $SubDomain_KloudWeb = $json['KloudServer']['SubDomain_KloudWeb'];
        $SubDomain_PeertimeApi = $json['KloudServer']['SubDomain_PeertimeApi'];
        $SubDomain_MeetingApi = $json['KloudServer']['SubDomain_MeetingApi'];
        if (!$SubSystemId) {
            $this->JsonReturn(false, 'Missing parameter SubSystemId');
        }
        if (!$SubDomain_KloudWeb) {
            $this->JsonReturn(false, 'Missing parameter SubDomain_KloudWeb');
        }
        if (!$SubDomain_PeertimeApi) {
            $this->JsonReturn(false, 'Missing parameter SubDomain_PeertimeApi');
        }
        if (!$SubDomain_MeetingApi) {
            $this->JsonReturn(false, 'Missing parameter SubDomain_MeetingApi');
        }
        \OC::$server->getConfig()->setAppValue('integration_kloud', 'subsystemid', $SubSystemId);
        \OC::$server->getConfig()->setAppValue('integration_kloud', 'subdomain_kloudweb', $SubDomain_KloudWeb);
        \OC::$server->getConfig()->setAppValue('integration_kloud', 'subdomain_peertimeapi', $SubDomain_PeertimeApi);
        \OC::$server->getConfig()->setAppValue('integration_kloud', 'subdomain_meetingapi', $SubDomain_MeetingApi);
        $this->JsonReturn(true, '');
    }


    private function JsonReturn($success, $data){
        header('Content-Type: application/json');
        echo json_encode(['Success' => $success, 'Data' => $data]);
        exit;
    }
}
