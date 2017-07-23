#!/usr/bin/env sh
yarn install --modules-folder dist/node_modules --production
cp package.json dist/package.json
cd dist
zip -rq ../dist.zip *
cd ..
yarn install
