#!/bin/bash

yarn install -s --no-progress
yarn upgrade a11y-menu
# gulp
webpack --watch
gulp watch