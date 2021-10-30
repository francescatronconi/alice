#!/bin/bash
#set -v # do not expand variables
set -x # output
set -e # stop on error
set -u # stop if you use an uninitialized variable

TODAY=`date +%Y-%m-%d-%H-%M-%S`
echo $TODAY

cp $2 $2.back
source $1
tmpfile=$(mktemp)
cp --attributes-only --preserve $2 $tmpfile
cat $2 | envsubst > $tmpfile && mv $tmpfile $2
