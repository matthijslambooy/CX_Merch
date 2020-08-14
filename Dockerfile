# LABEL maintainer="m [dot] helderman [at] crossmarx [dot] nl"

# Select node image from: https://hub.docker.com/_/node/
# Currently: 12.18.3
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard * is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./


# Ionic is not listed as a true dependency, and is therefore not automaticly installed via npm,
# But it is the web engine on which the app is build and thus required. 
# Therefore must be seperately installed.
RUN npm install -g @ionic/cli

# Install dependencies
RUN npm install
# RUN npm audit fix
# Test if Dockerfile is running at all
# RUN echo 'hi'

# Bundle app source
COPY . .

EXPOSE 8100 35729

# Run the application with or without the -l or "lab" argument
# The host argument sets the host adress to 0.0.0.0. 
# This is important as docker expects this for the publishing of the port (for some unknown reason).
 CMD ["ionic", "serve", "--host=0.0.0.0"]
#CMD ["ionic", "serve", "--host=0.0.0.0", "-l"]
