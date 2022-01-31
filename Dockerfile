FROM node:8.11.1-alpine

# Create app directory
RUN mkdir /code
WORKDIR /code

# Install app dependencies
ADD . /code/

# Run NPM to install all dependencies
RUN npm install --pure-lockfile
