#!/bin/bash
DART_SDK=/Applications/dart/dart-sdk
PATH=$PATH:$DART_SDK/bin
PACK_DIR=`pwd`/packages/
cmd="dart --heap_growth_rate=32 /Applications/dart/dart-sdk/pkg/dartdoc/dartdoc.dart lib.dart"
echo $cmd
exec $cmd
