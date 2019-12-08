# reactweatherforecast
An application that gives you the weather forecast for any searchable city.

## Getting started

- Sign up over at [openweathermap.org](https://openweathermap.org/appid) to get an API key.
- Fork the project and clone it locally.
- Create a file at the root of the project called `.env.local` with the following contents:

```sh
REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
REACT_APP_API_KEY = The API key you obtained from openweathermap.org
REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'
```
## Create the new App

Follow instructions on https://github.com/facebook/create-react-app

Then copy the folder structure from this github repository in the app created.

## Build the project for Production

```sh
npm run build
```

or

```sh
yarn build
```

- Builds the app for production to the build folder.

- It correctly bundles React in production mode and optimizes the build for the best performance.

- The build is minified and the filenames include the hashes.

Your app is ready to be deployed.
