# Changelog

All notable changes to this project will be documented in this file.

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
### What's Changed
* 29 compatibility
* fix: ListCommand: update for Symfony >=5 exit status by @joshtrichards in https://github.com/nextcloud/guests/pull/1102
* fix: reuse share object instead of getting it again when sending invite mail by @icewind1991 in https://github.com/nextcloud/guests/pull/1122
* fix(config): Fix constructor of config class by @nickvergessen in https://github.com/nextcloud/guests/pull/1100
* fix(DI): Fix DI for AppConfig by @nickvergessen in https://github.com/nextcloud/guests/pull/1127
* fix(npm): audit
* fix(whitelist): Block Talk base page as well by @nickvergessen in https://github.com/nextcloud/guests/pull/1107

### New Contributors
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

