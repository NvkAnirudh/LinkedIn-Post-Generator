FROM node:18-slim

    WORKDIR /app

    # Copy package files and install dependencies
    COPY package*.json ./
    RUN npm install

    # Copy application code
    COPY . .

    # Set executable permissions for the entry point
    RUN chmod +x src/index.js

    # Expose the port the app runs on
    EXPOSE 8000

    # Set the entry point
    ENTRYPOINT ["node", "src/index.js"]
