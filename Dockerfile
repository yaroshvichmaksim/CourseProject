#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
RUN apt-get update
RUN apt-get install gnupg wget git unzip -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -y
WORKDIR /app
COPY publish .
ENTRYPOINT ["dotnet", "OrganiztionOfEvents.dll"]