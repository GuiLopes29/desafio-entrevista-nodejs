# Use the official image as a parent image
FROM mysql:8.0

# Set the working directory in the container
WORKDIR /docker-entrypoint-initdb.d

# Add initialization scripts
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=desafio_db
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Expose port 3306
EXPOSE 3306