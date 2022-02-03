# OwnRecipes Web Frontend

This is the official web frontend for OwnRecipes. OwnRecipes is an open source recipe management site. You can share recipes with friends, rate recipes, store your favorite recipes to find easily, and more!

This project was forked from OpenEats. See [the homepage](https://github.com/open-eats/OpenEats) for more information about OpenEats!

## Main differences to OpenEats

OwnRecipes was rewritten from scratch. The main goal was to keep compatibility to the OpenEats API, while providing a more modern solution.
OwnRecipes comes with several, but not exclusively, improvements:

* It is built with [CRA](https://create-react-app.dev/) and is not ejected. That makes upgrading to future releases easier. But it comes with costs of reduced customizability.
* The code is typed with [TypeScript](https://www.typescriptlang.org/), reducing coding errors and increasing the maintainability.

## Dev Tips

### Running tests

To run the (offline) unit tests:

```npm run test```

To run tests locally:

```bash
cd openeats-api
docker-compose -f test.yml -p test build
docker-compose -f test.yml -p test run --rm --entrypoint sh web
./node_modules/.bin/jest --coverage
```

### Generating locale files

After adding new `defineMessages` you'll need to update the locale files. Instead of doing it manually you can run this script to do it for you.

```bash
npm run locales
```

#### Building the demo site

The demo site is built using pure js and relies on populating the redux store when the app starts. If more data needs to be added be sure to update [the demo json](https://github.com/ownrecipes/ownrecipes-web/tree/master/modules/common/demo)

To Build the demo site, update the dev env file ```.env.development.local``` (or create one) with the below.

```bash
# Node config
REACT_APP_DEMO=demo
REACT_APP_API_URL=
REACT_APP_LOCALE=en
```

Then Run:

```bash
docker-compose up node
```

This will generate all the require files in the public folder. These files can be copied directly into the demo repo.
