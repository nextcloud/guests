# SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later
#
# Makefile for building the project

app_name=guests
project_dir=$(CURDIR)/../$(app_name)
build_dir=$(CURDIR)/build/artifacts
package_name=$(app_name)

all: dev-setup build-js-production

# Dev env management
dev-setup: clean clean-dev npm-init

npm-init:
	npm ci

npm-update:
	npm update

# Building
build-js:
	npm run dev

build-js-production:
	npm run build

watch-js:
	npm run watch

# Cleaning
clean:
	rm -rf js

clean-dev:
	rm -rf node_modules
	rm -rf vendor

# Linting
lint:
	npm run lint

lint-fix:
	npm run lint:fix

# Style linting
stylelint:
	npm run stylelint

stylelint-fix:
	npm run stylelint:fix

appstore: clean-dev
	mkdir -p $(build_dir)
	tar --exclude-vcs \
	--exclude=$(build_dir) \
	--exclude=$(project_dir)/node_modules \
	--exclude=$(project_dir)/vendor \
	--exclude=$(project_dir)/webpack* \
	--exclude=$(project_dir)/.gitattributes \
	--exclude=$(project_dir)/.gitignore \
	--exclude=$(project_dir)/.travis.yml \
	--exclude=$(project_dir)/.tx \
	--exclude=$(project_dir)/.scrutinizer.yml \
	--exclude=$(project_dir)/CONTRIBUTING.md \
	--exclude=$(project_dir)/package.json \
	--exclude=$(project_dir)/screenshots \
	--exclude=$(project_dir)/Makefile \
	--exclude=$(project_dir)/tests \
	--exclude=$(project_dir)/src \
	-cvzf $(build_dir)/$(package_name).tar.gz $(project_dir)
