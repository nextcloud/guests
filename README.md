# guests app

Allow classifying users or contacts as guests

Jails a user into a readonly home storage

* If his quota is 0 TODO below x
* If he is member of a configurable group
* If he is a contact of another user and has been shared a file

Furthermore, the administrator has to whitelist the applications that guests can use.
By default ',core,settings,avatar,files,files_trashbin,files_versions,files_sharing,files_texteditor,activity,firstrunwizard,gallery' are allowed.
The initial `,` is necessary to allow access to root resources.

# FIXME

- When generating a password for a contact send it to the user instead of logging it ;)
- Hide navigation entries for forbidden apps.
- skeleton files cannot be deleted ... duh ... readonly storage. that also means guests cannot unshare files ...