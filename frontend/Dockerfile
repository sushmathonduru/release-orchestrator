# frontend/Dockerfile
# Serves the static dashboard using a lightweight nginx image.

# 1. Base image: small official nginx build
FROM nginx:alpine

# 2. Remove the default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# 3. Copy our custom nginx configuration (adds the /api proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. Copy the static dashboard files into nginx's web root
COPY public/ /usr/share/nginx/html/

# 5. Document which port the container listens on
EXPOSE 80

# 6. nginx's base image already starts the server by default,
#    this line is kept explicit for clarity/documentation
CMD ["nginx", "-g", "daemon off;"]
