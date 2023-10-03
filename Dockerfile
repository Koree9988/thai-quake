# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Quasar CLI globally
RUN npm install -g @quasar/cli

# Install app dependencies
RUN npm install

# Copy the entire app to the working directory
COPY . .

# Build the Quasar PWA app
RUN quasar build -m pwa

# Use a lightweight Node.js runtime to serve the PWA
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install 'serve' to serve the PWA
RUN npm install -g serve

# Copy the built PWA from the previous stage
COPY --from=0 /usr/src/app/dist/pwa .

# Expose port 5000 for the PWA
EXPOSE 9000

# Command to run the PWA using 'serve'
CMD ["serve", "-s", ".", "-p", "9000"]
