# Use the official Node.js 18.17.0 as a parent image
FROM node:18.17.0-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the front directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code from the front directory
COPY . .

# Build the app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]