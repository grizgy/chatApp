# Use the official Node.js 20 image as a parent image
FROM node:20

# Set the working directory inside the container to /server
WORKDIR /server

# Copy package.json and package-lock.json files and app's source code from host to the image filesystem 
COPY . .

# Install dependencies in the container
RUN npm install
RUN npm install ts-node

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "run", "dev"]