#!/bin/bash

# Replace these variables with your server details
REMOTE_USER="username"
REMOTE_HOST="example.com"
REMOTE_DIR="/path/to/destination"

# Check if required variables are set
if [ -z "$REMOTE_USER" ] || [ -z "$REMOTE_HOST" ] || [ -z "$REMOTE_DIR" ]; then
    echo "Error: Please set REMOTE_USER, REMOTE_HOST, and REMOTE_DIR variables"
    exit 1
fi

# Transfer all files in current directory
echo "Transferring files to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"
scp -r ./* "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"

if [ $? -eq 0 ]; then
    echo "Transfer completed successfully!"
else
    echo "Transfer failed!"
    exit 1
fi
