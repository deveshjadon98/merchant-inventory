# Merchant Inventory
UI for Merchant Inventory.

### Prerequisites

* node v8.4.0
* npm 5.3.0
* json-server 0.12.1
```
npm install -g json-server@0.12.1
```

### Installing
Install node modules by running the following command

```
npm install
```
After successful installation run the following commands to serve app on dev environment
```
npm run server
```
```
npm start
```
Access app on the following url
```
localhost:3000
```
Access json-server API on the following url, Limited set of data is present in db.json.
```
localhost:3001
```
##Testing
Run the following command to run Unit Test cases.
```
npm run test:watch
```
## Built With

* [React](https://reactjs.org/) - JS Library
* [Redux](https://redux.js.org/) - State Container
* [Redux Sagas](https://redux-saga.js.org/) - Middleware
* [Axios](https://github.com/axios/axios) - Promise based HTTP client

## Acknowledgments

* I have used [CLOUDINARY](https://cloudinary.com/) for storing the images of merchants and get the url in return, which is later stored in our db.json.
