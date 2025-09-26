FROM node:22 AS frontend-build
WORKDIR /app
COPY client/ ./
RUN ls -al /app
RUN npm ci
RUN npm run build
RUN ls -al /app  # check that 'dist' exists

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["API/API.csproj", "API/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Persistence/Persistence.csproj", "Persistence/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR /src/API
RUN dotnet publish "API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

COPY --from=frontend-build /app/dist ./wwwroot
ENTRYPOINT ["dotnet", "API.dll"]