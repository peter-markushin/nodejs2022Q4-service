# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Donwload & Install Docker Desktop](https://docs.docker.com/get-docker/)

## Downloading (and switch to the `dev` branch)

```shell
git clone https://github.com/peterm-itr/nodejs2022Q4-service.git
```

## Go to the directory and switch branch

```shell
cd nodejs2022Q4-service
git checkout feature/db-container
```

## Create `.env` file and adjust as needed

```shell
cp .env.example .env
```

### ⚠️ The `.env` file is only used by docker now, NodeJS app ignores it.
If you want to run the app in native node environment you can use the following command to set environment variables

```shell
# Linux
export $(grep -v '^#' .env | xargs -d '\n')
# MacOS
export $(grep -v '^#' .env | xargs -0)
```

## Running application

```shell
docker compose build && docker compose up
```

Command above starts application in **development** mode.

Dockerfile for the application is multistage, it also contains production build, the image pushed to DockerHub is production image. If you'd like to test it you can comment out `services.app.build` section in `docker-compose.yaml` 

#### ⚠️ In development mode `node_modules` directory is mounted as a volume for performance reasons.

#### 🚩 During the build stage npm also scans dependencies for vulnerable modules, build fails if it finds vulnerable components.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```shell
docker compose exec app npm run test
```

To run only one of all test suites

```
docker compose exec app npm run test -- <path to suite>
```

To run all test with authorization

```
docker compose exec app npm run test:auth
```

To run only specific test suite with authorization

```
docker compose exec app npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
docker compose exec app npm run lint
```

```
docker compose exec app npm run format
```
