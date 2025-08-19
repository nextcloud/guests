<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OC\Cache {
	use OCP\ICache;

	/**
	 * @template T
	 * @deprecated use OCP\Cache\CappedMemoryCache instead
	 */
	class CappedMemoryCache implements ICache, \ArrayAccess {
		public function __construct($capacity = 512) {
		}

		public function hasKey($key): bool {
		}

		/**
		 * @return ?T
		 */
		public function get($key) {
		}

		/**
		 * @param string $key
		 * @param T $value
		 * @param int $ttl
		 * @return bool
		 */
		public function set($key, $value, $ttl = 0): bool {
		}

		public function remove($key) {
		}

		public function clear($prefix = '') {
		}

		public function offsetExists($offset): bool {
		}

		/**
		 * @return T
		 */
		#[\ReturnTypeWillChange]
		public function &offsetGet($offset) {
		}

		/**
		 * @param string $offset
		 * @param T $value
		 * @return void
		 */
		public function offsetSet($offset, $value): void {
		}
		public function offsetUnset($offset): void {
		}
		/** @return T[] */
		public function getData() {
		}
		public static function isAvailable(): bool {
		}
	}
}

namespace OC {
	class NavigationManager implements \OCP\INavigationManager {
		public function add($entry) {
		}

		/**
		 * Sets the current navigation entry of the currently running app
		 * @param string $appId id of the app entry to activate (from added $entry)
		 * @return void
		 * @since 6.0.0
		 */
		public function setActiveEntry($appId) {
		}

		/**
		 * Get the current navigation entry of the currently running app
		 * @return string
		 * @since 20.0.0
		 */
		public function getActiveEntry() {
		}

		public function clear($loadDefaultLinks = true) {
		}

		/**
		 * Get a list of navigation entries
		 *
		 * @param string $type type of the navigation entries
		 * @return array
		 * @since 14.0.0
		 */
		public function getAll(string $type = self::TYPE_APPS): array {
		}

		/**
		 * Set an unread counter for navigation entries
		 *
		 * @param string $id id of the navigation entry
		 * @param int $unreadCounter Number of unread entries (0 to hide the counter which is the default)
		 * @since 22.0.0
		 */
		public function setUnreadCounter(string $id, int $unreadCounter): void {
		}

		public function get(string $id): ?array {
		}

		public function getDefaultEntryIdForUser(?\OCP\IUser $user = null, bool $withFallbacks = true): string {
		}

		public function getDefaultEntryIds(bool $withFallbacks = true): array {
		}

		public function setDefaultEntryIds(array $ids): void {
		}
	}

	class AppConfig {
		public function __construct(
			protected \OCP\IDBConnection $connection,
			protected \Psr\Log\LoggerInterface $logger,
			protected \OCP\Security\ICrypto $crypto,
		) {
		}

		/**
		 * @deprecated - use getValue*()
		 */
		public function getValue($app, $key, $default = '') {
		}
	}
}

namespace OC\DB {
	class Connection {
	}
}

namespace {

	use OCP\IServerContainer;

	class OC {
		public static $CLI = false;
		/** @var IServerContainer */
		public static $server;
		public static $SERVERROOT = '';
	}

	class OC_App {
		/**
		 * @deprecated
		 */
		public static function loadApp(string $appName) {
		}
		public static function cleanAppId(string $appName): string {
		}
	}

	class OC_Template {
		public static function printErrorPage($error_msg, $hint = '', $statusCode = 500) {
		}
	}
}

namespace OC\AppFramework {
	class App {
		public static function getAppIdForClass(string $class): string {
		}
	}
}

namespace OC\Files\Node {
	use OCP\Files\FileInfo;

	abstract class Node implements \OCP\Files\Node {
		/** @return FileInfo|\ArrayAccess */
		public function getFileInfo() {
		}

		/** @return \OCP\Files\Mount\IMountPoint */
		public function getMountPoint() {
		}
	}
}

namespace OC\Hooks {
	class Emitter {
		public function emit(string $class, string $value, array $option) {
		}
		/** Closure $closure */
		public function listen(string $class, string $value, $closure) {
		}
	}
	class BasicEmitter extends Emitter {
	}
	class PublicEmitter extends Emitter {
	}
}

namespace OC\L10N {
	class Factory {
		public const COMMON_LANGUAGE_CODES = [''];
	}
}

namespace OC\Core\Command {
	use Symfony\Component\Console\Input\InputInterface;
	use Symfony\Component\Console\Output\OutputInterface;

	class Base {
		public const OUTPUT_FORMAT_PLAIN = 'plain';
		public const OUTPUT_FORMAT_JSON = 'json';
		public const OUTPUT_FORMAT_JSON_PRETTY = 'json_pretty';

		public function __construct() {
		}
		protected function configure() {
		}
		public function run(InputInterface $input, OutputInterface $output) {
		}
		public function setName(string $name) {
		}
		public function getHelper(string $name) {
		}
		protected function writeArrayInOutputFormat(InputInterface $input, OutputInterface $output, $items, $prefix = '  - ') {
		}
	}
}

namespace OC\Files\ObjectStore {
	class NoopScanner {
	}
}

namespace Symfony\Component\Console\Helper {
	use Symfony\Component\Console\Output\OutputInterface;

	class Table {
		public function __construct(OutputInterface $text) {
		}
		public function setHeaders(array $header) {
		}
		public function setRows(array $rows) {
		}
		public function render() {
		}
	}
}

namespace Symfony\Component\Console\Input {
	class InputInterface {
		public function getOption(string $key) {
		}
		public function getArgument(string $key) {
		}
		public function isInteractive(): bool {
		}
	}
	class InputArgument {
		public const REQUIRED = 0;
		public const OPTIONAL = 1;
		public const IS_ARRAY = 1;
	}
	class InputOption {
		public const VALUE_NONE = 1;
		public const VALUE_REQUIRED = 1;
		public const VALUE_OPTIONAL = 1;
	}
}

namespace Symfony\Component\Console\Helper {
	use Symfony\Component\Console\Input\InputInterface;
	use Symfony\Component\Console\Output\OutputInterface;
	use Symfony\Component\Console\Question\Question;

	class QuestionHelper {
		public function ask(InputInterface $input, OutputInterface $output, Question $question): bool {
		}
	}
}

namespace Symfony\Component\Console\Question {
	class ConfirmationQuestion {
		public function __construct(string $text, bool $default) {
		}
	}
}

namespace Symfony\Component\Console\Output {
	class OutputInterface {
		public const VERBOSITY_VERBOSE = 1;
		public function writeln(string $text, int $flat = 0) {
		}
	}
}

namespace OC\Files\Cache {
	use OCP\Files\Cache\ICache;
	use OCP\Files\Cache\ICacheEntry;
	use OCP\Files\IMimeTypeLoader;
	use OCP\Files\Search\ISearchOperator;
	use OCP\Files\Search\ISearchQuery;

	class Cache implements ICache {
		/**
		 * @param \OCP\Files\Cache\ICache $cache
		 */
		public function __construct($cache) {
			$this->cache = $cache;
		}
		public function getNumericStorageId() {
		}
		public function getIncomplete() {
		}
		public function getPathById($id) {
		}
		public function getAll() {
		}
		public function get($file) {
		}
		public function getFolderContents($folder) {
		}
		public function getFolderContentsById($fileId) {
		}
		public function put($file, array $data) {
		}
		public function insert($file, array $data) {
		}
		public function update($id, array $data) {
		}
		public function getId($file) {
		}
		public function getParentId($file) {
		}
		public function inCache($file) {
		}
		public function remove($file) {
		}
		public function move($source, $target) {
		}
		public function moveFromCache(ICache $sourceCache, $sourcePath, $targetPath) {
		}
		public function clear() {
		}
		public function getStatus($file) {
		}
		public function search($pattern) {
		}
		public function searchByMime($mimetype) {
		}
		public function searchQuery(ISearchQuery $query) {
		}
		public function correctFolderSize($path, $data = null, $isBackgroundScan = false) {
		}
		public function copyFromCache(ICache $sourceCache, ICacheEntry $sourceEntry, string $targetPath): int {
		}
		public function normalize($path) {
		}
		public function getQueryFilterForStorage(): ISearchOperator {
		}
		public function getCacheEntryFromSearchResult(ICacheEntry $rawEntry): ?ICacheEntry {
		}
		public static function cacheEntryFromData($data, IMimeTypeLoader $mimetypeLoader) {
		}
	}
}

namespace OC\Files\Cache\Wrapper {
	use OC\Files\Cache\Cache;

	class CacheWrapper extends Cache {
	}
	class CachePermissionsMask extends CacheWrapper {
		/**
		 * @param \OCP\Files\Cache\ICache $cache
		 * @param int $mask
		 */
		public function __construct($cache, $mask) {
		}

		protected function formatCacheEntry($entry) {
		}
	}
}

namespace OC\Files {
	use OCP\Files\Cache\ICacheEntry;

	class Filesystem {
		public static function addStorageWrapper(string $wrapperName, callable $wrapper, int $priority = 50) {
		}
	}

	class FileInfo implements \OCP\Files\FileInfo {
		/**
		 * @param string|boolean $path
		 * @param \OCP\Files\Storage\IStorage $storage
		 * @param string $internalPath
		 * @param array|ICacheEntry $data
		 * @param \OCP\Files\Mount\IMountPoint $mount
		 * @param \OCP\IUser|null $owner
		 */
		public function __construct($path, $storage, $internalPath, $data, $mount, $owner = null) {
		}
	}
	class View {
		public function __construct(string $path) {
		}
		public function unlink($path) {
		}
	}
}

namespace OC\User {
	use OCP\IUser;
	use OCP\UserInterface;
	use Symfony\Component\EventDispatcher\EventDispatcherInterface;

	class User implements IUser {
		public function __construct(string $uid, ?UserInterface $backend, EventDispatcherInterface $dispatcher, $emitter = null, ?IConfig $config = null, $urlGenerator = null) {
		}
	}
}

namespace OCA\DAV\Upload {

	use Sabre\DAV\File;

	abstract class FutureFile extends File {
	}
}

namespace OCA\DAV\Connector\Sabre {

	class Node {
		public function getFileInfo(): \OCP\Files\FileInfo {
		}
	}
}

namespace OC\Files\Mount {
	use OC\Files\Storage\Storage;
	use OCP\Files\Mount\IMountPoint;

	class MountPoint implements IMountPoint {
		/**
		 * @var \OC\Files\Storage\Storage $storage
		 */
		protected $storage = null;
		protected $class;
		protected $storageId;
		protected $rootId = null;

		/** @var int|null */
		protected $mountId;

		/**
		 * @param string|\OCP\Files\Storage\IStorage $storage
		 * @param string $mountpoint
		 * @param array $arguments (optional) configuration for the storage backend
		 * @param \OCP\Files\Storage\IStorageFactory $loader
		 * @param array $mountOptions mount specific options
		 * @param int|null $mountId
		 * @throws \Exception
		 */
		public function __construct($storage, $mountpoint, $arguments = null, $loader = null, $mountOptions = null, $mountId = null) {
			throw new \Exception('stub');
		}

		/**
		 * get complete path to the mount point, relative to data/
		 *
		 * @return string
		 */
		public function getMountPoint() {
			throw new \Exception('stub');
		}

		/**
		 * Sets the mount point path, relative to data/
		 *
		 * @param string $mountPoint new mount point
		 */
		public function setMountPoint($mountPoint) {
			throw new \Exception('stub');
		}

		/**
		 * @return \OCP\Files\Storage\IStorage
		 */
		public function getStorage() {
			throw new \Exception('stub');
		}

		/**
		 * @return string
		 */
		public function getStorageId() {
			throw new \Exception('stub');
		}

		/**
		 * @return int
		 */
		public function getNumericStorageId() {
			throw new \Exception('stub');
		}

		/**
		 * @param string $path
		 * @return string
		 */
		public function getInternalPath($path) {
			throw new \Exception('stub');
		}

		/**
		 * @param callable $wrapper
		 */
		public function wrapStorage($wrapper) {
			throw new \Exception('stub');
		}

		/**
		 * Get a mount option
		 *
		 * @param string $name Name of the mount option to get
		 * @param mixed $default Default value for the mount option
		 * @return mixed
		 */
		public function getOption($name, $default) {
			throw new \Exception('stub');
		}

		/**
		 * Get all options for the mount
		 *
		 * @return array
		 */
		public function getOptions() {
			throw new \Exception('stub');
		}

		/**
		 * @return int
		 */
		public function getStorageRootId() {
			throw new \Exception('stub');
		}

		public function getMountId() {
			throw new \Exception('stub');
		}

		public function getMountType() {
			throw new \Exception('stub');
		}
	}
}

namespace OC\Files\Storage\Wrapper{

	use OCP\Files\Cache\ICache;
	use OCP\Files\Cache\IPropagator;
	use OCP\Files\Cache\IScanner;
	use OCP\Files\Cache\IUpdater;
	use OCP\Files\Cache\IWatcher;
	use OCP\Files\Storage;
	use OCP\Files\Storage\IStorage;
	use OCP\Lock\ILockingProvider;

	class Wrapper implements IStorage {
		/**
		 * @var \OCP\Files\Storage\IStorage $storage
		 */
		protected $storage;

		/**
		 * @param array $parameters
		 */
		public function __construct($parameters) {
		}

		public function getWrapperStorage(): IStorage {
		}

		public function getId(): string {
		}

		public function mkdir($path): bool {
		}

		public function rmdir($path): bool {
		}

		public function opendir($path) {
		}

		public function is_dir($path): bool {
		}

		public function is_file($path): bool {
		}

		public function stat($path): array|false {
		}

		public function filetype($path): string|false {
		}

		public function filesize($path): int|float|false {
		}

		public function isCreatable($path): bool {
		}

		public function isReadable($path): bool {
		}

		public function isUpdatable($path): bool {
		}

		public function isDeletable($path): bool {
		}

		public function isSharable($path): bool {
		}

		public function getPermissions($path): int {
		}

		public function file_exists($path): bool {
		}

		public function filemtime($path): int|false {
		}

		public function file_get_contents($path): string|false {
		}

		public function file_put_contents($path, $data): int|float|false {
		}

		public function unlink($path): bool {
		}

		public function rename($source, $target): bool {
		}

		public function copy($source, $target): bool {
		}

		public function fopen($path, $mode) {
		}

		public function getMimeType($path): string|false {
		}

		public function hash($type, $path, $raw = false): string|false {
		}

		public function free_space($path): int|float|false {
		}

		public function touch($path, $mtime = null): bool {
		}

		public function getLocalFile($path): string|false {
		}

		public function hasUpdated($path, $time): bool {
		}

		public function getCache($path = '', $storage = null): ICache {
		}

		public function getScanner($path = '', $storage = null): IScanner {
		}

		public function getOwner($path): string|false {
		}

		public function getWatcher($path = '', $storage = null): IWatcher {
		}

		public function getPropagator($storage = null): IPropagator {
		}

		public function getUpdater($storage = null): IUpdater {
		}

		public function getStorageCache(): \OC\Files\Cache\Storage {
		}

		public function getETag($path): string|false {
		}

		public function test(): bool {
		}

		public function isLocal(): bool {
		}

		public function instanceOfStorage($class): bool {
		}

		/**
		 * @psalm-template T of IStorage
		 * @psalm-param class-string<T> $class
		 * @psalm-return T|null
		 */
		public function getInstanceOfStorage(string $class): ?IStorage {
		}

		/**
		 * Pass any methods custom to specific storage implementations to the wrapped storage
		 *
		 * @param string $method
		 * @param array $args
		 * @return mixed
		 */
		public function __call($method, $args) {
		}

		public function getDirectDownload($path): array|false {
		}

		public function getAvailability(): array {
		}

		public function setAvailability($isAvailable): void {
		}

		public function verifyPath($path, $fileName): void {
		}

		public function copyFromStorage(IStorage $sourceStorage, $sourceInternalPath, $targetInternalPath): bool {
		}

		public function moveFromStorage(IStorage $sourceStorage, $sourceInternalPath, $targetInternalPath): bool {
		}

		public function getMetaData($path): ?array {
		}

		public function acquireLock($path, $type, ILockingProvider $provider): void {
		}

		public function releaseLock($path, $type, ILockingProvider $provider): void {
		}

		public function changeLock($path, $type, ILockingProvider $provider): void {
		}

		public function needsPartFile(): bool {
		}

		public function writeStream(string $path, $stream, ?int $size = null): int {
		}

		public function getDirectoryContent($directory): \Traversable {
		}

		public function isWrapperOf(IStorage $storage): bool {
		}

		public function setOwner(?string $user): void {
		}
	}

	class Jail extends Wrapper {
		public function getUnjailedPath(string $path): string {
		}
	}

	class Quota extends Wrapper {
		public function getQuota() {
		}
	}

	class PermissionsMask extends Wrapper {
		public function getQuota() {
		}
	}
}

namespace OCA\Files\Exception {
	class TransferOwnershipException extends \Exception {
	}
}

namespace OCA\Files\Service {
	use OCP\IUser;

	class OwnershipTransferService {
		public function transfer(IUser $sourceUser,
			IUser $destinationUser,
			string $path,
			?OutputInterface $output = null,
			bool $move = false,
			bool $firstLogin = false,
			bool $transferIncomingShares = false): void {
		}
	}
}

namespace OCA\Files\Event {
	class LoadAdditionalScriptsEvent extends \OCP\EventDispatcher\Event {
	}
}

namespace OCA\Settings\Events {
	use OCP\EventDispatcher\Event;

	class BeforeTemplateRenderedEvent extends Event {
	}
}

namespace OCA\Files_External\Config {
	class ExternalMountPoint {
	}
}
