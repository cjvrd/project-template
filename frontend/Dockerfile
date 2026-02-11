FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=development

# Copy workspace root files and shared package
COPY package.json ./
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/
RUN npm install --ignore-scripts && npm rebuild

# Copy shared source
COPY shared/ ./shared/

# Copy frontend source and build
COPY frontend/ ./frontend/
RUN npm run build -w frontend

# Expose the SSR port and start the server
ENV PORT=5173
EXPOSE 5173
WORKDIR /app/frontend
CMD ["npx", "react-router-serve", "./build/server/index.js"]