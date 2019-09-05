
## Available Scripts

In the project directory, you can run:

### `npm start`

Initially build file will be created.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm run build`

Builds the app for production for client and server will be in `build` and `dist` folder. <br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


### Please configure your .env file
``` REACT_APP_API_ENDPOINT=/ // you don't need to change 
    REACT_APP_ENV=production // you don't need to change 
    DB_HOST=yourdbhost // do not add mongodb:// here
    DB_NAME=yourdbname
    DB_USER=yourdbuser
    DB_PASS=yourdbpassword
    DB_PORT=yourdbport
    SECRET_KEY=yoursecretkey // you don't need to change 
```