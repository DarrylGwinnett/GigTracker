FROM node:22 AS build
WORKDIR /app
# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the client code
COPY . ./
RUN npm run build
# Stage 2: Serve
FROM node:22
WORKDIR /app

# Copy Vite build output
COPY --from=build /app/dist ./dist

RUN npm install -g serve
EXPOSE 3000

ENTRYPOINT ["serve", "-s", "dist", "-l", "3000"]