<!--
  - SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-FileCopyrightText: 2015-2017 ownCloud GmbH
  - SPDX-License-Identifier: AGPL-3.0-only AND (AGPL-3.0-or-later OR AGPL-3.0-only)
-->
# 👥 Guests

[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud/guests)](https://api.reuse.software/info/github.com/nextcloud/guests)

The Nextcloud Guests app allows you to create users which can only see files shared with them and access a customizable set of apps.

![image](https://github.com/nextcloud/guests/assets/1731941/e1d1f71d-458f-48c1-a837-b3c9d6d03ac3)

Guests accounts can be created from the share menu by entering either the recipients email or name and choosing *Invite guest*. Once the
share is created the guest user will receive an email notification about the mail with a link to set their password.

Guests users can only access files shared to them and cannot create any files outside of shares. Additionally, the apps accessible to guest
accounts are whitelisted.

## Installation

The app is published in the [app store](https://apps.nextcloud.com/apps/guests). It can be [installed through Nextcloud's app management UI](https://docs.nextcloud.com/server/latest/admin_manual/apps_management.html#managing-apps).

## Development

Development is ongoing. A [CHANGELOG](https://github.com/nextcloud/guests/blob/master/CHANGELOG.md) covers the highlights. [New releases are also published](https://github.com/nextcloud-releases/guests/releases) on GitHub.

## Usage

Guests are be created via the Web UI or `occ guests` commands. The admin can also customize system-wide guest related behavior by going to *Administration settings->Guests* in the Web UI.

### Creating a guest

1. Create a guest user by typing their email address into the sharing dialog
2. Select *Invite guest* in the menu that appears.

The guest will receive an email invitation with a link to create an account. They only have access to files which are shared with them.

Optionally, when creating a guest the following values may also be specified:

* Set a display name for the guest user.
* Set a language for the invitation email (otherwise the server's [default language](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/config_sample_php_parameters.html#user-experience) will be used).

Admins/Group admins also may:

* specify the group(s) to put the guest user in (see [Guest specific behavior and configuration](https://github.com/nextcloud/guests/blob/master/README.md#guest-specific-behavior-and-configuration) for details).

![image](https://github.com/nextcloud/guests/assets/1731941/68edbd4f-fedc-45f0-8241-2e1cd12d04de)

> [!WARNING]
> While it is easy to create a new Guest, it's important to understand the default behavior and how guests interact with other features in Nextcloud. See [Guest specific behavior and configuration](https://github.com/nextcloud/guests/blob/master/README.md#guest-specific-behavior-and-configuration) for details.

### Deleting a guest

Guests may be deleted in the same way you would remove (or disable) regular user accounts. Guests are in the group *Guests*.

### `occ` commands

The command `occ guests:add` can be used to create guest users on the command-line.

```
php occ guests:add [--generate-password] [--password-from-env] [--display-name [DISPLAY-NAME]] [--language [LANGUAGE]] [--] <created-by> <email>
```

For example:

```bash
OC_PASS=somepassword php occ guests:add --password-from-env --display-name "Max Mustermann" --language "de_DE" admin maxmustermann@example.com
```

The user will then be able to login with "maxmustermann@example.com" using the given password.

When using `--generate-password` instead of giving a password, a random password will be generated. The guest user should then use the "forgot password" link to reset it.

> [!NOTE]
> The `occ` command will only create the guest account (i.e. it will not send out the invite email).

#### List existing guest users

The following command will list existing guest users:
```bash
% php occ guests:list
+---------------------------+----------------+------------+---+
| Email                     | Name           | Invited By |   |
+---------------------------+----------------+------------+---+
| maxmustermann@example.com | Max Mustermann | admin      | 0 |
+---------------------------+----------------+------------+---+
```

## Guest Specific Behavior and Configuration

Guest users interact with sharing and security functionality in unique ways. Many of the default behaviors related to Guests can also be customized.

> [!TIP]
> It's important to understand how the Guests app interacts with other aspects of Nextcloud even if you choose to utilize the default settings.

### Inviting guests (sharing)

It is possible to restrict users to only share within the groups they are members of themselves (_Settings > Administration > Sharing > ```Restrict users to only share with users in their groups```_)

If that setting is turned on, guests can only be invited by [group admins](https://docs.nextcloud.com/server/latest/admin_manual/configuration_user/user_configuration.html).

Upon invitation, the group admin must select at least one of their adminstrated groups the guest shall be member of.

### Share acceptance

Guest users automatically accept all files and folders that are shared with them. This is in constract to regular full users (who have to actively accept incoming shares since Nextcloud 18).

### Restricting app access

Administrators can set a whitelist of apps that guest users have access to.

By default the following are allowed:

* `files_trashbin`
* `files_versions`
* `files_sharing`
* `files_texteditor`
* `text`
* `activity`
* `firstrunwizard`
* `photos`
* `notifications`
* `dashboard`
* `user_status`
* `weather_status`

In addition, the following apps are always whitelisted to ensure minimal functionality:

* core
* `theming`
* `settings`
* `avatar`
* `files`
* `heartbeat`
* `dav`
* `guests`
* `impersonate`
* `accessibility`
* `terms_of_service`
* `dashboard`
* `weather_status`
* `user_status`
* `apporder`

### Hide other users

By default, guests will not be able to list other users in the system, but if a guest gets added to a group they will be able
to list users within that group (and, for example, share files with those users).

As a result, guests will be able to see each other as they are part of the same `guest` group. To prevent that behavior, you can add the `guest` group to the "Exclude groups from sharing" settings. You can find more information in [our documentation about sharing](https://docs.nextcloud.com/server/21/admin_manual/configuration_files/file_sharing_configuration.html).

### Converting guest users to full users

Guest users can be automatically converted into full users (provided by any other user back end like SAML, LDAP, OAuth, database...) on their next login. When this happens they will retain their shares.

For this to happen the following must be true:

* The target (new) account needs to have the same email address as the guest account.
* The `config.php` setting `'migrate_guest_user_data' => true,` must be added.

By default the old (guest) account will be disabled after successful conversion. The `config.php` setting `'remove_guest_account_on_conversion' => true` can be set if you want the old account to be deleted rather than disabled.

## Help & Contributing

- Bug reports: https://github.com/nextcloud/guests/issues (*not* for general troubleshooting assistance)
- Enhancement ideas: https://github.com/nextcloud/guests/issues
- Pull requests: https://github.com/nextcloud/guests/pulls
- Troubleshooting assistance: https://help.nextcloud.com
- Code: https://github.com/nextcloud/guests/tree/master
