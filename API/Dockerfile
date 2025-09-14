# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY *.sln ./

# Copy all projects
COPY API/*.csproj API/
COPY Application/*.csproj Application/
COPY Domain/*.csproj Domain/
COPY Persistence/*.csproj Persistence/
COPY PerformanceTests/*.csproj PerformanceTests/

# Restore dependencies for the solution
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Build API project in Release
WORKDIR /src/API
RUN dotnet build -c Release -o /app/build

# Stage 2: Publish
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose port
EXPOSE 5000

# Start API
ENTRYPOINT ["dotnet", "API.dll"]
