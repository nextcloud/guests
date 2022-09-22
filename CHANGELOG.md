# Changelog

All notable changes to this project will be documented in this file.

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

