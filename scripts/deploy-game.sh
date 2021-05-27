#!/bin/bash
#set -v # do not expand variables
set -x # output
set -e # stop on error
set -u # stop if you use an uninitialized variable

TODAY=`date +%Y-%m-%d-%H-%M-%S`
echo $TODAY

GAME=$1

HACKGIT=~/hack/git
GAMESDIR=$HACKGIT/alice/games

REMOTE="ssh dantar "

rsync --delete -varzh $GAMESDIR/$GAME $HACKGIT/alice/alice-pwa/src/assets
rsync --delete -varzh $GAMESDIR/$GAME dantar:/home/daniele/html/resources

