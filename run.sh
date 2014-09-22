#!/bin/sh

NODE_ENV=production PORT=3000 ./bin/www > combined.log 2>&1 &
