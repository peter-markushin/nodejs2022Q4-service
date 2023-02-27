FROM postgres:15.1-alpine3.17

COPY docker-entrypoint-initdb/* /docker-entrypoint-initdb.d/

VOLUME /var/lib/postgresql/data/pgdata
EXPOSE 5432
