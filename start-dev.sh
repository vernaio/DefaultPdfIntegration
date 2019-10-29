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
    -v $PWD:/opt/custom-integration \
    -e SPO_URL=spo-v3.web-apps.wmdTest.tryout.zone \
    -e SPO_TENANT=pib \
    -e SPO_USER=vorstufe \
    -e SPO_PASSWORD=$password \
    -e SPO_WORKSPACE_ID=test \
    -e INTEGRATION_NAME=default-pdf-integration \
    -e INTEGRATION_LOCATION=/opt/custom-integration/ \
    -e IMPOSITION_URL=http://192.168.0.233:4200 \
    perfectpattern/flow-service:2.0.0

# clean up
rm -rf ./data
