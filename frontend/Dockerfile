FROM node:21.1.0

# set docker working directory to mkdir /app/frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies.
RUN npm install

# add `/app/frontend/node_modules/.bin` to $PATH
ENV PATH /app/frontend/node_modules/.bin:$PATH

# Copy the rest of the frontend directory into the container
COPY . .

# Build the React app.
RUN npm run build

# The default command to run when starting the container
CMD ["npm", "run", "preview"]
