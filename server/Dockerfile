# Use official Node.js image
FROM node:18

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Node.js server
EXPOSE 3000

# Command to run the Node.js server
CMD ["node", "index.js"]
