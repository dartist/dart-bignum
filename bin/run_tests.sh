#!/bin/bash
DART_SDK=/Applications/dart/dart-sdk
PATH=$PATH:$DART_SDK/bin
PACK_DIR=`pwd`/packages/
cmd="dart --enable_type_checks --enable_asserts --package-root=$PACK_DIR test/test_big_integer_v8.dart"
echo $cmd
exec $cmd
