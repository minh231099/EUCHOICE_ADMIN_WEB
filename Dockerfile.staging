# 1. For build React app
FROM node:16-alpine AS development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
# COPY package-lock.json /app/package-lock.json

# Copy source
COPY . /app

# Same as npm install
RUN yarn install

FROM development AS build

# Same as npm build
RUN yarn build

# 2. For Nginx setup
FROM nginx:1.23.1

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]