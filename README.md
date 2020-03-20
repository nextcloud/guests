# Guests

[![Build Status](https://travis-ci.com/nextcloud/guests.svg?branch=master)](https://travis-ci.com/nextcloud/guests)

Create guest users which can only see files shared with them

## Usage

1. Create a guest user by typing their email address in to the sharing dialog. 
2. [Optionally] Set a display name for the guest user.
3. [Optionally] Set a language for the invitation email (otherwise the server's [default language](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/config_sample_php_parameters.html#user-experience) will be used).
4. [Optionally, only for group admins] Set the groups to put the guests in (note [further documentation](#Special-behavior-under-sharing-restrictions)).
5. The guest will receive an email invitation with a link to create an account. They only have access to files which are shared with them.

### Special behavior under sharing restrictions

Nextcloud allows to restrict users to only share within the groups they are members of themselves (_Settings > Administration > Sharing > ```Restrict users to only share with users in their groups```_)

If that setting is turned on, guests can only be invited by [group admins](https://docs.nextcloud.com/server/latest/admin_manual/configuration_user/user_configuration.html).

Upon invitation, the group admin must select at least one of their adminstrated groups the guest shall be member of.

## Note on share acceptance

Guest users automatically accept all files and folders that are shared with them - other than regular full users, who have to actively accept incoming shares since Nextcloud 18.

## Restrictions on guest users

### Apps

Administrators can set a whitelist of apps that guest users have access to. 

By default the following are allowed:
* activity
* files_external
* files_sharing
* files_texteditor
* files_trashbin
* files_versions
* firstrunwizard
* gallery
* notifications

### Hide other users

By default, guests will not be able to list other users in the system, if a guest user gets added to a group he will be able
to list users within that group (and, for example, share files with those users). 

## Auto-convert guest users into full users

Guest users who eventually turn into full users (provided by any other user back end like SAML, LDAP, OAuth, database...) can be automatically converted on their first login, while keeping their shares.

#### Prerequisites

1. Nextcloud 18 or higher
2. target user needs to have the same email address as the guest user
3. config.php setting `'migrate_guest_user_data' => true,`
