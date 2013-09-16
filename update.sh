#!/bin/sh
echo "building public dir..."
brunch build --optimize
echo "updating io repo..."
cp public/* ../ryanbarringtoncox.github.io/
