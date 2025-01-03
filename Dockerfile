# Base image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Default command
CMD ["npm", "start"]