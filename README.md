# ES6-nodejs-server-boilerplate
ES6 server-side boilerplate project. This project contains the following.

- Automatically compile ES6 style JavScript code to ES5 code with Babel and Webpack
- Monitoring code changes and server restart with Nodemon
- Test structure written in ES6 using Mocha and Babel
- Simple CLI commands for building different environments (development and production)

This project contains a simple HTTP API server using Express. It can easily be changed into something else.


This repo was created for myself and for others to use, where I found myself creating this same project over and over and over and over again.

## How to use

- Copy this folder and name it what you want the service to be named.
- Find and replace in that folder `SERVICE_NAME` and name it the same as the folder.
- When deploying this name the IIS module the same as the folder as well.

## Directory structure
Source code is stored under _src_ and tests are stored in _test_.

## Development

To start development, execute the following lines into your shell.

	make bootstrap
	npm run start-dev

This will install dependencies and start a `nodemon` process that monitors code changes. When you change your code, it will be compiled with Babel, bundled with Webpack and the server will be restarted automatically.


## Build for production
To build the code for production (setting the `NODE_ENV` to _production_) run the following commands.

	make dist
	npm run start

This will create a server bundle in _build_ that you can then run with `npm run start`


## Commands
- `make` and `make bootstrap` execute `npm install`
- `make clean` cleans the project.
- `make dist` builds the project with `NODE_ENV` set to _production_
- `npm run lint` executes `eslint` for the _src_ folder.
- `npm run test` executes `mocha` with the `babel-loader` plugin.
- `npm run build` executes `gulp` task named _build_. This task compiles the code with `babel` and creates a bundle with `webpack`.
- `npm run build-watch` does the same thing as `npm run build` but it monitors changes and executes `npm run build` when code is updated.
- `npm run start-dev` does the same thing as `npm run build-watch` and then executes the built bundle. If the code is changed, the process is restarted with `nodemon`
