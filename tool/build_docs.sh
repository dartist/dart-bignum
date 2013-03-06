#!/bin/bash
DART_SDK=~/bin/dart/dart-sdk
PATH=$PATH:$DART_SDK/bin
PACK_DIR=`pwd`/packages/
cmd="$DART_SDK/bin/dartdoc lib/bignum.dart"
echo $cmd
exec $cmd
