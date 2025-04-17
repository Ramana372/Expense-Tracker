# Start from a Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# --- FRONTEND BUILD ---
# Copy and install frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install && npm run build

# --- BACKEND INSTALL ---
# Copy and install backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy all source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Expose backend port
EXPOSE 8099

# Start the backend
CMD ["node", "backend/server.js"]
