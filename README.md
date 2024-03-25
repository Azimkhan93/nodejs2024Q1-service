# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Azimkhan93/nodejs2024Q1-service.git
```

## Switching to the branch
```
git checkout hl2
```
## Installing NPM modules

```
npm install
```

## Logging in Docker

```
docker login
```

## Getting Docker image from Dockerhub
```
docker pull aabdulsatarov/nodejs2024q1-service
```

## Creating and launching docker container
```
docker-compose up -d
```

## Stopping docker container
```
docker-compose down
```

## Scanning for vulnerabilities 

```
npm run docker:scan
```


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test 
```
or 

```
docker exec -it homelib sh -c "npm run test"
```
To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
