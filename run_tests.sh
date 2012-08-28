#!/bin/bash
PACK_DIR=`pwd`/packages/
cmd="dart --enable_type_checks --enable_asserts --package-root=$PACK_DIR ./tests/test_big_integer_v8.dart"
echo $cmd
exec $cmd