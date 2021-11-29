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
ng build --configuration=$1 --base-href=./

if test -f "$HACKGIT/alice/scripts/seo/$1.sh"; then
    $HACKGIT/alice/scripts/subst.sh $HACKGIT/alice/scripts/seo/$1.sh $NGDIR/dist/alice-pwa/index.html
else
    $HACKGIT/alice/scripts/subst.sh $HACKGIT/alice/scripts/seo/seo.sh $NGDIR/dist/alice-pwa/index.html
fi

rsync --delete -varzh $NGDIR/dist/alice-pwa/* dantar:/home/daniele/html/$1/

