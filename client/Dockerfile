# Use the official Node.js 20 image as a parent image
FROM node:20

# Set the working directory inside the container to /app
WORKDIR /client

# Copy package.json and package-lock.json files into the container at /app
COPY package*.json . 

# Install dependencies in the container
RUN npm install typescript

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "run", "dev"]