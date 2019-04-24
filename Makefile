# Makefile for building the project

app_name=guests
project_dir=$(CURDIR)/../$(app_name)
build_dir=$(project_dir)/build
appstore_dir=$(build_dir)/appstore
package_name=$(app_name)
cert_dir=$(HOME)/.nextcloud/certificates

jssources=$(wildcard js/*) $(wildcard js/*/*) $(wildcard css/*/*)  $(wildcard css/*)

all: dist/index.js

.PHONY: watch

watch:
	node node_modules/.bin/webpack-dev-server --watch --hot --inline --port 3000 --public localcloud.icewind.me:444 --mode development --config webpack.config.js

clean:
	rm -rf $(build_dir)
	rm -rf node_modules

node_modules: package.json
	npm install --deps

dist/index.js: node_modules $(jssources)
	node_modules/.bin/webpack --mode production --progress

%.css: %.less node_modules
	node_modules/.bin/lessc $< $@

appstore: clean package

package: build/appstore/$(package_name).tar.gz
build/appstore/$(package_name).tar.gz: css/app.css dist/index.js
	mkdir -p $(appstore_dir)
	tar --exclude-vcs \
	--exclude=$(appstore_dir) \
	--exclude=$(project_dir)/node_modules \
	--exclude=$(project_dir)/webpack \
	--exclude=$(project_dir)/.gitattributes \
	--exclude=$(project_dir)/.gitignore \
	--exclude=$(project_dir)/.travis.yml \
	--exclude=$(project_dir)/.tx \
	--exclude=$(project_dir)/.scrutinizer.yml \
	--exclude=$(project_dir)/CONTRIBUTING.md \
	--exclude=$(project_dir)/package.json \
	--exclude=$(project_dir)/screenshots \
	--exclude=$(project_dir)/Makefile \
	--exclude=$(project_dir)/tests\
	-cvzf $(appstore_dir)/$(package_name).tar.gz $(project_dir)
	openssl dgst -sha512 -sign $(cert_dir)/$(app_name).key $(appstore_dir)/$(app_name).tar.gz | openssl base64

