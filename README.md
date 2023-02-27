# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Donwload & Install Docker Desktop](https://docs.docker.com/get-docker/)

## Downloading

```shell
git clone https://github.com/peterm-itr/nodejs2022Q4-service.git
```

## Go to the directory and switch branch

```shell
cd nodejs2022Q4-service
git checkout feature/use-typeorm
```

## Create `.env` file and adjust as needed

```shell
cp .env.example .env

# at least set DB password
```

### ⚠️ The `.env` file is only used by docker now, NodeJS app ignores it.
If you want to run the app in native node environment you can use the following command to set environment variables

```shell
# Linux
export $(grep -v '^#' .env | xargs -d '\n')
# MacOS
export $(grep -v '^#' .env | xargs -0)
```

## Running application (development mode)

```shell
docker compose build && docker compose up
```

Command above starts application in **development** mode.

#### ⚠️ In development mode `node_modules` directory is mounted as a volume for performance reasons.

#### 🚩 During the build stage npm also scans dependencies for vulnerable modules, build fails if it finds vulnerable components.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running in production mode

The app can use image from docker hub.

DB synchronization is turned off and migrations are enabled in production mode.

Therefore, if you've run the app in development mode you'll have to destroy db data volume before starting in production mode.

- Change `NODE_ENV` value to `production` in `.env` file
- Comment out section `services.app` in `docker-compose.yaml`
- Uncomment `services.app_prod` in `docker-compose.yaml`
- Stop containers and destroy volumes and start again: `docker compose down -v && docker compose up`

## Testing (requires development mode)

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

## Scanning for vulnerabilities

```shell
npm run docker-scan
```

This command builds production image and scans it for vulnerabilities. It is run on **host**, not in docker container.

⚠️ You have to be logged in to dockerhub to scan the image.
