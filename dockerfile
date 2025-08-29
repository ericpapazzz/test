# base image of Node.js
FROM node:18-alpine

# assign the work directory in the container
WORKDIR /app

# copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# install all dependencies (including dev dependencies for building)
RUN npm install

# copy the app's code to the work directory in the container
COPY . .

# exposes ports
EXPOSE 3000 8000

# command to execute the app in developer mode
CMD ["npm", "run", "dev"]