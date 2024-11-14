# Step 1: Use the official Node.js image as the base
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port on which the app will run (default is 5077)
EXPOSE 5077

# Step 7: Set the command to run the app
CMD ["node", "index.js"]