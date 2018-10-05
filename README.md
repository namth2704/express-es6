# Just a new express es6

## Setup
#### Install Database (using MySQL)
1. Download XAMPP at: https://www.apachefriends.org/index.html
2. After installation, open Xampp Control Panel and start MySQL Service
3. Create a new database `justanewproject` with user's info:
  - Username: `root`
  - Password: ``
(or whatever you like, you can update it in [`mysqlConfig` property](https://github.com/namth2704/express-es6/blob/master/config/development.json) later)
4. Import `stock.sql` script to the created database

#### Setup Node server
1. Install Node and npm by this link: https://nodejs.org/en/
2. Update the database connection config in [`mysqlConfig` property](https://github.com/namth2704/express-es6/blob/master/config/development.json) (if needed)
3. Run these scripts in the root folder:
```sh
$ npm install
$ npm start
```
4. Run server at: `localhost:3000`

## Useful API:
* Get user's information: `/db/user/get/:userid`
* Get stock's name: `/db/stock/:stockid`
* Get prices: `/prices/:stocktype`

... (See more at: [Routes config](https://github.com/namth2704/express-es6/blob/master/routes/index.js))
