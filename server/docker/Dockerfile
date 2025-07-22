# Start from the pgvector PostgreSQL image
FROM pgvector/pgvector:0.8.0-pg17

# Set environment variables
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres \
    POSTGRES_DB=postgres

# Copy SQL initialization script into the correct directory
COPY ./pg_data.sql /docker-entrypoint-initdb.d/pg_data.sql

# Expose default PostgreSQL port
EXPOSE 5432
