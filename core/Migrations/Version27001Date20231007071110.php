<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2023 Your name <your@email.com>
 *
 * @author Your name <your@email.com>
 *
 * @license GNU AGPL version 3 or any later version
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

namespace OC\Core\Migrations;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\IDBConnection;
use Sabre\VObject\UUIDUtil;
/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version27001Date20231007071110 extends SimpleMigrationStep {
    protected $connection;

    public function __construct(IDBConnection $connection) {
        $this->connection = $connection;
    }

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
        if (!$this->connection->tableExists('appconfig')) {
            return;
        }

        $insert = $this->connection->getQueryBuilder();
        $insert->insert('appconfig')
            ->setValue('appid', $insert->createParameter('appid'))
            ->setValue('configkey', $insert->createParameter('configkey'))
            ->setValue('configvalue', $insert->createParameter('configvalue'));

        $data = [];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'enabled', 'configvalue' => 'yes'];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'installed_version', 'configvalue' => '0.0.1'];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'appkey', 'configvalue' => UUIDUtil::getUUID()];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'checked', 'configvalue' => 'true'];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'subdomain_kloudweb', 'configvalue' => ''];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'subdomain_meetingapi', 'configvalue' => ''];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'subdomain_peertimeapi', 'configvalue' => ''];
        $data[] = ['appid' => 'integration_kloud', 'configkey' => 'subsystemid', 'configvalue' => ''];

        foreach ($data as $key => $value) {
            $insert->setParameter('appid', (string) $value['appid'])
                ->setParameter('configkey', (string) $value['configkey'])
                ->setParameter('configvalue', (string) $value['configvalue']);
            $insert->execute();
        }
    }
}