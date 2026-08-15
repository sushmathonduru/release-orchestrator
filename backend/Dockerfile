# backend/Dockerfile
# Builds a small, production-ready image for the Release Orchestrator API.

# 1. Base image: lightweight official Node.js runtime
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy only the dependency manifests first.
#    Docker caches this layer, so "npm install" only re-runs when
#    package.json actually changes - this makes rebuilds much faster.
COPY package*.json ./

# 4. Install production dependencies only
RUN npm install --omit=dev

# 5. Copy the rest of the application source code
COPY . .

# 6. Document which port the container listens on
EXPOSE 5000

# 7. Run the container as a non-root user for better security
USER node

# 8. Command that starts the service when the container runs
CMD ["node", "server.js"]
