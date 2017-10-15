FROM node:7.4.0

# Prepare app directory
RUN mkdir -p /usr/src/app/service1
ADD . /usr/src/app/service1

# Install dependencies
WORKDIR /usr/src/app/service1
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

# Expose the app port
EXPOSE 8081

# Start the app
CMD node server.js