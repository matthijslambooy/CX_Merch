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

# Install dependencies
RUN npm install
# RUN npm audit fix

# Test if Dockerfile is running at all
# RUN echo 'hi'

# Bundle app source
COPY . .

EXPOSE 8080

# Run the application with or without the -l or "lab" argument
# CMD ["ionic", "serve"]
CMD ["ionic", "serve", "-l"]
