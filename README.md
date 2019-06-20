# Guests

[![Build Status](https://travis-ci.com/nextcloud/guests.svg?branch=master)](https://travis-ci.com/nextcloud/guests)

Create guest users which can only see files shared with them

## Usage

Create a guest user by typing their name in to the sharing dialog. The guest
will receive an email invite with a link to create an account. They only have access
to files which are shared with them.

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
