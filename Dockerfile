# Build stage
FROM node:20.18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install the application dependencies
RUN npm install --verbose

# Build the React app for production
RUN npm run build

# Nginx stage
FROM nginx:alpine AS production

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]