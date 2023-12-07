<?php
namespace OCA\KloudIntegration\Controller;

use OCA\KloudIntegration\AppInfo\Application;
use OCP\Accounts\IAccountManager;
use OCP\AppFramework\Http;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\L10N\IFactory;
use Sabre\VObject\UUIDUtil;
use OCP\IUserManager;

class KloudController extends Controller
{
    private IUserSession $userSession;
    private IAccountManager $accountManager;
    private IFactory $l10nFactory;
	private IUserManager $userManager;
    public function __construct(string $appName, IRequest $request, IUserSession $userSession, IAccountManager $accountManager, IFactory $l10nFactory, IUserManager $userManager)
    {
        parent::__construct($appName, $request);
        $this->userSession = $userSession;
        $this->accountManager = $accountManager;
        $this->l10nFactory = $l10nFactory;
		$this->userManager = $userManager;
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

	/**
	 * @NoCSRFRequired
	 * @PublicPage
	 * @return DataResponse
	 */
	public function downloadFile()
	{
		if (!isset($_GET['file_id'])) {
			http_response_code(400);
			$this->JsonReturn(false, 'Missing parameter file_id');
		}
		if (!isset($_GET['uid'])) {
			http_response_code(400);
			$this->JsonReturn(false, 'Missing parameter uid');
		}
		if (!isset($_GET['token'])) {
			http_response_code(400);
			$this->JsonReturn(false, 'Missing parameter token');
		}

		$file_id = addslashes($_GET['file_id']);
		$uid = addslashes($_GET['uid']);
		$token = addslashes($_GET['token']);

		$qb = \OCP\Server::get(\OCP\IDBConnection::class)->getQueryBuilder();
		$result = $qb->select(['etag', 'path', 'name', 'size'])
			->from('filecache')
			->where($qb->expr()->eq('file_id', $qb->createNamedParameter($file_id)))
			->where($qb->expr()->eq('etag', $qb->createNamedParameter($token)))
			->executeQuery();
		if ($file_info = $result->fetch()) {
			$file_path = \OC::$server->getConfig()->getSystemValue('datadirectory', '') . DIRECTORY_SEPARATOR . $uid . DIRECTORY_SEPARATOR . $file_info['path'];
			if (!is_file($file_path)) {
				http_response_code(404);
				$this->JsonReturn(false, 'file not found');
			}
			$file_name = $file_info['name'];
			$file_size = $file_info['size'];

			header("Content-Type: application/octet-stream");
			header("Accept-Ranges: bytes");
			header("Accept-Length: " . $file_size);
			header("Content-Disposition: attachment; filename=" . $file_name);

            $read_buffer = 4096;
            $handle = fopen($file_path, 'rb');

            $sum_buffer = 0;

            while (!feof($handle) && $sum_buffer < $file_size) {
                echo fread($handle, $read_buffer);
                $sum_buffer += $read_buffer;
            }
            fclose($handle);
		} else {
			http_response_code(404);
			$this->JsonReturn(false, 'file not found');
		}
	}

	/**
	 * @NoCSRFRequired
	 * @PublicPage
	 * @return DataResponse
	 */
	public function test()
	{

//		$qb = \OCP\Server::get(\OCP\IDBConnection::class)->getQueryBuilder();
//		$result = $qb->select('configvalue')
//			->from('preferences')
//			->where($qb->expr()->eq('appid', $qb->createNamedParameter('files')))
//			->executeQuery();
//		$quota_sum = 0;
//		while ($row = $result->fetch()) {
//			$bytesQuota = \OC_Helper::computerFileSize($row['configvalue']);
//			$quota_sum += $bytesQuota;
//		}
////		$quota = \OC_Helper::humanFileSize($quota_sum);
//
//		$this->JsonReturn(true, $quota_sum);
	}

    /**
     * @NoCSRFRequired
     * @PublicPage
     * @return DataResponse
     */
    public function sendToKloudMeeting()
    {

        $user = $this->userSession->getUser();
		if (!$user) {
            return new DataResponse(['message' => $this->l10nFactory->get('files')->t('Access Forbidden')], Http::STATUS_FORBIDDEN);
		}
        $account = $this->accountManager->getAccount($user);
		$userId = $user->getUID();
        $phone = $account->getProperty(IAccountManager::PROPERTY_PHONE)->getValue();
		if (!$phone) {
            return new DataResponse(['message' => $this->l10nFactory->get('files')->t('Mobile phone number is required')], Http::STATUS_PRECONDITION_FAILED);
		}
        return new DataResponse(['message' => $this->l10nFactory->get('files')->t('Sent to Kloud meeting')], Http::STATUS_OK);
        $file_id = $_POST['file_id'];
		exit;
    }

    /**
     * @NoCSRFRequired
     * @PublicPage
     * @return DataResponse
     */
    public function getPhone()
    {
        $user = $this->userSession->getUser();
        if (!$user) {
            return new DataResponse(['message' => $this->l10nFactory->get('files')->t('Access Forbidden')], Http::STATUS_UNAUTHORIZED);
        }
        $account = $this->accountManager->getAccount($user);
        $phone = $account->getProperty(IAccountManager::PROPERTY_PHONE)->getValue();
        if (!$phone) {
            return new DataResponse(['message' => $this->l10nFactory->get('files')->t('Mobile phone number is required')], Http::STATUS_PRECONDITION_FAILED);
        }
        return new DataResponse(['message' => $phone], Http::STATUS_OK);
    }

	/**
	 * @NoCSRFRequired
	 * @PublicPage
	 * @return DataResponse
	 */
	public function driveStatus()
	{
		$people_capacity = intval(\OC::$server->getConfig()->getSystemValue('people_capacity', 0));
		$userCount = array_reduce($this->userManager->countUsers(), function ($v, $w) {
			return $v + (int)$w;
		}, 0);
		if ($people_capacity == 0) {
			$people_capacity = '∞';
		}
		$quota_total_human = (\OC::$server->getConfig()->getSystemValue('storage_capacity', 0));
		$quota_total = \OC_Helper::computerFileSize($quota_total_human);
		$quota_used_human = 0;
		$quota_sum = 0;
		if ($quota_total) {
			$qb = \OCP\Server::get(\OCP\IDBConnection::class)->getQueryBuilder();
			$result = $qb->select('configvalue')
				->from('preferences')
				->where($qb->expr()->eq('appid', $qb->createNamedParameter('files')))
				->executeQuery();
			$quota_sum = 0;
			while ($row = $result->fetch()) {
				$bytesQuota = \OC_Helper::computerFileSize($row['configvalue']);
				$quota_sum += $bytesQuota;
			}
			$quota_used_human = \OC_Helper::humanFileSize($quota_sum);
		}
		return new DataResponse(['msg' => '', 'data' => ['capacity' => $people_capacity, 'user_count' => $userCount, 'quotaTotalHuman' => $quota_total_human, 'quotaTotal' => $quota_total, 'quotaUsed' => $quota_sum, 'quotaUsedHuman' => $quota_used_human], 'code' => 200]);
	}

    private function JsonReturn($success, $data){
        header('Content-Type: application/json');
        echo json_encode(['Success' => $success, 'Data' => $data]);
        exit;
    }
}
