#!/bin/sh  
jq -r \"'\(.name)@\(.version)'\" ../../../backend/package.json
