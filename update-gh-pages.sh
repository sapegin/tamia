#!/bin/bash

echo "Updating Tâmia on gh-pages…"

grunt build
cp docs/*.html ../tamia_gh/
cp docs/styles.css ../tamia_gh/
cp docs/scripts.js ../tamia_gh/
cp docs/favicon.ico ../tamia_gh/
pushd ../tamia_gh/
git commit -m "Update docs." *.html styles.css scripts.js favicon.ico
git push
popd
