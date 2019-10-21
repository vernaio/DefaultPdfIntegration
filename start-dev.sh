#!/bin/bash
set -e

echo -n "SPO Password:" 
read -s password
echo ""

# create files
mkdir -p ./data/in
mkdir -p ./data/out
mkdir -p ./data/storage

# execute
docker run \
    -p 1881:1881 \
    -v $PWD/data/in:/data/in \
    -v $PWD/data/out:/data/out \
    -v $PWD/data/storage:/data/storage \
    -v $PWD:/opt/default-flow-logic \
    -e SPO_URL=spo-v3.web-apps.wmdTest.tryout.zone \
    -e SPO_TENANT=pib \
    -e SPO_USER=vorstufe \
    -e SPO_PASSWORD=$password \
    -e SPO_WORKSPACE_ID=test \
    -e INPUT_LOGIC_NAME=default-flow-logic \
    -e INPUT_LOGIC_URL=/opt/default-flow-logic/ \
    -e IMPOSITION_URL=http://192.168.42.37:4200 \
    -it \
    --entrypoint sh \
    perfectpattern/flow-service:latest

# clean up
rm -rf ./data
