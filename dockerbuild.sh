#!/bin/bash -e
docker login --email="jenkins@cloudesire.com" --password=$REGISTRY_PASSWORD --username=$REGISTRY_USERNAME $REGISTRY_HOST

BASE_NAME=$REGISTRY_HOST"/vivace"
BUILD_VERSION=$BASE_NAME:$CIRCLE_BUILD_NUM

docker build --pull -t $BUILD_VERSION .
docker push $BUILD_VERSION

exit 0
