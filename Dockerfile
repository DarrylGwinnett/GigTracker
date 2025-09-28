# ================================
# Stage 1: Frontend build (Vite)
# ================================
FROM node:22 AS frontend-build
WORKDIR /app

# Copy only package manifests first (for caching)
COPY client/package*.json ./client/
RUN npm ci --prefix client

# Copy the rest of the frontend source and build
COPY client/ ./client/
RUN npm run build --prefix client
# Build output ends up in /app/client/dist


# ================================
# Stage 2: .NET build + publish
# ================================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj files first (for caching restore)
COPY ["API/API.csproj", "API/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Persistence/Persistence.csproj", "Persistence/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
RUN dotnet restore "API/API.csproj"

# Copy the rest of the backend source
COPY . .

# Copy frontend build output into API/wwwroot before publish
COPY --from=frontend-build /app/client/dist ./API/wwwroot

# Publish API
WORKDIR /src/API
RUN dotnet publish "API.csproj" -c Release -o /app/publish


# ================================
# Stage 3: Final runtime image
# ================================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
EXPOSE 5432

ENTRYPOINT ["dotnet", "API.dll"]
