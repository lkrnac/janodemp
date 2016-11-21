#!/bin/bash

cd janodemp-server
git config --global user.email "lubos.krnac@gmail.com"
git config --global user.name "Codeship Build"
git fetch --unshallow || true
git fetch origin "+refs/heads/*:refs/remotes/origin/*"
git remote add openshift -f ${1}
git checkout -b openshift
git add client
git commit -m "Add new client bundle" -a
git push openshift openshift:master -f
