#!/bin/bash

# Update
sudo apt update -y

# Install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install lts/iron