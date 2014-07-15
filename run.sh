#!/bin/sh

NODE_ENV=production ./bin/www > combined.log 2>&1 &
