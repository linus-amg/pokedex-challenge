I decided to use MySQL as a database because I figured that capabilities of other databases would be too many for the use-case.

I liked the idea of having a csv file as a single source of truth when spinning up the docker service, so I use the `LOAD DATA INFILE` sql command to parse and insert the csv into the database.

The csv file is also copied over to the image when building it, so it's embedded into the image.

I had to use the `arm64v8/mysql:oracle` base image because the `mysql:latest` image is not available for arm64 and I'm working on a MacBook Pro with an Apple Silicon Chip (M1).