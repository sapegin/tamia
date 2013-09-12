#!/bin/bash

echo "Updating Tâmia on gh-pages…"

grunt build
cp docs/index.html ../tamia_gh/
cp docs/styles.css ../tamia_gh/
cp docs/scripts.js ../tamia_gh/
pushd ../tamia_gh/
git commit -m "Update docs." index.html styles.css scripts.js
git push
popd
