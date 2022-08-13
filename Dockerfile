FROM node:16.15-alpine

WORKDIR /code

# Install app dependencies
COPY . ./
ENV DISABLE_ESLING_PLUGIN=true
RUN npm install --no-audit
