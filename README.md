# electron-calculator-client

> The purpose of this project is to learn Electron + React by building the Calculator’s desktop app to communicate with REST api server.

You can check the server repo at [electron-calculator-server](https://github.com/duckydash139/electron-calculator-server)

## Features
* ✏️ Normal calculator + power function
* 📡 Saving on CloudDrive for each computer
* 🖥 Desktop app powered by Electron + React

## Build Setup

``` bash
# install dependencies
$ yarn install

# set up SERVER_PATH in .env files
Example: SERVER_PATH=localhost/api/storage

# run development mode
$ yarn start

# build for production and launch server
$ yarn make
```

We use [electron-forge](https://electronforge.io/) to scaffold the project , so please visit their website for more details.