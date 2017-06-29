### react-router-jwt-boilerplate
> boilerplate react app with Json Web Tokens & simple local authentication

* A simple JWT authenticated react app with a backend express API 💥 🎉 🐝

<!-- ## Heroku Demo
- see the demo of the site:
 [https://react-express-boilerplate.herokuapp.com/](https://react-express-boilerplate.herokuapp.com/) -->

## Technology:
- react.js + [Create React App](https://github.com/facebookincubator/create-react-app).
- [Express.js](https://expressjs.com/)
- Mongoose + MongoDB: for storing users & hashed passwords
- bcryptjs: for hashing passwords
- jwt: for creating Json Web Tokens

## Getting started:
* clone this repository && and create a new git repo
```
$ git clone git@github.com:thechutrain/react-router-jwt-boilerplate.git
$ rm -rf .git
$ git init
```

* Make a `.env` file that contains a value for the following two keys:
```
MONGODB_URI= [LOCAL-DB-URL-LINK]
JWT_PASSPHRASE = [SECRET-SERVER-LONG-PASSWORD]
```

### Developing
- front end react app lives inside the `src/` folder
- your server and any routes can be added inside the `server/` folder
- `$ npm run dev` will concurrently start the react development server & your backend API server


### Deploying
Prerequisites - heroku account && heroku command line tools
```
$ heroku create [Your-app-name]
$ npm run build
$ git push heroku [your-production-branch-name]:master
$ heroku open
```

### Bugs??
- Please submit an issue OR feel free to contribute and send a pull request.
