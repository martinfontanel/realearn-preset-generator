# Step 1: Build the Angular application
FROM node:22.12 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Expose the default Angular port
EXPOSE 4200

# Command to run the development server with host 0.0.0.0 to make it accessible outside the container
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]


# # Start the application using ng serve
# CMD ["ng", "serve", "--host", "0.0.0.0"]