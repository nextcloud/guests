<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
# Changelog

All notable changes to this project will be documented in this file.

## 4.5.1
### Changes
* feat: add better description in settings by @skjnldsv in https://github.com/nextcloud/guests/pull/1390

### Fixes
* fix(l10n): User numbered placeholders by @solracsf in https://github.com/nextcloud/guests/pull/1392
* fix(DirMask): Allow creating path by @provokateurin in https://github.com/nextcloud/guests/pull/1400
* fix: Load scripts if a user is logged in and is allowed invite guests by @leftybournes in https://github.com/nextcloud/guests/pull/1402

### New Contributors
* @provokateurin made their first contribution in https://github.com/nextcloud/guests/pull/1400

### Other
* build: update node and npm engines versions by @nextcloud-command in https://github.com/nextcloud/guests/pull/1388
* Chore(deps-dev): Bump sha.js from 2.4.11 to 2.4.12 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1387
* Chore(deps): Bump @nextcloud/sharing from 0.2.4 to 0.2.5 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1394
* Chore(deps-dev): Bump @nextcloud/vite-config from 1.5.6 to 1.6.0 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1397
* Chore(deps): Bump @nextcloud/l10n from 3.3.0 to 3.4.0 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1398
* Chore(deps): Bump @nextcloud/vue from 8.27.0 to 8.29.2 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1393
* Chore(deps-dev): Bump vite from 5.4.19 to 7.1.3 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1395
* Chore(deps): Bump esbuild and vite by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1399

## 4.5.0
### Changes
* feat: provide the guest form to allow guest creation anywhere by @leftybournes in https://github.com/nextcloud/guests/pull/1371
* feat: add setting to allow guests to change their email by @icewind1991 in https://github.com/nextcloud/guests/pull/1379
* feat: add guests through the contacts menu by @leftybournes in https://github.com/nextcloud/guests/pull/1380

### Fixes
* fix: incompatible overwrite for AppConfig by @miaulalala in https://github.com/nextcloud/guests/pull/1384

### New Contributors
* @leftybournes made their first contribution in https://github.com/nextcloud/guests/pull/1371
* @miaulalala made their first contribution in https://github.com/nextcloud/guests/pull/1384

## 4.4.1
### Fixes
* fix: ensure repair email is a string by @skjnldsv in https://github.com/nextcloud/guests/pull/1374
* fix: accept INavigationManager instead of NavigationManager in Filter… by @pulsarf0x in https://github.com/nextcloud/guests/pull/1357

### Other
* chore: update workflows from templates by @skjnldsv in https://github.com/nextcloud/guests/pull/1376
* chore(ci): add `update-nextcloud-ocp-matrix` workflow by @skjnldsv in https://github.com/nextcloud/guests/pull/1377
* chore: update composer to fix psalm by @skjnldsv in https://github.com/nextcloud/guests/pull/1375

## 4.4.0
### Changes
* feat: add repair step to ensure guests haven't changed their email by @icewind1991 in https://github.com/nextcloud/guests/pull/1370

### Fixes
* fix: check if we have a user session before setting-up restrictions by @skjnldsv in https://github.com/nextcloud/guests/pull/1364
* fix: prevent guests from changing their email address by @icewind1991 in https://github.com/nextcloud/guests/pull/1369
* fix: remove constructor overwrite from AppConfigOverwrite by @icewind1991 in https://github.com/nextcloud/guests/pull/1367

### Other
* Chore(deps): Bump form-data from 4.0.2 to 4.0.4 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1360
* Chore(deps): Bump linkifyjs from 4.2.0 to 4.3.2 by @dependabot[bot] in https://github.com/nextcloud/guests/pull/1365

## 4.3.0
### Changes
* feat: Add share count including circles by @Pytal in https://github.com/nextcloud/guests/pull/1287
* feat: allow limiting guests creation to specific groups by @skjnldsv in https://github.com/nextcloud/guests/pull/1330

### Fixes
* fix: fix DirMask path check by @icewind1991 in https://github.com/nextcloud/guests/pull/1311
* fix: Set guest quota to '0 B' when migrating form OC by @artonge in https://github.com/nextcloud/guests/pull/1310
* fix(settings): ellipsis long table cells by @skjnldsv in https://github.com/nextcloud/guests/pull/1321

### Other
* Chore(deps): Bump @babel/runtime from 7.26.9 to 7.27.0
* Chore(deps): Bump @nextcloud/dialogs from 6.1.1 to 6.3.1
* Chore(deps): Bump @nextcloud/event-bus from 3.3.1 to 3.3.2
* Chore(deps): Bump @nextcloud/vue from 8.23.1 to 8.27.0
* Chore(deps): Bump axios from 1.7.9 to 1.8.3
* Various dependencies

**Full Changelog**: https://github.com/nextcloud/guests/compare/v4.2.0...v4.3.0

## 4.2.0

### Changes
* feat: migrate owncloud guests-users to nextcloud guests by @skjnldsv in https://github.com/nextcloud/guests/pull/1286
* feat(deps): Add Nextcloud 32 support by @nickvergessen in https://github.com/nextcloud/guests/pull/1282

### Fixes
* fix: settings save by @skjnldsv in https://github.com/nextcloud/guests/pull/1299

### Other
* Various dependencies

**Full Changelog**: https://github.com/nextcloud/guests/compare/v4.1.0...v4.2.0

## 4.1.0
31 compatibility

### Fixes
* Add missing div id (fixes CSS lack) by @Jerome-Herbinet in https://github.com/nextcloud/guests/pull/1227
* fix: Fix navigation manager to be in line with server by @nickvergessen in https://github.com/nextcloud/guests/pull/1248
* fix(notifications): Notifier::prepare() threw \InvalidArgumentExcepti… by @nickvergessen in https://github.com/nextcloud/guests/pull/1272
* Replace "transfer" notion with "convert" notion by @Jerome-Herbinet in https://github.com/nextcloud/guests/pull/1228

### Changes
* 4.1.0 by @icewind1991 in https://github.com/nextcloud/guests/pull/1280
* feat: always allow twofactor apps by @st3iny in https://github.com/nextcloud/guests/pull/1278
* feat(deps): Add Nextcloud 31 support by @nickvergessen in https://github.com/nextcloud/guests/pull/1219
* refactor: Migrate from deprecated `ILogger` interface to PSR-3 logger by @susnux in https://github.com/nextcloud/guests/pull/1229

### Dependencies
* Chore(deps-dev): Bump @nextcloud/vite-config from 1.3.0 to 1.4.2 by @dependabot
* Chore(deps-dev): Bump elliptic from 6.5.5 to 6.6.0 by @dependabot
* Chore(deps-dev): Bump vite from 5.3.4 to 5.4.10 by @dependabot
* Chore(deps): Bump @nextcloud/dialogs from 5.3.5 to 6.0.0 by @dependabot
* Chore(deps): Bump @nextcloud/sharing from 0.2.2 to 0.2.3 by @dependabot
* Chore(deps): Bump @nextcloud/vue from 8.14.0 to 8.17.1 by @dependabot
* Chore(deps): Bump axios from 1.7.2 to 1.7.4 by @dependabot
* Chore(deps): Bump fast-xml-parser from 4.4.0 to 4.4.1 by @dependabot
* Chore(deps): Bump vue-material-design-icons from 5.3.0 to 5.3.1 by @dependabot

### New Contributors
* @Jerome-Herbinet made their first contribution in https://github.com/nextcloud/guests/pull/1227
* @susnux made their first contribution in https://github.com/nextcloud/guests/pull/1229
* @AndyScherzinger made their first contribution in https://github.com/nextcloud/guests/pull/1270
* @st3iny made their first contribution in https://github.com/nextcloud/guests/pull/1278

**Full Changelog**: https://github.com/nextcloud/guests/compare/v4.0.0...v4.1.0

## 4.0.1
### Dependencies
* Chore(deps-dev): Bump vite from 5.3.4 to 5.3.5 by @dependabot in https://github.com/nextcloud/guests/pull/1208
* Chore(deps): Bump @nextcloud/vue from 8.14.0 to 8.15.0 by @dependabot in https://github.com/nextcloud/guests/pull/1209
* Chore(deps): Bump @nextcloud/sharing from 0.2.2 to 0.2.3 by @dependabot in https://github.com/nextcloud/guests/pull/1211
* Chore(deps): Bump @nextcloud/vue from 8.15.0 to 8.15.1 by @dependabot in https://github.com/nextcloud/guests/pull/1214
* Chore(deps): Bump @nextcloud/vue from 8.15.1 to 8.16.0 by @dependabot in https://github.com/nextcloud/guests/pull/1216

**Full Changelog**: https://github.com/nextcloud/guests/compare/v4.0.0...v4.0.1


## 3.2.0
### Fixes
* Fix tests by @solracsf in https://github.com/nextcloud/guests/pull/1170
* fix(GuestForm): allow to create a guest without name more than once by @ShGKme in https://github.com/nextcloud/guests/pull/1178
* fix(Sharing): Do not create new share in guest app  by @Fenn-CS in https://github.com/nextcloud/guests/pull/1189

### Changes
* Add 'direct' GET param to invite email 'view share' link by @julien-nc in https://github.com/nextcloud/guests/pull/1151
* Add info about guest seeing each others by @artonge in https://github.com/nextcloud/guests/pull/1144
* feat: Upgrade dependencies and migrate to nc/vue v8 by @Pytal in https://github.com/nextcloud/guests/pull/1169
* feat(deps): Add Nextcloud 30 support by @nickvergessen in https://github.com/nextcloud/guests/pull/1145
* docs(README): Overhaul the Guests app README by @joshtrichards in https://github.com/nextcloud/guests/pull/1132

### Dependencies
* chore: add changelog for 2.4.0 .. 3.0.1 by @ShGKme in https://github.com/nextcloud/guests/pull/1181
* chore: Move to vite by @Pytal in https://github.com/nextcloud/guests/pull/1172
* Chore(deps): Bump @nextcloud/dialogs from 5.3.2 to 5.3.3 by @dependabot in https://github.com/nextcloud/guests/pull/1187
* Chore(deps): Bump @nextcloud/dialogs from 5.3.3 to 5.3.4 by @dependabot in https://github.com/nextcloud/guests/pull/1196
* Chore(deps): Bump @nextcloud/dialogs from 5.3.4 to 5.3.5 by @dependabot in https://github.com/nextcloud/guests/pull/1201
* Chore(deps): Bump @nextcloud/sharing from 0.1.0 to 0.2.2 by @dependabot in https://github.com/nextcloud/guests/pull/1186
* Chore(deps): Bump @nextcloud/vue from 8.12.0 to 8.13.0 by @dependabot in https://github.com/nextcloud/guests/pull/1198
* Chore(deps): Bump @nextcloud/vue from 8.13.0 to 8.14.0 by @dependabot in https://github.com/nextcloud/guests/pull/1200
* Chore(deps): Bump follow-redirects from 1.15.4 to 1.15.6 by @dependabot in https://github.com/nextcloud/guests/pull/1136
* Chore(deps): Bump vue-material-design-icons from 5.2.0 to 5.3.0 by @dependabot in https://github.com/nextcloud/guests/pull/1140

### New Contributors
* @artonge made their first contribution in https://github.com/nextcloud/guests/pull/1144
* @solracsf made their first contribution in https://github.com/nextcloud/guests/pull/1170

**Full Changelog**: https://github.com/nextcloud/guests/compare/v3.1.0...v3.2.1


## 3.1.0
## What's Changed
* 29 compatibility
* fix: ListCommand: update for Symfony >=5 exit status by @joshtrichards in https://github.com/nextcloud/guests/pull/1102
* fix: reuse share object instead of getting it again when sending invite mail by @icewind1991 in https://github.com/nextcloud/guests/pull/1122
* fix(config): Fix constructor of config class by @nickvergessen in https://github.com/nextcloud/guests/pull/1100
* fix(DI): Fix DI for AppConfig by @nickvergessen in https://github.com/nextcloud/guests/pull/1127
* fix(npm): audit
* fix(whitelist): Block Talk base page as well by @nickvergessen in https://github.com/nextcloud/guests/pull/1107

## New Contributors
* @joshtrichards made their first contribution in https://github.com/nextcloud/guests/pull/1102

**Full Changelog**: https://github.com/nextcloud/guests/compare/v3.0.1...v3.1.0


## 3.0.1
### What's Changed
* 3.0.1 by @icewind1991 in https://github.com/nextcloud/guests/pull/1082

**Full Changelog**: https://github.com/nextcloud/guests/compare/v3.0.0...v3.0.1


## 3.0.0
### What's Changed
* feat(deps): Add Nextcloud 28 support by @nickvergessen in https://github.com/nextcloud/guests/pull/1026
* Fix event dispatcher usage by @nickvergessen in https://github.com/nextcloud/guests/pull/1045
* Include shareType in share select option data by @Fenn-CS in https://github.com/nextcloud/guests/pull/1058/pull/1067
* add website and documentation links by @alexanderdd in https://github.com/nextcloud/guests/pull/1071

### New Contributors
* @Fenn-CS made their first contribution in https://github.com/nextcloud/guests/pull/1058
* @alexanderdd made their first contribution in https://github.com/nextcloud/guests/pull/1071

**Full Changelog**: https://github.com/nextcloud/guests/compare/v2.5.0...v3.0.0

### 2.5.2

### Fixes

- Allow creating a guest without a name more than once @ShGKme [#1178](https://github.com/nextcloud/guests/pull/1178)

### 2.5.1

- use decoded path to check app whitelist @icewind1991 [#1085](https://github.com/nextcloud/guests/pull/1085)
- fix permissions for whitelist reset @icewind1991 [#1085](https://github.com/nextcloud/guests/pull/1085)

### 2.5.0

### Added

- Compatible with Nextcloud 27

## 2.4.1

### Fixed

- Url decode 2.4 @icewind1991 [#1086](https://github.com/nextcloud/guests/pull/1086)

### 2.4.0

### Fixed

- Fix allowlist button handler @PVince81 [#946](https://github.com/nextcloud/guests/pull/946)
- register user backends in `boot` instead of `register` @icewind1991 [#993](https://github.com/nextcloud/guests/pull/993)
- lowercase email for encrypting password token @icewind1991 [#986](https://github.com/nextcloud/guests/pull/986)
- fix migrate guest user being triggered on mixed case email @icewind1991 [#1007](https://github.com/nextcloud/guests/pull/1007)

## 2.3.0
### Added

- Compatibility with Nextcloud 25
- Bump workflows + 24 release  @skjnldsv [#880](https://github.com/nextcloud/guests/pull/880)
- Add talk integration @nickvergessen [#892](https://github.com/nextcloud/guests/pull/892)
- Update to new vue component @CarlSchwan [#924](https://github.com/nextcloud/guests/pull/924)
- Add capabilities @SystemKeeper [#901](https://github.com/nextcloud/guests/pull/901)

### Fixed

- Limit settings to whitelisted apps @juliushaertl [#912](https://github.com/nextcloud/guests/pull/912)
- l10n: Correct typos @Valdnet [#930](https://github.com/nextcloud/guests/pull/930)

### Other

- Update version on master @nickvergessen [#883](https://github.com/nextcloud/guests/pull/883)
- Update screenshots @skjnldsv [#881](https://github.com/nextcloud/guests/pull/881)
- Add psalm @PVince81 [#514](https://github.com/nextcloud/guests/pull/514)

## 2.2.0 - 2022-04-08

### Fixed

- #879 Configs update before 23+24 release @skjnldsv

### Enhancements

- 23 compatibility

## 2.1.0 - 2021-11-10

### Enhancements

- 23 compatibility

## 2.0.2 - 2021-08-24

### Fixed

- #724 Force-load theme at the right moment @PVince81

### Dependencies

- #720 Bump webpack from 5.50.0 to 5.51.1 @dependabot[bot]
- #721 Bump webpack-cli from 4.7.2 to 4.8.0 @dependabot[bot]
- #722 Bump eslint-plugin-import from 2.24.0 to 2.24.1 @dependabot[bot]
- #723 Bump sass from 1.37.5 to 1.38.0 @dependabot[bot]


## 2.0.1 - 2021-08-18

* [#649](https://github.com/nextcloud/guests/pull/649) Compare mask root with storage permissions @juliushaertl
* [#676](https://github.com/nextcloud/guests/pull/676) Don't ask the database for user ids which are not emails @nickvergessen
* [#677](https://github.com/nextcloud/guests/pull/677) Fix non guests bring blocked @nickvergessen
* [#682](https://github.com/nextcloud/guests/pull/682) Add option to delete old guest accounts during auto-conversion @CarlSchwan
* [#594](https://github.com/nextcloud/guests/pull/594) L10n: Unify spelling @Valdnet
* [#702](https://github.com/nextcloud/guests/pull/702) Move to IBootstrap @PVince81
* Dependency updates


## 2.0.0 - 2021-04-12

## Merged PRs:

* [#531](https://github.com/nextcloud/guests/pull/531) Doctrine/dbal update @nickvergessen
* [#532](https://github.com/nextcloud/guests/pull/532) Add occ commands docs to README @PVince81
* [#543](https://github.com/nextcloud/guests/pull/543) Update supported server version to 22 @PVince81
* [#549](https://github.com/nextcloud/guests/pull/549) Fix inconsistent persistence of guest user properties @mhoffrog
* [#554](https://github.com/nextcloud/guests/pull/554) Avoid guest creation modal if a user is suggested in the share search @eneiluj
* [#562](https://github.com/nextcloud/guests/pull/562) Add the zip extentions to the php containers @rullzer
* [#594](https://github.com/nextcloud/guests/pull/594) L10n: Unify spelling @Valdnet
* [#589](https://github.com/nextcloud/guests/pull/589) L10n: Correct spelling @Valdnet
* Dependency updates


## 1.6.2 - 2020-12-21

* [#479](https://github.com/nextcloud/guests/pull/479) Allow the app to run with NC 21 @PVince81
* [#484](https://github.com/nextcloud/guests/pull/484) Do not fetch user in setup @rullzer
* [#489](https://github.com/nextcloud/guests/pull/489) Fix oracle support @juliushaertl
* [#501](https://github.com/nextcloud/guests/pull/501) Some hardening to assure we don't error @rullzer
* [#510](https://github.com/nextcloud/guests/pull/510) New occ command to create guest users @PVince81
* Bump dependencies

