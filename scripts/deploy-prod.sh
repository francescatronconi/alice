#!/bin/bash
#set -v # do not expand variables
set -x # output
set -e # stop on error
set -u # stop if you use an uninitialized variable

TODAY=`date +%Y-%m-%d-%H-%M-%S`
echo $TODAY

HACKGIT=~/hack/git
NGDIR=$HACKGIT/alice/alice-pwa

cd $NGDIR
#ng build --configuration=daniele --base-href=./
ng build --configuration=$1 --base-href=./

REMOTE="ssh dantar "

rsync --delete -varzh $NGDIR/dist/alice-pwa/* dantar:/home/daniele/html/$1/
#rsync --delete -varzh $NGDIR/dist/alice-pwa/* dantar:/home/daniele/html/ripartire/

