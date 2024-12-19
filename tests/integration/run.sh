#!/usr/bin/env bash
#
# SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
# SPDX-FileCopyrightText: 2017 ownCloud GmbH
# SPDX-License-Identifier: AGPL-3.0-only
#
mkdir -p output

composer install

NC_PATH=../../../../
CORE_INT_TESTS_PATH=build/integration/

cd "$NC_PATH""$CORE_INT_TESTS_PATH"
composer install
cd -

OCC=${NC_PATH}occ

SCENARIO_TO_RUN=$1
HIDE_NC_LOGS=$2

# avoid port collision on jenkins - use $EXECUTOR_NUMBER
if [ -z "$EXECUTOR_NUMBER" ]; then
    EXECUTOR_NUMBER=0
fi
PORT=$((8080 + $EXECUTOR_NUMBER))
echo $PORT
php -S localhost:$PORT -t ../../../../ &
PHPPID=$!
echo $PHPPID

export TEST_SERVER_URL="http://localhost:$PORT/ocs/"

#Set up personalized skeleton
$OCC config:system:set skeletondirectory --value="$(pwd)/$NC_PATH""$CORE_INT_TESTS_PATH""skeleton"

#Set up mailhog to send emails
$OCC config:system:set mail_domain --value="foobar.com"
$OCC config:system:set mail_from_address --value="owncloud"
$OCC config:system:set mail_smtpmode --value="smtp"
$OCC config:system:set mail_smtphost --value="127.0.0.1"
$OCC config:system:set mail_smtpport --value="1025"
#We cannot set password with csrf enabled
$OCC config:system:set csrf.disabled --value="true"

#Enable needed app
$OCC app:enable files_external
$OCC app:enable guests

vendor/bin/behat --strict -f junit -f pretty $SCENARIO_TO_RUN
RESULT=$?

kill $PHPPID

#Disable apps
$OCC app:disable files_external
$OCC app:disable guests

if [ -z $HIDE_NC_LOGS ]; then
	tail "${NC_PATH}/data/nextcloud.log"
fi

echo "runsh: Exit code: $RESULT"
exit $RESULT

