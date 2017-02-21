# guests
=======


Allow classifying users or contacts as guests

Jails a user into a readonly home storage

* If his quota is 0 TODO below x
* If he is member of a configurable group
* If he is a contact of another user and has been shared a file

Furthermore, the administrator has to whitelist the applications that guests can use.
By default ',core,settings,avatar,files,files_trashbin,files_versions,files_sharing,files_texteditor,activity,firstrunwizard,gallery' are allowed.
The initial `,` is necessary to allow access to root resources.

# TODO
- fetch guests from contacts app
- better differentiate between email based on the fly contacts and guests based on the contacts app
- provide groups from contacts app

