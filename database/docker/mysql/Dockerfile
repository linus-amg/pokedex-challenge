FROM arm64v8/mysql:oracle
COPY ./*.sql /docker-entrypoint-initdb.d/
COPY ./pokemon.csv /var/lib/mysql-files/
