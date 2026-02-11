FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=development

# Copy workspace root files and shared package
COPY package.json ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/
RUN npm install

# Copy shared source
COPY shared/ ./shared/

# Copy backend source and generate Prisma client
COPY backend/ ./backend/
RUN npx -w backend prisma generate

ENV PORT=3000
EXPOSE 3000
WORKDIR /app/backend

CMD ["npm", "start"]