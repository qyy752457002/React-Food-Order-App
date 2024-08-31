FROM node:21.1.0

# set docker working directory to /app/backend
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies.
RUN npm install

# Copy the rest of the backend directory into the container
COPY . .

# The default command to run when starting the container
CMD ["npm", "run", "start"]
