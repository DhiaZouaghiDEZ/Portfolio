# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files
COPY PortfolioApp.sln .
COPY PortfolioApp.API/PortfolioApp.API.csproj PortfolioApp.API/
COPY PortfolioApp.Application/PortfolioApp.Application.csproj PortfolioApp.Application/
COPY PortfolioApp.Domain/PortfolioApp.Domain.csproj PortfolioApp.Domain/
COPY PortfolioApp.Infrastructure/PortfolioApp.Infrastructure.csproj PortfolioApp.Infrastructure/

# Restore dependencies
RUN dotnet restore

# Copy everything and build
COPY . .
RUN dotnet publish PortfolioApp.API/PortfolioApp.API.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "PortfolioApp.API.dll"]